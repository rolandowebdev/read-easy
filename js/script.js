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
const inputWrappers = {
	search: document.getElementById('search-input-wrapper'),
	titleAdd: document.getElementById('title-add-wrapper'),
	authorAdd: document.getElementById('author-add-wrapper'),
	yearAdd: document.getElementById('year-add-wrapper'),
	titleEdit: document.getElementById('title-edit-wrapper'),
	authorEdit: document.getElementById('author-edit-wrapper'),
	yearEdit: document.getElementById('year-edit-wrapper')
}

const books = []
const RENDER_EVENT = 'render-books'
const STORAGE_KEY = 'EASY_READ_APPS'
const SAVED_EVENT = 'saved-books'

function createModalBlur() {
	const modalBlur = document.createElement('div')
	modalBlur.classList.add('modal-blur')

	return modalBlur
}

function handleMouseOver(button) {
	const icon = button.querySelector('i')
	icon.classList.toggle('fa-circle')
	icon.classList.toggle('fa-circle-check')
}

function handleInputFocusBlur(input, wrapper) {
	input.addEventListener('focus', () => {
		wrapper.style.outline = '2px solid var(--soft-dark-color)'
	})

	input.addEventListener('blur', () => {
		wrapper.style.outline = 'none'
	})
}

function showModalAddBook() {
	const modalBlurBackground = createModalBlur()

	modalAddForm.classList.add('show')

	modalBlurBackground.addEventListener('click', (event) => {
		if (event.target === modalBlurBackground) {
			hideModalAddBook()
		}
	})

	requestAnimationFrame(() => {
		modalBlurBackground.classList.add('show')
	})

	document.body.appendChild(modalBlurBackground)
}

function hideModalAddBook() {
	const modalBlurBackground = document.querySelector('.modal-blur.show')

	modalAddForm.classList.remove('show')
	modalBlurBackground.classList.remove('show')

	setTimeout(() => {
		document.body.removeChild(modalBlurBackground)
	}, 300)
}

function openEditBookForm(bookData) {
	bookId.value = bookData.id
	titleEditInput.value = bookData.title
	authorEditInput.value = bookData.author
	yearEditInput.value = bookData.year

	const modalBlurBackground = createModalBlur()
	modalEditForm.classList.add('show')

	modalBlurBackground.addEventListener('click', (event) => {
		if (event.target === modalBlurBackground) {
			hideModalEditBook()
		}
	})

	requestAnimationFrame(() => {
		modalBlurBackground.classList.add('show')
	})

	document.body.appendChild(modalBlurBackground)
}

function hideModalEditBook() {
	const modalBlurBackground = document.querySelector('.modal-blur.show')

	modalEditForm.classList.remove('show')
	modalBlurBackground.classList.remove('show')

	setTimeout(() => {
		document.body.removeChild(modalBlurBackground)
	}, 300)
}

function showModalAlert(modal) {
	const modalBlurBackground = createModalBlur()

	modalBlurBackground.addEventListener('click', () => {
		hideModalAlert(modal)
	})

	requestAnimationFrame(() => {
		modalBlurBackground.classList.add('show')
		modal.classList.add('show')
	})

	document.body.appendChild(modal)
	document.body.appendChild(modalBlurBackground)
}

function hideModalAlert(modal) {
	const modalBlurBackground = document.querySelector('.modal-blur.show')
	modalBlurBackground.classList.remove('show')

	modal.classList.remove('show')

	setTimeout(() => {
		document.body.removeChild(modal)
		document.body.removeChild(modalBlurBackground)
	}, 300)
}

function updateCompleteBookCount() {
	const completedBooks = books.filter((book) => book.isComplete)
	completedBookCount.textContent = `${completedBooks.length} Book${
		completedBooks.length > 1 ? 's' : ''
	}`
}

function updateUncompleteBookCount() {
	const uncompletedBooks = books.filter((book) => !book.isComplete)
	uncompletedBookCount.textContent = `${uncompletedBooks.length} Book${
		uncompletedBooks.length > 1 ? 's' : ''
	}`
}

function filterBooks(searchValue) {
	return books.filter((book) => {
		const title = book.title.toLowerCase()
		const author = book.author.toLowerCase()
		return title.includes(searchValue) || author.includes(searchValue)
	})
}

