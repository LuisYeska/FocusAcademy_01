'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  CheckCircle2, 
  Clock,
  Calendar,
  Menu,
  X,
  Plus,
  Minus
} from 'lucide-react';

/**
 * FOCUS ACADEMY - CÓDIGO DE LA PÁGINA DE INICIO
 * 
 * Este archivo contiene toda la lógica y el diseño de la página principal.
 * Está estructurado de la siguiente manera:
 * 1. DATOS: Arreglos de objetos con la información de horarios, profesores y filiales.
 * 2. UTILIDADES: Funciones para estilos dinámicos.
 * 3. COMPONENTE PRINCIPAL (LandingPage): Estructura visual de la página (Hero, Nav, etc).
 * 4. SUB-COMPONENTES: Elementos reutilizables como tarjetas de profesores y programas.
 */

// ============================================================
// 1. CONFIGURACIÓN DE DATOS (Modifica aquí para cambiar textos)
// ============================================================

// Información del Horario semanal
const SCHEDULE_DATA = [
  { time: "07:00 - 08:30", mon: "BJJ Fundamentos", tue: "Wrestling", wed: "BJJ Fundamentos", thu: "Wrestling", fri: "BJJ Fundamentos", sat: "Open Mat", sun: "Cerrado" },
  { time: "09:00 - 10:30", mon: "BJJ Avanzado", tue: "Judo", wed: "BJJ Avanzado", thu: "Judo", fri: "BJJ Avanzado", sat: "BJJ Mixto", sun: "Cerrado" },
  { time: "17:00 - 18:00", mon: "Focus Kids", tue: "Focus Kids", wed: "Focus Kids", thu: "Focus Kids", fri: "Focus Kids", sat: "Cerrado", sun: "Cerrado" },
  { time: "18:30 - 20:00", mon: "BJJ Fundamentos", tue: "Leglocks", wed: "BJJ Fundamentos", thu: "Leglocks", fri: "BJJ Fundamentos", sat: "Cerrado", sun: "Cerrado" },
  { time: "20:00 - 21:30", mon: "BJJ Avanzado", tue: "Wrestling", wed: "BJJ Avanzado", thu: "Wrestling", fri: "BJJ Avanzado", sat: "Cerrado", sun: "Cerrado" },
];

