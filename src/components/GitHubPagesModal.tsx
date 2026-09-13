import React, { useState } from 'react';
import { X, Copy, Check, Github, ExternalLink } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const deployYmlContent = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build SPA
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-white border border-neutral-700">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">GitHub Pages CI/CD Deployment Guide</h3>
              <p className="text-xs text-neutral-400">Zero backend required. Fully automated client-side static deployment.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar text-xs">
          {/* Quick Steps */}
          <div>
            <h4 className="font-bold text-sm text-white mb-2">1. One-Click Setup Steps</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-neutral-300">
              <li>
                Push this project into your GitHub repository (e.g. <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-blue-400">username/social-media-mockups</code>).
              </li>
              <li>
                In your GitHub repository, navigate to <span className="font-semibold text-white">Settings &rarr; Pages</span>.
              </li>
              <li>
                Under <span className="font-semibold text-white">Build and deployment &rarr; Source</span>, choose <span className="text-blue-400 font-semibold">GitHub Actions</span>.
              </li>
              <li>
                Place the workflow file below into <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-amber-300">.github/workflows/deploy.yml</code>.
              </li>
              <li>
                Every git push to the <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-green-400">main</code> branch automatically builds and deploys your site to GitHub Pages!
              </li>
            </ol>
          </div>

          {/* Workflow Code */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-neutral-300">
                .github/workflows/deploy.yml
              </span>
              <button
                onClick={() => handleCopy(deployYmlContent, 'yml')}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
              >
                {copiedSection === 'yml' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Workflow</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black border border-neutral-800 text-neutral-300 font-mono text-[11px] overflow-x-auto custom-scrollbar">
              {deployYmlContent}
            </pre>
          </div>

          {/* Directory Architecture */}
          <div>
            <h4 className="font-bold text-sm text-white mb-2">2. Clean Modular Architecture</h4>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-400 leading-relaxed">
              <p>├── .github/workflows/deploy.yml   <span className="text-neutral-500"># Automated GH Actions workflow</span></p>
              <p>├── src/</p>
              <p>│   ├── types.ts                   <span className="text-neutral-500"># Strict TypeScript interfaces</span></p>
              <p>│   ├── data/initialData.ts        <span className="text-neutral-500"># Platform presets & sample content</span></p>
              <p>│   ├── components/</p>
              <p>│   │   ├── DeviceFrame.tsx        <span className="text-neutral-500"># iPhone 16 / Android / Borderless chassis</span></p>
              <p>│   │   ├── EditorPanel.tsx        <span className="text-neutral-500"># Contextual multi-platform controls</span></p>
              <p>│   │   ├── platforms/             <span className="text-neutral-500"># 8 Pixel-perfect platform mockups</span></p>
              <p>│   │   └── common/                <span className="text-neutral-500"># Status bars, badges, FileReader uploader</span></p>
              <p>│   └── App.tsx                    <span className="text-neutral-500"># Split-screen responsive layout</span></p>
              <p>└── vite.config.ts                 <span className="text-neutral-500"># Fast static SPA compiler</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
