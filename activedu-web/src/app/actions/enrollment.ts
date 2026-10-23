"use server";

import { club } from "@/config/constants";
import {
  parseEnrollment,
  type EnrollmentState,
} from "@/lib/enrollment";

function failure(message: string, fieldErrors: EnrollmentState["fieldErrors"] = {}): EnrollmentState {
  return {
    status: "error",
    message,
    fieldErrors,
    stamp: Date.now(),
    delivered: false,
  };
}

export async function submitEnrollment(
  _previous: EnrollmentState,
  formData: FormData,
): Promise<EnrollmentState> {
  const parsed = parseEnrollment(formData);

  if (!parsed.ok) {
    return failure(parsed.message, parsed.fieldErrors);
  }

  if (parsed.spam) {
    return {
      status: "success",
      message: "Mulțumim. Am primit mesajul.",
      fieldErrors: {},
      stamp: Date.now(),
      delivered: false,
    };
  }

  const data = parsed.data;
  const webhook = process.env.ENROLLMENT_WEBHOOK_URL?.trim();
  let delivered = false;

  if (webhook) {
    let endpoint: URL;
    try {
      endpoint = new URL(webhook);
      if (endpoint.protocol !== "https:" && endpoint.protocol !== "http:") {
        return failure("Trimiterea nu este configurată corect. Încearcă mai târziu.");
      }
    } catch {
      return failure("Trimiterea nu este configurată corect. Încearcă mai târziu.");
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        return failure(
          "Nu am putut trimite cererea. Încearcă din nou peste câteva minute.",
        );
      }
      delivered = true;
    } catch {
      return failure(
        "Nu am putut trimite cererea. Verifică conexiunea și încearcă din nou.",
      );
    }
  }

  return {
    status: "success",
    message: delivered
      ? `Mulțumim, ${data.parentName}. Cererea pentru ${data.childName} a ajuns la ActivEdu. Te contactăm la ${data.phone}.`
      : `Mulțumim, ${data.parentName}. Am verificat înscrierea lui ${data.childName} la „${data.courseTitle}”. Laboratorul este pe ${club.address}.`,
    fieldErrors: {},
    stamp: Date.now(),
    delivered,
  };
}
