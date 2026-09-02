/**
 * ==============================================================================
 * KOLAM RENANG RAFISHA 98/99 — PALANGKA RAYA
 * Script Interaktivitas Landing Page (Vanilla JS)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * 1. NAVBAR SCROLL EFFECT
   * Menambahkan background blur/solid saat halaman di-scroll ke bawah
   * -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Tambah class 'scrolled' pada navbar jika scroll > 40px
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Tampilkan tombol back-to-top jika scroll > 400px
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger saat pertama kali load


  /* --------------------------------------------------------------------------
   * 2. MOBILE MENU / DRAWER TOGGLE
   * Membuka & menutup navigasi menu mobile dengan hamburger button
   * -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.contains('show');
      if (isOpen) {
        mobileDrawer.classList.remove('show');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('show');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Tutup menu saat salah satu link navigasi mobile diklik
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('show');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Tutup drawer jika pengguna mengklik area luar menu
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && mobileDrawer.classList.contains('show')) {
        mobileDrawer.classList.remove('show');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* --------------------------------------------------------------------------
   * 3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   * Meng-update status 'active' pada link navbar desktop sesuai section saat ini
   * -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset + 160;

    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop;
      const sectionId = currentSection.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });


  /* --------------------------------------------------------------------------
   * 4. SMOOTH SCROLL FOR ANCHOR LINKS
   * Memastikan scrolling terasa mulus pada semua browser
   * -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Tombol Back to Top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --------------------------------------------------------------------------
   * 5. FLOATING BUBBLES GENERATOR
   * Menghasilkan gelembung air yang melayang secara acak di latar belakang
   * -------------------------------------------------------------------------- */
  const bubbleContainer = document.getElementById('bubbleContainer');

  const createBubbles = () => {
    if (!bubbleContainer) return;

    // Batasi jumlah gelembung agar ringan (16 buah di desktop, 8 di mobile)
    const isMobile = window.innerWidth < 768;
    const bubbleCount = isMobile ? 8 : 16;

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');

      // Randomisasi ukuran (12px sampai 42px)
      const size = Math.floor(Math.random() * 30) + 12;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Posisi horizontal acak (2% - 98%)
      const leftPos = Math.random() * 96 + 2;
      bubble.style.left = `${leftPos}%`;

      // Durasi animasi melayang acak (7s - 18s)
      const duration = Math.random() * 11 + 7;
      bubble.style.animationDuration = `${duration}s`;

      // Delay awal agar tidak muncul bersamaan (0s - 10s)
      const delay = Math.random() * 10;
      bubble.style.animationDelay = `${delay}s`;

      bubbleContainer.appendChild(bubble);
    }
  };

  createBubbles();


  /* --------------------------------------------------------------------------
   * 6. SCROLL REVEAL (INTERSECTION OBSERVER)
   * Animasi fade-up ringan saat elemen masuk ke viewport layar
   * -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve setelah muncul agar hemat memori & CPU
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback untuk browser lama
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* --------------------------------------------------------------------------
   * 7. GALLERY LIGHTBOX MODAL
   * Membuka foto resolusi penuh saat diklik di galeri
   * -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-image');
        const caption = item.getAttribute('data-caption') || (item.querySelector('.gallery-caption') ? item.querySelector('.gallery-caption').textContent : '');

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxCaption) {
            lightboxCaption.textContent = caption;
          }
          lightboxModal.classList.add('active');
          lightboxModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat modal aktif
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      document.body.style.overflow = ''; // Kembalikan scroll
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Tutup saat mengklik area gelap di luar gambar
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    // Tutup saat menekan tombol keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }


  /* --------------------------------------------------------------------------
   * 8. TAHUN COPYRIGHT DINAMIS
   * Menampilkan tahun terkini secara otomatis di footer
   * -------------------------------------------------------------------------- */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Pesan sambutan di console browser
  console.log(
    '%c🏊 Selamat Datang di Kolam Renang Rafisha 98/99 Palangka Raya! 🌴',
    'background: #0077B6; color: #FFFFFF; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 8px;'
  );

});

