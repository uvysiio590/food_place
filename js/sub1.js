$(document).ready(function() {
  // 초기화
  initScrollReveal();
  initBrandNav();
  initHeader();
  initModals();
  initDropdowns();
  initSectionControl();
});

// 섹션 제어 - 한 번에 1개만 표시
function initSectionControl() {
  let currentSection = 0;
  const $sections = $('.content-section');
  const totalSections = $sections.length;
  let isTransitioning = false;

  console.log('총 섹션 수:', totalSections); // 디버깅용

  // 모든 섹션 숨기고 첫 번째만 표시
  $sections.each(function(index) {
    if (index === 0) {
      $(this).show().addClass('active');
      console.log('섹션 1 표시'); // 디버깅용
    } else {
      $(this).hide();
    }
  });

  // 휠 이벤트로 섹션 전환
  let lastScrollTime = 0;
  const scrollDelay = 1000; // 1초 딜레이

  $(window).on('wheel', function(e) {
    const currentTime = new Date().getTime();
    
    // 너무 빠른 스크롤 방지
    if (currentTime - lastScrollTime < scrollDelay) {
      e.preventDefault();
      return;
    }

    // 전환 중이면 무시
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const delta = e.originalEvent.deltaY;

    // 아래로 스크롤 (다음 섹션)
    if (delta > 0 && currentSection < totalSections - 1) {
      e.preventDefault();
      isTransitioning = true;
      lastScrollTime = currentTime;

      console.log('다음 섹션으로:', currentSection + 1); // 디버깅용

      // 현재 섹션 숨기기
      $sections.eq(currentSection).fadeOut(500, function() {
        $(this).removeClass('active');
        
        // 다음 섹션 표시
        currentSection++;
        $sections.eq(currentSection).fadeIn(500, function() {
          $(this).addClass('active');
          isTransitioning = false;
        });
      });
    }
    // 위로 스크롤 (이전 섹션)
    else if (delta < 0 && currentSection > 0) {
      e.preventDefault();
      isTransitioning = true;
      lastScrollTime = currentTime;

      console.log('이전 섹션으로:', currentSection - 1); // 디버깅용

      // 현재 섹션 숨기기
      $sections.eq(currentSection).fadeOut(500, function() {
        $(this).removeClass('active');
        
        // 이전 섹션 표시
        currentSection--;
        $sections.eq(currentSection).fadeIn(500, function() {
          $(this).addClass('active');
          isTransitioning = false;
        });
      });
    }
  });

  // 키보드 네비게이션
  $(document).on('keydown', function(e) {
    if (isTransitioning) return;

    // 아래 화살표
    if (e.keyCode === 40 && currentSection < totalSections - 1) {
      e.preventDefault();
      isTransitioning = true;

      $sections.eq(currentSection).fadeOut(500, function() {
        $(this).removeClass('active');
        currentSection++;
        $sections.eq(currentSection).fadeIn(500, function() {
          $(this).addClass('active');
          isTransitioning = false;
        });
      });
    }
    // 위 화살표
    else if (e.keyCode === 38 && currentSection > 0) {
      e.preventDefault();
      isTransitioning = true;

      $sections.eq(currentSection).fadeOut(500, function() {
        $(this).removeClass('active');
        currentSection--;
        $sections.eq(currentSection).fadeIn(500, function() {
          $(this).addClass('active');
          isTransitioning = false;
        });
      });
    }
  });
}

// 스크롤 리빌 애니메이션 (스토리 인트로용)
function initScrollReveal() {
  function revealOnScroll() {
    const windowHeight = $(window).height();
    const revealPoint = 200;
    
    $('.scroll-reveal').each(function() {
      const elementTop = $(this).offset().top;
      const scrollTop = $(window).scrollTop();
      const elementVisible = scrollTop + windowHeight - revealPoint;
      
      if (elementTop < elementVisible) {
        $(this).addClass('visible');
      }
    });
  }
  
  revealOnScroll();
  
  let scrollTimeout;
  $(window).on('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(revealOnScroll, 10);
  });
}

// 브랜드 네비게이션 초기화
function initBrandNav() {
  const $brandNav = $('.brand-nav');
  const heroHeight = $('.hero-section').outerHeight();
  
  $(window).on('scroll', function() {
    const scrollPosition = $(window).scrollTop();
    
    if (scrollPosition > heroHeight - 100) {
      $brandNav.css('opacity', '1');
    }
  });
}

// 헤더 스크롤 효과
function initHeader() {
  $(window).on('scroll', function() {
    const currentScroll = $(window).scrollTop();
    const $header = $('#siteHeader');
    
    if (currentScroll > 100) {
      $header.css('padding', '15px 80px');
    } else {
      $header.css('padding', '20px 80px');
    }
  });
}

// 모달 초기화
function initModals() {
  $(document).on('click', '.popup-modal', function(e) {
    if ($(e.target).hasClass('popup-modal')) {
      $(this).removeClass('active');
    }
  });
}

// 드롭다운 초기화
function initDropdowns() {
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.main-nav').length) {
      $('.dropdown-menu').hide();
    }
  });
}

// 드롭다운 토글
function toggleDropdown(element) {
  const $element = $(element);
  const $dropdown = $element.next('.dropdown-menu');
  
  $('.dropdown-menu').not($dropdown).hide();
  $dropdown.toggle();
}

// 페이지 이동
function goToPage(page) {
  console.log('페이지 이동:', page);
}

// 모달 표시
function showModal(type) {
  $('#' + type + 'Popup').addClass('active');
}

// 모달 숨기기
function hideModal(type) {
  $('#' + type + 'Popup').removeClass('active');
}

// 로그인 처리
function processLogin() {
  console.log('로그인 처리');
  hideModal('login');
}

// 회원가입 처리
function processSignup() {
  console.log('회원가입 처리');
  hideModal('signup');
}