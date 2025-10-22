export function formatNumber(num) {
  if (num === null || num === undefined) return 'N/A';
  const n = parseFloat(num);
  if (isNaN(n)) return 'N/A';
  const a = Math.abs(n);
  if (a < 1000) return `$${n.toFixed(2)}`;
  if (a < 1_000_000) return `$${(n/1000).toFixed(1)}K`;
  if (a < 1_000_000_000) return `$${(n/1_000_000).toFixed(1)}M`;
  return `$${(n/1_000_000_000).toFixed(1)}B`;
}

export function formatPrice(p) {
  if (p === null || p === undefined) return 'N/A';
  const n = parseFloat(p);
  if (isNaN(n)) return 'N/A';
  const a = Math.abs(n);
  if (a < 0.000001) return `$${n.toExponential(2)}`;
  if (a < 0.01) return `$${n.toFixed(8)}`;
  return `$${n.toFixed(4)}`;
}

export function getChangePercentage(attributes, timeKey) {
  const changes = attributes?.price_change_percentage || attributes?.price_changes || attributes?.price_change || {};
  if (!changes || typeof changes !== 'object') return NaN;
  if (changes[timeKey] !== undefined && changes[timeKey] !== null) return parseFloat(changes[timeKey]);

  const digitsMatch = timeKey && timeKey.match(/\d+/);
  const digits = digitsMatch ? digitsMatch[0] : null;
  if (digits) {
    for (const k of Object.keys(changes)) {
      if (k.includes(digits)) return parseFloat(changes[k]);
    }
  }

  const alt1 = timeKey.endsWith('h') ? 'h' + timeKey.replace('h','') : null;
  const alt2 = timeKey.endsWith('m') ? 'm' + timeKey.replace('m','') : null;
  for (const alt of [alt1, alt2]) {
    if (alt && changes[alt] !== undefined && changes[alt] !== null) return parseFloat(changes[alt]);
  }

  if (changes.h24 !== undefined) return parseFloat(changes.h24);
  if (changes['24h'] !== undefined) return parseFloat(changes['24h']);

  return NaN;
}

export function getBaseTokenFromPool(pool, included = []) {
  const attrs = pool.attributes || {};
  const topIncluded = Array.isArray(included) ? included : [];
  const poolIncluded = Array.isArray(pool.included) ? pool.included : [];
  const includedData = poolIncluded.length ? poolIncluded : topIncluded;

  const rels = pool.relationships || {};
  const relEntries = [];
  for (const k in rels) {
    const d = rels[k]?.data;
    if (!d) continue;
    if (Array.isArray(d)) d.forEach(x => x && relEntries.push({id:String(x.id), type:x.type}));
    else relEntries.push({id:String(d.id), type:d.type});
  }
  
  if (relEntries.length && includedData.length) {
    for (const r of relEntries) {
      const found = includedData.find(inc => String(inc.id) === String(r.id) && (inc.type === r.type || String(inc.type).includes('token') || String(inc.type).includes('base')));
      if (found) return found;
    }
  }

  const candidates = [
    attrs.base_token_address,
    attrs.base_token?.address,
    attrs.token_address,
    attrs.address,
    attrs.pool_address,
    attrs.contract_address,
  ].filter(Boolean).map(String);

  if (candidates.length && includedData.length) {
    for (const c of candidates) {
      const low = c.toLowerCase();
      const found = includedData.find(inc => {
        const a = inc.attributes?.address || inc.attributes?.contract_address || inc.id || inc.attributes?.contract;
        return a && String(a).toLowerCase() === low;
      });
      if (found) return found;
    }
  }

  const byType = includedData.find(inc => String(inc.type).toLowerCase().includes('token') || String(inc.type).toLowerCase().includes('base'));
  if (byType) return byType;

  if (attrs.base_token_name || attrs.base_token_symbol || attrs.base_token_address) {
    return {
      id: attrs.base_token_address || attrs.base_token_symbol || 'synth',
      type: 'base_token',
      attributes: {
        name: attrs.base_token_name || attrs.base_token_symbol || '',
        symbol: attrs.base_token_symbol || '',
        address: attrs.base_token_address || ''
      }
    };
  }
  return null;
}