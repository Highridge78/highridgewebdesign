import { NextResponse } from "next/server";
import { approvalDecisionSchema } from "@/lib/agency-os/validation/schemas";

export async function POST(
  request: Request,
  context: { params: Promise<{ approvalId: string }> },
) {
  const { approvalId } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = approvalDecisionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid approval decision payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const status = parsed.data.action === "approve" ? "approved" : "rejected";

  return NextResponse.json({
    ok: true,
    approvalId,
    status,
    actor: parsed.data.actor,
    revisionReason: parsed.data.revisionReason,
    timestamp: now,
    note: "Demo response. Persist to Supabase approvals + approval_events in production wiring.",
  });
}
