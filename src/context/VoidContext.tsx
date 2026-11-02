import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { BurnTransaction, TokenInfo, VoidStats } from '../types';
import { DEAD_ADDRESS, SAMPLE_SPAM_TOKENS, NETWORKS, DEFAULT_CHAIN_ID } from '../constants/networks';
import { Web3Service } from '../services/web3';

interface VoidContextType {
  // Wallet
  account: string | null;
  chainId: number | null;
  networkName: string;
  nativeBalance: string;
  isConnecting: boolean;
  isMetaMaskAvailable: boolean;
  isSimulated: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  toggleSimulated: () => void;
  refreshBalances: () => Promise<void>;

  // Burn operations
  burnStatus: {
    active: boolean;
    step: string;
    txHash?: string;
    error?: string;
  };
  executeBurn: (
    token: { address: string; symbol: string; name: string; isNative?: boolean },
    amount: string,
    targetAddress?: string
  ) => Promise<BurnTransaction>;

  // Ledger / Graveyard
  burnHistory: BurnTransaction[];
  clearBurnHistory: () => void;

  // Scanner tokens
  scannedTokens: TokenInfo[];
  scanLoading: boolean;
  addTokenToScan: (address: string) => Promise<TokenInfo>;
  removeTokenFromScan: (address: string) => void;

  // Sound effects
  isMuted: boolean;
  toggleSound: () => void;
  playEntropySound: (type?: 'dissolve' | 'click' | 'hum') => void;

  // Void Global Stats
  stats: VoidStats;
}

const VoidContext = createContext<VoidContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'the_void_burn_ledger_v1';
const LOCAL_STORAGE_TOKENS = 'the_void_scanned_tokens_v1';
const LOCAL_STORAGE_MUTED = 'the_void_sound_muted';

