import { photoGradient } from '../utils.js'

export default function DetailScreen({ country, onBack }) {
  const grad = photoGradient(country.code)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.restaurant + ' ' + country.neighborhood + ' São Paulo')}`
  const instaUrl = `https://www.instagram.com/${country.insta}/`

  const handleShare = async () => {
    const text = `${country.flag} ${country.name} em SP: ${country.dish} no ${country.restaurant} (${country.neighborhood})`
    if (navigator.share) {
      await navigator.share({ title: 'Comidas do Mundo em SP', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="screen detail">
      <div className="detail-hero" style={{ background: grad }}>
        <button className="back-btn back-btn-overlay" onClick={onBack}>‹ voltar</button>
        <div className="detail-hero-flag">{country.flag}</div>
        <div>
          <div className="detail-continent">{country.continent}</div>
          <h1 className="detail-country">{country.name}</h1>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-section">
          <div className="kicker">prato típico</div>
          <h2 className="detail-dish">{country.dish}</h2>
          {country.note && <p className="detail-note">{country.note}</p>}
        </div>

        <div className="detail-divider" />

        <div className="detail-section">
          <div className="kicker">onde comer em SP</div>
          <h3 className="detail-rest">{country.restaurant}</h3>
          <div className="detail-rest-meta">
            <span>📍 {country.neighborhood}</span>
            {country.rating !== '—' && (
              <span className="meta-rating">★ {country.rating} no Maps</span>
            )}
          </div>
        </div>

        <div className="detail-actions">
          <a className="action-btn primary" href={mapsUrl} target="_blank" rel="noreferrer">
            <span className="action-icon">🗺️</span>
            <span>abrir no Maps</span>
          </a>
          <a className="action-btn" href={instaUrl} target="_blank" rel="noreferrer">
            <span className="action-icon">@</span>
            <span>Instagram</span>
          </a>
          <button className="action-btn" onClick={handleShare}>
            <span className="action-icon">↗</span>
            <span>compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
