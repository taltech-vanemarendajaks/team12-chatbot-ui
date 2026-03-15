# Chatbot UI

A modern React-based chatbot interface built with TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19.2.4, TypeScript 5.9.3, Vite 8.0.0
- React Router DOM 7.13.1,
- Axios 1.13.6
- Tailwind CSS 4.2.1
- Material-UI 7.3.9,

## Quick Start

```
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src
├─ app/         # App setup (App, Router, Providers)
├─ features/    # Feature modules (chat, history)
├─ shared/      # Shared components, hooks, utils
└─ store/       # State management
```

- Full structure:

```
src
├─ app
│ ├─ App.tsx
│ ├─ Router.tsx
│ └─ Providers.tsx
│
├─ features
│ ├─ chat
│ │ ├─ components
│ │ │ ├─ ChatWindow.tsx
│ │ │ ├─ ...
│ │ │ └─ InputBox.tsx
│ │ │
│ │ ├─ hooks
│ │ │ └─ ...
│ │ │
│ │ ├─ api
│ │ │ └─ ...
│ │ │
│ │ ├─ context
│ │ │ └─ ...
│ │ │
│ │ ├─ pages
│ │ | └─ ChatPage.tsx
│ │
│ ├─ history
│ │ ├─ api
│ │ ├─ components
│ │ └─ pages
│
├─ shared
│ ├─ ui
│ │ ├─ Button.tsx
│ │ ├─ Spinner.tsx
│ │ └─ ...
│ │
│ ├─ layout
│ │ ├─ Header.tsx
│ │ ├─ ...
│ │ └─ Footer.tsx
│ │
│ ├─ services
│ │ ├─ apiClient.ts
│ │ └─ ....
│ │
│ ├─ hooks
│ │ └─ useSharedHook.ts
│ │
│ ├─ utils
│ │ └─ formatTime.ts
|
├─ store
│ ├─ uiStore.ts (zustand or sth lightweight perhaps?)
│ ├─ authStore.ts
│ └─ chatStore.ts
│

```

## Configuration

- **Vite**
- **Tailwind CSS v4**: Configured via PostCSS (`@tailwindcss/postcss`)
- **TypeScript**: Strict type checking enabled

## Notes

- React Router DOM v7 requires React 19
- Tailwind CSS v4 uses CSS-based config (no `tailwind.config.js`)
