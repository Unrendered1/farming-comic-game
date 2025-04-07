#!/bin/bash

# Deployment-Skript für Strato Webhosting

# Variablen
REMOTE_HOST="deine-strato-domain.de"
REMOTE_USER="dein_benutzername"
REMOTE_PATH="/path/to/your/website"

# Build die Anwendung
npm run build

# Exportiere statische Dateien
npm run export

# Verbinde zu Strato und übertrage Dateien
rsync -avz --delete \
    -e "ssh" \
    ./out/ \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

# Optional: Restart des Servers falls erforderlich
ssh ${REMOTE_USER}@${REMOTE_HOST} "pm2 restart next-app"

echo "Deployment erfolgreich abgeschlossen!"
