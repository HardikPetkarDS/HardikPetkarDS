
/* ==========================================
   HARDIK PETKAR - PORTFOLIO INTERACTIONS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // PROJECT COMMAND CENTER
    // =====================================

    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {

        const trigger = card.querySelector(".card-trigger");
        const content = card.querySelector(".project-content");
        const arrow = card.querySelector(".explore-arrow");

        if (!trigger || !content) return;

        trigger.addEventListener("click", () => {

            const isAlreadyOpen =
                trigger.getAttribute("aria-expanded") === "true";

            // Close every other category
            cards.forEach((otherCard) => {

                const otherTrigger =
                    otherCard.querySelector(".card-trigger");

                const otherContent =
                    otherCard.querySelector(".project-content");

                if (!otherTrigger || !otherContent) return;

                otherTrigger.setAttribute("aria-expanded", "false");
                otherContent.hidden = true;

                const otherArrow =
                    otherCard.querySelector(".explore-arrow");

                if (otherArrow) {
                    otherArrow.textContent = "↗";
                }

                otherCard.classList.remove("active");

            });

            // Open selected category
            if (!isAlreadyOpen) {

                trigger.setAttribute("aria-expanded", "true");

                content.hidden = false;

                card.classList.add("active");

                if (arrow) {
                    arrow.textContent = "↘";
                }

                // Scroll to selected category
                setTimeout(() => {

                    const headerOffset = 100;

                    const cardPosition =
                        card.getBoundingClientRect().top +
                        window.scrollY -
                        headerOffset;

                    window.scrollTo({
                        top: cardPosition,
                        behavior: "smooth"
                    });

                }, 100);

            }

        });

    });


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".skill-group, .project-card, .contact-box"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    // =====================================
    // ACTIVE NAVIGATION
    // =====================================

    const sections = document.querySelectorAll(
        "header[id], section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    if ("IntersectionObserver" in window) {

        const navObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        navLinks.forEach((link) => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        sections.forEach((section) => {
            navObserver.observe(section);
        });

    }


    // =====================================
    // CURRENT YEAR IN FOOTER
    // =====================================

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} HARDIK PETKAR`;

    }


    // =====================================
    // IMAGE ERROR HANDLING
    // =====================================

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        heroImage.addEventListener("error", () => {

            console.error(
                "Workspace image could not be loaded. Check ../workspace.png"
            );

        });

    }


    console.log(
        "%c HARDIK PETKAR | PORTFOLIO INITIALIZED ",
        "background:#00D9FF;color:#050B14;padding:10px;font-weight:bold;"
    );

});

