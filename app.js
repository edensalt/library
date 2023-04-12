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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, 'read');
addBookToLibrary('A Game of Thrones', 'George R.R. Martin', 1088, 'not read yet');

// Add new books

const newBookButton = document.getElementById('submit-button');

newBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Get elements

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.querySelector('input[name="read"]:checked').value;

  // Get radio button value

  const newBook = new Book(title, author, pages, readStatus);

  myLibrary.push(newBook);

  console.log(myLibrary);

  // Add to dom

  const list = document.getElementById('book-list');
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-card');
  bookItem.textContent = `${title} by ${author} is ${pages} pages long. Hvae you read this book? ${readStatus}`;
  list.appendChild(bookItem);
});

// Write array

for (i = 0; i < myLibrary.length; i++) {
  const list = document.getElementById('book-list');
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-card');
  bookItem.textContent = `${myLibrary[i].title} by ${myLibrary[i].author} is ${myLibrary[i].pages} pages long. Status? ${myLibrary[i].read}.`;
  list.appendChild(bookItem);
}
