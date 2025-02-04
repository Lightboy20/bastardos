import { useState } from "react";
import "./App.css";

function App() {
  const [horariosVisibles, setHorariosVisibles] = useState(false);
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [horarios, setHorarios] = useState({});
  const adminMode = false; // Cambiar a true para permitir ediciones solo al administrador

  const mostrarHorarios = (dia) => {
    setDiaSeleccionado(dia);
    setHorariosVisibles(true);

    if (!horarios[dia]) {
      setHorarios((prev) => ({
        ...prev,
        [dia]: Array.from({ length: 11 }, (_, i) => ({
          hora: 10 + i,
          estado: "Disponible",
        })),
      }));
    }
  };

  const actualizarHorario = (dia, index, valor) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: prev[dia].map((item, i) =>
        i === index ? { ...item, estado: valor } : item
      ),
    }));
  };

  return (
    <div className="fondo-animado">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="linea-movimiento"
          style={{ top: `${i * 15}%`, animationDelay: `${i * 0.8}s` }}
        ></div>
      ))}

      <div className="bg-black text-yellow-400 text-center min-h-screen p-4 font-sans">
        <header className="text-3xl p-5 font-bold">Barbería Elite</header>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl">Bienvenido a la mejor barbería de la ciudad</h2>
          <p>Ofrecemos cortes de cabello y afeitados profesionales.</p>

          <h3 className="text-lg mt-4">Nuestros Servicios</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
            <div className="w-full max-w-xs">
              <img
                src="corte.jpg"
                alt="Corte de cabello"
                className="w-full h-auto object-contain rounded-lg"
              />
              <p className="mt-2">Corte de cabello - Estilo moderno y clásico.</p>
            </div>
            <div className="w-full max-w-xs">
              <img
                src="afeitado.jpg"
                alt="Afeitado tradicional"
                className="w-full h-auto object-contain rounded-lg"
              />
              <p className="mt-2">Afeitado con navaja y toallas calientes.</p>
            </div>
          </div>

          <h3 className="text-lg mt-6">Contacto</h3>
          <p>📍 Dirección: Calle Falsa 123</p>
          <p>📧 Email: contacto@barberiaelite.com</p>
          <a
            href="https://wa.link/gpbfvu"
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded inline-block mt-2"
          >
            📞 Contactar por WhatsApp
          </a>

          <h3 className="text-lg mt-6">Selecciona un día</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((dia) => (
              <button
                key={dia}
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded w-32 md:w-40"
                onClick={() => mostrarHorarios(dia)}
              >
                {dia}
              </button>
            ))}
          </div>

          {horariosVisibles && horarios[diaSeleccionado] && (
            <div className="mt-4">
              <h3 className="text-lg">Horarios para {diaSeleccionado}</h3>
              <div className="flex flex-col items-center mt-2 gap-2 w-full">
                {horarios[diaSeleccionado].map((item, index) => (
                  <div
                    key={index}
                    className="border border-yellow-400 p-2 flex flex-col md:flex-row justify-between items-center w-full max-w-md"
                  >
                    <span className="text-base md:text-lg">
                      {item.hora}:00 - {item.hora + 1}:00
                    </span>
                    <input
                      type="text"
                      className="bg-black text-yellow-400 border border-yellow-400 text-center w-full md:w-32 p-1 mt-1 md:mt-0"
                      value={item.estado}
                      readOnly={!adminMode}
                      onChange={(e) => actualizarHorario(diaSeleccionado, index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;