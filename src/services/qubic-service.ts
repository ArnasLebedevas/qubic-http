import axios from "axios";
import {
  BalanceResponse,
  BlockHeightResponse,
  BroadcastTransactionResponse,
  LastTickResponse,
  TickInfoResponse,
} from "../types/model";

const RPC_QUBIC_URL = "https://rpc.qubic.org";

const QubicService = {
  getBalance: async (identity: string): Promise<BalanceResponse> => {
    const response = await axios.get(`/balances/${identity}`);
    return response.data;
  },

  getTickInfo: async (): Promise<TickInfoResponse> => {
    const response = await axios.get(`/tick-info`);
    return response.data;
  },

  getBlockHeight: async (): Promise<BlockHeightResponse> => {
    const response = await axios.get(`/block-height`);
    return response.data;
  },

  broadcastTransaction: async (
    encodedTransaction: string
  ): Promise<BroadcastTransactionResponse> => {
    const response = await axios.post(`/broadcast-transaction`, {
      encodedTransaction,
    });
    return response.data;
  },

  getLastProcessedTick: async (): Promise<LastTickResponse> => {
    const response = await axios.get(`${RPC_QUBIC_URL}/v1/status`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const tickNumber = response.data?.lastProcessedTick?.tickNumber;
    return { tickNumber };
  },
};

export default QubicService;
