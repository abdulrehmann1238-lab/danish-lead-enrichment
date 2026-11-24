# LeadEnrich — Danish B2B Lead Intelligence & Enrichment Platform

> **Scandinavian Enterprise Minimalism** | Production-Quality Interactive SaaS Demonstration

LeadEnrich provides a searchable database of approximately 15,000 Danish business contacts with intelligent multi-provider waterfall enrichment, CVR registry integration, and GDPR Article 21 suppression management.

---

## 🌟 Key Features

- **15,000 Danish B2B Contacts**: 10,000 freely accessible contacts + 5,000 premium executive records.
- **Waterfall Enrichment Engines**: Waterfall routing across **Prospeo**, **Findymail**, **Coresignal**, **ContactOut**, and **Forager**.
- **Official Danish CVR Register**: Real-time business data from Erhvervsstyrelsen (datacvr.virk.dk).
- **Strict Prepaid Credit Wallet**: 
  - Email reveal: 5 credits
  - Phone reveal: 10 credits
  - Combined reveal: 15 credits
  - No negative balances, no overages, and an atomic ledger architecture with idempotency keys.
- **Clay-Inspired Data Workspace**: Step-by-step waterfall execution pipeline with match confidence and deliverability checks.
- **GDPR & Privacy Control Center**: Enforced suppression registry (opted-out contacts are ineligible for enrichment and export across the app), DSR request logs, and 15 subprocessor disclosures.
- **Export & Import Engine**: In-browser CSV downloads and dynamic column mapping with PapaParse.
- **Global Command Palette**: Instant navigation via `Cmd+K` or `Ctrl+K`.
- **Scandinavian Design**: Deep forest green (`#203C34`), Sage green (`#739181`), and Sand (`#E9E5DC`), with full dark mode toggle.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/abdulrehmann1238-lab/danish-lead-enrichment.git
cd danish-lead-enrichment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
```

The output will be created in the `dist/` directory, ready to deploy to Netlify, Vercel, or any static host.

---

## 🌐 Netlify Deployment

This repository includes pre-configured `netlify.toml` and `public/_redirects` for Single Page Application (SPA) routing:

1. Connect your GitHub repository to [Netlify](https://app.netlify.com/).
2. Netlify will auto-detect settings from `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **Deploy Site**.

---

## 🛡️ License

MIT License. Designed for European B2B customer acquisition demonstration.
