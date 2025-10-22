'use client';
import TokenCard from './TokenCard';
export default function TokenList({ pools, included, state, onTokenClick, loading }) {
  if (loading) {
    return <div className="glass muted" style={{textAlign: 'center', padding: '18px'}}>Loading...</div>;
  }

  if (!pools || pools.length === 0) {
    return <div className="glass muted" style={{textAlign: 'center', padding: '18px'}}>No trending tokens for this filter.</div>;
  }

  return (
    <main id="token-list" aria-live="polite" aria-busy={loading}>
      {pools.map((pool, idx) => (
        <TokenCard
          key={pool.id || idx}
          pool={pool}
          included={included}
          state={state}
          rank={idx + 1}
          onClick={onTokenClick}
        />
      ))}
    </main>
  );
}