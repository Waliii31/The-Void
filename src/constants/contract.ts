/**
 * THE VOID - MAINNET SMART CONTRACT CONFIGURATION
 * 
 * Network: BOT Chain Mainnet
 * Chain ID: 677 (0x2a5)
 * RPC URL: https://rpc.botchain.ai
 * Explorer: https://scan.botchain.ai
 * Currency: BOT (18 Decimals)
 */

export const MAINNET_CONFIG = {
  networkName: 'BOT Chain Mainnet',
  chainId: 677,
  rpcUrl: 'https://rpc.botchain.ai',
  explorerUrl: 'https://scan.botchain.ai',
  currencySymbol: 'BOT',
  currencyDecimals: 18,
  contractAddress: '0xFD51797C48f75aF10761F92Bdd639e4518358324',
  deadAddress: '0x000000000000000000000000000000000000dEaD',
  twitterUrl: 'https://x.com/site_proof__',
  botchainUrl: 'https://botchain.ai',
  scanContractUrl: 'https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324',
};

/**
 * Standard ERC-20 & Burner Contract ABI
 * When your custom contract is deployed on BOT Chain Mainnet,
 * you can place the generated ABI array below.
 */
export const VOID_BURNER_ABI = [
  // Standard ERC-20 Direct Transfer
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',

  // Optional custom Burner contract functions (if deployed as a router/aggregator)
  'function burnToken(address token, uint256 amount) external',
  'function burnNative() external payable',
  'function totalBurned() external view returns (uint256)',
  'event Burn(address indexed sender, address indexed token, uint256 amount, uint256 timestamp)',
];
