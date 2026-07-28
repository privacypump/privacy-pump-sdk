import assert from "node:assert/strict";
import { test } from "node:test";
import { PublicKey } from "@solana/web3.js";
import {
  derivePrivateProposalAddress,
  derivePrivateTreasuryAddress,
  derivePrivateVaultAddress,
  reimbursementWithinCap,
  u64Le,
} from "../src/index.ts";

const programId = new PublicKey("DQEq5ftpcvjdg656PWxayafozUX95jCmZ9zEn82qDmfx");
const factory = new PublicKey("11111111111111111111111111111111");

test("encodes u64 little endian", () => {
  assert.equal(u64Le(42n).toString("hex"), "2a00000000000000");
});

test("derives stable related PDAs", () => {
  const vault = derivePrivateVaultAddress({ factory, nonce: 7n, programId });
  const treasury = derivePrivateTreasuryAddress(vault, programId);
  const proposal = derivePrivateProposalAddress({
    vault,
    proposalIndex: 0n,
    programId,
  });
  assert.notEqual(vault.toBase58(), treasury.toBase58());
  assert.notEqual(vault.toBase58(), proposal.toBase58());
});

test("enforces reimbursement caps", () => {
  assert.equal(reimbursementWithinCap(5n, 5n), true);
  assert.equal(reimbursementWithinCap(6n, 5n), false);
});
