// App — orquestra navegação (home / list / detail)
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [tweaks, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
  const [route, setRoute] = useStateApp({ name: 'home', country: null });
  const [history, setHistory] = useStateApp([]);

  useEffectApp(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme || 'light');
  }, [tweaks.theme]);

  const navigate = (name, country = null) => {
    setHistory(h => [...h, route]);
    setRoute({ name, country });
    requestAnimationFrame(() => {
      const root = document.querySelector('.app-root');
      if (root) root.scrollTop = 0;
    });
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setRoute(prev);
    } else {
      setRoute({ name: 'home', country: null });
    }
    requestAnimationFrame(() => {
      const root = document.querySelector('.app-root');
      if (root) root.scrollTop = 0;
    });
  };

  window.__appNavigate = navigate;

  const pickCountry = (country) => navigate('detail', country);

  let screen;
  if (route.name === 'home') {
    screen = <HomeScreen tweaks={tweaks} onNavigate={(name) => navigate(name)} onPickCountry={pickCountry} />;
  } else if (route.name === 'list') {
    screen = <ListScreen tweaks={tweaks} onBack={goBack} onPickCountry={pickCountry} />;
  } else if (route.name === 'detail' && route.country) {
    screen = <DetailScreen country={route.country} onBack={goBack} />;
  }

  const { IOSDevice, IOSStatusBar } = window;

  return (
    <>
      <IOSDevice color="black" theme={tweaks.theme === 'dark' ? 'dark' : 'light'}>
        <IOSStatusBar theme={tweaks.theme === 'dark' ? 'dark' : 'light'} time="13:24" />
        <div className="app-root" data-screen-label={routeLabel(route)}>
          {screen}
        </div>
      </IOSDevice>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Tema">
          <window.TweakRadio
            label="Modo"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'claro' },
              { value: 'dark',  label: 'escuro' },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Navegação">
          <window.TweakButton onClick={() => navigate('home')}>home</window.TweakButton>
          <window.TweakButton onClick={() => navigate('list')}>lista</window.TweakButton>
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

function routeLabel(route) {
  if (route.name === 'home') return 'Home';
  if (route.name === 'list') return 'Lista de países';
  if (route.name === 'detail') return `Detalhe: ${route.country?.name || ''}`;
  return route.name;
}

window.App = App;
