# Social Media Mockup & Fake Screenshot Generator

A production-ready, strictly-typed TypeScript single-page application (SPA) for generating pixel-perfect social media mockups and screenshots (inspired by tools like Zeoob, FakeDetail, and PrankShit).

Designed specifically for **100% client-side execution** and **automated GitHub Pages deployment** with zero backend or database dependencies.

---

## 🚀 Features

- **9 Supported Platforms**:
  - **FANZA**: Storefront Product & Review Page (hinban code, star rating, discount/price box, performer & maker card, genre tags, customer reviews) and TV Stream Player mode.
  - **DMM Fanbox**: Creator fanclub posts, supporter-only locked previews, plan pricing, and comments.
  - **DLsite**: Digital doujin/ASMR storefront (`RJ` work codes, format badges, star rating, sales count, discount box, sample preview player, and user reviews).
  - **Fantia**: Fanclub posts, plan-locked exclusives, member counts, and supporter comments.
  - **OnlyFans**: Feed Posts, Paywalled/Locked Posts (custom unlock price, blur overlay, tip button), and DM Chat.
  - **Fansly**: Creator Feed Posts, Tier-Locked media, Verified badges, DM Chat, and post comments.
  - **XVideos**: Video Player UI (progress bar, rating/like controls, tags, comments).
  - **Pornhub**: Video Player UI (4K badge, orange seekbar, approval rating, channel card, tags, comments).
  - **Blacked**: Luxury studio scene player (cast & director credits, synopsis, 4K UHD tag, star rating, member reviews).

- **Flexible View & Chassis Options**:
  - Clean Screenshot (Portrait default).
  - iPhone 16 Pro Titanium Frame (with hardware buttons and Dynamic Island).
  - Desktop (Landscape) View.

- **Status Bar Customization**:
  - Time, battery percentage & charging indicator, signal strength, 5G/LTE/4G/Wi-Fi toggles, light/dark mode.

- **Instant Export**:
  - Download high-resolution PNG using client-side DOM capture (`modern-screenshot` / `html-to-image` / `html2canvas` fallback chain).
  - Copy directly to clipboard.

- **HTML5 FileReader API**:
  - Drag-and-drop or select any image to immediately convert into base64 data URLs without external servers.

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD for GitHub Pages
├── src/
│   ├── types.ts                  # Comprehensive TypeScript interfaces & types
│   ├── data/
│   │   ├── initialData.ts        # Realistic presets & default state for all 9 platforms
│   │   └── platforms.ts          # Platform registry & labels
│   ├── utils/
│   │   ├── exportHelper.ts       # Multi-tier PNG/clipboard capture engine
│   │   └── statRandomizer.ts     # Proportionate metric generators
│   ├── components/
│   │   ├── DeviceFrame.tsx       # Portrait screenshot / iPhone 16 Pro / Desktop viewports
│   │   ├── EditorPanel.tsx       # Left control panel orchestrator
│   │   ├── GitHubPagesModal.tsx  # Interactive deployment modal
│   │   ├── editor/               # Modular content, messages, and device editors
│   │   ├── common/               # StatusBar, SafeImage, ImageUploader, PlatformDropdown
│   │   └── platforms/            # 9 Dedicated platform mockup renderers
│   ├── App.tsx                   # Main split-screen UI container
│   ├── main.tsx                  # React DOM entry point
│   └── index.css                 # Tailwind CSS & custom keyframe animations
├── index.html                    # Entry HTML document
├── package.json
└── vite.config.ts
```

---

## 🚢 Deploying to GitHub Pages

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Social Media Mockup Generator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment &rarr; Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   The workflow at `.github/workflows/deploy.yml` triggers automatically on push to `main` and publishes your static build (`dist/`) directly to your custom `https://<username>.github.io/<repo>/` domain.
