// 터치/키보드 접근성: 카드 탭/클릭/Enter/Space 로 뒤집기 토글
document.querySelectorAll('.card').forEach(card => {
  // 클릭/탭 토글
  card.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      card.classList.toggle('flipped');
    }
  });

  // 키보드(Enter/Space) 토글
  card.addEventListener('keydown', (e) => {
    const isEnter = e.key === 'Enter';
    const isSpace = e.key === ' ' || e.code === 'Space';
    if (isEnter || isSpace) {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});