function addBook() {
	const bookData = {
		id: +new Date(),
		title: titleAddInput.value,
		author: authorAddInput.value,
		year: +yearAddInput.value,
		isComplete: false
	}

	books.push(bookData)

	updateCompleteBookCount()
	updateUncompleteBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function editBook() {
	const editedBookData = {
		id: +bookId.value,
		title: titleEditInput.value,
		author: authorEditInput.value,
		year: +yearEditInput.value,
		isComplete: false
	}

	const bookIndex = findBookIndex(editedBookData.id)
	if (bookIndex !== -1) {
		editedBookData.isComplete = books[bookIndex].isComplete
		books[bookIndex] = editedBookData
	}

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
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

	bookTarget.isComplete = true

	updateCompleteBookCount()
	updateUncompleteBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function completedBook(bookId) {
	const bookTarget = findBook(bookId)

	if (bookTarget == null) return

	bookTarget.isComplete = false

	updateCompleteBookCount()
	updateUncompleteBookCount()

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function deletedBook(bookId) {
	const bookTarget = findBookIndex(bookId)

	if (bookTarget === -1) return

	books.splice(bookTarget, 1)

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function modalDelete(bookData) {
	const modalAlert = document.createElement('div')

	const modalTitle = document.createElement('h2')
	modalTitle.classList.add('modal-title')
	modalTitle.textContent = 'Delete Book'

	const closeModalAlertIcon = document.createElement('i')
	closeModalAlertIcon.classList.add('fa-solid', 'fa-xmark')

	const closeModalAlert = document.createElement('button')
	closeModalAlert.classList.add('close-modal-alert')
	closeModalAlert.setAttribute('id', 'close-modal-alert')
	closeModalAlert.append(closeModalAlertIcon)

	closeModalAlert.addEventListener('click', () => {
		hideModalAlert(modalAlert)
	})

	const modalHeader = document.createElement('div')
	modalHeader.classList.add('modal-header')
	modalHeader.append(modalTitle, closeModalAlert)

	const modalDescription = document.createElement('p')
	modalDescription.classList.add('modal-description')
	modalDescription.textContent = 'Are you sure to delete this book?'

	const cancelButton = document.createElement('button')
	cancelButton.classList.add('cancel-button')
	cancelButton.textContent = 'Cancel'

	cancelButton.addEventListener('click', () => {
		hideModalAlert(modalAlert)
	})

	const deleteButton = document.createElement('button')
	deleteButton.classList.add('delete-button')
	deleteButton.textContent = 'Delete'

	deleteButton.addEventListener('click', () => {
		deletedBook(bookData.id)
		hideModalAlert(modalAlert)
	})

	const modalAction = document.createElement('div')
	modalAction.classList.add('modal-action')
	modalAction.append(cancelButton, deleteButton)

	const modalContent = document.createElement('div')
	modalContent.classList.add('modal-content')
	modalContent.append(modalDescription, modalAction)

	modalAlert.classList.add('modal-alert')
	modalAlert.append(modalHeader, modalContent)

	return modalAlert
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
	bookYear.innerText = `Year : ${bookData.year}`

	const editButton = document.createElement('button')
	editButton.classList.add('edit-book-button')
	editButton.append(editIcon)

	editButton.addEventListener('mouseover', () => {
		editIcon.classList.add('fa-flip')
	})

	editButton.addEventListener('mouseout', () => {
		editIcon.classList.remove('fa-flip')
	})

	editButton.addEventListener('click', () => {
		openEditBookForm(bookData)
	})

	const deleteButton = document.createElement('button')
	deleteButton.classList.add('delete-book-button')
	deleteButton.append(deleteIcon)

	deleteButton.addEventListener('mouseover', () => {
		deleteIcon.classList.add('fa-shake')
	})

	deleteButton.addEventListener('mouseout', () => {
		deleteIcon.classList.remove('fa-shake')
	})

	deleteButton.addEventListener('click', () => {
		const modal = modalDelete(bookData)
		showModalAlert(modal)
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

	if (bookData.isComplete) {
		const completedButton = document.createElement('button')
		completedButton.classList.add('completed-read-button')
		completedButton.append(completedIcon)

		completedButton.addEventListener('mouseover', () => {
			completedIcon.classList.add('fa-bounce')
			handleMouseOver(completedButton)
		})

		completedButton.addEventListener('mouseout', () => {
			completedIcon.classList.remove('fa-bounce')
			handleMouseOver(completedButton)
		})

		completedButton.addEventListener('click', () => {
			completedBook(bookData.id)
		})

		bookItemContainer.append(completedButton, bookItemWrapper)
	} else {
		const uncompletedButton = document.createElement('button')
		uncompletedButton.classList.add('uncompleted-read-button')
		uncompletedButton.append(uncompletedIcon)

		uncompletedButton.addEventListener('mouseover', () => {
			uncompletedIcon.classList.add('fa-bounce')
			handleMouseOver(uncompletedButton)
		})

		uncompletedButton.addEventListener('mouseout', () => {
			uncompletedIcon.classList.remove('fa-bounce')
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

document.addEventListener('DOMContentLoaded', () => {
	const logo = document.querySelector('.logo')
	const submitAddBook = document.getElementById('form-add-book')
	const submitEditBook = document.getElementById('form-edit-book')

	logo.addEventListener('mouseover', () => {
		document.querySelector('.fa-bell').classList.add('fa-shake')
	})

	logo.addEventListener('mouseout', () => {
		document.querySelector('.fa-bell').classList.remove('fa-shake')
	})

	searchInput.addEventListener('input', () => {
		document.dispatchEvent(new Event(RENDER_EVENT))
	})

	searchInput.addEventListener('focus', () => {
		document.querySelector('.fa-search').classList.add('fa-flip')
	})

	searchInput.addEventListener('blur', () => {
		document.querySelector('.fa-search').classList.remove('fa-flip')
	})

	if (isStorageExist()) {
		loadDataFromStorage()
	}

	submitAddBook.addEventListener('submit', (e) => {
		e.preventDefault()
		addBook()
		hideModalAddBook()

		titleAddInput.value = ''
		authorAddInput.value = ''
		yearAddInput.value = ''
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

	updateCompleteBookCount()
	updateUncompleteBookCount()
})

document.addEventListener(SAVED_EVENT, () => {
	console.log(localStorage.getItem(STORAGE_KEY))
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
