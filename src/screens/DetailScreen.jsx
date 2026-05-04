import { COUNTRIES } from '../data.js'

export default function DetailScreen({ country, onClose, onReplace }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.restaurant + ' ' + country.neighborhood + ' São Paulo')}`
  const instaUrl = `https://www.instagram.com/${country.insta}/`

  const idx = COUNTRIES.findIndex(c => c.code === country.code)
  const prev = idx > 0 ? COUNTRIES[idx - 1] : null
  const next = idx < COUNTRIES.length - 1 ? COUNTRIES[idx + 1] : null

  const handleShare = async () => {
    const text = `${country.flag} ${country.name} em SP: ${country.dish} no ${country.restaurant} (${country.neighborhood})`
    if (navigator.share) {
      await navigator.share({ title: 'Comidas do Mundo em SP', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="screen detail-card-screen">
      <div className="detail-nav-row">
        {prev ? (
          <button className="detail-nav-btn" onClick={() => onReplace(prev)}>‹</button>
        ) : <span />}

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
                GOOGLE MAPS
              </a>
              <a className="detail-action-btn" href={instaUrl} target="_blank" rel="noreferrer">
                INSTAGRAM
              </a>
            </div>
            <button className="detail-action-btn full" onClick={handleShare}>
              COMPARTILHAR
            </button>
          </div>
        </div>

        {next ? (
          <button className="detail-nav-btn" onClick={() => onReplace(next)}>›</button>
        ) : <span />}
      </div>

      <button className="detail-back-link" onClick={onClose}>← voltar</button>
    </div>
  )
}
