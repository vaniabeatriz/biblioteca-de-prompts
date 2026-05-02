# Deployment

This project is configured for Render as the Node web host and Supabase as the
PostgreSQL database.

## Supabase

1. Create a Supabase project.
2. In **Connect**, copy the Session pooler connection string.
3. Set Render `DATABASE_URL` to that Session pooler URL.

If you choose Supabase's Transaction pooler URL for `DATABASE_URL`, append
`?pgbouncer=true` so Prisma disables prepared statements for that connection.

## Render

Create the service from the root `render.yaml` Blueprint, then fill the secret
environment variables Render prompts for:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`

Use the Render service URL, or your custom domain, for `NEXT_PUBLIC_APP_URL`.

The Blueprint uses:

- build command: `npm ci && npm run build && npm run render:predeploy`
- start command: `npm start`
- health check path: `/api/health`

The final build step runs Prisma migrations through `DATABASE_URL` and then
runs the idempotent seed script for the curated use cases and prompts. This is
kept inside the build command because Render pre-deploy commands are not
available on Free web services.
