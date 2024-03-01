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
            <button class="button is-light" id="updateBtn" name="${category._id}">수정</button>
            <button class="button is-danger" id="deleteBtn">삭제</button>
          </div>
        </div>
      `;
  });
});

// 카테고리 추가
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'addBtn') {
    const modal = document.querySelector('#categoryAddModal');
    modal.classList.add('is-active');

    const categoryNameInput = document.querySelector('#categoryName');
    const categoryModifyBtn = document.querySelector('#categoryAddBtn');

    // 모달에서 완료 버튼 클릭
    categoryModifyBtn.addEventListener('click', async () => {
      const categoryName = categoryNameInput.value;
      if (!categoryName) {
        return alert('카테고리 이름을 입력해 주세요.');
      }

      try {
        const res = await fetch('/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ categoryName: categoryName }),
        });
        const data = await res.json();

        if (data.status === 500) {
          alert('이미 존재하는 카테고리입니다.');
        }

        // alert('카테고리가 추가되었습니다.');
        modal.classList.remove('is-active');
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    });

    // 모달 취소 버튼 클릭 or 모달 배경 클릭
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-background') || e.target.id === 'modalCancelBtn') {
        modal.classList.remove('is-active');
      }
    });
  }
});

// 카테고리 수정
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'updateBtn') {
    const categoryId = e.target.name;
    const modal = document.querySelector('#categoryModifyModal');
    modal.classList.add('is-active');

    const newCategoryNameInput = document.querySelector('#newCategoryName');
    const categoryModifyBtn = document.querySelector('#categoryModifyBtn');

    // 기존 카테고리 이름
    const categoryName = e.target.parentElement.parentElement.querySelector('.item').textContent;
    newCategoryNameInput.value = categoryName;

    // 모달에서 완료 버튼 클릭
    categoryModifyBtn.addEventListener('click', async () => {
      const newCategoryName = newCategoryNameInput.value;
      if (!newCategoryName) {
        return alert('카테고리 이름을 입력해 주세요.');
      }

      try {
        const res = await fetch(`/category/${categoryId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ modifedName: newCategoryName }),
        });
        const data = await res.json();

        if (data.status !== 200) {
          throw new Error('카테고리 수정을 실패했습니다.');
        }

        // alert('카테고리 이름이 수정되었습니다.');
        modal.classList.remove('is-active');
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    });

    // 모달 취소 버튼 클릭 or 모달 배경 클릭
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-background') || e.target.id === 'cancelBtn') {
        modal.classList.remove('is-active');
      }
    });
  }
});
