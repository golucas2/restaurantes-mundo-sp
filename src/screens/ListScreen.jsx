import { useState, useMemo } from 'react'
import { COUNTRIES } from '../data.js'

const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export default function ListScreen({ onBack, onPickCountry }) {
  const [query, setQuery] = useState('')

  const groupsMap = useMemo(() => {
    const m = {}
    GROUP_LETTERS.forEach(g => { m[g] = [] })
    COUNTRIES.forEach(c => {
      if (!c.group) return
      const q = query.trim().toLowerCase()
      if (q && !c.name.toLowerCase().includes(q) &&
               !c.dish.toLowerCase().includes(q) &&
               !c.restaurant.toLowerCase().includes(q)) return
      m[c.group].push(c)
    })
    return m
  }, [query])

  const totalShown = Object.values(groupsMap).reduce((a, arr) => a + arr.length, 0)

  return (
    <div className="screen list-v2">
      <div className="list-header">
        <button className="back-btn" onClick={onBack}>‹ voltar</button>
        <div className="list-title-block">
          <div className="kicker">Copa do Mundo 2026</div>
          <h2 className="list-title">Países da Copa<br/>e onde comê-los</h2>
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
        {GROUP_LETTERS.map(g => {
          const items = groupsMap[g]
          if (items.length === 0 && query) return null
          return (
            <section key={g} className="group-block">
              <header className="group-header">
                <span className="group-letter">Grupo {g}</span>
                <span className="group-rule" />
                <span className="group-count">{items.length} {items.length === 1 ? 'país' : 'países'}</span>
              </header>
              <div className="group-grid">
                {items.map((c, i) => (
                  <button key={c.code + i} className="flag-tile" onClick={() => onPickCountry(c)}>
                    <span className="flag-tile-flag">{c.flag}</span>
                    <span className="flag-tile-name">{c.name}</span>
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
      </div>
    </div>
  )
}
