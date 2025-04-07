// Trello Power-Up Hauptlogik
window.TrelloPowerUp.initialize({
    'board-buttons': function(t) {
        return [{
            icon: {
                dark: './farm-icon-white.svg',
                light: './farm-icon-black.svg'
            },
            text: 'Farming Game',
            callback: function(t) {
                return t.modal({
                    url: './game-modal.html',
                    height: 500
                });
            }
        }];
    },
    'card-badges': function(t) {
        return t.card('all')
            .then(function(card) {
                // Dynamische Kartenstatistiken
                return [{
                    text: 'Progress: 50%',
                    color: 'green',
                    callback: function() {
                        // Weitere Aktionen möglich
                    }
                }];
            });
    }
});

// Lokale Spielstatistiken-Simulation
function updateGameStats() {
    const stats = {
        progress: 45,
        playerLevel: 3,
        completedQuests: 7,
        resources: 1250
    };

    document.getElementById('progressFill').style.width = `${stats.progress}%`;
    document.getElementById('progressText').textContent = `${stats.progress}%`;
    document.getElementById('playerLevel').textContent = stats.playerLevel;
    document.getElementById('completedQuests').textContent = stats.completedQuests;
    document.getElementById('resources').textContent = stats.resources;
}

// Initialisierung
document.addEventListener('DOMContentLoaded', updateGameStats);
