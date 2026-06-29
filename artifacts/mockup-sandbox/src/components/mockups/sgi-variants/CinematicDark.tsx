export function CinematicDark() {
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden" style={{ background: "#0a0a0a" }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-red-600/50 flex items-center justify-center">
            <span className="text-red-500 font-black text-xs">S</span>
          </div>
          <span className="text-white font-light tracking-[0.4em] uppercase text-xs">SGI Ingeniería</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-light tracking-widest text-white/50 uppercase">
          <a href="#" className="hover:text-white transition-colors">Servicios</a>
          <a href="#" className="hover:text-white transition-colors">Proyectos</a>
          <a href="#" className="hover:text-white transition-colors">Nosotros</a>
        </div>
        <button className="border border-red-600/50 hover:border-red-600 text-red-400 hover:text-white text-xs font-light tracking-widest uppercase px-6 py-2.5 transition-all">
          Contacto
        </button>
      </nav>

      {/* Hero — cinematic widescreen feel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Glow effects */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(185,28,28,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }} />

        {/* Horizontal scan lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)" }} />

        <div className="relative z-10 text-center px-10 max-w-5xl">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-red-600/50" />
            <span className="text-red-500/80 text-xs font-light tracking-[0.5em] uppercase">Nogales · Sonora · México</span>
            <div className="h-px w-16 bg-red-600/50" />
          </div>

          <h1 className="text-6xl md:text-8xl font-thin uppercase tracking-[0.1em] leading-tight mb-6">
            <span className="block text-white/90">Soluciones</span>
            <span className="block font-black text-white" style={{ WebkitTextStroke: "1px rgba(239,68,68,0.5)" }}>INDUSTRIALES</span>
            <span className="block text-white/40 font-thin text-5xl tracking-[0.3em]">de alto nivel</span>
          </h1>

          <p className="text-white/40 text-sm tracking-wide max-w-md mx-auto mb-12 leading-relaxed">
            Especialistas en mantenimiento industrial, moldeo por inyección,
            HVAC y obra civil en el norte de México.
          </p>

          <div className="flex gap-6 justify-center">
            <button className="relative group overflow-hidden bg-red-700 hover:bg-red-600 text-white text-xs font-light tracking-[0.3em] uppercase px-10 py-4 transition-all">
              <span className="relative z-10">Solicitar cotización</span>
            </button>
            <button className="border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-xs font-light tracking-[0.3em] uppercase px-10 py-4 transition-all">
              Explorar servicios
            </button>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 flex border-t border-white/5">
          {[
            { n: "15", u: "años", l: "de experiencia" },
            { n: "200", u: "+", l: "proyectos" },
            { n: "24/7", u: "", l: "disponibilidad" },
            { n: "50", u: "+", l: "clientes activos" },
          ].map((s, i) => (
            <div key={i} className="flex-1 py-6 border-r border-white/5 last:border-0 text-center">
              <div className="text-2xl font-black text-white/80">{s.n}<span className="text-red-600">{s.u}</span></div>
              <div className="text-white/30 text-xs tracking-widest uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services — dark cards */}
      <section className="py-24 px-10" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-red-600/60 text-xs tracking-[0.5em] uppercase mb-3">— Especialidades —</div>
            <h2 className="text-3xl font-thin uppercase tracking-[0.2em] text-white/80">Nuestros Servicios</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.03)" }}>
            {[
              { n: "01", title: "Mantenimiento", desc: "Preventivo y correctivo, disponible 24/7 para su operación." },
              { n: "02", title: "Moldeo", desc: "Inyección de plástico de alta precisión para maquiladoras." },
              { n: "03", title: "HVAC", desc: "Climatización industrial de alto rendimiento." },
              { n: "04", title: "Obra Civil", desc: "Construcción y ampliación de plantas industriales." },
              { n: "05", title: "Eléctrico", desc: "Subestaciones y sistemas eléctricos industriales." },
              { n: "06", title: "Seguridad", desc: "Cumplimiento normativo NOM y control de riesgos." },
            ].map((s, i) => (
              <div key={i} className="p-8 group hover:bg-red-950/20 transition-colors cursor-pointer" style={{ background: "#0a0a0a" }}>
                <div className="text-red-900 text-xs font-black tracking-widest mb-4">{s.n}</div>
                <div className="h-px w-8 bg-red-600/30 group-hover:bg-red-600 transition-colors mb-4" />
                <h3 className="text-white/70 font-light uppercase tracking-widest text-sm mb-3 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(127,29,29,0.2) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <div className="text-white/20 text-xs tracking-[0.5em] uppercase mb-4">Contáctanos</div>
          <h2 className="text-4xl font-thin uppercase tracking-[0.15em] text-white/80 mb-8">
            ¿Listo para trabajar<br /><span className="font-black text-white">juntos?</span>
          </h2>
          <button className="bg-red-700 hover:bg-red-600 text-white text-xs font-light tracking-[0.4em] uppercase px-12 py-5 transition-all">
            Iniciar proyecto →
          </button>
        </div>
      </section>
    </div>
  );
}
