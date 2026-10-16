# Vini IAS – Mobile App (React Native + Expo)

The Vini IAS student app, built with **React Native** using **Expo** (SDK 57) and **Expo Router**.
One codebase runs on **Android, iOS and the web**.

> **Why SDK 57?** The Expo Go app in the Play Store and App Store supports only **one** Expo SDK at a time.
> SDK 58 came out on 15 Oct 2026, but its Expo Go update won't reach the stores for a few weeks.
> When the store's Expo Go moves to SDK 58, upgrade with:
> `npx expo install expo@^58.0.0 --fix`

---

## 1. One-time setup (on your Mac)

1. **Install Node.js (LTS)**: download it from https://nodejs.org and install it.
   Check that it worked by opening **Terminal** and running:
   ```bash
   node -v   # should print v20 or higher
   npm -v
   ```
2. **Install "Expo Go" on your phone** from the Play Store (Android) or the App Store (iPhone).
   This app lets you open the project on your phone without Android Studio or Xcode.

## 2. Install the project's packages (first time only)

```bash
cd ~/Documents/VINI-APP
npm install
```

This creates a `node_modules` folder. It takes a few minutes the first time.

## 3. Run the app

```bash
npm start
```

A **QR code** appears in the Terminal.

- **Android:** open **Expo Go**, then tap **Scan QR code**.
- **iPhone:** open the normal **Camera** app, scan the QR code, then tap the banner that appears.

Your phone and Mac must be on the **same Wi-Fi network**. If that's not possible, run `npx expo start --tunnel` instead.

While `npm start` is running, you can press these keys in the Terminal:

| Key | What it does |
|-----|--------------|
| `w` | Opens the app in your web browser (quickest way to preview) |
| `i` | Opens the iOS Simulator (needs Xcode installed) |
| `a` | Opens the Android Emulator (needs Android Studio installed) |
| `r` | Reloads the app |
| `Ctrl + C` | Stops the server |

When you save a file, the app on your phone **updates instantly**.

## 4. Where things are

```
VINI-APP/
├── app.json                 ← app name, icon, splash screen, package id
├── assets/                  ← app icon, splash image, logo and banners
└── src/
    ├── app/                 ← SCREENS (each file is a screen, via Expo Router)
    │   ├── _layout.tsx
    │   └── (tabs)/          ← bottom tab bar: Home, Study, Tests, Store, Profile
    │       ├── _layout.tsx
    │       ├── index.tsx    ← HOME SCREEN (puts all the sections together)
    │       ├── study.tsx / tests.tsx / store.tsx / profile.tsx  (placeholders)
    ├── components/
    │   ├── ui.tsx           ← shared pieces: section titles, buttons, bottom sheet
    │   └── home/            ← one file per Home section, matching the sketch:
    │       ├── HomeHeader.tsx       logo · Current Goal · Refer & Earn · notifications · search + Study
    │       ├── HeroCarousel.tsx     auto-sliding hero banners (same as the website)
    │       ├── QuickTiles.tsx       All Batches · Current Affairs · Test Series · Daily Practice …
    │       ├── FreeBatch.tsx        Free Batch with Courses / Test toggle
    │       ├── MarketingBanner.tsx  marketing banner + promo strip
    │       ├── PopularCourses.tsx   Popular Courses + View all
    │       ├── EShorts.tsx          eShorts reels + app elements strip
    │       ├── SpecialProgram.tsx   A4-size special program posters
    │       ├── StudentLove.tsx      hanging testimonial cards + "Rate Your Love"
    │       └── CallbackSection.tsx  "Still have a doubt?" Call / Form
    └── constants/
        ├── theme.ts         ← brand colours (Vini red #FE0034), contact number
        └── data.ts          ← ALL home-screen content (banners, courses, tests, reviews)
```

**To change text, courses, prices or banners, edit `src/constants/data.ts`.**
To add a banner, put the image in `assets/images/banners/` and add it to `data.ts`.

> ⚠️ Course prices, lesson counts, eShorts and student testimonials in `data.ts` are **sample content**.
> Replace them with real data, or load them from your backend, before publishing.

## 5. Useful commands

