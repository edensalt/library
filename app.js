// Establish the library array

const myLibrary = [];

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

// Define books

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'No');
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, 'Yes');
addBookToLibrary('A Game of Thrones', 'George R.R. Martin', 1088, 'No');

// Add new books

const newBookButton = document.getElementById('submit-button');

newBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Get object prop values

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.querySelector('input[name="read"]:checked').value;

  // Add book to library

  addBookToLibrary(title, author, pages, readStatus);

  console.log(myLibrary);

  // Add new book to dom

  const list = document.getElementById('book-grid');
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.textContent = `${title} by ${author} is ${pages} pages long. Have you read this book? ${readStatus}`;
  list.appendChild(bookCard);
});

// Display initial list of books at first load of site

for (i = 0; i < myLibrary.length; i++) {
  const list = document.getElementById('book-grid');
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  list.appendChild(bookCard);
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
