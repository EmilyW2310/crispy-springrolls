// Oscar's Gaming Universe - Player Selection System

// Team member data
const TEAM_MEMBERS = [
    { id: 'oscar', name: 'Oscar', emoji: '👑', color: '#f39c12', title: 'Sassiest Solution Architect' },
    { id: 'emily', name: 'Emily', emoji: '🔥', color: '#e91e63', title: 'Strategic Powerhouse' },
    { id: 'marley', name: 'Marley', emoji: '🌟', color: '#ff6b6b', title: 'Pre-Sales Master' },
    { id: 'matthias', name: 'Matthias', emoji: '🧠', color: '#3498db', title: 'German Logic Master' },
    { id: 'rich', name: 'Rich', emoji: '🦸‍♂️', color: '#9b59b6', title: 'Cool Superhero' },
    { id: 'ross', name: 'Ross', emoji: '⚽', color: '#27ae60', title: 'Stylish Football Specialist' },
    { id: 'clement', name: 'Clement', emoji: '😎', color: '#5dade2', title: 'Smooth Operator' },
    { id: 'rania', name: 'Queen Rania', emoji: '👸', color: '#8e44ad', title: 'Noble Royalty' },
    { id: 'ali', name: 'Ali', emoji: '☕', color: '#d35400', title: 'Coffee-Powered Wizard' },
    { id: 'nicholas', name: 'Nicholas', emoji: '⭐', color: '#c0392b', title: 'Go-Getter Energy' },
    { id: 'rob', name: 'Rob', emoji: '👨‍💼', color: '#2ecc71', title: 'Mr Manager' },
    { id: 'adrien', name: 'Adrien', emoji: '🔄', color: '#16a085', title: 'FullCircl Master' },
    { id: 'arun', name: 'Arun', emoji: '🥃', color: '#f39c12', title: 'Whisky Wisdom' },
    { id: 'arsh', name: 'Arsh', emoji: '💪', color: '#e67e22', title: 'Fitness Champion' },
    { id: 'lucia', name: 'Lucia', emoji: '💃🏻', color: '#ff6b9d', title: 'Spanish Creativity' },
    { id: 'theresa', name: 'Theresa', emoji: '💃', color: '#3498db', title: 'Sales Ops Hero' }
];

// Current player data
let currentPlayer = null;

// Initialize player selection system
function initPlayerSelector() {
    // Check if player is already selected
    const savedPlayer = localStorage.getItem('selectedPlayer');
    if (savedPlayer) {
        currentPlayer = JSON.parse(savedPlayer);
        return currentPlayer;
    }
    
    // Show player selection modal
    showPlayerSelector();
    return null;
}

// Show player selection modal
function showPlayerSelector() {
    const modal = createPlayerSelectorModal();
    document.body.appendChild(modal);
}

// Create the player selector modal
function createPlayerSelectorModal() {
    const modal = document.createElement('div');
    modal.id = 'playerSelectorModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: 'Courier New', monospace;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #2c3e50, #34495e);
            border-radius: 25px;
            padding: 3rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 4px solid #f39c12;
            box-shadow: 0 0 40px rgba(243, 156, 18, 0.6);
            text-align: center;
            color: white;
        ">
            <h2 style="
                font-size: 2.5rem;
                color: #f39c12;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            ">🎮 Choose Your Gaming Legend! 🎮</h2>
            
            <p style="
                font-size: 1.2rem;
                color: #bdc3c7;
                margin-bottom: 2rem;
                font-style: italic;
            ">Select your team member to track your scores and achievements!</p>
            
            <div id="playerGrid" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            "></div>
            
            <div style="margin-top: 2rem;">
                <button id="guestBtn" style="
                    background: #95a5a6;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-right: 1rem;
                ">Play as Guest</button>
                
                <button id="changePlayerBtn" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: none;
                ">Change Player</button>
            </div>
        </div>
    `;

    // Populate team member grid
    const playerGrid = modal.querySelector('#playerGrid');
    TEAM_MEMBERS.forEach(member => {
        const playerCard = document.createElement('div');
        playerCard.style.cssText = `
            background: linear-gradient(145deg, ${member.color}, #2c3e50);
            border-radius: 15px;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid transparent;
        `;
        
        playerCard.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${member.emoji}</div>
            <div style="font-weight: bold; font-size: 1.1rem; margin-bottom: 0.3rem;">${member.name}</div>
            <div style="font-size: 0.8rem; opacity: 0.8;">${member.title}</div>
        `;
        
        playerCard.addEventListener('click', () => selectPlayer(member));
        playerCard.addEventListener('mouseenter', () => {
            playerCard.style.transform = 'translateY(-8px) scale(1.05)';
            playerCard.style.borderColor = '#f39c12';
            playerCard.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        });
        playerCard.addEventListener('mouseleave', () => {
            playerCard.style.transform = 'translateY(0) scale(1)';
            playerCard.style.borderColor = 'transparent';
            playerCard.style.boxShadow = 'none';
        });
        
        playerGrid.appendChild(playerCard);
    });

    // Guest button functionality
    modal.querySelector('#guestBtn').addEventListener('click', () => {
        selectPlayer({ id: 'guest', name: 'Guest Player', emoji: '👤', color: '#95a5a6', title: 'Anonymous' });
    });

    return modal;
}

