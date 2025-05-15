document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const responseDiv = document.getElementById('formResponse');
  
  // Show loading state
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  responseDiv.style.display = 'none';
  
  // Prepare form data as JSON
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const response = await fetch('https://formspree.io/f/xqaqwovj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      // Success
      form.reset();
      responseDiv.textContent = 'Thank you! Your message has been sent.';
      responseDiv.className = 'form-response success';
    } else {
      // Error from Formspree
      responseDiv.textContent = `Error: ${responseData.error || 'Failed to send message'}`;
      responseDiv.className = 'form-response error';
    }
  } catch (error) {
    // Network error
    responseDiv.textContent = 'Network error. Please try again later.';
    responseDiv.className = 'form-response error';
  } finally {
    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
    responseDiv.style.display = 'block';
  }
});