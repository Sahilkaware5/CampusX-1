document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const portal = document.getElementById("portal");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const rememberMe = document.getElementById("remember-me");
  const submit = document.getElementById("login-submit");
  const status = document.getElementById("login-status");
  const toggle = document.getElementById("password-toggle");
  const forgot = document.getElementById("forgot-password");
  const portalInfo = document.getElementById("portal-info");
  const portalInfoText = document.getElementById("portal-info-text");
  const portalInfoIcon = document.getElementById("portal-info-icon");
  const toast = document.getElementById("login-toast");

  const portalDetails = {
    STUDENT_ADMIN: { icon: "fa-user-graduate", text: "Manage student records, academic information, attendance and services." },
    FACULTY_ADMIN: { icon: "fa-chalkboard-user", text: "Manage faculty records, subjects, classes and academic activities." },
    CR_ADMIN: { icon: "fa-users", text: "Coordinate your assigned class, communication and student requests." },
    COUNCIL_ADMIN: { icon: "fa-people-group", text: "Manage council activities, events, initiatives and student engagement." },
    CRC_ADMIN: { icon: "fa-sitemap", text: "Coordinate representatives and monitor cross-campus activities and requests." }
  };

  const errorMap = {
    portal: document.getElementById("portal-error"),
    username: document.getElementById("username-error"),
    password: document.getElementById("password-error")
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3400);
  };

  const setFieldError = (field, message) => {
    const wrapper = field.closest(".form-field");
    const error = errorMap[field.name] || document.getElementById(`${field.id}-error`);
    wrapper?.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const clearFieldError = (field) => setFieldError(field, "");

  const setStatus = (message, type = "info") => {
    status.textContent = message;
    status.className = `login-status ${type}`;
    status.hidden = false;
  };

  const clearStatus = () => {
    status.textContent = "";
    status.className = "login-status";
    status.hidden = true;
  };

  const updatePortalInfo = () => {
    const detail = portalDetails[portal.value];
    if (!detail) {
      portalInfo.hidden = true;
      return;
    }
    portalInfoIcon.className = `fa-solid ${detail.icon}`;
    portalInfoText.textContent = detail.text;
    portalInfo.hidden = false;
  };

  const validatePortal = () => {
    if (!portal.value) {
      setFieldError(portal, "Please select a portal.");
      return false;
    }
    clearFieldError(portal);
    return true;
  };

  const validateUsername = () => {
    const value = username.value.trim();
    if (!value) {
      setFieldError(username, "Please enter your username or email.");
      return false;
    }
    if (value.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldError(username, "Please enter a valid email address.");
      return false;
    }
    clearFieldError(username);
    return true;
  };

  const validatePassword = () => {
    if (!password.value) {
      setFieldError(password, "Please enter your password.");
      return false;
    }
    clearFieldError(password);
    return true;
  };

  portal.addEventListener("change", () => {
    updatePortalInfo();
    validatePortal();
    clearStatus();
  });

  [portal, username, password].forEach(field => {
    field.addEventListener("input", () => {
      clearStatus();
      if (field === portal) validatePortal();
      if (field === username) validateUsername();
      if (field === password) validatePassword();
    });
  });

  toggle.addEventListener("click", () => {
    const visible = password.type === "text";
    password.type = visible ? "password" : "text";
    toggle.setAttribute("aria-label", visible ? "Show password" : "Hide password");
    toggle.setAttribute("aria-pressed", String(!visible));
    toggle.innerHTML = `<i class="fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}" aria-hidden="true"></i>`;
  });

  forgot.addEventListener("click", () => {
    setStatus("Password recovery will be available when the secure backend recovery flow is implemented.", "info");
    showToast("Password recovery is not available yet.");
  });

  const setLoading = (loading) => {
    submit.disabled = loading;
    submit.setAttribute("aria-busy", String(loading));
    submit.querySelector(".button-label").hidden = loading;
    submit.querySelector(".button-loading").hidden = !loading;
    submit.querySelector(".button-arrow").hidden = loading;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();

    const valid = [validatePortal(), validateUsername(), validatePassword()].every(Boolean);
    if (!valid) {
      setStatus("Please correct the highlighted fields before signing in.", "error");
      showToast("Please check the highlighted fields.");
      const firstInvalid = [portal, username, password].find(field => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      return;
    }

    /*
      Frontend-only stage:
      - No credentials are compared in JavaScript.
      - No password is stored in localStorage/sessionStorage/cookies.
      - No role is trusted for authorization.
      Future PHP integration can submit this same form to action="/backend/auth/login.php".
      The server must authenticate the account, establish the PHP session, determine the
      authoritative role, and return the appropriate dashboard route.
    */
    setLoading(true);
    setStatus("Demo mode: preparing the secure sign-in request. No credentials are verified in the browser.", "info");

    window.setTimeout(() => {
      setLoading(false);
      setStatus("Backend authentication is not connected yet. No credentials were stored or verified.", "info");
      showToast("Authentication backend will be connected in the PHP phase.");
    }, 700);

    void rememberMe.checked;
  });
});
