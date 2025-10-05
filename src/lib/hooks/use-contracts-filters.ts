import { Booking } from '@/payload-types';

export function useContractsFilters(contracts: Booking[], activeFilter: string) {
  const pendingContracts = contracts.filter((contract) => contract.status === 'pending');
  const confirmedContracts = contracts.filter((contract) => contract.status === 'accepted');
  const completedContracts = contracts.filter((contract) => contract.status === 'completed');

  const getFilteredContracts = () => {
    switch (activeFilter) {
      case 'pending':
        return pendingContracts;
      case 'confirmed':
        return confirmedContracts;
      case 'completed':
        return completedContracts;
      case 'all':
      default:
        return contracts;
    }
  };

  return {
    pendingContracts,
    confirmedContracts,
    completedContracts,
    filteredContracts: getFilteredContracts(),
  };
}
