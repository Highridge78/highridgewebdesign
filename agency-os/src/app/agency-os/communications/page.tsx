import { InternalShell } from "@/components/agency-os/internal-shell";
import { SendMessageForm } from "@/components/agency-os/send-message-form";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getCommunications, getIntegrationConfigs } from "@/lib/agency-os/phase4/selectors";
import { IntegrationToggle } from "@/components/agency-os/integration-toggle";

export default function CommunicationsPage() {
  const messages = getCommunications();
  const integrations = getIntegrationConfigs();

  return (
    <InternalShell
      title="Structured Communications"
      subtitle="Workflow-tied, editable outbound communications with send state tracking and lightweight integrations."
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {messages.map((message) => (
            <article key={message.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{message.subject}</h2>
                  <p className="text-sm text-slate-400">{message.clientName} · {message.type}</p>
                </div>
                <StatusBadge
                  label={message.status}
                  tone={message.status === "sent" ? "good" : message.status === "failed" ? "bad" : "warn"}
                />
              </div>
              <SendMessageForm
                messageId={message.id}
                projectId={message.projectId}
                type={message.type}
                defaultSubject={message.subject}
                defaultBody={message.editableBody}
              />
            </article>
          ))}
        </div>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Light Integrations</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {integrations.map((integration) => (
              <li key={integration.id} className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                <p className="font-medium">{integration.provider}</p>
                <p className="text-slate-400">{integration.status}</p>
                <p className="mt-1 text-slate-300">{integration.notes}</p>
                <div className="mt-2">
                  <IntegrationToggle provider={integration.provider} initialEnabled={integration.enabled} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </InternalShell>
  );
}
