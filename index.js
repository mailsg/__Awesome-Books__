document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addBook);
  
    renderTable();
});
  
function addBook() {
    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title === "" || author === "") {
        alert("Please enter both the title and author.");
        return;
    }

    const book = {
        title,
        author,
    };

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    titleInput.value = "";
    authorInput.value = "";

    renderTable();
}
  
function removeBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));

    renderTable();
}
  
function renderTable() {
    const tableContainer = document.getElementById("table-container");
    const books = JSON.parse(localStorage.getItem("books")) || [];

    if (books.length === 0) {
        tableContainer.innerHTML = "";
        tableContainer.style.display = "none";
        return;
    }

    let tableHTML = "<table>";

    books.forEach((book, index) => {
        const rowColor = index % 2 === 0 ? "row-grey" : "row-white";
        tableHTML += `
        <tr class="${rowColor}">
            <td>"${book.title}" by ${book.author}</td>
            <td>
            <button class="remove-button" onclick="removeBook(${index})">Remove</button>
            </td>
        </tr>
        `;
    });

    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
    tableContainer.style.display = "block";
}