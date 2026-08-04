const form = document.querySelector('form[name="contact"]');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stops the browser from leaving the page

    const formData = new FormData(form);

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
            // Replace form UI with a styled success message inside the Stellar template
            form.innerHTML = `
            <div class="box" style="text-align: center; padding: 2em;">
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
            `;
        } else {
            alert('Submission failed. Please try again.');
        }
        } catch (error) {
            alert('Network error. Please check your connection.');
    }
});