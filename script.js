const packages = {
  bali: {
    title: 'Bali', location: 'BALI · 3 HARI 2 MALAM', duration: '3 Hari 2 Malam', price: 'Rp2.450.000',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    description: 'Nikmati sisi Bali yang paling menyenangkan: pantai, pura, kuliner lokal, dan matahari terbenam. Rencana perjalanan dibuat santai supaya kamu tetap punya waktu menikmati setiap tempat.',
    includes: ['Transportasi lokal selama tur', 'Penginapan 2 malam', 'Tiket masuk destinasi dalam itinerary', 'Pemandu lokal dan air mineral']
  },
  bromo: {
    title: 'Bromo', location: 'JAWA TIMUR · 2 HARI 1 MALAM', duration: '2 Hari 1 Malam', price: 'Rp1.350.000',
    image: 'https://i.pinimg.com/1200x/66/06/a3/6606a330b68dea492f2bc4a0b0bcd77e.jpg',
    description: 'Berangkat dini hari untuk menyambut matahari terbit dari kawasan Bromo, lalu lanjut menjelajahi lautan pasir dan kawah. Cocok untuk perjalanan singkat yang penuh pemandangan.',
    includes: ['Jeep 4WD untuk sunrise tour', 'Penginapan 1 malam', 'Tiket masuk kawasan Bromo', 'Pemandu dan transportasi lokal']
  },
  raja: {
    title: 'Raja Ampat', location: 'PAPUA BARAT DAYA · 4 HARI 3 MALAM', duration: '4 Hari 3 Malam', price: 'Rp5.750.000',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=720&q=85',
    description: 'Jelajahi gugusan pulau Raja Ampat lewat perjalanan perahu, snorkeling di perairan jernih, dan singgah di sudut-sudut alam yang sulit dilupakan.',
    includes: ['Perahu untuk island hopping', 'Penginapan 3 malam', 'Peralatan snorkeling dasar', 'Pemandu lokal dan makan selama tur']
  },
  bajo: {
    title: 'Labuan Bajo', location: 'NUSA TENGGARA TIMUR · 3 HARI 2 MALAM', duration: '3 Hari 2 Malam', price: 'Rp3.950.000',
    image: 'https://i.pinimg.com/1200x/2b/1a/fb/2b1afb38507030cf122fe4af4716df9b.jpg',
    description: 'Berlayar dari Labuan Bajo untuk melihat pulau-pulau eksotis, menikmati pemandangan laut, dan mengunjungi habitat Komodo bersama pemandu berpengalaman.',
    includes: ['Sailing trip dan transportasi lokal', 'Penginapan 2 malam', 'Tiket masuk Pulau Komodo', 'Pemandu, makan siang, dan air mineral']
  }
};

const modalElement = document.querySelector('#package-modal');
const packageModal = new bootstrap.Modal(modalElement);
const toastElement = document.querySelector('#site-toast');
const siteToast = new bootstrap.Toast(toastElement, { delay: 3800 });
let selectedPackage = '';

function showToast(message) {
  document.querySelector('#toast-message').textContent = message;
  siteToast.show();
}

