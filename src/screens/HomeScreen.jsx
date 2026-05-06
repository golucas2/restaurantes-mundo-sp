import { useState, useRef, useEffect } from 'react'
import { COUNTRIES } from '../data.js'

export default function HomeScreen({ theme, onToggleTheme, onNavigate, onPickCountry }) {
  const [rolling, setRolling] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const intervalRef = useRef(null)

  const handleRoll = () => {
    if (rolling) return
    setRolling(true)
    let ticks = 0
    const total = 14 + Math.floor(Math.random() * 6)
    intervalRef.current = setInterval(() => {
      ticks++
      if (ticks >= total) {
        clearInterval(intervalRef.current)
        const idx = Math.floor(Math.random() * COUNTRIES.length)
        const randomList = [...COUNTRIES].sort(() => Math.random() - 0.5)
        setRolling(false)
        onPickCountry(COUNTRIES[idx], randomList)
      }
    }, 60)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div className="screen home home-v2">
      <div className="home-top-v2">
        <h1 className="home-title-v2">
          Comidas<br/>
          do Mundo<br/>
          em <span className="hl">São Paulo</span>
        </h1>
      </div>

      <div className="home-actions-v2">
        <button className="big-btn primary" onClick={() => onNavigate('list')}>
          <span className="big-btn-label">por grupos da copa</span>
          <span className="big-btn-arrow">→</span>
        </button>
        <button className="big-btn" onClick={() => onNavigate('list-continent')}>
          <span className="big-btn-label">por continente</span>
          <span className="big-btn-arrow">→</span>
        </button>
        <button className="big-btn" onClick={() => onNavigate('map')}>
          <span className="big-btn-label">ver mapa da cidade</span>
          <span className="big-btn-arrow">→</span>
        </button>
        <button className="big-btn" onClick={handleRoll} disabled={rolling}>
          <span className="big-btn-label">{rolling ? 'sorteando…' : 'aleatório'}</span>
          <span className="big-btn-arrow">{rolling ? '🎲' : '→'}</span>
        </button>
      </div>

      <div className="home-foot">
        <button className="home-foot-link" onClick={() => setAboutOpen(true)}>
          Sobre o projeto
        </button>
        <a
          className="home-foot-link"
          href="https://www.linkedin.com/in/eugolucas/"
          target="_blank"
          rel="noreferrer"
        >
          Me adicione no LinkedIn
        </a>
        <button className="theme-btn" onClick={onToggleTheme} title="Alternar tema" />

      </div>

      <div className="home-version">Comidas do Mundo 1.0 · maio de 2026</div>

      {aboutOpen && (
        <div className="modal-overlay" onClick={() => setAboutOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAboutOpen(false)}>×</button>
            <h3 className="modal-title">Sobre o projeto</h3>
            <p className="modal-text">
              Há quem diga que a cidade de São Paulo é o mundo e que nela se encontra a culinária de qualquer lugar do mundo. Decidi usar minha inquietude para validar esta hipótese e, de quebra, aprender novas ferramentas me divertindo.
            </p>
            <p className="modal-text">
              Este projeto nasceu do encontro de dois dos meus hiperfocos mais duradouros: a Copa do Mundo e o design de informação. A ideia foi simples: mapear onde comer um prato de cada país que vai disputar a copa de 2026 e testar possibilidades no Claude Design.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
