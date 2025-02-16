document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section, .profile-section');
    let isMusicPlaying = false;

    function toggleMusic() {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.textContent = '';
        } else {
            music.play();
            musicToggle.textContent = '';
        }
        isMusicPlaying = !isMusicPlaying;
    }

    musicToggle.addEventListener('click', toggleMusic);

    musicToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    musicToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    function hideAllSections() {
        sections.forEach(section => {
            if (!section.classList.contains('profile-section')) {
                section.style.display = 'none';
                section.classList.remove('active');
            }
        });
    }

    function showSection(sectionId) {
        hideAllSections();
        if (sectionId === 'home') {
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            return;
        }
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.style.display = 'flex';
            void targetSection.offsetWidth;
            targetSection.classList.add('active');
            
            if (sectionId === 'portfolio') {
                const items = targetSection.querySelectorAll('.portfolio-item');
                items.forEach((item, index) => {
                    item.style.setProperty('--item-index', index);
                });
            }
            
            if (sectionId === 'contact') {
                const socialIcons = targetSection.querySelectorAll('.social-icon');
                socialIcons.forEach((icon, index) => {
                    icon.style.setProperty('--icon-index', index);
                });
            }
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.section-content') || e.target.closest('.nav-item')) return;
        hideAllSections();
        navItems.forEach(item => item.classList.remove('active'));
    });

    showSection('home');
});