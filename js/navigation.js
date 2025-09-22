// Oscar's Gaming Universe - Navigation & Site Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Interactive sparkles on mouse move (for landing page)
    if (document.querySelector('.sparkles')) {
        document.addEventListener('mousemove', createInteractiveSparkles);
    }

    // Initialize score tracking
    initializeScoreSystem();
    
    console.log("🎮 Oscar's Gaming Universe navigation loaded! All 17 team members ready to play! ✨");
});

// Interactive sparkles effect
function createInteractiveSparkles(e) {
    if (Math.random() < 0.05) { // 5% chance per mouse move
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.color = '#f39c12';
        sparkle.style.fontSize = '16px';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleDisappear 1.5s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 1500);
    }
}

// Score System Management
function initializeScoreSystem() {
    // Check if we're on a game page and set up score reporting
    if (window.location.pathname.includes('/games/')) {
        setupGameScoreIntegration();
    }
}

function setupGameScoreIntegration() {
    // This function will be called by individual games to report scores
    window.reportScore = function(gameId, playerName, score, achievements = []) {
        const scoreData = {
            gameId: gameId,
            playerName: playerName,
            score: score,
            achievements: achievements,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };
        
        // Save to localStorage
        saveScore(scoreData);
        
        // Update statistics
        updateGameStatistics(gameId);
        
        console.log(`🏆 Score reported: ${playerName} scored ${score} in ${gameId}!`);
    };
}

function saveScore(scoreData) {
    // Get existing scores
    let allScores = JSON.parse(localStorage.getItem('gameScores')) || [];
    
    // Add new score
    allScores.push(scoreData);
    
    // Keep only last 100 scores to prevent storage bloat
    if (allScores.length > 100) {
        allScores = allScores.slice(-100);
    }
    
    // Save back to localStorage
    localStorage.setItem('gameScores', JSON.stringify(allScores));
    
    // Update high scores
    updateHighScores(scoreData);
}

function updateHighScores(newScore) {
    // Get current high scores
    let highScores = JSON.parse(localStorage.getItem('gameHighScores')) || {};
    
    // Initialize game if not exists
    if (!highScores[newScore.gameId]) {
        highScores[newScore.gameId] = {
            allTime: [],
            daily: [],
            weekly: []
        };
    }
    
    const gameScores = highScores[newScore.gameId];
    
    // Add to all-time high scores
    gameScores.allTime.push({
        player: newScore.playerName,
        score: newScore.score,
        date: newScore.date
    });
    
    // Sort and keep top 10
    gameScores.allTime.sort((a, b) => b.score - a.score);
    gameScores.allTime = gameScores.allTime.slice(0, 10);
    
    // Save updated high scores
    localStorage.setItem('gameHighScores', JSON.stringify(highScores));
}

function updateGameStatistics(gameId) {
    // Get game statistics
    let gameStats = JSON.parse(localStorage.getItem('gameStats')) || {};
    
    // Initialize if needed
    if (!gameStats[gameId]) {
        gameStats[gameId] = {
            plays: 0,
            totalScore: 0,
            averageScore: 0,
            lastPlayed: null
        };
    }
    
    // Update stats
    gameStats[gameId].plays += 1;
    gameStats[gameId].lastPlayed = new Date().toISOString();
    
    // Save updated stats
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

// Utility functions for other pages
window.GameUtils = {
    // Get high scores for a specific game
    getHighScores: function(gameId, limit = 5) {
        const highScores = JSON.parse(localStorage.getItem('gameHighScores')) || {};
        return highScores[gameId]?.allTime?.slice(0, limit) || [];
    },
    
    // Get total plays for a game
    getGamePlays: function(gameId) {
        const gameStats = JSON.parse(localStorage.getItem('gameStats')) || {};
        return gameStats[gameId]?.plays || 0;
    },
    
    // Get player's best score for a game
    getPlayerBest: function(gameId, playerName) {
        const scores = JSON.parse(localStorage.getItem('gameScores')) || [];
        const playerScores = scores.filter(s => s.gameId === gameId && s.playerName === playerName);
        return playerScores.length > 0 ? Math.max(...playerScores.map(s => s.score)) : 0;
    },
    
    // Export scores for sharing
    exportScores: function() {
        const allData = {
            scores: JSON.parse(localStorage.getItem('gameScores')) || [],
            highScores: JSON.parse(localStorage.getItem('gameHighScores')) || {},
            stats: JSON.parse(localStorage.getItem('gameStats')) || {}
        };
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'oscar-gaming-universe-scores.json';
        link.click();
    }
};

// Console welcome message
console.log("🎮 Oscar's Gaming Universe - Navigation System Loaded! 🚀");
console.log("👑 Available utilities: window.GameUtils, window.reportScore, and window.PlayerSystem");
console.log("💾 Score tracking active for all games! 17 team members ready! 📊");
