// Tela Detalhe — país + restaurante (sem "mais de" continente)

function DetailScreen({ country, onBack, onShare }) {
  const grad = window.photoGradient ? window.photoGradient(country.code) : 'linear-gradient(135deg,#e07a3c,#5a1a14)';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.restaurant + ' ' + country.neighborhood + ' São Paulo')}`;
  const instaUrl = `https://www.instagram.com/${country.insta}/`;

  return (
    <div className="screen detail">
      <div className="detail-hero" style={{background: grad}}>
        <button className="back-btn back-btn-overlay" onClick={onBack}>‹ voltar</button>
        <div className="detail-hero-flag">{country.flag}</div>
        <div className="detail-hero-meta">
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

        <div className="detail-divider"></div>

        <div className="detail-section">
          <div className="kicker">onde comer em SP</div>
          <h3 className="detail-rest">{country.restaurant}</h3>
          <div className="detail-rest-meta">
            <span className="meta-bairro">📍 {country.neighborhood}</span>
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
          <button className="action-btn" onClick={() => onShare && onShare(country)}>
            <span className="action-icon">↗</span>
            <span>compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

window.DetailScreen = DetailScreen;
