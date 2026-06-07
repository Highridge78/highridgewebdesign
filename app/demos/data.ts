export interface DemoTestimonial {
  quote: string;
  name: string;
  business: string;
}

export interface DemoFaq {
  question: string;
  answer: string;
}

export const trustBarItems = [
  "Founder-Built, Every Project",
  "Built for Local Lead Generation",
  "Mobile-First Performance Standards",
  "Contractors & Home Services Only",
];

export const demoTestimonials: DemoTestimonial[] = [];

export const objectionFaq: DemoFaq[] = [
  {
    question: "Can you redesign my existing website instead of starting from scratch?",
    answer:
      "Yes. Most projects are redesigns of outdated sites. We keep what works, remove what hurts conversions, and rebuild around your business goals.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Most local business websites launch in 2-4 weeks depending on scope, assets, and feedback turnaround.",
  },

  {
    question: "Will this work for my industry if it's not listed here?",
    answer:
      "Yes. These demos are concept directions. We tailor structure, messaging, and conversion flow to your specific market and ideal customer.",
  },
];

export const localBusinessAudience =
  "Built for local business owners who need more leads, stronger trust, and less manual follow-up.";

export const demoQuickLinks = [
  { label: "Back to main site", href: "/" },
  { label: "Back to demo index", href: "/demos" },
];
