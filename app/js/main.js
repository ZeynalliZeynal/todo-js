'use strict'
const nameInput = document.querySelector(
  '.input-form__inputs__input-name input'
)
const descInput = document.querySelector(
  '.input-form__inputs__input-desc input'
)
const addButton = document.querySelector('.btn--add')

nameInput.addEventListener('keyup', () => {
  if (nameInput.value.trim()) addButton.classList.remove('btn--deactive')
  else addButton.classList.add('btn--deactive')
})
