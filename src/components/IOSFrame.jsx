export function IOSDevice({ children, dark = false }) {
  return (
    <div style={{
      width: 402, height: 'min(874px, 100dvh)', borderRadius: 0, overflow: 'hidden',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {children}
    </div>
  )
}
