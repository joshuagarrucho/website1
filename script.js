const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const joinForm = document.getElementById("join-form");
const formMessage = document.getElementById("form-message");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

if (filterButtons.length && productCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      productCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

if (joinForm && formMessage) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = joinForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
      formMessage.textContent = "Add your email first.";
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    formMessage.textContent = isValid ? "You're on the list." : "Enter a valid email.";

    if (isValid) {
      joinForm.reset();
    }
  });
}

if (revealItems.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PRODUCT DATABASE
    const productDatabase = {
        "black-baggy-denim": {
            name: "Black Baggy Denim",
            price: "PHP 1,000",
            image: "/img/Baggy denim black.jpg",
            description: ["Relaxed, baggy fit throughout the leg", "Premium heavyweight denim", "Classic 5-pocket styling"]
        },
        "black-sweatpants": {
            name: "Black Baggy Sweatpants",
            price: "PHP 900",
            image: "/img/Black Baggy Sweatpants.webp", 
            description: ["Ultra soft cotton fleece blend", "Baggy, relaxed fit", "Drawstring waist"]
        },
        "ferrari-tee": {
            name: "Ferrari Graphic Tee",
            price: "PHP 800",
            image: "/img/ferrari-tee.jpg", 
            description: ["Oversized fit", "Premium heavyweight cotton", "High-quality back graphic print"]
        },
          "Khaki-Baggy-Cargo-Pants": {
            name: "Khaki Baggy Cargo Pants",
            price: "PHP 1,100",
            image: "/img/Khaki Baggy Cargo Pants.png",
            description: ["Relaxed, baggy fit throughout the leg", "Durable cotton blend", "Multiple pocket design"]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('item');
    const titleElement = document.getElementById('product-title');
    
    if (titleElement) {
        if (itemId && productDatabase[itemId]) {
            const product = productDatabase[itemId]; 

            document.getElementById('product-title').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-image').alt = product.name;
            document.title = `${product.name} - JOSHYX`; // Updates the browser tab name

            const descList = document.getElementById('product-desc-list');
            descList.innerHTML = ""; 
            
            product.description.forEach(point => {
                let li = document.createElement('li');
                li.textContent = point;
                descList.appendChild(li);
            });
        } else {
            titleElement.textContent = "Product Not Found";
            document.getElementById('product-price').textContent = "---";
        }
    }

    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            sizeButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");
    const qtyInput = document.getElementById("qty-input");

    if (decreaseBtn && increaseBtn && qtyInput) {
        decreaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
        });
    }
});
