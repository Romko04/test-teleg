
function removeError(field) {
  field.classList.remove('error-field');
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = ''
  const parent = field.parentNode;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
}

function createError(field, message) {
  const errorSpan = field.nextElementSibling;
  errorSpan.classList.add('error-message');
  errorSpan.textContent = message;

  // Додайте клас помилки до інпута для стилізації бордера
  field.classList.add('error-field');

}

function validation(form) {
  let result = true;
  const allFields = form.querySelectorAll('.move__input');



  // Clear existing errors
  allFields.forEach(field => removeError(field));

  allFields.forEach(field => {
    if (field.classList.contains('input__email') && !isValidEmail(field.value)) {
      result = false;
      createError(field, "Емейл обов'язковий для заповнення")
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

async function submitFormToEmail(formData) {
  const button = document.querySelector('.submit__btn')
  button.classList.add('active')
  try {
    const response = await fetch('../mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      button.classList.remove('active')
      button.classList.add('finished')
      const span = button.nextElementSibling
      span.textContent = 'Невдовзі звяжемся з Вами!!!'
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    button.classList.remove('active')
    const span = button.nextElementSibling
      span.textContent = 'Щось пішло не так'
  }
}


document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (validation(this)) {
    const formData = {};
    const allFields = this.querySelectorAll('.move__input');
    allFields.forEach(field => {
      formData[field.name] = field.value;
      field.value = ''
      removeError(field)
    });

    submitFormToEmail(formData)

  }
});
