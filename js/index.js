// 슬라이더 변수
let currentSlide = 0;
let autoSlideInterval;

// 슬라이드 이동
function moveSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  currentSlide += direction;
  
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  updateSlider();
}

// 특정 슬라이드로 이동
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetAutoSlide();
}

// 드롭다운 토글
function toggleDropdown(element) {
  const dropdown = element.nextElementSibling;
  
  if (dropdown.classList.contains('active')) {
    return true;
  } else {
    dropdown.classList.add('active');
    return false;
  }
}

// 슬라이더 업데이트
function updateSlider() {
  const container = document.getElementById('sliderContainer');
  const dots = document.querySelectorAll('.slider-dot');

  container.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// 자동 슬라이드 시작
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, 4000);
}

// 자동 슬라이드 리셋
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// 페이지 로드 시 자동 슬라이드 시작
window.addEventListener('load', () => {
  startAutoSlide();
});

// 헤더 스크롤 효과
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// 스크롤 관찰자 설정
const scrollObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, scrollObserverOptions);

// 관찰할 요소들 등록
document.querySelectorAll('.recipe-card, .event-card, .slider-title, .slider-subtitle p').forEach(element => {
  scrollObserver.observe(element);
});

// 페이지 이동
function goToPage(pageName) {
  console.log('페이지 이동:', pageName);
  // window.location.href = pageName + '.html';
}

// 드롭다운 메뉴 처리
function toggleDropdown(element) {
  const parentLi = element.parentElement;
  const dropdown = parentLi.querySelector('.dropdown-menu');

  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu !== dropdown) {
      menu.classList.remove('active');
    }
  });
  dropdown.classList.toggle('active');
}

// 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', (event) => {
  if (!event.target.closest('.main-nav')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('active');
    });
  }
});

// 모달 표시
function showModal(modalType) {
  const popupId = modalType === 'login' ? 'loginPopup' : 'signupPopup';
  document.getElementById(popupId).classList.add('active');
}

// 모달 숨기기
function hideModal(modalType) {
  const popupId = modalType === 'login' ? 'loginPopup' : 'signupPopup';
  document.getElementById(popupId).classList.remove('active');
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-modal')) {
    event.target.classList.remove('active');
  }
});

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