import { NextResponse } from "next/server";
import { getRoleFromHeaders, requireInternalRole } from "@/lib/agency-os/phase4/permissions";
import { communicationSendSchema } from "@/lib/agency-os/phase4/validation";

export async function POST(request: Request) {
  const role = getRoleFromHeaders(request.headers);
  const allowed = requireInternalRole(role);
  if (!allowed.ok) {
    return NextResponse.json({ error: allowed.reason }, { status: 403 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = communicationSendSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid communication payload", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    messageId: parsed.data.messageId,
    status: "sent",
    sentAt: new Date().toISOString(),
    note: "Demo send path. Integrate Resend provider for production delivery.",
  });
}
