export function calcularInteresSimple(capital, tasaAnual, anios) {
  const interes = capital * (tasaAnual / 100) * anios
  const total = capital + interes

  return {
    interes,
    total,
  }
}

export function calcularInteresCompuesto(capital, tasaAnual, anios) {
  const tasaMensual = tasaAnual / 100 / 12
  const meses = anios * 12
  const total = capital * Math.pow(1 + tasaMensual, meses)
  const interes = total - capital

  return {
    interes,
    total,
  }
}

export function calcularAhorro(capital, tasaAnual, anios) {
  const tasaMensual = tasaAnual / 100 / 12
  const meses = anios * 12
  const total = capital * Math.pow(1 + tasaMensual, meses)
  const ganancia = total - capital

  return {
    ganancia,
    total,
  }
}

export function calcularPrestamo(capital, tasaAnual, anios) {
  const meses = anios * 12
  const tasaMensual = tasaAnual / 100 / 12

  let cuotaMensual

  if (tasaMensual === 0) {
    cuotaMensual = capital / meses
  } else {
    cuotaMensual =
      (capital * tasaMensual) /
      (1 - Math.pow(1 + tasaMensual, -meses))
  }

  const total = cuotaMensual * meses
  const interes = total - capital

  return {
    cuotaMensual,
    interes,
    total,
  }
}