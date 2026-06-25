import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useInView } from "framer-motion";
import { 
  Menu, X, ChevronUp, MapPin, Phone, Mail, 
  Settings, Zap, Shield, Factory, CheckCircle2, 
  Target, Lightbulb, Wrench, Thermometer, Hammer, 
  HardHat, Wind, Power, PenTool, FileText, Beaker,
  AlertTriangle, ArrowRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const logoSrc = "/logo-sgi.png";
const queryClient = new QueryClient();

// Number Counter Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return { count, nodeRef };
}

// Fade in component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`mb-12 ${className}`}>
    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">{children}</h2>
    <div className="h-1.5 w-32 bg-red-500 rounded-full mx-auto md:mx-0"></div>
  </div>
);

const GlassCard = ({ children, className = "", hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <div className={`bg-slate-900/55 backdrop-blur-md border border-red-900/20 rounded-2xl p-6 md:p-8 
    ${hover ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-500/30' : ''} ${className}`}>
    {children}
  </div>
);

const contactSchema = z.object({
  name: z.string().min(2, "Requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().optional(),
  service: z.string().min(1, "Seleccione un servicio"),
  message: z.string().min(10, "Mensaje muy corto")
});

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "", email: "", phone: "", service: "", message: ""
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    const text = `*NUEVA SOLICITUD SGI*\n\n👤 Nombre: ${data.name}\n📧 Correo: ${data.email}\n📱 Teléfono: ${data.phone || 'N/A'}\n🛠 Servicio: ${data.service}\n\n📝 Descripción:\n${data.message}`;
    const url = `https://wa.me/526313185564?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setFormSuccess(true);
    form.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  const { count: expCount, nodeRef: expRef } = useCounter(10);
  const { count: proyCount, nodeRef: proyRef } = useCounter(300);
  const { count: satCount, nodeRef: satRef } = useCounter(98);
  const { count: respCount, nodeRef: respRef } = useCounter(24);

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-red-500/30 overflow-x-hidden">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-red-900/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('inicio')}>
            <div className="bg-white/95 rounded-xl px-4 py-2">
              <img src={logoSrc} alt="SGI Logo" className="h-14 w-auto" />
            </div>
          </div>
          <div className="hidden lg:flex gap-8 items-center font-medium text-sm tracking-wide">
            {['Inicio', 'Nosotros', 'Servicios', 'Moldeo', 'Proyectos', 'Contacto'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-red-400 transition-colors uppercase tracking-widest">{item}</button>
            ))}
            <button onClick={() => scrollTo('contacto')} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all uppercase text-xs tracking-wider">
              Cotizar
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 lg:hidden">
          {['Inicio', 'Nosotros', 'Servicios', 'Moldeo', 'Proyectos', 'Contacto'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-2xl font-bold text-white text-left uppercase">{item}</button>
          ))}
        </div>
      )}

      {/* 2. Hero */}
      <section id="inicio" className="relative min-h-[100dvh] flex items-center pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        
        <div className="container relative mx-auto px-6 lg:px-12 z-10">
          <FadeIn className="max-w-4xl">
            <span className="inline-block py-1 px-3 border border-red-500/50 bg-red-500/10 rounded-full text-red-400 font-bold tracking-widest text-xs mb-6 backdrop-blur-sm">
              SERVICIOS GENERALES DE INGENIERÍA
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 uppercase">
              Soluciones <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-300 to-red-600">
                Industriales
              </span> <br />
              De Alto Nivel
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl font-light">
              Mantenimiento especializado, moldeo por inyección, HVAC y obra civil para operaciones que no se detienen. 24/7 en Nogales, Sonora.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('contacto')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-transform hover:scale-105">
                Solicitar Cotización <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('servicios')} className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-colors backdrop-blur-sm">
                Nuestros Servicios
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Industry Strip */}
      <section className="relative z-20 -mt-16 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Manufactura", icon: <Factory className="w-6 h-6 text-red-500 mb-3" /> },
            { name: "Mantenimiento", icon: <Wrench className="w-6 h-6 text-red-500 mb-3" /> },
            { name: "Instalaciones", icon: <Zap className="w-6 h-6 text-red-500 mb-3" /> },
            { name: "Seguridad", icon: <Shield className="w-6 h-6 text-red-500 mb-3" /> },
          ].map((item, i) => (
            <GlassCard key={i} className="text-center p-6 bg-slate-900/80" hover={false}>
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="font-bold text-white uppercase text-sm">{item.name}</h3>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. Quienes Somos */}
      <section id="nosotros" className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionTitle>¿Quiénes Somos?</SectionTitle>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Fundada en 2021, SGI nace para dar soporte integral a la industria maquiladora en la frontera de Nogales. Nuestro enfoque es directo: resolver problemas complejos con ingeniería precisa para garantizar la continuidad operativa de su planta.
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              No somos solo proveedores, somos aliados estratégicos en el piso de producción. Entendemos el costo del downtime y respondemos con la urgencia, capacidad técnica y profesionalismo que la industria pesada exige.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="text-center">
                <div className="text-4xl font-black text-white mb-2">2021</div>
                <div className="text-sm text-red-400 font-bold uppercase">Inicio de operaciones</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-sm text-red-400 font-bold uppercase">Soporte industrial</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-4xl font-black text-white mb-2">100%</div>
                <div className="text-sm text-red-400 font-bold uppercase">Compromiso</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-4xl font-black text-white mb-2">SGI</div>
                <div className="text-sm text-red-400 font-bold uppercase">Engineering Integral</div>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Nuestra Filosofia */}
      <section className="py-12 container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <GlassCard className="h-full">
              <Target className="w-10 h-10 text-red-500 mb-6" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase">Misión</h3>
              <p className="text-slate-300 leading-relaxed">
                Proveer servicios integrales de ingeniería y mantenimiento con los más altos estándares de calidad, seguridad y eficiencia, garantizando la continuidad operativa y el crecimiento de nuestros clientes en el sector industrial.
              </p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlassCard className="h-full">
              <Lightbulb className="w-10 h-10 text-red-500 mb-6" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase">Visión</h3>
              <p className="text-slate-300 leading-relaxed">
                Consolidarnos como el referente principal en soluciones industriales en la región, reconocidos por nuestra innovación tecnológica, capacidad de respuesta y confiabilidad técnica inquebrantable en cada proyecto ejecutado.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* 6. Stats Counters */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/10" />
        <div className="container relative mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">Resultados que generan Confianza</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" ref={expRef}>
              <div className="text-5xl md:text-7xl font-black text-white mb-2">{countTo(expCount)}+</div>
              <div className="text-red-400 font-bold uppercase tracking-wide text-sm">Años Experiencia</div>
            </div>
            <div className="text-center" ref={proyRef}>
              <div className="text-5xl md:text-7xl font-black text-white mb-2">{countTo(proyCount)}+</div>
              <div className="text-red-400 font-bold uppercase tracking-wide text-sm">Proyectos</div>
            </div>
            <div className="text-center" ref={satRef}>
              <div className="text-5xl md:text-7xl font-black text-white mb-2">{countTo(satCount)}%</div>
              <div className="text-red-400 font-bold uppercase tracking-wide text-sm">Satisfacción</div>
            </div>
            <div className="text-center" ref={respRef}>
              <div className="text-5xl md:text-7xl font-black text-white mb-2">{countTo(respCount)}h</div>
              <div className="text-red-400 font-bold uppercase tracking-wide text-sm">Respuesta</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Experiencia Tecnica */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <FadeIn>
          <SectionTitle className="text-center md:text-left">Experiencia Técnica</SectionTitle>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Moldeo por Inyección", desc: "Mantenimiento, instalación y soporte a maquinaria de inyección." },
            { title: "Scrubbers", desc: "Operación, mantenimiento y optimización de sistemas ambientales." },
            { title: "Manejo de Químicos", desc: "Procedimientos industriales bajo prácticas seguras." },
            { title: "Espacios Confinados", desc: "Intervenciones seguras bajo estrictos protocolos industriales." },
            { title: "Equipos Auxiliares", desc: "Diagnóstico y mantenimiento especializado." },
            { title: "Automatización", desc: "Sensores, control industrial y sistemas de producción." }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GlassCard className="h-full border-l-4 border-l-red-500">
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 8. Especialistas en Moldeo */}
      <section id="inyeccion" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 translate-x-4 translate-y-4 rounded-3xl" />
                <img 
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Moldeo por Inyección" 
                  className="relative z-10 rounded-3xl border border-red-500/30 w-full object-cover aspect-[4/3] shadow-2xl"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <SectionTitle>Especialistas en Moldeo por Inyección</SectionTitle>
              <p className="text-lg text-slate-300 mb-8">
                Dominamos la tecnología detrás de las inyectoras más robustas de la industria. Reducimos el downtime y maximizamos la vida útil de su maquinaria.
              </p>
              <div className="space-y-4">
                <GlassCard hover={false} className="p-5">
                  <h4 className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Mantenimiento Preventivo</h4>
                  <p className="text-sm text-slate-400 pl-7">Programas de inspección y conservación para reducir paros no programados.</p>
                </GlassCard>
                <GlassCard hover={false} className="p-5">
                  <h4 className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Mantenimiento Correctivo</h4>
                  <p className="text-sm text-slate-400 pl-7">Diagnóstico y reparación especializada para restaurar la operación inmediata.</p>
                </GlassCard>
                <GlassCard hover={false} className="p-5">
                  <h4 className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Optimización de Procesos</h4>
                  <p className="text-sm text-slate-400 pl-7">Mejora de desempeño, eficiencia y confiabilidad del equipo.</p>
                </GlassCard>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 9. Marcas y Tecnologias */}
      <section className="py-20 container mx-auto px-6 lg:px-12">
        <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Marcas y Tecnologías Relacionadas</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "ENGEL", color: "hover:text-orange-500 hover:border-orange-500/50" },
            { name: "ARBURG", color: "hover:text-yellow-500 hover:border-yellow-500/50" },
            { name: "HUSKY", color: "hover:text-blue-500 hover:border-blue-500/50" },
            { name: "KEYENCE", color: "hover:text-sky-400 hover:border-sky-400/50" },
            { name: "BALLUFF", color: "hover:text-cyan-400 hover:border-cyan-400/50" },
            { name: "EATON", color: "hover:text-indigo-400 hover:border-indigo-400/50" },
            { name: "3M", color: "hover:text-red-500 hover:border-red-500/50" },
            { name: "MILWAUKEE", color: "hover:text-red-600 hover:border-red-600/50" },
            { name: "MAKITA", color: "hover:text-teal-400 hover:border-teal-400/50" },
            { name: "HILTI", color: "hover:text-red-600 hover:border-red-600/50" }
          ].map((brand, i) => (
            <div key={i} className={`bg-slate-900/60 border border-slate-700 rounded-lg px-6 py-3 font-black text-xl text-slate-500 transition-all duration-300 cursor-default ${brand.color}`}>
              {brand.name}
            </div>
          ))}
        </div>
      </section>

      {/* 10 & 11. Ingenieria / Suministros */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Ingenieria y Desarrollo */}
            <div>
              <SectionTitle>Ingeniería y Desarrollo</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-5 text-center">
                  <PenTool className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-white uppercase mb-1">Diseño</h4>
                </GlassCard>
                <GlassCard className="p-5 text-center">
                  <FileText className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-white uppercase mb-1">Propuesta</h4>
                </GlassCard>
                <GlassCard className="p-5 text-center">
                  <Beaker className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-white uppercase mb-1">Prototipos</h4>
                </GlassCard>
                <GlassCard className="p-5 text-center">
                  <CheckCircle2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-white uppercase mb-1">Pruebas</h4>
                </GlassCard>
              </div>
            </div>

            {/* Suministros */}
            <div>
              <SectionTitle>Suministros Industriales</SectionTitle>
              <div className="space-y-4">
                <GlassCard className="flex items-center gap-6 p-5">
                  <div className="bg-red-500/10 p-4 rounded-xl"><Wrench className="w-6 h-6 text-red-500" /></div>
                  <div>
                    <h4 className="font-bold text-white uppercase mb-1">Herramientas</h4>
                    <p className="text-sm text-slate-400">Equipo especializado para operación</p>
                  </div>
                </GlassCard>
                <GlassCard className="flex items-center gap-6 p-5">
                  <div className="bg-red-500/10 p-4 rounded-xl"><Settings className="w-6 h-6 text-red-500" /></div>
                  <div>
                    <h4 className="font-bold text-white uppercase mb-1">Refacciones</h4>
                    <p className="text-sm text-slate-400">Componentes originales para maquinaria</p>
                  </div>
                </GlassCard>
                <GlassCard className="flex items-center gap-6 p-5">
                  <div className="bg-red-500/10 p-4 rounded-xl"><Factory className="w-6 h-6 text-red-500" /></div>
                  <div>
                    <h4 className="font-bold text-white uppercase mb-1">Consumibles</h4>
                    <p className="text-sm text-slate-400">Materiales para uso diario en planta</p>
                  </div>
                </GlassCard>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. Nuestros Servicios */}
      <section id="servicios" className="py-24 container mx-auto px-6 lg:px-12">
        <SectionTitle className="text-center mx-auto flex flex-col items-center">Nuestros Servicios Principales</SectionTitle>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {[
            { icon: <Settings />, title: "Mantenimiento Industrial", desc: "Preventivo, correctivo y predictivo." },
            { icon: <Wind />, title: "HVAC", desc: "Instalación y mantenimiento de climatización industrial." },
            { icon: <Hammer />, title: "Herrería Industrial", desc: "Fabricación y reparación de estructuras metálicas." },
            { icon: <HardHat />, title: "Obra Civil", desc: "Construcción, remodelación y mantenimiento de naves." },
            { icon: <Thermometer />, title: "Scrubbers", desc: "Mantenimiento y optimización de sistemas ambientales." },
            { icon: <Power />, title: "Instalaciones", desc: "Sistemas eléctricos, mecánicos y servicios generales." }
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GlassCard className="h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  {React.cloneElement(s.icon as React.ReactElement, { className: "w-24 h-24 text-red-500" })}
                </div>
                <div className="relative z-10">
                  <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg shadow-red-500/30">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-3">{s.title}</h3>
                  <p className="text-slate-400">{s.desc}</p>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 13. Nuestro Proceso */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle className="text-center mx-auto flex flex-col items-center">Nuestro Proceso Operativo</SectionTitle>
          <div className="grid md:grid-cols-4 gap-8 mt-16 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-800" />
            {[
              { num: "1", title: "Diagnóstico", desc: "Evaluación técnica y análisis." },
              { num: "2", title: "Planeación", desc: "Estrategia y cronograma." },
              { num: "3", title: "Implementación", desc: "Ejecución bajo estándares." },
              { num: "4", title: "Validación", desc: "Pruebas y liberación final." }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-red-500 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  {p.num}
                </div>
                <h4 className="text-white font-bold uppercase mb-2">{p.title}</h4>
                <p className="text-slate-400 text-sm">{p.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Seguridad */}
      <section className="py-20 container mx-auto px-6 lg:px-12">
        <div className="bg-red-900/10 border border-red-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <AlertTriangle className="absolute -bottom-10 -right-10 w-64 h-64 text-red-500/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-10 text-center">Comprometidos con la Seguridad</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Seguridad Industrial', 'Cumplimiento NOM', 'Control de Riesgos', 'Calidad Operativa'].map((s, i) => (
                <div key={i} className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 text-center font-bold text-white">
                  <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 16 & 17. Proyectos y Galeria */}
      <section id="proyectos" className="py-24 bg-black/30">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle>Proyectos Destacados</SectionTitle>
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {[
              { title: "Mantenimiento Industrial", desc: "Optimización y recuperación de equipos.", img: "https://images.unsplash.com/photo-1581092918484-8313b6db8e8c?auto=format&fit=crop&w=1000&q=80" },
              { title: "Obra Civil", desc: "Infraestructura y mejoras operativas.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80" },
              { title: "Moldeo por Inyección", desc: "Servicio especializado para maquinaria.", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1000&q=80" }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group rounded-2xl overflow-hidden relative cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">{p.title}</h3>
                    <p className="text-red-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100 transform translate-y-4 group-hover:translate-y-0">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <h3 className="text-2xl font-black text-white uppercase mb-8">Galería de Trabajos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1581092918484-8313b6db8e8c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=900&q=80"
            ].map((img, i) => (
              <img key={i} src={img} alt="Galeria" className="w-full aspect-square object-cover rounded-3xl border border-transparent hover:border-red-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* 18. Opiniones */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <SectionTitle className="text-center mx-auto flex flex-col items-center">Opiniones de Clientes</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { text: "Excelente capacidad técnica y rápida respuesta operativa.", author: "Supervisor de Producción" },
            { text: "Gran apoyo en mantenimiento especializado y mejora de procesos.", author: "Gerencia Industrial" },
            { text: "Profesionalismo, calidad y cumplimiento de objetivos.", author: "Jefe de Planta" }
          ].map((o, i) => (
             <FadeIn key={i} delay={i * 0.1}>
               <GlassCard className="h-full">
                 <div className="text-yellow-500 tracking-widest text-lg mb-4">★★★★★</div>
                 <p className="text-white font-medium text-lg italic mb-6">"{o.text}"</p>
                 <p className="text-red-400 font-bold text-sm uppercase">— {o.author}</p>
               </GlassCard>
             </FadeIn>
          ))}
        </div>
      </section>

      {/* 19. CTA Banner */}
      <section className="bg-black border-y border-red-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">¿Necesitas apoyo para tu operación industrial?</h2>
          <p className="text-red-400 font-bold tracking-widest uppercase mb-8">Soluciones inmediatas 24/7</p>
          <button onClick={() => scrollTo('contacto')} className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-black text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            Solicitar Cotización
          </button>
        </div>
      </section>

      {/* 20. Contacto */}
      <section id="contacto" className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <FadeIn>
            <SectionTitle>Contacto SGI</SectionTitle>
            <GlassCard className="mb-8">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white font-bold uppercase mb-1">Ubicación</h5>
                    <p className="text-slate-400">Lago Azul #45, Jardín de la Montaña<br/>Nogales, Sonora, México</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white font-bold uppercase mb-1">Teléfono (24/7)</h5>
                    <p className="text-slate-400">631 318 5564</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white font-bold uppercase mb-1">Correo Electrónico</h5>
                    <p className="text-slate-400">sginogales@gmail.com</p>
                  </div>
                </li>
              </ul>
            </GlassCard>
            <div className="h-64 rounded-2xl overflow-hidden border border-slate-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111287.0506316104!2d-111.00287135!3d31.30861615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86d6ade33f86eb83%3A0xc6ba221141ba59ec!2sNogales%2C%20Son.!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <GlassCard className="mt-8 lg:mt-24 border-t-4 border-t-red-500">
              <h3 className="text-2xl font-black text-white uppercase mb-6">Solicita tu Cotización</h3>
              
              {formSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6 font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5" /> Solicitud preparada. Abriendo WhatsApp...
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Nombre o Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Maquiladora SA" className="bg-slate-900 border-slate-700 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="correo@empresa.com" className="bg-slate-900 border-slate-700 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Teléfono (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="631..." className="bg-slate-900 border-slate-700 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Tipo de Servicio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                            <SelectValue placeholder="Seleccione un servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                          <SelectItem value="Mantenimiento Industrial">Mantenimiento Industrial</SelectItem>
                          <SelectItem value="Moldeo por Inyección">Moldeo por Inyección</SelectItem>
                          <SelectItem value="HVAC">HVAC</SelectItem>
                          <SelectItem value="Herrería Industrial">Herrería Industrial</SelectItem>
                          <SelectItem value="Obra Civil">Obra Civil</SelectItem>
                          <SelectItem value="Scrubbers">Scrubbers</SelectItem>
                          <SelectItem value="Instalaciones Industriales">Instalaciones Industriales</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describa el requerimiento o problema..." className="bg-slate-900 border-slate-700 text-white min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 uppercase tracking-widest mt-4">
                    Enviar vía WhatsApp
                  </Button>
                </form>
              </Form>
            </GlassCard>
          </FadeIn>
          
        </div>
      </section>

      {/* 21. Footer */}
      <footer className="bg-slate-950 border-t-2 border-t-red-600 pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src={logoSrc} alt="SGI Logo" className="h-16 w-auto mb-6" />
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Servicios Generales de Ingeniería. Especialistas en proveer soluciones técnicas robustas para la industria manufacturera en Nogales, Sonora.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Navegación</h4>
              <ul className="space-y-3">
                {['Inicio', 'Nosotros', 'Servicios', 'Proyectos', 'Contacto'].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item.toLowerCase())} className="text-slate-400 hover:text-red-400 text-sm transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Información</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>Nogales, Sonora, México</li>
                <li>Tel: 631 318 5564</li>
                <li>Email: sginogales@gmail.com</li>
                <li>Atención 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center md:text-left md:flex justify-between items-center">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Servicios Generales de Ingeniería (SGI). Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a 
        href="https://wa.me/526313185564" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 z-50 transition-transform hover:scale-110"
      >
        <Phone className="w-7 h-7" />
      </a>
      
      {showScrollTop && (
        <button 
          onClick={() => scrollTo('inicio')}
          className="fixed bottom-24 right-6 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 z-50 transition-all hover:-translate-y-1"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

    </div>
  );
}

// Ensure count string is printed fully
function countTo(val: number) {
  return val.toString();
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
