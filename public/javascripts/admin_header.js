// 페이지가 로드될 때 헤더 렌더링
document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('admin-header-container');
  if (headerContainer) {
    headerContainer.innerHTML = `
        <nav class="navbar is-light">
          <div class="navbar-brand is-justify-content-space-between">
            <a class="navbar-item" href="/admin_order">
              <p>WINEHOUSE-ADMIN</p>
            </a>
            <div class="navbar-end">
              <div class="navbar-item">
                <a class="button" href="/admin_login"><strong>로그인</strong></a>
              </div>
            </div>
          </div>
        </nav>
      `;
  }
});
