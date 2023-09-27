const addBookButton = document.getElementById('add-book')
const closeModalFormButton = document.getElementById('close-modal-form')
const searchInput = document.getElementById('search-input')
const yearInput = document.getElementById('year')
const titleInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const backgroundBlur = document.querySelector('.background-blur')
const modalForm = document.querySelector('.modal-form')
const completedBookCount = document.getElementById('completed-book-count')
const uncompletedBookCount = document.getElementById('uncompleted-book-count')
const inputWrappers = {
	search: document.getElementById('search-input-wrapper'),
	title: document.getElementById('title-input-wrapper'),
	author: document.getElementById('author-input-wrapper'),
	year: document.getElementById('year-input-wrapper')
}

const books = []
const RENDER_EVENT = 'render-books'

function handleMouseOver(button) {
	const icon = button.querySelector('i')
	icon.classList.toggle('fa-circle')
	icon.classList.toggle('fa-circle-check')
}

function showModalForm() {
	modalForm.classList.add('show')
	backgroundBlur.classList.add('show')
}

function hideModalForm() {
	modalForm.classList.remove('show')
	backgroundBlur.classList.remove('show')
}

function handleInputFocusBlur(input, wrapper) {
	input.addEventListener('focus', () => {
		wrapper.style.outline = '2px solid var(--soft-dark-color)'
	})

	input.addEventListener('blur', () => {
		wrapper.style.outline = 'none'
	})
}

function updateCompletedBookCount() {
	const completedBooks = books.filter((book) => book.isCompleted)
	completedBookCount.textContent = `${completedBooks.length} Book${
		completedBooks.length > 1 ? 's' : ''
	}`
}

function updateUncompletedBookCount() {
	const uncompletedBooks = books.filter((book) => !book.isCompleted)
	uncompletedBookCount.textContent = `${uncompletedBooks.length} Book${
		uncompletedBooks.length > 1 ? 's' : ''
	}`
}

function addBook() {
	const bookData = {
		id: +new Date(),
		title: titleInput.value,
		author: authorInput.value,
		year: +yearInput.value,
		isCompleted: false
	}

	books.push(bookData)

	updateCompletedBookCount()
	updateUncompletedBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
}

function findBookIndex(bookId) {
	for (const index in books) {
		if (books[index].id === bookId) {
			return index
		}
	}

	return -1
}

function findBook(bookId) {
	for (const bookItem of books) {
		if (bookItem.id === bookId) {
			return bookItem
		}
	}

	return null
}

function uncompletedBook(bookId) {
	const bookTarget = findBook(bookId)

	if (bookTarget == null) return

	bookTarget.isCompleted = true

	updateCompletedBookCount()
	updateUncompletedBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
}

function completedBook(bookId) {
	const bookTarget = findBook(bookId)

	if (bookTarget == null) return

	bookTarget.isCompleted = false

	updateCompletedBookCount()
	updateUncompletedBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
}

function deletedBook(bookId) {
	const bookTarget = findBookIndex(bookId)

	if (bookTarget === -1) return

	books.splice(bookTarget, 1)

	document.dispatchEvent(new Event(RENDER_EVENT))
}

