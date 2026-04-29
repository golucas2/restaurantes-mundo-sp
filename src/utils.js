const PALETTES = [
  ['#f4c95d','#e07a3c'], ['#5d8a8b','#1e3a4a'], ['#c84b3a','#5a1a14'],
  ['#7da37d','#2e4d2e'], ['#d8c19f','#6f5235'], ['#a4b8c4','#3d5366'],
  ['#e0a87a','#7a4a2e'], ['#9aa68f','#3d4a35'], ['#cf9fa2','#6d3a40'],
  ['#7a98b8','#2c3f5a'],
]

export function photoGradient(code) {
  let h = 0
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0
  const p = PALETTES[h % PALETTES.length]
  return `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 100%)`
}
