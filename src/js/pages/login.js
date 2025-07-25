import { renderSignUp } from "./signup.js";

const body = document.querySelector("body");

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

  // Form Submit
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
      const res = await axios.get(
        "https://68834b4e21fa24876a9d7e70.mockapi.io/cryptoView/user"
      );

      const matchedUser = res.data.find(
        (u) =>
          u.email === emailInput.value && u.password === passwordInput.value
      );

      if (matchedUser) {
        alert("Login successful! Welcome, " + matchedUser.email);
        const container = document
          .querySelector(".container-login-sinup")
          .remove();
        const overlay = document
          .querySelector(".login-overlay")
          .remove();
      } else {
        errorDiv.textContent = "Invalid email or password.";
      }
    } catch (err) {
      console.log(err);
    }
  });
}
