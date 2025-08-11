# Movie Demo App

A React Native app built with Expo that displays popular movies using The Movie Database (TMDb) API.

## Features

- Browse popular movies
- View movie details
- Responsive UI with custom theming
- Navigation between screens

## Project Structure

```
.
├── App.tsx
├── index.ts
├── app.config.js
├── app.json
├── .env
├── assets/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── theme/
│   └── types/
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd movie-demo
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your TMDb API key in a `.env` file:

   ```
   TMDB_API_KEY=your_tmdb_api_key
   ```

### Running the App

Start the Expo development server:

```sh
npm start
```

Then follow the instructions to run on Android, iOS, or web.

## Environment Variables

- `TMDB_API_KEY`: Your TMDb API key (see `.env` and [src/types/env.d.ts](src/types/env.d.ts))

## Scripts

- `npm start` - Start the Expo server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web
