let arrUsers = JSON.parse(localStorage.getItem('users')) || [];

let selector = document.querySelector("#phone");
let im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);

let validation = new JustValidate("form");

validation.addField("#name", [
  {
    rule: "required",
    errorMessage: "Введите имя!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#phone", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue();
      return Boolean(Number(phone) && phone.length > 0);
    },
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue();
      return Boolean(Number(phone) && phone.length === 10);
    },
    errorMessage: 'Введите телефон полностью'
  }
]).onSuccess(async function () {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');

  if (checkUserData(nameInput.value, arrUsers)) {
    alert('Ошибка: Вы уже отправили заявку');
  } else {
    let data = {
      name: nameInput.value,
      tel: phoneInput.inputmask.unmaskedvalue(),
    };

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
  
    try {
      let response = await fetch("order.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      });

      let result = await response.text();
      // Вызов ошибки для проверки error.php
      // throw new Error('Пример ошибки');
      saveUserData(nameInput.value, phoneInput.value);
      window.location.href = 'thank_you.php';

    } catch (error) {
      window.location.href = 'error.php';
    }

    nameInput.value = '';
    phoneInput.value = '';
    spinner.style.display = 'none';
  }
});

function saveUserData(name, phone) {
  arrUsers.push({ name, phone });
  localStorage.setItem('users', JSON.stringify(arrUsers));
}

function checkUserData(name, array) {
  return array.some(user => user.name === name);
}
