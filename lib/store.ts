"use client";

// Local-storage data layer (temporary until the real backend is wired).
// Landing pages, lead submissions, and timesheets all persist per browser.

export interface LandingPage {
  slug: string;
  title: string;
  projectId: string;
  headline: string;
  subtext: string;
  whatsapp: string;
  showPhone: boolean;
  showEmail: boolean;
  active: boolean;
  createdAt: number;
}

export interface LeadSubmission {
  id: string;
  pageSlug: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: number;
}

export type AuxStatus = "available" | "break15" | "lunch60" | "off";

export interface TimeEvent {
  id: string;
  type: "clock-in" | "clock-out" | "aux";
  aux?: AuxStatus;
  ts: number;
}

const PAGES_KEY = "lugar_pages";
const LEADS_KEY = "lugar_leads";
const TIME_PREFIX = "lugar_time_";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Landing pages ----------
export const listPages = (): LandingPage[] => read<LandingPage[]>(PAGES_KEY, []);
export const getPage = (slug: string): LandingPage | undefined =>
  listPages().find((p) => p.slug === slug && p.active);

export function savePage(page: LandingPage) {
  const pages = listPages();
  const i = pages.findIndex((p) => p.slug === page.slug);
  if (i >= 0) pages[i] = page;
  else pages.push(page);
  write(PAGES_KEY, pages);
}

export function deletePage(slug: string) {
  write(PAGES_KEY, listPages().filter((p) => p.slug !== slug));
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF]+/g, "-").replace(/^-+|-+$/g, "") || `page-${Date.now()}`;

// ---------- Leads ----------
export const listLeads = (slug?: string): LeadSubmission[] => {
  const all = read<LeadSubmission[]>(LEADS_KEY, []);
  return slug ? all.filter((l) => l.pageSlug === slug) : all;
};

export function saveLead(lead: Omit<LeadSubmission, "id" | "createdAt">) {
  const all = read<LeadSubmission[]>(LEADS_KEY, []);
  all.unshift({ ...lead, id: `lead-${Date.now()}`, createdAt: Date.now() });
  write(LEADS_KEY, all);
}

// ---------- Timesheet ----------
export const SHIFT_HOURS = 8;
export const BREAK_RULES = [
  { id: "small1", label: "Small break · 15 min", minutes: 15, maxPerShift: 2 },
  { id: "lunch", label: "Lunch break · 60 min", minutes: 60, maxPerShift: 1 },
];

export const listEvents = (email: string): TimeEvent[] => read<TimeEvent[]>(TIME_PREFIX + email.toLowerCase(), []);

export function pushEvent(email: string, ev: Omit<TimeEvent, "id" | "ts">) {
  const key = TIME_PREFIX + email.toLowerCase();
  const all = read<TimeEvent[]>(key, []);
  all.push({ ...ev, id: `ev-${Date.now()}`, ts: Date.now() });
  write(key, all);
  return all;
}

export function dayKey(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Worked milliseconds today (clock-in → now or clock-out, minus nothing). */
export function workedToday(events: TimeEvent[]): number {
  const today = dayKey(Date.now());
  const day = events.filter((e) => dayKey(e.ts) === today).sort((a, b) => a.ts - b.ts);
  let total = 0;
  let open: number | null = null;
  for (const e of day) {
    if (e.type === "clock-in") open = e.ts;
    if (e.type === "clock-out" && open !== null) {
      total += e.ts - open;
      open = null;
    }
  }
  if (open !== null) total += Date.now() - open;
  return total;
}

export function isClockedIn(events: TimeEvent[]): boolean {
  const today = dayKey(Date.now());
  const day = events.filter((e) => dayKey(e.ts) === today).sort((a, b) => a.ts - b.ts);
  let open = false;
  for (const e of day) {
    if (e.type === "clock-in") open = true;
    if (e.type === "clock-out") open = false;
  }
  return open;
}

export function currentAux(events: TimeEvent[]): AuxStatus {
  const today = dayKey(Date.now());
  const day = events.filter((e) => dayKey(e.ts) === today).sort((a, b) => a.ts - b.ts);
  let aux: AuxStatus = "available";
  for (const e of day) {
    if (e.type === "aux" && e.aux) aux = e.aux;
    if (e.type === "clock-in") aux = "available";
  }
  return aux;
}

export function fmtDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
