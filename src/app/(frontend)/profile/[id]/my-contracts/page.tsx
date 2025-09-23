import { MyContractsList } from '@/components/profile/[id]/my-contracts/my-contracts-list';

export default function MyContractsPage() {
  return (
    <div className="min-h-main">
      <main className="container py-12 relative">
        <div className="mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mis Contratos</h1>
            <p className="text-muted-foreground">Gestiona todos tus contratos y solicitudes</p>
          </div>
        </div>

        <MyContractsList />
      </main>
    </div>
  );
}
