// 정말 삭제하시겠습니까? 버튼
/* eslint-disable */
function DeleteBtn() {
  if (!confirm('삭제하시면 복구할수 없습니다. \n정말로 삭제하시겠습니까?')) {
    return false;
  }
}

// 수정 버튼
// eslint-disable-next-line no-unused-vars
function UpdateBtn() {
  location.href = '/admin_update';
}

// 추가 버튼
function AddBtn() {
  location.href = '/admin_add';
}