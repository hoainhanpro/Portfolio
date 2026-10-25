export const myProjects = [
  {
    id: 1,
    title: "AI Quoting Orchestrator & Review Dashboard",
    description:
      "An autonomous quoting and review platform pairing repository-parsing sub-agents with Clean Architecture/DDD and strict cost ledgers.",
    subDescription: [
      "Sole architect and engineer across 409 commits, building a full-stack platform where an orchestrator agent coordinates repo-parsing sub-agents to draft Jira quotes.",
      "Engineered strict Clean Architecture and Domain-Driven Design (DDD) with decoupled dependency rules, swappable LLM execution engines (OpenAI delegation, Claude Agent SDK port), and per-run cost ledgers.",
      "Constructed automated evaluation harness over a golden set of previously quoted tickets to guarantee deterministic accuracy and eliminate regression drift.",
      "Developed modern, responsive review dashboard in React 19, TypeScript, Tailwind CSS, TanStack Query, and containerized with Docker.",
    ],
    href: "https://github.com/hoainhanpro",
    logo: "",
    image: "/assets/projects/quoting-dashboard.png",
    webpImage: "/assets/projects/quoting-dashboard.webp",
    mobileImage: "/assets/projects/quoting-dashboard.png",
    mobileWebpImage: "/assets/projects/quoting-dashboard-mobile.webp",
    tags: [
      {
        id: 1,
        name: "React 19",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "FastAPI",
        path: "/assets/logos/FastAPI.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 5,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Self-Hosted AI Code Review & Quality Platform",
    description:
      "A multi-service code review platform combining bounded LLM reasoning with deterministic Tree-sitter AST validation and FastMCP.",
    subDescription: [
      "Engineered a provider-agnostic code review platform for GitHub, GitLab, and Bitbucket pairing multi-stage LLM review with deterministic Tree-sitter AST validation to eliminate hallucinations.",
      "Implemented Model Context Protocol (FastMCP) servers, per-project RAG scopes, quality gates, and Jira-linked QA auto-documentation.",
      "Designed statically assembled language and framework analysis plugins supplying syntax and repository-graph context without redundant model calls.",
      "Built microservices architecture using Java/Spring Boot, Python, PostgreSQL, and Docker Compose.",
    ],
    href: "https://github.com/hoainhanpro",
    logo: "",
    image: "/assets/projects/code-review.png",
    webpImage: "/assets/projects/code-review.webp",
    mobileImage: "/assets/projects/code-review.png",
    mobileWebpImage: "/assets/projects/code-review-mobile.webp",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "Spring Boot",
        path: "/assets/logos/springboot.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 4,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
    ],
  },
  {
    id: 3,
    title: "BreastCare AI: Mobile Diagnostic System",
    description:
      "Full-stack AI mobile platform for breast cancer diagnosis optimizing CNN with Grey Wolf Optimizer (GWO) on CBIS-DDSM (FJCAI 2026 publication).",
    subDescription: [
      "Developed full-stack mobile medical diagnostic platform using React Native, TypeScript, NativeWind, and Python FastAPI backend with MongoDB persistence.",
      "Optimized CNN feature selection using Grey Wolf Optimizer (GWO) on CBIS-DDSM mammography dataset, achieving 0.97 test-set diagnostic accuracy.",
      "Underlying research co-authored and presented at the National Conference on Artificial Intelligence 2026 (FJCAI, Cần Thơ, Vietnam).",
      "Implemented secure JWT authentication, asynchronous medical imaging pipeline, and preprocessing with OpenCV and TensorFlow/Keras.",
    ],
    href: "https://github.com/NguyenTam03/breast-cancer",
    logo: "",
    image: "/assets/projects/breast-cancer.png",
    webpImage: "/assets/projects/breast-cancer.webp",
    mobileImage: "/assets/projects/breast-cancer.png",
    mobileWebpImage: "/assets/projects/breast-cancer-mobile.webp",
    tags: [
      {
        id: 1,
        name: "React Native",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "FastAPI",
        path: "/assets/logos/FastAPI.svg",
      },
      {
        id: 4,
        name: "PyTorch",
        path: "/assets/logos/pytorch.svg",
      },
      {
        id: 5,
        name: "MongoDB",
        path: "/assets/logos/mongodb.svg",
      },
    ],
  },
  {
    id: 4,
    title: "AI Sales & CRM Automation Pipeline",
    description:
      "An autonomous sales pipeline connecting email, webhooks, Zoho CRM, and Calendly with Telegram human-in-the-loop approval gating.",
    subDescription: [
      "Architected and deployed end-to-end sales automation system processing ~100 leads/month across email, webhooks, and Zoho CRM, slashing turnaround by ~70% with zero lead loss.",
      "Engineered 20+ production n8n workflows (~500 runs/week) orchestrating multi-step prospect research, qualification, and automated booking via Calendly.",
      "Implemented Telegram human-in-the-loop approval gating, ensuring 100% human verification on customer-facing emails and quotes before dispatch.",
      "Built resilient webhook consumers and state synchronization with PostgreSQL and Pydantic schema validation.",
    ],
    href: "https://github.com/hoainhanpro",
    logo: "",
    image: "/assets/projects/sales-automation.png",
    webpImage: "/assets/projects/sales-automation.webp",
    mobileImage: "/assets/projects/sales-automation.png",
    mobileWebpImage: "/assets/projects/sales-automation-mobile.webp",
    tags: [
      {
        id: 1,
        name: "n8n",
        path: "/assets/logos/n8n.svg",
      },
      {
        id: 2,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 4,
        name: "FastAPI",
        path: "/assets/logos/FastAPI.svg",
      },
    ],
  },
  {
    id: 5,
    title: "Multilingual FastSpeech2 Text-to-Speech System",
    description:
      "An end-to-end TTS pipeline producing high-fidelity, natural speech with bilingual support.",
    subDescription: [
      "Built an end-to-end TTS pipeline (text → phonemes → acoustic features → waveform) using FastSpeech2 with HiFi-GAN vocoder for high-fidelity, natural speech.",
      "Implemented bilingual phoneme processing (EN/VI), Montreal Forced Aligner for alignment/durations, and a variance adaptor to control pitch, energy, and duration.",
      "Developed robust audio preprocessing (Mel spectrograms, F0, energy) and visualization tools for acoustic analysis.",
      "Added mixed-language detection for code-switch inputs and deployed real-time synthesis via Flask/FastAPI.",
    ],
    href: "https://github.com/hoainhanpro/En_Vi_TextToSpeech",
    logo: "",
    image: "/assets/projects/text-to-speech.jpg",
    webpImage: "/assets/projects/text-to-speech.webp",
    mobileImage: "/assets/projects/text-to-speech.jpg",
    mobileWebpImage: "/assets/projects/text-to-speech-mobile.webp",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "PyTorch",
        path: "/assets/logos/pytorch.svg",
      },
      {
        id: 3,
        name: "Flask",
        path: "/assets/logos/Flask.svg",
      },
      {
        id: 4,
        name: "FastAPI",
        path: "/assets/logos/FastAPI.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Enterprise Multi-Agent AI System",
    description:
      "Enterprise-grade multi-agent orchestration routing complex departmental tasks via Microsoft Agent Framework.",
    subDescription: [
      "Architected an enterprise multi-agent system using Microsoft Agent Framework (AutoGen) and Azure OpenAI.",
      "Engineered central Orchestration Agent routing incoming business tasks to 4 specialized sub-agents (HR onboarding, reporting, project tracking).",
      "Utilized LLM-powered context-aware reasoning for dynamic task delegation, state preservation, and cross-departmental coordination.",
    ],
    href: "https://github.com/hoainhanpro",
    logo: "",
    image: "/assets/projects/multi-agent.png",
    webpImage: "/assets/projects/multi-agent.webp",
    mobileImage: "/assets/projects/multi-agent.png",
    mobileWebpImage: "/assets/projects/multi-agent-mobile.webp",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "Azure",
        path: "/assets/logos/azure.svg",
      },
      {
        id: 3,
        name: "Microsoft",
        path: "/assets/logos/microsoft.svg",
      },
    ],
  },
  {
    id: 7,
    title: "School Portal Management System",
    description:
      "A production-grade academic platform managing the complete student lifecycle from enrollment to graduation.",
    subDescription: [
      "Built a production-grade academic platform (enrollment → graduation) with Java Spring Boot (layered REST API) and SvelteKit UI.",
      "Implemented JWT auth + role-based access control (admin/lecturer/student) with Spring Security.",
      "Delivered lecturer modules: profile & class scheduling, academic advising, grade management (multi-component assessment), and schedule APIs.",
      "Designed PostgreSQL + JPA data layer for complex academic queries; integrated multi-site departmental architecture under a unified interface.",
      "Shipped student-facing dashboard (progress, enrollments, fees) and flexible course registration (multi-subject/section).",
    ],
    href: "https://github.com/hoainhanpro/SchoolPortalAPI",
    logo: "",
    image: "/assets/projects/school-portal.png",
    webpImage: "/assets/projects/school-portal.webp",
    mobileImage: "/assets/projects/school-portal.png",
    mobileWebpImage: "/assets/projects/school-portal-mobile.webp",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "/assets/logos/java-icon.svg",
      },
      {
        id: 2,
        name: "Spring Boot",
        path: "/assets/logos/springboot.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 4,
        name: "Svelte",
        path: "/assets/logos/Svelte_Logo.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/leohoainhan/",
    icon: "/assets/socials/facebook.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/leohoainhan/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Github",
    href: "https://github.com/hoainhanpro",
    icon: "/assets/socials/github.svg",
  },
];

