/*  eslint-disable max-classes-per-file, no-unused-vars, no-use-before-define */
function renderTable() {
  const tableContainer = document.getElementById('table-container');
  const books = JSON.parse(localStorage.getItem('books')) || [];

  if (books.length === 0) {
    tableContainer.innerHTML = '';
    tableContainer.style.display = 'none';
    return;
  }

  tableContainer.innerHTML = '';
  const table = document.createElement('table');

  books.forEach((book, index) => {
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
      removeBook(index);
    });
    removeButtonCell.appendChild(removeButton);
    row.appendChild(removeButtonCell);

    table.appendChild(row);
  });

  tableContainer.appendChild(table);
  tableContainer.style.display = 'block';

  function removeBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));

    renderTable();
  }
}

function addBook() {
  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  const book = {
    title,
    author,
  };

  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';

  renderTable();
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', addBook);

  renderTable();
});
