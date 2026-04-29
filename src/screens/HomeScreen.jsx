import { useState, useRef, useEffect } from 'react'
import { COUNTRIES } from '../data.js'

export default function HomeScreen({ theme, onToggleTheme, onNavigate, onPickCountry }) {
  const [rolling, setRolling] = useState(false)
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
        setRolling(false)
        onPickCountry(COUNTRIES[idx])
      }
    }, 60)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const restaurantCount = new Set(COUNTRIES.map(c => c.restaurant)).size

  return (
    <div className="screen home home-v2">
      <div className="home-top-v2">
        <div className="kicker">{COUNTRIES.length} países · {restaurantCount} restaurantes</div>
        <h1 className="home-title-v2">
          Comidas<br/>
          do Mundo<br/>
          em <span className="hl">São Paulo</span>
        </h1>
      </div>

      <div className="home-actions-v2">
        <button className="big-btn primary" onClick={() => onNavigate('list')}>
          <span className="big-btn-label">ver lista</span>
          <span className="big-btn-meta">países por grupo da Copa</span>
          <span className="big-btn-arrow">→</span>
        </button>
        <button className="big-btn" onClick={handleRoll} disabled={rolling}>
          <span className="big-btn-label">{rolling ? 'sorteando…' : 'aleatório'}</span>
          <span className="big-btn-meta">{rolling ? '🎲' : 'sorteie um país pra hoje'}</span>
          <span className="big-btn-arrow">{rolling ? '🎲' : '↗'}</span>
        </button>
      </div>

      <div className="home-foot">
        <span>SP · Copa 2026</span>
        <button className="theme-btn" onClick={onToggleTheme} title="Alternar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}
