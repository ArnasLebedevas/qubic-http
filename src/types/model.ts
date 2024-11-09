export interface BalanceResponse {
  balance: {
    id: string;
    balance: string;
    validForTick: number;
    latestIncomingTransferTick: number;
    latestOutgoingTransferTick: number;
  };
}

export interface TickInfoResponse {
  tickInfo: {
    tick: number;
    duration: number;
    epoch: number;
    initialTick: number;
  };
}

export interface BlockHeightResponse {
  blockHeight: {
    tick: number;
    duration: number;
    epoch: number;
    initialTick: number;
  };
}

export interface BroadcastTransactionResponse {
  peersBroadcasted: number;
  encodedTransaction: string;
  transactionId: string;
}

export interface LastTickResponse {
  tickNumber: number;
}
