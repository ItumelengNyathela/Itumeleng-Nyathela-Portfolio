// Script for dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Load theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else if (savedTheme === 'light') {
        html.classList.remove('dark');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        }
    }

    // Toggle click
    toggle.addEventListener('click', () => {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});

// Script for contact form submission using EmailJS
document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("ahQEPQjGJSR0wItnz");

    const form = document.getElementById("contactForm");
    const popup = document.getElementById("successPopup");
    const card = document.getElementById("successCard");
    const closePopup = document.getElementById("closePopup");
    const errorPopup = document.getElementById("errorPopup");
    const errorCard = document.getElementById("errorCard");
    const closeErrorPopup = document.getElementById("closeErrorPopup");

    if (!form) return;

    // Submit Form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = form.querySelector("button");
        button.disabled = true;
        button.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <svg class="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4">
                    </circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                    </path>
                </svg>
                Sending Message...
            </div>
        `;
        try {
            await emailjs.send(
                "service_hrudo3i",
                "template_azp0inm",
                {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    subject: document.getElementById("subject").value,
                    message: document.getElementById("message").value
                }
            );
            // Show success popup
            popup.classList.remove("hidden");
            popup.classList.add("flex");
            setTimeout(() => {
                card.classList.remove("scale-90", "opacity-0");
                card.classList.add("scale-100", "opacity-100");
            }, 30);
            form.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);

            errorPopup.classList.remove("hidden");
            errorPopup.classList.add("flex");

            setTimeout(() => {
                errorCard.classList.remove("scale-90", "opacity-0");
                errorCard.classList.add("scale-100", "opacity-100");
            }, 30);
        } finally {
            button.disabled = false;
            button.innerHTML = `
                Send Message
                <i class="fas fa-arrow-right"></i>
            `;
        }
    });
    // Close popup for success
    if (closePopup) {
        closePopup.addEventListener("click", () => {
            card.classList.remove("scale-100", "opacity-100");
            card.classList.add("scale-90", "opacity-0");
            setTimeout(() => {
                popup.classList.remove("flex");
                popup.classList.add("hidden");
            }, 300);
        });
    }

    // Close popup for error
    if (closeErrorPopup) {
    closeErrorPopup.addEventListener("click", () => {

        errorCard.classList.remove("scale-100", "opacity-100");
        errorCard.classList.add("scale-90", "opacity-0");

        setTimeout(() => {
            errorPopup.classList.remove("flex");
            errorPopup.classList.add("hidden");
        }, 300);

    });
}
});

// Script to dynamically update the current year in the footer
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menuIcon = document.getElementById("menuIcon");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function closeMenu() {
        mobileMenu.classList.add("hidden");
        menuOverlay.classList.add("hidden");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

    function openMenu() {
        mobileMenu.classList.remove("hidden");
        menuOverlay.classList.remove("hidden");

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    }

    menuToggle.addEventListener("click", () => {
        if (mobileMenu.classList.contains("hidden")) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    menuOverlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});