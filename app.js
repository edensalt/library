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

for (i = 0; i < myLibrary.length; i++) {
  const list = document.getElementById('book-list');
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-card');
  bookItem.textContent = `${myLibrary[i].title} by ${myLibrary[i].author} is ${myLibrary[i].pages} pages long. Status? ${myLibrary[i].read}.`;
  list.appendChild(bookItem);
}
