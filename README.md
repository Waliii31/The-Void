# THE VOID // The Token Burner
### Absolute Dark Minimalism Digital Entropy Protocol
**Powered by [Botchain](https://botchain.ai) // Primary Network: BOT Chain Mainnet (Chain ID 677)**

```
               .                         .
                    .   +   .             
           .           ___           .    
                --==//     \\==--         
              -===||  (0)  ||===-         
                --==\\     //==--         
           .           ---           .    
                    .   +   .             
      "Out of the void we emerge, into the void all returns."
```

---

## Network & Contract Specifications

- **Network Name**: `BOT Chain Mainnet`
- **RPC URL**: `https://rpc.botchain.ai`
- **Chain ID**: `677` (`0x2a5`)
- **Currency Symbol**: `BOT` (18 Decimals)
- **Block Explorer**: [https://scan.botchain.ai](https://scan.botchain.ai)
- **Mainnet Contract**: [`0xFD51797C48f75aF10761F92Bdd639e4518358324`](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324)
- **Contract Explorer**: [https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324)
- **Official X / Twitter**: [@site_proof__](https://x.com/site_proof__)
- **Powered by**: [Botchain.ai](https://botchain.ai)
- **Primary Dead Address**: `0x000000000000000000000000000000000000dEaD`

---

## Aesthetic Directives: Absolute Dark Minimalism
Built in accordance with strict aesthetic constraints:
- **100% Pure Black Canvas** (`#000000`)
- **Zero visible containers, cards, outlines, or borders**
- **Floating dark gray monospace typography** (`#555555` to `#888888`) across pure negative space
- **The "Burn" button is unadorned text** that transforms to stark white (`#ffffff`) upon cursor hover
- **Zero flashy Web3 tropes**, no glowing gradient buttons, no rounded cards, no glassmorphism, no cartoon banners.

---

## 1. All Features of The Void (What Can It Do?)

The application is structured into **6 atmospheric, functional sections**:

### Section 00: The Threshold (`// 00. THE THRESHOLD`)
- **Web3 Wallet Connectivity**: Real-time connection to MetaMask and browser EVM wallets with automatic address resolution and native `BOT` balance display.
- **Preconfigured for BOT Chain Mainnet**: Automatically detects or prompts to add and switch to BOT Chain Mainnet (Chain ID `677`). Also supports multi-chain switching to Ethereum Mainnet, Sepolia, Arbitrum, Optimism, Base, and Polygon.
- **Interactive Sandbox Simulation Mode**: A built-in toggle allowing complete testing of all burn workflows, ledger recording, and telemetry without spending real gas.
- **Global Oblivion Telemetry**: Live metrics tracking total burned transactions, estimated destroyed token count, native dust absorbed (`BOT`), and entropy permanence index ($0.000000\%$ reversibility).
- **Abyss Target Display & Fast Copy**: Display of the primary dead address (`0x...dEaD`) with one-click clipboard copying.
- **Atmospheric Procedural Audio**: Built-in sound synthesizer using the native Web Audio API (tactile clicks, low-frequency hums, and white noise disintegration pulses) with a toggleable mute control.

### Section 01: The Crucible (`// 01. THE CRUCIBLE`)
- **Dual Dissolution Modes**:
  - `[01. erc-20 token / spam]`: Cleanse standard ERC-20 tokens, airdropped scam vouchers, or unwanted memecoins.
  - `[02. native bot dust]`: Annihilate fractional native `BOT` dust balances (e.g. `0.00001 BOT`).
- **Dynamic Token Introspection**: Automatically queries token bytecode on BOT Chain, reads `symbol()`, `name()`, `decimals()`, and queries your live `balanceOf(userAddress)` in real-time.
- **Heuristic Spam & Malicious Domain Detection**: Identifies suspected phishing tokens based on suspicious domain names (e.g., `.vip`, `.io`, `claim-reward`, `visit-to-redeem`).
- **Quick Nullify / Max Option**: Auto-fills the user's complete token balance or native dust with calculated gas safety buffers.
- **Alternate Target Selector**: Toggle between the canonical `0x0000...dEaD` (recommended for standard ERC-20s) and EVM pure zero address `0x0000...0000`.
- **The Minimalist Burn Trigger**: Monospace text trigger `[ burn ]` floating unbordered in negative space, turning stark white on hover.
- **Real-Time Transaction Tracker**: Displays real-time states (`awaiting wallet signature...` &rarr; `transmitting to the void...` &rarr; `annihilated [tx: 0x...]`) with block explorer redirection to `scan.botchain.ai`.

### Section 02: The Sensor (`// 02. THE SENSOR`)
- **Automated Spam & Dust Surveillance**: Displays discovered wallet tokens, suspicious airdrop coupons, and sub-gas dust fragments. Includes a sample link to the deployed Void Burner contract.
- **Custom Token Contract Tracker**: Input any ERC-20 contract address to instantly scan its balance, verify metadata, and add it to the monitoring watchlist.
- **Risk Categorization**: Categorizes assets as `MALICIOUS AIRDROP`, `SUB-GAS DUST`, or `STANDARD TOKEN`.
- **One-Click Actions**:
  - `[load to crucible]`: Populates the crucible with the selected token and scrolls seamlessly to the burner.
  - `[burn]`: Triggers immediate dissolution with maximum balance.
  - `[dismiss]`: Cleans the sensor watchlist.

### Section 03: The Graveyard (`// 03. THE GRAVEYARD`)
- **Persistent Abyss Transaction Ledger**: Local chronological audit trail of all burn transactions executed during the session (stored in persistent browser storage).
- **Comprehensive Extinction Data**: Shows precise UTC timestamps, transaction hash links (direct to `scan.botchain.ai/tx/...`), token symbol, destroyed quantity, dead address recipient, gas units consumed, and confirmation state.
- **Ledger Filtering**: Filter transactions by `[ all records ]`, `[ erc-20 tokens ]`, or `[ native dust ]`.
- **JSON Audit Export**: One-click download of the complete burn ledger formatted as JSON for archival or tax/accounting loss documentation.
- **Purge Control**: Ability to wipe local transaction cache at will.

### Section 04: The Doctrine (`// 04. THE DOCTRINE`)
- **Direct Transfer Principle (Zero-Router Security)**: Explains why The Void requires **NO token approvals (`approve`)** to any third-party contract, eliminating smart contract drainer vulnerabilities.
- **The Zero Revert Anomaly**: Explains EVM bytecode rules and why standard OpenZeppelin contracts revert on `0x0000000000000000000000000000000000000000` (`require(to != address(0))`), mandating the use of `0x000000000000000000000000000000000000dEaD`.
- **Entropy Horizon ($2^{160}$)**: Details the mathematical impossibility of private key brute-forcing across the 160-bit EVM address space.
- **Defense Against Address Poisoning**: Explains how removing zero-value dust transfers and phishing token names sanitizes wallet history against copy-paste exploits.

### Section 05: The Epilogue (`// 05. THE EPILOGUE`)
- **Interactive Void Terminal**: Monospace CLI console supporting commands:
  - `help` — Print available commands
  - `status` — View active wallet, chain ID (677), and network telemetry
  - `contract` / `scan` — Print mainnet contract address and explorer link
  - `stats` — Display aggregate destruction metrics
  - `genesis` — Render ASCII void singularity artwork
  - `target` — Display the canonical dead address
  - `sound` — Toggle audio synthesis
  - `clear` — Wipe the console screen
- **Live Network Broadcast Stream**: Simulated real-time ticker displaying burn events happening across the decentralized network.
- **Atmospheric Minimalist Footer**:
  - Twitter / X: `https://x.com/site_proof__`
  - Powered by: `https://botchain.ai`
  - Contract Scan link: `https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324`

---

## 2. How to Use Locally and Test with MetaMask on BOT Chain Mainnet

### Step 1: Install Dependencies & Run the App

Open PowerShell or terminal in the project directory:

```bash
# Navigate to the workspace
cd "e:\D'APPS\The Void"

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```

Open your browser to the local URL displayed (typically `http://localhost:5173`).

---

### Step 2: Adding & Connecting BOT Chain Mainnet to MetaMask

#### Method A: Automatic Switch via The Void UI (Recommended)
1. Open `http://localhost:5173`.
2. In Section 00 (`THE THRESHOLD`), click **[connect metamask]**.
3. If MetaMask is on another network, click **net: ... [switch]** and select **[bot chain mainnet]**.
4. MetaMask will present a prompt: **"Allow this site to add a network?"** with:
   - **Network Name**: `BOT Chain Mainnet`
   - **Network URL**: `https://rpc.botchain.ai`
   - **Chain ID**: `677`
   - **Currency Symbol**: `BOT`
5. Click **Approve** & **Switch Network**.

#### Method B: Manual Addition in MetaMask
1. Open MetaMask &rarr; Click the Network Dropdown in the top left &rarr; Click **Add network** &rarr; **Add a network manually**.
2. Enter the following parameters:
   - **Network name**: `BOT Chain Mainnet`
   - **New RPC URL**: `https://rpc.botchain.ai`
   - **Chain ID**: `677`
   - **Currency symbol**: `BOT`
   - **Block explorer URL**: `https://scan.botchain.ai`
3. Click **Save** and select **BOT Chain Mainnet**.

---

### Step 3: Manual Testing Checklist (Feature by Feature)

#### Test Case 1: Burning Native BOT Dust
1. In Section 01 (`THE CRUCIBLE`), click:
   ```text
   [02. native bot dust]
   ```
2. Verify that `native_asset >` displays `BOT (Native Dust) // balance: <YOUR_BALANCE> BOT`.
3. Enter a micro dust amount in `burn_amount >`, for example:
   ```text
   0.0001
   ```
4. Hover over the **[ burn ]** text (observe it turning **stark white**).
5. Click **[ burn ]**.
6. MetaMask will prompt you to confirm the transaction to `0x000000000000000000000000000000000000dEaD`.
7. Confirm the transaction.
8. Watch the real-time tracker:
   ```text
   * status: dissolving dust into the void... [tx: 0x...]
   ```
9. When confirmed, scroll down to Section 03 (`THE GRAVEYARD`):
   - Click the transaction hash to verify it directly on [scan.botchain.ai](https://scan.botchain.ai)!

---

#### Test Case 2: Burning ERC-20 Tokens on BOT Chain
1. In Section 01 (`THE CRUCIBLE`), select:
   ```text
   [01. erc-20 token / spam]
   ```
2. Paste the target ERC-20 contract address on BOT Chain into `token_contract >`.
3. The Void automatically inspects the contract and displays:
   ```text
   asset_meta: <SYMBOL> / <NAME> / your_balance: <BALANCE>
   ```
4. Click `[nullify all / max]` to auto-fill the full balance.
5. Click **[ burn ]** (turns stark white on hover).
6. Confirm the direct `transfer(0x000...dEaD, amount)` transaction in MetaMask.
7. Verify on [scan.botchain.ai](https://scan.botchain.ai) that the tokens were transferred directly to the dead address.

---

#### Test Case 3: Testing with Sandbox Simulation Mode (Zero Gas)
1. In Section 00 (`THE THRESHOLD`), click:
   ```text
   [enable sandbox mode]
   ```
2. The app enters simulation mode (`account: 0x71C...void4b2`, `network: BOT Chain Mainnet Simulation`).
3. In Section 02 (`THE SENSOR`), click `[load to crucible]` next to any test token.
4. Click **[ burn ]**.
5. Observe the simulated transmission sequence, sound feedback, and automatic entry into the Graveyard ledger.

---

#### Test Case 4: Testing The Terminal Commands
1. Scroll to Section 05 (`THE EPILOGUE`).
2. In the console prompt (`void@console:~$`), test the following commands:
   - `contract` &rarr; Prints the BOT Chain mainnet contract address and scan link.
   - `status` &rarr; Prints node connection, chain ID 677, and account status.
   - `stats` &rarr; Prints destruction metrics.
   - `genesis` &rarr; Displays the ASCII void singularity.
   - `clear` &rarr; Clears the terminal screen.

---

#### Test Case 5: Testing Footer Links & Attributes
1. Scroll to the very bottom of the page.
2. Verify the 3 links in the footer:
   - **`[x / twitter: @site_proof__]`** &rarr; Opens `https://x.com/site_proof__`.
   - **`powered by [botchain.ai]`** &rarr; Opens `https://botchain.ai`.
   - **`contract: [0xFD51...8324] [scan]`** &rarr; Opens `https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324`.
3. Hover over each link to verify it turns stark white (`#ffffff`) with zero borders or containers.

---

## 4. Custom Smart Contract Integration (When Deployed)

A dedicated contract configuration file is pre-staged at:
[`src/constants/contract.ts`](file:///e:/D'APPS/The%20Void/src/constants/contract.ts)

When you deploy your custom contract on BOT Chain Mainnet:
1. Update `MAINNET_CONFIG.contractAddress` in `src/constants/contract.ts` with your new deployed address.
2. If your contract introduces custom methods (e.g. `burnBatch()`, `burnAndLog()`, or a custom fee burner), paste your ABI JSON array into `VOID_BURNER_ABI` in `src/constants/contract.ts`.
3. The Web3 service is already architected to utilize this configuration.
