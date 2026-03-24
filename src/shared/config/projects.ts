export interface Project {
  name: string;
  slug: string;
  index: number;
  type: "Frontend" | "Fullstack";
  stack: string[];
  highlight: string;
  date: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "KINETIC.OS",
    slug: "kinetic-os",
    index: 1,
    type: "Fullstack",
    stack: ["Next.js", "Rust"],
    highlight: "50K monthly active users",
    date: "Jan 2023 — Aug 2024",
    image: "/images/projects/topographic.png",
  },
  {
    name: "NEURAL.LX",
    slug: "neural-lx",
    index: 2,
    type: "Fullstack",
    stack: ["Go", "Kubernetes", "Redis", "gRPC"],
    highlight: "Real-time data pipeline @ 1M req/s",
    date: "Mar 2023 — Dec 2023",
    image: "/images/projects/blueprint.png",
  },
  {
    name: "QUANTUM.FLOW",
    slug: "quantum-flow",
    index: 3,
    type: "Fullstack",
    stack: ["Python", "WebGPU"],
    highlight: "Sub-50ms inference latency",
    date: "Jun 2023 — Feb 2024",
    image: "/images/projects/isometric-layers.png",
  },
  {
    name: "VOID.ARCH",
    slug: "void-arch",
    index: 4,
    type: "Frontend",
    stack: ["TypeScript", "React", "Three.js"],
    highlight: "60fps on low-end devices",
    date: "Sep 2023 — May 2024",
    image: "/images/projects/wireframe-box.png",
  },
  {
    name: "PRISM.DEPLOY",
    slug: "prism-deploy",
    index: 5,
    type: "Fullstack",
    stack: ["Terraform", "AWS", "Docker"],
    highlight: "Zero-downtime deployments across 3 regions",
    date: "Nov 2023",
    image: "/images/projects/wave-flow.png",
  },
  {
    name: "MONO.STACK",
    slug: "mono-stack",
    index: 6,
    type: "Fullstack",
    stack: ["PostgreSQL", "Redis", "GraphQL"],
    highlight: "p99 query latency under 10ms",
    date: "Feb 2024 — Jul 2024",
    image: "/images/projects/grid-elevation.png",
  },
  {
    name: "FLUX.SYSTEM",
    slug: "flux-system",
    index: 7,
    type: "Frontend",
    stack: ["Elixir", "Phoenix", "LiveView"],
    highlight: "10K concurrent WebSocket connections",
    date: "Apr 2024 — Oct 2024",
    image: "/images/projects/grid-plan.png",
  },
  {
    name: "VECTOR.GRID",
    slug: "vector-grid",
    index: 8,
    type: "Frontend",
    stack: ["Canvas", "Three.js", "WASM"],
    highlight: "Procedural generation in real-time",
    date: "Aug 2024 — Jan 2025",
    image: "/images/projects/block-assembly.png",
  },
  {
    name: "AETHER.DB",
    slug: "aether-db",
    index: 9,
    type: "Fullstack",
    stack: ["MongoDB", "GraphQL", "Edge Functions"],
    highlight: "Global edge caching with 20ms TTFB",
    date: "Nov 2024 — Mar 2025",
    image: "/images/projects/contour-frame.png",
  },
];
