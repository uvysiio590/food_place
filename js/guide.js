$(document).ready(function() {
  // 초기화
  initHeader();
  initModals();
  initDropdowns();
  initGuideCards();
});

// 가이드 카드 호버 효과
function initGuideCards() {
  $('.guide-card').on('mouseenter', function() {
    $(this).addClass('hovered');
  });

  $('.guide-card').on('mouseleave', function() {
    $(this).removeClass('hovered');
  });

  // 카드 클릭 시 상세 정보 업데이트 (선택사항)
  $('.guide-card').on('click', function() {
    const type = $(this).data('type');
    console.log('선택된 재료:', type);
    // 여기에 상세 정보 업데이트 로직 추가 가능
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