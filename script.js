// Global variables
let currentStep = 0;
const music = document.getElementById('backgroundMusic');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    startSequence();
});

// Create starry background
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Start the main sequence
function startSequence() {
    // Show loading screen for 4 seconds
    setTimeout(() => {
        hideLoadingScreen();
    }, 4000);
}

// Hide loading screen and start main content
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Try to play background music
        playBackgroundMusic();
        
        // Start first message after a short delay
        setTimeout(() => {
            showFirstMessage();
        }, 1000);
    }, 1000);
}

// Play background music with user interaction handling
function playBackgroundMusic() {
    const playMusic = () => {
        music.play().catch(e => {
            console.log('Music autoplay prevented by browser');
        });
    };
    
    // Try to play immediately
    playMusic();
    
    // If autoplay fails, play on first user interaction
    const playOnInteraction = () => {
        playMusic();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
    };
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
}

// Show first message with typewriter effect
function showFirstMessage() {
    const container = document.getElementById('firstMessage');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    
    container.classList.remove('hidden');
    
 const messages = [
    'قبلَ كلِّ شيء، دعينا نَعود قليلًا...',
    'إلى اليومِ الذي بدأتْ فيه الحكاية...',
    '٣١ مايو ٢٠٠٦'
];;
    
    const elements = [line1, line2, line3];
    
    typewriterSequence(messages, elements, 0, () => {
        // Wait 3 seconds then fade out and show second message
        setTimeout(() => {
            fadeOutElement(container, () => {
                showSecondMessage();
            });
        }, 3000);
    });
}

// Show second message with moon image
function showSecondMessage() {
    const container = document.getElementById('secondMessage');
    const moonImage = document.getElementById('moonImage');
    const line1 = document.getElementById('moonLine1');
    const line2 = document.getElementById('moonLine2');
    const line3 = document.getElementById('moonLine3');
    
    container.classList.remove('hidden');
    
    // Show moon image first
    setTimeout(() => {
        moonImage.classList.remove('hidden');
    }, 500);
    
const messages = [
    'في تلكَ الليلةِ بالتحديد، كانت ليلةً مختلفة...',
    'ليلةٌ اكتملَ فيها الهلال، كما ترَينَه الآن...',
    'وُلِدتِ في تمامِ بَهاءِ القمر ❤️'
];
    const elements = [line1, line2, line3];
    
    setTimeout(() => {
        typewriterSequence(messages, elements, 0, () => {
            // Wait 4 seconds then fade out and show third message
            setTimeout(() => {
                fadeOutElement(container, () => {
                    showThirdMessage();
                });
            }, 4000);
        });
    }, 1000);
}

// Show third message
function showThirdMessage() {
    const container = document.getElementById('thirdMessage');
    const line1 = document.getElementById('thirdLine1');
    const line2 = document.getElementById('thirdLine2');
    
    container.classList.remove('hidden');
    
   const messages = [
    'اليومَ تُتمّين التاسعةَ عشرةَ من عُمرِك، في خيرٍ وسعادة. أعلمُ أن السنةَ الماضيةَ لم تكن سهلة، لكنّكِ كنتِ أقوى منها 🔥',
    'فلا تيأسي من الماضي، فالقادمُ  بإذن الله كلُّه خيرٌ وسعادة ❤️'
];
    
    const elements = [line1, line2];
    
    typewriterSequence(messages, elements, 0, () => {
        // Wait 2 seconds then start celebration
        setTimeout(() => {
            startCelebration();
        }, 2000);
    });
}

// Start celebration animation
function startCelebration() {
    const celebrationContainer = document.getElementById('celebrationContainer');
    celebrationContainer.classList.remove('hidden');
    
    // Create confetti
    createConfetti();
    
    // Create flying stars
    createFlyingStars();
    
    // Create sparkles
    createSparkles();
    
    // Show final message after 5 seconds
    setTimeout(() => {
        showFinalMessage();
    }, 5000);
}

// Show final big message
function showFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    finalMessage.classList.remove('hidden');
    finalMessage.style.opacity = '1';
}

// Typewriter effect function
function typewriterEffect(element, text, speed = 100, callback) {
    element.innerHTML = '';
    element.style.width = '0';

    // Detect RTL (Arabic) and set cursor accordingly
    const isRTL = /[\u0600-\u06FF]/.test(text);
    if (isRTL) {
        element.style.borderLeft = '2px solid #ffd700';
        element.style.borderRight = 'none';
        element.dir = 'rtl';
    } else {
        element.style.borderRight = '2px solid #ffd700';
        element.style.borderLeft = 'none';
        element.dir = 'ltr';
    }

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            element.style.width = 'auto';
            i++;
        } else {
            clearInterval(timer);
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.borderLeft = 'none';
                if (callback) callback();
            }, 500);
        }
    }, speed);
}

// Sequence of typewriter effects
function typewriterSequence(messages, elements, index, finalCallback) {
    if (index < messages.length) {
        typewriterEffect(elements[index], messages[index], 80, () => {
            setTimeout(() => {
                typewriterSequence(messages, elements, index + 1, finalCallback);
            }, 1000);
        });
    } else if (finalCallback) {
        finalCallback();
    }
}

// Fade out element
function fadeOutElement(element, callback) {
    element.style.transition = 'opacity 1s ease-out';
    element.style.opacity = '0';
    setTimeout(() => {
        element.classList.add('hidden');
        if (callback) callback();
    }, 1000);
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#ffd700', '#ff69b4', '#00d4ff', '#ff8c42'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 100);
    }
}

// Create flying stars animation
function createFlyingStars() {
    const starsContainer = document.getElementById('stars');
    const starSymbols = ['⭐', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star-piece';
            star.innerHTML = starSymbols[Math.floor(Math.random() * starSymbols.length)];
            star.style.left = '-50px';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDuration = (Math.random() * 2 + 3) + 's';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
            
            // Remove star after animation
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 6000);
        }, i * 200);
    }
}

// Create sparkles animation
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-piece';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
            sparkle.style.animationDelay = Math.random() * 1 + 's';
            sparklesContainer.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 150);
    }
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Adjust animations based on screen size if needed
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce number of particles on mobile for performance
        document.querySelectorAll('.confetti-piece, .star-piece, .sparkle-piece').forEach(el => {
            if (Math.random() > 0.5) {
                el.style.display = 'none';
            }
        });
    }
});