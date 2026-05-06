import { useState, useMemo, useRef } from 'react'
import { COUNTRIES } from '../data.js'

const CONFEDERATIONS = [
  { key: 'UEFA',    label: 'UEFA',    sub: 'Europa' },
  { key: 'CONMEBOL', label: 'CONMEBOL', sub: 'América do Sul' },
  { key: 'CONCACAF', label: 'CONCACAF', sub: 'América do Norte e Caribe' },
  { key: 'CAF',     label: 'CAF',     sub: 'África' },
  { key: 'AFC',     label: 'AFC',     sub: 'Ásia e Oceania' },
  { key: 'OFC',     label: 'OFC',     sub: 'Oceania' },
]

const CONF_ORDERED_LIST = CONFEDERATIONS.flatMap(conf =>
  COUNTRIES.filter(c => c.confederation === conf.key)
)

export default function ListByContinentScreen({ onBack, onPickCountry }) {
  const [query, setQuery] = useState('')
  const topRef = useRef(null)

  const confMap = useMemo(() => {
    const m = {}
    CONFEDERATIONS.forEach(c => { m[c.key] = [] })
    COUNTRIES.forEach(c => {
      const conf = c.confederation
      if (!conf || !m[conf]) return
      const q = query.trim().toLowerCase()
      if (q && !c.name.toLowerCase().includes(q) &&
               !c.dish.toLowerCase().includes(q) &&
               !c.restaurant.toLowerCase().includes(q)) return
      m[conf].push(c)
    })
    return m
  }, [query])

  const totalShown = Object.values(confMap).reduce((a, arr) => a + arr.length, 0)

  return (
    <div className="screen list-v2" ref={topRef}>
      <div className="list-header">
        <div className="back-btn-spacer" />
        <div className="list-title-block">
          <div className="kicker">Por Confederação</div>
          <h2 className="list-title">Comidas do mundo<br/>em São Paulo</h2>
        </div>
      </div>

      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="busque país, prato ou restaurante…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && <button className="search-clear" onClick={() => setQuery('')}>×</button>}
      </div>

      <div className="groups-wrap">
        {CONFEDERATIONS.map(conf => {
          const items = confMap[conf.key]
          if (!items || (items.length === 0 && query)) return null
          return (
            <section key={conf.key} className="group-block">
              <header className="group-header">
                <span className="group-letter">{conf.label}</span>
                <span className="group-rule" />
                <span className="group-count">{conf.sub}</span>
              </header>
              <div className="group-list">
                {items.map((c, i) => (
                  <button key={c.code + i} className="flag-row" onClick={() => onPickCountry(c, CONF_ORDERED_LIST)}>
                    <span className="flag-row-flag">{c.flag}</span>
                    <span className="flag-row-name">{c.name}</span>
                    <span className="flag-row-arrow">›</span>
                  </button>
                ))}
                {items.length === 0 && (
                  <div className="group-empty">— sem resultados</div>
                )}
              </div>
            </section>
          )
        })}

        {totalShown === 0 && query && (
          <div className="empty-state">
            nada encontrado pra "{query}".<br/>
            <button onClick={() => setQuery('')}>limpar busca</button>
          </div>
        )}

        <div className="detail-home-wrap">
          <button className="big-btn rounded" onClick={onBack}>
            <span className="big-btn-arrow">←</span>
            <span className="big-btn-label">VOLTAR À HOME</span>
          </button>
        </div>
      </div>
    </div>
  )
}
