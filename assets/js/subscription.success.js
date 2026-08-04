const form = document.querySelector('form[name="subscription"]');
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
            form.innerHTML = `
                <div style="text-align: center; padding: 2em;">
                    <h3>Message Sent!</h3>
                    <p>Thank you for subscribing to the Omics Intelligence newsletter! You can unsubscribe at any moment.</p>
                    <ul>
                        <li>
                            <a href="/" class="button">Back Home</a>
                        </li>
                    </ul>
                </div>
            `;
        } else {
            alert('Submission failed. Please try again.');
        }
        } catch (error) {
            alert('Network error. Please check your connection.');
    }
});