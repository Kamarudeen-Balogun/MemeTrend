'use client';
import { useState, useEffect } from 'react';
import TokenList from './components/TokenList';
import Modal from './components/Modal';
import Filters from './components/Filters';
import { useFarcaster } from './hooks/useFarcaster';

export default function Home() {
  const [state, setState] = useState({ chain: 'solana', time: '1h' });
  const [poolsData, setPoolsData] = useState([]);
  const [included, setIncluded] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  
  // Use Farcaster hook
  const { isFarcaster, isReady } = useFarcaster();

  useEffect(() => {
    // Apply saved theme
    const saved = localStorage.getItem('memetrend_theme');
    if (saved) {
      setTheme(saved);
      document.body.className = saved === 'light' ? 'theme-light' : '';
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark');
      document.body.className = prefersLight ? 'theme-light' : '';
    }

    // Apply Farcaster-specific optimizations
    if (isFarcaster) {
      document.documentElement.style.setProperty('--glass-blur', '4px');
    }
  }, [isFarcaster]);

  useEffect(() => {
    fetchData();
  }, [state.chain, state.time]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/trending?chain=${state.chain}&time=${state.time}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }
      
      setPoolsData(data.data || []);
      setIncluded(data.included || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme === 'light' ? 'theme-light' : '';
    localStorage.setItem('memetrend_theme', newTheme);
  };

  const updateFilter = (type, value) => {
    setState(prev => ({ ...prev, [type]: value }));
  };

  // Show loading until Farcaster SDK is ready
  if (!isReady) {
    return (
      <div className="app">
        <div className="glass" style={{ 
          textAlign: 'center', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>🚀</div>
          <div>Loading MemeTrend...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Add Farcaster badge */}
      {isFarcaster && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'var(--accent)',
          color: 'var(--bg-0)',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          zIndex: 1000
        }}>
          🔥 Farcaster
        </div>
      )}
      
      <header className="app-header">
        <div className="brand">
          <div className="logo">MT</div>
          <div>
            <h1>MemeTrend</h1>
            <div className="muted small">Real-time trending tokens</div>
          </div>
        </div>

        <div className="controls">
          <Filters 
            state={state} 
            onFilterChange={updateFilter}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
        </div>
      </header>

      <div className="glass controls-row">
        <div className="controls-content">
          <div className="timeframe-group">
            <div className="muted">Timeframe</div>
            <div className="filter-group" id="time-filters" aria-label="Timeframes">
              {['5m', '1h', '6h', '24h'].map(time => (
                <button
                  key={time}
                  className={`filter-btn ${state.time === time ? 'active' : ''}`}
                  onClick={() => updateFilter('time', time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="status-group">
            {loading && <div className="muted">Fetching live data…</div>}
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>

      <TokenList 
        pools={poolsData}
        included={included}
        state={state}
        onTokenClick={setSelectedToken}
        loading={loading}
      />

      {selectedToken && (
        <Modal
          token={selectedToken}
          included={included}
          state={state}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  );
}