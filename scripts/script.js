// ===== ОСНОВНОЙ СКРИПТ =====

// 1. ДОЖДАТЬСЯ ЗАГРУЗКИ ДОКУМЕНТА
document.addEventListener("DOMContentLoaded", function () {
  console.log("⚖️ Better Call Saul! ⚖️");
  initializeSite();
});

// 2. ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
function initializeSite() {
  setupMobileMenu();
  setupSmoothScroll();
  setupFormValidation();
  setupNeonSign();
  setupLogoJingle();
}

// 3. МОБИЛЬНОЕ МЕНЮ
function setupMobileMenu() {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!burgerBtn || !mobileMenu) return;

  // Открытие/закрытие меню
  burgerBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Закрытие меню при клике на ссылку
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", function (e) {
    if (
      !mobileMenu.contains(e.target) &&
      !burgerBtn.contains(e.target) &&
      mobileMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Закрытие меню при нажатии ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// 4. ПЛАВНАЯ ПРОКРУТКА
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Пропускаем якорь "#"
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// 5. ФОРМА ОБРАТНОЙ СВЯЗИ
function setupFormValidation() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Получаем элементы формы
    const submitBtn = this.querySelector(".submit-btn");
    const originalBtnText = submitBtn.innerHTML;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Проверка заполнения полей
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      !messageInput.value.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }

    // Проверка email
    if (!isValidEmail(emailInput.value)) {
      alert("Введите корректный email!");
      return;
    }

    // Показываем загрузку
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';
    submitBtn.disabled = true;

    try {
      // Создаем FormData
      const formData = new FormData(contactForm);

      // Отправляем на Formspree
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Успех
        alert("✅ Заявка отправлена! Сол свяжется с вами в течение 24 часов.");
        contactForm.reset();
      } else {
        throw new Error("Ошибка сервера");
      }
    } catch (error) {
      // Ошибка
      alert("❌ Ошибка отправки. Позвоните напрямую: 505-503-4455");
    } finally {
      // Восстанавливаем кнопку
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// 6. ПРОВЕРКА EMAIL
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 7. МИГАЮЩАЯ ВЫВЕСКА
function setupNeonSign() {
  const neonSign = document.getElementById("neonSign");
  if (!neonSign) return;

  neonSign.addEventListener("click", function () {
    playJingle();
  });
}

// 8. ДЖИНГЛ ПРИ КЛИКЕ НА ЛОГОТИП
function setupLogoJingle() {
  const logo = document.getElementById("logo");
  if (!logo) return;

  logo.addEventListener("click", function (e) {
    e.preventDefault();
    playJingle();
  });
}

// 9. ВОСПРОИЗВЕДЕНИЕ ДЖИНГЛА
function playJingle() {
  const audio = document.getElementById("saulJingle");
  if (audio) {
    audio.currentTime = 0;
    audio
      .play()
      .catch((e) => console.log("Автовоспроизведение заблокировано:", e));
  }
}
