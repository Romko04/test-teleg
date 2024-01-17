document.addEventListener('click', (e) => {
  if (e.target.closest('.accordion')) {
    let accordion = e.target;
    accordion.classList.toggle('active');

    let panel = accordion.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
})



function removeError(input) {
  input.classList.remove('error-input');
  const errorSpan = input.nextElementSibling;
  errorSpan.textContent = ''
  const parent = input.parentNode;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
}

function createError(input, message) {
  const errorSpan = input.nextElementSibling;
  errorSpan.classList.add('error-message');
  errorSpan.textContent = message;

  // Додайте клас помилки до інпута для стилізації бордера
  input.classList.add('error-input');

}

function validation(form) {
  let result = true;
  const allInputs = form.querySelectorAll('input');



  // Clear existing errors
  allInputs.forEach(input => removeError(input));

  allInputs.forEach(input => {
    if (input.value.trim() === '') {
      result = false;
      createError(input,'Це поле не може бути пустим');
    }

    if (input.classList.contains('input__number') && input.value.length < 17) {
      result = false;
      createError(input, "Номер телефону обов'язковий для заповнення та в відповідному форматі")
    }
    if (input.classList.contains('input__email') && !isValidEmail(input.value)) {
      result = false;
      createError(input,"Емейл обов'язковий для заповнення")
    }

    function isValidEmail(email) {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
    // Additional validation checks can be added here if needed

    return result;
  });

  return result;
}

function submitFormToTelegram(formData) {
  const chatId = '-4154767683'; // Replace with your actual chat ID
  const token = '6901569951:AAGyWYmOeyb5pvFWD6oyLoGTpKgGBmJchJk'; // Replace with your actual bot token

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const message = `New form submission:\n${JSON.stringify(formData, null, 2)}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Telegram API response:', data);
      const button = document.querySelector('.submit__btn')
      const span = button.nextElementSibling
      span.textContent = 'Невдовзі звяжемся з Вами!!!'
    })
    .catch(error => {
      const span = button.nextElementSibling
      span.textContent = 'Щось пішло не так'
    });
}

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (validation(this)) {
    const formData = {};
    const allInputs = this.querySelectorAll('input');
    allInputs.forEach(input => {
      formData[input.name] = input.value;
      input.value = ''
      removeError(input)
    });

    // Виводимо дані алертом
    // alert(JSON.stringify(formData));
    submitFormToTelegram(formData)
    // submitForm()
    // Clear errors after successful submission if needed
  }
});


IMask(
  document.getElementById('tel-mask'),
  {
    mask: '+38 (000) 000-00-00'
  }
)