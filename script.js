const galleryItems = [
  {
    src: "assets/images/sightseeing.jpg",
    alt: "Coorg hills and scenic views",
    caption: "Scenic sightseeing trips across viewpoints, waterfalls, and popular Coorg attractions."
  },
  {
    src: "assets/images/airport.jpg",
    alt: "Airport taxi service",
    caption: "Timely airport pickup and drop service with smooth transfer coordination."
  },
  {
    src: "assets/images/outstation.jpg",
    alt: "Outstation taxi routes",
    caption: "Comfortable outstation taxi options for Bangalore to Coorg and nearby routes."
  },
  {
    src: "assets/images/local.jpg",
    alt: "Local taxi in Coorg",
    caption: "Reliable local cab service for hotel transfers, shopping, and short-distance trips."
  },
  {
    src: "assets/images/crysta.jpg",
    alt: "SUV taxi service",
    caption: "Most-booked SUV option for families and flexible sightseeing travel plans."
  },
  {
    src: "assets/images/tt.jpg",
    alt: "Tempo Traveller taxi",
    caption: "Spacious Tempo Traveller for groups, family tours, and coordinated travel."
  }
];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-nav.prev");
const nextButton = document.querySelector(".lightbox-nav.next");
const galleryButtons = document.querySelectorAll(".gallery-item");
const enquiryForm = document.getElementById("quickEnquiryForm");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
let currentIndex = 0;

function renderLightbox(index) {
  const item = galleryItems[index];
  currentIndex = index;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showNext(step) {
  const nextIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
  renderLightbox(nextIndex);
}

if (lightbox && lightboxImage && lightboxCaption) {
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(Number(button.dataset.index));
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => showNext(-1));
  nextButton.addEventListener("click", () => showNext(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showNext(-1);
    } else if (event.key === "ArrowRight") {
      showNext(1);
    }
  });
}

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tripType = document.getElementById("tripType").value;
    const pickupLocation = document.getElementById("pickupLocation").value.trim();
    const vehicleType = document.getElementById("vehicleType").value;

    if (!pickupLocation) {
      document.getElementById("pickupLocation").focus();
      return;
    }

    const message = [
      "Hi Coorg Thanika Travels, I would like to book a taxi.",
      "",
      `Trip Type: ${tripType}`,
      `Pickup Location: ${pickupLocation}`,
      `Vehicle: ${vehicleType}`
    ].join("\n");

    window.open(`https://wa.me/919902808648?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}
