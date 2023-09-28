const logo = document.querySelector('.logo')
const bookId = document.getElementById('book-id')
const addBookButton = document.getElementById('add-book')
const searchInput = document.getElementById('search-input')
const modalAddForm = document.getElementById('modal-add-form')
const modalEditForm = document.getElementById('modal-edit-form')
const yearAddInput = document.getElementById('year-add-input')
const titleAddInput = document.getElementById('title-add-input')
const authorAddInput = document.getElementById('author-add-input')
const yearEditInput = document.getElementById('year-edit-input')
const titleEditInput = document.getElementById('title-edit-input')
const authorEditInput = document.getElementById('author-edit-input')
const closeModalAddBook = document.getElementById('close-modal-add-book')
const closeModalEditBook = document.getElementById('close-modal-edit-book')
const completedBookCount = document.getElementById('completed-book-count')
const uncompletedBookCount = document.getElementById('uncompleted-book-count')
const submitAddBook = document.getElementById('form-add-book')
const submitEditBook = document.getElementById('form-edit-book')
const inputWrappers = {
	search: document.getElementById('search-input-wrapper'),
	titleAdd: document.getElementById('title-add-wrapper'),
	authorAdd: document.getElementById('author-add-wrapper'),
	authorEdit: document.getElementById('author-edit-wrapper'),
	yearAdd: document.getElementById('year-add-wrapper'),
	titleEdit: document.getElementById('title-edit-wrapper'),
	yearEdit: document.getElementById('year-edit-wrapper')
}

const books = []
const SAVED_EVENT = 'saved-books'
const RENDER_EVENT = 'render-books'
const STORAGE_KEY = 'EASY_READ_APPS'

document.addEventListener('DOMContentLoaded', () => {
	logo.addEventListener('mouseover', () => {
		document.querySelector('.logo .fa-egg').classList.add('fa-bounce')
	})

	logo.addEventListener('mouseout', () => {
		document.querySelector('.logo .fa-egg').classList.remove('fa-bounce')
	})

	searchInput.addEventListener('input', () => {
		document.dispatchEvent(new Event(RENDER_EVENT))
	})

	searchInput.addEventListener('focus', () => {
		document
			.querySelector('#search-input-wrapper .fa-search')
			.classList.add('fa-flip')
	})

	searchInput.addEventListener('blur', () => {
		document
			.querySelector('#search-input-wrapper .fa-search')
			.classList.remove('fa-flip')
	})

	if (isStorageExist()) {
		loadDataFromStorage()
	}

	submitAddBook.addEventListener('submit', (e) => {
		e.preventDefault()
		addBook()
		hideModalAddBook()
	})

	submitEditBook.addEventListener('submit', (e) => {
		e.preventDefault()
		editBook()
		hideModalEditBook()
	})
})

document.addEventListener(RENDER_EVENT, () => {
	const uncompletedReadContainer = document.getElementById(
		'uncompleted-read-container'
	)
	uncompletedReadContainer.innerHTML = ''

	const completedReadContainer = document.getElementById(
		'completed-read-container'
	)
	completedReadContainer.innerHTML = ''

	const searchValue = searchInput.value.toLowerCase()
	const filteredBooks = filterBooks(searchValue)

	const bookNotFoundElement = document.querySelector('.book-not-found')
	const bookSearchNameElement = document.getElementById('book-search-name')

	if (filteredBooks.length === 0) {
		bookNotFoundElement.classList.add('show')
		bookSearchNameElement.textContent = searchValue
	} else {
		bookNotFoundElement.classList.remove('show')
		bookSearchNameElement.textContent = ''
	}

	for (const bookItem of filteredBooks) {
		const bookListItem = createBookListItem(bookItem)

		if (!bookItem.isComplete) {
			uncompletedReadContainer.append(bookListItem)
		} else {
			completedReadContainer.append(bookListItem)
		}
	}

	updateCompletedBookCount()
	updateUncompletedBookCount()
})

addBookButton.addEventListener('click', showModalAddBook)
closeModalAddBook.addEventListener('click', hideModalAddBook)
closeModalEditBook.addEventListener('click', hideModalEditBook)

handleInputFocusBlur(searchInput, inputWrappers.search)
handleInputFocusBlur(titleAddInput, inputWrappers.titleAdd)
handleInputFocusBlur(authorAddInput, inputWrappers.authorAdd)
handleInputFocusBlur(yearAddInput, inputWrappers.yearAdd)
handleInputFocusBlur(titleEditInput, inputWrappers.titleEdit)
handleInputFocusBlur(authorEditInput, inputWrappers.authorEdit)
handleInputFocusBlur(yearEditInput, inputWrappers.yearEdit)
