function switchCategory(catId) {
    // Hide all category sections
    document.querySelectorAll('.category-section').forEach(cat => {
        cat.classList.remove('active');
    });

    // Remove active class from tab items
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected category
    const selectedCat = document.getElementById(catId + '-cat');
    if (selectedCat) {
        selectedCat.classList.add('active');
    }

    // Add active class to clicked tab
    event.currentTarget.classList.add('active');

    // Trigger Vibe Change
    triggerVibeChange();
}

// BALKAN ZEN MONITOR LOGIC
const vibePhrases = [
    "STAV: <b>POLAKO</b>",
    "PROMAJA: <b>NEMA</b>",
    "KAFA: <b>ČEKA SE</b>",
    "RAKIJA: <b>SAMO MALO</b>"
];

let currentVibeIndex = 0;
let isVibeTransitioning = false; // Zen Cooldown Flag

function triggerVibeChange() {
    if (isVibeTransitioning) return; // Ignore if already moving (Polako logic)

    const vibeText = document.getElementById('vibe-text');
    if (!vibeText) return;

    isVibeTransitioning = true;

    // Smooth fade out
    vibeText.style.opacity = '0';

    setTimeout(() => {
        // Change text
        currentVibeIndex = (currentVibeIndex + 1) % vibePhrases.length;
        vibeText.innerHTML = vibePhrases[currentVibeIndex];

        // Smooth fade in
        vibeText.style.opacity = '1';

        // Reset cooldown after the fade-in animation completes
        setTimeout(() => {
            isVibeTransitioning = false;
        }, 1100);
    }, 1500); // 1.5s delay for that luxury Zen feel
}

// Initial state
document.addEventListener('DOMContentLoaded', () => {
    const vibeText = document.getElementById('vibe-text');
    if (vibeText) vibeText.style.opacity = '1';
});
