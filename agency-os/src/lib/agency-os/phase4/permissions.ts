import { UserRole } from "@/lib/agency-os/phase4/types";

export function getRoleFromHeaders(headersObj: Headers): UserRole {
  const role = headersObj.get("x-agency-role") as UserRole | null;
  if (!role) return "ops";
  if (["admin", "ops", "account-manager", "client"].includes(role)) return role;
  return "ops";
}

export function requireInternalRole(role: UserRole): { ok: boolean; reason?: string } {
  if (role === "client") {
    return { ok: false, reason: "Client role is not permitted for this endpoint." };
  }
  return { ok: true };
}
