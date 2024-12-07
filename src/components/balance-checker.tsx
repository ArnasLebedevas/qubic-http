import React, { useState } from "react";
import QubicService from "../services/qubic-service";

const BalanceChecker: React.FC = () => {
  const [identity, setIdentity] = useState("");
  const [balance, setBalance] = useState<string | null>(null);

  const suggestions = [
    "PKXGRCNOEEDLEGTLAZOSXMEYZIEDLGMSPNTJJJBHIBJISHFFYBBFDVGHRJQF",
  ];

  const handleCheckBalance = async () => {
    try {
      const data = await QubicService.getBalance(identity);
      setBalance(data.balance.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setIdentity(text);
  };

  return (
    <div className="p-6 bg-[#8bf9e81a] rounded-lg shadow-md transition hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Check Balance
      </h2>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Identity"
        value={identity}
        onChange={(event) => setIdentity(event.target.value)}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <h6 className="font-bold text-gray-700">Suggestions:</h6>
        {suggestions.map((text, index) => (
          <span
            key={index}
            onClick={() => handleSuggestionClick(text)}
            className="cursor-pointer text-sm px-3 py-1 rounded-full bg-gray-100 border hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            {text}
          </span>
        ))}
      </div>
      <button
        className="w-full p-3 bg-[rgb(13,18,28)] text-white rounded-lg hover:bg-[rgb(29,40,61)] transition-colors font-medium"
        onClick={handleCheckBalance}
      >
        Check Balance
      </button>
      {balance && (
        <p className="mt-4 text-green-600 font-medium text-lg">
          Balance: {balance}
        </p>
      )}
    </div>
  );
};

export default BalanceChecker;
