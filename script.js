
// ==========================================
// CONFIGURAÇÕES OFICIAIS DO PEG
// ==========================================

const CONFIG = {
  // Coloque o endereço oficial do PEG:
  pegUrl: "https://peg-app2.vercel.app/",

  // Coloque o link direto para baixar o APK:
  apkUrl: "https://median.co/share/odeyqxy#apk"
};

// ==========================================
// SELEÇÃO DE DISPOSITIVO
// ==========================================

const deviceButtons = document.querySelectorAll(".device");

const androidPanel = document.getElementById("androidPanel");
const iosPanel = document.getElementById("iosPanel");

function selectDevice(device) {
  deviceButtons.forEach(button => {
    const active = button.dataset.device === device;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  androidPanel.classList.toggle("active", device === "android");
  iosPanel.classList.toggle("active", device === "ios");

  localStorage.setItem("peg-device", device);
}

deviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectDevice(button.dataset.device);
  });
});

// ==========================================
// DETECTAR ANDROID OU IPHONE
// ==========================================

function detectDevice() {
  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "ios";
  }

  return "android";
}

const savedDevice = localStorage.getItem("peg-device");

selectDevice(
  savedDevice === "ios" || savedDevice === "android"
    ? savedDevice
    : detectDevice()
);

// ==========================================
// MENSAGENS
// ==========================================

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ==========================================
// LINKS DO PEG
// ==========================================

function validUrl(url) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      !parsed.hostname.includes("SEU-SITE") &&
      !parsed.hostname.includes("SEU-LINK")
    );
  } catch {
    return false;
  }
}

function openPeg(event) {
  event.preventDefault();

  if (!validUrl(CONFIG.pegUrl)) {
    showToast("Configure o link oficial do PEG no script.js.");
    return;
  }

  window.open(CONFIG.pegUrl, "_blank", "noopener,noreferrer");
}

document.getElementById("openPegHero")
  .addEventListener("click", openPeg);

document.getElementById("openPegIos")
  .addEventListener("click", openPeg);

document.getElementById("openPegFooter")
  .addEventListener("click", openPeg);

// ==========================================
// DOWNLOAD DO APK
// ==========================================

document.getElementById("downloadApk")
  .addEventListener("click", event => {
    event.preventDefault();

    if (!validUrl(CONFIG.apkUrl)) {
      showToast("Configure o link de download do APK.");
      return;
    }

    window.location.href = CONFIG.apkUrl;
  });

// ==========================================
// MODO ESCURO
// ==========================================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  themeToggle.textContent = theme === "dark" ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Ativar modo claro"
      : "Ativar modo escuro"
  );
}

const savedTheme = localStorage.getItem("peg-theme");

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  applyTheme(next);
  localStorage.setItem("peg-theme", next);
});

// ==========================================
// VOLTAR AO TOPO
// ==========================================

document.getElementById("backToTop")
  .addEventListener("click", event => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

// ==========================================
// ANIMAÇÃO AO ROLAR
// ==========================================

const revealElements = document.querySelectorAll(
  ".step, .faq details, .section-heading"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(15px)";
    element.style.transition = "opacity .5s ease, transform .5s ease";
    observer.observe(element);
  });
}
