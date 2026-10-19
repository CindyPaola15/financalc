import { useState } from 'react'

function CalculatorForm({ tipoCalculo, onCalcular }) {
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [anios, setAnios] = useState('')
  const [error, setError] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()

    const monto = Number(capital)
    const interesAnual = Number(tasa)
    const plazo = Number(anios)

    if (capital.trim() === '' || tasa.trim() === '' || anios.trim() === '') {
      setError('Completa todos los campos para continuar.')
      return
    }

    if (
      !Number.isFinite(monto) ||
      !Number.isFinite(interesAnual) ||
      !Number.isFinite(plazo) ||
      monto <= 0 ||
      interesAnual < 0 ||
      plazo <= 0
    ) {
      setError('Introduce valores válidos. El capital y el plazo deben ser mayores que cero.')
      return
    }

    if (plazo > 100) {
      setError('El plazo máximo permitido es de 100 años.')
      return
    }

    setError('')
    onCalcular({
      capital: monto,
      tasaAnual: interesAnual,
      anios: plazo,
    })
  }

  function limpiarFormulario() {
    setCapital('')
    setTasa('')
    setAnios('')
    setError('')
    onCalcular(null)
  }

  const etiquetas = {
    prestamo: 'Monto del préstamo',
    simple: 'Capital inicial',
    compuesto: 'Capital inicial',
    ahorro: 'Depósito inicial',
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <div className="campo">
        <label htmlFor="capital">{etiquetas[tipoCalculo]}</label>
        <div className="entrada-con-prefijo">
          <span>RD$</span>
          <input
            id="capital"
            type="number"
            min="0.01"
            step="any"
            value={capital}
            onChange={(evento) => setCapital(evento.target.value)}
            placeholder="Ej. 50000"
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="tasa">Tasa de interés anual (%)</label>
        <div className="entrada-con-prefijo">
          <input
            id="tasa"
            type="number"
            min="0"
            step="any"
            value={tasa}
            onChange={(evento) => setTasa(evento.target.value)}
            placeholder="Ej. 12"
            required
          />
          <span>%</span>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="anios">Plazo en años</label>
        <input
          id="anios"
          type="number"
          min="0.01"
          max="100"
          step="any"
          value={anios}
          onChange={(evento) => setAnios(evento.target.value)}
          placeholder="Ej. 3"
          required
        />
      </div>

      {error && (
        <p className="mensaje-error" role="alert">
          {error}
        </p>
      )}

      <div className="acciones-formulario">
        <button className="boton-calcular" type="submit">
          Calcular resultado
        </button>
        <button
          className="boton-limpiar"
          type="button"
          onClick={limpiarFormulario}
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}

export default CalculatorForm