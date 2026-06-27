"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  QUOTE_OPTIONS,
  ASSET_FIELDS,
  APPLICANT_FIELDS,
  type Field,
  type Track,
} from "./quoteConfig";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type FormState = {
  insuranceType: string;
  track: Track;
  zip: string;
  assetInfo: Record<string, string>;
  currentlyInsured: "yes" | "no" | "";
  currentCarrier: string;
  currentPremium: string;
  driverInfo: Record<string, string>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "email" | "text";
  notes: string;
  consent: boolean;
  company: string; // honeypot
};

const initial: FormState = {
  insuranceType: "",
  track: "other",
  zip: "",
  assetInfo: {},
  currentlyInsured: "",
  currentCarrier: "",
  currentPremium: "",
  driverInfo: {},
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "phone",
  notes: "",
  consent: false,
  company: "",
};

const STEP_LABELS = ["Coverage", "Location", "Details", "Current", "Premium", "About you", "Contact", "Review"];
const TOTAL = STEP_LABELS.length;

type Errors = Record<string, string>;

export function QuoteWizard() {
  const params = useSearchParams();
  const presetType = params.get("type");
  const presetZip = params.get("zip");
  const presetPremium = params.get("premium");
  const validZip = !!presetZip && /^\d{5}$/.test(presetZip);

  const [form, setForm] = useState<FormState>(() => {
    const match = presetType
      ? QUOTE_OPTIONS.find((o) => o.value.toLowerCase().includes(presetType.toLowerCase()))
      : undefined;
    let f: FormState = match ? { ...initial, insuranceType: match.value, track: match.track } : { ...initial };
    if (validZip) f = { ...f, zip: presetZip! };
    if (presetPremium) f = { ...f, currentPremium: presetPremium.replace(/[^\d.]/g, "") };
    return f;
  });
  const [step, setStep] = useState(() => {
    if (presetType && validZip) return 2; // coverage + ZIP already known
    if (presetType) return 1;
    return 0;
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "comparing" | "done" | "error">("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const headingRef = useRef<HTMLDivElement>(null);

  const assetFields = ASSET_FIELDS[form.track];
  const applicantFields = APPLICANT_FIELDS[form.track];

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));
  const setAsset = (name: string, value: string) =>
    setForm((f) => ({ ...f, assetInfo: { ...f.assetInfo, [name]: value } }));
  const setDriver = (name: string, value: string) =>
    setForm((f) => ({ ...f, driverInfo: { ...f.driverInfo, [name]: value } }));
  const clearError = (key: string) =>
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));

  // Move focus to the step heading on change (keyboard + screen-reader friendly).
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, status]);

  const validate = (): Errors => {
    const e: Errors = {};
    switch (step) {
      case 0:
        if (!form.insuranceType) e.insuranceType = "Please choose a coverage type.";
        break;
      case 1:
        if (!/^\d{5}$/.test(form.zip)) e.zip = "Enter a valid 5-digit ZIP code.";
        break;
      case 2:
        for (const f of assetFields) {
          if (f.required && !form.assetInfo[f.name]?.trim()) e[f.name] = `Required.`;
        }
        break;
      case 5:
        for (const f of applicantFields) {
          if (f.required && !form.driverInfo[f.name]?.trim()) e[f.name] = `Required.`;
        }
        break;
      case 6:
        if (!form.firstName.trim()) e.firstName = "Required.";
        if (!form.lastName.trim()) e.lastName = "Required.";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Enter a valid email.";
        if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit phone.";
        break;
      case 7:
        if (!form.consent) e.consent = "Please agree to be contacted so we can send your quote.";
        break;
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  };
  const back = () => {
    setErrors({});
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };
  const goTo = (i: number) => {
    if (i < step) {
      setErrors({});
      setDirection(-1);
      setStep(i);
    }
  };

  const submit = async () => {
    // Guard against duplicate submissions (double-click / re-entry).
    if (status === "submitting" || status === "comparing" || status === "done") return;
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          insuranceType: form.insuranceType,
          zip: form.zip,
          assetInfo: form.assetInfo,
          currentlyInsured: form.currentlyInsured || undefined,
          currentCarrier: form.currentCarrier,
          currentPremium: form.currentPremium,
          driverInfo: form.driverInfo,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          preferredContact: form.preferredContact,
          notes: form.notes,
          consent: form.consent,
          company: form.company,
          source: "website-quote-wizard",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      // "Instant quote" feeling: brief comparing state before confirmation.
      setStatus("comparing");
      window.setTimeout(() => setStatus("done"), 2400);
    } catch {
      setStatus("error");
      setErrors({ submit: `Something went wrong. Please call us at ${site.phone.display}.` });
    }
  };

  if (status === "comparing") return <ComparingScreen type={form.insuranceType} />;
  if (status === "done") return <SuccessScreen name={form.firstName} type={form.insuranceType} />;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Stepper step={step} onJump={goTo} />

      <div className="mt-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <div
          key={step}
          className={cn(
            "outline-none",
            direction === 1
              ? "[animation:fade-up_0.4s_var(--ease-out-soft)_both]"
              : "[animation:fade-in_0.3s_ease_both]",
          )}
        >
          {/* STEP 0 — coverage type */}
          {step === 0 && (
            <Step refEl={headingRef} title="What are you looking to insure?" subtitle="Pick the coverage you need — you can add more later.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {QUOTE_OPTIONS.map((opt) => {
                  const active = form.insuranceType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        set({ insuranceType: opt.value, track: opt.track, assetInfo: {}, driverInfo: {} });
                        clearError("insuranceType");
                      }}
                      className={cn(
                        "card-hover flex min-h-[6.5rem] flex-col items-start gap-2 rounded-2xl border p-4 text-left",
                        active
                          ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600/25"
                          : "border-ink-100 bg-white hover:border-brand-200 hover:bg-brand-50/40",
                      )}
                    >
                      <span className={cn("grid h-10 w-10 place-items-center rounded-xl transition-colors", active ? "bg-brand-800 text-white" : "bg-brand-50 text-brand-700")}>
                        <Icon name={opt.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-ink-900">{opt.label}</span>
                      <span className="text-xs text-ink-500">{opt.blurb}</span>
                    </button>
                  );
                })}
              </div>
              <FieldError msg={errors.insuranceType} />
            </Step>
          )}

          {/* STEP 1 — ZIP */}
          {step === 1 && (
            <Step refEl={headingRef} title="What's your ZIP code?" subtitle="This helps us match you with carriers and rates in your area.">
              <input
                autoFocus
                inputMode="numeric"
                aria-label="ZIP code"
                maxLength={5}
                value={form.zip}
                onChange={(e) => { set({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) }); clearError("zip"); }}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder="33012"
                className={cn(
                  "w-full max-w-xs rounded-2xl border px-5 py-4 text-2xl font-bold tracking-[0.3em] text-ink-900 outline-none transition focus:ring-2",
                  errors.zip ? "border-accent-400 focus:border-accent-500 focus:ring-accent-500/20" : "border-ink-200 focus:border-brand-600 focus:ring-brand-600/20",
                )}
              />
              <FieldError msg={errors.zip} />
            </Step>
          )}

          {/* STEP 2 — asset details */}
          {step === 2 && (
            <Step refEl={headingRef} title={assetTitle(form.track)} subtitle="A few quick details so we can find your best rate.">
              <FieldGrid fields={assetFields} values={form.assetInfo} errors={errors} onChange={(n, v) => { setAsset(n, v); clearError(n); }} />
            </Step>
          )}

          {/* STEP 3 — current insurance */}
          {step === 3 && (
            <Step refEl={headingRef} title="Do you currently have insurance?" subtitle="If you do, comparing helps us beat your current rate.">
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={form.currentlyInsured === v}
                    onClick={() => set({ currentlyInsured: v })}
                    className={cn(
                      "min-h-[3.25rem] flex-1 rounded-2xl border px-5 py-4 text-base font-semibold transition-all",
                      form.currentlyInsured === v ? "border-brand-600 bg-brand-50 text-brand-800 ring-2 ring-brand-600/25" : "border-ink-200 text-ink-700 hover:border-brand-200",
                    )}
                  >
                    {v === "yes" ? "Yes, I'm insured" : "No / It lapsed"}
                  </button>
                ))}
              </div>
              {form.currentlyInsured === "yes" && (
                <div className="mt-5 [animation:fade-up_0.3s_ease_both]">
                  <Label>Current carrier (optional)</Label>
                  <input value={form.currentCarrier} onChange={(e) => set({ currentCarrier: e.target.value })} placeholder="e.g. GEICO, Progressive, State Farm" className={inputClass(false)} />
                </div>
              )}
            </Step>
          )}

          {/* STEP 4 — current premium */}
          {step === 4 && (
            <Step refEl={headingRef} title="What are you paying now?" subtitle="Optional — but it helps us show exactly how much you could save.">
              <Label>Current monthly premium</Label>
              <div className="relative max-w-xs">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-ink-400">$</span>
                <input
                  inputMode="numeric"
                  aria-label="Current monthly premium"
                  value={form.currentPremium}
                  onChange={(e) => set({ currentPremium: e.target.value.replace(/[^\d.]/g, "") })}
                  placeholder="0"
                  className="w-full rounded-2xl border border-ink-200 py-4 pl-8 pr-4 text-lg font-semibold text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>
              <p className="mt-3 text-sm text-ink-500">Not sure? No problem — just skip ahead.</p>
            </Step>
          )}

          {/* STEP 5 — applicant info */}
          {step === 5 && (
            <Step refEl={headingRef} title="Tell us a little about you" subtitle="This lets us tailor your quote accurately.">
              <FieldGrid fields={applicantFields} values={form.driverInfo} errors={errors} onChange={(n, v) => { setDriver(n, v); clearError(n); }} />
            </Step>
          )}

          {/* STEP 6 — contact */}
          {step === 6 && (
            <Step refEl={headingRef} title="Where should we send your quote?" subtitle="We'll reach out with your personalized options — no spam, ever.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="First name" value={form.firstName} onChange={(v) => { set({ firstName: v }); clearError("firstName"); }} error={errors.firstName} autoComplete="given-name" autoFocus />
                <TextInput label="Last name" value={form.lastName} onChange={(v) => { set({ lastName: v }); clearError("lastName"); }} error={errors.lastName} autoComplete="family-name" />
                <TextInput label="Email" type="email" value={form.email} onChange={(v) => { set({ email: v }); clearError("email"); }} error={errors.email} autoComplete="email" />
                <TextInput label="Phone" type="tel" value={form.phone} onChange={(v) => { set({ phone: v }); clearError("phone"); }} error={errors.phone} autoComplete="tel" />
              </div>
              <div className="mt-4">
                <Label>Preferred contact method</Label>
                <div className="flex gap-2">
                  {(["phone", "text", "email"] as const).map((m) => (
                    <button key={m} type="button" aria-pressed={form.preferredContact === m} onClick={() => set({ preferredContact: m })}
                      className={cn("min-h-[2.75rem] flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition-all", form.preferredContact === m ? "border-brand-600 bg-brand-50 text-brand-800" : "border-ink-200 text-ink-600 hover:border-brand-200")}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set({ company: e.target.value })} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
            </Step>
          )}

          {/* STEP 7 — review + consent */}
          {step === 7 && (
            <Step refEl={headingRef} title="Review & submit" subtitle="Confirm your details and we'll get to work comparing carriers.">
              <dl className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50/50">
                <Row label="Coverage" value={form.insuranceType} onEdit={() => goTo(0)} />
                <Row label="ZIP code" value={form.zip} onEdit={() => goTo(1)} />
                {Object.entries(form.assetInfo).filter(([, v]) => v).map(([k, v]) => (
                  <Row key={k} label={prettify(k)} value={v} onEdit={() => goTo(2)} />
                ))}
                {form.currentlyInsured && <Row label="Currently insured" value={form.currentlyInsured} onEdit={() => goTo(3)} />}
                {form.currentPremium && <Row label="Current premium" value={`$${form.currentPremium}/mo`} onEdit={() => goTo(4)} />}
                <Row label="Name" value={`${form.firstName} ${form.lastName}`} onEdit={() => goTo(6)} />
                <Row label="Email" value={form.email} onEdit={() => goTo(6)} />
                <Row label="Phone" value={form.phone} onEdit={() => goTo(6)} />
              </dl>

              <div className="mt-5">
                <Label>Anything else we should know? (optional)</Label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set({ notes: e.target.value.slice(0, 2000) })}
                  rows={3}
                  maxLength={2000}
                  placeholder="Add any details that would help us prepare your quote."
                  aria-label="Additional notes"
                  className="mt-1.5 w-full resize-y rounded-xl border border-ink-200 px-4 py-3 text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>

              <label className={cn("mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm text-ink-600 transition-colors", errors.consent ? "border-accent-300 bg-accent-50/50" : "border-transparent")}>
                <input type="checkbox" checked={form.consent} onChange={(e) => { set({ consent: e.target.checked }); clearError("consent"); }} className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-ink-300 text-brand-700 focus:ring-brand-600" />
                <span>
                  I agree to be contacted by {site.name} by phone, text, or email about my quote. Message rates may apply. This consent isn&apos;t required to purchase.
                </span>
              </label>
              <FieldError msg={errors.consent} />
            </Step>
          )}
        </div>

        {errors.submit && (
          <p className="mt-4 rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700" role="alert">{errors.submit}</p>
        )}

        {/* Nav */}
        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex min-h-[2.75rem] items-center rounded-full px-4 text-sm font-semibold text-ink-500 transition-colors hover:text-ink-800">
              ← Back
            </button>
          ) : <span />}

          {step < TOTAL - 1 ? (
            <div className="flex items-center gap-2">
              {(step === 3 || step === 4 || step === 5) && (
                <button type="button" onClick={next} className="px-3 py-2.5 text-sm font-medium text-ink-400 transition-colors hover:text-ink-700">Skip</button>
              )}
              <button type="button" onClick={next} className="shine inline-flex min-h-[3rem] items-center gap-2 rounded-full bg-brand-800 px-7 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-900 hover:shadow-card">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          ) : (
            <button type="button" onClick={submit} disabled={status === "submitting"}
              className="shine inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-accent-600 px-7 font-semibold text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-accent-700 disabled:translate-y-0 disabled:opacity-80">
              {status === "submitting" ? (<><Spinner /> Sending…</>) : "Get My Free Quote"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-ink-500">
        Prefer to talk? Call{" "}
        <a href={site.phone.href} className="font-semibold text-brand-700 hover:text-brand-900">{site.phone.display}</a>{" "}
        · Se habla español
      </p>
    </div>
  );
}

/* ------------------------------- Stepper -------------------------------- */

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  const pct = Math.round((step / (TOTAL - 1)) * 100);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-brand-800">Step {step + 1} of {TOTAL}</span>
        <span className="text-ink-500">{STEP_LABELS[step]}</span>
      </div>

      {/* Mobile: segmented bar */}
      <div className="flex gap-1.5 sm:hidden">
        {STEP_LABELS.map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i <= step ? "bg-brand-700" : "bg-ink-100")} />
        ))}
      </div>

      {/* Desktop: numbered dots with progress line */}
      <div className="relative hidden items-center justify-between sm:flex">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink-100" aria-hidden />
        <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand-700 transition-all duration-500" style={{ width: `${pct}%` }} aria-hidden />
        {STEP_LABELS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= step}
              aria-current={current ? "step" : undefined}
              className="group relative z-10 flex flex-col items-center"
              title={label}
            >
              <span className={cn(
                "grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold transition-all",
                done ? "border-brand-700 bg-brand-700 text-white" : current ? "border-brand-700 bg-white text-brand-800 ring-4 ring-brand-100" : "border-ink-200 bg-white text-ink-400",
                i < step && "cursor-pointer hover:scale-105",
              )}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                ) : i + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function inputClass(hasError: boolean) {
  return cn(
    "mt-1.5 w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition focus:ring-2",
    hasError ? "border-accent-400 focus:border-accent-500 focus:ring-accent-500/20" : "border-ink-200 focus:border-brand-600 focus:ring-brand-600/20",
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-ink-700">{children}</label>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent-700" role="alert">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
      {msg}
    </p>
  );
}