export const experiences = [
  {
    title: "AI Solution Engineer",
    job: "Forix Commerce",
    date: "February 2026 - Present",
    contents: [
      "Architected and deployed an end-to-end AI Sales & CRM Automation System processing ~100 leads/month across email, webhooks, and Zoho CRM, slashing manual turnaround by ~70% with zero missed leads.",
      "Built and shipped the AI Quoting Orchestrator & Review Dashboard (nhanforix/quoting-dashboard, sole engineer across 409 commits) in React 19, TypeScript, Python/FastAPI, and PostgreSQL using Clean Architecture/DDD.",
      "Designed and maintained 20+ production n8n automation workflows (~500 executions/week) integrating Gmail, Zoho CRM, Calendly, and Telegram with automated error handling and human approval gates on 100% of customer sends.",
      "Built the Self-Hosted AI Code Review Platform (nhanforix/CodeReview) pairing multi-stage LLM review with deterministic Tree-sitter AST validation, FastMCP servers, and quality gates.",
      "Applied Claude Code daily as primary engineering workhorse to accelerate full-stack delivery, refactoring, and integration testing without compromising architectural rigor.",
    ],
  },
  {
    title: "AI Automation Engineer (Freelance)",
    job: "Athena Studio",
    date: "April 2025 - Present",
    contents: [
      "Engineered AI agents for workflow automation using frameworks CrewAI, AutoGen, LangChain, LangGraph, and integration tools n8n and Zapier.",
      "Applied RAG (Retrieval-Augmented Generation) to build content generator agents, ensuring outputs were context-aware, accurate, and brand-consistent.",
      "Built end-to-end automation systems for multi-format content (text, images, and videos) to support AI-driven KOLs (Key Opinion Leaders).",
      "Automated workflows for Smartsheet and other productivity tools, improving efficiency and saving 10+ hours/week.",
      "Developed RAG-powered Content Factory: AI content generation pipeline leveraging vector databases + RAG to produce personalized and knowledge-grounded content.",
      "Architected an enterprise-grade Multi-Agent AI System using Microsoft Agent Framework and Python routing tasks to 4 specialized departmental sub-agents.",
      "Built Cross-platform AI Integration: Connected tools (Google Workspace, Smartsheet, social platforms) with intelligent agents for seamless end-to-end workflows.",
    ],
  },
];

