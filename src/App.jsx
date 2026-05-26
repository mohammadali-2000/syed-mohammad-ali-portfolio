import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowRight,
  Blocks,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  RadioTower,
  Rocket,
  Send,
  Shield,
  Sparkles,
  Terminal,
  WalletCards,
} from 'lucide-react';

const titles = ['Software Engineer', 'AEM Author', 'AI Explorer', 'Web3 Builder', 'Hackathon Developer'];
const skills = ['React', 'JavaScript', 'Tailwind CSS', 'AEM', 'GitHub', 'Web3', 'Node.js', 'AI Tools', 'HTML', 'CSS'];
const stats = [
  ['4+', 'years learning tech'],
  ['25+', 'projects completed'],
  ['40+', 'technologies explored'],
  ['2026', 'ETHGlobal focus'],
];

const projects = [
  {
    name: 'AI Assistant',
    stack: ['React', 'Node.js', 'LLM APIs'],
    copy: 'A context-aware productivity assistant with agentic workflows and polished UX.',
    icon: Bot,
    className: 'lg:col-span-2',
  },
  {
    name: 'Web3 DApp',
    stack: ['Solidity', 'Ethers', 'Wallets'],
    copy: 'Decentralized app patterns for wallet-first experiences and transparent ownership.',
    icon: WalletCards,
    className: '',
  },
  {
    name: 'Portfolio Website',
    stack: ['React', 'Tailwind', 'Motion'],
    copy: 'Premium personal brand system with cinematic motion and responsive layout.',
    icon: Sparkles,
    className: '',
  },
  {
    name: 'Hackathon Platform',
    stack: ['Next Ideas', 'AI', 'Realtime'],
    copy: 'Submission, team, and judging workflows designed for high-velocity builders.',
    icon: Rocket,
    className: '',
  },
  {
    name: 'AEM Enterprise Website',
    stack: ['AEM', 'HTML', 'CSS'],
    copy: 'Structured authoring workflows for scalable enterprise digital experiences.',
    icon: Blocks,
    className: 'lg:col-span-2',
  },
];

const ethItems = ['Ethereum', 'Smart Contracts', 'AI + Blockchain', 'Decentralized Apps', 'Open Source Development', 'Hackathon Builder'];
const contactLinks = [
  ['GitHub', 'https://github.com/mohammadali-2000', Github],
  ['LinkedIn', 'https://www.linkedin.com/in/syed-mohammad-ali-206050215/', Linkedin],
  ['Telegram', 'https://t.me/AliXDevs', Send],
];

function NeuralCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particleCount = 170;
    const positions = new Float32Array(particleCount * 3);
    const nodes = [];
    for (let i = 0; i < particleCount; i += 1) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      positions.set([x, y, z], i * 3);
      nodes.push(new THREE.Vector3(x, y, z));
    }

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3)),
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.035, transparent: true, opacity: 0.88 }),
    );
    group.add(particles);

    const linePositions = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < 1.85 && linePositions.length < 3900) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3)),
      new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.18 }),
    );
    group.add(lines);

    camera.position.z = 8;
    let frameId;
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', resize);

    const animate = () => {
      group.rotation.y += 0.0018;
      group.rotation.x += (pointer.y - group.rotation.x) * 0.018;
      group.rotation.z += (pointer.x - group.rotation.z) * 0.012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 opacity-75" aria-hidden="true" />;
}

function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 120, damping: 25 });
  const springY = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 160);
      y.set(event.clientY - 160);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: springX, y: springY }} />;
}

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % titles.length), 1850);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex min-h-12 items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 font-mono text-sm text-cyan-100 shadow-glow">
      <motion.span
        key={titles[index]}
        initial={{ y: 16, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {titles[index]}
      </motion.span>
    </span>
  );
}

