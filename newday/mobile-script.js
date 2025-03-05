// Enhanced Mobile Navigation and Responsive Features

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality with improved animations and accessibility
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  let menuOpen = false

  if (mobileMenuBtn && mobileMenu) {
    // Add ARIA attributes for accessibility
    mobileMenuBtn.setAttribute("aria-expanded", "false")
    mobileMenuBtn.setAttribute("aria-controls", "mobileMenu")
    mobileMenuBtn.setAttribute("aria-label", "Menu")

    mobileMenuBtn.addEventListener("click", function () {
      menuOpen = !menuOpen

      // Update ARIA attributes
      this.setAttribute("aria-expanded", menuOpen ? "true" : "false")

      // Toggle menu visibility with animation
      if (menuOpen) {
        mobileMenu.style.display = "block"
        document.body.style.overflow = "hidden" // Prevent scrolling when menu is open

        // Animate hamburger to X
        const spans = this.querySelectorAll("span")
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        // Animate X back to hamburger
        const spans = this.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"

        // Fade out menu
        mobileMenu.style.opacity = "0"
        setTimeout(() => {
          mobileMenu.style.display = "none"
          document.body.style.overflow = "" // Restore scrolling
        }, 300)
      }
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (menuOpen && !mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenuBtn.click() // Close the menu
      }
    })

    // Close menu when pressing Escape key
    document.addEventListener("keydown", (event) => {
      if (menuOpen && event.key === "Escape") {
        mobileMenuBtn.click() // Close the menu
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && menuOpen) {
        mobileMenuBtn.click() // Close the menu on larger screens
      }
    })

    // Add active class to current page in mobile menu
    const currentPage = window.location.pathname.split("/").pop()
    const mobileMenuLinks = mobileMenu.querySelectorAll("a")

    mobileMenuLinks.forEach((link) => {
      const linkPage = link.getAttribute("href")
      if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
        link.classList.add("active")
      }
    })
  }

  // Responsive Images - Lazy Loading
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.setAttribute("loading", "lazy")
    })
  } else {
    // Fallback for browsers that don't support lazy loading
    // You could add a lazy loading library here if needed
  }

  // Responsive Tables
  const tables = document.querySelectorAll("table")
  tables.forEach((table) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("table-responsive")
    table.parentNode.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  // Touch Device Detection
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  }

  // Apply special classes for touch devices
  if (isTouchDevice()) {
    document.body.classList.add("touch-device")

    // Convert hover effects to click/tap for touch devices
    const hoverElements = document.querySelectorAll(".float-on-hover, .grow-on-hover")
    hoverElements.forEach((element) => {
      element.addEventListener(
        "touchstart",
        function () {
          this.classList.add("touch-active")
        },
        { passive: true },
      )

      element.addEventListener(
        "touchend",
        function () {
          setTimeout(() => {
            this.classList.remove("touch-active")
          }, 300)
        },
        { passive: true },
      )
    })
  }

  // Responsive Video Embeds
  const videoEmbeds = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]')
  videoEmbeds.forEach((iframe) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("video-responsive")
    iframe.parentNode.insertBefore(wrapper, iframe)
    wrapper.appendChild(iframe)
  })

  // Viewport Height Fix for Mobile Browsers
  function setVhProperty() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  // Set the --vh value initially and on resize
  setVhProperty()
  window.addEventListener("resize", setVhProperty)

  // Handle orientation change specifically
  window.addEventListener("orientationchange", () => {
    // Small delay to ensure the browser has completed the orientation change
    setTimeout(setVhProperty, 100)
  })

  // Add swipe functionality for mobile carousels/sliders
  const sliders = document.querySelectorAll(".testimonials-slider")

  if (sliders.length > 0 && isTouchDevice()) {
    sliders.forEach((slider) => {
      let startX, endX
      const testimonials = slider.querySelectorAll(".testimonial-item")
      let currentIndex = 0

      slider.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX
        },
        { passive: true },
      )

      slider.addEventListener(
        "touchend",
        (e) => {
          endX = e.changedTouches[0].clientX
          handleSwipe()
        },
        { passive: true },
      )

      function handleSwipe() {
        const threshold = 50 // Minimum distance for swipe

        if (startX - endX > threshold) {
          // Swipe left - next testimonial
          showTestimonial((currentIndex + 1) % testimonials.length)
        } else if (endX - startX > threshold) {
          // Swipe right - previous testimonial
          showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length)
        }
      }

      function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentIndex].style.opacity = "0"

        setTimeout(() => {
          testimonials[currentIndex].style.display = "none"

          // Update dots if they exist
          const dots = slider.querySelectorAll(".slider-dot")
          if (dots.length) {
            dots.forEach((d) => d.classList.remove("active"))
            dots[index].classList.add("active")
          }

          // Show selected testimonial
          currentIndex = index
          testimonials[currentIndex].style.display = "block"
          testimonials[currentIndex].style.opacity = "0"

          setTimeout(() => {
            testimonials[currentIndex].style.opacity = "1"
          }, 50)
        }, 300)
      }
    })
  }

  // Add CSS class for high-resolution displays
  if (window.devicePixelRatio > 1.5) {
    document.body.classList.add("high-res-display")
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (menuOpen) {
          mobileMenuBtn.click()
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Update URL hash without jumping
        history.pushState(null, null, targetId)
      }
    })
  })
})

// Add additional CSS for touch devices
if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  const style = document.createElement("style")
  style.textContent = `
        .touch-device .btn,
        .touch-device .tab-btn,
        .touch-device .form-group input,
        .touch-device .form-group select,
        .touch-device .form-group textarea {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        
        .touch-device .touch-active {
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
        }
        
        .touch-device .pulse-on-hover:active {
            animation: pulse 0.5s;
        }
        
        .touch-device .shake-on-hover:active {
            animation: shake 0.5s;
        }
        
        .table-responsive {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        .video-responsive {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
            height: 0;
            overflow: hidden;
        }
        
        .video-responsive iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
        
        /* Use custom viewport height variable */
        .mobile-menu {
            height: calc(var(--vh, 1vh) * 100 - 60px);
        }
        
        /* Larger touch targets on very small screens */
        @media (max-width: 360px) {
            .touch-device .btn,
            .touch-device .tab-btn,
            .touch-device .mobile-menu a {
                padding: 12px 16px;
                min-height: 48px;
            }
        }
    `
  document.head.appendChild(style)
}

// Add viewport meta tag if not present
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement("meta")
  meta.name = "viewport"
  meta.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0"
  document.head.appendChild(meta)
}

