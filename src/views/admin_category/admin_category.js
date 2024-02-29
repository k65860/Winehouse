// 카테고리 조회
document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/category');
    const data = await res.json();

    if (data.status !== 200) {
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }

    const categories = data.data;

    const categoryElement = document.querySelector('.content');

    categories.forEach((category) => {
      categoryElement.innerHTML += `
        <div class="list">
          <div class="item">${category.category_name}</div>
          <div class="subSelect">
            <button class="button is-light" id="updateButton">수정</button>
            <button class="button is-danger" id="deleteButton">삭제</button>
          </div>
        </ㅇ>
      `;
    })
});
