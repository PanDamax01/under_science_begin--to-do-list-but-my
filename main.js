let $todoInput //miejsce, gdzie uzytkownik wpisuje treść
let $alertInfo // info o braku zadań / konieczności dodania tekstu
let $addBtn // przycisk ADD --dodaje nowy element do listy
let $ulList //nasz lista zadań <ul></ul>
let $newTask //nowo dodane Li
let $allTasks //wszytkie li

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	$todoInput = document.querySelector('.todoInput')
	$alertInfo = document.querySelector('.alertInfo')
	$addBtn = document.querySelector('.addBtn')
	$ulList = document.querySelector('.todolist-body ul')
	$allTasks = document.getElementsByTagName('li')
}
const prepareDOMEvents = () => {
	$addBtn.addEventListener('click', addNewTask)
	$ulList.addEventListener('click', checkClick)
	$todoInput.addEventListener('keyup', enterCheck)
}

const addNewTask = () => {
	if ($todoInput.value !== '') {
		$newTask = document.createElement('li')
		$newTask.innerText = $todoInput.value
		$ulList.appendChild($newTask)

		$todoInput.value = ''
		$alertInfo.innerText = ''
		createToolsArea()
	} else {
		$alertInfo.innerText = 'Nie wpisałeś zadania :('
	}
}

const enterCheck = () => {
	if (event.keyCode === 13) {
		addNewTask()
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	$newTask.appendChild(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'
	completeBtn.classList.add('complete')

	const deleteBtn = document.createElement('button')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
	deleteBtn.classList.add('delete')

	toolsPanel.appendChild(completeBtn)
	toolsPanel.appendChild(deleteBtn)
}

const checkClick = (e) => {
	if (e.target.closest('button').classList.contains('complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.closest('button').classList.toggle('completed')
	} else if (e.target.closest('button').classList.contains('delete')) {
		deleteTask(e)
	}
}

const deleteTask = (e) => {
	const deleteTodo = e.target.closest('li')
	deleteTodo.remove()

	if ($allTasks.length === 0) {
		$alertInfo.innerText = 'Brak zadań na liście'
	}
}

document.addEventListener('DOMContentLoaded', main)
