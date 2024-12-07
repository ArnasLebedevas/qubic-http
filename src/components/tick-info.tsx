import { useEffect, useState } from "react";
import QubicService from "../services/qubic-service";

const TickInfo: React.FC = () => {
  const [tickInfo, setTickInfo] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTickInfo = async () => {
      try {
        const data = await QubicService.getTickInfo();
        setTickInfo(
          `Tick: ${data.tickInfo.tick}, Duration: ${data.tickInfo.duration}`
        );
      } catch (error) {
        console.error("Error fetching tick info:", error);
        setTickInfo(null);
      }
    };

    fetchTickInfo();

    const intervalId = setInterval(fetchTickInfo, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6 bg-[#8bf9e81a] rounded-lg shadow-md transition hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tick Info</h2>
      {tickInfo ? (
        <p className="text-blue-600 text-lg">{tickInfo}</p>
      ) : (
        <p className="text-gray-500">Loading tick info...</p>
      )}
    </div>
  );
};

export default TickInfo;
