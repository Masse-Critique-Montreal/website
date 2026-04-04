'use client'
import { useCallback, useEffect, createContext, useContext, useState } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface TelemetryView {
  id: string;
  page: string;
  url: string;
  params: Record<string, string>;
  timestamp: string;
}

export interface TelemetrySession {
  sessionId: string;
  firstVisit: string;
  isFirstVisit: boolean;
  visitCount: number;
  views: TelemetryView[];
}

export interface TelemetryAPI {
  track: (pageName?: string, event?:string) => TelemetryView;
  getSession: () => TelemetrySession | null;
  clearSession: () => void;
}

// ─────────────────────────────────────────────
// Storage
// ─────────────────────────────────────────────

const STORAGE_KEY = "__telemetry__";

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function getStore(): TelemetrySession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TelemetrySession) : null;
  } catch {
    return null; // SSR / private mode
  }
}

function saveStore(data: TelemetrySession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // unavailable in SSR / private mode
  }
}

function getOrCreateSession(): TelemetrySession {
  const existing = getStore();
  if (existing) return existing;

  const session: TelemetrySession = {
    sessionId: generateId(),
    firstVisit: new Date().toISOString(),
    isFirstVisit: true,
    visitCount: 0,
    views: [],
  };
  saveStore(session);
  return session;
}

function serverTrack({ sessionId, url, params, bottom, referrer }: {
  sessionId?: string;
  url?: string;
  params?: string;
  bottom: boolean;
  referrer?: string;
}) {
  const uri = `${process.env.NEXT_PUBLIC_HOST}/api/t`;
  console.log(uri)
  console.log(sessionId, url, params, referrer, bottom)
  fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, url, referrer, params, bottom })
  });
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useTelemetry(): TelemetryAPI {
  const track = useCallback((pageName?: string, event?:string): TelemetryView => {
    const session = getOrCreateSession();
    const params = Object.fromEntries(new URLSearchParams(window.location.search));

    const view: TelemetryView = {
      id: generateId(),
      page: pageName ?? window.location.pathname,
      url: window.location.pathname,
      params,
      timestamp: new Date().toISOString(),
    };

    session.visitCount += 1;
    session.isFirstVisit = session.visitCount === 1;
    session.views = [...session.views, view];
    saveStore(session);

    serverTrack({
      sessionId: session.sessionId,
      url: window.location.pathname,
      params: window.location.search,
      bottom: event === 'end',
      referrer: document.referrer
    })

    return view;
  }, []);

  const getSession = useCallback((): TelemetrySession | null => getStore(), []);

  const clearSession = useCallback((): void => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { track, getSession, clearSession };
}

// ─────────────────────────────────────────────
// Provider — auto-tracks when a page mounts
// ─────────────────────────────────────────────

const TelemetryContext = createContext<TelemetryAPI | null>(null);

export interface TelemetryProviderProps {
  pageName?: string;
}

/**
 * Wrap a page (or your whole app) with this provider.
 * It will automatically call track() on mount.
 *
 * @example
 * <TelemetryProvider pageName="pricing">
 *   <PricingPage />
 * </TelemetryProvider>
 */
export function TelemetryProvider({ pageName }: TelemetryProviderProps) {
  const api = useTelemetry();
  const [hitBottom, setHitBottom] = useState(false);

  useEffect(() => {
    api.track(pageName);
  }, [pageName]);


  useEffect(() => {
    const handleScroll = () => {
      if (hitBottom) return;

      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      if (bottom && !hitBottom) {
        api.track(pageName, 'end');
        setHitBottom(true);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hitBottom]);

  return (
    <TelemetryContext.Provider value={api}></TelemetryContext.Provider>
  );
}

/**
 * Consume the telemetry API from any component inside TelemetryProvider.
 *
 * @example
 * const { getSession } = useTelemetryContext();
 * const session = getSession();
 * if (session?.isFirstVisit) showWelcomeBanner();
 */
export function useTelemetryContext(): TelemetryAPI {
  const ctx = useContext(TelemetryContext);
  if (!ctx) throw new Error("useTelemetryContext must be used inside <TelemetryProvider>, add a children prop to the TelemetryProvider. For now no children is used.");
  return ctx;
}