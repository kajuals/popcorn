// Form submission handler
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Prepare form data
    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            form.reset();
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = 'Thank you! Your message has been sent.';
            form.parentNode.insertBefore(successDiv, form.nextSibling);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'Failed to send message'}`);
        }
    } catch (error) {
        alert('Network error. Please try again later.');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});