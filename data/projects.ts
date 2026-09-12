export type Project = {
  id: string;
  title: { ar: string; en: string };
  location: { ar: string; en: string };
  type: { ar: string; en: string };
  price: string;
  priceNote?: { ar: string; en: string };
  featured?: boolean;
  span?: "wide" | "tall" | "normal";
};

export const WHATSAPP_NUMBER = "201028232191";

export function whatsappLink(project: Project, lang: "ar" | "en"): string {
  const msg =
    lang === "ar"
      ? `مرحباً، أود الاستفسار عن مشروع ${project.title.ar} - ${project.location.ar}`
      : `Hello, I'd like to inquire about ${project.title.en} - ${project.location.en}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const projects: Project[] = [
  {
    id: "salt-ras-el-hekma",
    title: { ar: "سولت – رأس الحكمة", en: "Salt – Ras El Hekma" },
    location: { ar: "رأس الحكمة، الساحل الشمالي", en: "Ras El Hekma, North Coast" },
    type: { ar: "توين هاوس", en: "Twin House" },
    price: "EGP 32,000,000",
    priceNote: { ar: "وحدات تبدأ من 9.9 مليون حتى 27 مليون", en: "Units from EGP 9.9M to 27M" },
    featured: true,
    span: "wide",
  },
  {
    id: "sixth-settlement-apartment",
    title: { ar: "شقة 3 غرف – التجمع السادس", en: "3-Bedroom Apartment – Sixth Settlement" },
    location: { ar: "التجمع السادس، القاهرة الجديدة", en: "Sixth Settlement, New Cairo" },
    type: { ar: "شقة بإطلالة لاندسكيب", en: "Apartment · Landscape View" },
    price: "على الطلب",
    span: "normal",
  },
  {
    id: "cbd-office-21",
    title: { ar: "مكتب 21م² – منطقة الأعمال المركزية", en: "Office 21m² – CBD Area" },
    location: { ar: "العاصمة الإدارية الجديدة", en: "New Administrative Capital" },
    type: { ar: "مكتب إداري", en: "Administrative Office" },
    price: "على الطلب",
    span: "normal",
  },
  {
    id: "artal-plato",
    title: { ar: "أرتال – PLATO", en: "Artal – PLATO" },
    location: { ar: "القاهرة الجديدة", en: "New Cairo" },
    type: { ar: "وحدات متنوعة", en: "Mixed Units" },
    price: "EGP 3,000,000",
    priceNote: { ar: "أسعار تبدأ من", en: "Starting from" },
    span: "tall",
  },
  {
    id: "stride-north-90",
    title: { ar: "سترايد – شمال التسعين", en: "Stride Mixed-Use – North 90th" },
    location: { ar: "أمام كمبوند ديار صبور", en: "Facing Diyar Sabour Compound" },
    type: { ar: "مشروع متعدد الاستخدامات", en: "Mixed-Use Project" },
    price: "على الطلب",
    span: "wide",
  },
  {
    id: "vida-business-complex",
    title: { ar: "فيدا بيزنس كومبلكس", en: "Vida Business Complex" },
    location: { ar: "القاهرة الجديدة", en: "New Cairo" },
    type: { ar: "تجاري / إداري", en: "Commercial / Administrative" },
    price: "EGP 3,630,000",
    span: "normal",
  },
  {
    id: "the-pause-office",
    title: { ar: "ذا بوز – مكتب إداري", en: "The Pause – Administrative Office" },
    location: { ar: "القاهرة الجديدة", en: "New Cairo" },
    type: { ar: "مكتب إداري", en: "Administrative Office" },
    price: "EGP 4,536,000",
    span: "normal",
  },
  {
    id: "ozohe-fifth-settlement",
    title: { ar: "أوزوهي – التجمع الخامس", en: "Ozohe – Fifth Settlement" },
    location: { ar: "التجمع الخامس، القاهرة الجديدة", en: "Fifth Settlement, New Cairo" },
    type: { ar: "وحدة فاخرة", en: "Premium Unit" },
    price: "EGP 48,125,000",
    featured: true,
    span: "tall",
  },
  {
    id: "nac-project",
    title: { ar: "مشروع العاصمة الإدارية الجديدة", en: "New Administrative Capital Project" },
    location: { ar: "العاصمة الإدارية الجديدة", en: "New Administrative Capital" },
    type: { ar: "فرصة استثمارية", en: "Investment Opportunity" },
    price: "على الطلب",
    span: "wide",
  },
];
