import { useEffect, useState, type PointerEvent } from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  MousePointer2,
  Mail,
  Download,
  Sparkles,
} from "lucide-react";

// Keep this Google Drive file ID unchanged when uploading a new resume version.
// Replace the PDF using Google Drive → Manage versions → Upload new version.
const RESUME_FILE_ID = "1mm5drn3qydy6W3zAmalzvFz1PA5diPtW";
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view`;

type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  tools: string[];
  live: string;
  github: string;
  theme: "mint" | "lavender" | "peach";
  note: string;
};

const projects: Project[] = [
  {
    id: "01",
    name: "StudentVoice",
    type: "FULL-STACK APPLICATION",
    description:
      "A student feedback manager with forms, star ratings, feedback retrieval, and an Express REST API connected to MongoDB.",
    tools: ["JavaScript", "Express", "MongoDB", "Mongoose"],
    live: "https://student-feedback-manager-delta.vercel.app/",
    github: "https://github.com/tannuranga25-lab/student_feedback_manager",
    theme: "mint",
    note: "An idea becomes useful when people can actually use it.",
  },
  {
    id: "02",
    name: "Dhaaga",
    type: "SOLO HACKATHON PROJECT",
    description:
      "My individual Catalyst hackathon project exploring shared care-circle coordination for older adults, families, and caregivers.",
    tools: ["Solo entry", "Next.js", "Care coordination"],
    live: "https://dhaaga-promptwars-catalyst-hackathon.onrender.com/",
    github: "https://github.com/tannuranga25-lab/dhaaga-promptwars-catalyst-hackathon",
    theme: "lavender",
    note: "My Catalyst submission earned Position 100 in the Code Analysis ranking (93.14 marks).",
  },
  {
    id: "03",
    name: "Reward Event",
    type: "RESPONSIVE LANDING PAGE",
    description:
      "A responsive event landing page featuring presenter information and a registration interface, built with HTML and CSS.",
    tools: ["HTML5", "CSS3", "Grid", "Flexbox"],
    live: "https://reward-event-landing-page.vercel.app/",
    github: "https://github.com/tannuranga25-lab/reward-event-landing-page",
    theme: "peach",
    note: "A focused exercise in layout, hierarchy, and responsive design.",
  },
];

/**
 * Soft cursor: a tiny translucent accent around the native mouse pointer.
 * Motion values update without rerendering the page on each mouse move.
 * Disabled for touch input and reduced-motion preferences.
 */
function SoftCursor() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-40);
  const pointerY = useMotionValue(-40);
  const smoothX = useSpring(pointerX, { stiffness: 900, damping: 50, mass: 0.18 });
  const smoothY = useSpring(pointerY, { stiffness: 900, damping: 50, mass: 0.18 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const fineMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reducedMotion || !fineMouse.matches) return;

    function updatePointer(event: globalThis.PointerEvent) {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setIsVisible(true);
      const element = event.target instanceof Element ? event.target : null;
      const overControl = Boolean(element?.closest("a, button, [role='button']"));
      setIsInteractive(current => current === overControl ? current : overControl);
    }

    function hidePointer() { setIsVisible(false); }

    document.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", hidePointer);
    window.addEventListener("blur", hidePointer);
    return () => {
      document.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", hidePointer);
      window.removeEventListener("blur", hidePointer);
    };
  }, [reducedMotion, pointerX, pointerY]);

  return (
    <motion.div
      className={`cursor-trail ${isVisible ? "is-visible" : ""} ${isInteractive ? "is-over-target" : ""}`}
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    >
      <span className="cursor-soft-ring" />
    </motion.div>
  );
}

function InteractiveSpecimen() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 170, damping: 23 });
  const springY = useSpring(pointerY, { stiffness: 170, damping: 23 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="specimen-zone">
      <div className="specimen-grid" aria-hidden="true" />
      <div className="floating-asterisk" aria-hidden="true">✳</div>
      <div className="orbit-label" aria-hidden="true">FIG. 01 / IN PROGRESS</div>

      <div
        className="specimen-hitbox"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <motion.div
          className="specimen-object"
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
          initial={reducedMotion ? false : { opacity: 0, y: 28, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="paper paper--coral" aria-hidden="true" />
          <div className="paper paper--lime" aria-hidden="true" />
          <div className="paper paper--main">
            <div className="paper-topline">
              <span>FIELD NOTE / 001</span>
              <Sparkles size={20} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <div className="paper-scribble" aria-hidden="true">
              <span className="scribble-circle">01</span>
              <span className="scribble-lines">— — —</span>
            </div>
            <span className="paper-type">CURRENTLY EXPLORING</span>
            <div className="paper-title">
              Real problems.
              <br />
              Real projects<span>.</span>
            </div>
            <p className="paper-description">
              Ideas, experiments, and working software — documented as I learn.
            </p>
            <div className="paper-bottomline">
              <span>CODE + CURIOSITY</span>
              <span>↗</span>
            </div>
          </div>
          <div className="specimen-sticker" aria-hidden="true">
            STILL
            <br />
            LEARNING!
          </div>
        </motion.div>
      </div>

      <div className="pointer-hint" aria-hidden="true">
        <MousePointer2 size={16} /> Move your mouse here
      </div>
    </div>
  );
}

function ProjectArchive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const selected = projects[activeIndex];

  return (
    <section className="work-section section-shell" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">02 / THINGS I'VE MADE</span>
          <h2 id="work-title">Open the <em>case files.</em></h2>
        </div>
        <p>Pick a file. See what was actually built.</p>
      </div>

      <div className="archive-layout">
        <div className="archive-index" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`archive-tab ${activeIndex === index ? "is-active" : ""}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <span className="archive-tab-number">/{project.id}</span>
              <span className="archive-tab-name">{project.name}</span>
              <ArrowUpRight size={21} aria-hidden="true" />
            </button>
          ))}
          <div className="index-note">* Every project has its own story.</div>
        </div>

        <div className={`case-surface case-surface--${selected.theme}`}>
          <AnimatePresence mode="wait">
            <motion.article
              key={selected.id}
              className="case-content"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.24 }}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="case-upper">
                <span>CASE FILE / {selected.id}</span>
                <span className="case-star" aria-hidden="true">✳</span>
              </div>
              <div className="case-middle">
                <span className="case-type">{selected.type}</span>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
              </div>
              <div className="case-stacks">
                {selected.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <div className="case-bottom">
                <span className="case-note">{selected.note}</span>
                <div className="case-actions">
                  <a href={selected.live} target="_blank" rel="noopener noreferrer">
                    Live project <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <a href={selected.github} target="_blank" rel="noopener noreferrer">
                    GitHub source <FaGithub size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


const leadership = [
  {
    number: "01",
    role: "Life Skill Coach",
    organization: "NavGurukul",
    period: "Mar – Sep 2026",
    description: "Facilitated interactive learning activities for 120+ students.",
    tag: "FACILITATION",
    color: "lemon",
    proofUrl: "https://drive.google.com/file/d/1QsijLCbTpLTKsf3v6MH9otM0t4xfZH_0/view?usp=sharing",
    proofLabel: "View certificate",
  },
  {
    number: "02",
    role: "Community Leader — Volunteer",
    organization: "The Gender Lab",
    period: "Jul – Sep 2024",
    description: "Led awareness sessions on equality and rights and helped organize six community workshops.",
    tag: "COMMUNITY",
    color: "lavender",
    proofUrl: "https://drive.google.com/file/d/1DAdHgh9YB39hHCVN0CLOAeLTqyyXG8zo/view?usp=sharing",
    proofLabel: "View certificate",
  },
  {
    number: "03",
    role: "Student Volunteer",
    organization: "National Service Scheme (NSS)",
    period: "Apr 2022 – Mar 2024",
    description: "Participated in community service activities and received a merit certificate.",
    tag: "SERVICE",
    color: "aqua",
    proofUrl: "https://drive.google.com/file/d/1dYoKQ6JtLRZZ2INOg7GNKGWvtarmV6zf/view?usp=sharing",
    proofLabel: "View certificate",
  },
  {
    number: "04",
    role: "Class Representative & Volunteer",
    organization: "NavGurukul",
    period: "Aug 2025 – Mar 2026",
    description: "Contributed to student representation and volunteer activities.",
    tag: "LEADERSHIP",
    color: "coral",
    proofUrl: "https://www.linkedin.com/in/tannu-ranga/?locale=experience",
    proofLabel: "View experience",
  },
] as const;

function HackathonStory() {
  return (
    <section className="hackathon-section" id="hackathons" aria-labelledby="hackathon-title">
      <div className="section-shell hackathon-grid">
        <div className="hackathon-heading">
          <p className="section-kicker">03 / HACKATHON EXPERIENCES</p>
          <h2 id="hackathon-title">Fast ideas.<br /><em>Different paths.</em></h2>
          <p>
            I entered Catalyst Hackathon individually with Dhaaga, a care-circle
            project. My submission placed 100th in the Code Analysis ranking.
          </p>
        </div>
        <article className="hackathon-ticket">
          <span className="ticket-eyebrow">FIELD RECORD / HACKATHON</span>
          <span className="ticket-stamp" aria-hidden="true">✳</span>
          <h3>Dhaaga<span>.</span></h3>
          <p className="ticket-subtitle">One thread, the whole family.</p>
          <p>
            My individual hackathon project exploring shared care-circle
            coordination for older adults, families, and caregivers.
          </p>
          <div className="ticket-tags">
            <span>SOLO ENTRY</span><span>NEXT.JS</span><span>RANK #100</span>
          </div>
          <div className="ticket-links">
            <a href="https://dhaaga-promptwars-catalyst-hackathon.onrender.com/" target="_blank" rel="noopener noreferrer">
              View project <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="https://github.com/tannuranga25-lab/dhaaga-promptwars-catalyst-hackathon" target="_blank" rel="noopener noreferrer">
              Source code <FaGithub size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="ticket-disclaimer">Catalyst Code Analysis · Position 100 · 93.14 marks</p>
        </article>
      </div>
    </section>
  );
}


function Achievements() {
  const achievements = [
    {
      id: "01",
      category: "INDIVIDUAL ENTRY / 15 NOV 2026",
      headline: "Rank #100",
      organization: "Catalyst Hackathon · Dhaaga (Solo Entry)",
      description: "Submitted Dhaaga individually and secured Position 100 in the Code Analysis ranking (93.14 marks).",
      link: "https://drive.google.com/drive/folders/1F4q716pvqAa53yidh71sZJMbBQ-wc3y5",
      linkLabel: "View certificate",
      rankProof: "/achievements/catalyst-code-analysis-rank-100.webp",
      rankProofLabel: "View ranking proof",
      accent: "coral",
      image: "/achievements/catalyst-top-150.webp",
      imageAlt: "Catalyst achievement certificate showing Tannu Ranga ranked in the Top 150 on 15 November 2026",
    },
    {
      id: "02",
      category: "PROBLEM SOLVING / 9 JUL 2026",
      headline: "500 difficulty",
      organization: "CodeChef practice milestone",
      description: "Completed all practice problems at the 500 difficulty level. This is a difficulty milestone, not a claim of a 500 contest rating.",
      link: "https://www.codechef.com/certificates/public/4b05962",
      linkLabel: "Verify CodeChef certificate",
      rankProof: null,
      rankProofLabel: null,
      accent: "lime",
      image: "/achievements/codechef-500-difficulty.webp",
      imageAlt: "CodeChef certificate for completion of the practice problems at 500 difficulty on 9 July 2026",
    },
  ] as const;

  return (
    <section className="achievements-section section-shell" id="achievements" aria-labelledby="achievements-title">
      <div className="section-heading achievements-heading">
        <div>
          <span className="section-kicker">04 / PROOF OF PROGRESS</span>
          <h2 id="achievements-title">Small wins, <em>real evidence.</em></h2>
        </div>
        <p>Milestones with a link to the record behind each claim.</p>
      </div>
      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <article className={`achievement-card achievement-card--${achievement.accent}`} key={achievement.id}>
            <div className="achievement-topline">
              <span>RECORD / {achievement.id}</span>
              <span aria-hidden="true">✳</span>
            </div>
            <p className="achievement-category">{achievement.category}</p>
            <h3>{achievement.headline}</h3>
            <p className="achievement-org">{achievement.organization}</p>
            <p className="achievement-description">{achievement.description}</p>
            <a className="achievement-image-link" href={achievement.link} target="_blank" rel="noopener noreferrer" aria-label={`Open proof for ${achievement.organization}`}>
              <img className="achievement-preview" src={achievement.image} alt={achievement.imageAlt} loading="lazy" decoding="async" width={1034} height={724} />
            </a>
            <div className="achievement-proof-links">
              {achievement.rankProof && (
                <a href={achievement.rankProof} target="_blank" rel="noopener noreferrer" aria-label="View Tannu Ranga's Code Analysis ranking entry">
                  {achievement.rankProofLabel} <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
              <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                {achievement.linkLabel} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeyondTheCode() {
  return (
    <section className="beyond-section section-shell" id="beyond" aria-labelledby="beyond-title">
      <div className="section-heading beyond-heading">
        <div>
          <span className="section-kicker">05 / HUMAN SKILLS</span>
          <h2 id="beyond-title">Beyond <em>the code.</em></h2>
        </div>
        <p>Technology matters. So do people, communication, and community.</p>
      </div>
      <div className="beyond-intro">
        <p>
          I also learn through facilitating groups, volunteering, listening,
          and working with people from different backgrounds.
        </p>
        <div className="human-tags" aria-label="Non-technical skills I have practiced">
          <span>PUBLIC SPEAKING</span>
          <span>FACILITATION</span>
          <span>TEAMWORK</span>
          <span>COMMUNITY WORK</span>
          <span>LEADERSHIP</span>
        </div>
      </div>
      <div className="role-grid">
        {leadership.map((item) => (
          <article className={`role-note role-note--${item.color}`} key={item.number}>
            <div className="role-note-top">
              <span>FIELD NOTE / {item.number}</span><span>{item.tag}</span>
            </div>
            <h3>{item.role}</h3>
            <p className="role-org">{item.organization}</p>
            <p className="role-description">{item.description}</p>
            <div className="role-note-bottom">
              <span>{item.period}</span>
              <a href={item.proofUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.proofLabel} for ${item.role}`}>
                {item.proofLabel} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="outside-learning">
        <span className="outside-mark" aria-hidden="true">✷</span>
        <div>
          <span className="section-kicker">ALSO IN MY NOTEBOOK</span>
          <h3>Always learning, even away from a screen.</h3>
          <p>Software Engineering Trainee at NavGurukul (since July 2025), BCA (Honours with Research) at Eternal University (2025–2028), and a Spoken English and Soft Skills learner at Touching Lives Welfare Trust.</p>
        </div>
        <a href="https://www.youtube.com/@sparkupwithTannu" target="_blank" rel="noopener noreferrer">
          My YouTube <FaYoutube size={19} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-root">
        <a className="skip-link" href="#main">Skip to content</a>
        <SoftCursor />

        <header className="site-header section-shell">
          <a className="wordmark" href="#top" aria-label="Tannu Ranga — back to top">
            <span className="wordmark-symbol">t<span>.</span></span>
            <span className="wordmark-text">THE LIVING<br />FIELDBOOK</span>
          </a>
          <nav aria-label="Main navigation" className="main-navigation">
            <a href="#work">Work <span>↗</span></a>
            <a href="#beyond">Beyond <span>↗</span></a>
            <a href="#contact">Contact <span>↗</span></a>
          </nav>
          <span className="availability"><span className="availability-dot" /> OPEN TO INTERNSHIPS · JOBS · COLLABORATIONS</span>
        </header>

        <main id="main" tabIndex={-1}>
          <section className="hero section-shell" id="top" aria-labelledby="hero-title">
            <motion.div
              className="hero-copy"
              initial={reducedMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="intro-stamp"><span className="stamp-star">✳</span> HELLO, I'M TANNU RANGA <span className="stamp-line" /></div>
              <h1 id="hero-title">
                Curiosity
                <span className="hero-second-line">into <em>code<span>.</span></em></span>
              </h1>
              <p className="hero-lead">
                I'm a full-stack developer and BCA student who loves turning
                practical ideas into things people can actually use.
              </p>
              <p className="hero-sublead">This is my open notebook: what I've built, what I'm exploring, and what I'm learning along the way.</p>
              
              <div className="hero-actions">
                <a className="primary-link" href="#work">
                  Explore my work <ArrowDownRight size={23} aria-hidden="true" />
                </a>
                <a className="secondary-link" href="https://github.com/tannuranga25-lab" target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="resume-hero-link" href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" aria-label="Download my latest resume PDF from Google Drive (opens in a new tab)">
                  <Download size={19} aria-hidden="true" /> Download resume
                </a>
              </div>
              <div className="hero-bottom-label"><span>01 / 07</span> SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div>
            </motion.div>

            <InteractiveSpecimen />
          </section>

          <div className="statement-strip" aria-label="Portfolio philosophy">
            <div className="statement-inner section-shell">
              <span>LEARN DEEPLY</span><span aria-hidden="true">✳</span>
              <span>BUILD PRACTICALLY</span><span aria-hidden="true">✳</span>
              <span>CREATE MEANINGFUL VALUE</span>
            </div>
          </div>

          <ProjectArchive />

          <HackathonStory />

          <Achievements />

          <BeyondTheCode />

          <section className="about-section" id="about" aria-labelledby="about-title">
            <div className="about-inner section-shell">
              <div className="about-index">06 / THE HUMAN BEHIND THE CODE</div>
              <div className="about-content">
                <h2 id="about-title">Learning is a<br /><em>creative practice.</em></h2>
                <div className="about-bottom">
                  <p>
                    I study full-stack development, practical AI integration, data
                    structures, and software engineering principles. I enjoy
                    independent projects, hackathons, and building for real people.
                  </p>
                  <span className="about-flower" aria-hidden="true">✳</span>
                </div>
                <div className="hobby-section" aria-labelledby="hobbies-title">
                  <span className="hobby-eyebrow">AFTER HOURS / THINGS I ENJOY</span>
                  <h3 id="hobbies-title">Curious beyond the screen.</h3>
                  <div className="hobby-pills">
                    <span>✳ Exploring new technology</span>
                    <span>✳ Understanding human behaviour</span>
                    <span>✳ Reading interesting books</span>
                    <span>✳ Watching interesting movies</span>
                    <span>✳ Spending time in nature</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer" id="contact">
          <div className="footer-inner section-shell">
            <span className="footer-label">07 / THE NEXT CONVERSATION</span>
            <h2>Let's build<br /><em>something useful.</em></h2>
            <p className="contact-intro">Have a role, project idea, or collaboration in mind? Reach me directly.</p>
            <a className="featured-email" href="mailto:tannuranga77@gmail.com">
              <Mail size={24} aria-hidden="true" />
              <span>tannuranga77@gmail.com</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <aside className="resume-panel" aria-label="Resume download">
              <div className="resume-panel-copy">
                <span className="resume-eyebrow">CURRENT RESUME / PDF</span>
                <h3>My resume, always up to date.</h3>
                <p>Download my latest resume, or preview the PDF on Google Drive.</p>
              </div>
              <div className="resume-panel-actions">
                <a className="resume-download" href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" aria-label="Download latest resume PDF from Google Drive (opens in a new tab)">
                  <Download size={20} aria-hidden="true" /> Download resume
                </a>
                <a className="resume-preview" href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer">
                  View PDF <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </aside>
            <div className="footer-links">
              <a href="https://in.linkedin.com/in/tannu-ranga" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} aria-hidden="true" /> LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="https://github.com/tannuranga25-lab" target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} aria-hidden="true" /> GitHub <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/@sparkupwithTannu" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={20} aria-hidden="true" /> YouTube <ArrowUpRight size={18} aria-hidden="true" />
              </a>

            </div>
            <div className="footer-fineprint"><span>© {new Date().getFullYear()} TANNU RANGA</span><span>MADE WITH CURIOSITY AND CODE ✳</span></div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
