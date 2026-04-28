// Tela Home — título grande + 2 botões: ver lista e aleatório
const { useState, useRef, useEffect } = React;

function HomeScreen({ tweaks, onNavigate, onPickCountry }) {
  const [rolling, setRolling] = useState(false);
  const intervalRef = useRef(null);

  const handleRoll = () => {
    if (rolling) return;
    setRolling(true);
    let ticks = 0;
    const total = 14 + Math.floor(Math.random() * 6);
    intervalRef.current = setInterval(() => {
      ticks++;
      if (ticks >= total) {
        clearInterval(intervalRef.current);
        const finalIdx = Math.floor(Math.random() * COUNTRIES.length);
        setRolling(false);
        onPickCountry(COUNTRIES[finalIdx]);
      }
    }, 60);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="screen home home-v2">
      <div className="home-top-v2">
        <div className="kicker">{COUNTRIES.length} países · {new Set(COUNTRIES.map(c => c.restaurant)).size} restaurantes</div>
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
        <button className="big-btn secondary" onClick={handleRoll} disabled={rolling}>
          <span className="big-btn-label">{rolling ? 'sorteando…' : 'aleatório'}</span>
          <span className="big-btn-meta">{rolling ? '🎲' : 'sorteie um país pra hoje'}</span>
          <span className="big-btn-arrow">{rolling ? '🎲' : '↗'}</span>
        </button>
      </div>

      <div className="home-foot">
        <span>SP · Copa 2026</span>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
