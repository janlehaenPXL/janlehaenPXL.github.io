const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('successMessage').innerText =
            'Bedankt! Je bericht werd verzonden.';

        form.reset();
    });
}