function MagneticButton({ children, href = '#', variant = 'primary', icon: Icon }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const move = (event) => {
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.22);
    y.set((event.clientY - box.top - box.height / 2) * 0.22);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={`magnetic-btn ${variant === 'primary' ? 'magnetic-primary' : 'magnetic-secondary'}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.a>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
        <h2 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035, duration: 0.55 }}
      whileHover={{ y: -8, rotateX: 7, rotateY: -7 }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
      </div>
      <Code2 className="mb-8 text-cyan-200" size={22} />
      <h3 className="text-xl font-bold text-white">{skill}</h3>
      <p className="mt-2 text-sm text-slate-400">Production-ready digital systems</p>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className={`project-card group ${project.className}`}
    >
      <div className="project-preview">
        <Icon size={42} className="text-cyan-100" />
        <div className="preview-rings" />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-black text-white">{project.name}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{project.copy}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-7 flex gap-3">
          <a className="icon-link" href="https://github.com/mohammadali-2000" aria-label={`${project.name} GitHub`}>
            <Github size={16} />
            GitHub
          </a>
          <a className="icon-link" href="#contact" aria-label={`${project.name} live demo`}>
            <ExternalLink size={16} />
            Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function GitHubGraph() {
  const cells = useMemo(
    () => Array.from({ length: 154 }, (_, i) => ({ id: i, level: (i * 7 + Math.floor(i / 5)) % 5 })),
    [],
  );

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">GitHub</p>
          <h3 className="mt-2 text-2xl font-black text-white">mohammadali-2000</h3>
        </div>
        <a className="icon-link" href="https://github.com/mohammadali-2000">
          <Github size={16} />
          Open profile
        </a>
      </div>
      <div className="grid grid-cols-22 gap-1 overflow-hidden">
        {cells.map((cell) => (
          <motion.span
            key={cell.id}
            initial={{ opacity: 0.2, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: cell.id * 0.003 }}
            className={`h-3 rounded-[3px] ${['bg-white/10', 'bg-cyan-900/70', 'bg-cyan-500/40', 'bg-blue-400/70', 'bg-violet-400'][cell.level]}`}
          />
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {['Open source experiments', 'Daily build energy', 'AI + Web3 prototypes'].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
            <RadioTower className="mb-3 text-cyan-200" size={18} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -120]);

  useEffect(() => {
    const timer = setTimeout(() => document.body.classList.add('loaded'), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-void text-slate-200 selection:bg-cyan-300 selection:text-black">
      <div className="loader">
        <span>Initializing SMA_OS</span>
      </div>
      <CursorGlow />
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500" style={{ scaleX }} />
      <div className="fixed inset-0 bg-grid opacity-35" aria-hidden="true" />
      <div className="fixed inset-0 bg-radials" aria-hidden="true" />

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="font-mono text-sm font-bold tracking-[0.18em] text-white">
            SMA<span className="text-cyan-300">.DEV</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            {['About', 'Skills', 'Projects', 'ETHGlobal', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-cyan-200">
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8">
          <NeuralCanvas />
          <motion.div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" style={{ y: heroY }}>
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <RotatingTitle />
                <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                  Syed Mohammad Ali
                </h1>
                <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-300 sm:text-2xl">
                  Building modern digital experiences for the future internet.
                </p>
              </motion.div>
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.65 }}
              >
                <MagneticButton href="#projects" icon={Rocket}>View Projects</MagneticButton>
                <MagneticButton href="https://github.com/mohammadali-2000" variant="secondary" icon={Github}>GitHub</MagneticButton>
                <MagneticButton href="#contact" variant="secondary" icon={Mail}>Contact</MagneticButton>
                <MagneticButton href="#about" variant="secondary" icon={ArrowRight}>Resume</MagneticButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8 }}
              className="relative min-h-[460px]"
            >
              <div className="floating-terminal">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 font-mono text-xs text-slate-400">future-internet.sh</span>
                </div>
                <div className="space-y-4 p-5 font-mono text-sm">
                  <p><span className="text-cyan-300">$</span> boot --profile syed</p>
                  <p className="text-slate-400">loading ai_stack... web3_kernel... aem_authoring...</p>
                  <p><span className="text-purple-300">const</span> builder = &#123; mindset: <span className="text-cyan-200">'ship fast'</span>, craft: <span className="text-cyan-200">'premium'</span> &#125;</p>
                  <p className="terminal-caret text-emerald-300">status: building for ETHGlobal Mumbai 2026</p>
                </div>
              </div>
              <div className="hud-card left-0 top-10 animate-float">
                <BrainCircuit size={20} />
                AI systems
              </div>
              <div className="hud-card right-2 top-36 animate-float [animation-delay:1.2s]">
                <Shield size={20} />
                Web3 security
              </div>
              <div className="hud-card bottom-12 left-12 animate-float [animation-delay:2s]">
                <Cpu size={20} />
                AEM delivery
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Section id="about" eyebrow="01 / About" title="Computer Science engineer with founder-level product energy.">
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/[0.055] p-7 shadow-glow backdrop-blur-2xl sm:p-10"
            >
              <p className="text-lg leading-8 text-slate-200">
                Computer Science engineer currently working at Accenture as an AEM Author. Passionate about AI, Web3,
                modern frontend engineering, hackathons, and building impactful digital systems.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['High-agency builder', 'Modern frontend craft', 'Enterprise authoring', 'Hackathon velocity'].map((item) => (
                  <div key={item} className="rounded-lg border border-cyan-300/15 bg-black/30 p-4 text-sm text-cyan-100">
                    <Sparkles className="mb-3" size={17} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2">
              {stats.map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-6 backdrop-blur-xl"
                >
                  <p className="text-4xl font-black text-white">{value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="02 / Skills" title="Technical stack for AI-native, decentralized, high-polish interfaces.">
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {skills.map((skill, index) => <SkillCard key={skill} skill={skill} index={index} />)}
          </div>
        </Section>

        <Section id="experience" eyebrow="03 / Timeline" title="Experience moving between enterprise systems and hacker-speed builds.">
          <div className="mt-14 space-y-8 border-l border-cyan-300/25 pl-7">
            {[
              ['Accenture', 'AEM Author', 'Joined November 2025', 'Enterprise content systems, authoring workflows, and production web delivery.'],
              ['MPSEDC Internship', 'Software Development Internship', 'Internship', 'Practical software development exposure across structured engineering workflows.'],
            ].map(([company, role, date, copy], index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
              >
                <span className="absolute -left-[35px] top-7 h-4 w-4 rounded-full border border-cyan-200 bg-cyan-400 shadow-glow" />
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">{date}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{company}</h3>
                <p className="mt-1 text-purple-200">{role}</p>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{copy}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="04 / Projects" title="Bento showcase of AI, Web3, hackathon, and enterprise builds.">
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
          </div>
        </Section>

        <Section id="ethglobal" eyebrow="05 / ETHGlobal" title="Currently Building For ETHGlobal Mumbai 2026">
          <div className="mt-12 grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="blockchain-orbit">
              <div className="chain-core">ETH</div>
              {[0, 1, 2, 3, 4, 5].map((item) => <span key={item} style={{ '--i': item }} />)}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ethItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.055] p-5 text-white backdrop-blur-xl"
                >
                  <Terminal className="mb-4 text-cyan-200" size={19} />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="github" eyebrow="06 / Open Source" title="A public build trail for experiments, code, and internet-native products.">
          <div className="mt-12">
            <GitHubGraph />
          </div>
        </Section>

        <Section id="contact" eyebrow="07 / Contact" title="Open channel for collaborations, hackathons, and future-facing product work.">
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {contactLinks.map(([label, href, Icon]) => (
                <a key={label} href={href} className="contact-link">
                  <Icon size={21} />
                  <span>{label}</span>
                  <ArrowRight size={16} className="ml-auto" />
                </a>
              ))}
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-slate-300">
                <p className="font-mono text-sm text-cyan-200">@AliXDevs</p>
                <p className="mt-2 text-sm">Telegram for fast-moving builder conversations.</p>
              </div>
            </div>
            <form className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-violet backdrop-blur-2xl sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field" placeholder="Name" aria-label="Name" />
                <input className="field" placeholder="Email" aria-label="Email" type="email" />
              </div>
              <input className="field mt-4" placeholder="Project type" aria-label="Project type" />
              <textarea className="field mt-4 min-h-36 resize-none" placeholder="Message" aria-label="Message" />
              <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 font-bold text-black shadow-glow transition hover:bg-white" type="button">
                Send signal
                <Send size={17} />
              </button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-sm text-slate-400">
        Built by Syed Mohammad Ali
      </footer>
    </div>
  );
}

export default App;
