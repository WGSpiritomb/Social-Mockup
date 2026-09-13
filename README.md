# Social Media Mockup & Fake Screenshot Generator

A production-ready, strictly-typed TypeScript single-page application (SPA) for generating pixel-perfect social media mockups and screenshots (inspired by tools like Zeoob, FakeDetail, and PrankShit).

Designed specifically for **100% client-side execution** and **automated GitHub Pages deployment** with zero backend or database dependencies.

---

## 🚀 Features

- **8 Supported Platforms**:
  - **X (Twitter)**: Tweet Posts (verified badges, views, likes, reposts, bookmarks, fake reply threads) & DM Chat.
  - **Instagram**: Feed Posts (story rings, location, caption, comments), DM Chat, and Instagram Live (floating animated hearts, LIVE badge, viewer count, live comments).
  - **TikTok**: Video Feed UI (music disc spin, follower count, like/bookmark/share action columns) and TikTok Live (gifts, host coins, top gifters, live chat).
  - **Facebook**: Newsfeed Posts (reactions breakdown: Like, Love, Care, Haha, Wow, Sad, Angry, privacy icons, nested comments) and Messenger Chat.
  - **YouTube**: Video Player UI (seek bar, duration, views, subscriber count, Like/Dislike pills), Channel Page, and Live Stream with Super Chat replays.
  - **OnlyFans**: Feed Posts, Paywalled/Locked Posts (custom unlock price, blur overlay, tip button), and DM Chat.
  - **iMessage**: Single Thread & Group Chat (iOS blue/green bubbles, timestamps, read receipts, animated typing indicator).
  - **FaceTime**: Active Video Call (fullscreen feed, PiP selfie inset, floating control bar) and Audio Call.

- **Realistic Smartphone Chassis**:
  - iPhone 16 Pro (Titanium frame with hardware buttons and Dynamic Island).
  - Android (Modern punch-hole camera styling).
  - Borderless Screenshot Mode.

- **Status Bar Customization**:
  - Time, battery percentage, signal strength, 5G/LTE/Wi-Fi toggles, light/dark mode.

- **Instant Export**:
  - Download high-resolution PNG using client-side DOM capture (`html-to-image`).
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
│   │   └── initialData.ts        # Realistic presets & default state for all 8 platforms
│   ├── components/
│   │   ├── DeviceFrame.tsx       # iPhone 16 Pro / Android / Borderless device mockups
│   │   ├── EditorPanel.tsx       # Left control panel with contextual form editors
│   │   ├── GitHubPagesModal.tsx  # Interactive deployment modal
│   │   ├── common/
│   │   │   ├── StatusBar.tsx     # Authentic iOS and Android status bars
│   │   │   ├── Badges.tsx        # Verified badges (Twitter blue/gold/gray, IG, TikTok, YT)
│   │   │   └── ImageUploader.tsx # HTML5 FileReader base64 image uploader
│   │   └── platforms/            # 8 Dedicated platform mockup renderers
│   │       ├── TwitterMockup.tsx
│   │       ├── InstagramMockup.tsx
│   │       ├── TikTokMockup.tsx
│   │       ├── FacebookMockup.tsx
│   │       ├── YouTubeMockup.tsx
│   │       ├── OnlyFansMockup.tsx
│   │       ├── IMessageMockup.tsx
│   │       └── FaceTimeMockup.tsx
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
