// document.querySelector('.menu-icon').addEventListener('click', () => {
//     document.querySelector('.nav-links').classList.toggle('active');
//   });
  

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navbarActions = document.querySelector('.navbar-actions');

menuToggle.addEventListener('click', () => {
  navbarActions.classList.toggle('active');
});

// Profile Dropdown
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  profileDropdown.classList.remove('active');
});

// Wishlist and Cart Functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const icon = this.querySelector('i');
    
    // Toggle between regular and solid heart
    if (icon.classList.contains('far')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      // In a real app, you would make an API call here to add to wishlist
      updateBadge('.wishlist-icon .badge', 1);
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      // In a real app, you would make an API call here to remove from wishlist
      updateBadge('.wishlist-icon .badge', -1);
    }
  });
});

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    // In a real app, you would make an API call here to add to cart
    updateBadge('.cart-icon .badge', 1);
    
    // Visual feedback
    this.innerHTML = '<i class="fas fa-check"></i>';
    this.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
      this.style.backgroundColor = '';
    }, 1000);
  });
});

function updateBadge(selector, change) {
  const badge = document.querySelector(selector);
  let current = parseInt(badge.textContent) || 0;
  current += change;
  badge.textContent = Math.max(0, current).toString();
  
  // Animation
  badge.style.transform = 'scale(1.2)';
  setTimeout(() => {
    badge.style.transform = 'scale(1)';
  }, 200);
}

// Product hover effect
document.querySelectorAll('.product-card').forEach(card => {
  const img = card.querySelector('.product-image img');
  const originalSrc = img.src;
  
  // In a real app, you might have hover images to load here
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handling
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input').value;
  
  // Validate college email (simple check for .edu)
  if (!email.includes('.edu')) {
    alert('Please use your college email address');
    return;
  }
  
  // In a real app, you would make an API call here
  alert('Thank you for subscribing!');
  this.reset();
});

// Initialize with some demo data for badges if needed
document.addEventListener('DOMContentLoaded', () => {
  // This would normally come from your backend
  // document.querySelector('.wishlist-icon .badge').textContent = '3';
  // document.querySelector('.cart-icon .badge').textContent = '2';
});