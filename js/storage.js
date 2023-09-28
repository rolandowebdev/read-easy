function isStorageExist() {
	if (typeof Storage === undefined) {
		alert('Your browser not support local storage for save books data!')
		return false
	}

	return true
}

function saveBookToLocalstorage() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(books)
		localStorage.setItem(STORAGE_KEY, parsed)

		document.dispatchEvent(new Event(SAVED_EVENT))
	}
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY)
	let data = JSON.parse(serializedData)

	if (data !== null) {
		for (const book of data) {
			books.push(book)
		}
	}

	document.dispatchEvent(new Event(RENDER_EVENT))
}
