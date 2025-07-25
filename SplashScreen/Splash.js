// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initial delay before starting the fade-out
    setTimeout(() => {
        // Add the fade-out class to the body
        document.body.classList.add('fade-out');
    
        // Redirect after the fade-out effect completes
        setTimeout(() => {
            window.location.href = '../ContentSruthi/Content.html';
        }, 1000); // Adjust this delay to match the transition duration
    }, 4000); // Initial delay before starting the fade-out
});
