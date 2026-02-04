// SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://yheuccgkzaphqqmmxlrg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZXVjY2dremFwaHFxbW14bHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTQ1ODgsImV4cCI6MjA4NTc3MDU4OH0.9o1L6f9XeJwrd4_cgnGZMfoQYuFePIEQL4-GjtctWs0';
const supabase = typeof supabase !== 'undefined' ? supabase : (window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null);

async function saveHomework(fieldId, value) {
    if (!supabase) return;

    const { error } = await supabase
        .from('homework_submissions')
        .upsert({
            submission_id: 'serbian_zen_v1',
            field_id: fieldId,
            content: value,
            updated_at: new Date()
        }, { onConflict: 'submission_id, field_id' });

    if (error) console.error('Error saving line:', error);
}

async function loadHomework() {
    if (!supabase) return;

    const { data, error } = await supabase
        .from('homework_submissions')
        .select('field_id, content')
        .eq('submission_id', 'serbian_zen_v1');

    if (error) {
        console.error('Error loading homework:', error);
        return;
    }

    if (data) {
        data.forEach(item => {
            const input = document.getElementById(item.field_id);
            if (input) {
                input.value = item.content;
            }
        });
    }
}

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
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Trigger Vibe Change
    triggerVibeChange();
}

function switchSubCategory(subId) {
    // Find the current active category container (either grammar or homework)
    const activeCat = event.currentTarget.closest('.category-section');
    if (!activeCat) return;

    // Hide all internal content sections within this category
    activeCat.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from all sub-tab items within this category
    activeCat.querySelectorAll('.sub-tab-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected sub-section
    const selected = document.getElementById(subId);
    if (selected) {
        selected.classList.add('active');
    }

    // Set active sub-tab
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

// Setup persistence listeners
function setupPersistence() {
    const homeworkInputs = document.querySelectorAll('.hw-input');
    homeworkInputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            const id = e.target.id;
            const val = e.target.value;
            if (id) {
                saveHomework(id, val);
            }
        });
    });
}

// Initial state
document.addEventListener('DOMContentLoaded', () => {
    const vibeText = document.getElementById('vibe-text');
    if (vibeText) vibeText.style.opacity = '1';

    setupPersistence();
    loadHomework();
});
