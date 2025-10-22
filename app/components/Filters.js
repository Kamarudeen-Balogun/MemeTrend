'use client';

export default function Filters({ state, onFilterChange, theme, onThemeToggle }) {
  const chains = [
    { id: 'solana', name: 'Solana' },
    { id: 'base', name: 'Base' },
    { id: 'eth', name: 'Ethereum' },
    { id: 'bsc', name: 'BSC' },
    { id: 'arbitrum', name: 'Arbitrum' },
    { id: 'blast', name: 'Blast' }
  ];

  return (
    <>
      <div className="glass filters">
        <div className="filter-group" id="chain-filters" aria-label="Chains">
          {chains.map(chain => (
            <button
              key={chain.id}
              className={`filter-btn ${state.chain === chain.id ? 'active' : ''}`}
              onClick={() => onFilterChange('chain', chain.id)}
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>

      <div className="glass theme-container">
        <button 
          onClick={onThemeToggle}
          className="theme-toggle" 
          title="Toggle light/dark theme"
          aria-pressed={theme === 'light'}
        >
          <span className="dot" aria-hidden="true"></span>
          <span className="theme-label">Theme</span>
        </button>
      </div>
    </>
  );
}