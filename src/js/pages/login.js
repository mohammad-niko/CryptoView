import {
  getAuth,
  signInWithEmailAndPassword, // برای ورود با ایمیل و رمز عبور
  GoogleAuthProvider, // برای ورود با گوگل
  signInWithPopup, // برای باز کردن پاپ‌آپ ورود گوگل
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { renderSignUp } from "./signup.js";
import { auth, provider } from "../firebase.js";

const body = document.querySelector("body");

const googleIconSvg = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="google-icon">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.65-6.65C34.56 2.37 29.35 0 24 0 14.62 0 6.54 5.38 2.5 13.06l7.85 6.16C12.59 13.97 17.75 9.5 24 9.5z"></path>
  <path fill="#4285F4" d="M46.7 24.5c0-.82-.07-1.62-.2-2.39H24v9.06h12.55c-.56 2.92-2.37 5.37-5.06 7.02l7.7 6.01c4.54-4.23 7.15-10.45 7.15-17.61z"></path>
  <path fill="#FBBC04" d="M10.38 29.98c-.5-.85-.77-1.83-.77-2.88s.27-2.03.77-2.88l-7.85-6.16C2.17 17.56 1 20.6 1 24s1.17 6.44 3.03 9.06l7.35-5.74z"></path>
  <path fill="#34A853" d="M24 47.98c6.43 0 11.95-2.13 15.93-5.8l-7.7-6.01c-2.03 1.34-4.63 2.14-8.23 2.14-6.25 0-11.41-4.47-13.39-10.42l-7.35 5.74C6.54 42.6 14.62 47.98 24 47.98z"></path>
  <path fill="none" d="M0 0h48v48H0z"></path>
</svg>
`;

//event Listener for Login btn in header:
//styles in Login.scss.
const loginBtn = document
  .querySelector(".login-btn")
  .addEventListener("click", renderLoginView);

export function renderLoginView() {
  const notAg = document.querySelector(".login-overlay");
  if (notAg) notAg.remove();

  const overlay = document.createElement("div");
  overlay.classList.add("login-overlay");
  body.appendChild(overlay);

  const container = document.createElement("div");
  container.classList.add("container-login-sinup");
  body.appendChild(container);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("delete-login-singup-page", "bi", "bi-x");
  container.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", () => {
    container.remove();
    overlay.remove();
  });

  const logOrSin = document.createElement("div");
  logOrSin.classList.add("log-or-sin");
  container.appendChild(logOrSin);

  const login = document.createElement("div");
  login.classList.add("login-in-titale");
  login.innerText = "Login";
  login.style.color = "black";
  login.style.borderBottom = "3px solid blue";
  login.style.cursor = "pointer";
  logOrSin.appendChild(login);
  login.addEventListener("click", () => {
    renderLogin();
  });

  const singup = document.createElement("div");
  singup.innerText = "Signup";
  singup.classList.add("sinup-in-titale");
  singup.style.cursor = "pointer";
  logOrSin.appendChild(singup);

  singup.addEventListener("click", () => {
    renderSignUp();
  });

  const containerOfInputs = document.createElement("div");
  containerOfInputs.classList.add("container-of-inputs");
  container.appendChild(containerOfInputs);
  renderLogin();
}

export function renderLogin() {
  const containerOfInputs = document.querySelector(".container-of-inputs");
  containerOfInputs.innerHTML = "";

  const logInTitle = document.querySelector(".login-in-titale");
  logInTitle.style.color = "black";
  logInTitle.style.borderBottom = "3px solid blue";

  const singUpTitle = document.querySelector(".sinup-in-titale");
  singUpTitle.style.color = "gray";
  singUpTitle.style.borderBottom = "3px solid white";

  const form = document.createElement("form");
  form.classList.add("login-form");
  form.id = "login-form";

  // -------- Email Section --------
  const emailDiv = document.createElement("div");
  emailDiv.className = "form-group";

  const emailLabel = document.createElement("label");
  emailLabel.htmlFor = "loginEmail";
  emailLabel.textContent = "Email";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.classList.add("form-control");
  emailInput.required = true;

  const emailValidFeedback = document.createElement("div");
  emailValidFeedback.className = "valid-feedback";
  emailValidFeedback.textContent = "Looks good!";

  const emailInvalidFeedback = document.createElement("div");
  emailInvalidFeedback.className = "invalid-feedback";
  emailInvalidFeedback.textContent = "Please provide a valid email.";

  emailDiv.append(
    emailLabel,
    emailInput,
    emailValidFeedback,
    emailInvalidFeedback
  );

  // -------- Password Section --------
  const passwordDiv = document.createElement("div");
  passwordDiv.className = "form-group";

  const passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "loginPassword";
  passwordLabel.textContent = "Password";

  const passwordInputGroup = document.createElement("div");
  passwordInputGroup.classList.add("input-group");

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.classList.add("form-control");
  passwordInput.required = true;

  const togglePassword = document.createElement("i");
  togglePassword.className =
    "bi bi-eye-slash input-group-text toggle-password-eye";
  togglePassword.style.cursor = "pointer";

  const passwordValidFeedback = document.createElement("div");
  passwordValidFeedback.className = "valid-feedback";
  passwordValidFeedback.textContent = "Looks good!";

  const passwordInvalidFeedback = document.createElement("div");
  passwordInvalidFeedback.className = "invalid-feedback";
  passwordInvalidFeedback.textContent = "Please provide a password.";

  // -------- Error Message --------
  const errorDiv = document.createElement("div");
  errorDiv.style.color = "red";
  errorDiv.style.marginTop = "5px";

  passwordInputGroup.append(passwordInput, togglePassword);
  passwordDiv.append(
    passwordLabel,
    passwordInputGroup,
    errorDiv,
    passwordValidFeedback,
    passwordInvalidFeedback
  );

  // -------- Submit Button --------
  const submitDiv = document.createElement("div");
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary mt-3 w-100";
  submitButton.value = "Log in";
  submitDiv.appendChild(submitButton);

  // Append all to form
  form.append(emailDiv, passwordDiv, submitDiv);
  containerOfInputs.appendChild(form);

  // -------- Google Login Button --------
  const googleLoginDiv = document.createElement("div");
  googleLoginDiv.classList.add("text-center", "mt-3");

  const googleLoginButton = document.createElement("button");
  googleLoginButton.type = "button";
  // اضافه کردن کلاس‌های d-flex, align-items-center, justify-content-center برای چینش
  googleLoginButton.classList.add(
    "btn",
    "btn-outline-primary",
    "w-100",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );

  // آیکون گوگل (SVG)
  const googleIconContainer = document.createElement("div");
  googleIconContainer.innerHTML = googleIconSvg; // استفاده از googleIconSvg ایمپورت شده
  googleIconContainer.classList.add("me-2"); // برای فاصله بین آیکون و متن

  // متن دکمه
  const buttonText = document.createElement("span");
  buttonText.textContent = "Continue with Google";

  googleLoginButton.appendChild(googleIconContainer);
  googleLoginButton.appendChild(buttonText);

  googleLoginDiv.appendChild(googleLoginButton);
  containerOfInputs.appendChild(googleLoginDiv);

  // Email format validation
  emailInput.addEventListener("input", () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    if (!isValid) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
    } else {
      emailInput.classList.add("is-valid");
      emailInput.classList.remove("is-invalid");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (!passwordInput.value) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
    } else {
      passwordInput.classList.add("is-valid");
      passwordInput.classList.remove("is-invalid");
    }
  });

  // Password visibility toggle
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");
  });

  // Form Submit (Email/Password)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.textContent = "";

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const isPasswordValid = passwordInput.value.trim() !== "";

    if (!isEmailValid || !isPasswordValid) {
      if (!isEmailValid) emailInput.classList.add("is-invalid");
      if (!isPasswordValid) passwordInput.classList.add("is-invalid");
      form.classList.add("was-validated");
      return;
    }

    try {
      // این قسمت برای ورود با ایمیل و رمز عبور هست
      await signInWithEmailAndPassword(
        auth, // از auth که از firebaseConfig.js ایمپورت شده استفاده میکنیم
        emailInput.value,
        passwordInput.value
      );

      alert("Login successful!");
      const container = document.querySelector(".container-login-sinup");
      if (container) container.remove();
      const overlay = document.querySelector(".login-overlay");
      if (overlay) overlay.remove();
    } catch (err) {
      errorDiv.textContent = err.message;
      console.error(err);
    }
  });

  // Google Login Event Listener
  googleLoginButton.addEventListener("click", async () => {
    errorDiv.textContent = "";
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(
        "Login successful with Google! Welcome, " +
          (user.displayName || user.email)
      );

      const container = document.querySelector(".container-login-sinup");
      if (container) container.remove();
      const overlay = document.querySelector(".login-overlay");
      if (overlay) overlay.remove();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorDiv.textContent = errorMessage;
      console.error("Google Login Error:", errorCode, errorMessage);
    }
  });
}
