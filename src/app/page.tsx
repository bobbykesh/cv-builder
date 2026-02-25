export default function Home() {
  return (
    <main>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'var(--font-nunito), sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            color: '#002d6b',
            fontFamily: 'var(--font-domine), serif',
          }}
        >
          PerfectCV
        </h1>
        <p style={{ fontSize: '1.8rem', color: '#68778b' }}>
          Free CV Builder — Coming Soon
        </p>
        <p style={{ fontSize: '1.4rem', color: '#ccc6bf' }}>
          Foundation loaded successfully ✓
        </p>
      </div>
    </main>
  );
}
