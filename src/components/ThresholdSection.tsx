import React, { useState } from 'react';
import { useVoid } from '../context/VoidContext';
import { DEAD_ADDRESS, NETWORKS } from '../constants/networks';

export const ThresholdSection: React.FC = () => {
  const {
    account,
    chainId,
    networkName,
    nativeBalance,
    isConnecting,
    isSimulated,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    toggleSimulated,
    stats,
    isMuted,
    toggleSound,
    playEntropySound,
  } = useVoid();

  const [copied, setCopied] = useState(false);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);

  const currentCurrency = chainId && NETWORKS[chainId] ? NETWORKS[chainId].nativeCurrency.symbol : 'BOT';

  const copyDeadAddress = () => {
    navigator.clipboard.writeText(DEAD_ADDRESS);
    setCopied(true);
    playEntropySound('click');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="void-section threshold-section">
      <div className="section-header">
        <span className="section-index">// 00. THE THRESHOLD</span>
        <span className="section-tag">[STATUS: NOMINAL // ZERO ENTROPY ENGINE]</span>
      </div>

      <div className="manifesto-block">
        <h1 className="void-title">THE VOID</h1>
        <p className="void-manifesto">
          Digital entropy protocol. Annihilate unsolicited spam tokens, malicious airdrop vouchers,
          and residual wallet dust by casting them into the eternal dead address.
          What passes through here cannot be recovered.
        </p>
      </div>

      <div className="terminal-row">
        <span className="dim-label">system_access:</span>
        <div className="inline-controls">
          {account ? (
            <>
              <span className="active-highlight">
                connected [{account.slice(0, 6)}...{account.slice(-4)}]
              </span>
              <span className="dim-separator">/</span>
              <span className="dim-text">bal: {nativeBalance} {currentCurrency}</span>
              <span className="dim-separator">/</span>
              <button
                type="button"
                className="minimal-link-btn"
                onClick={() => setShowNetworkMenu(!showNetworkMenu)}
              >
                net: {networkName} [switch]
              </button>
              <span className="dim-separator">/</span>
              <button
                type="button"
                className="minimal-link-btn"
                onClick={disconnectWallet}
              >
                [disconnect]
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="minimal-link-btn primary-action"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? '[establishing link...]' : '[connect metamask]'}
              </button>
              <span className="dim-separator">/</span>
              <button
                type="button"
                className="minimal-link-btn"
                onClick={toggleSimulated}
              >
                {isSimulated ? '[exit simulation]' : '[enable sandbox mode]'}
              </button>
            </>
          )}

          <span className="dim-separator">/</span>
          <button
            type="button"
            className="minimal-link-btn"
            onClick={toggleSound}
          >
            sound: {isMuted ? '[off]' : '[on]'}
          </button>
        </div>
      </div>

      {showNetworkMenu && (
        <div className="network-menu-line">
          <span className="dim-label">route_network:</span>
          {Object.values(NETWORKS).map((net) => (
            <button
              key={net.chainId}
              type="button"
              className={`minimal-link-btn ${chainId === net.chainId ? 'active-highlight' : ''}`}
              onClick={() => {
                switchNetwork(net.chainId);
                setShowNetworkMenu(false);
              }}
            >
              [{net.name.toLowerCase()}]
            </button>
          ))}
          <button
            type="button"
            className="minimal-link-btn"
            onClick={() => setShowNetworkMenu(false)}
          >
            [close]
          </button>
        </div>
      )}

      <div className="terminal-row target-row">
        <span className="dim-label">abyss_target:</span>
        <span className="monospace-address">{DEAD_ADDRESS}</span>
        <button
          type="button"
          className="minimal-link-btn"
          onClick={copyDeadAddress}
        >
          {copied ? '[copied to clipboard]' : '[copy dead address]'}
        </button>
      </div>

      <div className="telemetry-bar">
        <div className="telemetry-item">
          <span className="dim-label">oblivion_count:</span>
          <span className="telemetry-val">{stats.totalBurnsCount} transactions</span>
        </div>
        <div className="telemetry-item">
          <span className="dim-label">tokens_dissolved:</span>
          <span className="telemetry-val">{stats.tokensDestroyedEstimated}</span>
        </div>
        <div className="telemetry-item">
          <span className="dim-label">dust_absorbed:</span>
          <span className="telemetry-val">{stats.totalDustEthDestroyed} {currentCurrency}</span>
        </div>
        <div className="telemetry-item">
          <span className="dim-label">entropy_reversibility:</span>
          <span className="telemetry-val">0.000000% [PERMANENT]</span>
        </div>
      </div>
    </section>
  );
};
