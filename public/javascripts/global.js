// 헤더와 푸터를 렌더링하는 함수
function renderHeaderAndFooter() {
  // 헤더 추가
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
      headerContainer.innerHTML = `
        <nav class="navbar has-shadow ${window.location.pathname === '/' ? 'is-fixed-top' : ''}">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="/images/winehouse_logo.png" alt="winehouse-logo">
            </a>

            <a class="navbar-burger" id="burger">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>

          <div class="navbar-menu" id="nav-links">
            <div class="navbar-start ml-2">
              <a class="navbar-item" href="/list">레드</a>
              <a class="navbar-item" href="/list">화이트</a>
              <a class="navbar-item" href="/list">로제</a>
              <a class="navbar-item" href="/list">스파클링</a>
            </div>
        
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="cart-icon" href="/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </a>
                  <!-- <a class="cart-icon" href="/mypage">
                    <i class="fa-solid fa-user"></i>
                  </a> -->
                  <a class="button is-light" href="/login"><strong>로그인</strong></a>
                </div>
              </div>
            </div>

          </div>
        </nav>
      `;
  }

  // 푸터 추가
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
      footerContainer.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <div class="company-name">
            <p>WineHouse</p>
          </div>
          <div class="company-info">
            <p class="info-title">회사 정보</p>
            <p>(주)WineHouse | 대표 엘리스</p>
            <p>서울특별시 강남구 선릉로 433, 신관 6층</p>
          </div>
          <div class="customer-service">
            <p class="info-title">고객 센터</p>
            <p>070-4633-2017</p>
            <p>OPEN 10:00-18:00(BREAK 12:00-13:00)</p>
          </div>
        </div>
      </footer>
      `;
  }
}

// 페이지가 로드될 때 헤더와 푸터 렌더링
document.addEventListener('DOMContentLoaded', function () {
  renderHeaderAndFooter();

  // burger-menu
  const burgerIcon = document.querySelector('#burger');
  const navbarMenu = document.querySelector('#nav-links');

  burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
  });
});