export const certificates = [
  {
    name: "TOEIC",
    issuer: "IIG Vietnam",
    score: "790",
    date: "Professional Working Proficiency",
    img: "/assets/certificates/toeic.svg",
  },
  {
    name: "Generative AI Fundamentals",
    issuer: "DataBricks",
    score: "",
    date: "October 28, 2025",
    img: "/assets/certificates/databricks.svg",
    href: "https://credentials.databricks.com/971c8108-a312-4acd-bc68-424579cf50b4",
  },
  {
    name: "Multi AI Agent Systems with crewAI",
    issuer: "DeepLearning.AI",
    score: "",
    date: "2025",
    img: "/assets/certificates/deeplearning.svg",
    href: "https://www.linkedin.com/redir/redirect/?url=https%3A%2F%2Flearn.deeplearning.ai%2F&urlhash=qrhb&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BOFbjIdXFRxOyxM6gEAhLvg%3D%3D",
  },
  {
    name: "Programming for Everybody",
    issuer: "University of Michigan (Coursera)",
    score: "",
    date: "October 23, 2023",
    img: "/assets/certificates/university.svg",
    href: "https://www.coursera.org/account/accomplishments/verify/9R7UJLUKJ5XF?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Python Data Structures",
    issuer: "University of Michigan (Coursera)",
    score: "",
    date: "November 14, 2023",
    img: "/assets/certificates/university.svg",
    href: "https://www.coursera.org/account/accomplishments/verify/FCRDD7ZBZRXU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Using Python to Access Web Data",
    issuer: "University of Michigan (Coursera)",
    score: "",
    date: "November 23, 2023",
    img: "/assets/certificates/university.svg",
    href: "https://www.coursera.org/account/accomplishments/verify/DLE2QWV58KG7?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
];
