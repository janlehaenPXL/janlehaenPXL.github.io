// Leeftijd berekenen en tonen naast foto
const birthYear = 1994;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

const ageEl = document.getElementById("age");
if (ageEl) ageEl.textContent = `(${age} jaar)`;

// Jaartal tonen in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = currentYear;

// Contact formulier — alleen uitvoeren als het formulier bestaat op de pagina
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validatieregels per veld
const fields = [
    { id: 'name',    errorId: 'nameError',    validate: v => v.trim().length >= 2 },
    { id: 'email',   errorId: 'emailError',   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'subject', errorId: 'subjectError', validate: v => v.trim().length >= 2 },
    { id: 'message', errorId: 'messageError', validate: v => v.trim().length >= 10 },
];

// Controleert één veld en toont/verbergt de foutmelding
function validateField(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    const valid = field.validate(input.value);

    input.classList.toggle('invalid', !valid);
    error.classList.toggle('visible', !valid);

    return valid;
}

// Alles binnen if(form) zodat dit niet crasht op pagina's zonder formulier
if (form) {
    // Valideer elk veld live terwijl de gebruiker typt
    fields.forEach(field => {
        document.getElementById(field.id).addEventListener('input', () => validateField(field));
    });

    // Verwerk het formulier bij het indienen
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Valideer alle velden, stop als er iets fout is
        const allValid = fields.map(validateField).every(Boolean);
        if (!allValid) return;

        // Knop uitschakelen tijdens het versturen
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Bezig met versturen...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Formulier verbergen en succesmelding tonen
                form.reset();
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                // Foutmelding tonen als de server een fout geeft
                submitBtn.textContent = 'Er ging iets mis. Probeer opnieuw.';
                submitBtn.disabled = false;
            }
        } catch {
            // Foutmelding tonen bij netwerkproblemen
            submitBtn.textContent = 'Er ging iets mis. Probeer opnieuw.';
            submitBtn.disabled = false;
        }
    });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-open');
        navLinks.classList.toggle('is-open');
    });

    // Sluit menu bij klikken op een link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-open');
            navLinks.classList.remove('is-open');
        });
    });
}