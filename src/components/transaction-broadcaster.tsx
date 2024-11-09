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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Broadcast Transaction
      </h2>
      <textarea
        className="w-full p-2 border rounded-lg mb-4"
        value={encodedTransaction}
        onChange={(e) => setEncodedTransaction(e.target.value)}
        placeholder="Encoded transaction"
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded-lg mb-2 hover:bg-blue-600"
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
        className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={handleBroadcast}
        disabled={!encodedTransaction}
      >
        Broadcast
      </button>
      {response && (
        <div className="mt-4">
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
