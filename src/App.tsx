import React, { useState } from 'react';
import { VoidProvider } from './context/VoidContext';
import { VoidCanvas } from './components/VoidCanvas';
import { ThresholdSection } from './components/ThresholdSection';
import { CrucibleSection } from './components/CrucibleSection';
import { ScannerSection } from './components/ScannerSection';
import { GraveyardSection } from './components/GraveyardSection';
import { MechanicsSection } from './components/MechanicsSection';
import { MemorialSection } from './components/MemorialSection';
import type { TokenInfo } from './types';

const VoidApp: React.FC = () => {
  const [selectedTokenForBurn, setSelectedTokenForBurn] = useState<TokenInfo | null>(null);

  const handleSelectToken = (token: TokenInfo) => {
    setSelectedTokenForBurn(token);
  };

  return (
    <>
      <VoidCanvas />
      <main className="app-container">
        {/* Minimal Navigation Coordinates */}
        <nav className="nav-anchor-bar" aria-label="Sections">
          <span className="dim-label">// COORDINATES:</span>
          <a href="#crucible" className="nav-anchor-link">[01. crucible]</a>
          <span className="dim-separator">/</span>
          <a href="#sensor" className="nav-anchor-link">[02. sensor]</a>
          <span className="dim-separator">/</span>
          <a href="#graveyard" className="nav-anchor-link">[03. graveyard]</a>
          <span className="dim-separator">/</span>
          <a href="#mechanics" className="nav-anchor-link">[04. doctrine]</a>
          <span className="dim-separator">/</span>
          <a href="#memorial" className="nav-anchor-link">[05. epilogue]</a>
        </nav>

        {/* Section 00: The Threshold */}
        <ThresholdSection />

        {/* Section 01: The Crucible (Token & Dust Burner) */}
        <CrucibleSection
          initialToken={selectedTokenForBurn}
          onClearInitialToken={() => setSelectedTokenForBurn(null)}
        />

        {/* Section 02: The Sensor (Wallet Dust & Spam Scanner) */}
        <ScannerSection onSelectTokenForBurn={handleSelectToken} />

        {/* Section 03: The Graveyard (Burn Transaction Ledger) */}
        <GraveyardSection />

        {/* Section 04: The Doctrine (Security & Cryptographic Mechanics) */}
        <MechanicsSection />

        {/* Section 05: The Epilogue (Void Terminal & Telemetry) */}
        <MemorialSection />
      </main>
    </>
  );
};

export default function App() {
  return (
    <VoidProvider>
      <VoidApp />
    </VoidProvider>
  );
}
