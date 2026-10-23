import { courseById } from "@/config/constants";

export type EnrollmentField =
  | "parentName"
  | "childName"
  | "age"
  | "course"
  | "phone"
  | "email"
  | "message";

export type EnrollmentPayload = {
  parentName: string;
  childName: string;
  age: number;
  courseId: string;
  courseTitle: string;
  phone: string;
  email: string;
  message: string;
  source: "activedu-landing";
};

export type EnrollmentState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: Partial<Record<EnrollmentField, string>>;
  stamp: number;
  delivered: boolean;
};

export const initialEnrollmentState: EnrollmentState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  stamp: 0,
  delivered: false,
};

const personName = /^[\p{L}][\p{L}\s.'-]{1,79}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function isRomanianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return true;
  if (digits.length === 11 && digits.startsWith("40")) return true;
  return false;
}

export type ParsedEnrollment =
  | { ok: true; spam: true }
  | { ok: true; spam: false; data: EnrollmentPayload }
  | {
      ok: false;
      message: string;
      fieldErrors: Partial<Record<EnrollmentField, string>>;
    };

export function parseEnrollment(formData: FormData): ParsedEnrollment {
  if (readText(formData, "website")) {
    return { ok: true, spam: true };
  }

  const fieldErrors: Partial<Record<EnrollmentField, string>> = {};
  const parentName = readText(formData, "parentName");
  const childName = readText(formData, "childName");
  const ageRaw = readText(formData, "age");
  const courseId = readText(formData, "course");
  const phone = readText(formData, "phone");
  const email = readText(formData, "email");
  const message = readText(formData, "message");

  if (!personName.test(parentName)) {
    fieldErrors.parentName = "Completează numele părintelui.";
  }
  if (!personName.test(childName)) {
    fieldErrors.childName = "Completează numele copilului.";
  }

  const age = Number(ageRaw);
  if (!ageRaw || !Number.isInteger(age) || age < 6 || age > 18) {
    fieldErrors.age = "Introdu o vârstă între 6 și 18 ani.";
  }

  const course = courseById(courseId);
  if (!course) {
    fieldErrors.course = "Alege un curs.";
  }

  if (phone.length > 20 || !isRomanianPhone(phone)) {
    fieldErrors.phone = "Introdu un număr de telefon valid, de exemplu 0722 123 456.";
  }

  if (email && (email.length > 120 || !emailPattern.test(email))) {
    fieldErrors.email = "Introdu un email valid sau lasă câmpul gol.";
  }

  if (message.length > 1000) {
    fieldErrors.message = "Mesajul poate avea cel mult 1000 de caractere.";
  }

  if (Object.keys(fieldErrors).length > 0 || !course) {
    return {
      ok: false,
      message: "Verifică câmpurile marcate și încearcă din nou.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    spam: false,
    data: {
      parentName,
      childName,
      age,
      courseId: course.id,
      courseTitle: course.title,
      phone,
      email,
      message,
      source: "activedu-landing",
    },
  };
}
