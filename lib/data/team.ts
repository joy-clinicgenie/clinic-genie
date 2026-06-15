export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Roger Ng",
    role: "Founder & Growth Strategist",
    bio: "Spent a decade marketing healthcare before deciding clinics deserved a specialist. Lives in spreadsheets and SERPs.",
  },
  {
    name: "Siti",
    role: "Head of SEO & Content",
    bio: "Turns clinical expertise into pages patients find and trust. Obsessive about intent, allergic to fluff.",
  },
  {
    name: "Vash Chen",
    role: "Lead Designer",
    bio: "Designs brands and websites that make great clinics look as good as their outcomes.",
  },
  {
    name: "Joy",
    role: "Graphic Designer",
    bio: "Manages every campaign to a cost-per-enquiry, not a vanity click. Reports in plain English.",
  },
  {
    name: "Fathima",
    role: "Content Intern",
    bio: "Builds fast, accessible clinic sites on a modern stack. Believes three seconds is two too many.",
  },
  {
    name: "Anna",
    role: "Content Intern",
    bio: "Keeps ambitious marketing on the right side of Singapore's advertising guidelines — without dulling the message.",
  },
];

export const TEAM_STATS = [
  { value: "Healthcare-only", label: "since day one" },
  { value: "5", label: "specialties served and counting", countTo: 5 },
  { value: "3.4×", label: "average lift in qualified enquiries" },
  { value: "Bukit Merah", label: "Singapore-based HQ" },
];
