export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  github?: string;
  githubPrivate?: boolean;
  stack: string[];
  accent: string;
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "myitems",
    name: "MyItems",
    tagline: "Household inventory PWA",
    description:
      "Personal household inventory PWA with photos, locations and search. Auth.js, Cloudinary, multilingual (en/uk/ru).",
    href: "https://myitems-lilac.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/myitems",
    githubPrivate: true,
    stack: ["Next.js 15", "PostgreSQL", "Auth.js", "Cloudinary", "PWA"],
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    year: "2026",
    featured: true,
  },
  {
    slug: "myfilms",
    name: "MyFilms",
    tagline: "Movie list & recommendations",
    description:
      "Movie recommendation PWA — share film lists with friends, rate and discover.",
    href: "https://myfilms-app.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/myfilms",
    stack: ["Next.js", "PWA", "TMDB"],
    accent: "from-amber-400 via-orange-500 to-rose-500",
    year: "2026",
    featured: true,
  },
  {
    slug: "uptolife",
    name: "UpToLife",
    tagline: "Gamified yearly planner",
    description:
      "Gamified yearly progress planner. Goals, habits, XP — built with next-intl.",
    href: "https://uptolife.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/UpToLife",
    githubPrivate: true,
    stack: ["Next.js 14", "Prisma", "next-intl", "PWA"],
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    year: "2026",
    featured: true,
  },
  {
    slug: "wishlist",
    name: "WishList",
    tagline: "Secret Santa wishlists",
    description:
      "Mobile web app for wishlists and Secret Santa rooms with reservations and comments.",
    href: "https://wishlist-app-inky-chi.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/wishlist-app",
    githubPrivate: true,
    stack: ["Next.js", "Prisma", "Auth"],
    accent: "from-red-500 via-rose-500 to-fuchsia-500",
    year: "2026",
  },
  {
    slug: "homepay",
    name: "HomePay",
    tagline: "Home utility tracking",
    description:
      "Track meter readings and home utility payments with monthly reports.",
    href: "https://homepay-tau.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/homepay",
    githubPrivate: true,
    stack: ["Next.js", "Prisma", "Auth"],
    accent: "from-sky-400 via-blue-500 to-indigo-500",
    year: "2026",
  },
  {
    slug: "mycash",
    name: "MyCash",
    tagline: "Personal finance tracker",
    description:
      "Track income, expenses and savings with rich category breakdowns.",
    href: "https://mycash-mu.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/myCash",
    githubPrivate: true,
    stack: ["Next.js", "Charts", "Prisma"],
    accent: "from-lime-400 via-green-500 to-emerald-500",
    year: "2026",
  },
  {
    slug: "mysmak",
    name: "MySmak",
    tagline: "Taste log & ratings PWA",
    description:
      "Track and rate everything you've tasted. Photos, notes, ratings — all in a PWA.",
    href: "https://mysmak.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/mysmak",
    githubPrivate: true,
    stack: ["Next.js 15", "Prisma", "Cloudinary", "PWA"],
    accent: "from-orange-400 via-pink-500 to-purple-500",
    year: "2026",
    featured: true,
  },
  {
    slug: "pdfreduct",
    name: "PDFReduct",
    tagline: "PDF editor PWA",
    description:
      "PWA PDF editor with merge, split and compress. Storage on Vercel Blob.",
    href: "https://pdfreduct.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/pdfreduct",
    githubPrivate: true,
    stack: ["Next.js", "Tailwind", "Prisma", "Vercel Blob"],
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    year: "2026",
  },
  {
    slug: "magaz7km",
    name: "Magaz 7km",
    tagline: "E-commerce storefront",
    description:
      "Online store with product catalog, cart and checkout flow.",
    href: "https://magaz7km.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/magaz7km",
    githubPrivate: true,
    stack: ["Next.js", "E-commerce"],
    accent: "from-yellow-400 via-amber-500 to-orange-500",
    year: "2026",
  },
  {
    slug: "timergame",
    name: "TimerGame",
    tagline: "Reaction browser game",
    description:
      "Fast-paced timer-based reaction game playable in the browser.",
    href: "https://timergame-jqnx.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/timergame",
    githubPrivate: true,
    stack: ["Next.js", "Game"],
    accent: "from-pink-500 via-purple-500 to-indigo-500",
    year: "2026",
  },
  {
    slug: "rashod",
    name: "Rashod",
    tagline: "Expense splitter",
    description:
      "Track shared expenses and split them between people with ease.",
    href: "https://rashod.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/rashod",
    githubPrivate: true,
    stack: ["Next.js", "Prisma"],
    accent: "from-teal-400 via-cyan-500 to-sky-500",
    year: "2026",
  },
  {
    slug: "clue",
    name: "Clue",
    tagline: "Mystery puzzle game",
    description:
      "Detective-style puzzle game — find clues and solve the case.",
    href: "https://clue-phi.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/Clue",
    githubPrivate: true,
    stack: ["Next.js", "Game"],
    accent: "from-indigo-500 via-purple-500 to-fuchsia-500",
    year: "2026",
  },
  {
    slug: "task-tracker",
    name: "TaskTracker",
    tagline: "Personal tasks",
    description:
      "Lightweight task management with categories, deadlines and priorities.",
    href: "https://task-tracker-teal-phi.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/taskTracker",
    githubPrivate: true,
    stack: ["Next.js", "Tailwind"],
    accent: "from-blue-400 via-indigo-500 to-purple-500",
    year: "2026",
  },
  {
    slug: "crmpro",
    name: "CRM Pro",
    tagline: "Customer relationship platform",
    description:
      "CRM with leads, deals, contacts and pipeline management.",
    href: "https://crmpro-gamma.vercel.app",
    github: "https://github.com/AlexanderGitSafronov/CRM",
    githubPrivate: true,
    stack: ["Next.js", "Prisma", "Auth"],
    accent: "from-fuchsia-500 via-pink-500 to-rose-500",
    year: "2026",
    featured: true,
  },
];
