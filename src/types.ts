export interface BurnTransaction {
  id: string;
  hash: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  amount: string;
  rawAmount: string;
  targetAddress: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  networkName: string;
  chainId: number;
  isNative: boolean;
  explorerUrl?: string;
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  isNative?: boolean;
  isSpamSuspect?: boolean;
  dustWarning?: boolean;
}

export interface VoidStats {
  totalBurnsCount: number;
  tokensDestroyedEstimated: string;
  totalDustEthDestroyed: string;
  uniqueBurners: number;
  lastAnnihilationTime: number;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  explorerUrl: string;
  rpcUrl?: string;
}
