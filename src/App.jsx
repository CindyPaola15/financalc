import { useState } from 'react'
import './App.css'
import CalculatorForm from './components/CalculatorForm'
import ResultCard from './components/ResultCard'

import {
  calcularInteresSimple,
  calcularInteresCompuesto,
  calcularAhorro,
  calcularPrestamo,
} from './utils/finance'

function App() {
  const [tipoCalculo, setTipoCalculo] = useState('prestamo')
  const [resultado, setResultado] = useState(null)

  const tipos = [
    { id: 'prestamo', nombre: 'Préstamos' },
    { id: 'simple', nombre: 'Interés simple' },
    { id: 'compuesto', nombre: 'Interés compuesto' },
    { id: 'ahorro', nombre: 'Ahorro' },
  ]

  function cambiarTipo(nuevoTipo) {
    setTipoCalculo(nuevoTipo)
    setResultado(null)
  }

  function calcular(datos) {
    if (!datos) {
      setResultado(null)
      return
    }

    const { capital, tasaAnual, anios } = datos
    let nuevoResultado

    switch (tipoCalculo) {
      case 'prestamo':
        nuevoResultado = calcularPrestamo(capital, tasaAnual, anios)
        break

      case 'simple':
        nuevoResultado = calcularInteresSimple(capital, tasaAnual, anios)
        break

      case 'compuesto':
        nuevoResultado = calcularInteresCompuesto(capital, tasaAnual, anios)
        break

      case 'ahorro':
        nuevoResultado = calcularAhorro(capital, tasaAnual, anios)
        break

      default:
        return
    }

    setResultado({ ...nuevoResultado, capital })
  }

  return (
    <main className="app">
      <header className="encabezado">
        <div className="marca">FinanCalc<span className="punto-marca">.</span></div>
        <p>Tu dinero, tus decisiones.</p>
      </header>

      <section className="calculadora">
        <div className="introduccion">
          <span className="etiqueta-superior">HERRAMIENTA FINANCIERA</span>
          <h1>Calcula tu próximo paso.</h1>
          <p>
            Simula operaciones financieras y conoce cuánto podrías pagar,
            ganar o ahorrar.
          </p>
        </div>

        <div className="pestanas" aria-label="Tipo de cálculo">
          {tipos.map((tipo) => (
            <button
              key={tipo.id}
              type="button"
              className={
                tipoCalculo === tipo.id ? 'pestana activa' : 'pestana'
              }
              aria-pressed={tipoCalculo === tipo.id}
              onClick={() => cambiarTipo(tipo.id)}
            >
              {tipo.nombre}
            </button>
          ))}
        </div>

        <div className="zona-calculo">
          <div className="panel-formulario">
            <h2>Introduce tus datos</h2>
            <p className="descripcion-panel">
              Completa los campos para realizar la simulación.
            </p>

            <CalculatorForm
              tipoCalculo={tipoCalculo}
              onCalcular={calcular}
            />
          </div>

          <div className="panel-resultados">
            <h2>Resumen de la operación</h2>
            <ResultCard
              tipoCalculo={tipoCalculo}
              resultado={resultado}
            />
          </div>
        </div>

        <footer className="pie-calculadora">
          <span>FinanCalc · Simulaciones financieras</span>
          <span>Valores expresados en pesos dominicanos (DOP)</span>
        </footer>
      </section>
    </main>
  )
}

export default App