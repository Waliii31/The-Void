import { ethers } from 'ethers';
import { ERC20_ABI, DEAD_ADDRESS, NETWORKS } from '../constants/networks';
import type { TokenInfo, BurnTransaction } from '../types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class Web3Service {
  private static provider: ethers.BrowserProvider | null = null;

  public static isMetaMaskAvailable(): boolean {
    return typeof window !== 'undefined' && Boolean(window.ethereum);
  }

  public static async getProvider(): Promise<ethers.BrowserProvider> {
    if (!window.ethereum) {
      throw new Error('No Ethereum wallet detected. Install MetaMask or enable simulation mode.');
    }
    if (!this.provider) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
    return this.provider;
  }

  public static async connectWallet(): Promise<{ address: string; chainId: number }> {
    const provider = await this.getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts authorized in wallet.');
    }
    const network = await provider.getNetwork();
    return {
      address: accounts[0],
      chainId: Number(network.chainId),
    };
  }

  public static async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) return;
    const hexChainId = '0x' + chainId.toString(16);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError: any) {
      // Chain not added to metamask: 4902 error code or nested error
      const errorCode = switchError?.code || switchError?.data?.originalError?.code;
      if ((errorCode === 4902 || switchError?.message?.includes('4902')) && NETWORKS[chainId]) {
        const net = NETWORKS[chainId];
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: hexChainId,
              chainName: net.name,
              nativeCurrency: net.nativeCurrency,
              rpcUrls: net.rpcUrl ? [net.rpcUrl] : [],
              blockExplorerUrls: [net.explorerUrl],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
  }

  public static async getNativeBalance(address: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (err) {
      console.error('Failed to get native balance:', err);
      return '0.0';
    }
  }

  public static async getTokenInfo(tokenAddress: string, userAddress: string): Promise<TokenInfo> {
    const provider = await this.getProvider();
    
    // Check if address is valid
    if (!ethers.isAddress(tokenAddress)) {
      throw new Error('Invalid Ethereum contract address format.');
    }

    const code = await provider.getCode(tokenAddress);
    if (code === '0x' || code === '') {
      throw new Error('No contract deployed at this address.');
    }

    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

    let symbol = 'UNKNOWN';
    let name = 'Unidentified Token';
    let decimals = 18;
    let balance = '0';

    try {
      symbol = await contract.symbol();
    } catch {
      symbol = 'TOKEN';
    }

    try {
      name = await contract.name();
    } catch {
      name = 'Spam / Obscure Asset';
    }

    try {
      decimals = await contract.decimals();
    } catch {
      decimals = 18;
    }

    try {
      const rawBal = await contract.balanceOf(userAddress);
      balance = ethers.formatUnits(rawBal, decimals);
    } catch (err) {
      console.warn('Could not read balanceOf:', err);
      balance = '0';
    }

    // Flag potential spam based on symbol/name length or suspicious URL keywords
    const isSpam = 
      name.toLowerCase().includes('.com') ||
      name.toLowerCase().includes('.vip') ||
      name.toLowerCase().includes('.io') ||
      name.toLowerCase().includes('visit') ||
      name.toLowerCase().includes('claim') ||
      name.toLowerCase().includes('airdrop') ||
      symbol.toLowerCase().includes('claim');

    const numBal = parseFloat(balance);
    const dustWarning = !isNaN(numBal) && numBal > 0 && numBal < 0.0001;

    return {
      address: ethers.getAddress(tokenAddress),
      symbol,
      name,
      decimals: Number(decimals),
      balance,
      isSpamSuspect: isSpam,
      dustWarning,
    };
  }

  public static async burnERC20(
    tokenAddress: string,
    amount: string,
    targetDeadAddress: string = DEAD_ADDRESS,
    onStatusUpdate?: (status: string, txHash?: string) => void
  ): Promise<BurnTransaction> {
    const provider = await this.getProvider();
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    const networkInfo = NETWORKS[chainId] || {
      name: `Chain ID ${chainId}`,
      explorerUrl: 'https://etherscan.io',
    };

    onStatusUpdate?.('reading contract state...');
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

    let decimals = 18;
    let symbol = 'TOKEN';
    let name = 'Unknown Token';

    try {
      decimals = await contract.decimals();
    } catch {}
    try {
      symbol = await contract.symbol();
    } catch {}
    try {
      name = await contract.name();
    } catch {}

    const parsedAmount = ethers.parseUnits(amount, decimals);

    onStatusUpdate?.('awaiting wallet signature...');
    // Direct transfer to dead address - safe & standard
    const tx = await contract.transfer(targetDeadAddress, parsedAmount);
    
    onStatusUpdate?.('transmitting to the void...', tx.hash);

    const receipt = await tx.wait();

    const gasUsed = receipt?.gasUsed ? receipt.gasUsed.toString() : '0';
    const blockNumber = receipt?.blockNumber;

    return {
      id: tx.hash,
      hash: tx.hash,
      tokenAddress: ethers.getAddress(tokenAddress),
      tokenSymbol: symbol,
      tokenName: name,
      amount,
      rawAmount: parsedAmount.toString(),
      targetAddress: targetDeadAddress,
      timestamp: Date.now(),
      status: receipt?.status === 1 ? 'confirmed' : 'failed',
      blockNumber,
      gasUsed,
      networkName: networkInfo.name,
      chainId,
      isNative: false,
      explorerUrl: `${networkInfo.explorerUrl}/tx/${tx.hash}`,
    };
  }

  public static async burnNative(
    amount: string,
    targetDeadAddress: string = DEAD_ADDRESS,
    onStatusUpdate?: (status: string, txHash?: string) => void
  ): Promise<BurnTransaction> {
    const provider = await this.getProvider();
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    const networkInfo = NETWORKS[chainId] || {
      name: `Chain ID ${chainId}`,
      explorerUrl: 'https://etherscan.io',
      nativeCurrency: { symbol: 'ETH' },
    };

    const parsedAmount = ethers.parseEther(amount);

    onStatusUpdate?.('awaiting wallet signature for native dust...');
    const tx = await signer.sendTransaction({
      to: targetDeadAddress,
      value: parsedAmount,
    });

    onStatusUpdate?.('dissolving dust into the void...', tx.hash);
    const receipt = await tx.wait();

    return {
      id: tx.hash,
      hash: tx.hash,
      tokenAddress: '0x0000000000000000000000000000000000000000',
      tokenSymbol: networkInfo.nativeCurrency?.symbol || 'ETH',
      tokenName: 'Native Gas Dust',
      amount,
      rawAmount: parsedAmount.toString(),
      targetAddress: targetDeadAddress,
      timestamp: Date.now(),
      status: receipt?.status === 1 ? 'confirmed' : 'failed',
      blockNumber: receipt?.blockNumber,
      gasUsed: receipt?.gasUsed ? receipt.gasUsed.toString() : '21000',
      networkName: networkInfo.name,
      chainId,
      isNative: true,
      explorerUrl: `${networkInfo.explorerUrl}/tx/${tx.hash}`,
    };
  }

  // Generate simulated mock burn for testing without gas
  public static simulateBurn(
    tokenInfo: { address: string; symbol: string; name: string; isNative?: boolean },
    amount: string,
    targetDeadAddress: string = DEAD_ADDRESS
  ): Promise<BurnTransaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const mockTx: BurnTransaction = {
          id: randomHash,
          hash: randomHash,
          tokenAddress: tokenInfo.address,
          tokenSymbol: tokenInfo.symbol,
          tokenName: tokenInfo.name,
          amount,
          rawAmount: amount,
          targetAddress: targetDeadAddress,
          timestamp: Date.now(),
          status: 'confirmed',
          blockNumber: 19800000 + Math.floor(Math.random() * 5000),
          gasUsed: tokenInfo.isNative ? '21000' : '46210',
          networkName: 'BOT Chain Simulation',
          chainId: 677,
          isNative: Boolean(tokenInfo.isNative),
          explorerUrl: `https://scan.botchain.ai/tx/${randomHash}`,
        };
        resolve(mockTx);
      }, 1400);
    });
  }
}