function openPackage(key) {
  const item = packages[key];
  if (!item) return;
  selectedPackage = key;
  document.querySelector('#modal-image').src = item.image;
  document.querySelector('#modal-image').alt = item.title;
  document.querySelector('#modal-location').textContent = item.location;
  document.querySelector('#modal-title').textContent = item.title;
  document.querySelector('#modal-description').textContent = item.description;
  document.querySelector('#modal-duration').textContent = item.duration;
  document.querySelector('#modal-price').textContent = item.price;
  const includes = document.querySelector('#modal-includes');
  includes.replaceChildren(...item.includes.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
  packageModal.show();
}

document.querySelectorAll('.detail-button').forEach((button) => {
  button.addEventListener('click', () => openPackage(button.dataset.package));
});

document.querySelector('#modal-book').addEventListener('click', () => {
  const item = packages[selectedPackage];
  if (!item) return;
  const bookingSelect = document.querySelector('#booking-package');
  bookingSelect.value = item.title;
  packageModal.hide();
  document.querySelector('#booking-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.querySelector('#booking-name').focus({ preventScroll: true });
  showToast(`${item.title} dipilih. Lengkapi nama untuk mengirim simulasi pemesanan.`);
});

document.querySelector('.search-button').addEventListener('click', (event) => {
  event.preventDefault();
  const destination = document.querySelector('#destination-select').value;
  const matchingKey = { Bali: 'bali', Bromo: 'bromo', 'Raja Ampat': 'raja', 'Labuan Bajo': 'bajo' }[destination];
  document.querySelector('#packages').scrollIntoView({ behavior: 'smooth' });
  if (matchingKey) {
    window.setTimeout(() => {
      const button = document.querySelector(`.detail-button[data-package="${matchingKey}"]`);
      button.closest('.package-card').classList.add('package-highlight');
      window.setTimeout(() => button.closest('.package-card').classList.remove('package-highlight'), 1600);
    }, 450);
  }
});

const destinationCards = [...document.querySelectorAll('.destination-card')];
const destinationGrid = document.querySelector('#destination-grid');
const destinationIndicators = [...document.querySelectorAll('[data-destination-slide]')];

destinationIndicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = Number(indicator.dataset.destinationSlide);
    const reorderedCards = [...destinationCards.slice(slideIndex), ...destinationCards.slice(0, slideIndex)];

    destinationGrid.classList.add('is-changing-slide');
    window.setTimeout(() => {
      destinationGrid.replaceChildren(...reorderedCards);
      destinationGrid.classList.remove('is-changing-slide');
    }, 140);

    destinationIndicators.forEach((button, index) => {
      const isActive = index === slideIndex;
      button.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  });
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const guestName = document.querySelector('#booking-name').value.trim();
  const packageName = document.querySelector('#booking-package').value;
  document.querySelector('#booking-feedback').textContent = `Terima kasih, ${guestName}. Permintaan untuk ${packageName} berhasil disimulasikan.`;
  showToast('Permintaan pemesanan berhasil disimulasikan. Tim kami akan menghubungi kamu.');
  form.reset();
});

const contactForm = document.querySelector('#contact-form');
const contactFields = [
  { input: document.querySelector('#contact-name'), message: 'Nama lengkap wajib diisi.' },
  { input: document.querySelector('#contact-email'), message: 'Masukkan alamat email yang valid.' },
  { input: document.querySelector('#contact-subject'), message: 'Subjek wajib diisi.' },
  { input: document.querySelector('#contact-message'), message: 'Pesan wajib diisi.' }
];

contactFields.forEach(({ input }) => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid-field');
    input.nextElementSibling.textContent = '';
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  contactFields.forEach(({ input, message }) => {
    const error = input.nextElementSibling;
    let fieldMessage = '';
    if (!input.value.trim()) fieldMessage = message;
    else if (input.type === 'email' && !input.validity.valid) fieldMessage = 'Format email belum benar.';
    error.textContent = fieldMessage;
    input.classList.toggle('invalid-field', Boolean(fieldMessage));
    if (fieldMessage) valid = false;
  });

  if (!valid) {
    document.querySelector('.invalid-field').focus();
    document.querySelector('#contact-feedback').textContent = '';
    return;
  }

  const senderName = document.querySelector('#contact-name').value.trim();
  document.querySelector('#contact-feedback').textContent = `Terima kasih, ${senderName}. Pesanmu berhasil dikirim (simulasi).`;
  showToast('Pesan berhasil dikirim. Terima kasih sudah menghubungi JelajahNusa.');
  contactForm.reset();
});

const galleryTrack = document.querySelector('#galleryTrack');
const galleryNext = document.querySelector('.gallery-next');
const galleryPrev = document.querySelector('.gallery-prev');

if (galleryTrack) {
  const getStep = () => {
    const firstSlide = galleryTrack.querySelector('.gallery-slide');
    if (!firstSlide) return galleryTrack.clientWidth;
    const styles = window.getComputedStyle(galleryTrack);
    return firstSlide.getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const slideNext = () => {
    const atEnd = galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 2;
    galleryTrack.scrollTo({ left: atEnd ? 0 : galleryTrack.scrollLeft + getStep(), behavior: 'smooth' });
  };

  const slidePrevious = () => {
    const atStart = galleryTrack.scrollLeft <= 2;
    galleryTrack.scrollTo({ left: atStart ? galleryTrack.scrollWidth : galleryTrack.scrollLeft - getStep(), behavior: 'smooth' });
  };

  galleryNext?.addEventListener('click', slideNext);
  galleryPrev?.addEventListener('click', slidePrevious);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(slideNext, 4500);
  }
}
