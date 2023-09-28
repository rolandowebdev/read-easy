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

function filterBooks(searchValue) {
	return books.filter((book) => {
		const title = book.title.toLowerCase()
		const author = book.author.toLowerCase()
		return title.includes(searchValue) || author.includes(searchValue)
	})
}

function updateCompletedBookCount() {
	const completedBooks = books.filter((book) => book.isComplete)
	completedBookCount.textContent = `${completedBooks.length} Book${
		completedBooks.length > 1 ? 's' : ''
	}`
}

function updateUncompletedBookCount() {
	const uncompletedBooks = books.filter((book) => !book.isComplete)
	uncompletedBookCount.textContent = `${uncompletedBooks.length} Book${
		uncompletedBooks.length > 1 ? 's' : ''
	}`
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

	titleAddInput.value = ''
	authorAddInput.value = ''
	yearAddInput.value = ''

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

function deletedBook(bookId) {
	const bookTarget = findBookIndex(bookId)

	if (bookTarget === -1) return

	books.splice(bookTarget, 1)

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function uncompletedBook(bookId) {
	const bookTarget = findBook(bookId)

	if (bookTarget == null) return

	bookTarget.isComplete = true

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}

function completedBook(bookId) {
	const bookTarget = findBook(bookId)

	if (bookTarget == null) return

	bookTarget.isComplete = false

	document.dispatchEvent(new Event(RENDER_EVENT))
	saveBookToLocalstorage()
}
