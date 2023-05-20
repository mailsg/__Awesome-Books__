/*  eslint-disable max-classes-per-file, no-unused-vars, no-use-before-define */

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

    if (this.books.length === 0) {
      tableContainer.innerHTML = '';
      tableContainer.style.display = 'none';
      return;
    }

    tableContainer.innerHTML = '';
    const table = document.createElement('table');

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

      table.appendChild(row);
    });

    tableContainer.appendChild(table);
    tableContainer.style.display = 'block';
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

  library.renderTable();
});
