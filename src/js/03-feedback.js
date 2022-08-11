// ===
import throttle from 'lodash.throttle';
import storage from './storage';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
loadPage();

formEl.addEventListener('input', throttle(onAddDataInput, 500));

function onAddDataInput(e) {
  const { name, value } = e.target;
  let savedData = storage.load(STORAGE_KEY);
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storage.save(STORAGE_KEY, savedData);
}

function loadPage() {
  const savedData = storage.load(STORAGE_KEY);

  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }
  const formData = {
    email: email.value,
    message: message.value,
  };

  console.log(formData);
  storage.remove(STORAGE_KEY);
  e.currentTarget.reset();
}

// import throttle from 'lodash.throttle';

// const form = document.querySelector('.feedback-form');
// form.addEventListener('input', throttle(onFormData, 500));
// form.addEventListener('submit', onSubmitForm);

// let formData = {};

// function onFormData(e) {
//   formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
//   formData[e.target.name] = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(formData));
// }

// function onSubmitForm(e) {
//   console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem('feedback-form-state');
// }

// (function dataFromLocalStorage() {
//   const data = JSON.parse(localStorage.getItem('feedback-form-state'));
//   const email = document.querySelector('.feedback-form input');
//   const message = document.querySelector('.feedback-form textarea');
//   if (data) {
//     email.value = data.email;
//     message.value = data.message;
//   }
// })();
