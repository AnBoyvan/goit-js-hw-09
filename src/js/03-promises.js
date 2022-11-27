import Notiflix from 'notiflix';

const refs = {
  formRef: document.querySelector('.form'),
  firstDelayInputRef: document.querySelector('input[name="delay"]'),
  stepInputRef: document.querySelector('input[name="step"]'),
  amountInputRef: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let firstDelay = Number(refs.firstDelayInputRef.value);
  let step = Number(refs.stepInputRef.value);
  let amount = Number(refs.amountInputRef.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, i * step + firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  evt.target.reset();
}

refs.formRef.addEventListener('submit', onFormSubmit);
