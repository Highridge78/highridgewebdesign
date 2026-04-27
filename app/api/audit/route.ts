export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auditRequestSchema } from "@/shared/audit";
import { runWebsiteAudit } from "@/server/audit";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = auditRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_URL",
        message: parsed.error.issues[0]?.message ?? "A valid URL is required.",
      },
      { status: 400 },
    );
  }

  try {
    const audit = await runWebsiteAudit(parsed.data.url);
    return NextResponse.json({ ok: true, audit });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const causeMessage =
      err instanceof Error && err.cause instanceof Error ? err.cause.message : "";
    const fullMessage = `${message} ${causeMessage}`;
    console.error("Audit failed", { url: parsed.data.url, message, causeMessage });

    if (message.includes("Invalid URL")) {
      return NextResponse.json(
        {
          ok: false,
          error: "INVALID_URL",
          message:
            "The submitted URL is not valid. Please include a full URL such as https://example.com.",
        },
        { status: 400 },
      );
    }
    if (message.includes("timed out")) {
      return NextResponse.json(
        {
          ok: false,
          error: "FETCH_FAILED",
          message:
            "The site did not respond in time. It may be down or blocking automated requests.",
        },
        { status: 504 },
      );
    }
    if (message.includes("Non-HTML")) {
      return NextResponse.json(
        {
          ok: false,
          error: "NON_HTML_RESPONSE",
          message:
            "The URL did not return an HTML page. Please submit a standard website homepage.",
        },
        { status: 422 },
      );
    }
    if (/fetch failed|ENOTFOUND|ECONNREFUSED|ECONNRESET|EAI_AGAIN|HTTP [45]/.test(fullMessage)) {
      return NextResponse.json(
        {
          ok: false,
          error: "FETCH_FAILED",
          message: "Unable to reach the submitted site. Please check the URL and try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "AUDIT_FAILED",
        message: "The audit could not be completed. Please try again.",
      },
      { status: 500 },
    );
  }
}