function TextInput({
  label, value, onChange, error, type = "text", autoComplete, autoFocus,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string;
  type?: string; autoComplete?: string; autoFocus?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-label={label}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(!!error)}
      />
      <FieldError msg={error} />
    </div>
  );
}

function Step({ title, subtitle, children, refEl }: { title: string; subtitle?: string; children: React.ReactNode; refEl?: React.Ref<HTMLDivElement> }) {
  return (
    <div>
      <div ref={refEl} tabIndex={-1} className="outline-none">
        <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-[0.97rem] text-ink-500">{subtitle}</p>}
      </div>
      <div className="relative mt-6">{children}</div>
    </div>
  );
}

function FieldGrid({
  fields, values, errors, onChange,
}: {
  fields: Field[]; values: Record<string, string>; errors: Errors;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name}>
          <Label>
            {f.label}
            {f.required && <span className="text-accent-600"> *</span>}
          </Label>
          {f.type === "select" ? (
            <select value={values[f.name] ?? ""} aria-invalid={!!errors[f.name]} onChange={(e) => onChange(f.name, e.target.value)} className={inputClass(!!errors[f.name])}>
              <option value="">Select…</option>
              {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input value={values[f.name] ?? ""} aria-invalid={!!errors[f.name]} onChange={(e) => onChange(f.name, e.target.value)} placeholder={f.placeholder} className={inputClass(!!errors[f.name])} />
          )}
          <FieldError msg={errors[f.name]} />
        </div>
      ))}
    </div>
  );
}

