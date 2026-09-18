# NOTUFY — Personal Notes Single Page Application (SPA)

**Notufy** is a modern, responsive personal notes Single Page Application built with **React**, **Vite**, and **React Router**, powered by the **Dicoding Notes RESTful API**. Designed with an editorial, minimalist Anytype-inspired aesthetic, Notufy features clean hairline borders, curated typography, dark mode capability, internationalization (English & Indonesian), global context state management, custom hooks, and authenticated note-taking.

---

## 🌟 Key Features

- **Authentication & Security**:
  - Full registration with real-time validation (email syntax, password minimum 6 chars, confirm password verification).
  - Secure login storing access token in `localStorage`.
  - Global `AuthContext` with automatic token verification (`getUserLogged`) on session startup.
  - Safe logout clearing credentials and resetting client state.
- **Route Protection**:
  - **Protected Routes**: Home (`/`), Archives (`/archives`), New Note (`/notes/new`), and Detail (`/notes/:id`) require authentication and redirect guests to `/login`.
  - **Public Routes**: `/login` and `/register` automatically redirect authenticated users to `/`.
  - Fallback 404 page for unknown routes or missing note resources.
- **Complete Note Management (REST API Source of Truth)**:
  - **Active Notes**: Browse all active notes with instant search filtering.
  - **Archived Notes**: Separate dedicated archive management space.
  - **Create Note**: Title input and rich `contentEditable` body with HTML parsing (`html-react-parser`).
  - **Note Detail**: View complete note information, status, and formatted creation date.
  - **Archive & Unarchive**: One-click toggling between active and archived states.
  - **Delete Note**: Permanently delete notes with mutation protection.
- **Search & URL Synchronization**:
  - Real-time case-insensitive keyword filtering.
  - Synchronized query parameter (`/?keyword=...` and `/archives?keyword=...`).
- **Global Context Architecture**:
  - `AuthContext`: Centralized user profile and authentication status.
  - `ThemeContext`: Seamless toggle between Light and Dark mode with persistent `localStorage`.
  - `LocaleContext`: Instant switching between English (default) and Bahasa Indonesia with persistent `localStorage`.
- **Reusable Custom Hooks**:
  - `useInput`: Streamlined form input state handling.
  - `useAuth`: Direct access to authentication state and actions.
  - `useNotes`: Encapsulated API operations, loading states, and error handling.
- **User Experience & Feedback**:
  - Visual loading spinners and skeletons on all network requests.
  - Duplicate action prevention by disabling buttons during mutations.
  - Contextual error alerts and empty states for both active and search scenarios.

---

## 🛠️ Technology Stack

- **Frontend**: [React.js](https://react.dev/) (v18, Function Components + Hooks)
- **DOM Rendering**: `react-dom`
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (`react-router-dom` v6)
- **State Management**: React Context (`AuthContext`, `ThemeContext`, `LocaleContext`)
- **Styling**: Vanilla CSS3 with CSS custom properties (design tokens), responsive CSS Grid, and Flexbox
- **Typography**: Google Fonts (*Inter* & *Playfair Display*)
- **Data Source**: Dicoding Notes RESTful API (`https://notes-api.dicoding.dev/v1`)
- **Prop Validation**: `prop-types`
- **HTML Parsing**: `html-react-parser`

---

## 📁 Project Structure

```text
personal-notes-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Main navigation, brand, controls & user info
│   │   ├── LoadingIndicator.jsx # Unified loading spinner & screen
│   │   ├── LocaleToggle.jsx     # English / Bahasa Indonesia language switch
│   │   ├── NoteInput.jsx        # Note form with contentEditable body
│   │   ├── NoteItem.jsx         # Note grid card preview with localized date
│   │   ├── NoteList.jsx         # Responsive note grid & empty state
│   │   ├── ProtectedRoute.jsx   # Route guard for authenticated users
│   │   ├── PublicRoute.jsx      # Route guard redirecting authenticated users
│   │   ├── SearchBar.jsx        # Real-time search input with URL sync
│   │   ├── ThemeToggle.jsx      # Light / Dark theme toggle
│   │   └── UserMenu.jsx         # Logged-in user badge and logout button
│   ├── contexts/
│   │   ├── AuthContext.jsx      # Authentication session & user state
│   │   ├── LocaleContext.jsx    # Persistent language state & translation dictionary
│   │   └── ThemeContext.jsx     # Persistent theme state & data-theme controller
│   ├── hooks/
│   │   ├── useAuth.js           # Custom hook for AuthContext
│   │   ├── useInput.js          # Custom hook for form input management
│   │   └── useNotes.js          # Custom hook for note data fetching & mutations
│   ├── locales/
│   │   ├── en.json              # English localization dictionary (Default)
│   │   └── id.json              # Indonesian localization dictionary
│   ├── pages/
│   │   ├── AddNotePage.jsx      # Create new note page
│   │   ├── ArchivePage.jsx      # Archived notes view
│   │   ├── HomePage.jsx         # Active notes view
│   │   ├── LoginPage.jsx        # User login page
│   │   ├── NotFoundPage.jsx     # 404 page for route and note fallbacks
│   │   ├── NoteDetailPage.jsx   # Single note detail with action controls
│   │   └── RegisterPage.jsx     # User registration page
│   ├── styles/
│   │   └── style.css            # Global stylesheet & design tokens
│   ├── utils/
│   │   ├── index.js             # Date formatting, HTML stripping & filtering helpers
│   │   └── network-data.js      # REST API client layer (all 13 functions)
│   ├── App.jsx                  # Main route declaration
│   └── index.jsx                # Application root with Provider hierarchy
├── index.html                   # HTML entry point with Notufy branding
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rommygna1/notufy.git
   cd personal-notes-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the application for production:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

---

## 🌐 API Specification

Notufy connects directly to the Dicoding Notes API v1:
- **Base URL**: `https://notes-api.dicoding.dev/v1`
- **Endpoints**:
  - `POST /register`: Register a new user (`name`, `email`, `password`)
  - `POST /login`: Authenticate user (`email`, `password`) -> returns JWT `accessToken`
  - `GET /users/me`: Fetch authenticated user profile (`id`, `name`, `email`)
  - `GET /notes`: Retrieve active notes for authenticated user
  - `GET /notes/archived`: Retrieve archived notes
  - `GET /notes/{id}`: Retrieve single note detail
  - `POST /notes`: Create a new note (`title`, `body`)
  - `POST /notes/{id}/archive`: Archive a note
  - `POST /notes/{id}/unarchive`: Unarchive a note
  - `DELETE /notes/{id}`: Delete a note

All API functions are encapsulated within [`src/utils/network-data.js`](src/utils/network-data.js) and called through React Hooks.

---

## 📄 License

This project is licensed under the MIT License.
