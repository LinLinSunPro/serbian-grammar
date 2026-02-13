// SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://yheuccgkzaphqqmmxlrg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZXVjY2dremFwaHFxbW14bHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTQ1ODgsImV4cCI6MjA4NTc3MDU4OH0.9o1L6f9XeJwrd4_cgnGZMfoQYuFePIEQL4-GjtctWs0';
let supabaseClient = null;

if (typeof window !== 'undefined' && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

async function saveHomework(fieldId, value) {
    if (!supabaseClient) return;

    const { error } = await supabaseClient
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
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
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

// Sub-Category switching (Grammar sub-tabs / Homework sub-tabs)
function switchSubCategory(subId, event) {
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
}

// BALKAN ZEN MONITOR LOGIC
const vibePhrases = [
    "STAV: <b>POLAKO</b>",
    "PROMAJA: <b>NEMA</b>",
    "KAFA: <b>ČEKA SE</b>",
    "RAKIJA: <b>SAMO MALO</b>"
];

let currentVibeIndex = 0;
let isVibeTransitioning = false;

function triggerVibeChange() {
    if (isVibeTransitioning) return;

    const vibeText = document.getElementById('vibe-text');
    if (!vibeText) return;

    isVibeTransitioning = true;
    vibeText.style.opacity = '0';

    setTimeout(() => {
        currentVibeIndex = (currentVibeIndex + 1) % vibePhrases.length;
        vibeText.innerHTML = vibePhrases[currentVibeIndex];
        vibeText.style.opacity = '1';

        setTimeout(() => {
            isVibeTransitioning = false;
        }, 1100);
    }, 1100);
}

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

const zenInfo = {
    'fildzan': "<b>Fildžan (feel-jahn)</b><br>A small, handleless ceramic cup for \"domaća kafa\" (Serbian/Turkish coffee).",
    'cokanjcic': "<b>Čokanjčić (cho-kahn-cheech)</b><br>A small, pear-shaped glass with a narrow neck for serving Rakija.",
    'POLAKO': "A fundamental Balkan law that says everything can wait.",
    'NEMA': "The legendary Balkan supernatural force believed to cause back pain.",
    'ČEKA SE': "A \"loading state\" of the Balkan soul. Tasks paused for coffee.",
    'SAMO MALO': "The fine line between 'just one' and overwhelming hospitality."
};

function setupZenInteractivity() {
    const infoBox = document.getElementById('info-reveal');
    const fildzan = document.getElementById('icon-fildzan');
    const cokanjcic = document.getElementById('icon-cokanjcic');
    const vibeBtn = document.getElementById('vibe-text');

    if (!infoBox) return;

    const showInfo = (key) => {
        if (infoBox.classList.contains('active') && infoBox.dataset.current === key) {
            infoBox.classList.remove('active');
            return;
        }

        if (infoBox.classList.contains('active')) {
            infoBox.classList.remove('active');
            setTimeout(() => {
                infoBox.innerHTML = zenInfo[key] || "";
                infoBox.classList.add('active');
                infoBox.dataset.current = key;
            }, 410);
        } else {
            infoBox.innerHTML = zenInfo[key] || "";
            infoBox.classList.add('active');
            infoBox.dataset.current = key;
        }
    };

    if (fildzan) fildzan.addEventListener('click', () => showInfo('fildzan'));
    if (cokanjcic) cokanjcic.addEventListener('click', () => showInfo('cokanjcic'));

    if (vibeBtn) {
        vibeBtn.addEventListener('click', () => {
            const bTag = vibeBtn.querySelector('b');
            if (bTag) showInfo(bTag.innerText);
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.zen-icons-row')) {
            infoBox.classList.remove('active');
        }
    });
}

function selectVocabTopic(topicId, cardElement) {
    document.querySelectorAll('.vocab-compact-card').forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');

    const displayArea = document.getElementById('vocab-active-display');
    const sourceContent = document.getElementById('vocab-content-' + topicId);

    if (displayArea && sourceContent) {
        displayArea.style.opacity = '0';
        setTimeout(() => {
            displayArea.innerHTML = sourceContent.innerHTML;
            displayArea.style.opacity = '1';

            // If we just loaded "texts", ensure the first story is active
            if (topicId === 'texts') {
                const firstTab = displayArea.querySelector('.text-tab');
                if (firstTab) firstTab.classList.add('active');
            }
        }, 200);
    }
}

function switchInnerStory(storyId, event) {
    const textsContainer = document.getElementById('vocab-active-display');
    if (!textsContainer) return;

    // Hide all stories
    textsContainer.querySelectorAll('.inner-story').forEach(story => {
        story.style.display = 'none';
        story.classList.remove('active');
    });

    // Deactivate all tabs
    textsContainer.querySelectorAll('.text-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.style.opacity = '0.6';
    });

    // Show selected story
    const selected = textsContainer.querySelector('#' + storyId);
    if (selected) {
        selected.style.display = 'block';
        setTimeout(() => selected.classList.add('active'), 10);
    }

    // Set active tab
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
        event.currentTarget.style.opacity = '1';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const vibeText = document.getElementById('vibe-text');
    if (vibeText) vibeText.style.opacity = '1';

    setupPersistence();
    loadHomework();
    setupZenInteractivity();

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.zen-icons-row') && !e.target.closest('.vocab-card') && !e.target.closest('.dash-card')) {
            triggerVibeChange();
        }
    });
});
