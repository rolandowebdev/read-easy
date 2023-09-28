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

function showModalEditBook(bookData) {
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

function createModalDelete(bookData) {
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
		showModalEditBook(bookData)
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
		const modal = createModalDelete(bookData)
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
