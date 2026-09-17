/**
 * Returns days remaining until appExpiry, compared date-only in local time.
 * Using local date components avoids UTC-midnight vs local-timezone drift
 * (e.g. "2026-09-26" parsed as UTC can look like Sept 25 local in UTC+5:30).
 *
 * Returns null  → appExpiry is falsy (not set)
 * Returns <= 0  → expired
 * Returns 1-10  → expiring soon
 * Returns > 10  → active
 */
export function daysUntilExpiry(appExpiry: string | null | undefined): number | null {
  if (!appExpiry) return null;

  // Extract YYYY-MM-DD from any ISO-ish format
  const match = appExpiry.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const [, y, m, d] = match;
  const expiry = new Date(Number(y), Number(m) - 1, Number(d)); // local midnight
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return Math.ceil((expiry.getTime() - todayMidnight.getTime()) / 86400000);
}

export type AccessVariant = 'expiring_soon' | 'expired' | 'not_activated';

export function getAccessVariant(
  appExpiry: string | null | undefined,
): { variant: AccessVariant; daysLeft: number | null; isBlocked: boolean; isNearExpiry: boolean } {
  if (appExpiry === undefined) {
    return { variant: 'not_activated', daysLeft: null, isBlocked: false, isNearExpiry: false };
  }
  if (appExpiry === null) {
    return { variant: 'not_activated', daysLeft: null, isBlocked: true, isNearExpiry: false };
  }

  const daysLeft = daysUntilExpiry(appExpiry);
  if (daysLeft === null) {
    return { variant: 'expired', daysLeft: null, isBlocked: true, isNearExpiry: false };
  }

  const isBlocked = daysLeft <= 0;
  const isNearExpiry = daysLeft > 0 && daysLeft <= 10;
  const variant: AccessVariant = isNearExpiry ? 'expiring_soon' : isBlocked ? 'expired' : 'not_activated';

  return { variant, daysLeft, isBlocked, isNearExpiry };
}
