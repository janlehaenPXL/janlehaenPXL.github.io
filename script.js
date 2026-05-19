const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('successMessage').innerText =
            'Bedankt! Je bericht werd verzonden.';

        form.reset();
    });
}

// Leeftijd in tekst langs foto
const birthYear = 1994;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

const ageEl = document.getElementById("age");
if (ageEl) ageEl.textContent = `(${age} jaar)`;

// Jaartal in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = currentYear;