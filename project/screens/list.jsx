// Tela Lista — agrupada por grupo da Copa 2026
// Apenas países que estão na Copa (group !== null)

const { useState: useStateList, useMemo: useMemoList } = React;

const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

function ListScreen({ tweaks, onBack, onPickCountry }) {
  const [query, setQuery] = useStateList('');

  const groupsMap = useMemoList(() => {
    const m = {};
    GROUP_LETTERS.forEach(g => { m[g] = []; });
    COUNTRIES.forEach(c => {
      if (!c.group) return;
      const q = query.trim().toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.dish.toLowerCase().includes(q) && !c.restaurant.toLowerCase().includes(q)) return;
      if (m[c.group]) m[c.group].push(c);
    });
    return m;
  }, [query]);

  const totalShown = Object.values(groupsMap).reduce((a, arr) => a + arr.length, 0);

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
          const items = groupsMap[g];
          if (items.length === 0 && query) return null;
          return (
            <section key={g} className="group-block">
              <header className="group-header">
                <span className="group-letter">Grupo {g}</span>
                <span className="group-rule"></span>
                <span className="group-count">{items.length} {items.length === 1 ? 'país' : 'países'}</span>
              </header>
              <div className="group-grid">
                {items.map((c, i) => (
                  <button
                    key={c.code + i}
                    className="flag-tile"
                    onClick={() => onPickCountry(c)}
                  >
                    <span className="flag-tile-flag">{c.flag}</span>
                    <span className="flag-tile-name">{c.name}</span>
                  </button>
                ))}
                {items.length === 0 && (
                  <div className="group-empty">— sem resultados</div>
                )}
              </div>
            </section>
          );
        })}
        {totalShown === 0 && query && (
          <div className="empty-state">
            nada encontrado pra "{query}".<br/>
            <button onClick={() => setQuery('')}>limpar busca</button>
          </div>
        )}
      </div>
    </div>
  );
}

// helper de gradiente reaproveitado pelo detail
function photoGradient(code) {
  const palettes = [
    ['#f4c95d','#e07a3c'], ['#5d8a8b','#1e3a4a'], ['#c84b3a','#5a1a14'],
    ['#7da37d','#2e4d2e'], ['#d8c19f','#6f5235'], ['#a4b8c4','#3d5366'],
    ['#e0a87a','#7a4a2e'], ['#9aa68f','#3d4a35'], ['#cf9fa2','#6d3a40'],
    ['#7a98b8','#2c3f5a'],
  ];
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0;
  const p = palettes[h % palettes.length];
  return `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 100%)`;
}

window.ListScreen = ListScreen;
window.photoGradient = photoGradient;