// Select a player
function selectPlayer(player) {
    currentPlayer = player;
    localStorage.setItem('selectedPlayer', JSON.stringify(player));
    
    // Close modal
    const modal = document.getElementById('playerSelectorModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            onPlayerSelected(player);
        }, 300);
    }
}

// Called when a player is selected
function onPlayerSelected(player) {
    console.log(`🎮 ${player.name} ${player.emoji} is ready to play!`);
    
    // Update UI to show current player
    updatePlayerUI(player);
    
    // Dispatch custom event for games to listen to
    window.dispatchEvent(new CustomEvent('playerSelected', { detail: player }));
}

// Update UI to show current player
function updatePlayerUI(player) {
    // Add player info to navigation or game UI
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Remove existing player info
        const existingPlayerInfo = document.getElementById('currentPlayerInfo');
        if (existingPlayerInfo) {
            existingPlayerInfo.remove();
        }
        
        // Add new player info
        const playerInfo = document.createElement('div');
        playerInfo.id = 'currentPlayerInfo';
        playerInfo.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: ${player.color};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        `;
        playerInfo.innerHTML = `${player.emoji} ${player.name}`;
        
        const navContainer = navbar.querySelector('.nav-container');
        navContainer.appendChild(playerInfo);
    }
}

// Game integration functions
window.PlayerSystem = {
    // Get current player
    getCurrentPlayer: function() {
        return currentPlayer || JSON.parse(localStorage.getItem('selectedPlayer'));
    },
    
    // Show player selector again
    showSelector: function() {
        showPlayerSelector();
    },
    
    // Change current player
    changePlayer: function() {
        localStorage.removeItem('selectedPlayer');
        currentPlayer = null;
        showPlayerSelector();
    },
    
    // Report score for current player
    reportScore: function(gameId, score, achievements = []) {
        const player = this.getCurrentPlayer();
        if (!player) {
            console.warn('No player selected for score reporting');
            return;
        }
        
        // Save score with timestamp
        const scoreData = {
            gameId: gameId,
            playerId: player.id,
            playerName: player.name,
            playerEmoji: player.emoji,
            score: score,
            achievements: achievements,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };
        
        // Save to localStorage
        this.saveScore(scoreData);
        
        console.log(`🏆 ${player.name} ${player.emoji} scored ${score.toLocaleString()} in ${gameId}!`);
        
        return scoreData;
    },
    
    // Save score to localStorage
    saveScore: function(scoreData) {
        // Get existing scores
        let allScores = JSON.parse(localStorage.getItem('gameScores')) || [];
        
        // Add new score
        allScores.push(scoreData);
        
        // Keep only last 200 scores
        if (allScores.length > 200) {
            allScores = allScores.slice(-200);
        }
        
        // Save back
        localStorage.setItem('gameScores', JSON.stringify(allScores));
        
        // Update high scores
        this.updateHighScores(scoreData);
    },
    
    // Update high score tables
    updateHighScores: function(scoreData) {
        let highScores = JSON.parse(localStorage.getItem('gameHighScores')) || {};
        
        if (!highScores[scoreData.gameId]) {
            highScores[scoreData.gameId] = [];
        }
        
        // Add new score
        highScores[scoreData.gameId].push({
            playerId: scoreData.playerId,
            playerName: scoreData.playerName,
            playerEmoji: scoreData.playerEmoji,
            score: scoreData.score,
            date: scoreData.date
        });
        
        // Sort by score (highest first) and keep top 10
        highScores[scoreData.gameId].sort((a, b) => b.score - a.score);
        highScores[scoreData.gameId] = highScores[scoreData.gameId].slice(0, 10);
        
        localStorage.setItem('gameHighScores', JSON.stringify(highScores));
    },
    
    // Get high scores for a game
    getHighScores: function(gameId) {
        const highScores = JSON.parse(localStorage.getItem('gameHighScores')) || {};
        return highScores[gameId] || [];
    },
    
    // Get player's best score for a game
    getPlayerBest: function(gameId, playerId) {
        const scores = this.getHighScores(gameId);
        const playerScores = scores.filter(s => s.playerId === playerId);
        return playerScores.length > 0 ? playerScores[0].score : 0;
    }
};

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        const player = initPlayerSelector();
        if (player) {
            updatePlayerUI(player);
        }
    }, 500);
});

// Global shortcut for games to use
window.reportPlayerScore = function(gameId, score, achievements = []) {
    return window.PlayerSystem.reportScore(gameId, score, achievements);
};

console.log("👥 Player Selection System loaded! Team members ready! 🎮");
