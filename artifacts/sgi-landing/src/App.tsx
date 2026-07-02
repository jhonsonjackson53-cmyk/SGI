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

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const logoSrc = asset("/logo-sgi.png");
const queryClient = new QueryClient();

const IndustrialPlantScene = React.lazy(() => import("@/components/IndustrialPlantScene"));

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
    className={`mb-10 ${center ? "text-center" : ""} relative`}
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
  >
    <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-3 leading-tight ${light ? "text-white" : "text-gray-950"}`}>
      {children}
    </h2>
    <motion.div
      className={`h-1 w-16 rounded-full bg-gradient-to-r from-red-600 via-orange-400 to-red-600 shadow-lg shadow-red-500/20 ${center ? "mx-auto" : ""}`}
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
    className={`premium-card bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm ${className}`}
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
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
  const [activeSafety, setActiveSafety] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);
  const [activeSector, setActiveSector] = useState(0);
  const [activeSupplier, setActiveSupplier] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeEngineering, setActiveEngineering] = useState(0);
  const [activeSupply, setActiveSupply] = useState(0);
  const safetyItems = [
    {
      label: "Seguridad Industrial",
      icon: <Shield className="w-6 h-6" />,
      color: "text-red-600",
      bg: "bg-red-50",
      ring: "ring-red-200",
      image: "/proyectos/sgi-instalacion-maquinaria.jpg",
      summary: "Protocolos de trabajo en planta para cuidar al equipo y mantener continuidad operativa.",
      points: ["Equipo de protección", "Áreas controladas", "Trabajo seguro en sitio"],
    },
    {
      label: "Cumplimiento NOM",
      icon: <FileText className="w-6 h-6" />,
      color: "text-gray-600",
      bg: "bg-gray-50",
      ring: "ring-gray-200",
      image: "/proyectos/sgi-certificado-rjg.jpg",
      summary: "Documentación, evidencias y estándares aplicables para entregar trabajos verificables.",
      points: ["Bitácoras y reportes", "Evidencia fotográfica", "Revisión de lineamientos"],
    },
    {
      label: "Control de Riesgos",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-red-600",
      bg: "bg-red-50",
      ring: "ring-red-200",
      image: "/proyectos/sgi-scrubber-antes-despues.jpg",
      summary: "Identificación de condiciones críticas antes de intervenir maquinaria o infraestructura.",
      points: ["Inspección previa", "Aislamiento de riesgos", "Respuesta ordenada"],
    },
    {
      label: "Calidad Operativa",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "text-gray-600",
      bg: "bg-gray-50",
      ring: "ring-gray-200",
      image: "/proyectos/sgi-mantenimiento-rodamiento.jpg",
      summary: "Validación final para entregar trabajos funcionales, limpios y listos para operación.",
      points: ["Pruebas finales", "Liberación técnica", "Seguimiento post-servicio"],
    },
  ];
  const activeSafetyItem = safetyItems[activeSafety];
  const brandItems = [
    { name: "ENGEL", image: "/marcas-tecnologias/Engel.png", color: "text-red-600", bg: "bg-red-50", summary: "Soporte y mantenimiento para equipos de moldeo de alto desempeño.", points: ["Inyección", "Procesos", "Diagnóstico"] },
    { name: "ARBURG", image: "/marcas-tecnologias/Arburg.png", color: "text-red-700", bg: "bg-red-50", summary: "Experiencia en maquinaria de inyección, ajustes y continuidad operativa.", points: ["Moldeo", "Ajustes", "Servicio"] },
    { name: "HUSKY", image: "/marcas-tecnologias/Husky.png", color: "text-gray-600", bg: "bg-gray-50", summary: "Atención técnica para sistemas robustos de producción plástica.", points: ["Producción", "Moldes", "Mejora"] },
    { name: "KEYENCE", image: "/marcas-tecnologias/Keyence.png", color: "text-red-600", bg: "bg-red-50", summary: "Integración de sensores, medición y control para líneas industriales.", points: ["Sensores", "Medición", "Control"] },
    { name: "EATON", image: "/marcas-tecnologias/Eaton.png", color: "text-gray-700", bg: "bg-gray-50", summary: "Componentes eléctricos y soluciones para operación segura en planta.", points: ["Eléctrico", "Protección", "Tableros"] },
    { name: "3M", image: "/marcas-tecnologias/3M.png", color: "text-red-600", bg: "bg-red-50", summary: "Consumibles y materiales técnicos para mantenimiento y seguridad.", points: ["Materiales", "EPP", "Consumibles"] },
    { name: "HILTI", image: "/marcas-tecnologias/Hilti.png", color: "text-red-600", bg: "bg-red-50", summary: "Herramientas y soluciones de fijación para obra civil e instalación.", points: ["Fijación", "Obra civil", "Herramientas"] },
    { name: "MAKITA", image: "/marcas-tecnologias/Maquita.png", color: "text-gray-700", bg: "bg-gray-50", summary: "Herramienta eléctrica para trabajos de instalación y mantenimiento.", points: ["Instalación", "Taller", "Campo"] },
    { name: "MILWAUKEE", image: "/marcas-tecnologias/Milwaukee.png", color: "text-red-700", bg: "bg-red-50", summary: "Herramientas para trabajos exigentes en planta y servicio industrial.", points: ["Potencia", "Servicio", "Mantenimiento"] },
    { name: "BALLUFF", image: "/marcas-tecnologias/Balluff.png", color: "text-gray-700", bg: "bg-gray-50", summary: "Sensórica y automatización para monitoreo de equipos y procesos.", points: ["Automatización", "Sensores", "Control"] },
  ];
  const sectorItems = [
    { name: "Maquiladoras", icon: <Factory className="w-7 h-7" />, image: "/clientes-sectores/Maquiladora.png", desc: "Plantas de manufactura", color: "text-gray-600", bg: "bg-gray-50", summary: "Soporte integral para líneas de producción, mantenimiento y servicios generales.", points: ["Continuidad operativa", "Mantenimiento", "Respuesta rápida"] },
    { name: "Automotriz", icon: <Settings className="w-7 h-7" />, image: "/clientes-sectores/Automotriz.png", desc: "Tier 1 y Tier 2", color: "text-red-500", bg: "bg-red-50", summary: "Atención a procesos críticos, herramentales, instalaciones y maquinaria de producción.", points: ["Procesos críticos", "Precisión", "Soporte técnico"] },
    { name: "Electrónica", icon: <Zap className="w-7 h-7" />, image: "/clientes-sectores/Electronica.png", desc: "Ensamble y producción", color: "text-red-500", bg: "bg-red-50", summary: "Servicios para áreas de ensamble, infraestructura eléctrica y operación limpia.", points: ["Ensamble", "Instalación", "Control"] },
    { name: "Plásticos", icon: <Beaker className="w-7 h-7" />, image: "/clientes-sectores/Plasticos.png", desc: "Moldeo e inyección", color: "text-red-600", bg: "bg-red-50", summary: "Mantenimiento especializado en moldeo, moldes y maquinaria de inyección.", points: ["Moldeo", "Moldes", "Optimización"] },
    { name: "Construcción", icon: <HardHat className="w-7 h-7" />, image: "/clientes-sectores/Construccion.png", desc: "Obra civil y remodelación", color: "text-red-700", bg: "bg-red-50", summary: "Obra civil, adecuaciones, estructuras y mejoras operativas en planta.", points: ["Obra civil", "Remodelación", "Estructuras"] },
    { name: "Alimentos", icon: <CheckCircle2 className="w-7 h-7" />, image: "/clientes-sectores/Alimentos.png", desc: "Procesamiento y empaque", color: "text-gray-600", bg: "bg-gray-50", summary: "Servicios enfocados en continuidad, limpieza operativa y mantenimiento preventivo.", points: ["Procesamiento", "Empaque", "Preventivo"] },
    { name: "Logística", icon: <ArrowRight className="w-7 h-7" />, image: "/clientes-sectores/Logistica.png", desc: "Almacenes y distribución", color: "text-gray-600", bg: "bg-gray-50", summary: "Adecuaciones para almacenes, flujo de materiales e instalaciones de soporte.", points: ["Almacenes", "Flujo", "Instalaciones"] },
    { name: "Hospitalario", icon: <Shield className="w-7 h-7" />, image: "/clientes-sectores/Hospitalario.png", desc: "Equipos médicos", color: "text-red-600", bg: "bg-red-50", summary: "Servicios técnicos con enfoque en seguridad, calidad y operación confiable.", points: ["Seguridad", "Calidad", "Confiabilidad"] },
  ];
  const supplierItems = [
    { name: "GRAINGER", image: "/proveedores-socios/Grainger.png", color: "text-red-600", bg: "bg-red-50", summary: "Abastecimiento de MRO, herramienta y consumibles industriales para planta.", points: ["MRO", "Herramienta", "Consumibles"] },
    { name: "FASTENAL", image: "/proveedores-socios/Fastenal.png", color: "text-gray-600", bg: "bg-gray-50", summary: "Fijación, tornillería, seguridad y materiales de uso diario en operación.", points: ["Fijación", "Seguridad", "Inventario"] },
    { name: "ABB", image: "/proveedores-socios/ABB.png", color: "text-red-600", bg: "bg-red-50", summary: "Componentes eléctricos, automatización y soluciones para control industrial.", points: ["Eléctrico", "Control", "Automatización"] },
    { name: "SONEPAR", image: "/proveedores-socios/Sonepar.png", color: "text-gray-700", bg: "bg-gray-50", summary: "Distribución eléctrica para instalaciones, tableros y mantenimiento.", points: ["Distribución", "Instalación", "Tableros"] },
    { name: "MCMASTER", image: "/proveedores-socios/McMaster.png", color: "text-red-600", bg: "bg-red-50", summary: "Componentes técnicos, refacciones y elementos mecánicos especializados.", points: ["Refacciones", "Mecánica", "Componentes"] },
  ];
  const experienceItems = [
    { title: "Moldeo por Inyeccion", icon: <Beaker className="w-6 h-6" />, image: "/proyectos/sgi-moldeo-detalle.jpg", color: "text-red-600", bg: "bg-red-50", desc: "Mantenimiento, instalacion y soporte a maquinaria de inyeccion.", points: ["Setups de proceso", "Moldes y perifericos", "Reduccion de paros"] },
    { title: "Scrubbers", icon: <Wind className="w-6 h-6" />, image: "/proyectos/sgi-scrubber-antes-despues.jpg", color: "text-gray-600", bg: "bg-gray-50", desc: "Operacion, mantenimiento y optimizacion de sistemas ambientales.", points: ["Inspeccion visual", "Flujo y extraccion", "Mantenimiento seguro"] },
    { title: "Manejo de Quimicos", icon: <Thermometer className="w-6 h-6" />, image: "/proyectos/sgi-certificado-rjg.jpg", color: "text-red-600", bg: "bg-red-50", desc: "Procedimientos industriales bajo practicas seguras.", points: ["Procedimientos", "EPP", "Control documental"] },
    { title: "Espacios Confinados", icon: <Shield className="w-6 h-6" />, image: "/clientes-sectores/Construccion.png", color: "text-red-600", bg: "bg-red-50", desc: "Intervenciones seguras bajo estrictos protocolos industriales.", points: ["Permisos", "Monitoreo", "Rescate preventivo"] },
    { title: "Equipos Auxiliares", icon: <Wrench className="w-6 h-6" />, image: "/proyectos/sgi-mantenimiento-rodamiento.jpg", color: "text-gray-600", bg: "bg-gray-50", desc: "Diagnostico y mantenimiento especializado.", points: ["Diagnostico", "Refacciones", "Ajuste tecnico"] },
    { title: "Automatizacion", icon: <Zap className="w-6 h-6" />, image: "/marcas-tecnologias/Balluff.png", color: "text-gray-600", bg: "bg-gray-50", desc: "Sensores, control industrial y sistemas de produccion.", points: ["Sensores", "Tableros", "Control"] },
  ];
  const engineeringItems = [
    { label: "Diseno", icon: <PenTool className="w-6 h-6" />, image: "/ingenieria-suministros/diseno.png", color: "text-gray-600", bg: "bg-gray-50", summary: "Levantamiento tecnico, propuesta visual y solucion ajustada al piso de produccion.", points: ["Layout", "Concepto", "Viabilidad"] },
    { label: "Propuesta", icon: <FileText className="w-6 h-6" />, image: "/ingenieria-suministros/propuesta.png", color: "text-red-600", bg: "bg-red-50", summary: "Documentacion clara para alcance, materiales, tiempos y criterios de entrega.", points: ["Alcance", "Materiales", "Cronograma"] },
    { label: "Prototipos", icon: <Beaker className="w-6 h-6" />, image: "/ingenieria-suministros/prototipos.png", color: "text-red-600", bg: "bg-red-50", summary: "Validacion de ideas y componentes antes de ejecutar en produccion.", points: ["Prueba fisica", "Ajustes", "Validacion"] },
    { label: "Pruebas", icon: <CheckCircle2 className="w-6 h-6" />, image: "/ingenieria-suministros/pruebas.png", color: "text-gray-600", bg: "bg-gray-50", summary: "Revision funcional y liberacion tecnica para operar con confianza.", points: ["Checklist", "Funcionamiento", "Liberacion"] },
  ];
  const supplyItems = [
    { title: "Herramientas", icon: <Wrench className="w-6 h-6" />, image: "/ingenieria-suministros/herramientas.png", color: "text-gray-600", bg: "bg-gray-50", desc: "Equipo especializado para operacion, mantenimiento e instalacion.", points: ["Herramienta manual", "Equipo electrico", "Trabajo en campo"] },
    { title: "Refacciones", icon: <Settings className="w-6 h-6" />, image: "/ingenieria-suministros/refacciones.png", color: "text-red-600", bg: "bg-red-50", desc: "Componentes originales o equivalentes para maquinaria y servicios auxiliares.", points: ["Mecanicas", "Electricas", "Criticas"] },
    { title: "Consumibles", icon: <Factory className="w-6 h-6" />, image: "/ingenieria-suministros/consumible1.png", color: "text-gray-600", bg: "bg-gray-50", desc: "Materiales de uso diario para mantener la operacion en movimiento.", points: ["MRO", "Seguridad", "Inventario"] },
  ];
  const advantageItems = [
    { icon: <Zap className="w-6 h-6" />, title: "Respuesta critica", metric: "< 2h", desc: "Atencion rapida para paros, fallas y necesidades urgentes en planta.", color: "text-red-400", bg: "bg-red-500/15", line: "from-red-400 to-red-500" },
    { icon: <Wrench className="w-6 h-6" />, title: "Diagnostico tecnico", metric: "360", desc: "Revision de causa raiz, condiciones de operacion, refacciones y seguridad.", color: "text-gray-400", bg: "bg-gray-500/15", line: "from-gray-400 to-gray-400" },
    { icon: <Shield className="w-6 h-6" />, title: "Control seguro", metric: "NOM", desc: "Ejecucion con protocolos, permisos, EPP y evidencia para liberacion.", color: "text-gray-400", bg: "bg-gray-500/15", line: "from-gray-400 to-gray-400" },
    { icon: <Factory className="w-6 h-6" />, title: "Operacion continua", metric: "24/7", desc: "Soporte para mantenimiento, HVAC, obra civil, instalaciones y moldeo.", color: "text-red-400", bg: "bg-red-500/15", line: "from-red-500 to-red-400" },
  ];
  const comparisonRows = [
    { area: "Respuesta", sgi: "Respuesta <2h para incidencias criticas", regular: "Respuesta en dias o sin ventana definida" },
    { area: "Especializacion", sgi: "Tecnicos certificados ARBURG/RJG y experiencia en moldeo", regular: "Tecnicos genericos sin enfoque industrial especializado" },
    { area: "Trazabilidad", sgi: "Reporte de servicio documentado y evidencia visual", regular: "Sin trazabilidad ni historial tecnico confiable" },
    { area: "Cobertura", sgi: "Mantenimiento, HVAC, obra civil, instalacion y suministros", regular: "Proveedor limitado a un solo servicio" },
    { area: "Seguimiento", sgi: "Liberacion tecnica, recomendaciones y soporte post-servicio", regular: "Entrega basica sin continuidad operativa" },
  ];
  const serviceMetrics = [
    { label: "Respuesta promedio", value: "< 2h", width: "88%", trend: [36, 54, 48, 70, 86] },
    { label: "Uptime atendido", value: "98%", width: "96%", trend: [50, 58, 66, 78, 90] },
    { label: "Proyectos activos", value: "12+", width: "74%", trend: [32, 44, 52, 64, 72] },
    { label: "Avance de obra", value: "92%", width: "92%", trend: [28, 40, 62, 76, 92] },
    { label: "Control ambiental", value: "24/7", width: "84%", trend: [42, 48, 62, 70, 84] },
    { label: "Instalaciones listas", value: "96%", width: "90%", trend: [35, 52, 68, 82, 90] },
  ];
  const testimonialItems = [
    { text: "Excelente capacidad tecnica y rapida respuesta operativa. En menos de 2 horas tenian un tecnico en planta.", author: "Supervisor de Produccion", company: "Planta Maquiladora" },
    { text: "Gran apoyo en mantenimiento especializado y mejora de procesos. Redujeron nuestro downtime en un 40%.", author: "Gerencia Industrial", company: "Empresa Automotriz" },
    { text: "Profesionalismo, calidad y cumplimiento de objetivos. Los recomendamos ampliamente en el sector.", author: "Jefe de Planta", company: "Planta de Electronica" },
    { text: "Documentaron el servicio, dejaron evidencia clara y dieron seguimiento hasta liberar el equipo.", author: "Coordinador de Mantenimiento", company: "Industria Plastica" },
    { text: "Nos apoyaron con obra civil, instalacion y refacciones sin tener que coordinar varios proveedores.", author: "Gerencia de Operaciones", company: "Maquiladora Fronteriza" },
  ];
  const activeBrandItem = brandItems[activeBrand];
  const activeSectorItem = sectorItems[activeSector];
  const activeSupplierItem = supplierItems[activeSupplier];
  const activeExperienceItem = experienceItems[activeExperience];
  const activeEngineeringItem = engineeringItems[activeEngineering];
  const activeSupplyItem = supplyItems[activeSupply];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 py-3"
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button onClick={() => scrollTo("inicio")} className="flex items-center" aria-label="Ir al inicio">
            <div className={`rounded-xl px-3 py-1.5 transition-colors ${isScrolled ? "bg-gray-100" : "bg-white/90"}`}>
              <img src={logoSrc} alt="SGI Logo" className="h-12 w-auto" decoding="async" />
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
            aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-white pt-24 px-8 flex flex-col gap-6 lg:hidden shadow-xl">
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
      <main>
      <section id="inicio" className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-950 overflow-hidden">
          <React.Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.18),transparent_34%),radial-gradient(circle_at_70%_45%,rgba(148,163,184,0.12),transparent_30%),#111827]" aria-hidden="true" />}>
            <IndustrialPlantScene />
          </React.Suspense>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/96 via-gray-950/74 to-gray-950/50" />
        <div className="absolute inset-0 bg-grid-pattern animate-grid-drift pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 hero-scanlines pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-aurora" />
        <div className="absolute bottom-1/4 left-1/5 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl pointer-events-none animate-aurora-delay" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 rounded-full border border-white/10 animate-orbit-ring pointer-events-none" aria-hidden="true" />
        <div className="container relative mx-auto px-6 lg:px-12 z-10 pt-24">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-red-400/40 bg-red-600/10 rounded-full text-red-300 font-bold tracking-widest text-xs mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              NOGALES, SONORA · MÉXICO
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5 uppercase">
              Soluciones <br />
              <span className="sgi-gradient-text">Industriales</span><br />
              de Alto Nivel
            </h1>
            <p className="text-base md:text-xl text-gray-300 mb-8 max-w-xl font-light leading-relaxed">
              Mantenimiento especializado, moldeo por inyección, HVAC y obra civil para operaciones que no se detienen. Disponibles 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
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
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-white/10">
                {[
                  { val: "10+", label: "Años en operación" },
                  { val: "300+", label: "Proyectos entregados" },
                  { val: "24/7", label: "Respuesta de emergencia" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-2xl font-black text-white tabular-nums">{s.val}</span>
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide leading-tight max-w-[7rem]">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </FadeIn>
        </div>
        <div className="hidden xl:block absolute right-10 2xl:right-24 top-1/2 -translate-y-1/2 z-20 w-[360px] pointer-events-none">
          <div className="relative min-h-[520px]">
            <div className="absolute right-0 top-0 w-72 rounded-2xl border border-white/12 bg-white/[0.08] backdrop-blur-xl p-5 shadow-2xl shadow-black/30 animate-float-card">
              <div className="flex items-center justify-between mb-4">
                <div><p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">Centro de control</p><h3 className="text-white font-black uppercase text-lg mt-1">SGI Operaciones</h3></div>
                <div className="h-11 w-11 rounded-2xl bg-red-500/15 border border-red-400/20 flex items-center justify-center text-red-300"><Factory className="w-6 h-6" /></div>
              </div>
              <div className="space-y-3">
                {[{ label: "Mantenimiento", value: "Activo", color: "bg-emerald-400" }, { label: "HVAC", value: "Monitoreo", color: "bg-cyan-400" }, { label: "Obra civil", value: "Listo", color: "bg-amber-400" }].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-gray-950/50 border border-white/10 px-3 py-2">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase text-gray-300"><span className={`h-2 w-2 rounded-full ${item.color}`} />{item.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-0 top-40 w-64 rounded-2xl border border-white/12 bg-gray-950/70 backdrop-blur-xl p-5 shadow-2xl shadow-red-950/20 animate-float-card-delay">
              <div className="flex items-center gap-3 mb-4"><div className="h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-300/20 flex items-center justify-center text-blue-300"><Wrench className="w-6 h-6" /></div><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">Respuesta</p><p className="text-3xl font-black text-white leading-none">&lt; 2h</p></div></div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-10/12 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 animate-shimmer-bar" /></div>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">Atencion tecnica para paros, fallas e instalaciones criticas.</p>
            </div>
            <div className="absolute right-8 bottom-0 w-72 rounded-2xl border border-white/12 bg-white/[0.07] backdrop-blur-xl p-5 shadow-2xl shadow-black/30 animate-float-card-slow">
              <div className="grid grid-cols-3 gap-3">
                {[{ icon: <Shield className="w-5 h-5" />, label: "NOM", tone: "text-emerald-300 bg-emerald-500/15" }, { icon: <Wind className="w-5 h-5" />, label: "HVAC", tone: "text-cyan-300 bg-cyan-500/15" }, { icon: <HardHat className="w-5 h-5" />, label: "Obra", tone: "text-amber-300 bg-amber-500/15" }].map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-950/50 border border-white/10 p-3 text-center"><div className={`${item.tone} mx-auto mb-2 h-10 w-10 rounded-xl flex items-center justify-center`}>{item.icon}</div><span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{item.label}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Hero bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ── QUICK ICONS STRIP ── */}
      <section className="brand-marquee-section bg-gray-950 py-6 overflow-hidden border-y border-white/10">
        <div className="container mx-auto px-6 lg:px-12 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-red-300">Marcas y tecnologias que atendemos</span>
          <span className="text-xs text-gray-400">Experiencia con equipos y componentes usados en planta industrial</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
          <motion.div
            className="brand-marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...brandItems, ...brandItems].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="brand-marquee-card">
                <img loading="lazy" decoding="async" src={asset(brand.image)} alt={brand.name} className="h-9 max-w-28 object-contain" />
                <span>{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
            {[
              { name: "Manufactura",   icon: <Factory className="w-7 h-7" />, color: "text-red-500", bg: "from-red-50 to-orange-50", shadow: "shadow-red-500/15" },
              { name: "Mantenimiento", icon: <Wrench  className="w-7 h-7" />, color: "text-blue-600", bg: "from-blue-50 to-cyan-50", shadow: "shadow-blue-500/15" },
              { name: "Instalaciones", icon: <Zap     className="w-7 h-7" />, color: "text-amber-500", bg: "from-amber-50 to-yellow-50", shadow: "shadow-amber-500/15" },
              { name: "Seguridad",     icon: <Shield  className="w-7 h-7" />, color: "text-emerald-600", bg: "from-emerald-50 to-teal-50", shadow: "shadow-emerald-500/15" },
            ].map((item, i) => (
              <div key={i} className="bg-white flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 py-5 sm:py-6 px-3 sm:px-5 lg:px-8 group cursor-default min-w-0 text-center sm:text-left transition-all duration-300 hover:bg-gray-50">
                <div className={`bg-gradient-to-br ${item.bg} p-3 rounded-2xl transition-all duration-300 shrink-0 shadow-lg ${item.shadow} group-hover:-translate-y-1 group-hover:rotate-3`}>
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: `w-6 h-6 sm:w-7 sm:h-7 ${item.color}` })}
                </div>
                <span className="font-bold text-gray-800 uppercase text-[11px] sm:text-sm tracking-wide leading-tight max-w-full break-words">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="industrial-marquee-section bg-gray-950 py-5 overflow-hidden">
        <div className="industrial-marquee">
          {[...Array(2)].flatMap(() => [
            "Mantenimiento 24/7",
            "HVAC industrial",
            "Obra civil",
            "Moldeo por inyeccion",
            "Instalaciones",
            "Seguridad NOM",
            "Suministros",
            "Respuesta critica",
          ]).map((item, i) => (
            <span key={`${item}-${i}`} className="industrial-marquee-item">
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
              {item}
            </span>
          ))}
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
                  <Card key={i} className="metric-card p-8 text-center" hover={false}>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="founder-quote-card grid lg:grid-cols-[0.42fr_1fr] gap-8 items-center rounded-[2rem] border border-gray-200 bg-white/90 p-6 md:p-8 shadow-2xl shadow-gray-950/10 overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-gray-950 via-gray-800 to-red-950 border border-white/10 shadow-xl overflow-hidden flex flex-col items-center justify-center text-center p-8">
                  <div className="h-28 w-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-4xl font-black mb-5">
                    FR
                  </div>
                  <p className="text-white font-black uppercase tracking-widest">Francisco</p>
                  <p className="text-red-200 text-xs uppercase tracking-[0.24em] mt-2">Fundador SGI</p>
                  <span className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Espacio para foto</span>
                </div>
              </div>
              <div>
                <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-red-600 mb-6">
                  Nota del fundador
                </span>
                <blockquote className="text-2xl md:text-4xl font-black uppercase leading-tight text-gray-950">
                  "En SGI no llegamos solo a reparar. Llegamos a entender la operacion, reducir riesgos y dejar evidencia clara de cada solucion industrial."
                </blockquote>
                <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                  Nuestro compromiso es trabajar con precision, seguridad y seguimiento tecnico para que cada planta pueda operar con confianza. La excelencia industrial se demuestra en campo, con respuesta, orden y resultados.
                </p>
                <div className="mt-7 grid sm:grid-cols-3 gap-3">
                  {["Respuesta real", "Seguridad operativa", "Calidad documentada"].map((item) => (
                    <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <Card className="p-8 h-full border-t-4 border-t-gray-600">
                <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Proveer servicios integrales de ingeniería y mantenimiento con los más altos estándares de calidad, seguridad y eficiencia, garantizando la continuidad operativa y el crecimiento de nuestros clientes en el sector industrial.
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <Card className="p-8 h-full border-t-4 border-t-red-500">
                <div className="bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-red-500" />
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
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gray-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <SectionLabel>Números que nos respaldan</SectionLabel>
            <h2 className="text-3xl font-black text-white uppercase">Experiencia Comprobada</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Años */}
            <FadeIn delay={0}>
              <div ref={expRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-gray-600/10 hover:border-gray-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gray-500/15 border border-gray-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gray-500/25 transition-colors">
                  <Target className="w-7 h-7 text-gray-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{expCount}<span className="text-gray-400">+</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Años Experiencia</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Proyectos */}
            <FadeIn delay={0.1}>
              <div ref={proyRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-red-500/25 transition-colors">
                  <HardHat className="w-7 h-7 text-red-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{proyCount}<span className="text-red-400">+</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Proyectos</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Satisfacción */}
            <FadeIn delay={0.2}>
              <div ref={satRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-gray-500/10 hover:border-gray-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gray-500/15 border border-gray-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gray-500/25 transition-colors">
                  <CheckCircle2 className="w-7 h-7 text-gray-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{satCount}<span className="text-gray-400">%</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Satisfacción</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeIn>
            {/* Respuesta */}
            <FadeIn delay={0.3}>
              <div ref={respRef} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center group hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-red-500/25 transition-colors">
                  <Zap className="w-7 h-7 text-red-400" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{respCount}<span className="text-red-400">h</span></div>
                <div className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Tiempo de Respuesta</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
              { icon: <Settings />, title: "Mantenimiento Industrial", desc: "Preventivo, correctivo y predictivo. Reducimos paros no programados y optimizamos el desempeño de equipos.",   color: "text-gray-600",    bg: "bg-gray-50    group-hover:bg-gray-100",    border: "group-hover:border-gray-200"    },
              { icon: <Wind />,     title: "HVAC",                   desc: "Diseño, instalación y mantenimiento de sistemas de climatización industrial de alta capacidad.",                   color: "text-gray-600",    bg: "bg-gray-50    group-hover:bg-gray-100",    border: "group-hover:border-gray-200"    },
              { icon: <Hammer />,   title: "Herrería Industrial",    desc: "Fabricación y reparación de estructuras metálicas, soportes, plataformas y más.",                                 color: "text-red-600",  bg: "bg-red-50  group-hover:bg-red-100",  border: "group-hover:border-red-200"  },
              { icon: <HardHat />,  title: "Obra Civil",             desc: "Construcción, remodelación y mantenimiento de naves industriales y oficinas.",                                    color: "text-red-600",   bg: "bg-red-50   group-hover:bg-red-100",   border: "group-hover:border-red-200"   },
              { icon: <Thermometer />, title: "Scrubbers",           desc: "Mantenimiento y optimización de sistemas ambientales y de tratamiento de gases.",                                color: "text-gray-600", bg: "bg-gray-50 group-hover:bg-gray-100", border: "group-hover:border-gray-200" },
              { icon: <Power />,    title: "Instalaciones",          desc: "Sistemas eléctricos, mecánicos, hidráulicos y servicios generales de planta.",                                   color: "text-red-600",  bg: "bg-red-50  group-hover:bg-red-100",  border: "group-hover:border-red-200"  },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Card className={`service-card p-8 h-full group transition-all ${s.border}`}>
                  <div className={`${s.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: `w-6 h-6 ${s.color}` })}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="service-mini-dashboard mt-6 rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">{serviceMetrics[i].label}</span>
                      <span className="text-sm font-black text-gray-950">{serviceMetrics[i].value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white border border-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-400 to-orange-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: serviceMetrics[i].width }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.05 }}
                      />
                    </div>
                    <div className="mt-4 flex items-end gap-1.5 h-12">
                      {serviceMetrics[i].trend.map((height, index) => (
                        <motion.span
                          key={index}
                          className="flex-1 rounded-t-lg bg-gradient-to-t from-gray-900 to-red-500"
                          initial={{ height: 6, opacity: 0.45 }}
                          whileInView={{ height, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: index * 0.06 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">Modulo {String(i + 1).padStart(2, "0")}</span>
                    <span className="h-9 w-9 rounded-full bg-gray-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESPECIALISTAS EN MOLDEO ── */}
      {/* POR QUE ELEGIR SGI */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(148,163,184,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04)_0,transparent_42%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <FadeIn direction="left">
              <SectionLabel>Ventaja operativa</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight mb-5">
                Mas que servicio: control tecnico para tu planta
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                SGI combina mantenimiento, HVAC, obra civil, instalaciones, moldeo y suministros en un solo frente operativo para reducir paros y resolver problemas complejos con seguimiento real.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">Estado de respuesta</p>
                    <h3 className="text-white font-black uppercase text-xl mt-1">Operacion lista</h3>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-500/10 border border-gray-400/20 px-3 py-1 text-xs font-black uppercase tracking-widest text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                    Activo 24/7
                  </span>
                </div>
                <div className="space-y-3">
                  {["Diagnostico en campo", "Plan de accion", "Ejecucion segura", "Liberacion tecnica"].map((step, i) => (
                    <div key={step} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-xl border border-white/10 bg-gray-900/70 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-xs font-black text-red-300">{i + 1}</span>
                      <span className="text-sm font-bold uppercase text-white">{step}</span>
                      <span className="h-2 w-16 rounded-full bg-gray-800 overflow-hidden">
                        <span className={`block h-full rounded-full bg-gradient-to-r ${i % 2 === 0 ? "from-red-500 to-red-400 w-10/12" : "from-gray-400 to-gray-400 w-8/12"}`} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-4">
              {advantageItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08} direction={i % 2 === 0 ? "up" : "down"}>
                  <div className="group relative min-h-64 rounded-2xl border border-white/10 bg-white/[0.05] p-6 overflow-hidden shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]">
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.line}`} />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                    <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                      {item.icon}
                    </div>
                    <p className={`text-5xl font-black ${item.color} mb-3`}>{item.metric}</p>
                    <h3 className="text-white font-black uppercase text-lg mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div className="comparison-table mt-12 rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden shadow-2xl shadow-black/20">
              <div className="grid md:grid-cols-[1fr_1fr_1fr] bg-gray-900/80 border-b border-white/10">
                <div className="p-5">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Comparativa</span>
                  <h3 className="text-white font-black uppercase text-xl mt-1">Por que SGI destaca</h3>
                </div>
                <div className="hidden md:flex items-center p-5 border-l border-white/10 text-sm font-black uppercase tracking-widest text-emerald-300">SGI</div>
                <div className="hidden md:flex items-center p-5 border-l border-white/10 text-sm font-black uppercase tracking-widest text-red-300">Otros proveedores</div>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.area} className="grid md:grid-cols-[1fr_1fr_1fr] border-b border-white/10 last:border-b-0">
                  <div className="p-5 bg-gray-950/30">
                    <span className="text-sm font-black uppercase text-white">{row.area}</span>
                  </div>
                  <div className="p-5 border-white/10 md:border-l bg-emerald-500/5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-200 leading-relaxed">{row.sgi}</p>
                    </div>
                  </div>
                  <div className="p-5 border-white/10 md:border-l bg-red-500/5">
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-500 leading-relaxed">{row.regular}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="moldeo" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/10 translate-x-3 translate-y-3 rounded-2xl" />
                <img loading="lazy" decoding="async"
                  src={asset("/proyectos/sgi-taller-moldeo.jpg")}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brandItems.map((brand, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setActiveBrand(i)}
                  className={`bg-white border rounded-xl p-4 flex items-center justify-center min-h-[96px] transition-all hover:-translate-y-1 hover:shadow-md ${
                    activeBrand === i ? "border-red-300 shadow-md ring-4 ring-red-50" : "border-gray-200"
                  }`}
                >
                  <img loading="lazy" decoding="async" src={asset(brand.image)} alt={brand.name} className="max-h-12 max-w-full object-contain" />
                </button>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden grid lg:grid-cols-[0.9fr_1.1fr] shadow-sm">
            <div className={`${activeBrandItem.bg} p-8 flex items-center justify-center min-h-56`}>
              <img loading="lazy" decoding="async" src={asset(activeBrandItem.image)} alt={activeBrandItem.name} className="max-h-28 max-w-[70%] object-contain drop-shadow-sm" />
            </div>
            <div className="p-6 md:p-8">
              <span className={`text-xs font-black uppercase tracking-widest ${activeBrandItem.color}`}>Tecnologia aplicada</span>
              <h4 className="text-2xl font-black text-gray-900 uppercase mt-2 mb-3">{activeBrandItem.name}</h4>
              <p className="text-gray-600 leading-relaxed mb-5">{activeBrandItem.summary}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {activeBrandItem.points.map((point) => (
                  <div key={point} className="bg-white border border-gray-200 rounded-xl p-4">
                    <CheckCircle2 className={`w-5 h-5 ${activeBrandItem.color} mb-2`} />
                    <span className="text-xs font-black uppercase text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>
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
            {sectorItems.map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveSector(i)}
                  className={`bg-white rounded-xl p-6 text-center group hover:shadow-md transition-all border ${
                    activeSector === i ? "border-red-300 ring-4 ring-red-50 shadow-md" : "border-transparent"
                  }`}
                >
                  <div className={`${c.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(c.icon as React.ReactElement<{ className?: string }>, { className: `w-7 h-7 ${c.color}` })}
                  </div>
                  <h4 className="font-black text-gray-900 uppercase text-sm mb-1">{c.name}</h4>
                  <p className="text-gray-500 text-xs">{c.desc}</p>
                </button>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden grid lg:grid-cols-[1fr_1.1fr] shadow-sm">
            <div className="relative min-h-64">
              <img loading="lazy" decoding="async" src={asset(activeSectorItem.image)} alt={activeSectorItem.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
              <div className="absolute left-5 bottom-5 flex items-center gap-3">
                <div className={`${activeSectorItem.bg} ${activeSectorItem.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  {activeSectorItem.icon}
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-lg">{activeSectorItem.name}</h4>
                  <p className="text-white/80 text-sm">{activeSectorItem.desc}</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-gray-50">
              <span className={`text-xs font-black uppercase tracking-widest ${activeSectorItem.color}`}>Sector atendido</span>
              <p className="text-gray-600 leading-relaxed mt-3 mb-5">{activeSectorItem.summary}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {activeSectorItem.points.map((point) => (
                  <div key={point} className="bg-white border border-gray-200 rounded-xl p-4">
                    <CheckCircle2 className={`w-5 h-5 ${activeSectorItem.color} mb-2`} />
                    <span className="text-xs font-black uppercase text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Partner logos row */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-8">Proveedores y socios estratégicos</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {supplierItems.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActiveSupplier(i)}
                  className={`bg-white border rounded-xl px-5 py-4 min-w-36 transition-all hover:-translate-y-1 hover:shadow-md ${
                    activeSupplier === i ? "border-red-300 ring-4 ring-red-50 shadow-md" : "border-gray-200"
                  }`}
                >
                  <img loading="lazy" decoding="async" src={asset(p.image)} alt={p.name} className="h-9 max-w-28 object-contain mx-auto" />
                </button>
              ))}
            </div>
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden grid lg:grid-cols-[0.8fr_1.2fr] shadow-sm">
              <div className={`${activeSupplierItem.bg} p-8 flex items-center justify-center min-h-48`}>
                <img loading="lazy" decoding="async" src={asset(activeSupplierItem.image)} alt={activeSupplierItem.name} className="max-h-24 max-w-[70%] object-contain" />
              </div>
              <div className="p-6 md:p-8 bg-gray-50">
                <span className={`text-xs font-black uppercase tracking-widest ${activeSupplierItem.color}`}>Socio estrategico</span>
                <h4 className="text-2xl font-black text-gray-900 uppercase mt-2 mb-3">{activeSupplierItem.name}</h4>
                <p className="text-gray-600 leading-relaxed mb-5">{activeSupplierItem.summary}</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {activeSupplierItem.points.map((point) => (
                    <div key={point} className="bg-white border border-gray-200 rounded-xl p-4">
                      <CheckCircle2 className={`w-5 h-5 ${activeSupplierItem.color} mb-2`} />
                      <span className="text-xs font-black uppercase text-gray-800">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA TÉCNICA ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12">
          <SectionLabel>Capacidades</SectionLabel>
          <SectionTitle>Experiencia Técnica</SectionTitle>
          <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-8 mt-10 items-stretch">
            <div className="grid sm:grid-cols-2 gap-4">
              {experienceItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActiveExperience(i)}
                    className={`group bg-white border rounded-xl p-5 text-left h-full transition-all hover:-translate-y-1 hover:shadow-md ${
                      activeExperience === i ? "border-red-300 ring-4 ring-red-50 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div className={`${item.bg} ${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h4 className="font-black text-gray-900 uppercase text-sm mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </button>
                </FadeIn>
              ))}
            </div>
            <div className="bg-gray-950 rounded-2xl overflow-hidden grid md:grid-cols-[0.9fr_1fr] min-h-[420px] shadow-xl">
              <div className="relative min-h-72">
                <img loading="lazy" decoding="async" src={asset(activeExperienceItem.image)} alt={activeExperienceItem.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/25 to-transparent" />
                <div className="absolute left-5 bottom-5">
                  <div className={`${activeExperienceItem.bg} ${activeExperienceItem.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    {activeExperienceItem.icon}
                  </div>
                  <h4 className="text-white font-black uppercase text-xl">{activeExperienceItem.title}</h4>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className={`text-xs font-black uppercase tracking-widest ${activeExperienceItem.color}`}>Capacidad tecnica</span>
                <p className="text-gray-300 leading-relaxed mt-3 mb-6">{activeExperienceItem.desc}</p>
                <div className="space-y-3">
                  {activeExperienceItem.points.map((point) => (
                    <div key={point} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${activeExperienceItem.color} shrink-0`} />
                      <span className="text-sm font-bold uppercase text-white">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGENIERÍA / SUMINISTROS ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <SectionLabel>Desarrollo</SectionLabel>
              <SectionTitle>Ingeniería y Desarrollo</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {engineeringItems.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActiveEngineering(i)}
                    className={`bg-white rounded-xl p-5 text-center border transition-all hover:-translate-y-1 hover:shadow-md ${
                      activeEngineering === i ? "border-red-300 ring-4 ring-red-50 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div className={`${s.bg} ${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 uppercase text-sm">{s.label}</h4>
                  </button>
                ))}
              </div>
              <div className="mt-5 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative min-h-56">
                  <img loading="lazy" decoding="async" src={asset(activeEngineeringItem.image)} alt={activeEngineeringItem.label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/10 to-transparent" />
                  <h4 className="absolute left-5 bottom-5 text-white font-black uppercase text-xl">{activeEngineeringItem.label}</h4>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">{activeEngineeringItem.summary}</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {activeEngineeringItem.points.map((point) => (
                      <div key={point} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <CheckCircle2 className={`w-4 h-4 ${activeEngineeringItem.color} mb-2`} />
                        <span className="text-[11px] font-black uppercase text-gray-800">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SectionLabel>Abastecimiento</SectionLabel>
              <SectionTitle>Suministros Industriales</SectionTitle>
              <div className="space-y-4">
                {supplyItems.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActiveSupply(i)}
                    className={`w-full bg-white flex items-center gap-5 p-5 rounded-xl border text-left transition-all hover:-translate-y-1 hover:shadow-md ${
                      activeSupply === i ? "border-red-300 ring-4 ring-red-50 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div className={`${s.bg} ${s.color} p-3 rounded-xl shrink-0`}>{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase mb-0.5">{s.title}</h4>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className={`${activeSupplyItem.bg} min-h-56 flex items-center justify-center p-6`}>
                  <img loading="lazy" decoding="async" src={asset(activeSupplyItem.image)} alt={activeSupplyItem.title} className="max-h-48 max-w-full object-contain drop-shadow-md" />
                </div>
                <div className="p-6">
                  <span className={`text-xs font-black uppercase tracking-widest ${activeSupplyItem.color}`}>Suministro tecnico</span>
                  <h4 className="text-xl font-black text-gray-900 uppercase mt-2 mb-2">{activeSupplyItem.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{activeSupplyItem.desc}</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {activeSupplyItem.points.map((point) => (
                      <div key={point} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <CheckCircle2 className={`w-4 h-4 ${activeSupplyItem.color} mb-2`} />
                        <span className="text-[11px] font-black uppercase text-gray-800">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
              { num: "1", icon: <Target className="w-6 h-6" />, color: "text-gray-400", bg: "bg-gray-500/15", border: "border-gray-500/30", title: "Diagnóstico",     desc: "Evaluación técnica y análisis de la situación." },
              { num: "2", icon: <FileText className="w-6 h-6" />, color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/30", title: "Planeación",       desc: "Estrategia, cronograma y asignación de recursos." },
              { num: "3", icon: <Wrench className="w-6 h-6" />, color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/30", title: "Implementación",   desc: "Ejecución bajo estándares de seguridad y calidad." },
              { num: "4", icon: <CheckCircle2 className="w-6 h-6" />, color: "text-gray-400", bg: "bg-gray-500/15", border: "border-gray-500/30", title: "Validación",       desc: "Pruebas, entrega formal y liberación del sistema." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.12} className="relative z-10">
                <div className={`bg-white/5 border ${p.border} rounded-2xl p-6 h-full text-center hover:-translate-y-1 hover:bg-white/10 transition-all`}>
                  <div className={`${p.bg} ${p.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 relative`}>
                    {p.icon}
                    <span className="absolute -top-2 -right-2 bg-gray-950 border border-white/10 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">{p.num}</span>
                  </div>
                  <h4 className="text-white font-bold uppercase mb-2">{p.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEGURIDAD ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-red-600 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-xl shadow-red-600/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(17,24,39,0.18),transparent_28%)]" />
            <AlertTriangle className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <span className="text-red-100 text-xs font-bold uppercase tracking-widest">Nuestra prioridad</span>
                <h2 className="text-3xl font-black text-white uppercase mt-2">Comprometidos con la Seguridad</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {safetyItems.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActiveSafety(i)}
                    className={`group bg-white/95 rounded-xl p-5 text-center shadow-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      activeSafety === i ? "ring-4 ring-white/60 border-white" : "border-white/40"
                    }`}
                  >
                    <div className={`${s.bg} ${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>
                      {s.icon}
                    </div>
                    <span className="font-black text-gray-900 text-sm uppercase">{s.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-white rounded-2xl overflow-hidden shadow-lg grid lg:grid-cols-[1fr_1.15fr] border border-red-100">
                <div className="relative min-h-56">
                  <img loading="lazy" decoding="async"
                    src={asset(activeSafetyItem.image)}
                    alt={activeSafetyItem.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/20 to-transparent" />
                  <div className="absolute left-5 bottom-5 flex items-center gap-3">
                    <div className={`${activeSafetyItem.bg} ${activeSafetyItem.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      {activeSafetyItem.icon}
                    </div>
                    <h3 className="text-white font-black uppercase text-lg">{activeSafetyItem.label}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed mb-5">{activeSafetyItem.summary}</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {activeSafetyItem.points.map((point) => (
                      <div key={point} className={`bg-white rounded-xl p-4 border ${activeSafetyItem.ring} shadow-sm`}>
                        <CheckCircle2 className={`w-5 h-5 ${activeSafetyItem.color} mb-2`} />
                        <span className="text-xs font-black uppercase text-gray-800 leading-snug block">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
              { title: "Mantenimiento Industrial", desc: "Optimización y recuperación de equipos.", img: "/proyectos/sgi-mantenimiento-rodamiento.jpg" },
              { title: "Obra Civil",               desc: "Infraestructura y mejoras operativas.",  img: "/proyectos/sgi-obra-civil-panel.jpg" },
              { title: "Moldeo por Inyección",     desc: "Servicio especializado para maquinaria.", img: "/proyectos/sgi-moldeo-detalle.jpg" },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="project-card group rounded-2xl overflow-hidden relative cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img loading="lazy" decoding="async" src={asset(p.img)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
                    <span className="mb-3 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                      Caso SGI
                    </span>
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
              "/proyectos/sgi-herreria-estructura.jpg",
              "/proyectos/sgi-fabricacion-racks.jpg",
              "/proyectos/sgi-scrubber-antes-despues.jpg",
              "/proyectos/sgi-cortina-industrial.jpg",
              "/proyectos/sgi-maquinado-molde.jpg",
              "/proyectos/sgi-obra-civil-azotea.jpg",
              "/proyectos/sgi-herreria-marcos.jpg",
              "/proyectos/sgi-certificado-arburg.jpg",
            ].map((img, i) => (
              <img loading="lazy" decoding="async" key={i} src={asset(img)} alt={`Trabajo SGI ${i + 1}`} className="gallery-tile w-full aspect-square object-cover rounded-2xl border border-transparent hover:border-red-400 hover:scale-[1.02] transition-all duration-300 shadow cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALES ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <SectionLabel>Lo que dicen nuestros clientes</SectionLabel>
          </div>
          <SectionTitle center>Opiniones de Clientes</SectionTitle>
        </div>
        <div className="testimonial-carousel relative mt-6">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <motion.div
            className="testimonial-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            {[...testimonialItems, ...testimonialItems].map((o, i) => (
              <Card key={`${o.author}-${i}`} className="testimonial-card testimonial-slide p-8 h-full" hover={false}>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-50 to-gray-100 border border-gray-200 flex items-center justify-center text-gray-900 font-black">
                    {o.author.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-red-400 text-red-400" />)}
                  </div>
                </div>
                <p className="text-gray-700 text-base italic mb-6 leading-relaxed">"{o.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-900 text-sm">{o.author}</p>
                  <p className="text-red-600 text-xs font-semibold">{o.company}</p>
                </div>
              </Card>
            ))}
          </motion.div>
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
                    className={`faq-card bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-red-200 shadow-md shadow-red-50" : "border-gray-200 shadow-sm hover:border-gray-300"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
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
                      id={`faq-answer-${i}`}
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
                            type="button"
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
                    <div className="bg-gray-50 p-2.5 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 uppercase mb-1 text-sm">Ubicación</h5>
                      <p className="text-gray-500 text-sm">Lago Azul #45, Jardín de la Montaña<br />Nogales, Sonora, México</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-gray-50 p-2.5 rounded-lg shrink-0">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 uppercase mb-1 text-sm">Teléfono (24/7)</h5>
                      <p className="text-gray-500 text-sm">631 318 5564</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-red-50 p-2.5 rounded-lg shrink-0">
                      <Mail className="w-5 h-5 text-red-600" />
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
                    <div className="bg-gray-50 p-1.5 rounded-lg shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm font-medium leading-snug">{SGI_ADDRESS}</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyAddress}
                      aria-label={addressCopied ? "Direccion copiada" : "Copiar direccion"}
                      title="Copiar dirección"
                      className={`shrink-0 p-1.5 rounded-lg transition-all ${addressCopied ? "bg-gray-50 text-gray-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-white transition-colors text-center group"
                    >
                      <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Google</span>
                    </a>
                    <a
                      href={WAZE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white transition-colors text-center group"
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
                  <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
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

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 border-t-4 border-t-red-600 pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="bg-white rounded-xl px-4 py-2 inline-block mb-6">
                <img decoding="async" src={logoSrc} alt="SGI Logo" className="h-14 w-auto" />
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
        aria-label="Contactar a SGI por WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-gray-500/30 z-50 transition-transform hover:scale-110"
      >
        <Phone className="w-7 h-7" />
      </a>

      {showScrollTop && (
        <button
          type="button"
          onClick={() => scrollTo("inicio")}
          aria-label="Volver al inicio"
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
