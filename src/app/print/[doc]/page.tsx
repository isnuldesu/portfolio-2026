import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CvDoc } from "@/components/print/cv-doc";
import { ResumeDoc } from "@/components/print/resume-doc";

const DOCS = ["resume-en", "resume-id", "cv-en", "cv-id"] as const;
type Doc = (typeof DOCS)[number];

export const dynamicParams = false;
export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

const TITLES: Record<Doc, string> = {
  "resume-en": "Muhammad Isnul - Resume - Product Designer",
  "resume-id": "Muhammad Isnul - Resume - Product Designer",
  "cv-en": "Muhammad Isnul - CV - Product Designer",
  "cv-id": "Muhammad Isnul - CV - Product Designer",
};

// The PDF takes its Title from here, and ATS and recruiters see it.
export async function generateMetadata({ params }: PageProps<"/print/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  return { title: TITLES[doc as Doc] ?? "Muhammad Isnul", authors: [{ name: "Muhammad Isnul" }] };
}

export default async function PrintDoc({ params }: PageProps<"/print/[doc]">) {
  const { doc } = await params;
  if (!DOCS.includes(doc as Doc)) notFound();
  const [kind, locale] = doc.split("-") as ["resume" | "cv", "en" | "id"];
  return kind === "resume" ? <ResumeDoc locale={locale} /> : <CvDoc locale={locale} />;
}
