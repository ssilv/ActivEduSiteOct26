"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { club, courses, mapEmbedUrl, mapUrl, socialLinks } from "@/config/constants";
import { submitEnrollment } from "@/app/actions/enrollment";
import {
  initialEnrollmentState,
  type EnrollmentField,
  type EnrollmentState,
} from "@/lib/enrollment";
import { buttonPrimary, container, fieldClass } from "@/lib/styles";
import { SectionHeading } from "@/components/SectionHeading";

const fieldOrder: EnrollmentField[] = [
  "parentName",
  "childName",
  "age",
  "course",
  "phone",
  "email",
  "message",
];

export function ContactSection() {
  const params = useSearchParams();
  const requested = params.get("curs") ?? "";
  const requestedId = courses.some((course) => course.id === requested) ? requested : "";
  const [courseId, setCourseId] = useState(requestedId);
  const [seenRequest, setSeenRequest] = useState(requestedId);
  const [state, formAction, pending] = useActionState(submitEnrollment, initialEnrollmentState);
  const [hiddenStamp, setHiddenStamp] = useState(0);

  if (requestedId !== seenRequest) {
    setSeenRequest(requestedId);
    setCourseId(requestedId);
  }

  const showSuccess = state.status === "success" && state.stamp !== hiddenStamp;

  useEffect(() => {
    if (state.status !== "error") return;
    const firstInvalid = fieldOrder.find((name) => state.fieldErrors[name]);
    if (!firstInvalid) return;
    document.getElementById(firstInvalid)?.focus();
  }, [state]);

  return (
    <section id="contact" aria-labelledby="titlu-contact" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={`${container} grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
        <div>
          <SectionHeading
            id="titlu-contact"
            eyebrow="Înscriere"
            title="Programează o lecție demo."
          >
            Spune-ne câteva lucruri despre copil. Stabilim împreună grupa și ora, în funcție de
            vârstă și de curs.
          </SectionHeading>

          <dl className="mt-8 space-y-4 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-900">Adresă</dt>
              <dd className="mt-1">
                <address className="not-italic">
                  {club.address}
                  <span className="mt-1 block text-slate-600">{club.addressNote}</span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Program</dt>
              <dd className="mt-1">
                <ul>
                  {club.hours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </dd>
            </div>
            {club.phoneDisplay ? (
              <div>
                <dt className="font-semibold text-slate-900">Telefon</dt>
                <dd className="mt-1">
                  {club.phoneHref ? (
                    <a href={club.phoneHref} className="font-semibold text-blue-700 hover:text-blue-800">
                      {club.phoneDisplay}
                    </a>
                  ) : (
                    club.phoneDisplay
                  )}
                </dd>
              </div>
            ) : null}
            {club.email ? (
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${club.email}`} className="font-semibold text-blue-700 hover:text-blue-800">
                    {club.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {socialLinks
              .filter((item) => item.href.startsWith("http"))
              .map((item) => (
                <div key={item.href}>
                  <dt className="font-semibold text-slate-900">{item.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={item.href}
                      className="font-semibold text-blue-700 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.href.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </dd>
                </div>
              ))}
          </dl>
          <div className="mt-6">
            <iframe
              title="Harta cu locația ActivEdu din Buzău"
              src={mapEmbedUrl}
              className="h-64 w-full rounded-2xl border border-slate-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapUrl}
              className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deschide în Google Maps
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {showSuccess ? (
            <SuccessPanel
              state={state}
              onReset={() => setHiddenStamp(state.stamp)}
            />
          ) : (
            <form action={formAction} className="space-y-5" noValidate aria-describedby="nota-date">
              <p id="nota-date" className="text-sm leading-6 text-slate-600">
                Câmpurile marcate cu <span aria-hidden="true">*</span>
                <span className="sr-only">asterisc</span> sunt obligatorii. Folosim datele doar ca
                să programăm lecția demo.
              </p>

              {state.status === "error" && state.message ? (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {state.message}
                </p>
              ) : null}

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Site web</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="parentName" label="Numele părintelui" error={state.fieldErrors.parentName}>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    required
                    maxLength={80}
                    className={fieldClass}
                    aria-invalid={Boolean(state.fieldErrors.parentName)}
                    aria-describedby={state.fieldErrors.parentName ? "parentName-error" : undefined}
                  />
                </Field>
                <Field id="childName" label="Numele copilului" error={state.fieldErrors.childName}>
                  <input
                    id="childName"
                    name="childName"
                    type="text"
                    autoComplete="off"
                    autoCapitalize="words"
                    required
                    maxLength={80}
                    className={fieldClass}
                    aria-invalid={Boolean(state.fieldErrors.childName)}
                    aria-describedby={state.fieldErrors.childName ? "childName-error" : undefined}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="age" label="Vârsta copilului" error={state.fieldErrors.age}>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    inputMode="numeric"
                    min={6}
                    max={18}
                    required
                    className={fieldClass}
                    aria-invalid={Boolean(state.fieldErrors.age)}
                    aria-describedby={state.fieldErrors.age ? "age-error" : undefined}
                  />
                </Field>
                <Field id="phone" label="Telefon" error={state.fieldErrors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    placeholder="07xx xxx xxx"
                    className={fieldClass}
                    aria-invalid={Boolean(state.fieldErrors.phone)}
                    aria-describedby={state.fieldErrors.phone ? "phone-error" : undefined}
                  />
                </Field>
              </div>

              <Field id="course" label="Cursul dorit" error={state.fieldErrors.course}>
                <select
                  id="course"
                  name="course"
                  required
                  value={courseId}
                  onChange={(event) => setCourseId(event.target.value)}
                  className={fieldClass}
                  aria-invalid={Boolean(state.fieldErrors.course)}
                  aria-describedby={state.fieldErrors.course ? "course-error" : undefined}
                >
                  <option value="">Alege cursul</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} · {course.age}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="email" label="Email" error={state.fieldErrors.email} optional>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={120}
                  className={fieldClass}
                  aria-invalid={Boolean(state.fieldErrors.email)}
                  aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
                />
              </Field>

              <Field id="message" label="Mesaj" error={state.fieldErrors.message} optional>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  className={fieldClass}
                  aria-invalid={Boolean(state.fieldErrors.message)}
                  aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
                />
              </Field>

              <button type="submit" className={`${buttonPrimary} w-full sm:w-auto`} disabled={pending}>
                {pending ? "Se trimite…" : "Trimite cererea de demo"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}{" "}
        {optional ? (
          <span className="font-medium text-slate-600">(opțional)</span>
        ) : (
          <span aria-hidden="true" className="text-blue-700">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessPanel({
  state,
  onReset,
}: {
  state: EnrollmentState;
  onReset: () => void;
}) {
  return (
    <div role="status" className="py-4">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
        {state.delivered ? "Cerere trimisă" : "Cerere verificată"}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-slate-900">
        {state.delivered ? "Am primit înscrierea." : "Datele sunt în regulă."}
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{state.message}</p>
      {process.env.NODE_ENV === "development" && !state.delivered ? (
        <p className="mt-4 break-words rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Mediu de dezvoltare: cererea nu a fost expediată. Setează ENROLLMENT_WEBHOOK_URL ca să
          ajungă la club.
        </p>
      ) : null}
      <button type="button" onClick={onReset} className={`${buttonPrimary} mt-6`}>
        Trimite o altă cerere
      </button>
    </div>
  );
}
