// Shared dashboard utilities.
// Authentication and authorization must be implemented server-side in PHP.
// This file intentionally does NOT make security decisions.

const DashboardUI = {
  showLoading(element) {
    if (element) element.setAttribute("aria-busy", "true");
  },

  hideLoading(element) {
    if (element) element.setAttribute("aria-busy", "false");
  },

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `cms-toast cms-toast-${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }
};
