'use strict';
//--- 8

/////////////////////////////////////////////////
//--- 8. Hiển thị phone List
const numberInput = document.getElementById('input-number');
const phoneList = document.getElementById('phone-list');
const btnCalc = document.getElementById('btn-calc');

// Lấy mảng phoneArr từ LocalStorage
const KEY69 = 'PHONE_CALC';
const phoneArr = JSON.parse(getFromStorage(KEY69)) || [];

const displayPhone = () => {
  phoneList.innerHTML = '';
  phoneArr.forEach(arr => {
    const isChecked = arr.isDone === true ? 'class="checked"' : '';
    const html = `
    <li onclick="isDoneLi('${arr.number}')" ${isChecked}>
      ${arr.number}  ▶  ${arr.resultCalc}
      <span class="close" onclick="closenumber('${arr.number}')">×</span>
    </li>
  `;
    phoneList.insertAdjacentHTML('beforeend', html);
  });
};
displayPhone();

// Hàm kiểm tra input có dữ liệu không
const isRequired = function (value) {
  return value.trim() ? true : false;
};

// Hàm tính toán thần số học
const calcNumber = function (value) {
  let str = value;

  // Xử lý số lần 1
  let arrStr = str.split('');
  const arrNum = arrStr.map(num => Number(num));
  console.log(arrStr, arrNum);

  // remove the first 3 numbers
  const removeThreeNumSt = arrNum.slice(3, arrNum.length);
  console.log(removeThreeNumSt);

  // Kết quả tổng lần 1
  const arrNumCalc1 = removeThreeNumSt.reduce((arr, mov) => arr + mov, 0);
  console.log(arrNumCalc1);

  // Xử lý số lần 2
  let arrStr2 = String(arrNumCalc1).split('');
  const arrNum2 = arrStr2.map(num => Number(num));
  console.log(arrStr2, arrNum2);

  // Kết quả tổng lần 2
  const arrNumCalc2 = arrNum2.reduce((arr, mov) => arr + mov, 0);
  console.log(arrNumCalc2);

  return arrNumCalc2;
};

// handle add
const handlePhone = function () {
  const data = {
    number: numberInput.value,
    isDone: false,
  };

  const resultCalc = calcNumber(data.number);

  data.resultCalc = resultCalc;
  console.log(data);

  // Validate dữ liệu hợp lệ
  const validateData = data => {
    if (!isRequired(data.number)) {
      alert('Please input title!');
    } else {
      return true;
    }
  };
  // console.log(validateData(data);
  const validate = validateData(data);
  if (validate) {
    // Thêm 1 User vào 'phoneArr'
    phoneArr.push(data);
    // cập nhật lại giá trị trong LocalStorage
    saveToStorage(KEY69, JSON.stringify(phoneArr));
    // Xóa các dữ liệu vừa nhập trên Form
    numberInput.value = '';
    // Hiển thị number
    displayPhone();
    // console.log(phoneArr);
  }
};

// Bắt sự kiện Click vào nút "add"
btnCalc.addEventListener('click', function (e) {
  e.preventDefault();
  handlePhone();
});

// Bắt sự kiện ấn nút enter trên bàn phím
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    console.log('Enter was pressed');
    e.preventDefault();
    handlePhone();
  }
});

// Xóa một phone
const closenumber = numberValue => {
  // Confirm before closenumber
  for (let i = 0; i < phoneArr.length; i++) {
    if (phoneArr[i].number === numberValue) {
      console.log(phoneArr[i].number);
      let index = phoneArr.findIndex(item => {
        return item === phoneArr[i];
      });
      console.log(index);
      phoneArr.splice(index, 1);
      // console.log(phoneArr);

      console.log(`You deleted number [${i}]: ${numberValue}!`);
      // cập nhật lại giá trị trong LocalStorage
      saveToStorage(KEY69, JSON.stringify(phoneArr));
    }
  }
  displayPhone();
};

// Add a "checked" symbol when clicking on a list item
const isDoneLi = linumber => {
  // Confirm before isLi
  for (let i = 0; i < phoneArr.length; i++) {
    if (phoneArr[i].number === linumber) {
      // console.log(i);
      // const beforeClick = phoneArr[i].isDone;

      if (phoneArr[i].isDone === true) {
        phoneArr[i].isDone = false;
        // console.log(`${i}: ${beforeClick} -> ${phoneArr[i].isDone}`);
        displayPhone();
      } else if (phoneArr[i].isDone === false) {
        phoneArr[i].isDone = true;
        // console.log(`${i}: ${beforeClick} -> ${phoneArr[i].isDone}`);
        displayPhone();
      }
      // cập nhật lại giá trị trong LocalStorage
      saveToStorage(KEY69, JSON.stringify(phoneArr));
    }
  }
};
