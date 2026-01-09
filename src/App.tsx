import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown, Cpu, Activity, Signal, Users, GraduationCap, Zap } from 'lucide-react';

/**
 * UTILITIES & DATA
 */

// Custom Hook for intersection observer (Scroll Animations)
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

// Project Data from your DOCX
const projectData = {
  title: "Ultrasonic Distance Estimator",
  subtitle: "Using Arduino & Piezo Resonance",
  course: "EECE-106",
  session: "Level 1, Term 2",
  group: "Group-2",
  institution: "Military Institute of Science & Technology (MIST)",
  department: "Department of Electrical, Electronics and Communication Engineering (EECE)",
  members: [
    { name: "Tanvir Ahmed", id: "202516001", role: "Team Lead" },
    { name: "Md Sadman Bin Masud", id: "202516002", role: "Hardware Specialist" },
    { name: "Adri Bhowmick", id: "202516003", role: "Research Analyst" },
    { name: "Lohan Al Fardin", id: "202516004", role: "Circuit Designer" },
    { name: "Abu Zaid Umayer", id: "202516005", role: "Documentation" },
  ],
  objective: "To design and implement a precision distance measurement system using ultrasonic waves and piezoelectric resonance, controlled by an Arduino microcontroller for automated industrial and safety applications.",
  description: "This project utilizes the principle of sound wave reflection (sonar). An ultrasonic transmitter emits a high-frequency pulse which travels through the air, hits an object, and reflects back to the receiver. By calculating the time of flight (ToF) and the speed of sound, the Arduino calculates the exact distance. The inclusion of piezo resonance ensures high efficiency in signal transmission.",
  implementation: [
    "Microcontroller Unit: Arduino UNO handling logic and calculations.",
    "Sensor Array: HC-SR04 Ultrasonic Module for transmission and reception.",
    "Resonance: Piezoelectric buzzer/sensor tuned to resonant frequency for audible alerts or feedback.",
    "Display: 16x2 LCD or Serial Monitor to output real-time distance.",
    "Power: 9V DC battery or USB power supply."
  ]
};

/**
 * COMPONENTS
 */

// 1. Navigation Bar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Objective', href: '#objective' },
    { name: 'Description', href: '#description' },
    { name: 'Implementation', href: '#implementation' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-white">
          MIST<span className="text-emerald-500">.EECE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest text-gray-300 hover:text-emerald-400 transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg text-white font-medium hover:text-emerald-500">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {/* Gradient Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase animate-fade-in-up">
          Project Proposal
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
          Ultrasonic <br />
          <span className="italic text-emerald-500 font-light">Distance Estimator</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light animate-fade-in-up delay-200">
          Using Arduino & Piezo Resonance. <br/>
          A robust solution for precision measurement designed by {projectData.group}.
        </p>

        <div className="flex justify-center gap-4 animate-fade-in-up delay-300">
          <a href="#objective" className="group relative px-8 py-3 bg-white text-black font-semibold rounded-none overflow-hidden transition-all hover:bg-emerald-400">
            <span className="relative z-10">Explore Project</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/30 w-8 h-8" />
      </div>
    </section>
  );
};

// 3. Info Section (Generic for Objective & Description)
const InfoSection = ({ id, title, content, icon: Icon, align = 'left' }: { id: string, title: string, content: string, icon: any, align?: 'left' | 'right' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section id={id} className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
       {/* Decorative Lines */}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-6">
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Text Content */}
          <div className={`flex-1 ${align === 'right' ? 'md:order-2' : ''}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                <Icon size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white">{title}</h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-emerald-500/30 pl-6">
              {content}
            </p>
          </div>

          {/* Visual Element (Abstract Representation) */}
          <div className={`flex-1 w-full ${align === 'right' ? 'md:order-1' : ''}`}>
            <div className="relative w-full aspect-video md:aspect-square bg-gradient-to-br from-gray-900 to-black border border-white/5 rounded-2xl p-8 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Animated Rings for Ultrasonic/Piezo effect */}
              <div className="w-32 h-32 border border-emerald-500/30 rounded-full flex items-center justify-center animate-[ping_3s_infinite]">
                 <div className="w-20 h-20 border border-emerald-400/50 rounded-full animate-[ping_3s_infinite_delay-100]"></div>
              </div>
              <Icon className="absolute text-white/5 w-64 h-64" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 4. Implementation Section
const Implementation = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="implementation" className="py-24 bg-black relative">
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Project Implementation</h2>
            <p className="text-emerald-500 uppercase tracking-widest text-sm">Hardware & Methodology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.implementation.map((item, index) => (
              <div 
                key={index}
                className="group p-8 bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 rounded-xl"
              >
                <div className="mb-4 text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Cpu size={32} />
                </div>
                <h3 className="text-white text-xl font-medium mb-2">Step {index + 1}</h3>
                <p className="text-gray-400 font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Team Section
const Team = () => {
  return (
    <section id="team" className="py-24 bg-[#080808] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-2">The Team</h2>
            <p className="text-gray-500">{projectData.group} — {projectData.session}</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-full">
            <GraduationCap size={18} />
            <span className="text-sm font-semibold tracking-wide">MIST — EECE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {projectData.members.map((member) => (
            <div key={member.id} className="group relative bg-[#111] p-6 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="absolute top-4 right-4 text-white/10 group-hover:text-emerald-500/20 transition-colors">
                <Users size={24} />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full mb-4 flex items-center justify-center text-white font-serif text-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-white font-medium mb-1">{member.name}</h3>
              <p className="text-emerald-500 text-xs tracking-wider mb-2">{member.id}</p>
              <p className="text-gray-500 text-xs border-t border-white/10 pt-2">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Footer
const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <p className="text-2xl font-bold tracking-tighter text-white mb-2">
            MIST<span className="text-emerald-500">.EECE</span>
          </p>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {projectData.institution} <br />
            {projectData.department}
          </p>
        </div>
        <p className="text-white/20 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Group-2 Project Proposal
        </p>
      </div>
    </footer>
  );
};

// MAIN APP COMPONENT
const App = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-emerald-500 selection:text-black">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        html { scroll-behavior: smooth; }
      `}</style>
      
      <Navbar />
      
      <main>
        <Hero />
        
        <InfoSection 
          id="objective" 
          title="Project Objective" 
          content={projectData.objective} 
          icon={Activity} 
          align="left"
        />
        
        <InfoSection 
          id="description" 
          title="Project Descriptive" 
          content={projectData.description} 
          icon={Signal} 
          align="right"
        />
        
        <Implementation />
        
        <Team />
      </main>

      <Footer />
    </div>
  );
};

export default App;