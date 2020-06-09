const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

const navItems = document.querySelectorAll(".nav-item");

//Initial state of menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");

    navItems.forEach((item) => item.classList.add("show"));
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");

    navItems.forEach((item) => item.classList.remove("show"));
    showMenu = false;
  }
}

//Firebase Initialization

const configFunc = () => {
  let configFire = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    databaseURL: config.DB_URL,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE,
    messagingSenderId: config.MESSAGE_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID,
  };

  firebase.initializeApp(configFire);

  // Reference messages collection
  let messagesRef = firebase.database().ref("messages");
  return messagesRef;
};

// Listen for form submit
if (document.getElementById("contactForm"))
  document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  let alertMessage = document.getElementById("alert");
  let name = getInputVal("name");
  let company = getInputVal("company");
  let email = getInputVal("email");
  let phone = getInputVal("phone");
  let message = getInputVal("message");

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }

  // Save message
  if (validate(name, company, email, phone, message, alertMessage))
    saveMessage(name, company, email, phone, message, alertMessage);

  // Show alert

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector("#alert").style.display = "none";
  }, 8000);
}

// Save message to firebase
function saveMessage(name, company, email, phone, message, alertMessage) {
  let messagesRef = configFunc();
  let newMessageRef = messagesRef.push();
  newMessageRef
    .set({
      name: name,
      company: company,
      email: email,
      phone: phone,
      message: message,
    })
    .then(() => {
      alertMessage.innerHTML = "Your message has been sent";
      document.querySelector("#alert").style.display = "block";
    })
    .catch(() => {
      alertMessage.innerHTML = "Something went wrong. Try again!";
      document.querySelector("#alert").style.display = "block";
    });

  // Clear form
  document.getElementById("contactForm").reset();
}

//Contact form validation

function validate(name, company, email, phone, message, alertMessage) {
  if (name.length < 5) {
    console.log(name.length);
    alertMessage.innerHTML = "Please Enter valid Name";
    document.querySelector("#alert").style.display = "block";

    return false;
  }
  if (email.indexOf("@") == -1 || email.length < 8) {
    alertMessage.innerHTML = "Please Enter valid Email";
    document.querySelector("#alert").style.display = "block";

    return false;
  }
  if (company.length !== 0 && company.length < 10) {
    alertMessage.innerHTML = "Please Enter valid Company Name";
    document.querySelector("#alert").style.display = "block";

    return false;
  }
  if (company.length !== 0 && (isNaN(phone) || phone.length != 10)) {
    alertMessage.innerHTML = "Please Enter valid Phone Number";
    document.querySelector("#alert").style.display = "block";

    return false;
  }
  if (message.length <= 50) {
    alertMessage.innerHTML = "Your Message should be more than 50 Characters";
    document.querySelector("#alert").style.display = "block";

    return false;
  }

  return true;
}

//Display controls for nav-items and active link styling

navItems[0].addEventListener("click", () => {
  document.getElementById("home").style.display = "block";
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("contact").style.display = "none";

  navItems[0].classList.add("current");
  navItems[1].classList.remove("current");
  navItems[2].classList.remove("current");
  navItems[3].classList.remove("current");
  toggleMenu();

  window.scrollTo(0, 0);
  document.getElementById("main-img").classList.add("overflow");
});

navItems[1].addEventListener("click", () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("about").style.display = "block";
  document.getElementById("projects").style.display = "none";
  document.getElementById("contact").style.display = "none";

  navItems[0].classList.remove("current");
  navItems[1].classList.add("current");
  navItems[2].classList.remove("current");
  navItems[3].classList.remove("current");
  toggleMenu();

  window.scrollTo(0, 0);
  document.getElementById("main-img").classList.remove("overflow");
});

navItems[2].addEventListener("click", () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "block";
  document.getElementById("contact").style.display = "none";

  navItems[0].classList.remove("current");
  navItems[1].classList.remove("current");
  navItems[2].classList.add("current");
  navItems[3].classList.remove("current");
  toggleMenu();

  window.scrollTo(0, 0);
  document.getElementById("main-img").classList.remove("overflow");
});

navItems[3].addEventListener("click", () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("contact").style.display = "block";

  navItems[0].classList.remove("current");
  navItems[1].classList.remove("current");
  navItems[2].classList.remove("current");
  navItems[3].classList.add("current");
  toggleMenu();

  window.scrollTo(0, 0);
  document.getElementById("main-img").classList.remove("overflow");
});
