function scrollContainer(direction) {
    // Get the button that was clicked
    const button = event.target;
    // Find the closest container-wrapper and then the container within it
    const container = button.closest('.container-wrapper').querySelector('.container');
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Add scroll event listeners to show/hide buttons based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');
    
    containers.forEach(container => {
        const wrapper = container.closest('.container-wrapper');
        const leftButton = wrapper.querySelector('button:first-child');
        const rightButton = wrapper.querySelector('button:last-child');
        
        // Initial button state
        updateButtonVisibility(container, leftButton, rightButton);
        
        // Update buttons on scroll
        container.addEventListener('scroll', () => {
            updateButtonVisibility(container, leftButton, rightButton);
        });
    });
});

function updateButtonVisibility(container, leftButton, rightButton) {
    // Show/hide left button
    leftButton.style.visibility = container.scrollLeft > 0 ? 'visible' : 'hidden';
    
    // Show/hide right button
    const maxScroll = container.scrollWidth - container.clientWidth;
    rightButton.style.visibility = container.scrollLeft < maxScroll ? 'visible' : 'hidden';
}


