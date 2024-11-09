import BalanceChecker from "./components/balance-checker";
import BlockHeight from "./components/block-height";
import TickInfo from "./components/tick-info";
import TransactionBroadcaster from "./components/transaction-broadcaster";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Qubic Dashboard</h1>
      <div className="w-full max-w-2xl space-y-6">
        <BalanceChecker />
        <BlockHeight />
        <TickInfo />
        <TransactionBroadcaster />
      </div>
    </div>
  );
}

export default App;
