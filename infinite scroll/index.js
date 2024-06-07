// Get the wrapper element
const wrapper = document.getElementById('wrapper')

// Get all the child items
const items = wrapper.querySelectorAll('.item')

// Flag to track animation state
let isAnimating = true

// Toggle animation state on click
wrapper.addEventListener('click', () => {
  if (isAnimating) {
    // Pause animation
    items.forEach(item => {
      item.style.animationPlayState = 'paused'
    })
    isAnimating = false
  } else {
    // Resume animation
    items.forEach(item => {
      item.style.animationPlayState = 'running'
    })
    isAnimating = true
  }
})