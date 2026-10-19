function formatearMoneda(cantidad) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cantidad)
}

function ResultCard({ tipoCalculo, resultado }) {
  if (!resultado) {
    return (
      <section className="tarjeta-resultado vacia">
        <div className="icono-resultado" aria-hidden="true">
          RD$
        </div>
        <h2>Tu resultado aparecerá aquí</h2>
        <p>
          Completa los datos y pulsa «Calcular resultado» para ver el
          desglose de tu operación financiera.
        </p>
      </section>
    )
  }

  const esPrestamo = tipoCalculo === 'prestamo'
  const esAhorro = tipoCalculo === 'ahorro'

  const resultadoPrincipal = esPrestamo
    ? resultado.cuotaMensual
    : resultado.total

  const etiquetaPrincipal = esPrestamo
    ? 'Cuota mensual estimada'
    : esAhorro
      ? 'Ahorro final estimado'
      : 'Monto total estimado'

  const interes = esAhorro
    ? resultado.ganancia
    : resultado.interes

  return (
    <section className="tarjeta-resultado" aria-live="polite">
      <p className="etiqueta-resultado">{etiquetaPrincipal}</p>

      <p className="monto-principal">
        {formatearMoneda(resultadoPrincipal)}
      </p>

      <div className="detalle-resultado">
        <div className="fila-resultado">
          <span>Capital inicial</span>
          <strong>{formatearMoneda(resultado.capital)}</strong>
        </div>

        <div className="fila-resultado">
          <span>{esAhorro ? 'Ganancia estimada' : 'Intereses'}</span>
          <strong>{formatearMoneda(interes)}</strong>
        </div>

        <div className="fila-resultado">
          <span>
            {esPrestamo ? 'Total a pagar' : 'Capital + intereses'}
          </span>
          <strong>{formatearMoneda(resultado.total)}</strong>
        </div>
      </div>

      <p className="nota-resultado">
        {esPrestamo
          ? 'Estimación con cuotas mensuales. No incluye posibles cargos adicionales.'
          : 'Estimación basada en la tasa y el plazo introducidos.'}
      </p>
    </section>
  )
}

export default ResultCard