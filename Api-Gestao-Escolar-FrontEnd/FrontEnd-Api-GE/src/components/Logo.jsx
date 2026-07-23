export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg 
        width="36" 
        height="36" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ color: '#3b82f6' }}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
      <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
        Edu<span style={{ color: '#3b82f6' }}>Core</span>
      </span>
    </div>
  );
}