'use client';
import { getBaseTokenFromPool, formatNumber, formatPrice, getChangePercentage } from '../../lib/utils';

export default function TokenCard({ pool, included, state, rank, onClick }) {
  const attrs = pool.attributes || {};
  const base = getBaseTokenFromPool(pool, included);
  const name = base?.attributes?.name || base?.attributes?.symbol || attrs.base_token_name || attrs.base_token_symbol || 'Unknown Token';
  const pair = attrs.name || attrs.pair || attrs.pair_name || 'Unknown Pair';
  const priceUsd = attrs.base_token_price_usd ?? attrs.price_usd ?? attrs.price ?? null;
  const marketcapVal = attrs.market_cap_usd ?? attrs.market_cap ?? null;

  let changeVal = getChangePercentage(attrs, state.time);
  if (!Number.isFinite(changeVal)) changeVal = 0;
  const changeClass = changeVal >= 0 ? 'positive' : 'negative';
  const changeSign = changeVal >= 0 ? '+' : '';

  const handleClick = () => {
    onClick(pool);
  };

  return (
    <button className="token-card glass" onClick={handleClick} type="button">
      <div className="token-rank">{rank}</div>
      <div className="token-main">
        <div className="token-top">
          <div className="token-left">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(109,211,255,0.08), rgba(102,51,255,0.06))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {(base?.attributes?.symbol || name || '').slice(0, 3)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="token-name">{name}</div>
              <div className="token-pair">{pair}</div>
              <div className="small-meta">{formatNumber(marketcapVal)}</div>
            </div>
          </div>

          <div className="token-price-row" aria-hidden="true">
            <div>
              <div className="token-price">{formatPrice(priceUsd)}</div>
            </div>
            <div className={`token-change ${changeClass}`}>
              {changeSign}{Number(changeVal).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}