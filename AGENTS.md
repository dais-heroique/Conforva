<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment Rules

**ALWAYS deploy to production, NEVER to preview.**
- When using the Vercel MCP deploy tool, always set `target: "production"`.
- When using the Vercel CLI, always pass the `--prod` flag.
- Never create a preview deployment. If asked to deploy, it means production.
