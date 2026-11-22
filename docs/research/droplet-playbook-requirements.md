# What the droplet playbook requires of this app

Research for issue #86 (child of map #84). Date: 2026-11-23.

**Question.** What does the owner's droplet deployment playbook require of this app, and what does
the app lack today?

**Sources.**

- **[P]** The myDO1 playbook: the owner's private deployment knowledge base (overview, the
  new-project playbook, the architecture note, the DNS note, the compose and env templates, and the
  stack records of comparable projects). It is private, so this file describes the pattern only and
  leaves out addresses, host names, paths and other projects. Read the playbook itself before
  implementing; the exact label set, names and secrets are there.
- **[N]** The Next.js docs bundled with the installed version (16.2.1), under
  `node_modules/next/dist/docs/01-app/`: `01-getting-started/17-deploying.md`,
  `02-guides/self-hosting.md`, `03-api-reference/05-config/01-next-config-js/output.md`,
  `03-api-reference/02-components/font.md`.
- **[R]** This repo at `master` (commit `8d26c40`): `package.json`, `next.config.ts`,
  `src/app/layout.tsx`, `src/shared/lib/content-loader.ts`, `.env.example`, the file tree.

Each statement is tagged with its source. Statements tagged **[I]** are inference, not something a
source states.

## Answer in brief

The playbook wants a prebuilt `linux/amd64` Docker image, built by GitHub Actions and pushed to
GHCR, run as a one-service Compose stack that publishes no host ports and is routed by Traefik
labels on a shared external network, with TLS issued automatically per hostname once public
A-records resolve. CI deploys by joining the owner's private network and asking the box, over SSH,
to pull and restart. For Next.js the proven shape on the box is `output: "standalone"` listening on
an internal port. This app has none of it yet: no standalone output, no Dockerfile, no
`.dockerignore`, no workflow, no stack file, no domain.

## 1. Build model

- The playbook offers two models, prebuilt image from a registry or build on the box, and
  recommends the prebuilt one for anything real, because the box is small and builds compete with
  running stacks. [P]
- Prebuilt means: GitHub Actions builds the image and pushes it to GHCR under the owner's account
  using the workflow's own token with package write permission (no personal token); the box only
  pulls. [P]
- The box already holds a GHCR login, so a private package can be pulled without new setup. [P]
- Every Next.js stack recorded in the playbook runs as a prebuilt image with `output: "standalone"`
  and serves on an internal container port 3000. The playbook's generic text does not state
  "standalone" as a rule; it is the recorded practice for Next.js stacks. [P]
- The image must be `linux/amd64`. [P]
- Next.js side of standalone, per the bundled docs [N]:
  - `output: 'standalone'` in the Next config makes `next build` emit `.next/standalone`, which
    runs without installing `node_modules`, started with `node server.js` instead of `next start`.
  - The standalone folder does **not** include `public` or `.next/static`; both must be copied in
    (`standalone/public`, `standalone/.next/static`) for the server to serve them.
  - Port and bind address come from the `PORT` and `HOSTNAME` environment variables.
  - Docker deployments support all Next.js features.
- Consequences for this app:
  - `next.config.ts` sets only `reactCompiler: true`; there is no `output` key. [R]
  - `content-loader.ts` reads project content at request time from
    `path.resolve(process.cwd(), "public/content/projects")` with `fs.readdir` and `fs.readFile`.
    [R] So the image must carry `public/` and the server must start with the standalone root as its
    working directory, or every project page and the Work page break. [I, from R + N] Copying the
    whole `public` folder, which standalone needs anyway, covers it; `outputFileTracingIncludes`
    is the documented alternative if the content ever moves out of `public`. [N]
  - The root layout loads three families through `next/font/google`. [R] Those are downloaded at
    build time and self-hosted. [N] So the CI build needs outbound network access to Google Fonts,
    and the running container does not. [I]
  - `next/image` is used in one component. [R] Image optimization happens at runtime, not at build,
    and on glibc Linux may need allocator configuration to keep memory down. [N] The optimized
    image cache lives on the container's disk and is lost on each redeploy, since the stack has no
    volume. [I]
  - `package.json` scripts pin port 3100 for `dev` and `start`. [R] The standalone server ignores
    those scripts; the container port is whatever `PORT` says, and the Traefik label must name the
    same port. [I, from N]
  - In a container `HOSTNAME` should be set to `0.0.0.0` explicitly so the server binds on all
    interfaces. The docs show the variable; that Docker's own `HOSTNAME` value would otherwise get
    in the way is inference. [I]
  - Next.js 16.2.1 requires Node `>=20.9.0` (`engines` in its `package.json`). [N] The repo pins no
    Node version (no `.nvmrc`, no `engines`). [R] The Dockerfile's base image will be the first
    place a Node version is chosen.
  - The app reads no environment variables anywhere in `src` and has no `NEXT_PUBLIC_*` values.
    [R] So there are no build arguments and no secrets file is needed on the box; the playbook
    records a stack of exactly that kind (image only, no env file, no volumes, nothing to back up).
    [P]

