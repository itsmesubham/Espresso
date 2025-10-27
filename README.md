# Espresso - Restaurant Ops & Guest App

A production-ready React Native (TypeScript) app for restaurant operations and guest experiences.

## Features

- Guest onboarding with party size selection
- Staff communication tools (personal and public notices)
- Owner dashboard with real-time metrics
- Push notifications and broadcasts
- Offline support with queued mutations

## Tech Stack

- React Native CLI (no Expo)
- TypeScript
- @react-navigation/native
- Zustand for state management
- React Native Reanimated
- Axios for networking
- React Hook Form + Zod for validation
- Firebase Cloud Messaging for push notifications
- AsyncStorage for local storage

## Brand Colors

- Primary: #6C3B2A (Espresso)
- Accent: #F3B34C (Gold)
- Surface: #FFF8F2 (Light Cream)

## Project Setup

### Prerequisites

- Node.js (v20+)
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Espresso
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Environment Variables

Create a `.env` file in the project root:

```
API_BASE_URL=http://localhost:3000/api
USE_MOCK=true
```

### Push Notifications Setup

For push notifications, you'll need to:

1. Follow the Firebase documentation to set up an FCM project
2. Add your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) files
3. Configure notification handling in the app

### Development

To run in development mode with live reloading:
```bash
npm start
```

To run tests:
```bash
npm test
```

To lint:
```bash
npm run lint
```

## Project Structure

```
src/
├── app.tsx
├── navigation/
├── screens/
│   ├── guest/
│   ├── staff/
│   └── owner/
├── components/
├── api/
├── store/
├── theme/
├── utils/
├── hooks/
└── types/
```

## Roles

- Guest: Check in, view previous visits, receive offers
- Staff: Send notices, manage floor, handle waitlist
- Owner: View real-time metrics, manage offers, configure settings

## API Integration

The app uses a mock API by default. To connect to a real backend:

1. Set `USE_MOCK=false` in your environment
2. Update `API_BASE_URL` to point to your backend service
3. Implement the API endpoints as specified in the requirements

## Testing

Run unit tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT