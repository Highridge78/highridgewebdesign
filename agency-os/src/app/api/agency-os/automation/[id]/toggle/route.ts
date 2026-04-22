import { NextResponse } from "next/server";
import { getRoleFromHeaders, requireInternalRole } from "@/lib/agency-os/phase4/permissions";
import { automationToggleSchema } from "@/lib/agency-os/phase4/validation";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const role = getRoleFromHeaders(request.headers);
  const allowed = requireInternalRole(role);
  if (!allowed.ok) {
    return NextResponse.json({ error: allowed.reason }, { status: 403 });
  }

  const { id } = await context.params;
  const payload = await request.json().catch(() => null);
  const parsed = automationToggleSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid automation toggle payload", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    automationId: id,
    status: parsed.data.enabled ? "enabled" : "disabled",
    actor: parsed.data.actor,
    note: "Demo response. Persist automation status + audit_logs in production wiring.",
  });
}
