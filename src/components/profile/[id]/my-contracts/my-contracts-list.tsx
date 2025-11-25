'use client';

import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useContractsFilters } from '@/lib/hooks/use-contracts-filters';
import { Booking } from '@/payload-types';

import { loadMyContractsAction, updateContractStatusAction, createReviewAction, rateClientAction } from './actions';
import { ContractActionDialog } from './contract-action-dialog';
import { ContractListItem } from './contract-list-item';
import { ContractsStats } from './contracts-stats';
import { EmptyContractsState } from './empty-contracts-state';
import { RateClientDialog } from './rate-client-dialog';
import { ReviewDialog } from './review-dialog';

export function MyContractsList() {
  const params = useParams();
  const profileId = params.id as string;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loadingContractId, setLoadingContractId] = useState<number | null>(null);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: 'accept' | 'reject' | 'complete' | null;
    contractId: number | null;
  }>({ open: false, type: null, contractId: null });
  const [reviewDialogState, setReviewDialogState] = useState<{
    open: boolean;
    bookingId: string | null;
  }>({ open: false, bookingId: null });
  const [providerReviewDialogState, setProviderReviewDialogState] = useState<{
    open: boolean;
    bookingId: string | null;
  }>({ open: false, bookingId: null });

  const {
    execute: loadData,
    result: loadResult,
    isExecuting: isLoadingData,
  } = useAction(loadMyContractsAction, {
    onError: (error) => {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los contratos');
    },
  });

  const { executeAsync: updateContractStatus } = useAction(updateContractStatusAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        loadData({ profileId });
      }
    },
    onError: (error) => {
      console.error('Error updating contract status:', error);
      toast.error('Error al actualizar el estado del contrato');
    },
  });

  const { executeAsync: createReview, isExecuting: isSubmittingReview } = useAction(createReviewAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        setReviewDialogState({ open: false, bookingId: null });
        loadData({ profileId });
      }
    },
    onError: ({ error }) => {
      console.error('Error creating review:', error);
      toast.error('Error al crear la reseña');
    },
  });

  const { executeAsync: rateClient, isExecuting: isSubmittingProviderRating } = useAction(rateClientAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message || 'Calificación del cliente registrada');
        setProviderReviewDialogState({ open: false, bookingId: null });
        loadData({ profileId });
      }
    },
    onError: (error) => {
      try {
        const serialized = typeof error === 'object' ? JSON.stringify(error) : String(error);
        console.error('Error rating client (action error):', error, serialized);
      } catch {
        console.error('Error rating client (logging failed):', error);
      }

      let message: string | undefined;
      if (error && typeof error === 'object' && 'message' in (error as Record<string, unknown>)) {
        const maybe = (error as Record<string, unknown>).message;
        if (typeof maybe === 'string') message = maybe;
      }
      toast.error(message || 'Error al calificar al cliente');
    },
  });

  useEffect(() => {
    loadData({ profileId });
  }, [profileId]);

  const openDialog = (type: 'accept' | 'reject' | 'complete', contractId: number) => {
    setDialogState({ open: true, type, contractId });
  };

  const closeDialog = () => {
    setDialogState({ open: false, type: null, contractId: null });
  };

  const handleDialogConfirm = async () => {
    if (!dialogState.contractId || !dialogState.type) return;

    const statusMap = {
      accept: 'accepted' as const,
      reject: 'cancelled' as const,
      complete: 'completed' as const,
    };

    setLoadingContractId(dialogState.contractId);

    try {
      const result = await updateContractStatus({
        bookingId: dialogState.contractId.toString(),
        status: statusMap[dialogState.type],
      });

      if (dialogState.type === 'complete' && result?.data?.success) {
        setProviderReviewDialogState({ open: true, bookingId: dialogState.contractId.toString() });
      }
    } finally {
      setLoadingContractId(null);
    }
  };

  const handleRateContract = (bookingId: number) => {
    setReviewDialogState({ open: true, bookingId: bookingId.toString() });
  };

  const handleRateClient = (bookingId: number) => {
    setProviderReviewDialogState({ open: true, bookingId: bookingId.toString() });
  };

  const handleReviewSubmit = async (data: Parameters<typeof createReview>[0]) => {
    await createReview(data);
  };

  const handleProviderRatingSubmit = async (data: { rating: number }) => {
    if (!providerReviewDialogState.bookingId) return;

    await rateClient({ bookingId: providerReviewDialogState.bookingId, rating: data.rating });
  };

  const currentUser = loadResult.data?.user || null;
  const contracts = (loadResult.data?.contracts || []) as Booking[];

  const { filteredContracts } = useContractsFilters(contracts, activeFilter);

  const canEdit = Boolean(currentUser && currentUser.id.toString() === profileId);

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContractsStats contracts={contracts} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {filteredContracts.length === 0 ? (
        <EmptyContractsState activeFilter={activeFilter} onShowAll={() => setActiveFilter('all')} />
      ) : (
        <div className="space-y-4">
          {filteredContracts.map((contract) => (
            <ContractListItem
              key={contract.id}
              contract={contract}
              currentUser={currentUser}
              canEdit={canEdit}
              loadingContractId={loadingContractId}
              onOpenDialog={openDialog}
              onRateContract={handleRateContract}
              onRateClient={handleRateClient}
            />
          ))}
        </div>
      )}

      <ContractActionDialog
        open={dialogState.open}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        actionType={dialogState.type || 'accept'}
        onConfirm={handleDialogConfirm}
      />

      {reviewDialogState.bookingId && (
        <ReviewDialog
          open={reviewDialogState.open}
          onOpenChange={(open) => setReviewDialogState({ open, bookingId: null })}
          bookingId={reviewDialogState.bookingId}
          onSubmit={handleReviewSubmit}
          isSubmitting={isSubmittingReview}
        />
      )}
      {providerReviewDialogState.bookingId && (
        <RateClientDialog
          open={providerReviewDialogState.open}
          onOpenChange={(open) => setProviderReviewDialogState({ open, bookingId: null })}
          onSubmit={handleProviderRatingSubmit}
          isSubmitting={isSubmittingProviderRating}
        />
      )}
    </div>
  );
}
