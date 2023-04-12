// Establish the library array

const myLibrary = [];
const list = document.getElementById('book-grid');

// Library card grid display function

function createBookCards(myLibrary) {
  for (i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    list.appendChild(bookCard);
    const removeBookBtn = document.createElement('div');
    removeBookBtn.textContent = 'x';
    removeBookBtn.classList.add('remove-book');
    bookCard.appendChild(removeBookBtn);
    const bookCardTitle = document.createElement('h3');
    bookCardTitle.textContent = myLibrary[i].title;
    bookCard.appendChild(bookCardTitle);
    const bookCardAuthor = document.createElement('h4');
    bookCardAuthor.textContent = myLibrary[i].author;
    bookCard.appendChild(bookCardAuthor);
    const bookCardPages = document.createElement('p');
    bookCardPages.textContent = `${myLibrary[i].pages} pages`;
    bookCard.appendChild(bookCardPages);
    const bookCardRead = document.createElement('p');
    bookCardRead.textContent = `Book read? ${myLibrary[i].read}.`;
    bookCard.appendChild(bookCardRead);
  }
}

// Define the object constructor for each book

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Define static books

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Yes');
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  'J.K. Rowling',
  309,
  'Yes',
);
addBookToLibrary('A Game of Thrones', 'George R.R. Martin', 1088, 'No');

// ADD NEW BOOKS

const newBookButton = document.getElementById('submit-button');

newBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Get object prop values

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pagesString = document.getElementById('pages').value;
  const pages = parseFloat(pagesString);
  const readStatus = document.querySelector('input[name="read"]:checked').value;

  // Add book to library

  addBookToLibrary(title, author, pages, readStatus);

  // Remove current grid

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // Write new grid

  createBookCards(myLibrary);
});

// Display initial list of books at first load of site

createBookCards(myLibrary);

// NEW BOOK POP-UP BOX

// Add book pop-up

const addBookBtn = document.getElementById('add-book-btn');

addBookBtn.addEventListener('click', () => {
  const bookPopup = document.getElementById('add-book-popup');
  bookPopup.style.display = 'block';
});

// Remove book pop-up

const closePopup = document.getElementById('close-popup');

closePopup.addEventListener('click', () => {
  const bookPopup = document.getElementById('add-book-popup');
  bookPopup.style.display = 'none';
});

// REMOVE BOOK

list.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-book')) {
    const index = Array.from(
      e.target.parentElement.parentElement.children,
    ).indexOf(e.target.parentElement);
    myLibrary.splice(index, 1);

    // Remove current grid
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // Write new grid
    createBookCards(myLibrary);
  }
});

// BOOK FILTERS

// Title sort

const titleSortBtn = document.getElementById('title-sort');

titleSortBtn.addEventListener('click', () => {
  myLibrary.sort((a, b) => (a.title > b.title ? 1 : -1));
  // Remove current grid
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Write new grid
  createBookCards(myLibrary);
});

// Author first name sort

const authorFirstSortBtn = document.getElementById('author-first-sort');

authorFirstSortBtn.addEventListener('click', () => {
  myLibrary.sort((a, b) => (a.author > b.author ? 1 : -1));
  // Remove current grid
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Write new grid
  createBookCards(myLibrary);
});

// Author last name sort

const authorLastSort = myLibrary.map((book) => book.author.split(' ').pop());
authorLastSort.sort();

// Read sort - a little different since we don't want to change original library

const readSortBtn = document.getElementById('read-sort');

readSortBtn.addEventListener('click', () => {
  const readYes = myLibrary.filter((book) => (book.read === 'Yes'));
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
  // Remove current grid
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Write new grid
  createBookCards(myLibrary);
});

// Total pages

// const totalPages = myLibrary.reduce((total, book) => total + (book.pages), 0);

// Total pages read

// const pagesReadFooter = document.getElementById('pages-read-total');
// const pagesReadNumber = document.createElement('p');
// pagesReadNumber.textContent = `You have read a total of ${totalPagesRead} pages!`;
// pagesReadFooter.appendChild(pagesReadNumber);

const readCountBtn = document.getElementById('read-count');
const pagesReadFooter = document.getElementById('pages-read-total');

readCountBtn.addEventListener('click', () => {
  // Remove current grid
  while (pagesReadFooter.firstChild) {
    pagesReadFooter.removeChild(pagesReadFooter.firstChild);
  }
  const readYes = myLibrary.filter((book) => (book.read === 'Yes'));
  const readSortLibrary = [...readYes];
  const totalPagesRead = readSortLibrary.reduce((total, book) => total + (book.pages), 0);

  // Write new grid
  const pagesReadNumber = document.createElement('p');
  pagesReadNumber.textContent = `You have read a total of ${totalPagesRead} pages!`;
  pagesReadFooter.appendChild(pagesReadNumber);
});
