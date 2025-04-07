# 🚀 Trello Power-Up Integration

## 1. Power-Up Registrierung
1. Gehe zu: https://trello.com/power-ups/admin
2. Klicke "Create New Power-Up"
3. Fülle Formular aus:
   - Name: Farming Comic Game
   - Description: Projekt-Tracking und Spielfortschritt
   - Email: [Deine E-Mail]
   - Iframe Connector URL: https://[deine-domain]/trello-power-up/index.html

## 2. API-Schlüssel generieren
1. In Power-Up Admin-Bereich
2. Generiere API-Schlüssel
3. Speichere Schlüssel sicher

## 3. Hosting-Konfiguration
- Wähle Hosting-Plattform
- Stelle sicher, dass folgende Dateien öffentlich sind:
  - `index.html`
  - `game-modal.html`
  - `manifest.json`
  - SVG-Icons

## 4. Capabilities
Unterstützte Funktionen:
- Board-Buttons
- Card-Badges
- Iframe-Connector

## 5. Entwicklungs-Checkliste
- [ ] Hosting einrichten
- [ ] Power-Up registrieren
- [ ] Manifest konfigurieren
- [ ] Icons erstellen
- [ ] Funktionalität testen

## 6. Sicherheitshinweise
- Verwende HTTPS
- Schütze API-Schlüssel
- Implementiere Authentifizierung
