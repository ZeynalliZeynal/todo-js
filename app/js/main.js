'use strict'
const nameInput = document.querySelector(
  '.input-form__inputs__input-name input'
)
const descInput = document.querySelector(
  '.input-form__inputs__input-desc input'
)
const addButton = document.querySelector('.btn--add')
const cancelButton = document.querySelector('.btn--cancel')
const form = document.querySelector('form')
const addedTask = document.querySelector('.tasks-added')
const taskCounter = document.querySelector(
  '.heading__task-counter .heading__task-counter__number'
)
const plusBtn = document.querySelector('.add-task-plus')
const taskForm = document.querySelector('.task')

// Add task button
nameInput.addEventListener('keyup', () => {
  // if (nameInput.value.trim()) addButton.classList.remove('btn--deactive')
  // else addButton.classList.add('btn--deactive')

  const trimmedValue = nameInput.value.trim()
  addButton.classList.toggle('btn--deactive', !trimmedValue)
})

// * events
// add task
plusBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.closest('.add-task-plus')) {
    plusBtn.classList.add('d-none')
    taskForm.classList.remove('d-none')
  }
})

cancelButton.addEventListener('click', (e) => {
  e.preventDefault()
  taskForm.classList.add('d-none')
  plusBtn.classList.remove('d-none')
})

// Form
let taskArr = []
form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (addButton.classList.contains('btn--deactive') || !nameInput.value.trim())
    return

  const taskID = generateId()
  taskArr.push({
    taskId: taskID,
    taskName: nameInput.value,
    taskDesc: descInput.value,
  })

  renderTasks(taskArr)
  init()

  taskCounter.parentElement.classList.remove('d-none')
  taskCounter.innerHTML = taskArr.length
})

// * functions
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

  taskCounter.innerHTML = taskArr.length
  if (taskArr.length === 0) taskCounter.parentElement.classList.add('d-none')
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
