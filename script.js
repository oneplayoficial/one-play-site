/**
 * ONEPLAY — SCRIPTS & INTERATIVIDADE
 * Funções: FAQ Accordion, Seletor de Aparelhos (WhatsApp Dinâmico),
 * Prova Social em Tempo Real (Toasts), Efeitos de Navbar e Navegação.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de Contato
  const WHATSAPP_NUMBER = '5527998784485';
  const BASE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

  /* ==========================================================================
     1. NAVBAR SCROLL EFFECT
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
    });

    // Fechar menu mobile ao clicar em um link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
      });
    });
  }

  /* ==========================================================================
     3. FAQ ACCORDION INTERATIVO
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens para manter o accordion limpo
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Alterna o item atual
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     4. SIMULADOR DE APARELHO / GERADOR DE TESTE NO WHATSAPP
     ========================================================================== */
  const deviceButtons = document.querySelectorAll('.device-btn');
  const simulatorCtaBtn = document.getElementById('simulatorCtaBtn');
  const selectedDeviceName = document.getElementById('selectedDeviceName');

  let currentDevice = 'Smart TV';

  const updateSimulatorLink = (device) => {
    currentDevice = device;
    if (selectedDeviceName) {
      selectedDeviceName.textContent = device;
    }

    const message = `Olá! Vim pelo site da OnePlay e quero solicitar meu TESTE GRÁTIS imediato para o meu aparelho: ${device}.`;
    const encodedMessage = encodeURIComponent(message);

    if (simulatorCtaBtn) {
      simulatorCtaBtn.href = `${BASE_WHATSAPP_URL}?text=${encodedMessage}`;
    }
  };

  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const device = btn.getAttribute('data-device') || 'Smart TV';
      updateSimulatorLink(device);
    });
  });

  // Inicializa o simulador com o primeiro item
  updateSimulatorLink('Smart TV (Samsung / LG / TCL)');

  /* ==========================================================================
     5. NOTIFICAÇÕES DE PROVA SOCIAL EM TEMPO REAL (TOASTS)
     ========================================================================== */
  const socialProofToast = document.getElementById('socialProofToast');
  const toastUser = document.getElementById('toastUser');
  const toastAction = document.getElementById('toastAction');
  const toastTime = document.getElementById('toastTime');
  const toastAvatar = document.getElementById('toastAvatar');

  const notifications = [
    {
      name: 'Marcos Vinícius',
      city: 'Belo Horizonte, MG',
      action: 'Solicitou um Teste Grátis no WhatsApp',
      time: 'há 2 minutos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Camila Rodrigues',
      city: 'São Paulo, SP',
      action: 'Ativou o Plano Mensal de R$ 35,00',
      time: 'há 4 minutos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Eduardo Silveira',
      city: 'Curitiba, PR',
      action: 'Configurou a Smart TV com sucesso',
      time: 'há 6 minutos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Larissa Albuquerque',
      city: 'Fortaleza, CE',
      action: 'Solicitou acesso aos Doramas e Filmes',
      time: 'há 1 minuto',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Rodrigo Fontana',
      city: 'Porto Alegre, RS',
      action: 'Ativou o acesso para assistir futebol em 4K',
      time: 'há 3 minutos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Juliana Paiva',
      city: 'Goiânia, GO',
      action: 'Liberou o teste para TV Box e Celular',
      time: 'há 5 minutos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Felipe Santos',
      city: 'Rio de Janeiro, RJ',
      action: 'Ativou o Plano Mensal com Suporte Humanizado',
      time: 'há 7 minutos',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces'
    }
  ];

  let notificationIndex = 0;

  const showNextNotification = () => {
    if (!socialProofToast || !toastUser || !toastAction || !toastTime || !toastAvatar) return;

    const data = notifications[notificationIndex];
    toastUser.textContent = `${data.name} (${data.city})`;
    toastAction.textContent = data.action;
    toastTime.textContent = `⚡ ${data.time}`;
    toastAvatar.src = data.avatar;

    socialProofToast.classList.add('visible');

    setTimeout(() => {
      socialProofToast.classList.remove('visible');
    }, 4500);

    notificationIndex = (notificationIndex + 1) % notifications.length;
  };

  // Inicia as notificações após 3 segundos e repete a cada 11 segundos
  setTimeout(() => {
    showNextNotification();
    setInterval(showNextNotification, 11000);
  }, 3000);

  /* ==========================================================================
     6. CLIQUE SUAVE NOS LINKS DE NAVEGAÇÃO
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
