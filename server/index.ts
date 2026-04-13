import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REQUIRED_TWILIO_ENV_VARS = [
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_FROM_PHONE_NUMBER",
] as const;

type SmsTestBody = {
  to?: unknown;
  message?: unknown;
};

type TwilioLikeError = {
  status?: number;
  message?: string;
};

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json());

  app.post("/api/test-sms", async (req, res) => {
    const missingEnvVars = REQUIRED_TWILIO_ENV_VARS.filter(
      (envVar) => !process.env[envVar]?.trim()
    );

    if (missingEnvVars.length > 0) {
      return res.status(500).json({
        error: "Missing required Twilio environment variables.",
        missing: missingEnvVars,
      });
    }

    const body = (req.body ?? {}) as SmsTestBody;
    const to =
      typeof body.to === "string" && body.to.trim()
        ? body.to.trim()
        : process.env.TWILIO_TEST_TO_PHONE_NUMBER?.trim();

    if (!to) {
      return res.status(400).json({
        error:
          "Missing destination phone number. Provide `to` in the request body or set TWILIO_TEST_TO_PHONE_NUMBER.",
      });
    }

    const messageText =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim()
        : `Twilio SMS test from ${process.env.NODE_ENV ?? "development"} at ${new Date().toISOString()}`;

    if (messageText.length > 1600) {
      return res.status(400).json({
        error: "Message exceeds Twilio's 1600 character SMS limit.",
      });
    }

    try {
      const twilioModule = await import("twilio");
      const twilioClientFactory = twilioModule.default;
      const client = twilioClientFactory(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );

      const sentMessage = await client.messages.create({
        from: process.env.TWILIO_FROM_PHONE_NUMBER!,
        to,
        body: messageText,
      });

      return res.status(200).json({
        ok: true,
        sid: sentMessage.sid,
        status: sentMessage.status,
      });
    } catch (error: unknown) {
      console.error("Twilio SMS test failed:", error);

      const twilioError = error as TwilioLikeError;
      const statusCode =
        typeof twilioError.status === "number" &&
        twilioError.status >= 400 &&
        twilioError.status <= 599
          ? twilioError.status
          : 500;

      return res.status(statusCode).json({
        error: "Failed to send Twilio SMS test message.",
        details:
          typeof twilioError.message === "string"
            ? twilioError.message
            : "Unknown Twilio error.",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
