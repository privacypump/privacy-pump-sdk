# privacy-pump-sdk

> **Maturity:** Experimental SDK  
> **Supported network:** Local validator and devnet  
> **Audit status:** Publication is not an audit. No external audit is claimed.

TypeScript SDK for reading and constructing Privacy Pump Private Vault transactions.

## Purpose

Provides pure account decoders, PDA derivation, codecs, transaction construction, fee calculations, and read-only RPC helpers.

## Scope

- No production relayer URL
- No signer-secret storage
- Deterministic mock and vector tests

## Architecture

```mermaid
flowchart LR
  User[Wallet or integrator] --> Interface[Public interface]
  Interface --> Boundary[Privacy Pump trust boundary]
  Boundary --> Chain[Solana or local reference]
  Boundary -. metadata exposure .-> Limits[Documented limitations]
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for component boundaries and assumptions.

## Current security status

- Experimental or reference material; not mainnet-ready.
- The inspected devnet programs are upgradeable and shared one upgrade authority at the publication audit date.
- Factory and relayer are distinct protocol roles, but a deployment may configure one signer for both.
- Production signer topology is intentionally not published.
- The ZK Pool vault-creation fee receipt does not independently bind its signer named `factory` to the Private Vault config factory; that boundary is under review.
- The ZK verifier path is fail-closed by default and is not a complete production privacy system.
- Browser, RPC, relayer, database, Waku/Logos, and Arcium metadata each have separate privacy limitations.
- Custom cryptographic glue is not described as audited.

Read [SECURITY.md](SECURITY.md) before using any material.

## Dependencies

- privacy-pump-types
- privacy-pump-protocol-test-vectors
- privacy-pump-private-vault-program

## Local setup

Use deterministic fixtures and ephemeral local keys only. No production credentials, cloud accounts, private RPC endpoints, or real wallet relationships are required.

```text
node scripts/policy-scan.mjs

npm install
npm test
npm run typecheck
```

Tests use deterministic public program identities and do not call an RPC endpoint.

## Roadmap

- [ ] Generate bindings from staged program source
- [ ] Add local validator conformance
- [ ] Publish packages after license approval

## Related Privacy Pump repositories

- `privacy-pump-types`
- `privacy-pump-protocol-test-vectors`
- `privacy-pump-private-vault-program`

## Known limitations

- Public content omits production relayer, access-control, KMS, Supabase service-role, keeper-signing, monitoring, and deployment implementations.
- Privacy depends on more than user-interface masking; metadata visible to wallets, RPCs, relayers, transports, and infrastructure remains relevant.
- Interfaces may change while the devnet architecture is stabilized.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Licensing is under review; see [LICENSE_STATUS.md](LICENSE_STATUS.md).

```

```
