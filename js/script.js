const addBook = document.getElementById('add-book')
const checkButtons = document.querySelectorAll('#check')
const uncheckButtons = document.querySelectorAll('#uncheck')
const searchInput = document.getElementById('search-input')
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

addBook.addEventListener('focus', () => {
	const backgroundBlur = document.createElement('div')
	backgroundBlur.classList.add('background-blur')
	backgroundBlur.classList.add('show')

	document.body.appendChild(backgroundBlur)
})
