// 정말 삭제하시겠습니까? 버튼
// eslint-disable-next-line no-unused-vars, consistent-return
function DeleteBtn() {
  // eslint-disable-next-line no-restricted-globals
  if (!confirm('삭제하시면 복구할수 없습니다. \n정말로 삭제하시겠습니까?')) {
    return false;
  }
}

// eslint-disable-next-line no-unused-vars
function UpdateBtn() {
  alert('수정되었습니다.');
}
