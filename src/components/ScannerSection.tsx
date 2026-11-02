import React, { useState } from 'react';
import { useVoid } from '../context/VoidContext';
import type { TokenInfo } from '../types';

interface ScannerProps {
  onSelectTokenForBurn: (token: TokenInfo) => void;
}

export const ScannerSection: React.FC<ScannerProps> = ({ onSelectTokenForBurn }) => {
  const {
    account,
    scannedTokens,
    scanLoading,
    addTokenToScan,
    removeTokenFromScan,
    executeBurn,
    playEntropySound,
  } = useVoid();

  const [customAddress, setCustomAddress] = useState('');
  const [addError, setAddError] = useState<string | null>(null);

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAddress.trim()) return;
    setAddError(null);
    try {
      await addTokenToScan(customAddress.trim());
      setCustomAddress('');
    } catch (err: any) {
      setAddError(err.message || 'Could not query token address');
    }
  };

  const handleQuickBurn = async (token: TokenInfo) => {
    playEntropySound('click');
    onSelectTokenForBurn(token);
    // Scroll smoothly to crucible
    const el = document.getElementById('crucible');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDirectAnnihilate = async (token: TokenInfo) => {
    if (!account) {
      onSelectTokenForBurn(token);
      return;
    }
    try {
      await executeBurn(token, token.balance);
    } catch {}
  };

  return (
    <section className="void-section scanner-section" id="sensor">
      <div className="section-header">
        <span className="section-index">// 02. THE SENSOR</span>
        <span className="section-tag">[SPAM SCANNER // DUST SURVEILLANCE]</span>
      </div>

      <div className="section-desc">
        Automated inspection of uninvited airdrop tokens, phishing coupons, and zero-value balances.
        Select an anomaly to queue for dissolution.
      </div>

      <form className="add-token-line" onSubmit={handleAddCustom}>
        <label htmlFor="custom-token-scan-input" className="dim-label">track_token_address &gt;</label>
        <input
          id="custom-token-scan-input"
          type="text"
          placeholder="0x... (input ERC-20 contract to scan)"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          className="minimal-input"
        />
        <button
          type="submit"
          className="minimal-link-btn"
          disabled={scanLoading}
        >
          {scanLoading ? '[probing...]' : '[add to sensor]'}
        </button>
      </form>

      {addError && (
        <div className="terminal-error-line">
          <span className="error-prefix">scanner_alert:</span>
          <span>{addError}</span>
        </div>
      )}

      <div className="tokens-scan-list">
        <div className="table-header-row">
          <span className="col-symbol">IDENTIFIER</span>
          <span className="col-name">NAME / PHISHING ATTRIBUTE</span>
          <span className="col-balance">BALANCE</span>
          <span className="col-risk">RISK CATEGORY</span>
          <span className="col-action">ACTION</span>
        </div>

        {scannedTokens.map((tok) => (
          <div key={tok.address} className="table-data-row">
            <span className="col-symbol">{tok.symbol}</span>
            <span className="col-name" title={tok.name}>
              {tok.name}
            </span>
            <span className="col-balance">{tok.balance}</span>
            <span className="col-risk">
              {tok.isSpamSuspect ? (
                <span className="risk-tag-high">MALICIOUS AIRDROP</span>
              ) : tok.dustWarning ? (
                <span className="risk-tag-med">SUB-GAS DUST</span>
              ) : (
                <span className="risk-tag-low">STANDARD TOKEN</span>
              )}
            </span>
            <div className="col-action">
              <button
                type="button"
                className="minimal-link-btn"
                onClick={() => handleQuickBurn(tok)}
              >
                [load to crucible]
              </button>
              <span className="dim-separator">/</span>
              <button
                type="button"
                className="minimal-link-btn"
                onClick={() => handleDirectAnnihilate(tok)}
              >
                [burn]
              </button>
              <span className="dim-separator">/</span>
              <button
                type="button"
                className="minimal-link-btn"
                onClick={() => removeTokenFromScan(tok.address)}
              >
                [dismiss]
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
