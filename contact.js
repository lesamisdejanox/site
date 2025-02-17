// Handling missing contact form input 
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nom");
    const emailInput = document.getElementById("destinataire");
    const messageInput = document.querySelector("textarea");
    const subjectInput = document.getElementById("sujet");

    const nameError = document.querySelector(".error-nom");
    const emailError = document.querySelector(".error-destin");
    const subjectError = document.querySelector(".error-sujet");
    const messageError = document.querySelector(".error-message");

    // Initialize EmailJS accounts
    const emailAccounts = [
        {
            publicKey: "AtxzoDZpQmh24BrZ3", // First account public key
            serviceID: "service_hn8oe4b",   // First account service ID
            templateID: "template_weq4srj" // First account template ID
        }
    ];

    emailjs.init(emailAccounts[0].publicKey);

    // Helper function for validating fields
    function validateField(input, errorElement, validationFn) {
        if (validationFn(input.value.trim())) {
            errorElement.style.display = "none";
            return true;
        } else {
            errorElement.style.display = "block";
            return false;
        }
    }

    // Add blur and input event listeners for validation
    nameInput.addEventListener("blur", () => validateField(nameInput, nameError, (value) => value !== ""));
    emailInput.addEventListener("blur", () => validateField(emailInput, emailError, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)));
    subjectInput.addEventListener("input", () => (subjectError.style.display = subjectInput.value.trim() ? "none" : "block"));
    messageInput.addEventListener("input", () => (messageError.style.display = messageInput.value.trim() ? "none" : "block"));

    document.getElementById("send_mail").addEventListener("click", (e) => {
        e.preventDefault();

        const preferredLang = localStorage.getItem("preferredLang") || "en";

        const Popups = {
            "en": {
                success: { title: "Success!", text: "Your message has been sent.", icon: "success", confirmButtonText: "OK" },
                error: { title: "Error!", text: "There was an issue sending your message.", icon: "error", confirmButtonText: "Try Again" }
            },
            "fr": {
                success: { title: "Succès!", text: "Votre message a été envoyé.", icon: "success", confirmButtonText: "D'accord" },
                error: { title: "Erreur!", text: "Il y a eu un problème lors de l'envoi de votre message.", icon: "error", confirmButtonText: "Réessayer" }
            }
        };

        // Validate all fields
        const isNameValid = validateField(nameInput, nameError, (value) => value !== "");
        const isEmailValid = validateField(emailInput, emailError, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        const isSubjectValid = validateField(subjectInput, subjectError, (value) => value !== "");
        const isMessageValid = validateField(messageInput, messageError, (value) => value !== "");

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const params = {
                from_name: nameInput.value,
                email_id: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value,
                reply_to: emailInput.value
            };

            // Try sending the email using the accounts sequentially
            let attempt = 0;

            function sendEmail() {
                if (attempt < emailAccounts.length) {
                    const account = emailAccounts[attempt];
                    emailjs.init(account.publicKey);
                    emailjs.send(account.serviceID, account.templateID, params)
                        .then(() => {
                            Swal.fire(Popups[preferredLang].success);
                            nameInput.value = "";
                            emailInput.value = "";
                            subjectInput.value = "";
                            messageInput.value = "";
                        })
                        .catch((error) => {
                            console.error(`EmailJS Error (Account ${attempt + 1}):`, error);
                            attempt++;
                            sendEmail(); // Retry with the next account
                        });
                } else {
                    Swal.fire(Popups[preferredLang].error);
                }
            }

            sendEmail(); // Start the email sending process
        }
    });
});