function Row({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
      <dt className="text-ink-500">{label}</dt>
      <dd className="flex items-center gap-2 text-right font-semibold text-ink-900">
        <span className="max-w-[14rem] truncate">{value}</span>
        {onEdit && (
          <button type="button" onClick={onEdit} className="text-xs font-semibold text-brand-700 hover:text-brand-900" aria-label={`Edit ${label}`}>Edit</button>
        )}
      </dd>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SuccessScreen({ name }: { name: string; type: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card [animation:scale-in_0.5s_var(--ease-out-soft)_both] sm:p-10">
      <div className="relative mx-auto grid h-20 w-20 place-items-center">
        <span className="absolute inset-0 rounded-full bg-brand-100 [animation:pop-ring_0.8s_ease-out_forwards]" aria-hidden />
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-700">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
            <path d="M8 12.5l2.6 2.6L16 9" strokeDasharray="28" className="[animation:draw-check_0.6s_ease-out_0.2s_both]" />
          </svg>
        </span>
      </div>

      <h2 className="mt-5 text-3xl font-extrabold text-ink-900">Thank you{name ? `, ${name}` : ""}!</h2>
      <p className="mx-auto mt-3 max-w-md text-lg text-ink-700">
        Your quote request has been received.
      </p>
      <p className="mx-auto mt-2 max-w-md text-ink-600">
        {site.agent.name} or a member of our team will contact you shortly.
      </p>

      <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-700" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" strokeLinecap="round" /></svg>
        Most requests are reviewed within one business hour during business hours.
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-brand-800 px-6 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-900 hover:shadow-card"
        >
          Return Home
        </Link>
        <a
          href={site.phone.href}
          className="shine inline-flex min-h-[3rem] items-center justify-center rounded-full bg-accent-600 px-6 font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-accent-700"
        >
          Call Now: {site.phone.display}
        </a>
      </div>
    </div>
  );
}

function ComparingScreen({ type }: { type: string }) {
  const steps = ["Reviewing your details", "Comparing 20+ carriers", "Checking every discount"];
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card [animation:scale-in_0.4s_var(--ease-out-soft)_both] sm:p-10">
      <div className="relative mx-auto grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 rounded-full border-4 border-brand-100" aria-hidden />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-700" aria-hidden />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-brand-700" aria-hidden>
          <circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="mt-5 text-2xl font-bold text-ink-900">We&apos;re comparing your options</h2>
      <p className="mx-auto mt-2 max-w-sm text-ink-600">
        Finding your best {type.toLowerCase()} rate across our carriers…
      </p>
      <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2.5 text-sm text-ink-700 [animation:fade-up_0.4s_ease_both]" style={{ animationDelay: `${i * 0.5}s` }}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-white">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function assetTitle(track: Track) {
  return {
    auto: "Tell us about your vehicle",
    home: "Tell us about your property",
    business: "Tell us about your business",
    life: "Tell us about your coverage goals",
    health: "Tell us about your household",
    other: "Tell us what you need",
  }[track];
}

function prettify(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
