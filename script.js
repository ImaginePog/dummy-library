/* PREDEFINED CONSTANT */

const genreLegend = {
	fiction: "#e0e0e0",
	nonfiction: "#d38536",
	poetry: "#ffeddb",
	drama: "#ffc0cb",
	biography: "#99d4d0",
	other: "#9b8383",
};

/* ****************** */

/* BOOK OBJECT */

function Book(title, author, pages, genre, completed) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.completed = completed;
}

Book.prototype.log = function () {
	console.log(this.title, this.author, this.pages, this.genre, this.completed);
};

/* UTILITY */

function genericCreate(elementName, ...attributes) {
	const genericElement = document.createElement(elementName);

	attributes.forEach((attribute) => {
		if (attribute.name === "text") genericElement.innerText = attribute.value;
		else if (attribute.name === "class")
			genericElement.classList.add(attribute.value);
		else genericElement.setAttribute(attribute.name, attribute.value);
	});

	return genericElement;
}

/* ****************** */

/* DOM ELEMETSE */

//LEGEND
const legend = document.querySelector(".legend");

// FORM STUFF
const formBtn = document.querySelector(".form-btn");

const addForm = document.querySelector(".add-form");
const genreSelect = document.querySelector(".genre-select");

const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

// LIBRARY STUFF

const libraryDisplay = document.querySelector(".library");

/* ****************** */

// GLOBALS
//TEMP

const book1 = new Book("lol", "la", 12, "fiction", false);
const book2 = new Book("lol", "la", 12, "nonfiction", false);

const book3 = new Book("lol", "la", 12, "biography", false);
const book4 = new Book("lol", "la", 12, "drama", false);
const book5 = new Book("lol", "la", 12, "other", false);
const book6 = new Book("lol", "la", 12, "poetry", false);
const book7 = new Book("lol", "la", 12, "poetry", false);

const book8 = new Book("lol", "la", 12, "poetry", false);

const book9 = new Book("lol", "la", 12, "drama", false);

const book10 = new Book("lol", "la", 12, "poetry", false);

let books = [
	book1,
	book2,
	book3,
	book4,
	book5,
	book6,
	book7,
	book8,
	book9,
	book10,
];

function populateLegend() {
	// <div class="genre">
	// 	<div class="color-container"></div>
	// 	<p class="label">Fiction</p>
	// </div>;

	for (genre in genreLegend) {
		const genreDisplay = genericCreate("div", {
			name: "class",
			value: "genre",
		});
		const colorContainer = genericCreate(
			"div",
			{
				name: "class",
				value: "color-container",
			},
			{ name: "style", value: `background-color: ${genreLegend[genre]}` }
		);

		const genreLabel = genericCreate(
			"p",
			{ name: "class", value: "label" },
			{ name: "text", value: `${genre}` }
		);

		genreDisplay.append(colorContainer, genreLabel);
		legend.appendChild(genreDisplay);
	}
}

function openForm() {
	addForm.classList.add("form-display");
}

function resetForm() {
	const inputs = addForm.querySelectorAll("input");
	inputs.forEach((input) => {
		if (input.type === "number" || input.type === "text") {
			if (input.value !== "") {
				input.value = "";
			}
		} else if (input.type === "checkbox") {
			if (input.checked === true) {
				input.checked = false;
			}
		}
	});

	const select = addForm.querySelector("select");

	select.value = "other";
	select.style.backgroundColor = genreLegend[select.value];
}

function closeForm() {
	resetForm();
	addForm.classList.remove("form-display");
}
function clearLibraryDisplay() {
	while (libraryDisplay.firstChild) {
		libraryDisplay.removeChild(libraryDisplay.firstChild);
	}
}

function removeBook(e) {
	let clickedBook = e.currentTarget.closest(".book");
	let index = clickedBook.getAttribute("data-book-index");

	books.splice(index, 1);

	updateLibraryDisplay();
}

function toggleCompleted(e) {
	let clickedBook = e.currentTarget.closest(".book");
	let index = clickedBook.getAttribute("data-book-index");

	if (books[index].completed) {
		books[index].completed = false;
	} else {
		books[index].completed = true;
	}

	updateLibraryDisplay();
}

function updateLibraryDisplay() {
	clearLibraryDisplay();

	let count = 0;
	books.forEach((book) => {
		/* TEMPLATE
          <div class="book">
						<h2>Title</h2>
						<p>by author</p>
						<p>n pages</p>
						<div class="options">
							<span>Completed:</span>
							<button class="icon-btn mark-btn">
								<img src="assets/check.svg" alt="mark-icon" />
							</button>
							<button class="icon-btn remove-btn">
								<img src="assets/delete.svg" alt="trash-icon" />
							</button>
						</div>
					</div>
    */

		const bookDisplay = genericCreate(
			"div",
			{ name: "class", value: "book" },
			{ name: "data-book-index", value: `${count++}` },
			{ name: "style", value: `background-color: ${genreLegend[book.genre]};` }
		);

		const titleDisplay = genericCreate("h2", {
			name: "text",
			value: `${book.title}`,
		});

		const authorDisplay = genericCreate("p", {
			name: "text",
			value: `by ${book.author}`,
		});

		const pagesDisplay = genericCreate("p", {
			name: "text",
			value: `${book.pages} pages`,
		});

		const options = genericCreate("div", {
			name: "class",
			value: "options",
		});

		const completedContainer = genericCreate("div", {
			name: "class",
			value: "completed-container",
		});

		const completed = genericCreate("span", {
			name: "text",
			value: "Completed:",
		});

		const completedBtn = genericCreate(
			"button",
			{
				name: "class",
				value: "icon-btn",
			},
			{ name: "class", value: "completed-btn" }
		);

		completedBtn.addEventListener("click", toggleCompleted);

		const completedIcon = genericCreate("img", {
			name: "alt",
			value: "completed icon",
		});

		if (book.completed) {
			completedIcon.src = "assets/check.svg";
		} else {
			completedIcon.src = "assets/x.svg";
		}

		completedBtn.appendChild(completedIcon);

		completedContainer.append(completed, completedBtn);

		const removeBtn = genericCreate(
			"button",
			{
				name: "class",
				value: "icon-btn",
			},
			{ name: "class", value: "remove-btn" }
		);

		removeBtn.addEventListener("click", removeBook);

		const removeIcon = genericCreate(
			"img",
			{
				name: "src",
				value: "assets/delete.svg",
			},
			{ name: "alt", value: "remove icon" }
		);

		removeBtn.appendChild(removeIcon);

		options.append(completedContainer, removeBtn);

		bookDisplay.append(titleDisplay, authorDisplay, pagesDisplay, options);

		libraryDisplay.appendChild(bookDisplay);
	});
}

formBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);

addForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const newBook = new Book(
		e.currentTarget.title.value,
		e.currentTarget.author.value,
		e.currentTarget.pages.value,
		e.currentTarget.genre.value,
		e.currentTarget.completed.checked
	);

	books.push(newBook);

	updateLibraryDisplay();

	closeForm();
});

genreSelect.addEventListener("change", (e) => {
	const currOption = e.currentTarget.value;
	e.currentTarget.style.backgroundColor = genreLegend[currOption];
});

updateLibraryDisplay();

populateLegend();
