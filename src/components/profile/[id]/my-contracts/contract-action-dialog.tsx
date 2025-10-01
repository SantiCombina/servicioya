'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ActionType = 'accept' | 'reject' | 'complete';

interface ContractActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType;
  onConfirm: () => void;
  isLoading?: boolean;
}

const actionConfig = {
  accept: {
    title: '¿Aceptar contrato?',
    description:
      'Al aceptar este contrato, te comprometes a realizar el servicio en la fecha acordada. El cliente será notificado de tu aceptación.',
    confirmText: 'Aceptar Contrato',
    confirmVariant: 'default' as const,
  },
  reject: {
    title: '¿Rechazar contrato?',
    description:
      'Esta acción rechazará permanentemente el contrato. El cliente será notificado y no podrás deshacer esta acción.',
    confirmText: 'Rechazar',
    confirmVariant: 'destructive' as const,
  },
  complete: {
    title: '¿Marcar trabajo como completado?',
    description:
      'Esta acción marcará el trabajo como completado y notificará al cliente. Una vez completado, el cliente podrá calificar el servicio.',
    confirmText: 'Confirmar Completado',
    confirmVariant: 'success' as const,
  },
};

export function ContractActionDialog({
  open,
  onOpenChange,
  actionType,
  onConfirm,
  isLoading = false,
}: ContractActionDialogProps) {
  const config = actionConfig[actionType];

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{config.title}</AlertDialogTitle>
          <AlertDialogDescription>{config.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              config.confirmVariant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : config.confirmVariant === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : ''
            }
          >
            {isLoading ? 'Procesando...' : config.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
