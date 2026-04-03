document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Check on load in case page is already scrolled
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  }

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes to elements dynamically and observe them
  const fadeUpElements = document.querySelectorAll(
    ".section-title, .title-divider, .section-description, .about-text, .material-card, .stats-row, .gallery-item, .contact-method, .form-group",
  );
  fadeUpElements.forEach((el) => {
    el.classList.add("fade-up");
    observer.observe(el);
  });

  const slideLeftElements = document.querySelectorAll(
    ".about-content, .b2b-materials, .divayu-text, .contact-info",
  );
  slideLeftElements.forEach((el) => {
    el.classList.add("slide-in-left");
    observer.observe(el);
  });

  const slideRightElements = document.querySelectorAll(
    ".about-visual, .b2b-image-wrap, .divayu-image, .contact-form-container",
  );
  slideRightElements.forEach((el) => {
    el.classList.add("slide-in-right");
    observer.observe(el);
  });
});

// Contact Form Submission -> Google Sheets
const successMsg = document.querySelector(".success-msg");
successMsg.style.display = "none";
document
  .querySelector(".contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".submit-btn").innerText = "Submitting...";
    document.querySelector(".submit-btn").disabled = true;
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      interest: document.getElementById("interest").value,
      message: document.getElementById("message").value,
    };
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwc8LBRIlS1Edemdn4H6xDW1AOBHnkD9VOMVWwJ6VDlAe6-jTG0_mrzCjUU5hhRxDS5/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      if (result.status == "success") {
        document.querySelector(".submit-btn").innerText = "Submit";
        successMsg.style.display = "block";
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 3000);
        document.querySelector(".contact-form").reset();
      } else {
        alert("Message failed to send please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  });
