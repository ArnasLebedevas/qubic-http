import React, { useState } from "react";
import QubicService from "../services/qubic-service";
import { createEncodedTransaction } from "../helpers/transaction";

const CFBAssetIssuer =
  "CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL";
const CFBAssetNameValue = "CFB";
const assetPrice = 4;
const assetQuantity = 1;
const identity = "ERONFATIXCRBZBIVKOBVIIVPPZKCGYYWOUVFDCKJACOTDVVUDEAEVHWCRAFM";
const seed = "wxwedjpzgqbpvsuotzkuaquigiizopzxueipuhmhnvuhjeetlsjuvlm";

const TransactionBroadcaster: React.FC = () => {
  const [encodedTransaction, setEncodedTransaction] = useState<string>("");
  const [response, setResponse] = useState<{
    peersBroadcasted: number;
    transactionId: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBroadcast = async () => {
    try {
      const result = await QubicService.broadcastTransaction(
        encodedTransaction
      );
      setResponse(result);
      setError(null);
    } catch (err) {
      setError("Failed to broadcast transaction");
      setResponse(null);
    }
  };

  return (
    <div className="p-6 bg-[#8bf9e81a] rounded-lg shadow-md transition hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 ">
        Broadcast Transaction
      </h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={encodedTransaction}
        onChange={(e) => setEncodedTransaction(e.target.value)}
        placeholder="Encoded transaction"
      />
      <button
        className="w-full p-3 bg-[rgb(204,252,255)] text-black rounded-lg mb-4 hover:bg-[rgb(98,240,254)] transition-colors"
        onClick={async () => {
          const transaction = await createEncodedTransaction({
            assetIssuer: CFBAssetIssuer,
            assetNameValue: CFBAssetNameValue,
            assetPrice,
            assetQuantity,
            identity,
            seed,
          });
          setEncodedTransaction(transaction);
        }}
      >
        Generate Transaction
      </button>
      <button
        className="w-full p-3 bg-[rgb(13,18,28)] text-white rounded-lg hover:bg-[rgb(29,40,61)] transition-colors"
        onClick={handleBroadcast}
        disabled={!encodedTransaction}
      >
        Broadcast
      </button>
      {response && (
        <div className="mt-4 bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-600">Broadcast Success</h3>
          <p>Peers Broadcasted: {response.peersBroadcasted}</p>
          <p>Transaction ID: {response.transactionId}</p>
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default TransactionBroadcaster;
