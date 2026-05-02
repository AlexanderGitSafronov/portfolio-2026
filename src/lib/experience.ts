export type Experience = {
  slug: string;
  company: string;
  start: string;
  end: string;
  stack: string[];
  accent: string;
};

export const experiences: Experience[] = [
  {
    slug: "traffic-devils",
    company: "Traffic Devils",
    start: "Feb 2025",
    end: "Feb 2026",
    stack: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    accent: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    slug: "karat-team",
    company: "Karat Team",
    start: "Jul 2023",
    end: "Sep 2024",
    stack: ["React", "JavaScript", "WordPress", "REST API", "Google Sheets API"],
    accent: "from-amber-400 via-orange-500 to-red-500",
  },
  {
    slug: "platora",
    company: "Platora",
    start: "Jul 2022",
    end: "Feb 2023",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
    accent: "from-cyan-400 via-sky-500 to-violet-500",
  },
];
