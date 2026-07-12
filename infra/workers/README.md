# Workers

Hosted edge workers (`defineWorker`): webhook receivers, form endpoints,
schedulers. Each worker is a sub-project (its own `package.json` and
`src/index.ts` built with `createWorker` from @cargo-ai/worker-sdk) that
`defineWorker({ path })` points at. Cargo Hosting builds it server-side on
deploy. Empty until you add one.
