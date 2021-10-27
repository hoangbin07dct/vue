let setting = null;
if (localStorage.getItem('setting_paging')) {
  try {
    setting = JSON.parse(localStorage.getItem('setting_paging'));
  } catch (error) {
    localStorage.removeItem('setting_paging');
  }
}

export default {
  paging: {
    numberPaging: setting ? setting.numberPaging : 1,
    pathPaging: setting ? setting.pathPaging : null
  }
};