export const VoidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [nativeBalance, setNativeBalance] = useState<string>('0.0000');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const isMetaMaskAvailable = Web3Service.isMetaMaskAvailable();

  const [burnStatus, setBurnStatus] = useState<{
    active: boolean;
    step: string;
    txHash?: string;
    error?: string;
  }>({ active: false, step: '' });

  // Burn history from local storage
  const [burnHistory, setBurnHistory] = useState<BurnTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial mock ledger items for atmospheric depth
    return [
      {
        id: '0x9b32a76ef4821a37c95e92d83a48e718bc3d67f102ad90412e8b9194cc238b10',
        hash: '0x9b32a76ef4821a37c95e92d83a48e718bc3d67f102ad90412e8b9194cc238b10',
        tokenAddress: '0x32B163aA99a613264F676Ac1F6f4370fa9324747',
        tokenSymbol: 'CLAIM-ETH.VIP',
        tokenName: 'Visit https://claim-eth.vip To Redeem 5000 USDT',
        amount: '500000.00',
        rawAmount: '500000000000000000000000',
        targetAddress: DEAD_ADDRESS,
        timestamp: Date.now() - 3600000 * 4,
        status: 'confirmed',
        blockNumber: 19823412,
        gasUsed: '45120',
        networkName: 'Ethereum Mainnet',
        chainId: 1,
        isNative: false,
        explorerUrl: 'https://etherscan.io/tx/0x9b32a76ef4821a37c95e92d83a48e718bc3d67f102ad90412e8b9194cc238b10',
      },
      {
        id: '0x4f128c9a33bb5184e9081a293b74619bfae929d012489812e987114fae8912c3',
        hash: '0x4f128c9a33bb5184e9081a293b74619bfae929d012489812e987114fae8912c3',
        tokenAddress: '0x0000000000000000000000000000000000000000',
        tokenSymbol: 'ETH',
        tokenName: 'Native Dust Fragment',
        amount: '0.0000000000104',
        rawAmount: '10400000',
        targetAddress: DEAD_ADDRESS,
        timestamp: Date.now() - 3600000 * 18,
        status: 'confirmed',
        blockNumber: 19821890,
        gasUsed: '21000',
        networkName: 'Ethereum Mainnet',
        chainId: 1,
        isNative: true,
        explorerUrl: 'https://etherscan.io/tx/0x4f128c9a33bb5184e9081a293b74619bfae929d012489812e987114fae8912c3',
      },
    ];
  });

  // Scanned tokens
  const [scannedTokens, setScannedTokens] = useState<TokenInfo[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TOKENS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_SPAM_TOKENS;
  });

  const [scanLoading, setScanLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_MUTED) === 'true';
    } catch {
      return false;
    }
  });

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(burnHistory));
    } catch {}
  }, [burnHistory]);

  // Save tokens on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TOKENS, JSON.stringify(scannedTokens));
    } catch {}
  }, [scannedTokens]);

  // Audio synthesizer for dark minimalism atmosphere (Web Audio API)
  const playEntropySound = useCallback((type: 'dissolve' | 'click' | 'hum' = 'dissolve') => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'dissolve') {
        // White noise disintegration buffer
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.4);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else {
        // Deep sub-bass drone hum
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {}
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(LOCAL_STORAGE_MUTED, String(next));
      } catch {}
      return next;
    });
  };

  // Balance refreshing
  const refreshBalances = useCallback(async () => {
    if (!account) return;
    try {
      if (isSimulated) {
        setNativeBalance('1.8492');
        return;
      }
      const bal = await Web3Service.getNativeBalance(account);
      setNativeBalance(parseFloat(bal).toFixed(5));

      // Update scanned tokens balances
      const updated = await Promise.all(
        scannedTokens.map(async (tok) => {
          if (tok.isNative) return tok;
          try {
            const fresh = await Web3Service.getTokenInfo(tok.address, account);
            return { ...tok, balance: fresh.balance };
          } catch {
            return tok;
          }
        })
      );
      setScannedTokens(updated);
    } catch (err) {
      console.warn('Balance refresh error:', err);
    }
  }, [account, isSimulated, scannedTokens]);

  // Connect wallet
  const connectWallet = async () => {
    playEntropySound('click');
    setIsConnecting(true);
    setBurnStatus({ active: false, step: '', error: undefined });
    try {
      if (isSimulated) {
        setAccount('0x71C...void4b2');
        setChainId(DEFAULT_CHAIN_ID);
        setNativeBalance('2.4019');
        setIsConnecting(false);
        return;
      }
      const res = await Web3Service.connectWallet();
      setAccount(res.address);
      setChainId(res.chainId);
      const bal = await Web3Service.getNativeBalance(res.address);
      setNativeBalance(parseFloat(bal).toFixed(5));
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setBurnStatus({ active: false, step: '', error: err.message || 'Connection failed' });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    playEntropySound('click');
    setAccount(null);
    setChainId(null);
    setNativeBalance('0.0000');
  };

  const toggleSimulated = () => {
    playEntropySound('click');
    setIsSimulated((prev) => {
      const next = !prev;
      if (next) {
        setAccount('0x3A2...9dEaD');
        setChainId(DEFAULT_CHAIN_ID);
        setNativeBalance('1.8400');
      } else {
        setAccount(null);
        setChainId(null);
        setNativeBalance('0.0000');
      }
      return next;
    });
  };

  const switchNetwork = async (targetChainId: number) => {
    playEntropySound('click');
    try {
      if (isSimulated) {
        setChainId(targetChainId);
        return;
      }
      await Web3Service.switchNetwork(targetChainId);
      setChainId(targetChainId);
    } catch (err: any) {
      setBurnStatus({ active: false, step: '', error: err.message || 'Network switch rejected' });
    }
  };

  // Listen to MetaMask account / chain changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum || isSimulated) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        setAccount(null);
      } else {
        setAccount(accounts[0]);
        refreshBalances();
      }
    };

    const handleChainChanged = (chainHex: string) => {
      const id = parseInt(chainHex, 16);
      setChainId(id);
      refreshBalances();
    };

    window.ethereum.on?.('accountsChanged', handleAccountsChanged);
    window.ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener?.('chainChanged', handleChainChanged);
    };
  }, [isSimulated, refreshBalances]);

  // Execute Burn
  const executeBurn = async (
    token: { address: string; symbol: string; name: string; isNative?: boolean },
    amount: string,
    targetAddress: string = DEAD_ADDRESS
  ): Promise<BurnTransaction> => {
    setBurnStatus({ active: true, step: 'initiating void sequence...' });
    playEntropySound('hum');

    try {
      let tx: BurnTransaction;

      if (isSimulated) {
        setBurnStatus({ active: true, step: 'transmitting to zero address [simulated]...' });
        tx = await Web3Service.simulateBurn(token, amount, targetAddress);
      } else {
        if (!account) {
          throw new Error('Connect wallet or enable simulation mode before burning.');
        }

        if (token.isNative) {
          tx = await Web3Service.burnNative(amount, targetAddress, (step, hash) => {
            setBurnStatus({ active: true, step, txHash: hash });
          });
        } else {
          tx = await Web3Service.burnERC20(token.address, amount, targetAddress, (step, hash) => {
            setBurnStatus({ active: true, step, txHash: hash });
          });
        }
      }

      setBurnHistory((prev) => [tx, ...prev]);
      playEntropySound('dissolve');
      setBurnStatus({
        active: false,
        step: `annihilated. tx: ${tx.hash.slice(0, 10)}...${tx.hash.slice(-6)}`,
        txHash: tx.hash,
      });

      // Update scanned token balance locally
      setScannedTokens((prev) =>
        prev.map((t) => {
          if (t.address.toLowerCase() === token.address.toLowerCase()) {
            const current = parseFloat(t.balance) || 0;
            const burned = parseFloat(amount) || 0;
            const remaining = Math.max(0, current - burned);
            return { ...t, balance: remaining.toString() };
          }
          return t;
        })
      );

      refreshBalances();
      return tx;
    } catch (err: any) {
      console.error('Burn failure:', err);
      const msg = err.reason || err.shortMessage || err.message || 'Transaction dissolved by error';
      setBurnStatus({ active: false, step: '', error: msg });
      throw err;
    }
  };

  const clearBurnHistory = () => {
    playEntropySound('click');
    setBurnHistory([]);
  };

  // Add custom token to scanner
  const addTokenToScan = async (address: string): Promise<TokenInfo> => {
    setScanLoading(true);
    try {
      let info: TokenInfo;
      if (isSimulated || !account) {
        info = {
          address,
          name: 'Manual Scanned Token',
          symbol: 'SCAN-' + address.slice(2, 6).toUpperCase(),
          decimals: 18,
          balance: '1000.00',
          isSpamSuspect: false,
        };
      } else {
        info = await Web3Service.getTokenInfo(address, account);
      }

      setScannedTokens((prev) => {
        const filtered = prev.filter((t) => t.address.toLowerCase() !== address.toLowerCase());
        return [info, ...filtered];
      });
      playEntropySound('click');
      return info;
    } finally {
      setScanLoading(false);
    }
  };

  const removeTokenFromScan = (address: string) => {
    playEntropySound('click');
    setScannedTokens((prev) => prev.filter((t) => t.address.toLowerCase() !== address.toLowerCase()));
  };

  const networkName = chainId && NETWORKS[chainId] ? NETWORKS[chainId].name : chainId ? `Chain ${chainId}` : 'Disconnected';

  // Aggregated Void stats
  const stats: VoidStats = {
    totalBurnsCount: 2841 + burnHistory.length,
    tokensDestroyedEstimated: (142891402 + burnHistory.length * 15000).toLocaleString(),
    totalDustEthDestroyed: (0.4891 + burnHistory.filter((b) => b.isNative).length * 0.0001).toFixed(4),
    uniqueBurners: 892 + (account ? 1 : 0),
    lastAnnihilationTime: burnHistory.length > 0 ? burnHistory[0].timestamp : Date.now() - 120000,
  };

  return (
    <VoidContext.Provider
      value={{
        account,
        chainId,
        networkName,
        nativeBalance,
        isConnecting,
        isMetaMaskAvailable,
        isSimulated,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        toggleSimulated,
        refreshBalances,
        burnStatus,
        executeBurn,
        burnHistory,
        clearBurnHistory,
        scannedTokens,
        scanLoading,
        addTokenToScan,
        removeTokenFromScan,
        isMuted,
        toggleSound,
        playEntropySound,
        stats,
      }}
    >
      {children}
    </VoidContext.Provider>
  );
};

export const useVoid = () => {
  const context = useContext(VoidContext);
  if (!context) {
    throw new Error('useVoid must be used within a VoidProvider');
  }
  return context;
};
