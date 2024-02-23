// Валидация номера телефона
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
  const phoneNumber = phoneInput.value;
  const isValid = /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/.test(phoneNumber);
  phoneInput.setCustomValidity(isValid ? '' : 'Введите номер телефона в формате +7(777)777-77-77');
});