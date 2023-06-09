const myLibrary = [];
const list = document.getElementById('book-grid');
const bookPopup = document.getElementById('add-book-popup');
const form = document.querySelector('form');
const newBookButton = document.getElementById('submit-button');
const openPopup = document.getElementById('add-book-btn');
const closePopup = document.getElementById('close-popup');
const inputFields = document.querySelectorAll('input');

// LIBRARY CARD COMPONENTS

// New card
function newCard() {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  list.appendChild(bookCard);
  return bookCard;
}

// Remove card button
function removeBook(bookCard) {
  const removeBookBtn = document.createElement('div');
  removeBookBtn.textContent = 'x';
  removeBookBtn.classList.add('remove-book');
  bookCard.appendChild(removeBookBtn);
}

// Book title
function addTitle(book, bookCard) {
  const bookCardTitle = document.createElement('h3');
  bookCardTitle.textContent = book.title;
  bookCard.appendChild(bookCardTitle);
}

// Book author
function addAuthor(book, bookCard) {
  const bookCardAuthor = document.createElement('h4');
  bookCardAuthor.textContent = book.author;
  bookCard.appendChild(bookCardAuthor);
}

// Book pages
function addPages(book, bookCard) {
  const bookCardPages = document.createElement('p');
  bookCardPages.textContent = `${book.pages} pages`;
  bookCard.appendChild(bookCardPages);
}

// Book read checkbox
function addReadCheck(book, readDiv) {
  const readCheckbox = document.createElement('input');
  readCheckbox.type = 'checkbox';
  readCheckbox.name = 'read-status';
  readCheckbox.id = 'read-status';
  readCheckbox.classList.add('read-checkbox');
  readCheckbox.checked = book.read;
  readDiv.appendChild(readCheckbox);
}

// Check read status
function readText(book) {
  if (book.read === true) {
    return 'I have read this book';
  } return 'I have not read this book';
}

// Book read label
function addReadLabel(readDiv, book) {
  const readLabel = document.createElement('label');
  readLabel.setAttribute('for', 'read-status');
  readLabel.appendChild(document.createTextNode(readText(book)));
  readDiv.appendChild(readLabel);
}

// Book read div
function addReadDiv(book, bookCard) {
  const readDiv = document.createElement('div');
  readDiv.classList.add('read-div');
  bookCard.appendChild(readDiv);
  addReadCheck(book, readDiv);
  addReadLabel(readDiv, book);
}

// CREATE GRID OF CARDS

function createBookCards(books) {
  books.forEach((book) => {
    const bookCard = newCard();
    removeBook(bookCard);
    addTitle(book, bookCard);
    addAuthor(book, bookCard);
    addPages(book, bookCard);
    addReadDiv(book, bookCard);
  });
}

// GRID REFRESH
function gridRefresh() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  createBookCards(myLibrary);
}

// Define the object constructor for each book

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a book function

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Define static books

addBookToLibrary(
  'The Hobbit',
  'J.R.R. Tolkien',
  295,
  true,
);
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  'J.K. Rowling',
  309,
  true,
);
addBookToLibrary(
  'A Game of Thrones',
  'George R.R. Martin',
  1088,
  false,
);

// ADD NEW BOOKS

function checkRadioRead() {
  const radioButtons = document.querySelectorAll('input[name="read"]');
  let selectedValue = null;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.value === 'true';
    }
  });
  return selectedValue;
}

// Error throws red border

function addErrorStyling() {
  inputFields.forEach((input) => {
    if (!input.checkValidity()) {
      input.style.borderColor = 'red';
    }
  });
}

// Reset to black border

function resetInputStyling() {
  inputFields.forEach((input) => {
    input.style.borderColor = 'black';
  });
}

function getPagesValue() {
  let pagesString;
  if (document.getElementById('pages').value === '') {
    pagesString = 0;
  } else (pagesString = parseFloat(document.getElementById('pages').value));
  return pagesString;
}

newBookButton.addEventListener('click', (e) => {
  if (!form.checkValidity()) {
    addErrorStyling();
  } else {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = getPagesValue();
    const readStatus = checkRadioRead();
    addBookToLibrary(title, author, pages, readStatus);
    form.reset();
    resetInputStyling();
    gridRefresh(list);
    e.preventDefault();
  }
});

// NEW BOOK POP-UP BOX

// Add book pop-up
openPopup.addEventListener('click', () => {
  bookPopup.style.display = 'grid';
});

// Remove book pop-up
closePopup.addEventListener('click', () => {
  resetInputStyling();
  bookPopup.style.display = 'none';
});

// REMOVE BOOK

list.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-book')) {
    const index = Array.from(
      e.target.parentElement.parentElement.children,
    ).indexOf(e.target.parentElement);
    myLibrary.splice(index, 1);
    gridRefresh(list);
  }
});

// UPDATE READ STATUS

list.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('read-checkbox')) {
    const index = Array.from(
      e.target.parentElement.parentElement.parentElement.children,
    ).indexOf(e.target.parentElement.parentElement);
    myLibrary[index].read = !myLibrary[index].read;
    gridRefresh(list);
  }
});

// BOOK FILTERS

// Title sort

const titleSortBtn = document.getElementById('title-sort');

titleSortBtn.addEventListener('click', () => {
  myLibrary.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  // Remove current grid
  gridRefresh(list);
});

// Author first name sort

const authorFirstSortBtn = document.getElementById('author-first-sort');
authorFirstSortBtn.addEventListener('click', () => {
  myLibrary.sort((a, b) => (a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1));
  gridRefresh(list);
});

// Author last name sort

const authorLastSort = myLibrary.map((book) => book.author.split(' ').pop());
authorLastSort.sort();

// Read sort - a little different since we don't want to change original library

const readSortBtn = document.getElementById('read-sort');
readSortBtn.addEventListener('click', () => {
  const readYes = myLibrary.filter((book) => book.read);
  const readSortLibrary = [...readYes];
  // Remove current grid
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Write new grid
  createBookCards(readSortLibrary);
});

// Pages sort

const pagesSortBtn = document.getElementById('pages-sort');
pagesSortBtn.addEventListener('click', () => {
  myLibrary.sort((a, b) => (a.pages > b.pages ? 1 : -1));
  gridRefresh(list);
});

// TOTAL PAGE COUNT

const readCountBtn = document.getElementById('read-count');
const pagesReadFooter = document.getElementById('pages-read-total');
readCountBtn.addEventListener('click', () => {
  // Remove current grid
  while (pagesReadFooter.firstChild) {
    pagesReadFooter.removeChild(pagesReadFooter.firstChild);
  }
  const readYes = myLibrary.filter((book) => book.read);
  const readSortLibrary = [...readYes];
  const totalPagesRead = readSortLibrary.reduce(
    (total, book) => total + book.pages,
    0,
  );

  // Write count
  const pagesReadNumber = document.createElement('p');
  pagesReadNumber.textContent = `You have read a total of ${totalPagesRead} pages!`;
  pagesReadFooter.appendChild(pagesReadNumber);
});

// Display initial list of books at first load of site
createBookCards(myLibrary);
