const PROJECT_URL = 'https://comidas-mundo-sp.golucas.com.br'

export default function DetailScreen({ country, list, onClose, onReplace }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.restaurant + ' ' + country.neighborhood + ' São Paulo')}`
  const instaUrl = `https://www.instagram.com/${country.insta}/`

  const idx = list.findIndex(c => c.code === country.code)
  const prev = list[(idx - 1 + list.length) % list.length]
  const next = list[(idx + 1) % list.length]

  const handleShare = () => {
    const text = `🌍⚽ Comidas do mundo em SP!\n\nOlha este restaurante com comidas da ${country.name}: ${instaUrl}\n\nTem mais restaurantes aqui ${PROJECT_URL}\n\nBom passeio!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noreferrer')
  }

  const handleShareProject = () => {
    const text = `🌍⚽ Comidas do mundo em SP: onde comer pratos dos países da copa na cidade?\n\nFiz um guia com restaurantes de cada seleção — dá uma olhada!\n${PROJECT_URL}\n\nAté lá!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noreferrer')
  }

  return (
    <div className="screen detail-card-screen">
      <div className="list-header" style={{ width: '100%' }}>
        <div className="back-btn-spacer" />
      </div>
      <div className="detail-nav-row">
        <button className="detail-nav-btn" onClick={() => onReplace(prev)}>‹</button>

        <div className="detail-card">
          {/* Header */}
          <div className="detail-card-header">
            <span className="detail-card-flag">{country.flag}</span>
            <button className="detail-card-close" onClick={onClose}>×</button>
          </div>

          {/* Dish section — dark */}
          <div className="detail-card-dish-block">
            <div className="detail-card-group">GRUPO {country.group}</div>
            <h2 className="detail-card-country">{country.name}</h2>
            <div className="detail-card-section-label">PRATO TÍPICO</div>
            <h3 className="detail-card-dish">{country.dish}</h3>
            <p className="detail-card-dish-desc">
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>{country.dishDesc}</span>
            </p>
          </div>

          {/* Restaurant section — light */}
          <div className="detail-card-rest-block">
            <div className="detail-card-section-label dark">ONDE COMER EM SP</div>
            <h3 className="detail-card-rest-name">{country.restaurant}</h3>
            <div className="detail-card-rest-meta">
              <span className="rest-type-pill">{country.restType}</span>
              <span className="detail-card-bairro">📍 {country.neighborhood}</span>
              {country.rating !== '—' && (
                <span className="detail-card-rating">★ {country.rating}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="detail-card-actions">
            <div className="detail-card-actions-row">
              <a className="detail-action-btn primary" href={mapsUrl} target="_blank" rel="noreferrer">
                MAPS
              </a>
              <a className="detail-action-btn" href={instaUrl} target="_blank" rel="noreferrer">
                INSTAGRAM
              </a>
            </div>
            <button className="detail-action-btn full" onClick={handleShare}>
              ENVIAR PARA O ZAP
            </button>
          </div>
        </div>

        <button className="detail-nav-btn" onClick={() => onReplace(next)}>›</button>
      </div>

      <div className="detail-home-wrap">
        <button className="big-btn" onClick={onClose}>
          <span className="big-btn-arrow">←</span>
          <span className="big-btn-label">VOLTAR</span>
        </button>
        <button className="big-btn" onClick={handleShareProject}>
          <span className="big-btn-label">COMPARTILHAR O PROJETO</span>
          <span className="big-btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}
