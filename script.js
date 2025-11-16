document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
  });

  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 6000);
  }

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
  }

  // BMI Calculator
  const bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const height = parseFloat(document.getElementById('height').value) / 100;
      const weight = parseFloat(document.getElementById('weight').value);
      if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        const bmiValue = document.querySelector('.bmi-value');
        const bmiMessage = document.querySelector('.bmi-message');
        bmiValue.textContent = bmi;
        if (bmi < 18.5) {
          bmiMessage.textContent = 'Underweight';
          bmiValue.style.color = 'var(--warning)';
        } else if (bmi >= 18.5 && bmi < 25) {
          bmiMessage.textContent = 'Normal weight';
          bmiValue.style.color = 'var(--success)';
        } else if (bmi >= 25 && bmi < 30) {
          bmiMessage.textContent = 'Overweight';
          bmiValue.style.color = 'var(--warning)';
        } else {
          bmiMessage.textContent = 'Obesity';
          bmiValue.style.color = 'var(--danger)';
        }
        bmiValue.style.animation = 'none';
        setTimeout(() => {
          bmiValue.style.animation = 'fadeIn 0.5s ease';
        }, 5);
      }
    });
  }

  // Calorie Calculator
  const calorieForm = document.getElementById('calorieForm');
  if (calorieForm) {
    calorieForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const gender = document.getElementById('gender').value;
      const age = parseInt(document.getElementById('age').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const activity = parseFloat(document.getElementById('activity').value);
      const goal = document.getElementById('goal').value;

      let bmr;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      let calories = bmr * activity;
      if (goal === 'lose') calories -= 500;
      if (goal === 'gain') calories += 500;
      calories = Math.round(calories);

      // Display calories
      document.querySelector('.calorie-value').textContent = calories;

      // Macros breakdown (30% Protein, 40% Carbs, 30% Fats)
      document.getElementById('protein-value').textContent = Math.round((calories * 0.3) / 4) + 'g';
      document.getElementById('carbs-value').textContent = Math.round((calories * 0.4) / 4) + 'g';
      document.getElementById('fats-value').textContent = Math.round((calories * 0.3) / 9) + 'g';
    });
  }

  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
  checkFade();
  window.addEventListener('scroll', checkFade);
  function checkFade() {
    const triggerBottom = window.innerHeight * 0.8;
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add('appear');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });

  // Active navigation link
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation || 
        (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Card hover effect
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Features hover effect
  const features = document.querySelectorAll('.feature-box');
  features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      const icon = feature.querySelector('i');
      icon.style.transform = 'scale(1.2) rotate(5deg)';
      icon.style.transition = 'transform 0.3s ease';
    });
    feature.addEventListener('mouseleave', () => {
      const icon = feature.querySelector('i');
      icon.style.transform = '';
    });
  });

  // Preload hero background
  const heroImage = new Image();
  heroImage.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }

  // Animated count numbers
  const countElements = document.querySelectorAll('.count-number');
  if (countElements.length > 0) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const countElement = entry.target;
          const target = parseInt(countElement.getAttribute('data-count'));
          let count = 0;
          const updateCount = () => {
            const increment = target / 50;
            if (count < target) {
              count += increment;
              countElement.textContent = Math.ceil(count);
              setTimeout(updateCount, 30);
            } else {
              countElement.textContent = target;
            }
          };
          updateCount();
          observer.unobserve(countElement);
        }
      });
    });
    countElements.forEach(element => {
      countObserver.observe(element);
    });
  }
});

// script.js

function openMailClient() {
  const name  = encodeURIComponent(document.getElementById('name').value.trim());
  const email = encodeURIComponent(document.getElementById('email').value.trim());
  const msg   = encodeURIComponent(document.getElementById('message').value.trim());
  const status = document.getElementById('status');

  if (!name || !email || !msg) {
    status.textContent = 'Please fill in all fields.';
    status.classList.add('error');
    return;
  }

  status.textContent = '';
  status.classList.remove('error');

  const to      = 'info@powerfitness.com';
  const subject = encodeURIComponent(`Contact from ${name}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}


