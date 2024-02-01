'use strict'
const nameInput = document.querySelector(
  '.input-form__inputs__input-name input'
)
const descInput = document.querySelector(
  '.input-form__inputs__input-desc input'
)
const addButton = document.querySelector('.btn--add')
const form = document.querySelector('form')
const addedTask = document.querySelector('.tasks-added')

// Add task button
nameInput.addEventListener('keyup', () => {
  if (nameInput.value.trim()) addButton.classList.remove('btn--deactive')
  else addButton.classList.add('btn--deactive')
})

// Form
let taskArr = []

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (addButton.classList.contains('btn--deactive')) return

  const taskID = generateId()
  taskArr.push({
    taskId: taskID,
    taskName: nameInput.value,
    taskDesc: descInput.value,
  })
  renderTasks(taskArr)

  console.log(taskArr)
  init()
})

// Initializing
function init() {
  nameInput.value = ''
  descInput.value = ''
  descInput.focus()
  nameInput.focus()
}

// item delete
function deleteItem(id) {
  taskArr = taskArr.filter((item) => item.taskId !== id)
  renderTasks(taskArr)
  console.log(taskArr)
}

// rendering dom
function renderTasks(param) {
  addedTask.innerHTML = ''
  param.forEach((item) => {
    addedTask.innerHTML += `
    <li class="tasks-added__item">
      <button class="tasks-added__item__frame">
        <span class="tasks-added__item__frame__icon"
          ><i class="bi bi-check-lg"></i>
        </span>
      </button>
      <div class="tasks-added__item__box">
        <div class="tasks-added__item__box__name">${item.taskName}</div>
        <div class="tasks-added__item__box__desc">${item.taskDesc}</div>
      </div>
      <div class="tasks-added__item__funcs">
        <button class="tasks-added__item__funcs__func btn-label">
          <i class="bi bi-pen"></i>
        </button>
        <button class="tasks-added__item__funcs__func btn-label">
          <i class="bi bi-calendar"></i>
        </button>
        <button class="tasks-added__item__funcs__func btn-label" onclick="deleteItem('${item.taskId}')">
          <i class="bi bi-trash"></i>
        </button>
        <button class="tasks-added__item__funcs__func btn-label">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </li>
    `
  })
}

// id generator
function generateId() {
  return Math.random().toString(36).substr(2, 9)
}
