# Espresso – React Native Restaurant Ops & Guest App

Espresso is a production-ready React Native (TypeScript) application built with the React Native CLI. It powers the daily guest, staff, and owner workflows for a hospitality team.

## Features

- **Role-based experience** – Switch between Guest, Staff, and Owner flows from the role gate.
- **Guest journey** – Collect profile details, check party size, confirm check-in, and review previous visits or offers.
- **Staff tools** – Manage personal/public notices, send broadcasts, track the live floor, and operate the waitlist and inbox.
- **Owner insights** – Real-time dashboard with sparkline trends, visit ledger, offer analytics, and restaurant settings.
- **Mock API client** – Toggleable mock data layer (`USE_MOCK=true`) backed by an offline queue using AsyncStorage.
- **Push-ready scaffolding** – Firebase Cloud Messaging registration & topic placeholders.
- **Offline resilience** – Banner showing offline state or pending replay queue.
- **Testing & quality** – Jest + React Native Testing Library, ESLint, Prettier, and Husky pre-commit hook.

## Project structure

```
src/
  api/          // typed API client and mock data
  components/   // shared UI components (cards, sparklines, etc.)
  hooks/        // polling + bootstrap hooks
  navigation/   // role/tab navigators and route typing
  screens/      // guest, staff, and owner experiences
  store/        // zustand global store slices
  theme/        // light/dark theming with Espresso branding
  utils/        // formatting helpers
```

## Prerequisites

- Node.js 20+
- React Native CLI environment (Android Studio and/or Xcode toolchain)
- CocoaPods (`bundle install && bundle exec pod install` inside `ios/` for iOS builds)

## Installation

```sh
npm install
npm run prepare # installs Husky hooks
```

## Running the app

Start Metro bundler:

```sh
npm start
```

In another terminal build & run:

```sh
# Android (USB device or emulator)
npm run android

# iOS (from macOS)
npx pod-install ios
npm run ios
```

Environment variables can be provided via Metro using `.env` or directly in the shell. The mock API is enabled by default (`USE_MOCK=true`).

## Testing & linting

```sh
npm run lint
npm run test
npm run typecheck
```

The Husky pre-commit hook runs `npm run lint` and `npm run test` automatically.

## Firebase Cloud Messaging

The app includes scaffolding for `@react-native-firebase/messaging`. To enable push notifications:

1. Configure a Firebase project and add the iOS/Android native setup (Google Services files and initialization code).
2. Provide real topic names (e.g., `restaurant/{id}/broadcasts`) in `SettingsScreen` or environment config.
3. Update `useAppBootstrap` with logic to persist tokens to your backend via the API client.

## Offline & demo mode

- Set `USE_MOCK=true` (default) for the in-memory mock data that powers demo flows.
- Offline mutations are queued via AsyncStorage; when connectivity returns, the app replays them and displays a banner.

## Deep links

The navigation container handles the following URIs:

- `espresso://offer/{offerId}` → Offer detail screen
- `espresso://visit/{visitId}` → Visit detail screen

Use `xcrun simctl openurl booted espresso://offer/offer-1` to test on iOS simulators.

## Accessibility & theming

All interactive elements include accessibility labels and the UI adapts automatically to the system light/dark mode using the Espresso brand palette (primary `#6C3B2A`, accent `#F3B34C`).

---

Happy brewing!
