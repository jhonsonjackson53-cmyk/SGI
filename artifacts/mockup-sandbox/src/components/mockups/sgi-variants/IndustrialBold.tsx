export function IndustrialBold() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-black text-white text-lg">S</div>
          <span className="font-black text-white tracking-widest text-sm uppercase">SGI</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest text-zinc-400 uppercase">
          <a href="#" className="hover:text-red-500 transition-colors">Servicios</a>
          <a href="#" className="hover:text-red-500 transition-colors">Proyectos</a>
          <a href="#" className="hover:text-red-500 transition-colors">Nosotros</a>
          <a href="#" className="hover:text-red-500 transition-colors">Contacto</a>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-widest uppercase px-5 py-2.5 transition-colors">
          Cotizar →
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center">
        {/* Vertical red bar accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-red-600/20" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #fff 39px, #fff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #fff 39px, #fff 40px)" }} />

        <div className="relative z-10 px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-red-600" />
            <span className="text-red-500 text-xs font-black tracking-[0.3em] uppercase">Nogales, Sonora · México</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tight mb-0">
            <span className="block text-white">SOLU</span>
            <span className="block text-red-600">CIONES</span>
            <span className="block text-zinc-500">INDUS</span>
            <span className="block text-white">TRIALES</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row gap-6 items-start">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs border-l-2 border-red-600 pl-4">
              Mantenimiento especializado, moldeo por inyección, HVAC y obra civil para operaciones que no se detienen.
            </p>
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-widest uppercase px-8 py-4 transition-colors">
                Solicitar cotización
              </button>
              <button className="border border-zinc-700 hover:border-red-600 text-zinc-400 hover:text-white text-xs font-black tracking-widest uppercase px-8 py-4 transition-colors">
                Ver servicios
              </button>
            </div>
          </div>
        </div>

        {/* Stats block */}
        <div className="absolute bottom-0 right-0 flex border-t border-l border-zinc-800">
          {[
            { n: "15+", l: "Años" },
            { n: "200+", l: "Proyectos" },
            { n: "24/7", l: "Soporte" },
            { n: "50+", l: "Clientes" },
          ].map((s, i) => (
            <div key={i} className="px-8 py-6 border-r border-zinc-800 text-center">
              <div className="text-3xl font-black text-red-600">{s.n}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-red-600 py-4 flex items-center gap-0 overflow-hidden">
        {["Mantenimiento Industrial", "Moldeo por Inyección", "HVAC", "Obra Civil", "Instalaciones Eléctricas", "Seguridad Industrial"].map((s, i) => (
          <span key={i} className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap px-8 border-r border-red-500 last:border-0">
            {s}
          </span>
        ))}
      </section>

      {/* Services grid */}
      <section className="py-20 px-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-6 h-0.5 bg-red-600" />
          <span className="text-red-500 text-xs font-black tracking-[0.3em] uppercase">Nuestros servicios</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-zinc-800">
          {[
            { icon: "⚙️", title: "Mantenimiento", desc: "Preventivo y correctivo 24/7" },
            { icon: "🏭", title: "Moldeo", desc: "Inyección de plástico de precisión" },
            { icon: "❄️", title: "HVAC", desc: "Climatización industrial" },
            { icon: "🏗️", title: "Obra Civil", desc: "Construcción y remodelación" },
            { icon: "⚡", title: "Eléctrico", desc: "Instalaciones y subestaciones" },
            { icon: "🛡️", title: "Seguridad", desc: "NOM y control de riesgos" },
          ].map((s, i) => (
            <div key={i} className="bg-zinc-950 p-8 group hover:bg-zinc-900 transition-colors cursor-pointer">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-black uppercase text-sm tracking-widest mb-2 group-hover:text-red-500 transition-colors">{s.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-16 px-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black uppercase text-white mb-2">¿Necesitas soporte<br /><span className="text-red-600">inmediato?</span></h2>
          <p className="text-zinc-500 text-sm">Respuesta en menos de 2 horas</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm px-10 py-5 transition-colors">
          Contactar ahora →
        </button>
      </section>
    </div>
  );
}
