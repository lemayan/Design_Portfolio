"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Moon, Sun, X } from "lucide-react";
import emailjs from "@emailjs/browser";

type Project = {
  year: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  tags: string[];
  publicationUrl: string;
  downloadUrl?: string;
  isLatest?: boolean;
  gallery: {
    src: string;
    label: string;
  }[];
};

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const sectors = [
  {
    title: "Flood Risk & Early Warning",
    description: "Hydrologic and terrain-informed susceptibility mapping that supports early warning systems and local emergency planning.",
  },
  {
    title: "Urban Infrastructure Intelligence",
    description: "GIS workflows for transport, utilities, and public agencies that need defensible spatial evidence for investment decisions.",
  },
  {
    title: "Climate & Watershed Analytics",
    description: "Remote sensing and watershed analytics that translate land-use and climate stress into actionable mitigation priorities.",
  },
];

const services = [
  {
    title: "Geospatial Statistical Modeling",
    body: "Develop and validate Shannon's Entropy and Frequency Ratio models to quantify spatial hazard relationships. Apply information coefficients and weight values for complex environmental predictors.",
  },
  {
    title: "Cloud Remote Sensing with GEE",
    body: "Build cloud-based Google Earth Engine workflows for Sentinel-1 SAR and Sentinel-2 processing. Integrate CHIRPS rainfall and Random Forest pipelines for dynamic flood forecasting.",
  },
  {
    title: "SAR and Optical Data Fusion",
    body: "Process SAR imagery with refined speckle filtering, radiometric correction, and VH/VV polarization analysis, then fuse outputs with NDVI and land use layers for infrastructure vulnerability assessment.",
  },
  {
    title: "Hydro-Topographic Terrain Analysis",
    body: "Extract slope, aspect, plan curvature, altitude, drainage density, and river density from DEMs to model runoff behavior and flood pathways in urban watersheds.",
  },
  {
    title: "Spatial Data Science with R and ArcGIS",
    body: "Run multicollinearity diagnostics using Variance Inflation Factor, produce correlation matrices, automate pixel-level area calculations, and deliver publication-grade cartographic outputs.",
  },
  {
    title: "Model Validation and Accuracy Assessment",
    body: "Evaluate predictive models using ROC and AUC metrics and validate against independent datasets to verify real-world geospatial model reliability.",
  },
];

