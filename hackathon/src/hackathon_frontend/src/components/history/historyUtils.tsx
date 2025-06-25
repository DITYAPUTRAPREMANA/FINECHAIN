import { HttpAgent, Actor } from "@dfinity/agent";
import { hackathon_backend } from "declarations/hackathon_backend";

// TypeScript type to match Motoko data structure
export type FineStatus = "Waiting for Payment" | "Paid" | "Expired";

export type FineDetails = {
  letterNumber: string;
  name: string;
  tnkb: string;
  date: string;
  penaltyType: string;
  totalFine: string;
  paymentMethod: string;
  accountNumber: string;
  status: FineStatus;
};

// Motoko type returned from the canister (status is a variant object like: { WaitingForPayment: null })
type RawFineDetails = Omit<FineDetails, "status"> & {
  status: { [key: string]: null };
};

// Set up the agent and actor
const agent = new HttpAgent();
// await agent.fetchRootKey(); // only for local dev

export const fineActor = hackathon_backend.getFineDetail()

// Utility to fetch and convert the Motoko result
export async function fetchFineDetails(): Promise<FineDetails> {
  const result = await fineActor as RawFineDetails;

  const statusKey = Object.keys(result.status)[0]; // e.g. "Paid"
  const statusMap: Record<string, FineStatus> = {
    WaitingForPayment: "Waiting for Payment",
    Paid: "Paid",
    Expired: "Expired",
  };

  return {
    ...result,
    status: statusMap[statusKey] ?? "Waiting for Payment",
  };
}
