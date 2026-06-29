export function DiagonalAccent() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 skew-x-[-8deg] flex items-center justify-center">
            <span className="text-white font-black text-sm skew-x-[8deg]">SGI</span>
          </div>
          <div className="leading-none">
            <div className="font-black text-white text-sm uppercase tracking-wider">Ingeniería</div>
            <div className="text-gray-500 text-xs">Nogales, Sonora</div>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          <a href="#" className="hover:text-red-400 transition-colors">Servicios</a>
          <a href="#" className="hover:text-red-400 transition-colors">Proyectos</a>
          <a href="#" className="hover:text-red-400 transition-colors">Nosotros</a>
        </div>
        <button className="relative bg-red-600 hover:bg-red-500 text-white text-xs font-black tracking-widest uppercase px-6 py-3 skew-x-[-8deg] transition-colors">
          <span className="skew-x-[8deg] inline-block">Cotizar</span>
        </button>
      </nav>

      {/* Hero — diagonal split */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Diagonal red panel */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)", background: "linear-gradient(135deg, #dc2626, #991b1b)" }} />

        {/* Red diagonal outline accent */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-30"
          style={{ clipPath: "polygon(18% 0, 20% 0, 0% 100%, -2% 100%)", background: "#ef4444" }} />

        <div className="relative z-10 px-10 lg:px-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-red-600 skew-x-[-20deg]" />
            <span className="text-red-500 text-xs font-black tracking-[0.3em] uppercase">Servicios Industriales</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6">
            <span className="block text-white">Calidad</span>
            <span className="block text-red-600" style={{ WebkitTextStroke: "1px #ef4444", color: "transparent" }}>sin</span>
            <span className="block text-white">límites</span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
            Mantenimiento industrial, moldeo, HVAC y obra civil. Operamos 24/7 porque tu planta no puede parar.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs px-8 py-4 skew-x-[-8deg] transition-colors">
              <span className="skew-x-[8deg] inline-block">Solicitar cotización →</span>
            </button>
            <button className="border-2 border-gray-700 hover:border-red-600 text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs px-8 py-4 skew-x-[-8deg] transition-all">
              <span className="skew-x-[8deg] inline-block">Ver proyectos</span>
            </button>
          </div>
        </div>

        {/* Stats on the red panel */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-right space-y-6">
          {[
            { n: "15+", l: "Años" },
            { n: "200+", l: "Proyectos" },
            { n: "24/7", l: "Soporte" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-white">{s.n}</div>
              <div className="text-red-200 text-xs uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services — staggered layout */}
      <section className="py-20 px-10 bg-gray-950">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-8 h-1 bg-red-600 skew-x-[-20deg]" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">Servicios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { n: "01", title: "Mantenimiento Industrial", desc: "Preventivo y correctivo 24/7" },
            { n: "02", title: "Moldeo por Inyección", desc: "Precisión en fabricación plástica" },
            { n: "03", title: "HVAC Industrial", desc: "Climatización de alta demanda" },
            { n: "04", title: "Obra Civil", desc: "Construcción y ampliaciones" },
            { n: "05", title: "Instalaciones Eléctricas", desc: "Potencia y automatización" },
            { n: "06", title: "Seguridad Industrial", desc: "Cumplimiento NOM y riesgos" },
          ].map((s, i) => (
            <div key={i} className={`group flex items-start gap-6 p-6 border-l-2 ${i % 2 === 0 ? "border-red-600" : "border-gray-800"} hover:border-red-600 transition-all cursor-pointer bg-gray-900 hover:bg-gray-800`}>
              <span className="text-gray-700 font-black text-3xl group-hover:text-red-600/30 transition-colors">{s.n}</span>
              <div>
                <h3 className="text-white font-black uppercase tracking-wide text-sm mb-1 group-hover:text-red-400 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — diagonal */}
      <section className="relative py-16 px-10 overflow-hidden" style={{ background: "#dc2626" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 11px)" }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black uppercase text-white mb-2">¿Apoyo inmediato?</h2>
            <p className="text-red-100 text-sm">Respuesta garantizada en menos de 2 horas</p>
          </div>
          <button className="bg-white hover:bg-gray-100 text-red-600 font-black uppercase tracking-widest text-sm px-10 py-4 skew-x-[-8deg] transition-colors whitespace-nowrap">
            <span className="skew-x-[8deg] inline-block">Contactar ahora →</span>
          </button>
        </div>
      </section>
    </div>
  );
}
