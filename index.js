/*  eslint-disable max-classes-per-file, no-unused-vars */
/* global luxon */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  renderTable() {
    const tableContainer = document.getElementById('table-container');
    const table = document.getElementById('books-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (this.books.length === 0) {
      tableContainer.style.display = 'none';
      return;
    }

    tableContainer.style.display = 'block';

    this.books.forEach((book, index) => {
      const rowColor = index % 2 === 0 ? 'row-grey' : 'row-white';
      const row = document.createElement('tr');
      row.classList.add(rowColor);

      const titleCell = document.createElement('td');
      titleCell.textContent = `"${book.title}" by ${book.author}`;
      row.appendChild(titleCell);

      const removeButtonCell = document.createElement('td');
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });
      removeButtonCell.appendChild(removeButton);
      row.appendChild(removeButtonCell);

      tbody.appendChild(row);
    });
  }

  addBook() {
    const titleInput = document.getElementById('title-input');
    const authorInput = document.getElementById('author-input');

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));

    titleInput.value = '';
    authorInput.value = '';

    this.renderTable();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));

    this.renderTable();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const library = new Library();

  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', () => {
    library.addBook();
  });

  const booksLink = document.getElementById('books-link');
  const addLink = document.getElementById('add-link');
  const contactLink = document.getElementById('contact-link');

  booksLink.addEventListener('click', () => {
    addLink.classList.remove('active');
    contactLink.classList.remove('active');
    booksLink.classList.add('active');
    document.getElementById('books-section').style.display = 'block';
    document.getElementById('add-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
  });

  addLink.addEventListener('click', () => {
    booksLink.classList.remove('active');
    contactLink.classList.remove('active');
    addLink.classList.add('active');
    document.getElementById('books-section').style.display = 'none';
    document.getElementById('add-section').style.display = 'block';
    document.getElementById('contact-section').style.display = 'none';
  });

  contactLink.addEventListener('click', () => {
    booksLink.classList.remove('active');
    addLink.classList.remove('active');
    contactLink.classList.add('active');
    document.getElementById('books-section').style.display = 'none';
    document.getElementById('add-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'block';
  });

  booksLink.click();

  library.renderTable();

  const currentDateElement = document.getElementById('current-date');
  const currentDate = luxon.DateTime.now().toLocaleString({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  currentDateElement.textContent = currentDate;
});
