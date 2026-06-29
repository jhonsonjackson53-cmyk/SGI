export function CorporateClean() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
            <span className="text-white font-black text-sm">SGI</span>
          </div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-none">Servicios Generales</div>
            <div className="text-gray-400 text-xs">de Ingeniería</div>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-red-600 transition-colors">Servicios</a>
          <a href="#" className="hover:text-red-600 transition-colors">Proyectos</a>
          <a href="#" className="hover:text-red-600 transition-colors">Nosotros</a>
          <a href="#" className="hover:text-red-600 transition-colors">Contacto</a>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
          Solicitar cotización
        </button>
      </nav>

      {/* Hero */}
      <section className="bg-white pt-20 pb-24 px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              Nogales, Sonora · México
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Soluciones industriales <span className="text-red-600">confiables</span> para tu operación
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Mantenimiento, moldeo por inyección, HVAC y construcción civil para empresas que no pueden detenerse. 15 años respaldando la industria en el norte de México.
            </p>
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
                Cotizar ahora
              </button>
              <button className="border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-8 py-3.5 rounded-lg transition-colors">
                Ver servicios
              </button>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-gray-900 rounded-2xl p-8 grid grid-cols-2 gap-6">
            {[
              { n: "15+", l: "Años de experiencia" },
              { n: "200+", l: "Proyectos entregados" },
              { n: "24/7", l: "Soporte disponible" },
              { n: "50+", l: "Clientes activos" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-red-500 mb-1">{s.n}</div>
                <div className="text-gray-400 text-xs leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-600 text-sm font-bold uppercase tracking-widest">Lo que hacemos</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Servicios especializados</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "⚙️", title: "Mantenimiento Industrial", desc: "Preventivo y correctivo las 24 horas, 7 días a la semana." },
              { icon: "🏭", title: "Moldeo por Inyección", desc: "Fabricación de piezas plásticas de alta precisión." },
              { icon: "❄️", title: "HVAC", desc: "Diseño, instalación y mantenimiento de sistemas de climatización." },
              { icon: "🏗️", title: "Obra Civil", desc: "Construcción, ampliación y remodelación de instalaciones." },
              { icon: "⚡", title: "Instalaciones Eléctricas", desc: "Sistemas eléctricos industriales y subestaciones." },
              { icon: "🛡️", title: "Seguridad Industrial", desc: "Cumplimiento NOM y control de riesgos." },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-red-600 py-14 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">¿Necesitas apoyo para tu operación industrial?</h2>
          <p className="text-red-100 mb-8">Contacta con nuestros especialistas hoy mismo. Respuesta garantizada en menos de 2 horas.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-red-600 font-bold px-8 py-3.5 rounded-lg transition-colors">
              Solicitar cotización
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-lg transition-colors">
              WhatsApp directo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