## 2. Stack file and Traefik routing

Required by the playbook [P]:

- One Compose stack per project in its own directory on the box, with the stack file copied there
  by hand. CI never edits it.
- The web container joins the shared external proxy network (declared `external: true`) and
  exposes its internal port to that network only. No `ports:` mapping: the proxy is the only thing
  bound to 80 and 443.
- Routing is declared entirely by labels on the container: enable routing explicitly (containers
  are invisible by default), name the proxy network, a `Host()` rule for the hostname, the HTTPS
  entrypoint, the playbook's named certificate resolver, and the internal port for the service.
- Router names are global across the box and must be unique, so they carry a project prefix.
- The HTTP to HTTPS redirect is global. Do not add one.
- `restart: unless-stopped`.
- A global per-source rate limit already applies to every HTTPS router. Nothing to configure.

For this app the stack is a single service with no database, no private network and no volumes.
The playbook's template is written for a three-host app with Postgres, so most of it is deleted
rather than filled in. [I, from P]

## 3. DNS and TLS for a new apex domain

- The playbook's default is a subdomain of the owner's existing domain. An apex domain of its own
  is an exception with exactly one recorded precedent, and that precedent is the pattern to copy.
  [P]
- The precedent: the domain is registered at the same registrar as the existing one and stays on
  the registrar's basic DNS; two A-records, `@` and `www`, both pointing at the droplet's
  **public** address. Never a CNAME or a registrar URL-redirect record, never the private network
  address. [P]
- Two routers: one for `<domain>`, one for `www.<domain>` that carries a redirect middleware
  sending it to the apex with a 301. Each hostname gets its own certificate. [P]
- TLS is automatic: the proxy obtains a Let's Encrypt certificate per hostname through the HTTP-01
  challenge on port 80, on first request, once the label names the resolver. No certbot. [P]
- Order matters: the A-records must resolve publicly **before** the stack first starts. The
  playbook records a case where the proxy tried before the record existed and backed off; the fix
  was to recreate the container after DNS resolved. [P]
- HTTP-01 cannot issue wildcard certificates, so every hostname the site answers on needs its own
  record and router. [I]
- `<domain>` is not chosen yet; nothing in the playbook constrains the choice beyond the registrar
  and DNS-host convention above. [P]

## 4. How CI reaches the box

- SSH to the box is closed on the public interface and open only on the owner's private network
  (a tailnet). A GitHub-hosted runner therefore joins that network first, as a throwaway node, then
  connects. [P]
- On push to `master`: run checks, build and push the image tagged with `latest` and the commit
  sha, join the network, ask the box to pull and bring the service up. Deploy only from `master`;
  pull requests build and test only. [P]
- The playbook holds two generations of this wiring [P]:
  - **Older:** an expiring network auth key (90 days at most) plus an SSH action running a
    free-form script as root. The playbook warns that the key's expiry fails silently: the build
    still passes, only the deploy step breaks, and the site stops updating.
  - **Current, named as the pattern for new projects:** a non-expiring OAuth client for the network
    that mints a tagged ephemeral node per run and may reach only the box's SSH port; and a
    restricted deploy login, an SSH key that the server forces to run one root-owned per-project
    deploy script and nothing else, usable only from inside the private network. The script takes
    a component and a version, validates them against a fixed pattern, pins that version and runs
    pull and up. The workflow uses plain `ssh` with a pinned host key.
- With the current pattern the repo needs five secrets: the network OAuth client id and secret,
  the box's private-network address, the deploy private key, and the box's host key line. The
  registry needs none beyond the workflow token. [P]
- Hand steps on the box that CI cannot do [P]: create the stack directory, copy the stack file and
  the deploy script, add the deploy key's restricted line to the authorized keys, make sure the
  shared proxy network exists.
- After the deploy the playbook itself must be updated in the same unit of work: a stack record,
  the services and domains tables, the "currently deployed" table. [P]

## 5. What the app lacks today

Verified against the repo at `master` [R]:

1. `output: "standalone"` in `next.config.ts`.
2. A Dockerfile (multi-stage: install, build, then a runtime stage holding the standalone output
   with `public` and `.next/static` copied in, running as a non-root user).
