import React, { useState } from 'react';
import { useVoid } from '../context/VoidContext';

export const GraveyardSection: React.FC = () => {
  const { burnHistory, clearBurnHistory, playEntropySound } = useVoid();
  const [filter, setFilter] = useState<'all' | 'erc20' | 'native'>('all');

  const filteredHistory = burnHistory.filter((item) => {
    if (filter === 'erc20') return !item.isNative;
    if (filter === 'native') return item.isNative;
    return true;
  });

  const exportLedger = () => {
    playEntropySound('click');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(burnHistory, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `the_void_burn_ledger_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <section className="void-section graveyard-section" id="graveyard">
      <div className="section-header">
        <span className="section-index">// 03. THE GRAVEYARD</span>
        <span className="section-tag">[ABYSS TRANSACTION LEDGER // PROOF OF EXTINCTION]</span>
      </div>

      <div className="section-desc">
        Permanent cryptographic record of dissolved entities. Every transaction logged here has been
        cast into the dead address and permanently expunged from circulation.
      </div>

      <div className="ledger-controls-line">
        <div className="filter-group">
          <span className="dim-label">filter_ledger:</span>
          <button
            type="button"
            className={`minimal-link-btn ${filter === 'all' ? 'active-highlight' : ''}`}
            onClick={() => {
              playEntropySound('click');
              setFilter('all');
            }}
          >
            [all records ({burnHistory.length})]
          </button>
          <span className="dim-separator">/</span>
          <button
            type="button"
            className={`minimal-link-btn ${filter === 'erc20' ? 'active-highlight' : ''}`}
            onClick={() => {
              playEntropySound('click');
              setFilter('erc20');
            }}
          >
            [erc-20 tokens]
          </button>
          <span className="dim-separator">/</span>
          <button
            type="button"
            className={`minimal-link-btn ${filter === 'native' ? 'active-highlight' : ''}`}
            onClick={() => {
              playEntropySound('click');
              setFilter('native');
            }}
          >
            [native dust]
          </button>
        </div>

        <div className="action-group">
          <button
            type="button"
            className="minimal-link-btn"
            onClick={exportLedger}
          >
            [export json log]
          </button>
          <span className="dim-separator">/</span>
          <button
            type="button"
            className="minimal-link-btn"
            onClick={clearBurnHistory}
          >
            [purge local ledger]
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="empty-ledger-notice">
          // THE GRAVEYARD IS SILENT. NO TRANSACTIONS MATCH CRITERIA.
        </div>
      ) : (
        <div className="ledger-table">
          <div className="ledger-header-row">
            <span className="col-time">TIMESTAMP</span>
            <span className="col-hash">TRANSACTION HASH</span>
            <span className="col-asset">ASSET / TOKEN</span>
            <span className="col-amount">DISSOLVED AMOUNT</span>
            <span className="col-target">TARGET RECIPIENT</span>
            <span className="col-gas">GAS USED</span>
            <span className="col-status">STATE</span>
          </div>

          {filteredHistory.map((item) => (
            <div key={item.id} className="ledger-data-row">
              <span className="col-time">
                {new Date(item.timestamp).toISOString().replace('T', ' ').slice(0, 19)}
              </span>
              <span className="col-hash">
                <a
                  href={item.explorerUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hash-link"
                >
                  {item.hash.slice(0, 10)}...{item.hash.slice(-8)}
                </a>
              </span>
              <span className="col-asset">
                <span className="asset-tag">{item.tokenSymbol}</span>
                <span className="dim-subtext">
                  {item.isNative ? 'Native ETH' : `${item.tokenAddress.slice(0, 6)}...`}
                </span>
              </span>
              <span className="col-amount">{item.amount}</span>
              <span className="col-target">
                {item.targetAddress.slice(0, 6)}...{item.targetAddress.slice(-4)}
              </span>
              <span className="col-gas">{item.gasUsed || '21000'}</span>
              <span className="col-status">
                <span className={`status-pill ${item.status}`}>
                  [{item.status.toUpperCase()}]
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
