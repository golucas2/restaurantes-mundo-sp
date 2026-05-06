import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { COUNTRIES, BAIRRO_COORDS } from '../data.js'

// Jitter so overlapping pins in the same bairro spread out
const jitter = (base, i) => [
  base[0] + (Math.random() - 0.5) * 0.004,
  base[1] + (Math.random() - 0.5) * 0.004,
]

export default function MapScreen({ onBack, onPickCountry }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [-23.565, -46.655],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)

    COUNTRIES.forEach((c, i) => {
      const coords = c.coords || BAIRRO_COORDS[c.neighborhood] || [-23.565, -46.655]

      const icon = L.divIcon({
        className: '',
        html: `<span class="map-pin">${c.flag}</span>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })

      const marker = L.marker(coords, { icon, title: `${c.name} — ${c.restaurant}` })
      marker.on('click', () => onPickCountry(c))
      marker.addTo(map)
    })

    instanceRef.current = map
    return () => {
      map.remove()
      instanceRef.current = null
    }
  }, [])

  return (
    <div className="screen map-screen">
      <div className="list-header">
        <button className="back-btn" onClick={onBack}>‹</button>
        <div className="list-title-block">
          <div className="kicker">Pelo mapa da cidade</div>
          <h2 className="list-title">Mapa da cidade</h2>
          <p className="map-sub">Toque numa bandeira pra ver a ficha do país.</p>
        </div>
      </div>

      <div className="map-box-wrap">
        <div ref={mapRef} className="map-container" />
      </div>
      <p className="map-disclaimer">⚠ As localizações são aproximadas e podem não refletir o endereço exato do restaurante.</p>
      <div className="detail-home-wrap">
        <button className="big-btn rounded" onClick={onBack}>
          <span className="big-btn-arrow">←</span>
          <span className="big-btn-label">VOLTAR À HOME</span>
        </button>
      </div>
    </div>
  )
}
