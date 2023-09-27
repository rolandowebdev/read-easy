const addBook = document.getElementById('add-book')
const editBook = document.getElementById('edit-book')
const checkButtons = document.querySelectorAll('#check-book')
const uncheckButtons = document.querySelectorAll('#uncheck-book')
const searchInput = document.getElementById('search-input')
const closeModalForm = document.getElementById('close-modal-form')
const backgroundBlur = document.querySelector('.background-blur')
const searchInputWrapper = document.getElementById('search-input-wrapper')

function handleMouseOver(button) {
	const icon = button.querySelector('i')
	icon.classList.toggle('fa-circle')
	icon.classList.toggle('fa-circle-check')
}

for (const checkButton of checkButtons) {
	checkButton.addEventListener('mouseover', () => {
		handleMouseOver(checkButton)
	})

	checkButton.addEventListener('mouseout', () => {
		handleMouseOver(checkButton)
	})
}

for (const uncheckButton of uncheckButtons) {
	uncheckButton.addEventListener('mouseover', () => {
		handleMouseOver(uncheckButton)
	})

	uncheckButton.addEventListener('mouseout', () => {
		handleMouseOver(uncheckButton)
	})
}

searchInput.addEventListener('focus', () => {
	searchInputWrapper.style.outline = '2px solid var(--soft-dark-color)'
})

searchInput.addEventListener('blur', () => {
	searchInputWrapper.style.outline = 'none'
})

const showModalAddBook = () => {
	document.querySelector('.modal-title').textContent = 'Add Book'
	document.querySelector('.submit-book').textContent = 'Add Book'

	document.querySelector('.modal-form').classList.add('show')
	backgroundBlur.classList.add('show')
}

const showModalUpdateBook = () => {
	document.querySelector('.modal-title').textContent = 'Edit Book'
	document.querySelector('.submit-book').textContent = 'Edit Book'

	document.querySelector('.modal-form').classList.add('show')
	backgroundBlur.classList.add('show')
}

const hideModalForm = () => {
	document.querySelector('.modal-form').classList.remove('show')
	backgroundBlur.classList.remove('show')
}

addBook.addEventListener('click', () => {
	showModalAddBook()
})

editBook.addEventListener('click', () => {
	showModalUpdateBook()
})

closeModalForm.addEventListener('click', () => {
	hideModalForm()
})

backgroundBlur.addEventListener('click', () => {
	hideModalForm()
})
