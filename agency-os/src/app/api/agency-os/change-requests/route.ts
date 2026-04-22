import { NextResponse } from "next/server";
import { changeRequestCreateSchema } from "@/lib/agency-os/validation/schemas";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = changeRequestCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid change request payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: "submitted",
    changeRequest: {
      ...parsed.data,
      id: `cr-${Math.random().toString(36).slice(2, 10)}`,
      dateSubmitted: new Date().toISOString().slice(0, 10),
    },
    note: "Demo response. Persist to Supabase change_requests in production wiring.",
  });
}
