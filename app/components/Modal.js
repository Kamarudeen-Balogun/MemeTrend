'use client';
import { useState, useEffect } from 'react';
import { getBaseTokenFromPool, formatNumber, formatPrice, getChangePercentage } from '../../lib/utils';

export default function Modal({ token, included, state, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const attrs = token.attributes || {};
  const base = getBaseTokenFromPool(token, included);
  const name = base?.attributes?.name || base?.attributes?.symbol || attrs.base_token_name || attrs.base_token_symbol || 'Unknown Token';
  const pair = attrs.name || attrs.pair || attrs.pair_name || 'Pair';
  const priceUsd = attrs.base_token_price_usd ?? attrs.price_usd ?? attrs.price ?? null;
  
  let change24 = getChangePercentage(attrs, '24h');
  if (!Number.isFinite(change24)) change24 = getChangePercentage(attrs, 'h24');
  if (!Number.isFinite(change24)) change24 = 0;
  
  const marketcapVal = attrs.market_cap_usd ?? attrs.market_cap ?? null;
  const liquidityVal = attrs.reserve_in_usd ?? attrs.liquidity_usd ?? attrs.reserve_usd ?? null;
  const tokenAddress = attrs.base_token_address || base?.attributes?.address || base?.id || attrs.token_address || 'N/A';
  const poolAddr = attrs.address || attrs.pool_address || token.address || token.id || '';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      id="modal-overlay" 
      className="visible" 
      onClick={handleBackdropClick}
    >
      <div id="modal" role="dialog" aria-modal="true" aria-label="Token details">
        <div className="modal-top">
          <div className="modal-title">
            <div>
              <div className="modal-token-name" id="modal-name">{name}</div>
              <div className="modal-sub" id="modal-pair">{pair}</div>
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={onClose} className="icon-btn" title="Close" aria-label="Close dialog">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="left-col">
            <div className="info-card overview-card">
              <div className="overview-top">
                <div className="marketcap-big" id="modal-marketcap-big">{formatNumber(marketcapVal)}</div>
                <div className="small-meta">
                  <div className="info-value">{formatPrice(priceUsd)}</div>
                  <div className="muted" style={{ 
                    color: change24 >= 0 ? 'var(--positive)' : 'var(--negative)' 
                  }}>
                    {change24 >= 0 ? '+' : ''}{Number(change24).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="tab-bar" role="tablist" aria-label="Token details tabs">
                {['overview', 'market', 'contract'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="tab-panels">
                <div className={`tab-panel ${activeTab === 'overview' ? '' : 'hidden'}`} data-tab="overview">
                  <div style={{marginTop: '8px'}} id="overview-text">
                    {attrs.description || attrs.summary || `${name} (${base?.attributes?.symbol || '—'}) — live price & market info.`}
                  </div>
                </div>

                <div className={`tab-panel ${activeTab === 'market' ? '' : 'hidden'}`} data-tab="market">
                  <div className="small-meta" style={{marginTop: '8px'}}>
                    <div>Market Cap: <strong id="modal-marketcap">{formatNumber(marketcapVal)}</strong></div>
                    <div>Liquidity: <strong id="modal-liquidity">{formatNumber(liquidityVal)}</strong></div>
                    <div>Price (USD): <strong id="modal-price-strong">{formatPrice(priceUsd)}</strong></div>
                    <div>24h Change: <strong id="modal-change-strong" style={{ 
                      color: change24 >= 0 ? 'var(--positive)' : 'var(--negative)' 
                    }}>{change24 >= 0 ? '+' : ''}{Number(change24).toFixed(1)}%</strong></div>
                  </div>
                </div>

                <div className={`tab-panel ${activeTab === 'contract' ? '' : 'hidden'}`} data-tab="contract">
                  <div style={{marginTop: '8px'}}>
                    <div className="info-title">Base token contract address</div>
                    <div id="modal-token-address" className="info-value">{tokenAddress}</div>
                    <div style={{marginTop: '8px'}}>
                      <a 
                        className="link" 
                        href={`https://www.geckoterminal.com/${state.chain}/pools/${encodeURIComponent(String(poolAddr))}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Open on GeckoTerminal
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-title">More</div>
              <div className="small-meta" style={{marginTop: '6px'}}>
                <div>Pair: <span id="detail-pair" className="detail-value">{pair}</span></div>
                <div>Pool id/address: <span id="detail-poolid" className="detail-value">{poolAddr || '—'}</span></div>
                <div>Chain: <span id="detail-chain" className="detail-value">{state.chain}</span></div>
              </div>
            </div>
          </div>

          <aside className="right-col">
            <div className="info-card">
              <div className="info-title">Summary</div>
              <div id="modal-summary" className="info-value muted">{name} — {pair}</div>
            </div>

            <div className="info-card">
              <div className="info-title">Quick Stats</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px'}}>
                <div className="muted">Market Cap: <span id="quick-marketcap" className="detail-value">{formatNumber(marketcapVal)}</span></div>
                <div className="muted">Liquidity: <span id="quick-liquidity" className="detail-value">{formatNumber(liquidityVal)}</span></div>
                <div className="muted">Base token: <span id="quick-base" className="detail-value">{tokenAddress.slice(0, 8)}...{tokenAddress.slice(-6)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}