import React, { useState } from 'react';
import { useVoid } from '../context/VoidContext';

export const MechanicsSection: React.FC = () => {
  const { playEntropySound } = useVoid();
  const [activeTab, setActiveTab] = useState<number>(0);

  const doctrines = [
    {
      title: '01. DIRECT TRANSFER PRINCIPLE [NO ROUTER VULNERABILITY]',
      content: `Unlike deceitful 'token cleaner' dApps that demand infinite ERC-20 approvals to a third-party smart contract, The Void executes direct calls to the token's own transfer(recipient, amount) function.
Because msg.sender is your own wallet address, NO token approval (approve) or contract allowance is ever requested. You maintain absolute custodial integrity. No third-party contract can drain funds from your wallet.`,
    },
    {
      title: '02. THE ZERO REVERT ANOMALY [WHY 0xdEaD OVER 0x0000]',
      content: `The EVM zero address (0x0000000000000000000000000000000000000000) is guarded by OpenZeppelin's standard ERC20 implementation with require(to != address(0), "ERC20: transfer to the zero address").
Attempting to transfer directly to 0x0 causes transaction reverts and burns gas in vain.
The standard graveyard address 0x000000000000000000000000000000000000dEaD satisfies the non-zero check while remaining an ungenerated key space.`,
    },
    {
      title: '03. ENTROPY HORIZON [IRREVERSIBILITY OF 2^160]',
      content: `An Ethereum address consists of 20 bytes (160 bits). The probability of any actor discovering the private key corresponding to 0x000000000000000000000000000000000000dEaD is 1 in 2^160 (~1.46 x 10^48).
To brute-force this key would require greater energetic capacity than the collective thermal output of the observable universe across millennia.
Tokens deposited into this coordinate are permanently frozen in cold storage eternity.`,
    },
    {
      title: '04. DEFENSE AGAINST ADDRESS POISONING & MALICIOUS AIRDROPS',
      content: `Modern blockchain exploiters use "dust poisoning": sending zero-value or vanity transfers with addresses mimicking your frequent counterparties to pollute your transaction history and induce copy-paste errors.
Other malicious actors airdrop scam tokens with names containing malicious phishing domains (e.g. claim-gift.vip).
Nullifying these assets to 0xdEaD sanitizes your wallet state and eliminates deceptive artifacts.`,
    },
  ];

  return (
    <section className="void-section mechanics-section" id="mechanics">
      <div className="section-header">
        <span className="section-index">// 04. THE DOCTRINE</span>
        <span className="section-tag">[SECURITY ARCHITECTURE // CRYPTOGRAPHIC ASSURANCES]</span>
      </div>

      <div className="section-desc">
        Mathematical and cryptographic guarantees governing the dissolution protocol. Review the
        tenets of the void before executing transfers.
      </div>

      <div className="doctrine-selector">
        {doctrines.map((d, index) => (
          <button
            key={index}
            type="button"
            className={`doctrine-tab-btn ${activeTab === index ? 'active-highlight' : ''}`}
            onClick={() => {
              playEntropySound('click');
              setActiveTab(index);
            }}
          >
            [{d.title.split(' [')[0]}]
          </button>
        ))}
      </div>

      <div className="doctrine-display">
        <div className="doctrine-title">{doctrines[activeTab].title}</div>
        <div className="doctrine-content">{doctrines[activeTab].content}</div>
      </div>
    </section>
  );
};
