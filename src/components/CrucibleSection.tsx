import React, { useState, useEffect } from 'react';
import { useVoid } from '../context/VoidContext';
import { DEAD_ADDRESS, ZERO_ADDRESS, NETWORKS } from '../constants/networks';
import { Web3Service } from '../services/web3';
import type { TokenInfo } from '../types';

interface CrucibleProps {
  initialToken?: TokenInfo | null;
  onClearInitialToken?: () => void;
}

export const CrucibleSection: React.FC<CrucibleProps> = ({
  initialToken,
  onClearInitialToken,
}) => {
  const {
    account,
    chainId,
    nativeBalance,
    isSimulated,
    burnStatus,
    executeBurn,
    playEntropySound,
  } = useVoid();

  const currencySymbol = chainId && NETWORKS[chainId] ? NETWORKS[chainId].nativeCurrency.symbol : 'BOT';
  const currencyName = chainId && NETWORKS[chainId] ? NETWORKS[chainId].nativeCurrency.name : 'BOT';

  const [mode, setMode] = useState<'erc20' | 'native'>('erc20');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [targetAddress, setTargetAddress] = useState(DEAD_ADDRESS);
  const [tokenData, setTokenData] = useState<TokenInfo | null>(null);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [lastBurnResult, setLastBurnResult] = useState<string | null>(null);

  // Sync initial token passed from scanner
  useEffect(() => {
    if (initialToken) {
      if (initialToken.isNative) {
        setMode('native');
        setAmount(initialToken.balance);
      } else {
        setMode('erc20');
        setTokenAddress(initialToken.address);
        setAmount(initialToken.balance);
        setTokenData(initialToken);
      }
      onClearInitialToken?.();
    }
  }, [initialToken, onClearInitialToken]);

  // Query ERC-20 token metadata when address is typed
  useEffect(() => {
    if (mode === 'native') return;
    if (!tokenAddress || tokenAddress.trim().length < 42) {
      setTokenData(null);
      setInputError(null);
      return;
    }

    let isCancelled = false;
    const fetchInfo = async () => {
      setIsFetchingInfo(true);
      setInputError(null);
      try {
        if (isSimulated || !account) {
          // Fallback simulation lookup
          setTokenData({
            address: tokenAddress,
            symbol: 'SAMPLE-TOKEN',
            name: 'Generic Airdrop / Spam Artifact',
            decimals: 18,
            balance: '5000.00',
            isSpamSuspect: true,
          });
        } else {
          const info = await Web3Service.getTokenInfo(tokenAddress.trim(), account);
          if (!isCancelled) setTokenData(info);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setTokenData(null);
          setInputError(err.message || 'Unable to read token metadata from blockchain');
        }
      } finally {
        if (!isCancelled) setIsFetchingInfo(false);
      }
    };

    const timer = setTimeout(fetchInfo, 450);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [tokenAddress, account, isSimulated, mode]);

  const handleMaxClick = () => {
    playEntropySound('click');
    if (mode === 'native') {
      const num = parseFloat(nativeBalance);
      // Leave slight gas buffer if live wallet
      const maxVal = isSimulated ? nativeBalance : Math.max(0, num - 0.001).toFixed(6);
      setAmount(maxVal);
    } else if (tokenData) {
      setAmount(tokenData.balance);
    }
  };

  const handleBurnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);
    setLastBurnResult(null);

    if (!amount || parseFloat(amount) <= 0) {
      setInputError('Specify an amount greater than zero to dissolve.');
      return;
    }

    if (mode === 'erc20' && !tokenAddress) {
      setInputError('Specify the ERC-20 token contract address.');
      return;
    }

    try {
      if (mode === 'native') {
        const tx = await executeBurn(
          {
            address: '0x0000000000000000000000000000000000000000',
            symbol: currencySymbol,
            name: `${currencyName} Dust`,
            isNative: true,
          },
          amount,
          targetAddress
        );
        setLastBurnResult(`annihilated. hash: ${tx.hash}`);
        setAmount('');
      } else {
        const symbol = tokenData?.symbol || 'TOKEN';
        const name = tokenData?.name || 'Unidentified Token';
        const tx = await executeBurn(
          {
            address: tokenAddress.trim(),
            symbol,
            name,
            isNative: false,
          },
          amount,
          targetAddress
        );
        setLastBurnResult(`annihilated. hash: ${tx.hash}`);
        setAmount('');
      }
    } catch (err: any) {
      // Error handled in context & status
    }
  };

  return (
    <section className="void-section crucible-section" id="crucible">
      <div className="section-header">
        <span className="section-index">// 01. THE CRUCIBLE</span>
        <span className="section-tag">[OBLIVION ENGINE // DIRECT RECIPIENT NULLIFICATION]</span>
      </div>

      <div className="section-desc">
        Configure the target asset. Transfers are dispatched directly from your address to the dead
        address with zero proxy intermediaries.
      </div>

      <div className="mode-selector-line">
        <span className="dim-label">dissolution_type:</span>
        <button
          type="button"
          className={`minimal-link-btn ${mode === 'erc20' ? 'active-highlight' : ''}`}
          onClick={() => {
            playEntropySound('click');
            setMode('erc20');
          }}
        >
          [01. erc-20 token / spam]
        </button>
        <span className="dim-separator">/</span>
        <button
          type="button"
          className={`minimal-link-btn ${mode === 'native' ? 'active-highlight' : ''}`}
          onClick={() => {
            playEntropySound('click');
            setMode('native');
          }}
        >
          [02. native {currencySymbol.toLowerCase()} dust]
        </button>
      </div>

      <form className="crucible-form" onSubmit={handleBurnSubmit}>
        {mode === 'erc20' ? (
          <div className="field-group">
            <div className="field-row">
              <label htmlFor="token-address-input" className="field-label">token_contract &gt;</label>
              <input
                id="token-address-input"
                type="text"
                spellCheck={false}
                autoComplete="off"
                placeholder="0x... (paste unwanted token address)"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="minimal-input"
              />
            </div>

            {isFetchingInfo && (
              <div className="field-hint">querying contract bytecode...</div>
            )}

            {tokenData && (
              <div className="token-meta-readout">
                <span className="dim-label">asset_meta:</span>
                <span className="token-symbol">{tokenData.symbol}</span>
                <span className="dim-separator">/</span>
                <span className="token-name">{tokenData.name}</span>
                <span className="dim-separator">/</span>
                <span className="dim-label">your_balance:</span>
                <span className="token-balance">{tokenData.balance}</span>
                {tokenData.isSpamSuspect && (
                  <span className="spam-badge">[SUSPECTED PHISHING / SPAM ARTIFACT]</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="field-group">
            <div className="field-row">
              <span className="field-label">native_asset &gt;</span>
              <span className="static-field-value">
                {currencyName} (Native Dust) // balance: {nativeBalance} {currencySymbol}
              </span>
            </div>
          </div>
        )}

        <div className="field-group">
          <div className="field-row">
            <label htmlFor="amount-input" className="field-label">burn_amount &gt;</label>
            <input
              id="amount-input"
              type="text"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="minimal-input amount-input"
            />
            <button
              type="button"
              className="minimal-link-btn"
              onClick={handleMaxClick}
            >
              [nullify all / max]
            </button>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            <label htmlFor="target-abyss-input" className="field-label">target_abyss &gt;</label>
            <input
              id="target-abyss-input"
              type="text"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
              className="minimal-input"
            />
            <div className="target-presets">
              <button
                type="button"
                className={`minimal-link-btn ${targetAddress === DEAD_ADDRESS ? 'active-highlight' : ''}`}
                onClick={() => {
                  playEntropySound('click');
                  setTargetAddress(DEAD_ADDRESS);
                }}
              >
                [0xdEaD]
              </button>
              <button
                type="button"
                className={`minimal-link-btn ${targetAddress === ZERO_ADDRESS ? 'active-highlight' : ''}`}
                onClick={() => {
                  playEntropySound('click');
                  setTargetAddress(ZERO_ADDRESS);
                }}
              >
                [0x0000]
              </button>
            </div>
          </div>
        </div>

        {/* Input or Execution Error Readout */}
        {(inputError || burnStatus.error) && (
          <div className="terminal-error-line">
            <span className="error-prefix">abort_exception:</span>
            <span>{inputError || burnStatus.error}</span>
          </div>
        )}

        {/* Live Burn Tracker Readout */}
        {burnStatus.active && (
          <div className="burn-tracker-line">
            <span className="pulse-indicator">*</span>
            <span className="dim-label">status:</span>
            <span className="tracker-step">{burnStatus.step}</span>
            {burnStatus.txHash && (
              <span className="dim-text">[tx: {burnStatus.txHash.slice(0, 16)}...]</span>
            )}
          </div>
        )}

        {lastBurnResult && !burnStatus.active && (
          <div className="burn-success-line">
            <span className="dim-label">confirmation:</span>
            <span>{lastBurnResult}</span>
          </div>
        )}

        {/* STRICT REQUIREMENT: The "Burn" button should just be text that turns stark white on hover */}
        <div className="action-row">
          <button
            type="submit"
            className="burn-btn"
            disabled={burnStatus.active}
          >
            {burnStatus.active ? '[ dissolving into nothingness... ]' : '[ burn ]'}
          </button>
        </div>
      </form>
    </section>
  );
};
