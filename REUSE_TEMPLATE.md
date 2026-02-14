# Reuse Template (Fast Start)

Use this repo as a reusable gallery starter for any new topic.

## New Gallery in 5 steps

1. Replace all files inside `content/photos/` with your new set.
2. Run:

```bash
pnpm install
pnpm gallery:refresh
```

3. Start locally:

```bash
pnpm dev
```

4. If everything looks correct, deploy production:

```bash
npx vercel --prod
```

5. If needed, map a new domain/subdomain in Vercel -> `Settings` -> `Domains`.

## Why this is safer now

- `data:sync` auto-rebuilds `content/names.csv` from actual files.
- `data:check` validates missing files / duplicates before build.
- `vercel.json` forces Vercel to publish static output from `dist/public`.

## Useful commands

```bash
pnpm data:sync      # regenerate names.csv from content/photos
pnpm data:check     # validate content consistency
pnpm data:build     # generate heroes.json + optimized public images
pnpm gallery:refresh # sync + build data + production build
```