```bash
npm start              # start the dev server (QR code)
npm run web            # open directly in the browser
npm run typecheck      # check for TypeScript errors
npx expo lint          # check code style
npx expo install <pkg> # add a library (always use this instead of npm install <pkg>)
npm run update:apk     # push JS/design changes to installed APKs (no rebuild)
npm run build:apk      # build a new test APK (only when native things change)
```

## 6. Send an APK to the client (Android test build)

An **APK** is an Android app file. The client downloads it and installs it directly,
without the Play Store and without Expo Go. Expo's free cloud build service (**EAS Build**)
makes the APK for you, so you don't need Android Studio.

The build settings are already in `eas.json`:

| Profile | What it makes | Use it for |
|---------|---------------|------------|
| `preview` | `.apk` file | sending to the client / testers |
| `production` | `.aab` file | uploading to the Google Play Store |

### First time only
1. Create a free account at https://expo.dev/signup.
2. In Terminal, inside the project folder:
   ```bash
   npx eas-cli@latest login
   npx eas-cli@latest init      # links this project to your Expo account (answer "Yes")
   ```

### ⚡ Most changes: send an update, no new APK (≈1 minute)

The app has **EAS Update** built in. After the client installs an APK once, any change to
screens, text, styles, data or images reaches their phone without a new build:

```bash
npm run update:apk
```
Type a short message when asked (e.g. "New home banners"). That's it.
The next time the client **opens the app**, it downloads the change and restarts into it.
(If they're offline, they keep the current version until the next launch.)

You need a **new APK** only when something *native* changes:
- you add a library with `npx expo install …` (one that has native code)
- you change the app name, icon, splash screen, package id or permissions in `app.json`
- you upgrade the Expo SDK

The app decides this automatically with a "fingerprint" of its native parts, so an update is never
sent to an APK it doesn't fit. ⚠️ Don't change `"version"` in `app.json` unless you're making a new APK,
because changing it starts a new APK line and older installs stop receiving updates.

### When you need a new APK
```bash
npm run build:apk
```
Test APKs (`preview`) are built only for 64-bit phones (`arm64-v8a`, i.e. almost every Android phone since 2017)
and use EAS's C++ compile cache (`EAS_USE_CACHE`), so repeat builds are faster.
Most of the wait on a free Expo plan is the **queue** before the build starts. A paid plan skips it.
- On the first build it asks: *"Generate a new Android Keystore?"* Answer **Yes**.
  Expo creates and stores the app's signing key for you. Keep using the same Expo account,
  because Android only accepts updates signed with the same key.
- The build runs in the cloud and usually takes 10–20 minutes. When it finishes, Terminal shows
  a **link and a QR code**. You can also find every build at https://expo.dev under your project → **Builds**.
- **Send that link to the client.** They open it on their Android phone, tap **Install**,
  and allow "Install unknown apps" for their browser when Android asks.

When you do build a new APK, you can increase `"version"` in `app.json` (e.g. `1.0.0` → `1.0.1`)
so you and the client can tell builds apart. The client installs the new APK over the old one,
and from then on `npm run update:apk` updates that new APK.

> If you sent the client an APK that was **not** built by EAS (for example the first test APK
> that came with this project), they must **uninstall it once** before installing an EAS-built APK,
> because the two are signed with different keys.

### iPhone clients
Apple doesn't allow installing app files directly. For iOS test builds you need an
Apple Developer account ($99/year). Then use `npx eas-cli@latest build --platform ios --profile preview`
(registered devices) or TestFlight.

### Play Store release (later)
```bash
npm run build:playstore    # makes the .aab file to upload in Google Play Console
```

Docs: https://docs.expo.dev/build/setup/ and https://docs.expo.dev/build/internal-distribution/

## Troubleshooting

- **Expo Go says the project is incompatible:** the project's Expo SDK and the Expo Go app's SDK don't match.
  The Expo Go version on your phone (Expo Go → Settings) must equal the `expo` version in `package.json` (57).
  If the store's Expo Go has moved to a newer SDK, upgrade the project with `npx expo install expo@^<newSDK>.0.0 --fix`.
- **Something looks stuck or old:** stop with `Ctrl + C`, then run `npx expo start --clear`.
- **Phone can't connect:** make sure it's on the same Wi-Fi, or use `npx expo start --tunnel`.
