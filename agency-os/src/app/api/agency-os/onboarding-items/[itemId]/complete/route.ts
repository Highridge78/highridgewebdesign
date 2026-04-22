import { NextResponse } from "next/server";
import { onboardingCompleteSchema } from "@/lib/agency-os/validation/schemas";

export async function POST(
  request: Request,
  context: { params: Promise<{ itemId: string }> },
) {
  const { itemId } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = onboardingCompleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid onboarding completion payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    itemId,
    status: parsed.data.status,
    actor: parsed.data.actor,
    note: parsed.data.note,
    updatedAt: new Date().toISOString(),
    message: "Demo response. Persist onboarding_items status updates in production wiring.",
  });
}
