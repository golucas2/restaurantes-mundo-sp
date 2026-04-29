import { useState, useEffect } from 'react'
import { IOSDevice } from './components/IOSFrame.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ListScreen from './screens/ListScreen.jsx'
import DetailScreen from './screens/DetailScreen.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('comidas-theme') || 'light')
  const [route, setRoute] = useState({ name: 'home', country: null })
  const [history, setHistory] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('comidas-theme', theme)
  }, [theme])

  const navigate = (name, country = null) => {
    setHistory(h => [...h, route])
    setRoute({ name, country })
    requestAnimationFrame(() => {
      const root = document.querySelector('.app-root')
      if (root) root.scrollTop = 0
    })
  }

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory(h => h.slice(0, -1))
      setRoute(prev)
    } else {
      setRoute({ name: 'home', country: null })
    }
    requestAnimationFrame(() => {
      const root = document.querySelector('.app-root')
      if (root) root.scrollTop = 0
    })
  }

  const pickCountry = (country) => navigate('detail', country)
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const dark = theme === 'dark'

  let screen
  if (route.name === 'home') {
    screen = (
      <HomeScreen
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={(name) => navigate(name)}
        onPickCountry={pickCountry}
      />
    )
  } else if (route.name === 'list') {
    screen = <ListScreen onBack={goBack} onPickCountry={pickCountry} />
  } else if (route.name === 'detail' && route.country) {
    screen = <DetailScreen country={route.country} onBack={goBack} />
  }

  return (
    <IOSDevice dark={dark}>
      <div className="app-root">
        {screen}
      </div>
    </IOSDevice>
  )
}
