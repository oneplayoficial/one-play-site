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
  const navMenuWrapper = document.getElementById('navMenuWrapper');

  if (mobileToggle && navMenuWrapper) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenuWrapper.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fechar menu mobile ao clicar em um link
    navMenuWrapper.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenuWrapper.classList.remove('mobile-open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navbar?.contains(e.target) && !navMenuWrapper.contains(e.target)) {
        navMenuWrapper.classList.remove('mobile-open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     2b. ACTIVE LINK TRACKING (Scroll Spy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

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
      action: 'Ativou o Plano Ideal de R$ 35,00',
      time: 'há 2 minutos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Camila Rodrigues',
      city: 'São Paulo, SP',
      action: 'Solicitou o Teste Grátis no WhatsApp',
      time: 'há 4 minutos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Eduardo Silveira',
      city: 'Curitiba, PR',
      action: 'Liberou o acesso em 4K na Smart TV',
      time: 'há 6 minutos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Larissa Albuquerque',
      city: 'Fortaleza, CE',
      action: 'Assinou o Plano Ideal de R$ 35,00',
      time: 'há 1 minuto',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Rodrigo Fontana',
      city: 'Porto Alegre, RS',
      action: 'Ativou o acesso para os jogos de futebol',
      time: 'há 3 minutos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Juliana Paiva',
      city: 'Goiânia, GO',
      action: 'Teste aprovado e Plano Ideal ativado',
      time: 'há 5 minutos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
    },
    {
      name: 'Felipe Santos',
      city: 'Rio de Janeiro, RJ',
      action: 'Ativou o Plano Mensal com Suporte VIP',
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
    }, 5500);

    notificationIndex = (notificationIndex + 1) % notifications.length;
  };

  // Inicia a primeira notificação após 5 segundos e repete a cada 20 segundos (mais suave e espaçado)
  setTimeout(() => {
    showNextNotification();
    setInterval(showNextNotification, 20000);
  }, 5000);

  /* ==========================================================================
     6. FORMULÁRIO DE LEADS COM ENVIO DIRETO (oneplay.equipe@gmail.com)
     ========================================================================== */
  const leadsForm = document.getElementById('leadsForm');
  const leadsSuccessBox = document.getElementById('leadsSuccessBox');
  const btnSubmitLead = document.getElementById('btnSubmitLead');
  const leadWhatsappInput = document.getElementById('leadWhatsapp');
  const btnLeadWhatsappBoost = document.getElementById('btnLeadWhatsappBoost');

  // Máscara dinâmica para WhatsApp / Telefone: (XX) XXXXX-XXXX
  if (leadWhatsappInput) {
    leadWhatsappInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        e.target.value = `(${value}`;
      } else {
        e.target.value = '';
      }
    });
  }

  // Envio Assíncrono com FormSubmit AJAX (sem sair da página)
  if (leadsForm) {
    leadsForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('leadNome')?.value || '';
      const whatsapp = document.getElementById('leadWhatsapp')?.value || '';
      const email = document.getElementById('leadEmail')?.value || '';
      const aparelho = document.getElementById('leadDispositivo')?.value || 'Smart TV';

      if (!nome || !whatsapp || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      if (btnSubmitLead) {
        btnSubmitLead.disabled = true;
        btnSubmitLead.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Enviando dados...</span>
        `;
      }

      // Preparar link de boost opcional no WhatsApp
      if (btnLeadWhatsappBoost) {
        const boostMsg = `Olá equipe OnePlay! Acabei de enviar meus dados no site (Nome: ${nome}, E-mail: ${email}) e gostaria de adiantar meu atendimento para o aparelho: ${aparelho}.`;
        btnLeadWhatsappBoost.href = `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(boostMsg)}`;
      }

      try {
        const formData = new FormData(leadsForm);
        const payload = Object.fromEntries(formData.entries());

        const response = await fetch('https://formsubmit.co/ajax/oneplay.equipe@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          leadsForm.style.display = 'none';
          if (leadsSuccessBox) leadsSuccessBox.style.display = 'block';
        } else {
          // Fallback caso a API bloqueie cross-origin
          leadsForm.submit();
        }
      } catch (err) {
        console.warn('Envio AJAX falhou, usando fallback direto:', err);
        leadsForm.submit();
      }
    });
  }

  /* ==========================================================================
     7. CLIQUE SUAVE NOS LINKS DE NAVEGAÇÃO
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
