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
  AlertTriangle, ArrowRight, Star, Navigation, Copy, Check
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
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);
  return { count, nodeRef };
}

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "down";
}) => {
  const variants = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">
    {children}
  </span>
);

const SectionTitle = ({ children, light = false, center = false }: {
  children: React.ReactNode; light?: boolean; center?: boolean;
}) => (
  <motion.div
    className={`mb-10 ${center ? "text-center" : ""}`}
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
  >
    <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 ${light ? "text-white" : "text-gray-900"}`}>
      {children}
    </h2>
    <motion.div
      className={`h-1 w-14 bg-red-600 rounded-full ${center ? "mx-auto" : ""}`}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.2 }}
    />
  </motion.div>
);

const Card = ({ children, className = "", hover = true }: {
  children: React.ReactNode; className?: string; hover?: boolean;
}) => (
  <motion.div
    className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
    whileHover={hover ? { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

const contactSchema = z.object({
  name: z.string().min(2, "Requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().optional(),
  service: z.string().min(1, "Seleccione un servicio"),
  message: z.string().min(10, "Mensaje muy corto"),
});

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    const text = `*NUEVA SOLICITUD SGI*\n\n👤 Nombre: ${data.name}\n📧 Correo: ${data.email}\n📱 Teléfono: ${data.phone || "N/A"}\n🛠 Servicio: ${data.service}\n\n📝 Descripción:\n${data.message}`;
    window.open(`https://wa.me/526313185564?text=${encodeURIComponent(text)}`, "_blank");
    setFormSuccess(true);
    form.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  const { count: expCount, nodeRef: expRef } = useCounter(10);
  const { count: proyCount, nodeRef: proyRef } = useCounter(300);
  const { count: satCount, nodeRef: satRef } = useCounter(98);
  const { count: respCount, nodeRef: respRef } = useCounter(2);
  const [addressCopied, setAddressCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SGI_ADDRESS = "Lago Azul #45, Jardín de la Montaña, Nogales, Sonora, México";
  const GOOGLE_MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=31.3236,-110.9340";
  const WAZE_URL = "https://waze.com/ul?ll=31.3236,-110.9340&navigate=yes";
  const APPLE_MAPS_URL = "https://maps.apple.com/?daddr=31.3236,-110.9340";

  const copyAddress = () => {
    navigator.clipboard.writeText(SGI_ADDRESS).then(() => {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    });
  };

  const navLinks = ["Inicio", "Nosotros", "Servicios", "Moldeo", "Proyectos", "Contacto"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 py-3"
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button onClick={() => scrollTo("inicio")} className="flex items-center">
            <div className={`rounded-xl px-3 py-1.5 transition-colors ${isScrolled ? "bg-gray-100" : "bg-white/90"}`}>
              <img src={logoSrc} alt="SGI Logo" className="h-12 w-auto" />
            </div>
          </button>
          <div className="hidden lg:flex gap-8 items-center text-sm font-semibold">
            {navLinks.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`transition-colors uppercase tracking-widest text-xs ${
                  isScrolled ? "text-gray-600 hover:text-red-600" : "text-white hover:text-red-300"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacto")}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold transition-colors text-xs tracking-wider"
            >
              Cotizar
            </button>
          </div>
          <button
            className={`lg:hidden ${isScrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-8 flex flex-col gap-6 lg:hidden shadow-xl">
          {navLinks.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xl font-bold text-gray-900 text-left uppercase tracking-widest border-b border-gray-100 pb-4 hover:text-red-600 transition-colors"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contacto")}
            className="bg-red-600 text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-2"
          >
            Cotizar ahora
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="inicio" className="relative min-h-[100dvh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/92 via-gray-900/65 to-gray-900/80" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative mx-auto px-6 lg:px-12 z-10 pt-24">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-red-400/40 bg-red-600/10 rounded-full text-red-300 font-bold tracking-widest text-xs mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              NOGALES, SONORA · MÉXICO
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5 uppercase">
              Soluciones <br />
              <span className="text-red-500">Industriales</span><br />
              de Alto Nivel
            </h1>
            <p className="text-base md:text-xl text-gray-300 mb-8 max-w-xl font-light leading-relaxed">
              Mantenimiento especializado, moldeo por inyección, HVAC y obra civil para operaciones que no se detienen. Disponibles 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollTo("contacto")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-red-600/30 w-full sm:w-auto"
              >
                Solicitar Cotización <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("servicios")}
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-colors w-full sm:w-auto text-center"
              >
                Nuestros Servicios
              </button>
            </div>
          </FadeIn>
        </div>
        {/* Hero bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ── QUICK ICONS STRIP ── */}
      <section className="relative z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { name: "Manufactura",   icon: <Factory className="w-7 h-7" />, color: "text-orange-500", bg: "bg-orange-50 group-hover:bg-orange-100" },
              { name: "Mantenimiento", icon: <Wrench  className="w-7 h-7" />, color: "text-blue-600",   bg: "bg-blue-50   group-hover:bg-blue-100"   },
              { name: "Instalaciones", icon: <Zap     className="w-7 h-7" />, color: "text-amber-500", bg: "bg-amber-50  group-hover:bg-amber-100"  },
              { name: "Seguridad",     icon: <Shield  className="w-7 h-7" />, color: "text-emerald-600",bg: "bg-emerald-50 group-hover:bg-emerald-100"},
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-6 px-8 group cursor-default">
                <div className={`${item.bg} p-3 rounded-xl transition-colors`}>
                  {React.cloneElement(item.icon as React.ReactElement, { className: `w-7 h-7 ${item.color}` })}
                </div>
                <span className="font-bold text-gray-800 uppercase text-sm tracking-wide">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <SectionLabel>Nuestra empresa</SectionLabel>
              <SectionTitle>¿Quiénes Somos?</SectionTitle>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Fundada en 2021, SGI nace para dar soporte integral a la industria maquiladora en la frontera de Nogales. Nuestro enfoque es directo: resolver problemas complejos con ingeniería precisa para garantizar la continuidad operativa de su planta.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                No somos solo proveedores, somos aliados estratégicos en el piso de producción. Entendemos el costo del downtime y respondemos con la urgencia, capacidad técnica y profesionalismo que la industria pesada exige.
              </p>
              <button
                onClick={() => scrollTo("contacto")}
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                Hablar con un especialista <ArrowRight className="w-4 h-4" />
              </button>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "2021", label: "Inicio de operaciones" },
                  { val: "24/7", label: "Soporte disponible" },
                  { val: "100%", label: "Compromiso" },
                  { val: "SGI", label: "Ingeniería Integral" },
                ].map((s, i) => (
                  <Card key={i} className="p-8 text-center" hover={false}>
                    <div className="text-4xl font-black text-gray-900 mb-2">{s.val}</div>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-wide">{s.label}</div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <Card className="p-8 h-full border-t-4 border-t-blue-600">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Proveer servicios integrales de ingeniería y mantenimiento con los más altos estándares de calidad, seguridad y eficiencia, garantizando la continuidad operativa y el crecimiento de nuestros clientes en el sector industrial.
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <Card className="p-8 h-full border-t-4 border-t-amber-500">
                <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">Visión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consolidarnos como el referente principal en soluciones industriales en la región, reconocidos por nuestra innovación tecnológica, capacidad de respuesta y confiabilidad técnica inquebrantable en cada proyecto ejecutado.
                </p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTERS ── */}
      <section className="py-20 bg-gray-900 overflow-hidden relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <SectionLabel>Números que nos respaldan</SectionLabel>
            <h2 className="text-3xl font-black text-white uppercase">Experiencia Comprobada</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Años */}
            <FadeIn delay={0}>
              <div ref={expRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-500/25 transition-colors">
                  <Target className="w-7 h-7 text-blue-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{expCount}<span className="text-blue-400">+</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Años Experiencia</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Proyectos */}
            <FadeIn delay={0.1}>
              <div ref={proyRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-500/25 transition-colors">
                  <HardHat className="w-7 h-7 text-orange-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{proyCount}<span className="text-orange-400">+</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Proyectos</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Satisfacción */}
            <FadeIn delay={0.2}>
              <div ref={satRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/25 transition-colors">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{satCount}<span className="text-emerald-400">%</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Satisfacción</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Respuesta */}
            <FadeIn delay={0.3}>
              <div ref={respRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-500/25 transition-colors">
                  <Zap className="w-7 h-7 text-purple-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{respCount}<span className="text-purple-400">h</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Tiempo de Respuesta</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── NUESTROS SERVICIOS ── */}
      <section id="servicios" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <SectionLabel>Lo que hacemos</SectionLabel>
          </div>
          <SectionTitle center>Nuestros Servicios Principales</SectionTitle>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
            {[
              { icon: <Settings />, title: "Mantenimiento Industrial", desc: "Preventivo, correctivo y predictivo. Reducimos paros no programados y optimizamos el desempeño de equipos.",   color: "text-blue-600",    bg: "bg-blue-50    group-hover:bg-blue-100",    border: "group-hover:border-blue-200"    },
              { icon: <Wind />,     title: "HVAC",                   desc: "Diseño, instalación y mantenimiento de sistemas de climatización industrial de alta capacidad.",                   color: "text-cyan-600",    bg: "bg-cyan-50    group-hover:bg-cyan-100",    border: "group-hover:border-cyan-200"    },
              { icon: <Hammer />,   title: "Herrería Industrial",    desc: "Fabricación y reparación de estructuras metálicas, soportes, plataformas y más.",                                 color: "text-orange-600",  bg: "bg-orange-50  group-hover:bg-orange-100",  border: "group-hover:border-orange-200"  },
              { icon: <HardHat />,  title: "Obra Civil",             desc: "Construcción, remodelación y mantenimiento de naves industriales y oficinas.",                                    color: "text-amber-600",   bg: "bg-amber-50   group-hover:bg-amber-100",   border: "group-hover:border-amber-200"   },
              { icon: <Thermometer />, title: "Scrubbers",           desc: "Mantenimiento y optimización de sistemas ambientales y de tratamiento de gases.",                                color: "text-emerald-600", bg: "bg-emerald-50 group-hover:bg-emerald-100", border: "group-hover:border-emerald-200" },
              { icon: <Power />,    title: "Instalaciones",          desc: "Sistemas eléctricos, mecánicos, hidráulicos y servicios generales de planta.",                                   color: "text-purple-600",  bg: "bg-purple-50  group-hover:bg-purple-100",  border: "group-hover:border-purple-200"  },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Card className={`p-8 h-full group transition-all ${s.border}`}>
                  <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors`}>
                    {React.cloneElement(s.icon as React.ReactElement, { className: `w-6 h-6 ${s.color}` })}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESPECIALISTAS EN MOLDEO ── */}
      <section id="moldeo" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/10 translate-x-3 translate-y-3 rounded-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80"
                  alt="Moldeo por Inyección"
                  className="relative z-10 rounded-2xl border border-gray-200 w-full object-cover aspect-[4/3] shadow-lg"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <SectionLabel>Especialidad</SectionLabel>
              <SectionTitle>Especialistas en Moldeo por Inyección</SectionTitle>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Dominamos la tecnología detrás de las inyectoras más robustas de la industria. Reducimos el downtime y maximizamos la vida útil de su maquinaria.
              </p>
              <div className="space-y-3">
                {[
                  { title: "Mantenimiento Preventivo", desc: "Programas de inspección y conservación para reducir paros no programados." },
                  { title: "Mantenimiento Correctivo", desc: "Diagnóstico y reparación especializada para restaurar la operación inmediata." },
                  { title: "Optimización de Procesos", desc: "Mejora de desempeño, eficiencia y confiabilidad del equipo." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MARCAS DE EQUIPOS ── */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <SectionLabel>Equipos que manejamos</SectionLabel>
            <h3 className="text-2xl font-black text-gray-900 uppercase">Marcas y Tecnologías</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "ENGEL",     color: "#ff6600", bg: "#fff4ee" },
              { name: "ARBURG",    color: "#c8a000", bg: "#fffbee" },
              { name: "HUSKY",     color: "#005bac", bg: "#eef4ff" },
              { name: "KEYENCE",   color: "#c00000", bg: "#fff0f0" },
              { name: "EATON",     color: "#006db7", bg: "#eef5ff" },
              { name: "3M",        color: "#e31837", bg: "#fff0f2" },
              { name: "HILTI",     color: "#e20020", bg: "#fff0f2" },
              { name: "MAKITA",    color: "#007dbf", bg: "#eef6ff" },
              { name: "MILWAUKEE", color: "#c00000", bg: "#fff0f0" },
              { name: "BALLUFF",   color: "#00468b", bg: "#eef3ff" },
            ].map((brand, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className="border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-red-200 transition-all cursor-default group min-h-[90px]"
                  style={{ backgroundColor: "#fff" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = brand.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#fff"; }}
                >
                  <span
                    className="font-black text-lg tracking-tight transition-colors"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = brand.color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "#9ca3af"; }}
                  >
                    {brand.name}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Equipo</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTES / EMPRESAS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <SectionLabel>Empresas que confían en nosotros</SectionLabel>
            <h3 className="text-2xl font-black text-gray-900 uppercase">Clientes y Sectores</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Maquiladoras", icon: <Factory     className="w-8 h-8" />, desc: "Plantas de manufactura",    color: "text-blue-600",    bg: "bg-blue-50"    },
              { name: "Automotriz",   icon: <Settings    className="w-8 h-8" />, desc: "Tier 1 y Tier 2",           color: "text-orange-500",  bg: "bg-orange-50"  },
              { name: "Electrónica",  icon: <Zap         className="w-8 h-8" />, desc: "Ensamble y producción",     color: "text-amber-500",   bg: "bg-amber-50"   },
              { name: "Plásticos",    icon: <Beaker      className="w-8 h-8" />, desc: "Moldeo e inyección",        color: "text-purple-600",  bg: "bg-purple-50"  },
              { name: "Construcción", icon: <HardHat     className="w-8 h-8" />, desc: "Obra civil y remodelación", color: "text-amber-700",   bg: "bg-amber-50"   },
              { name: "Alimentos",    icon: <CheckCircle2 className="w-8 h-8" />,desc: "Procesamiento y empaque",   color: "text-emerald-600", bg: "bg-emerald-50" },
              { name: "Logística",    icon: <ArrowRight  className="w-8 h-8" />, desc: "Almacenes y distribución",  color: "text-cyan-600",    bg: "bg-cyan-50"    },
              { name: "Hospitalario", icon: <Shield      className="w-8 h-8" />, desc: "Equipos médicos",           color: "text-red-600",     bg: "bg-red-50"     },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Card className="p-6 text-center group hover:shadow-md transition-all" hover={false}>
                  <div className={`${c.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(c.icon as React.ReactElement, { className: `w-8 h-8 ${c.color}` })}
                  </div>
                  <h4 className="font-black text-gray-900 uppercase text-sm mb-1">{c.name}</h4>
                  <p className="text-gray-500 text-xs">{c.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
          {/* Partner logos row */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-8">Proveedores y socios estratégicos</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { name: "GRAINGER",  color: "#cc0000" },
                { name: "FASTENAL",  color: "#0052a5" },
                { name: "ABB",       color: "#ff000f" },
                { name: "SONEPAR",   color: "#003da5" },
                { name: "MCMASTER",  color: "#cc5500" },
              ].map((p, i) => (
                <span key={i} className="text-gray-300 hover:text-gray-500 font-black text-lg tracking-tight transition-colors cursor-default" style={{ letterSpacing: "-0.02em" }}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA TÉCNICA ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionLabel>Capacidades</SectionLabel>
          <SectionTitle>Experiencia Técnica</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              { title: "Moldeo por Inyección",   desc: "Mantenimiento, instalación y soporte a maquinaria de inyección." },
              { title: "Scrubbers",              desc: "Operación, mantenimiento y optimización de sistemas ambientales." },
              { title: "Manejo de Químicos",     desc: "Procedimientos industriales bajo prácticas seguras." },
              { title: "Espacios Confinados",    desc: "Intervenciones seguras bajo estrictos protocolos industriales." },
              { title: "Equipos Auxiliares",     desc: "Diagnóstico y mantenimiento especializado." },
              { title: "Automatización",         desc: "Sensores, control industrial y sistemas de producción." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Card className="p-6 h-full border-l-4 border-l-red-600 rounded-l-none">
                  <h4 className="font-black text-gray-900 mb-2 uppercase">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGENIERÍA / SUMINISTROS ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel>Desarrollo</SectionLabel>
              <SectionTitle>Ingeniería y Desarrollo</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <PenTool className="w-7 h-7 text-red-600" />,      label: "Diseño" },
                  { icon: <FileText className="w-7 h-7 text-red-600" />,     label: "Propuesta" },
                  { icon: <Beaker className="w-7 h-7 text-red-600" />,       label: "Prototipos" },
                  { icon: <CheckCircle2 className="w-7 h-7 text-red-600" />, label: "Pruebas" },
                ].map((s, i) => (
                  <Card key={i} className="p-6 text-center" hover={false}>
                    <div className="flex justify-center mb-3">{s.icon}</div>
                    <h4 className="font-bold text-gray-900 uppercase text-sm">{s.label}</h4>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Abastecimiento</SectionLabel>
              <SectionTitle>Suministros Industriales</SectionTitle>
              <div className="space-y-4">
                {[
                  { icon: <Wrench className="w-6 h-6 text-red-600" />,  title: "Herramientas",  desc: "Equipo especializado para operación" },
                  { icon: <Settings className="w-6 h-6 text-red-600" />, title: "Refacciones",  desc: "Componentes originales para maquinaria" },
                  { icon: <Factory className="w-6 h-6 text-red-600" />,  title: "Consumibles",  desc: "Materiales para uso diario en planta" },
                ].map((s, i) => (
                  <Card key={i} className="flex items-center gap-5 p-5" hover={false}>
                    <div className="bg-red-50 p-3 rounded-xl shrink-0">{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase mb-0.5">{s.title}</h4>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO OPERATIVO ── */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <SectionLabel>Metodología</SectionLabel>
          </div>
          <SectionTitle center light>Nuestro Proceso Operativo</SectionTitle>
          <div className="grid md:grid-cols-4 gap-8 mt-14 relative">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-gray-700" />
            {[
              { num: "1", title: "Diagnóstico",     desc: "Evaluación técnica y análisis de la situación." },
              { num: "2", title: "Planeación",       desc: "Estrategia, cronograma y asignación de recursos." },
              { num: "3", title: "Implementación",   desc: "Ejecución bajo estándares de seguridad y calidad." },
              { num: "4", title: "Validación",       desc: "Pruebas, entrega formal y liberación del sistema." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.12} className="relative z-10 text-center">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-600/30">
                  {p.num}
                </div>
                <h4 className="text-white font-bold uppercase mb-2">{p.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEGURIDAD ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-red-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <AlertTriangle className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <span className="text-red-100 text-xs font-bold uppercase tracking-widest">Nuestra prioridad</span>
                <h2 className="text-3xl font-black text-white uppercase mt-2">Comprometidos con la Seguridad</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {["Seguridad Industrial", "Cumplimiento NOM", "Control de Riesgos", "Calidad Operativa"].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                    <Shield className="w-6 h-6 text-white mx-auto mb-2" />
                    <span className="font-bold text-white text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionLabel>Portafolio</SectionLabel>
          <SectionTitle>Proyectos Destacados</SectionTitle>
          <div className="grid lg:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Mantenimiento Industrial", desc: "Optimización y recuperación de equipos.", img: "https://images.unsplash.com/photo-1581092918484-8313b6db8e8c?auto=format&fit=crop&w=1000&q=80" },
              { title: "Obra Civil",               desc: "Infraestructura y mejoras operativas.",  img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80" },
              { title: "Moldeo por Inyección",     desc: "Servicio especializado para maquinaria.", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1000&q=80" },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group rounded-2xl overflow-hidden relative cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-lg font-black text-white uppercase mb-1">{p.title}</h3>
                    <p className="text-red-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <h3 className="text-xl font-black text-gray-900 uppercase mt-20 mb-8">Galería de Trabajos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1581092918484-8313b6db8e8c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=900&q=80",
            ].map((img, i) => (
              <img key={i} src={img} alt="Galeria" className="w-full aspect-square object-cover rounded-2xl border border-transparent hover:border-red-400 hover:scale-[1.02] transition-all duration-300 shadow cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALES ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <SectionLabel>Lo que dicen nuestros clientes</SectionLabel>
          </div>
          <SectionTitle center>Opiniones de Clientes</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { text: "Excelente capacidad técnica y rápida respuesta operativa. En menos de 2 horas tenían un técnico en planta.", author: "Supervisor de Producción", company: "Planta Maquiladora" },
              { text: "Gran apoyo en mantenimiento especializado y mejora de procesos. Redujeron nuestro downtime en un 40%.", author: "Gerencia Industrial", company: "Empresa Automotriz" },
              { text: "Profesionalismo, calidad y cumplimiento de objetivos. Los recomendamos ampliamente en el sector.", author: "Jefe de Planta", company: "Planta de Electrónica" },
            ].map((o, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="p-8 h-full">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 text-base italic mb-6 leading-relaxed">"{o.text}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-gray-900 text-sm">{o.author}</p>
                    <p className="text-red-600 text-xs font-semibold">{o.company}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <div className="text-center mb-4">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
          </div>
          <SectionTitle center>Todo lo que necesitas saber</SectionTitle>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "¿Están disponibles las 24 horas, los 7 días de la semana?",
                a: "Sí. Contamos con atención y respuesta de emergencia 24/7 los 365 días del año. Entendemos que un paro de producción no espera horario de oficina — nuestro equipo técnico está disponible para atender cualquier urgencia industrial de forma inmediata."
              },
              {
                q: "¿En qué zonas geográficas operan?",
                a: "Nuestra base de operaciones es Nogales, Sonora, pero atendemos proyectos en toda la región fronteriza: Agua Prieta, Cananea, Santa Ana, Hermosillo y Arizona (EUA). Para proyectos de gran escala evaluamos disponibilidad en otras ciudades de Sonora."
              },
              {
                q: "¿Ofrecen contratos de mantenimiento preventivo?",
                a: "Sí. Diseñamos planes de mantenimiento preventivo a medida según el tipo de maquinaria, frecuencia de uso y criticidad del equipo. Esto reduce el costo de mantenimiento correctivo y aumenta significativamente la vida útil del equipo."
              },
              {
                q: "¿Cuánto tiempo tardan en responder a una emergencia?",
                a: "Nuestro tiempo de respuesta promedio es de menos de 2 horas para clientes en Nogales y alrededores. Para zonas fuera de la ciudad coordinamos el desplazamiento con la mayor rapidez posible. Siempre tenemos personal en standby."
              },
              {
                q: "¿Trabajan con maquiladoras y empresas grandes?",
                a: "Sí, es nuestro mercado principal. Tenemos experiencia trabajando en plantas maquiladoras, empresas Tier 1 y Tier 2 automotrices, electrónica de consumo, plásticos y construcción industrial. Nos adaptamos a los protocolos de seguridad y calidad de cada empresa."
              },
              {
                q: "¿Cómo solicito una cotización?",
                a: "Puedes usar el formulario de contacto en esta página, que enviará tu solicitud directamente por WhatsApp, o llamarnos directo al 631 318 5564. Respondemos con una propuesta en menos de 24 horas para trabajos planificados y de forma inmediata para emergencias."
              },
              {
                q: "¿Qué pasa si necesito servicio de moldeo por inyección fuera de horario?",
                a: "El servicio de moldeo y mantenimiento de inyectoras está incluido en nuestra cobertura 24/7. Si su inyectora falla en turno nocturno o fin de semana, llámenos y enviamos a un especialista. Manejamos marcas como ENGEL, ARBURG, HUSKY, MILACRON y más."
              },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-red-200 shadow-md shadow-red-50" : "border-gray-200 shadow-sm hover:border-gray-300"}`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                    >
                      <span className={`font-bold text-base leading-snug transition-colors ${isOpen ? "text-red-600" : "text-gray-900 group-hover:text-red-600"}`}>
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-500"}`}
                      >
                        <ArrowRight className="w-4 h-4 rotate-[-90deg]" style={{ transform: "rotate(-45deg)" }} />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-red-100 mb-4" />
                        <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                        {i === 5 && (
                          <button
                            onClick={() => scrollTo("contacto")}
                            className="mt-4 inline-flex items-center gap-2 text-red-600 font-bold text-sm hover:text-red-700 transition-colors"
                          >
                            Ir al formulario de contacto <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA bajo FAQ */}
          <FadeIn delay={0.3}>
            <div className="mt-10 text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">¿Tienes una pregunta que no está aquí?</p>
              <a
                href="https://wa.me/526313185564?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm uppercase tracking-wide"
              >
                <Phone className="w-4 h-4" />
                Pregúntanos por WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <SectionLabel>¿Listo para trabajar juntos?</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 mt-2">
            ¿Necesitas apoyo para tu<br />operación industrial?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Soluciones inmediatas — disponibles 24/7</p>
          <button
            onClick={() => scrollTo("contacto")}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-black text-base uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5"
          >
            Solicitar Cotización
          </button>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn direction="left">
              <SectionLabel>Comunícate con nosotros</SectionLabel>
              <SectionTitle>Contacto SGI</SectionTitle>
              <Card className="mb-6 p-8" hover={false}>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 uppercase mb-1 text-sm">Ubicación</h5>
                      <p className="text-gray-500 text-sm">Lago Azul #45, Jardín de la Montaña<br />Nogales, Sonora, México</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-emerald-50 p-2.5 rounded-lg shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 uppercase mb-1 text-sm">Teléfono (24/7)</h5>
                      <p className="text-gray-500 text-sm">631 318 5564</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-50 p-2.5 rounded-lg shrink-0">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 uppercase mb-1 text-sm">Correo Electrónico</h5>
                      <p className="text-gray-500 text-sm">sginogales@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </Card>
              {/* ── MAPA INTERACTIVO ── */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                {/* OpenStreetMap embed — sin API key, siempre funciona */}
                <div className="relative h-56 overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-110.9490%2C31.3136%2C-110.9190%2C31.3336&layer=mapnik&marker=31.3236%2C-110.9340"
                    width="100%" height="100%"
                    style={{ border: 0, filter: "saturate(0.85) contrast(1.05)" }}
                    loading="lazy"
                    title="Ubicación SGI Nogales"
                  />
                  {/* Pin overlay animado */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="drop-shadow-2xl"
                    >
                      <div className="bg-red-600 text-white rounded-full p-2 shadow-xl ring-4 ring-white">
                        <MapPin className="w-5 h-5" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Dirección + botones de navegación */}
                <div className="bg-white p-4 border-t border-gray-100">
                  {/* Dirección con botón copiar */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-blue-50 p-1.5 rounded-lg shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm font-medium leading-snug">{SGI_ADDRESS}</p>
                    </div>
                    <button
                      onClick={copyAddress}
                      title="Copiar dirección"
                      className={`shrink-0 p-1.5 rounded-lg transition-all ${addressCopied ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {addressCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Botones de navegación */}
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center group"
                    >
                      <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Google</span>
                    </a>
                    <a
                      href={WAZE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition-colors text-center group"
                    >
                      <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Waze</span>
                    </a>
                    <a
                      href={APPLE_MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-gray-800 hover:bg-gray-900 text-white transition-colors text-center group"
                    >
                      <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Apple</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <Card className="mt-8 lg:mt-16 p-8 border-t-4 border-t-red-600" hover={false}>
                <h3 className="text-2xl font-black text-gray-900 uppercase mb-6">Solicita tu Cotización</h3>
                {formSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /> Solicitud preparada. Abriendo WhatsApp...
                  </div>
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Nombre o Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. Maquiladora SA" className="border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-red-500/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="correo@empresa.com" className="border-gray-300 bg-gray-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Teléfono (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="631..." className="border-gray-300 bg-gray-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="service" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Tipo de Servicio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 bg-gray-50">
                              <SelectValue placeholder="Seleccione un servicio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200">
                            {["Mantenimiento Industrial", "Moldeo por Inyección", "HVAC", "Herrería Industrial", "Obra Civil", "Scrubbers", "Instalaciones Industriales"].map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Mensaje</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describa el requerimiento o problema..." className="border-gray-300 bg-gray-50 min-h-[110px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 uppercase tracking-widest mt-2 rounded-lg">
                      Enviar vía WhatsApp
                    </Button>
                  </form>
                </Form>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 border-t-4 border-t-red-600 pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="bg-white rounded-xl px-4 py-2 inline-block mb-6">
                <img src={logoSrc} alt="SGI Logo" className="h-14 w-auto" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Servicios Generales de Ingeniería. Especialistas en soluciones técnicas para la industria manufacturera en Nogales, Sonora.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Navegación</h4>
              <ul className="space-y-3">
                {["Inicio", "Nosotros", "Servicios", "Proyectos", "Contacto"].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item.toLowerCase())} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Información</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>Nogales, Sonora, México</li>
                <li>Tel: 631 318 5564</li>
                <li>sginogales@gmail.com</li>
                <li>Atención 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Servicios Generales de Ingeniería (SGI). Todos los derechos reservados.
            </p>
            <p className="text-gray-600 text-xs">Nogales, Sonora · México</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
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
          onClick={() => scrollTo("inicio")}
          className="fixed bottom-24 right-6 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-all hover:-translate-y-1"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
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