const projects: Project[] = [
  {
    year: "2026",
    category: "Urban Flood Risk Research",
    title: "Flash Flood Susceptibility in Nairobi Watershed",
    subtitle: "Geospatial and Statistical Modeling Study",
    description:
      "This research predicts flash flood susceptibility across the Nairobi Watershed using advanced geospatial analysis and statistical modeling.",
    details:
      "The study addresses Nairobi's escalating urban flood challenge, where early 2024 flooding led to 210 fatalities and displaced over 200,000 people.",
    tags: ["Flash Floods", "Nairobi Watershed", "Risk Modeling", "Urban Resilience"],
    publicationUrl: "/projects/nairobi-flash-flood-research.pdf",
    downloadUrl: "/projects/nairobi-flash-flood-research.pdf",
    isLatest: true,
    gallery: [
      { src: "/flood-susceptibility-maps-BNnNUlsd.png", label: "Flood susceptibility map" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush NDVI Baseline",
    subtitle: "Somalia LCCS Workflow",
    description: "Built the NDVI baseline used to isolate vegetation density gradients before directional feature analysis.",
    details:
      "Produced radiometrically normalized vegetation layers to improve downstream pattern detection consistency and model reliability.",
    tags: ["NDVI", "Preprocessing", "Sentinel-2", "Python"],
    publicationUrl: "https://example.com/publications/tiger-bush-ndvi",
    gallery: [
      { src: "/tigerbush-ndvi-DhfRPCu0.png", label: "NDVI baseline" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Gabor Response",
    subtitle: "Directional Feature Extraction",
    description: "Implemented Gabor filtering to identify alternating band structures and directional signatures across arid terrain.",
    details:
      "Generated response-intensity surfaces that highlighted high-confidence tiger bush zones for review and classification.",
    tags: ["Gabor Filters", "Texture", "Signal Analysis", "Remote Sensing"],
    publicationUrl: "https://example.com/publications/tiger-bush-gabor",
    gallery: [
      { src: "/tigerbush-gabor-CF7JBbhp.png", label: "Gabor response" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Orientation Layer",
    subtitle: "Directional Coherence Mapping",
    description: "Mapped directional coherence to separate organized vegetation stripe systems from noisy background terrain.",
    details:
      "Used orientation vectors to strengthen class-confidence thresholds and improve segmentation precision.",
    tags: ["Orientation", "Feature Engineering", "Spatial Patterns"],
    publicationUrl: "https://example.com/publications/tiger-bush-orientation",
    gallery: [
      { src: "/tigerbush-orientation-CmMBCEGO.png", label: "Orientation map" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Periodicity Score",
    subtitle: "2D FFT Periodicity Validation",
    description: "Computed periodicity-strength surfaces to verify recurring ecological spacing associated with tiger bush systems.",
    details:
      "Used the periodicity layer as a primary confidence variable before final class confirmation and map export.",
    tags: ["2D FFT", "Periodicity", "Validation Layer"],
    publicationUrl: "https://example.com/publications/tiger-bush-periodicity",
    gallery: [
      { src: "/tigerbush-periodicity-Djg7SVcf.png", label: "Periodicity score" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Slope Constraint",
    subtitle: "Terrain Conditioning",
    description: "Integrated slope-based constraints to reduce false positives in topographically unsuitable areas.",
    details:
      "Combined terrain analysis with spectral indicators to deliver ecologically defensible outputs.",
    tags: ["Slope", "Terrain", "False Positive Control"],
    publicationUrl: "https://example.com/publications/tiger-bush-slope",
    gallery: [
      { src: "/tigerbush-slope-BDn0ZfD3.png", label: "Slope conditioning" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Detection Output 1",
    subtitle: "QGIS Integrated Result",
    description: "Delivered the first integrated QGIS output combining spectral, directional, and terrain indicators into one candidate layer.",
    details:
      "Used for technical review and threshold calibration before final model consolidation.",
    tags: ["QGIS", "Integration", "Workflow Output"],
    publicationUrl: "https://example.com/publications/tiger-bush-output-1",
    gallery: [
      { src: "/tigerbush-qgis-output1-B3DZf32G.png", label: "Output 1" },
    ],
  },
  {
    year: "2025",
    category: "Applied Research Project",
    title: "Tiger Bush Detection Output 2",
    subtitle: "Final Review Layer",
    description: "Prepared the second QGIS output for interpretation, reporting, and publication-ready map production.",
    details:
      "Represents refined pattern delineation after cross-validating periodicity, orientation, and terrain response behavior.",
    tags: ["QGIS", "Final Output", "Cartography"],
    publicationUrl: "https://example.com/publications/tiger-bush-output-2",
    gallery: [
      { src: "/tigerbush-qgis-output2-C_DB07Wz.png", label: "Output 2" },
    ],
  },
];

const timeline = [
  "Geo-Infinity / GeoTIPT International (FAO Somalia) - Freelance Geospatial Consultant",
  "KISIP 2 - GIS & Urban Planning Internship",
  "National Geographic + The Nature Conservancy - Conservation Mapping Externship",
  "KETRACO / KeNHA - Geospatial Engineering & Survey Support",
];

const CONTACT_EMAIL = "maxmeriwas@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/max-meriwas-117a77405/";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    window.localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  return (
    <button
      type="button"
      onClick={() => setIsLight((prev) => !prev)}
      className="toggle"
      aria-label="Toggle color theme"
      aria-pressed={isLight}
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
      {isLight ? "Dark" : "Light"}
    </button>
  );
}

function SwingLine() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const glowRef = useRef<SVGPathElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;

    const center = { x: 0, y: 0 };

    const target = { ...center };
    const current = { ...center };

    const createPath = (x: number, y: number) => {
      const nx = (x / width - 0.5) * 2;
      const ny = (y / height - 0.5) * 2;

      const startX = -40;
      const startY = height + 24;
      const endX = width + 40;
      const endY = -28;

      const bendX = nx * Math.min(150, width * 0.18);
      const bendY = ny * Math.min(95, height * 0.26);

      const c1X = width * 0.22 + bendX * 0.82;
      const c1Y = height * 0.78 + bendY * 0.58;
      const c2X = width * 0.64 - bendX * 0.52;
      const c2Y = height * 0.24 - bendY * 0.76;

      return `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`;
    };

    const setPath = (pathValue: string) => {
      glowRef.current?.setAttribute("d", pathValue);
      lineRef.current?.setAttribute("d", pathValue);
    };

    const setColor = (x: number) => {
      if (!svgRef.current || width <= 0) {
        return;
      }

      const mix = x / width;
      const hue = 198 + mix * 22 + Math.sin(performance.now() * 0.0012) * 6;
      svgRef.current.style.setProperty("--line-hue", `${hue.toFixed(1)}`);
      svgRef.current.style.setProperty("--line-hue-glow", `${(hue + 6).toFixed(1)}`);
    };

    const updateDimensions = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      width = rect.width;
      height = rect.height;
      center.x = width * 0.52;
      center.y = height * 0.48;

      target.x = center.x;
      target.y = center.y;
      current.x = center.x;
      current.y = center.y;

      if (prefersReducedMotion) {
        setPath(createPath(center.x, center.y));
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      target.x = center.x;
      target.y = center.y;
    };

    let rafId = 0;

    const animate = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      setPath(createPath(current.x, current.y));
      setColor(current.x);
      rafId = window.requestAnimationFrame(animate);
    };

    updateDimensions();
    setPath(createPath(center.x, center.y));

    window.addEventListener("resize", updateDimensions);

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      rafId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <svg ref={svgRef} className="swing-line-layer" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <path ref={glowRef} className="swing-line-glow" />
      <path ref={lineRef} className="swing-line" />
    </svg>
  );
}

function ProjectModal({
  project,
  initialIndex,
  onClose,
}: {
  project: Project;
  initialIndex: number;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  const activeImage = project.gallery[activeIndex];

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="presentation">
      <div className="project-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={project.title}>
        <div className="project-modal-head">
          <div>
            <p className="project-meta">
              <CalendarDays size={14} /> {project.year} <span>{project.category}</span>
            </p>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <button type="button" className="project-close" onClick={onClose} aria-label="Close expanded project">
            <X size={16} />
          </button>
        </div>

        <div className="project-modal-image">
          <button
            type="button"
            className="project-modal-image-trigger"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open full image for ${activeImage.label}`}
          >
            <Image src={activeImage.src} alt={activeImage.label} fill className="project-image" sizes="(max-width: 1024px) 100vw, 980px" />
          </button>
          <p>{activeImage.label}</p>
        </div>

        <div className="project-modal-grid">
          {project.gallery.map((item, idx) => (
            <button
              type="button"
              key={`${project.title}-${item.src}-${idx}`}
              className={`project-thumb ${idx === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Open ${item.label}`}
            >
              <Image src={item.src} alt={item.label} fill className="project-image" sizes="220px" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <a className="project-publication" href={project.publicationUrl} target="_blank" rel="noopener noreferrer">
          View Publication <ArrowUpRight size={14} />
        </a>
        {project.downloadUrl ? (
          <a className="project-publication" href={project.downloadUrl} download>
            Download PDF <ArrowUpRight size={14} />
          </a>
        ) : null}
        <a className="project-cta-link" href="#contact" onClick={onClose}>
          Want to know more? Contact me.
        </a>

        {lightboxOpen ? (
          <div className="project-lightbox-backdrop" onClick={() => setLightboxOpen(false)} role="presentation">
            <div className="project-lightbox" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={activeImage.label}>
              <button
                type="button"
                className="project-close project-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close full image"
              >
                <X size={16} />
              </button>
              <div className="project-lightbox-image-wrap">
                <Image src={activeImage.src} alt={activeImage.label} fill className="project-image" sizes="(max-width: 1200px) 100vw, 1200px" />
              </div>
              <p>{activeImage.label}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeProject, setActiveProject] = useState<{ project: Project; imageIndex: number } | null>(null);
  const [formFeedback, setFormFeedback] = useState("");
  const latestProject = projects.find((project) => project.isLatest) ?? projects[0];

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormState("error");
      setFormFeedback("Email service is not configured yet. Please add EmailJS keys in environment variables.");
      return;
    }

    setFormState("sending");
    setFormFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: CONTACT_EMAIL,
          reply_to: email,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setFormState("sent");
      setFormFeedback("Thanks. Your message was sent successfully.");
      form.reset();
    } catch {
      setFormState("error");
      setFormFeedback("Message failed to send. Please try again or email me directly.");
    }
  };

  return (
    <div>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#overview" className="brand">
            Max Lemeriwas
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main>
        <section id="overview" className="section hero">
          <div className="shell">
            <FadeIn>
              <p className="eyebrow">Geospatial Risk Intelligence | Floods, Climate, Infrastructure</p>
              <h1>
                I build decision-ready geospatial intelligence for flood risk, climate adaptation, and resilient infrastructure.
              </h1>
              <p className="lead">
                From satellite analysis to watershed susceptibility modeling, my work turns complex spatial data into clear actions for agencies and communities.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="latest-project-box">
                <p className="latest-project-eyebrow">Latest Project</p>
                <h3>{latestProject.title}</h3>
                <p>{latestProject.subtitle}</p>
                <div className="latest-project-actions">
                  <a className="latest-project-link" href="#latest-project">
                    Check Latest Project <ArrowDown size={15} />
                  </a>
                  <a className="latest-project-link secondary" href={latestProject.downloadUrl ?? latestProject.publicationUrl} download>
                    Download Research PDF <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="sector-grid">
                {sectors.map((sector) => (
                  <article key={sector.title} className="sector-card">
                    <h3>{sector.title}</h3>
                    <p>{sector.description}</p>
                  </article>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="expertise" className="section">
          <div className="shell expertise-grid">
            <FadeIn>
              <p className="eyebrow">Expertise</p>
              <h2>Specialized geospatial expertise for GIS, disaster risk, and data-driven planning roles.</h2>
            </FadeIn>

            <div className="service-list">
              {services.map((item, idx) => (
                <FadeIn key={item.title} delay={idx * 0.06}>
                  <article className="service-item">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="shell">
            <FadeIn>
              <p className="eyebrow">Projects</p>
              <h2>Applied geospatial work with measurable field impact.</h2>
            </FadeIn>

            <div className="project-grid">
              {projects.map((project, idx) => (
                <FadeIn key={project.title} delay={idx * 0.08}>
                  <article className={`project-card ${project.isLatest ? "is-latest" : ""}`} id={project.isLatest ? "latest-project" : undefined}>
                    {project.isLatest ? <p className="project-latest-flag">Latest Project</p> : null}
                    <p className="project-meta">
                      <CalendarDays size={14} /> {project.year} <span>{project.category}</span>
                    </p>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-copy project-copy-clamp">{project.description} {project.details}</p>

                    <button
                      type="button"
                      className="project-read-more"
                      onClick={() => setActiveProject({ project, imageIndex: 0 })}
                    >
                      Read more <ArrowUpRight size={14} />
                    </button>

                    <div className="project-gallery">
                      {project.gallery.map((item, imageIdx) => (
                        <button
                          type="button"
                          key={`${project.title}-${item.src}-${imageIdx}`}
                          className="project-media"
                          onClick={() => setActiveProject({ project, imageIndex: imageIdx })}
                          aria-label={`Expand ${project.title} - ${item.label}`}
                        >
                          <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="project-image"
                          />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="project-expand"
                      onClick={() => setActiveProject({ project, imageIndex: 0 })}
                    >
                      Expand Project <ArrowUpRight size={14} />
                    </button>
                    <a className="project-cta-link" href="#contact">
                      Want to know more? Contact me.
                    </a>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section statement">
          <div className="shell">
            <FadeIn>
              <p className="eyebrow">Experience</p>
              <h2>Geospatial work that is precise, proven, and built for real-world impact.</h2>
            </FadeIn>

            <div className="timeline-list">
              {timeline.map((entry, idx) => (
                <FadeIn key={entry} delay={idx * 0.06}>
                  <article className="timeline-item">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <p>{entry}</p>
                  </article>
                </FadeIn>
              ))}
            </div>

            <div className="ticker" aria-hidden="true">
              Available for U.S.-based geospatial contracts | FEMA-style risk analysis support | GIS deliverables aligned with agency standards
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="shell contact-grid">
            <FadeIn>
              <p className="eyebrow">Contact</p>
              <h2>Let us talk directly about your project scope and timeline.</h2>
              <p className="lead small">Open to freelance and collaborative work in sustainability, public infrastructure, and conservation.</p>
              <p className="contact-line">
                <MapPin size={16} /> Seattle, Washington, USA
              </p>
              <div className="contact-actions">
                <a className="mail-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL} <ArrowUpRight size={14} />
                </a>
                <a className="mail-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <form onSubmit={submitHandler} className="contact-form" aria-label="Contact form">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required placeholder="Your Name" />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" required type="email" placeholder="Your Email" />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project" />

                <button type="submit" disabled={formState === "sending"}>
                  {formState === "sending" ? "Sending..." : "Send Message"}
                </button>
                {formState === "sent" ? <p className="sent">{formFeedback}</p> : null}
                {formState === "error" ? <p className="sent form-error">{formFeedback}</p> : null}
              </form>
            </FadeIn>
          </div>
        </section>
      </main>

      <div className="bottom-line-wrap" aria-hidden="true">
        <SwingLine />
      </div>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <p className="footer-brand">Max Lemeriwas Studio</p>
            <p>Geospatial intelligence for resilient systems.</p>
          </div>
          <div>
            <a href="#projects">Projects</a>
            <a href="#expertise">Expertise</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <a href="#overview">Home</a>
            <a href="#experience">Experience</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {activeProject ? (
        <ProjectModal
          project={activeProject.project}
          initialIndex={activeProject.imageIndex}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
    </div>
  );
}
