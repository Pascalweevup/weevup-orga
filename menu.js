// menu.js
const menuHtml = `
    <!-- Overlay for mobile drawer -->
    <div id="mobile-overlay" class="fixed inset-0 bg-slate-900/60 z-40 hidden md:hidden transition-opacity opacity-0 backdrop-blur-sm cursor-pointer"></div>

    <!-- SIDEBAR (Desktop Fixed, Mobile Drawer) -->
    <nav id="sidebar" class="fixed md:sticky top-0 left-0 h-screen w-64 md:w-56 bg-weevup flex-col flex-shrink-0 shadow-2xl z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 flex overflow-y-auto">
        <div class="p-5 border-b border-white/10 flex items-center justify-between gap-3 sticky top-0 bg-weevup z-10">
            <div class="flex items-center gap-3">
                <div class="bg-white/10 p-2 rounded-lg text-white">
                    <i data-lucide="layout-template" class="w-6 h-6 text-brand-orange"></i>
                </div>
                <div>
                    <h2 class="text-xl font-black text-white tracking-tight leading-none">WEEVUP</h2>
                    <p class="text-[10px] font-bold tracking-widest text-brand-orange uppercase mt-0.5">Orga 2026</p>
                </div>
            </div>
            <button id="close-menu-btn" class="md:hidden text-white/50 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        <div class="flex-1 px-4 py-6 flex flex-col gap-2">
            <a href="agence.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all font-semibold text-sm group" id="nav-agence">
                <i data-lucide="building-2" class="w-5 h-5 group-hover:text-brand-orange transition-colors"></i> Agence
            </a>

            <!-- Subnav internal links for Agence (only show on Agence page) -->
            <div id="subnav-agence" class="hidden pl-12 flex-col gap-3 py-2 -mt-1 mb-2 border-l-2 border-white/10 ml-6">
                <a href="#intro" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">Accueil</a>
                <a href="#organigramme" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">Organigramme</a>
                <a href="#roles" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">Rôles & Missions</a>
                <a href="#organisation" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">Organisation</a>
                <a href="#invitations" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">Invitations</a>
                <a href="#avenir" class="text-xs font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2">À venir</a>
            </div>

            <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all font-semibold text-sm group" id="nav-missions">
                <i data-lucide="layers" class="w-5 h-5 group-hover:text-brand-orange transition-colors"></i> Missions
            </a>
            
            <div class="mt-auto pt-4 flex flex-col gap-2">
                <a href="Rôle et missions - ORGA.pdf" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all font-semibold text-sm group border border-white/10 bg-white/5">
                    <i data-lucide="file-text" class="w-5 h-5 text-brand-orange group-hover:text-brand-orange transition-colors"></i> PDF Orga
                </a>
            </div>
        </div>
    </nav>

    <!-- MOBILE TOP HEADER (Sticky) -->
    <header class="md:hidden bg-weevup text-white p-3 shadow-md flex items-center justify-between z-30 sticky top-0 w-full flex-shrink-0 border-b border-weevup-light">
        <div class="flex items-center gap-3">
            <button id="open-menu-btn" class="p-2 hover:bg-white/10 rounded-lg transition-colors bg-white/5 border border-white/10">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
            <div class="flex items-center gap-2">
                <div class="bg-white/10 p-1.5 rounded text-brand-orange">
                    <i data-lucide="layout-template" class="w-4 h-4"></i>
                </div>
                <div>
                     <h2 class="text-base font-black tracking-tight leading-none">WEEVUP</h2>
                </div>
            </div>
        </div>
    </header>
`;

function initMenu() {
    // Inject HTML at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', menuHtml);

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navAgence = document.getElementById('nav-agence');
    const navMissions = document.getElementById('nav-missions');
    const subnavAgence = document.getElementById('subnav-agence');

    const activeClass = "bg-white/20 text-white font-bold shadow-inner".split(" ");
    const inactiveClass = "text-white/70 hover:bg-white/10 hover:text-white".split(" ");

    const isAgence = currentPage.includes('agence');

    if (isAgence) {
        navAgence.classList.remove(...inactiveClass);
        navAgence.classList.add(...activeClass);
        navAgence.querySelector('i').classList.add('text-brand-orange');
        if (subnavAgence) {
            subnavAgence.classList.remove('hidden');
            subnavAgence.classList.add('flex');
        }
    } else {
        navMissions.classList.remove(...inactiveClass);
        navMissions.classList.add(...activeClass);
        navMissions.querySelector('i').classList.add('text-brand-orange');
    }

    // Interactivite Mobile
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');

    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        document.body.classList.add('overflow-hidden');
    }

    function closeMenu() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
        document.body.classList.remove('overflow-hidden');
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    if (subnavAgence) {
        const subnavLinks = subnavAgence.querySelectorAll('a');
        subnavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    closeMenu();
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}
