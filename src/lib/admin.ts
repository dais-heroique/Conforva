const ADMIN_EMAILS = ["t.dufour1703@gmail.com"]

export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase())
}

const UNLIMITED = 999999

export function withUnlimitedAccess<T extends { competitorLimit: number; productLimit: number; alertLimit: number; plan: string }>(
  org: T,
  email?: string | null
): T {
  if (!isAdminEmail(email)) return org
  return { ...org, competitorLimit: UNLIMITED, productLimit: UNLIMITED, alertLimit: UNLIMITED, plan: "enterprise" }
}
