import BalanceChecker from "./components/balance-checker";
import BlockHeight from "./components/block-height";
import TickInfo from "./components/tick-info";
import TransactionBroadcaster from "./components/transaction-broadcaster";
import logo from "./assets/logo.jpg";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="bg-[rgb(13,18,28)] w-full py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <a
              href="https://qubic.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="Qubic Logo"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </a>
            <h1 className="text-white text-2xl font-bold">Qubic</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10 space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <BalanceChecker />
          <BlockHeight />
          <TickInfo />
          <TransactionBroadcaster />
        </div>
      </main>
    </div>
  );
}

export default App;
