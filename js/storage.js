'use strict';

// Lưu dữ liệu xuống LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
