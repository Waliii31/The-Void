import React, { useState, useEffect, useRef } from 'react';
import { useVoid } from '../context/VoidContext';
import {
  DEAD_ADDRESS,
  BOT_CHAIN_CONTRACT,
  TWITTER_URL,
  BOTCHAIN_URL,
  SCAN_CONTRACT_URL,
} from '../constants/networks';

interface TerminalLine {
  id: string;
  type: 'in' | 'out' | 'system';
  text: string;
}

export const MemorialSection: React.FC = () => {
  const {
    account,
    chainId,
    networkName,
    stats,
    isMuted,
    toggleSound,
    playEntropySound,
  } = useVoid();

  const [inputCmd, setInputCmd] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '// THE VOID TERMINAL v2.1.0' },
    { id: '2', type: 'system', text: '// TYPE "help" FOR PROTOCOL COMMANDS' },
  ]);

  const [broadcastFeed, setBroadcastFeed] = useState<Array<{ id: string; text: string }>>([
    { id: 'b1', text: '[0xd83...91] cast 120,000 SCAM-REWARD to 0x...dEaD' },
    { id: 'b2', text: '[0x44a...02] dissolved 0.0000041 ETH dust into the void' },
    { id: 'b3', text: '[0x90f...c1] nullified 10,000 PHISH-VOUCHER.COM' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Periodic simulated abyss broadcasts
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleAmounts = ['5,000', '250,000', '0.0000012 ETH', '88,888', '1,200'];
      const sampleTokens = ['CLAIM-AIRDROP.XYZ', 'FAKE-USDC', 'DUST-FRAGMENT', 'SPAM-REWARD', 'POISON-DUST'];
      const randHex = '0x' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const amt = sampleAmounts[Math.floor(Math.random() * sampleAmounts.length)];
      const tok = sampleTokens[Math.floor(Math.random() * sampleTokens.length)];

      const newLine = {
        id: String(Date.now()),
        text: `[${randHex}...${randHex.slice(-2)}] extinguished ${amt} ${tok} to 0x...dEaD`,
      };

      setBroadcastFeed((prev) => [newLine, ...prev.slice(0, 5)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputCmd.trim().toLowerCase();
    if (!cmd) return;

    playEntropySound('click');
    const newLogs: TerminalLine[] = [
      ...terminalLogs,
      { id: String(Date.now()), type: 'in', text: `> ${inputCmd}` },
    ];

    if (cmd === 'help') {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'out', text: 'AVAILABLE PROTOCOL COMMANDS:' },
        { id: String(Date.now() + 2), type: 'out', text: '  status       : inspect current wallet & node telemetry' },
        { id: String(Date.now() + 3), type: 'out', text: '  contract     : inspect mainnet contract on BOT Chain' },
        { id: String(Date.now() + 4), type: 'out', text: '  stats        : print aggregate destruction metrics' },
        { id: String(Date.now() + 5), type: 'out', text: '  genesis      : display void singularity artifact' },
        { id: String(Date.now() + 6), type: 'out', text: '  target       : view designated dead address' },
        { id: String(Date.now() + 7), type: 'out', text: '  sound        : toggle entropy sound synthesizer' },
        { id: String(Date.now() + 8), type: 'out', text: '  clear        : wipe terminal memory' }
      );
    } else if (cmd === 'contract' || cmd === 'scan') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `MAINNET CONTRACT: ${BOT_CHAIN_CONTRACT} (BOT Chain Mainnet 677) | EXPLORER: ${SCAN_CONTRACT_URL}`,
      });
    } else if (cmd === 'status') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `NODE: ${networkName} (chain: ${chainId || 'none'}) | ACCOUNT: ${account || 'unlinked'} | AUDIO: ${isMuted ? 'muted' : 'active'}`,
      });
    } else if (cmd === 'stats') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `CUMULATIVE TRANSACTIONS: ${stats.totalBurnsCount} | TOKENS EVAPORATED: ${stats.tokensDestroyedEstimated} | DUST PURGED: ${stats.totalDustEthDestroyed} ETH`,
      });
    } else if (cmd === 'target') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `DEAD ADDRESS: ${DEAD_ADDRESS}`,
      });
    } else if (cmd === 'genesis') {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'out', text: '            .                         .' },
        { id: String(Date.now() + 2), type: 'out', text: '                 .   +   .             ' },
        { id: String(Date.now() + 3), type: 'out', text: '        .           ___           .    ' },
        { id: String(Date.now() + 4), type: 'out', text: '             --==//     \\\\==--         ' },
        { id: String(Date.now() + 5), type: 'out', text: '           -===||  (0)  ||===-         ' },
        { id: String(Date.now() + 6), type: 'out', text: '             --==\\\\     //==--         ' },
        { id: String(Date.now() + 7), type: 'out', text: '        .           ---           .    ' },
        { id: String(Date.now() + 8), type: 'out', text: '                 .   +   .             ' },
        { id: String(Date.now() + 9), type: 'out', text: '   "Out of the void we emerge, into the void all returns."' }
      );
    } else if (cmd === 'sound') {
      toggleSound();
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `Audio synthesizer: ${!isMuted ? 'OFF' : 'ON'}`,
      });
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setInputCmd('');
      return;
    } else {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'out',
        text: `unknown command: "${cmd}". type "help" for syntax.`,
      });
    }

    setTerminalLogs(newLogs);
    setInputCmd('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <section className="void-section memorial-section" id="memorial">
      <div className="section-header">
        <span className="section-index">// 05. THE EPILOGUE</span>
        <span className="section-tag">[ABYSS TERMINAL // BROADCAST TELEMETRY]</span>
      </div>

      <div className="section-desc">
        Direct command console into the nullification network and live abyss stream.
      </div>

      <div className="terminal-split-view">
        <div className="terminal-column">
          <div className="column-title">TERMINAL INTERFACE &gt;</div>
          <div className="terminal-console-output">
            {terminalLogs.map((log) => (
              <div key={log.id} className={`log-line ${log.type}`}>
                {log.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form className="terminal-input-line" onSubmit={handleCommandSubmit}>
            <label htmlFor="terminal-command-input" className="dim-prompt">void@console:~$</label>
            <input
              id="terminal-command-input"
              type="text"
              autoComplete="off"
              spellCheck={false}
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              className="minimal-input console-input"
              placeholder="type help, genesis, stats..."
            />
          </form>
        </div>

        <div className="broadcast-column">
          <div className="column-title">LIVE NETWORK BROADCAST FEED &gt;</div>
          <div className="broadcast-feed-list">
            {broadcastFeed.map((b) => (
              <div key={b.id} className="broadcast-item">
                <span className="feed-bullet">&gt;</span>
                <span className="feed-text">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atmospheric Footer */}
      <footer className="void-footer">
        <div className="footer-line">
          <span>THE VOID PROTOCOL // ZERO RETAINED STATE // NON-CUSTODIAL EXTINGUISHER</span>
        </div>
        <div className="footer-links-row">
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            [x / twitter: @site_proof__]
          </a>
          <span className="dim-separator">/</span>
          <a
            href={BOTCHAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            powered by [botchain.ai]
          </a>
          <span className="dim-separator">/</span>
          <a
            href={SCAN_CONTRACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            contract: [{BOT_CHAIN_CONTRACT.slice(0, 6)}...{BOT_CHAIN_CONTRACT.slice(-4)}] [scan]
          </a>
        </div>
        <div className="footer-details">
          <span>NETWORK: BOT CHAIN MAINNET (CHAIN 677)</span>
          <span className="dim-separator">/</span>
          <span>RPC: https://rpc.botchain.ai</span>
          <span className="dim-separator">/</span>
          <span>EXPLORER: scan.botchain.ai</span>
          <span className="dim-separator">/</span>
          <span>TARGET: 0x000000000000000000000000000000000000dEaD</span>
        </div>
      </footer>
    </section>
  );
};
