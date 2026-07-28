import { PublicKey } from "@solana/web3.js";

export const PRIVATE_VAULT_SEED = "pp-private-vault";
export const PRIVATE_TREASURY_SEED = "pp-private-treasury";
export const PRIVATE_PROPOSAL_SEED = "pp-private-proposal";

export function u64Le(value: bigint): Buffer {
  if (value < 0n || value > 0xffff_ffff_ffff_ffffn)
    throw new Error("u64 out of range");
  const bytes = Buffer.alloc(8);
  bytes.writeBigUInt64LE(value);
  return bytes;
}

export function derivePrivateVaultAddress(input: {
  factory: PublicKey;
  nonce: bigint;
  programId: PublicKey;
}): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(PRIVATE_VAULT_SEED),
      input.factory.toBuffer(),
      u64Le(input.nonce),
    ],
    input.programId,
  )[0];
}

export function derivePrivateTreasuryAddress(
  vault: PublicKey,
  programId: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PRIVATE_TREASURY_SEED), vault.toBuffer()],
    programId,
  )[0];
}

export function derivePrivateProposalAddress(input: {
  vault: PublicKey;
  proposalIndex: bigint;
  programId: PublicKey;
}): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(PRIVATE_PROPOSAL_SEED),
      input.vault.toBuffer(),
      u64Le(input.proposalIndex),
    ],
    input.programId,
  )[0];
}

export function reimbursementWithinCap(
  actualLamports: bigint,
  capLamports: bigint,
): boolean {
  if (actualLamports < 0n || capLamports < 0n)
    throw new Error("lamports must be non-negative");
  return actualLamports <= capLamports;
}
