import { HttpAgent, Actor } from "@dfinity/agent";
import { hackathon_backend } from "declarations/hackathon_backend";

export type BackendFine = Awaited<ReturnType<typeof hackathon_backend.getFineDetail>>[number];

// TypeScript type to match Motoko data structure
export type FineStatus = "Waiting for Payment" | "Paid" | "Expired";

// Motoko type returned from the canister (status is a variant object like: { WaitingForPayment: null })
type RawFineDetails = Omit<BackendFine, "status"> & {
  status: { [key: string]: null };
};

// Set up the agent and actor
const agent = new HttpAgent();
// await agent.fetchRootKey(); // only for local dev

// Utility to fetch and convert the Motoko result
export async function fetchFineDetails(letterNumber: string): Promise<BackendFine> {
  const result = await hackathon_backend.getFineDetail(letterNumber);

  if (!Array.isArray(result) || result.length === 0) {
    throw new Error("Fine detail not found");
  }

  const raw: BackendFine = result[0]; // Ambil item pertama

  const statusKey = Object.keys(raw.status)[0]; // e.g. "Paid"
  const statusMap: Record<string, FineStatus> = {
    WaitingForPayment: "Waiting for Payment",
    Paid: "Paid",
    Expired: "Expired",
  };

  return {
    ...raw,
    status: statusMap[statusKey] ?? "Waiting for Payment",
  };
}

