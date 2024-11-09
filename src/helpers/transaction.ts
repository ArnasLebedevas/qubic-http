import { Long } from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long";
import { PublicKey } from "@qubic-lib/qubic-ts-library/dist/qubic-types/PublicKey";
import { QubicTransaction } from "@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction";
import { QubicTransferQXOrderPayload } from "@qubic-lib/qubic-ts-library/dist/qubic-types/transacion-payloads/QubicTransferQXOrderPayload";
import { QubicDefinitions } from "@qubic-lib/qubic-ts-library/dist/QubicDefinitions";
import QubicService from "../services/qubic-service";

const createQXOrderTransaction = async (
  senderId: string,
  senderSeed: string,
  targetTick: number,
  payload: QubicTransferQXOrderPayload,
  actionType: number
) => {
  const transaction = new QubicTransaction()
    .setSourcePublicKey(new PublicKey(senderId))
    .setDestinationPublicKey(QubicDefinitions.QX_ADDRESS)
    .setTick(targetTick)
    .setInputSize(payload.getPackageSize())
    .setAmount(new Long(0))
    .setInputType(actionType)
    .setPayload(payload);

  if (actionType === QubicDefinitions.QX_ADD_BID_ORDER) {
    transaction.setAmount(new Long(payload.getTotalAmount()));
  }

  await transaction.build(senderSeed);

  return transaction;
};

const valueOfAssetName = (assetName: string) => {
  const bytes = new Uint8Array(8);
  bytes.set(new TextEncoder().encode(assetName));
  return new DataView(bytes.buffer).getInt32(0, true);
};

interface CreateEncodedTransactionParams {
  assetIssuer: string;
  assetNameValue: string;
  assetPrice: number;
  assetQuantity: number;
  identity: string;
  seed: string;
}

export const createEncodedTransaction = async ({
  assetIssuer,
  assetNameValue,
  assetPrice,
  assetQuantity,
  identity,
  seed,
}: CreateEncodedTransactionParams): Promise<string> => {
  try {
    const { tickNumber } = await QubicService.getLastProcessedTick();

    const orderPayload = new QubicTransferQXOrderPayload({
      issuer: new PublicKey(assetIssuer),
      assetName: new Long(valueOfAssetName(assetNameValue)),
      price: new Long(assetPrice),
      numberOfShares: new Long(assetQuantity),
    });

    const transaction = await createQXOrderTransaction(
      identity,
      seed,
      tickNumber + 10,
      orderPayload,
      QubicDefinitions.QX_ADD_BID_ORDER
    );

    const encodedTransaction = transaction.encodeTransactionToBase64(
      transaction.getPackageData()
    );

    return encodedTransaction;
  } catch (err) {
    console.error("Error generating transaction:", err);
    throw new Error("Failed to generate transaction");
  }
};
