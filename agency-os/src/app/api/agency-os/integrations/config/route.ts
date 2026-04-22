import { NextResponse } from "next/server";
import { getRoleFromHeaders, requireInternalRole } from "@/lib/agency-os/phase4/permissions";
import { integrationConfigSchema } from "@/lib/agency-os/phase4/validation";

export async function POST(request: Request) {
  const role = getRoleFromHeaders(request.headers);
  const allowed = requireInternalRole(role);
  if (!allowed.ok) {
    return NextResponse.json({ error: allowed.reason }, { status: 403 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = integrationConfigSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid integration config payload", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    provider: parsed.data.provider,
    enabled: parsed.data.enabled,
    actor: parsed.data.actor,
    note: "Demo integration toggle. Persist integrations_config + audit_logs in production wiring.",
  });
}