function createBookListItem(bookData) {
	const editIcon = document.createElement('i')
	editIcon.classList.add('fa-regular', 'fa-pen-to-square')

	const deleteIcon = document.createElement('i')
	deleteIcon.classList.add('fa-regular', 'fa-trash-can')

	const uncompletedIcon = document.createElement('i')
	uncompletedIcon.classList.add('fa-regular', 'fa-circle')

	const completedIcon = document.createElement('i')
	completedIcon.classList.add('fa-regular', 'fa-circle-check')

	const bookTitle = document.createElement('h3')
	bookTitle.classList.add('book-title')
	bookTitle.innerText = bookData.title

	const bookAuthor = document.createElement('p')
	bookAuthor.classList.add('book-author')
	bookAuthor.innerText = bookData.author

	const bookItemHeader = document.createElement('div')
	bookItemHeader.classList.add('book-item-header')
	bookItemHeader.append(bookTitle, bookAuthor)

	const bookYear = document.createElement('p')
	bookYear.classList.add('book-year')
	bookYear.innerText = bookData.year

	const editButton = document.createElement('button')
	editButton.classList.add('edit-book')
	editButton.append(editIcon)

	const deleteButton = document.createElement('button')
	deleteButton.classList.add('delete-book')
	deleteButton.append(deleteIcon)

	deleteButton.addEventListener('click', () => {
		deletedBook(bookData.id)
	})

	const bookAction = document.createElement('div')
	bookAction.classList.add('book-action')
	bookAction.append(editButton, deleteButton)

	const bookItemFooter = document.createElement('div')
	bookItemFooter.classList.add('book-item-footer')
	bookItemFooter.append(bookYear, bookAction)

	const bookItemWrapper = document.createElement('div')
	bookItemWrapper.classList.add('book-item-wrapper')
	bookItemWrapper.append(bookItemHeader, bookItemFooter)

	const bookItemContainer = document.createElement('div')
	bookItemContainer.classList.add('book-item-container')

	if (bookData.isCompleted) {
		const completedButton = document.createElement('button')
		completedButton.classList.add('completed-read')
		completedButton.append(completedIcon)

		completedButton.addEventListener('mouseover', () => {
			handleMouseOver(completedButton)
		})

		completedButton.addEventListener('mouseout', () => {
			handleMouseOver(completedButton)
		})

		completedButton.addEventListener('click', () => {
			completedBook(bookData.id)
		})

		bookItemContainer.append(completedButton, bookItemWrapper)
	} else {
		const uncompletedButton = document.createElement('button')
		uncompletedButton.classList.add('uncompleted-read')
		uncompletedButton.append(uncompletedIcon)

		uncompletedButton.addEventListener('mouseover', () => {
			handleMouseOver(uncompletedButton)
		})

		uncompletedButton.addEventListener('mouseout', () => {
			handleMouseOver(uncompletedButton)
		})

		uncompletedButton.addEventListener('click', () => {
			uncompletedBook(bookData.id)
		})

		bookItemContainer.append(uncompletedButton, bookItemWrapper)
	}

	const bookListItem = document.createElement('li')
	bookListItem.classList.add('book-list-item')
	bookListItem.append(bookItemContainer)
	bookListItem.setAttribute('id', `book-${bookData.id}`)

	return bookListItem
}

addBookButton.addEventListener('click', showModalForm)
backgroundBlur.addEventListener('click', hideModalForm)
closeModalFormButton.addEventListener('click', hideModalForm)

handleInputFocusBlur(searchInput, inputWrappers.search)
handleInputFocusBlur(titleInput, inputWrappers.title)
handleInputFocusBlur(authorInput, inputWrappers.author)
handleInputFocusBlur(yearInput, inputWrappers.year)

document.addEventListener('DOMContentLoaded', () => {
	const submitForm = document.getElementById('form-add-book')

	submitForm.addEventListener('submit', function (event) {
		event.preventDefault()
		addBook()
		hideModalForm()

		titleInput.value = ''
		authorInput.value = ''
		yearInput.value = ''
	})
})

document.addEventListener(RENDER_EVENT, () => {
	const uncompletedRead = document.getElementById('uncompleted-read')
	uncompletedRead.innerHTML = ''

	const completedRead = document.getElementById('completed-read')
	completedRead.innerHTML = ''

	for (const bookItem of books) {
		const bookListItem = createBookListItem(bookItem)

		if (!bookItem.isCompleted) {
			uncompletedRead.append(bookListItem)
		} else {
			completedRead.append(bookListItem)
		}
	}

	updateCompletedBookCount()
	updateUncompletedBookCount()
})
