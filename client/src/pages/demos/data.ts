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
  "4.9 Average Client Satisfaction",
  "Built for Local Lead Generation",
  "Mobile-First Performance Standards",
  "AI + Automation Integrated",
];

export const demoTestimonials: DemoTestimonial[] = [
  {
    quote:
      "Our old website was just a digital brochure. After the rebuild, we started getting qualified leads every week.",
    name: "Michael Turner",
    business: "Owner, Turner HVAC Services",
  },
  {
    quote:
      "The chatbot pre-qualifies inquiries so our office team spends less time on weak leads and more time closing real cases.",
    name: "Elena Brooks",
    business: "Managing Partner, Brooks Legal Group",
  },
  {
    quote:
      "We finally have a site that reflects our quality. Visitors understand our value quickly and call us ready to move forward.",
    name: "Daniel Ortiz",
    business: "Founder, Ridgeview Outdoor Design",
  },
];

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
    question: "Do I need AI automation right away?",
    answer:
      "Not always. We can launch your new site first, then layer in chatbot and automation workflows as phase two once your lead flow increases.",
  },
  {
    question: "Will this work for my industry if it's not listed here?",
    answer:
      "Yes. These demos are concept directions. We tailor structure, messaging, and conversion flow to your specific market and ideal customer.",
  },
];

export const localBusinessAudience =
  "Built for local business owners who need more leads, stronger trust, and less manual follow-up.";
