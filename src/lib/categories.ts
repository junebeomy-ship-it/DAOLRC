export type FieldSet = "standard" | "ndr";

export type Category = {
  slug: string;
  label: string;
  fieldSet: FieldSet;
};

export const CATEGORIES: Category[] = [
  { slug: "seminar", label: "세미나", fieldSet: "standard" },
  { slug: "request", label: "리퀘스트", fieldSet: "standard" },
  { slug: "call", label: "콜", fieldSet: "standard" },
  { slug: "ndr-corpday", label: "NDR·콥데이", fieldSet: "ndr" },
  { slug: "dept-support", label: "타부서 지원", fieldSet: "standard" },
];

export function isValidCategory(slug: string): boolean {
  return CATEGORIES.some((c) => c.slug === slug);
}

export function getFieldSet(slug: string): FieldSet {
  return CATEGORIES.find((c) => c.slug === slug)?.fieldSet ?? "standard";
}
