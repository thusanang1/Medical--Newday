document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearElements = document.querySelectorAll("#currentYear")
  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear()
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block"

      // Toggle hamburger menu animation
      const spans = mobileMenuBtn.querySelectorAll("span")
      spans.forEach((span, index) => {
        span.classList.toggle("active")
        if (span.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })
  }

  // Service tabs functionality with animation
  const tabBtns = document.querySelectorAll(".tab-btn")
  const serviceDetails = document.querySelectorAll(".service-detail")

  if (tabBtns.length > 0 && serviceDetails.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Add shake animation to clicked button
        this.classList.add("shake-animation")

        // Remove animation after it completes
        setTimeout(() => {
          this.classList.remove("shake-animation")
        }, 820) // Animation duration

        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        const category = this.dataset.category

        // Show/hide services based on category with animation
        serviceDetails.forEach((service) => {
          if (category === "all" || service.dataset.category === category) {
            service.style.display = "block"
            service.style.opacity = "0"
            service.style.transform = "translateY(20px)"

            // Animate in
            setTimeout(() => {
              service.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              service.style.opacity = "1"
              service.style.transform = "translateY(0)"
            }, 50)
          } else {
            service.style.opacity = "0"
            service.style.transform = "translateY(20px)"

            // Hide after fade out
            setTimeout(() => {
              service.style.display = "none"
            }, 500)
          }
        })
      })
    })
  }

  // Appointment form submission with animation
  const appointmentForm = document.getElementById("appointmentForm")

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const service = document.getElementById("service").value
      const date = document.getElementById("date").value
      const time = document.getElementById("time").value

      if (!name || !email || !phone || !service || !date || !time) {
        // Shake the form on error
        appointmentForm.classList.add("shake-animation")
        setTimeout(() => {
          appointmentForm.classList.remove("shake-animation")
        }, 820)

        alert("Please fill in all required fields.")
        return
      }

      // Add loading animation to submit button
      const submitBtn = appointmentForm.querySelector('button[type="submit"]')
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...'
      submitBtn.disabled = true

      // In a real application, you would send this data to a server
      // For this demo, we'll just redirect to the confirmation page after a delay

      // Create appointment data object
      const appointmentData = {
        name,
        email,
        phone,
        service,
        date,
        time,
        doctor: document.getElementById("doctor").value,
        notes: document.getElementById("notes").value,
      }

      // Store appointment data in localStorage (for demo purposes)
      localStorage.setItem("appointmentData", JSON.stringify(appointmentData))

      // Simulate server delay
      setTimeout(() => {
        // Redirect to confirmation page
        window.location.href = "appointment-confirmation.html"
      }, 1500)
    })
  }

  // Set minimum date for appointment date picker to today
  const dateInput = document.getElementById("date")
  if (dateInput) {
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1
    let dd = today.getDate()

    if (mm < 10) mm = "0" + mm
    if (dd < 10) dd = "0" + dd

    const formattedToday = yyyy + "-" + mm + "-" + dd
    dateInput.setAttribute("min", formattedToday)
  }

  // Add pulse animation to primary buttons
  const primaryButtons = document.querySelectorAll(".btn-primary")
  primaryButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.classList.add("pulse-on-hover")
    })

    btn.addEventListener("mouseleave", function () {
      this.classList.remove("pulse-on-hover")
    })
  })

  // Add floating animation to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.classList.add("float-on-hover")
  })

  // Add grow effect to all images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.classList.add("grow-on-hover")
  })
})

// Add loading spinner styles
const style = document.createElement("style")
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`
document.head.appendChild(style)

