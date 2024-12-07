import { useEffect, useState } from "react";
import QubicService from "../services/qubic-service";

const BlockHeight: React.FC = () => {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const data = await QubicService.getBlockHeight();
        setBlockHeight(data.blockHeight.tick);
      } catch (error) {
        console.error("Error fetching block height:", error);
        setBlockHeight(null);
      }
    };

    fetchBlockHeight();

    const intervalId = setInterval(fetchBlockHeight, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6 bg-[#8bf9e81a] rounded-lg shadow-md transition hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Block Height</h2>
      {blockHeight !== null ? (
        <p className="text-blue-600 text-lg">Block Height: {blockHeight}</p>
      ) : (
        <p className="text-gray-500">Loading block height...</p>
      )}
    </div>
  );
};

export default BlockHeight;
