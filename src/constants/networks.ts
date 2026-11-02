import type { NetworkConfig, TokenInfo } from '../types';

export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// Primary Mainnet: BOT Chain
export const DEFAULT_CHAIN_ID = 677;
export const BOT_CHAIN_CONTRACT = '0xFD51797C48f75aF10761F92Bdd639e4518358324';
export const TWITTER_URL = 'https://x.com/site_proof__';
export const BOTCHAIN_URL = 'https://botchain.ai';
export const SCAN_CONTRACT_URL = 'https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324';

export const NETWORKS: Record<number, NetworkConfig> = {
  677: {
    chainId: 677,
    name: 'BOT Chain Mainnet',
    nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 },
    explorerUrl: 'https://scan.botchain.ai',
    rpcUrl: 'https://rpc.botchain.ai',
  },
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://etherscan.io',
  },
  11155111: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'SepoliaETH', decimals: 18 },
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://rpc.sepolia.org',
  },
  42161: {
    chainId: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://arbiscan.io',
  },
  8453: {
    chainId: 8453,
    name: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://basescan.org',
  },
  10: {
    chainId: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://optimistic.etherscan.io',
  },
  137: {
    chainId: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'Polygon', symbol: 'POL', decimals: 18 },
    explorerUrl: 'https://polygonscan.com',
  },
  17000: {
    chainId: 17000,
    name: 'Holesky Testnet',
    nativeCurrency: { name: 'Holesky Ether', symbol: 'HoleskyETH', decimals: 18 },
    explorerUrl: 'https://holesky.etherscan.io',
  },
};

// Known test/popular tokens & mock spam list for scanning/demonstration
export const SAMPLE_SPAM_TOKENS: TokenInfo[] = [
  {
    address: '0xFD51797C48f75aF10761F92Bdd639e4518358324',
    symbol: 'VOID-BURNER',
    name: 'The Void Burner Contract',
    decimals: 18,
    balance: '0.00',
    isSpamSuspect: false,
  },
  {
    address: '0x32B163aA99a613264F676Ac1F6f4370fa9324747',
    symbol: 'CLAIM-BOT.VIP',
    name: 'Visit https://claim-bot.vip To Redeem 5000 BOT',
    decimals: 18,
    balance: '500000.00',
    isSpamSuspect: true,
  },
  {
    address: '0x8894e0952d7ee8f121e7845688d07B1Eb499F532',
    symbol: 'AIRDROP-REWARD',
    name: 'Phishing Voucher [Do Not Approve]',
    decimals: 18,
    balance: '10000.00',
    isSpamSuspect: true,
  },
  {
    address: '0x446E8B6239162985172C94F69B89069d300D46ea',
    symbol: 'SPAM-DUST',
    name: 'Ghost Wallet Dust Fragment',
    decimals: 18,
    balance: '0.0000000000042',
    dustWarning: true,
  },
];

export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];
