// ==============================
// 1. CHANGE PAGE CONTENT
// ==============================

const title = document.getElementById("main-title");
title.textContent = "Welcome Manish";

const about = document.querySelector(".about-me");
about.textContent = "I am learning JavaScript and frontend development.";

const badge = document.querySelector(".badge");
badge.textContent = "UPDATED";


// ==============================
// 2. GET FORM ELEMENTS
// ==============================

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const formMessage = document.getElementById("form-message");


// ==============================
// 3. SHOW MESSAGE
// ==============================

function showMessage(message) {
    formMessage.textContent = message;
}


// ==============================
// 4. VALIDATE EMAIL
// ==============================

function validateEmail(email) {

    if (email === "") {
        return "Email is required";
    }

    if (!email.includes("@")) {
        return "Please enter a valid email";
    }

    if (!email.includes(".")) {
        return "Please enter a valid email";
    }

    return "";
}


// ==============================
// 5. VALIDATE MESSAGE
// ==============================

function validateMessage(message) {

    if (message === "") {
        return "Message is required";
    }

    if (message.length < 10) {
        return "Message must be at least 10 characters";
    }

    if (message.length > 200) {
        return "Message must not exceed 200 characters";
    }

    return "";
}


// ==============================
// 6. FORM SUBMIT
// ==============================

form.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Clear previous message
    formMessage.textContent = "";


    // ---------- NAME ----------

    const name = nameInput.value.trim();

    if (name === "") {
        showMessage("Name is required");
        return;
    }


    // ---------- EMAIL ----------

    const email = emailInput.value.trim();

    const emailError = validateEmail(email);

    if (emailError !== "") {
        showMessage(emailError);
        return;
    }


    // ---------- MESSAGE ----------

    const message = messageInput.value.trim();

    const messageError = validateMessage(message);

    if (messageError !== "") {
        showMessage(messageError);
        return;
    }


    // ---------- GENDER ----------

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {
        showMessage("Please select your gender");
        return;
    }


    // ---------- SKILLS ----------

    const skills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );

    if (skills.length === 0) {
        showMessage("Please select at least one skill");
        return;
    }


    // Get selected skills
    const skillValues = [];

    skills.forEach(function(skill) {
        skillValues.push(skill.value);
    });


    // ==============================
    // SUCCESS
    // ==============================

    showMessage(
        `Hello ${name}! Your email is ${email}. ` +
        `Your gender is ${gender.value}. ` +
        `Your message: ${message}. ` +
        `Your skills are: ${skillValues.join(", ")}`
    );


    // Show in console
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("Gender:", gender.value);
    console.log("Skills:", skillValues);


    // ==============================
    // 7. SAVE TO LOCAL STORAGE
    // ==============================

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);


    // Show saved information immediately
    displaySavedInfo();


    // Clear form
    form.reset();

});


// ==============================
// 8. LOCAL STORAGE
// ==============================

const savedInfo = document.getElementById("saved-info");
const clearStorage = document.getElementById("clear-storage");


// Display saved information
function displaySavedInfo() {

    const savedName = localStorage.getItem("studentName");
    const savedEmail = localStorage.getItem("studentEmail");

    if (savedName && savedEmail) {

        savedInfo.textContent =
            `Name: ${savedName} | Email: ${savedEmail}`;

    } else {

        savedInfo.textContent =
            "No saved information.";
    }
}


// Display saved data when page loads
displaySavedInfo();


// ==============================
// 9. CLEAR LOCAL STORAGE
// ==============================

clearStorage.addEventListener("click", function() {

    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");

    displaySavedInfo();

});