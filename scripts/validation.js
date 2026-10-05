const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id} -error`);

  if (errorMsgEl) {
    errorMsgEl.textContent = "";
  }

  inputEl.classList.remove("config.inputErrorClass");
};

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id} -error`);

  if (errorMsgEl) {
    errorMsgEl.textContent = errorMsg;
  }

  inputEl.classList.add("config.inputErrorClass");
};

function checkInputValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (!buttonElement) {
    return;
  }

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const setEventListener = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll("config.inputSelector"));
  const buttonElement = formEl.querySelector("config.submitButtonSelector");

  toggleButtonState(inputList, buttonElement);

  const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
  };

  const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
      hideInputError(formEl, input);
    });
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListener(formEl, config);
  });
};

function setEventListeners(formEl, config) {
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
}
enableValidation(settings);
