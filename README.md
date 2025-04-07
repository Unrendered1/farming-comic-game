This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Farming Comic Game 🚜📖

## 🌱 Projektübersicht
Ein interaktives Farming-Spiel mit Comic-Elementen, entwickelt mit Next.js, TypeScript und Zustand.

## 🛠 Technische Infrastruktur
- Framework: Next.js 14
- Sprache: TypeScript
- State Management: Zustand
- Styling: Tailwind CSS
- Backend: Supabase

## 📦 Voraussetzungen
- Node.js 18+
- npm oder yarn
- Supabase-Konto

## 🖥️ Terminal-Befehle

### Entwicklung
- `npm run dev`: Startet den Entwicklungsserver
  - Verwendet Next.js Turbo-Modus für schnellere Kompilierung
  - Standardport: `http://localhost:3000`

### Build & Deployment
- `npm run build`: Erstellt eine Produktionsversion der Anwendung
  - Kompiliert TypeScript
  - Exportiert statische Dateien
- `npm run start`: Startet den Produktionsserver

### Testing
- `npm test`: Führt alle Unit-Tests aus
  - Generiert Testabdeckungsbericht
- `npm run test:watch`: Startet Test-Überwachungsmodus
- `npm run test:e2e`: Führt End-to-End Tests aus

### Code-Qualität
- `npm run lint`: Überprüft und korrigiert Codestil
- `npm run format`: Formatiert Code mit Prettier

### Zusätzliche Befehle
- `npm run precommit`: Führt Lint und Tests vor jedem Commit aus
- `npm run error:log`: Protokolliert Terminal-Fehler

## 🚨 Fehlerbehandlung
- Alle persistenten Fehler werden in `./logs/terminal-errors.log` protokolliert
- Überprüfen Sie diese Datei bei anhaltenden Problemen

## 🤝 Entwickler-Workflow
1. Änderungen vornehmen
2. `npm run lint` ausführen
3. `npm test` ausführen
4. Bei Erfolg: Commit und Push

## 📝 Weitere Informationen
Konsultieren Sie die Projektdokumentation für detaillierte Entwicklungsrichtlinien.

## 🔧 Supabase-Konfiguration

### Umgebungsvariablen
Erstelle eine `.env.local` Datei im Projekthauptverzeichnis mit folgenden Variablen:

```bash
# Supabase Projekt URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon Key (öffentlicher Schlüssel)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Datenbank-Tabellen
Erstelle folgende Tabellen in Supabase:

1. `user_progress`
   - `user_id`: UUID (Primary Key)
   - `username`: Text
   - `farm_level`: Integer
   - `experience`: Integer
   - `achievements`: Text[]
   - `resources`: JSONB
   - `last_login`: Timestamp

2. `game_states`
   - `user_id`: UUID (Primary Key)
   - `state`: JSONB
   - `updated_at`: Timestamp

## 🚀 Installation

1. Klone das Repository
```bash
git clone https://github.com/dein-username/farming-comic-game.git
cd farming-comic-game
```

2. Installiere Abhängigkeiten
```bash
npm install
```

3. Starte die Entwicklungsumgebung
```bash
npm run dev
```

## 🔒 Sicherheitshinweise
- Teile deine Supabase-Anmeldedaten niemals öffentlich
- Verwende Row Level Security in Supabase
- Aktiviere Authentifizierung und Zugriffskontrollen

## 📝 Lizenz
[Deine Lizenzinformationen]

## 🤝 Mitwirken
Beiträge sind willkommen! Bitte lies unsere Beitragsrichtlinien.