// Listado de Profesores (Nombre, Rol, Cinturón, Escuela, Imagen)
const INSTRUCTORS_DATA = [
  { name: "Johanan Carreño", role: "Head Instructor", rank: "Black Belt", specialty: "Escuela Focus Central", image: "/images/profesores/headcouch.jpeg" },
  { name: "Daniel García", role: "Kids Program Director", rank: "Brown Belt", specialty: "Escuela Focus", image: "/images/profesores/fiestoso.png" },
  { name: "Diego Felipe", role: "Fundamentals Coach", rank: "Brown Belt", specialty: "Escuela Focus", image: "/images/profesores/Diego Felipe.png" },
  { name: "Francisca Martinez", role: "Women's Program", rank: "Black Belt", specialty: "Escuela Triada", image: "/images/profesores/fran.png" },
  { name: "Alan Magendzo", role: "No-Gi Specialist", rank: "Black Belt", specialty: "Escuela Focus", image: "/images/profesores/alan.png" },
  { name: "Christian Marin", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Focus Independencia", image: "/images/profesores/Christian Marin.png" },
  { name: "Andrés Canales", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Corso", image: "/images/profesores/Andrés Canales.png" },
  { name: "Diego Lobos", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Focus", image: "/images/profesores/Diego Lobos.png" },
  { name: "Federico Noguera", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Corso", image: "/images/profesores/Federico Noguera .png" },
  { name: "Ivan Noguera", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Corso", image: "/images/profesores/Ivan Noguera.png" },
  { name: "Pablo Leon", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Raion BJJ", image: "/images/profesores/Pablo Leon.jpeg" },
  { name: "Esteban Pardo", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Animal Grip", image: "/images/profesores/negrito.png" },
  { name: "Sebastián Cadena", role: "Submission Specialist", rank: "Brown Belt", specialty: "Escuela Focus", image: "/images/profesores/Seba Cadenas.png" },
  { name: "Ricardo Cardoso", role: "BJJ Instructor", rank: "Black Belt", specialty: "Escuela Olas Combat", image: "/images/profesores/Ricardo Cardoso.png" }
];

// Listado de Academias Filiales
const AFFILIATES_DATA = [
  { name: "Animal Grip", image: "/Logos/filiales/animalgrip.png", url: "https://www.instagram.com/animal_grip/", location: "Conchalí" },
  { name: "Corso BJJ", image: "/Logos/filiales/corsobjj.png", url: "https://corsobjj.cl/", location: "Las Condes" },
  { name: "Entreno Jiu-Jitsu", image: "/Logos/filiales/entrenojiujitsu.png", url: "https://www.instagram.com/entrenojiujitsu/", location: "" },
  { name: "Focus Independencia", image: "/Logos/filiales/focusindependencia.png", url: "https://www.instagram.com/focus_independencia/", location: "Independencia" },
  { name: "Raion BJJ", image: "/Logos/filiales/raionbjj.png", url: "https://www.raionbjj.cl/", location: "Lo Barnechea" },
  { name: "Triada Jiu-Jitsu", image: "/Logos/filiales/triadajiujitsu.png", url: "https://triadajiujitsu.cl/", location: "Ñuñoa" },
  { name: "Olas Combat Jiujitsu", image: "/Logos/filiales/olascombat.png", url: "#", location: "" },
];

// ============================================================
// 2. UTILIDADES DE ESTILO (Colores dinámicos del horario)
// ============================================================

/**
 * Esta función determina el color de fondo y texto de cada celda del horario
 * basándose en el nombre de la clase.
 */
const getCellStyles = (text: string) => {
  if (!text || text === "Cerrado" || text === "-") return "flex flex-col items-center justify-center h-full opacity-10";
  
  const base = "flex flex-col gap-1.5 p-4 rounded-2xl border w-full h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-xl cursor-default group relative overflow-hidden";
  
  if (text.includes("Fundamentos")) return `${base} bg-gradient-to-br from-red-50 to-white border-red-100 text-red-700 shadow-sm`;
  if (text.includes("Avanzado")) return `${base} bg-slate-50 border-slate-200 text-slate-800 shadow-sm`;
  if (text.includes("Judo")) return `${base} bg-gradient-to-br from-amber-50 to-white border-amber-100 text-amber-700 shadow-sm`;
  if (text.includes("Wrestling")) return `${base} bg-gradient-to-br from-orange-50 to-white border-orange-100 text-orange-700 shadow-sm`;
  if (text.includes("Leglocks")) return `${base} bg-gradient-to-br from-purple-50 to-white border-purple-100 text-purple-700 shadow-sm`;
  if (text.includes("Kids")) return `${base} bg-gradient-to-br from-green-50 to-white border-green-100 text-green-700 shadow-sm`;
  if (text.includes("Open Mat") || text.includes("Mixto")) return `${base} bg-white border-zinc-200 text-zinc-800 shadow-sm`;
  
  return "text-zinc-600 text-xs";
};

// ============================================================
// 3. COMPONENTE PRINCIPAL (Estructura de la Página)
// ============================================================

export default function LandingPage() {
  // Estados para controlar la interactividad
  const [openFaq, setOpenFaq] = React.useState<number | null>(null); // Controla qué pregunta del FAQ está abierta
  const [showSplash, setShowSplash] = React.useState(true); // Controla la pantalla de carga inicial
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Controla el menú móvil
  const [heroImgIndex, setHeroImgIndex] = React.useState(0); // Controla el carrusel de imágenes del Hero
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = React.useState({ left: 0, right: 0 });

  // Imágenes que rotan en la sección principal
  const heroImages = [
    "/images/splash-poster.jpg",
    "/images/prof-roberto.jpg",
    "/images/prof-maria.jpg",
    "/images/prof-carlos.jpg",
    "/images/prof-elena.jpg"
  ];

  // Efecto para ocultar la pantalla de carga después de 8 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para rotar las imágenes del Hero cada 4 segundos
  React.useEffect(() => {
    const timer = setInterval(() => setHeroImgIndex((prev) => (prev + 1) % heroImages.length), 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Cálculo de límites para el carrusel de profesores
  React.useEffect(() => {
    if (!showSplash && carouselRef.current) {
      setConstraints({ 
        left: -(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth), 
        right: 0 
      });
    }
  }, [showSplash]);

  // Función para navegar suavemente a las secciones
  const handleNav = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        window.scrollTo({ 
          top: element.getBoundingClientRect().top + window.scrollY - offset, 
          behavior: 'smooth' 
        });
      }
    }, 100);
  };

  /**
   * PANTALLA DE CARGA (SPLASH SCREEN)
   * Se muestra al abrir la página.
   */
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden">
        {/* Video de fondo con filtro suave */}
        <div className="absolute inset-0 opacity-40 grayscale">
          <video autoPlay muted loop className="w-full h-full object-cover" poster="/images/splash-poster.jpg">
            <source src="/videos/bjj-hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Logos y botón de entrada */}
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="w-32 h-32 mx-auto mb-8 transform rotate-3">
              <img src="/Logos/SixBlades.png" alt="Six Blades" className="w-full h-full object-contain filter-focus-red" />
            </div>
            <div className="h-32 md:h-48 w-auto mx-auto mb-8">
              <img src="/Logos/logo_focus.png" alt="Focus Academy" className="h-full w-auto mx-auto object-contain" />
            </div>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs mb-12">Preparando tu experiencia...</p>
            <button 
              onClick={() => setShowSplash(false)} 
              className="bg-red-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl shadow-red-600/20"
            >
              Entrar al Tatami
            </button>
          </motion.div>
        </div>
        
        {/* Barra de progreso inferior */}
        <div className="absolute bottom-0 left-0 h-1 bg-red-600 w-full origin-left animate-[progress_8s_linear_forwards]" />
      </div>
    );
  }

  /**
   * CONTENIDO PRINCIPAL DE LA WEB
   */
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* Fondos difuminados decorativos */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100/20 blur-[120px] rounded-full" />
      </div>

      {/* BARRA DE NAVEGACIÓN (HEADER) */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logos Navegación */}
            <div className="flex items-center gap-3">
              <div className="w-12 md:w-16 h-12 md:h-16 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <img src="/Logos/SixBlades.png" alt="Six Blades" className="w-full h-full object-contain filter-focus-red" />
              </div>
              <div className="h-16 md:h-20 w-auto ml-1 md:ml-2">
                <img src="/Logos/logo_focus.png" alt="Focus Academy" className="h-full w-auto object-contain" />
              </div>
            </div>

            {/* Links Escritorio */}
            <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              <button onClick={() => handleNav('hero')} className="hover:text-black transition-colors">Inicio</button>
              <button onClick={() => handleNav('profesores')} className="hover:text-black transition-colors">Profesores</button>
              <button onClick={() => handleNav('programas')} className="hover:text-black transition-colors">Programas</button>
              <button onClick={() => handleNav('horario')} className="hover:text-black transition-colors">Horarios</button>
              <button onClick={() => handleNav('filiales')} className="hover:text-black transition-colors">Filiales</button>
              <a href="https://wa.me/56945908324?text=Hola%20Focus%20Academy!%20Me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20prueba." target="_blank" className="bg-red-600 text-white hover:bg-red-700 shadow-red-600/20 shadow-lg px-6 py-3 rounded-xl transition-all font-black">Agenda Clase</a>
            </div>

            {/* Botón Menú Móvil */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-black hover:bg-zinc-100 rounded-lg transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-black/5 overflow-hidden">
              <div className="flex flex-col p-6 gap-6 text-sm font-black uppercase tracking-widest text-zinc-500">
                <button onClick={() => handleNav('hero')} className="text-left">Inicio</button>
                <button onClick={() => handleNav('profesores')} className="text-left">Profesores</button>
                <button onClick={() => handleNav('programas')} className="text-left">Programas</button>
                <button onClick={() => handleNav('horario')} className="text-left">Horarios</button>
                <button onClick={() => handleNav('filiales')} className="text-left">Filiales</button>
                <a href="https://wa.me/56945908324" target="_blank" className="bg-red-600 text-white text-center py-4 rounded-xl font-black shadow-lg shadow-red-600/20">Agenda Clase</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SECCIÓN HERO (PORTADA) */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Texto y Llamada a la acción */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Zap size={12} className="fill-red-600" />
                <span>Evoluciona tu Potencial</span>
              </div>
              <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic text-black">
                Domina <br /> el <span className="text-black">Tatami</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-lg leading-relaxed font-medium">
                La academia de Jiu-Jitsu más moderna de Chile. Un espacio diseñado para tu transformación física, mental y técnica.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="https://wa.me/56945908324?text=Hola%20Focus%20Academy!%20Me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20prueba." target="_blank" className="group relative inline-flex items-center justify-center bg-red-600 text-white px-10 py-5 rounded-xl font-black text-lg transition-all hover:bg-red-700 shadow-lg shadow-red-600/10 overflow-hidden">
                  <span className="relative z-10">Agenda Tu Clase</span>
                  <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <button onClick={() => handleNav('programas')} className="inline-flex items-center justify-center px-10 py-5 rounded-xl border-2 border-black/10 hover:bg-black/5 font-black text-lg transition-all text-black">
                  Programas
                </button>
              </div>
            </motion.div>

            {/* Carrusel de Imágenes Visual */}
            <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-transparent rounded-[2.5rem] transform rotate-3 border border-red-100" />
              <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div key={heroImgIndex} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.8 }} className="absolute inset-0">
                    <img src={heroImages[heroImgIndex]} alt="Focus Action" className="w-full h-full object-cover grayscale brightness-90" />
                  </motion.div>
                </AnimatePresence>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12">
                  <Trophy size={64} className="text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]" />
                  <div className="font-black text-4xl uppercase italic tracking-tighter text-black">
                    Foco & <br /> <span className="text-zinc-500">Disciplina</span>
                  </div>
                  {/* Indicadores del carrusel */}
                  <div className="absolute bottom-10 flex gap-2">
                    {heroImages.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === heroImgIndex ? 'w-6 bg-black' : 'bg-black/20'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PROFESORES (CARRUSEL) */}
      <section id="profesores" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.5em] text-[10px] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Liderazgo
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-black">Nuestros Profesores</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 overflow-hidden py-10">
            {/* Profesor Principal (Fijo) */}
            <div className="w-[320px] shrink-0 text-center">
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Head Coach</span>
              <InstructorCard {...INSTRUCTORS_DATA[0]} />
            </div>
            
            {/* Resto de Profesores (Carrusel Infinito) */}
            <div className="relative flex overflow-hidden w-full pt-10 group/carousel" ref={carouselRef}>
              <motion.div 
                drag="x" 
                dragConstraints={constraints} 
                animate={!isMenuOpen ? { x: [0, constraints.left] } : {}} 
                transition={{ ease: "linear", duration: 80, repeat: Infinity, repeatType: "reverse" }} 
                className="flex gap-10 whitespace-nowrap cursor-grab active:cursor-grabbing"
              >
                {INSTRUCTORS_DATA.slice(1).map((prof, idx) => (
                  <div key={idx} className="w-[320px] shrink-0 whitespace-normal">
                    <InstructorCard {...prof} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PROGRAMAS */}
      <section id="programas" className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.5em] text-[10px] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                Entrenamiento
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-black">Nuestros Programas</h2>
            </div>
            <p className="text-zinc-600 text-lg lg:text-xl font-medium max-w-sm border-l-2 border-black/10 pl-8">
              Metodologías específicas para cada etapa de tu aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ModernProgramCard title="Adulto No-Gi" desc="Lucha sin kimono. Mejora velocidad y explosividad." price="Especializado" features={["Lucha Libre", "Submission", "Estrategia No-Gi"]} />
            <ModernProgramCard title="Plan Full" desc="Acceso ilimitado. La experiencia completa." price="Todos los Días" features={["BJJ Gi & No-Gi", "Wrestling & Judo", "Todas las Clases"]} highlight />
            <ModernProgramCard title="Focus Kids" desc="Disciplina y respeto para los más pequeños." price="4 a 12 años" features={["Anti-bullying", "Valores", "Motricidad"]} />
          </div>
        </div>
      </section>

      {/* SECCIÓN HORARIO (DISEÑO ELITE) */}
      <section id="horario" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.5em] text-[10px] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Planificación
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-black">Horario Elite</h2>
          </div>

          <div className="bg-white rounded-[3rem] p-4 sm:p-12 border-2 border-zinc-200 shadow-2xl relative overflow-hidden">
            {/* Horario para Computador (Grid) */}
            <div className="hidden xl:block">
              <div className="grid grid-cols-8 gap-4">
                <div className="p-4 flex items-end justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Bloque</span>
                </div>
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                  <div key={day} className="p-5 bg-zinc-100 rounded-2xl flex items-center justify-center border border-black/[0.03] hover:bg-black group transition-all duration-500">
                    <span className="text-[11px] font-black uppercase tracking-widest text-black group-hover:text-white italic">{day}</span>
                  </div>
                ))}
                
                {/* Filas de tiempo y clases */}
                {SCHEDULE_DATA.map((row: any, i) => (
                  <React.Fragment key={i}>
                    <div className="p-4 flex items-center justify-center bg-white rounded-2xl border border-black/5 shadow-sm">
                      <span className="text-[11px] font-black text-black italic">{row.time}</span>
                    </div>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((cell, j) => (
                      <div key={j} className="h-28">
                        <div className={getCellStyles(cell || "")}>
                          <span className="text-[10px] font-black leading-tight uppercase">{cell && cell !== "Cerrado" ? cell : ""}</span>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Horario para Móvil (Tarjetas Deslizables) */}
            <div className="xl:hidden">
              <div className="flex overflow-x-auto pb-8 gap-3 no-scrollbar snap-x">
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, idx) => (
                  <button key={day} onClick={() => document.getElementById(`day-card-${idx}`)?.scrollIntoView({ behavior: 'smooth', inline: 'start' })} className="flex-shrink-0 px-8 py-4 rounded-full bg-white border border-black/5 text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">
                    {day}
                  </button>
                ))}
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6">
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, dayIdx) => (
                  <div key={dayIdx} id={`day-card-${dayIdx}`} className="min-w-full snap-start">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-xl">
                      <h3 className="text-4xl font-black uppercase italic mb-10">{day}</h3>
                      <div className="space-y-6">
                        {SCHEDULE_DATA.map((row: any, i) => (
                          <div key={i} className="flex items-center gap-6">
                            <div className="w-20 text-[9px] font-black text-zinc-400 italic">{row.time}</div>
                            <div className="flex-grow">
                              <div className={getCellStyles(row[["mon", "tue", "wed", "thu", "fri", "sat", "sun"][dayIdx]] || "")}>
                                <span className="text-xs font-black uppercase italic">{row[["mon", "tue", "wed", "thu", "fri", "sat", "sun"][dayIdx]] || "Cerrado"}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Banner de contacto rápido */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-12 bg-zinc-100 rounded-[3rem] text-black border border-black/5">
            <h4 className="text-3xl font-black uppercase italic tracking-tighter text-black">¿Necesitas un horario personalizado?</h4>
            <a href="https://wa.me/56945908324" target="_blank" className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* SECCIÓN FILIALES (LOGOS EN MOVIMIENTO) */}
      <section id="filiales" className="py-32 bg-white overflow-hidden text-center">
        <span className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.5em] text-[10px] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          Red Focus
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-16 text-black">Filiales</h2>
        
        <div className="relative flex overflow-x-hidden">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 20, repeat: Infinity }} className="flex gap-12 whitespace-nowrap py-10">
            {[...AFFILIATES_DATA, ...AFFILIATES_DATA].map((aff, i) => (
              <a key={i} href={aff.url} target="_blank" className="group flex flex-col items-center justify-center min-w-[280px] h-[280px] bg-white rounded-[3rem] border border-zinc-100 hover:border-red-600/20 shadow-sm hover:shadow-2xl transition-all">
                <div className="w-full h-40 flex items-center justify-center p-6">
                  <img src={aff.image} alt={aff.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all" />
                </div>
                <span className="font-black uppercase text-xs tracking-widest text-zinc-900">{aff.name}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-black text-center mb-20">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <FaqItem 
              id={1} 
              isOpen={openFaq === 1} 
              toggle={() => setOpenFaq(openFaq === 1 ? null : 1)} 
              question="¿Necesito experiencia previa?" 
              answer="Absolutamente no. Tenemos clases diseñadas específicamente para principiantes donde aprenderás desde cero en un ambiente seguro y controlado." 
            />
            <FaqItem 
              id={2} 
              isOpen={openFaq === 2} 
              toggle={() => setOpenFaq(openFaq === 2 ? null : 2)} 
              question="¿Qué equipo necesito para empezar?" 
              answer="Para tu primera clase solo necesitas ropa deportiva cómoda. Una vez que decidas inscribirte, te guiaremos sobre el uso del Gi (kimono) o equipo de No-Gi." 
            />
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA (FOOTER) */}
      <footer id="contacto" className="bg-zinc-50 pt-32 pb-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
            {/* Info de la marca */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-10">
                <img src="/Logos/SixBlades.png" className="w-16 h-16 object-contain filter-focus-red" />
                <img src="/Logos/logo_focus.png" className="h-28 w-auto object-contain" />
              </div>
              <p className="text-zinc-500 text-xl">
                Formando guerreros dentro y fuera del tatami. La comunidad de Jiu-Jitsu más grande de Chile.
              </p>
            </div>

            {/* Datos de Contacto */}
            <div className="md:col-span-3">
              <h4 className="font-black uppercase tracking-widest text-xs mb-10">Contacto</h4>
              <ul className="space-y-6">
                <FooterContactItem icon={<MapPin size={20} className="text-red-600" />} text="Providencia, Santiago, Chile" />
                <FooterContactItem icon={<Phone size={20} className="text-red-600" />} text="+56 9 4590 8324" />
              </ul>
            </div>

            {/* Mapa de Ubicación */}
            <div className="md:col-span-4">
              <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.575651241463!2d-70.5880549!3d-33.434306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf0847984b01%3A0x63a6ceedf529922a!2sAv.%20Francisco%20Bilbao%202970!5e0!3m2!1sen!2scl!4v1776543989865" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                </iframe>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-black/5 text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} Focus Academy BJJ Chile. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// 4. SUB-COMPONENTES REUTILIZABLES
// ============================================================

/**
 * Tarjeta de Profesor
 */
function InstructorCard({ name, role, rank, specialty, image }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -10 }} className="relative group rounded-[2.5rem] overflow-hidden bg-black border border-white/5 shadow-lg transition-all h-full">
      <div className="aspect-[3/4] overflow-hidden">
        <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      </div>
      <div className="absolute bottom-0 p-6 w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-[9px] font-black uppercase mb-4 border border-white/10 shadow-xl">
          <div className={`w-2 h-2 rounded-full ${rank.toLowerCase().includes('purple') ? 'bg-purple-600' : rank.toLowerCase().includes('brown') ? 'bg-amber-900' : 'bg-red-600'}`} />
          {rank}
        </div>
        <h4 className="text-2xl font-black uppercase italic text-white leading-tight">{name}</h4>
        <div className="text-white/60 font-bold text-[10px] uppercase mb-4">{role}</div>
        <div className="h-0 group-hover:h-12 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <p className="text-[9px] uppercase font-black text-red-600/80 italic">{specialty}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Tarjeta de Programa (Ej: Adulto No-Gi, Kids)
 */
function ModernProgramCard({ title, desc, price, features, highlight = false }: any) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`relative p-12 rounded-[3rem] flex flex-col transition-all overflow-hidden h-full ${highlight ? 'bg-zinc-900 text-white shadow-2xl shadow-black/20' : 'bg-white border border-black/5 shadow-sm'}`}>
      {highlight && <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Popular</div>}
      <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-6 px-3 py-1 rounded-md border ${highlight ? 'bg-white/10 text-white' : 'bg-red-50 text-red-600 border-red-100'}`}>{price}</div>
      <h4 className="text-3xl font-black uppercase italic mb-6">{title}</h4>
      <p className="mb-10 text-sm opacity-70">{desc}</p>
      <ul className="space-y-5 mb-12 flex-grow">
        {features.map((f: any, i: any) => (
          <li key={i} className="flex items-center gap-4 text-sm font-bold">
            <CheckCircle2 size={18} className={highlight ? 'text-white' : 'text-red-600'} />
            <span className="opacity-80">{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] ${highlight ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
        Más Información
      </button>
    </motion.div>
  );
}

/**
 * Elemento Individual del FAQ (Preguntas Frecuentes)
 */
function FaqItem({ isOpen, toggle, question, answer }: any) {
  return (
    <div className="border-b border-black/5 pb-4">
      <button onClick={toggle} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-xl font-bold uppercase tracking-tight group-hover:text-red-600 transition-colors">{question}</span>
        {isOpen ? <Minus size={24} className="text-red-600" /> : <Plus size={24} />}
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
        <p className="text-zinc-500 font-medium leading-relaxed pr-12">{answer}</p>
      </motion.div>
    </div>
  );
}

/**
 * Elemento de contacto en el Footer
 */
function FooterContactItem({ icon, text }: any) {
  return (
    <li className="flex items-start gap-5 group">
      <div className="transition-transform group-hover:scale-110">{icon}</div>
      <span className="text-zinc-600 font-medium group-hover:text-black transition-colors">{text}</span>
    </li>
  );
}