3. A `.dockerignore`.
4. Any GitHub Actions workflow. There is no `.github` directory at all, so lint, unit tests and
   the Playwright suite do not run in CI either; the deploy workflow would be the first.
5. A Compose stack file with the Traefik labels, and the per-project deploy script, kept in the
   repo (for example under `deploy/`) and copied to the box by hand.
6. A domain, its two A-records, and the two routers.
7. The five repository secrets, the deploy key pair, and (if not shared) an OAuth client for CI.
8. A pinned Node version.
9. A truthful `.env.example`. The current one lists a Postgres URL and Supabase keys, while the app
   has no database client in its dependencies and reads no environment variables. It is stale and
   would mislead whoever writes the stack file.
10. A stack record in the myDO1 playbook (written after the deploy, not before).

Not required by the playbook, but absent and domain-shaped: the app sets no `metadataBase` and has
no `sitemap` or `robots` route. [R]

## 6. What the playbook leaves open for an app rendered on demand

Every route here is dynamic: the root layout awaits `cookies()` and `headers()` to pick the locale
[R], which opts the whole tree into request-time rendering, and Next.js then sends
`Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` on every page [N]. So
every page view is rendered by the Node process on the box. The playbook does not settle the
following:

1. **Image tag: `latest` or pinned by commit.** Older stacks deploy `latest`; the newest pins the
   commit sha in a versions file written by the deploy script, which also gives rollback. The
   playbook names the restricted login as the pattern for new projects but does not say a
   single-service site must pin. [P]
2. **Downtime on deploy.** The deploy is pull, then recreate the one container. Nothing in the
   playbook describes a health check for web containers, a readiness gate, or overlap between old
   and new containers. For a static site behind nginx this is invisible; for a Node server that
   must boot before it can render, each deploy is a short gap in which the proxy has no backend.
   [I, from P] Whether that is acceptable, and whether to add a container health check, is open.
3. **Memory.** The box is small and shared. Only one recorded stack sets per-container memory
   caps; the playbook does not require them. [P] A Node server with runtime image optimization has
   no stated budget here. [I]
4. **Caching in front of the app.** There is no CDN or proxy cache in the playbook's model [P], and
   the pages are marked uncacheable anyway [N]. Hashed static assets are served immutable by
   Next.js itself [N]. Whether the per-request locale read in the root layout should stay (keeping
   every page dynamic) is an app design question the playbook has no opinion on.
5. **Version skew during a deploy.** A browser holding the old build can request assets or
   navigations the new container no longer knows. Next.js documents `deploymentId` for this [N];
   with a single container replaced in place the exposure is brief [I]. Not addressed by the
   playbook.
6. **Runtime image optimization.** Whether to keep it, cap it, or turn it off
   (`unoptimized`) on a small box, given the glibc memory note [N] and the cache that is lost on
   every redeploy [I].
7. **Public package or private.** This repo is public, so the image could be a public GHCR package
   that the box pulls without credentials; the playbook records both arrangements and prescribes
   neither. [P]
8. **Deploy secrets in a public repo.** The playbook says to restrict deploys to `master` [P] but
   does not discuss a public repository specifically. GitHub does not hand secrets to workflows
   triggered from forks by default, and the workflow must not use triggers that change that. [I]
9. **One OAuth client per repo or a shared one.** The playbook records one client created for one
   project and does not say whether the next project reuses it or gets its own. [P]
10. **The `www` host.** The apex precedent redirects `www` to the apex. [P] Whether this site
    wants `www` at all is a choice tied to the domain decision.
11. **The deploy script is not templated.** The playbook describes what the script must do and
    points at one working example for a multi-component stack; there is no generic copy for a
    one-service stack, so this project writes its own. [P]
12. **Base image and Node version.** Not prescribed. [P] The docs' glibc note is the only input on
    the libc choice. [N]

The playbook is also internally inconsistent on whether the box has swap. It does not change the
recommendation (build in CI, not on the box), but treat memory headroom as unverified. [P]

## 7. Order of work the sources imply

1. Choose `<domain>`; register it; add the `@` and `www` A-records; wait until both resolve. [P]
2. In the repo: standalone output, Dockerfile, `.dockerignore`, stack file, deploy script,
   workflow. Verify the image locally: project pages render, which proves `public/content` is in
   place. [I]
3. On the box, by hand: stack directory, stack file, deploy script, restricted key line. [P]
4. Repo secrets, then the first push to `master`. Check both hostnames for a valid certificate and
   the `www` redirect. [P]
5. Record the stack in the myDO1 playbook. [P]
