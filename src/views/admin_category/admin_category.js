// 페이지가 로드될 때 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.addButton button');
  const fixButtons = document.querySelectorAll('.fixButton');
  const deleteButtons = document.querySelectorAll('.deleteButton');
  const completionButton = document.getElementById('completionButton');

  // 수정 버튼 클릭 이벤트 리스너 추가
  fixButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const article = this.closest('article');
      const item = article.querySelector('.item');

      // 수정할 내용을 입력할 input 요소 생성
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.textContent.trim(); // 현재 내용으로 기본값 설정

      // 기존 내용을 input 요소로 교체
      article.replaceChild(input, item);

      // 확인 버튼 생성
      const confirmButton = document.createElement('button');
      confirmButton.textContent = '확인';
      confirmButton.classList.add('button', 'is-light');
      confirmButton.addEventListener('click', function () {
        // 입력된 내용으로 item 내용 변경
        const newText = input.value.trim();
        item.textContent = newText;

        // input 요소를 item으로 다시 교체
        article.replaceChild(item, input);

        // 수정이 완료되었다는 메시지 표시
        alert('수정되었습니다.');

        // 확인 버튼 제거
        article.removeChild(confirmButton);
      });

      // 확인 버튼 추가
      article.appendChild(confirmButton);
    });
  });

  // 삭제 버튼 클릭 이벤트 리스너 추가
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      this.closest('article').remove();
      alert('삭제 되었습니다.');
    });
  });

  // 추가 버튼 클릭 이벤트 리스너 추가
  addButton.addEventListener('click', function () {
    const newArticle = document.createElement('article');
    newArticle.classList.add('list');

    const item = document.createElement('span');
    item.classList.add('item');
    item.textContent = 'New Wine';

    const subSelect = document.createElement('span');
    subSelect.classList.add('subSelect');

    const fixButton = document.createElement('button');
    fixButton.classList.add('button', 'is-light', 'fixButton');
    fixButton.textContent = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'is-light', 'deleteButton');
    deleteButton.textContent = '삭제';

    subSelect.appendChild(fixButton);
    subSelect.appendChild(deleteButton);

    newArticle.appendChild(item);
    newArticle.appendChild(subSelect);

    // 수정 버튼 클릭 이벤트 리스너 추가
    fixButton.addEventListener('click', function () {
      const article = this.closest('article');
      const item = article.querySelector('.item');

      // 수정할 내용을 입력할 input 요소 생성
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.textContent.trim(); // 현재 내용으로 기본값 설정

      // 기존 내용을 input 요소로 교체
      article.replaceChild(input, item);

      // 확인 버튼 생성
      const confirmButton = document.createElement('button');
      confirmButton.textContent = '확인';
      confirmButton.classList.add('button', 'is-light');
      confirmButton.addEventListener('click', function () {
        // 입력된 내용으로 item 내용 변경
        const newText = input.value.trim();
        item.textContent = newText;

        // input 요소를 item으로 다시 교체
        article.replaceChild(item, input);

        // 수정이 완료되었다는 메시지 표시
        alert('수정되었습니다.');

        // 확인 버튼 제거
        article.removeChild(confirmButton);
      });

      // 확인 버튼 추가
      article.appendChild(confirmButton);
    });

    // 삭제 버튼 클릭 이벤트 리스너 추가
    deleteButton.addEventListener('click', function () {
      this.closest('article').remove();
      alert('삭제 되었습니다.');
    });

    // 새로운 카테고리를 현재 카테고리 아래에 추가
    const categories = document.querySelectorAll('.list');
    const lastCategory = categories[categories.length - 1];
    lastCategory.parentNode.insertBefore(newArticle, lastCategory.nextSibling);
  });

  // 확인 버튼 클릭 이벤트 리스너 추가
  completionButton.addEventListener('click', function () {
    // 추가된 내용을 서버에 저장하는 작업 수행
    alert('추가된 내용을 저장합니다.');
  });
});
