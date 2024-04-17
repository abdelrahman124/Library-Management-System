  class Author {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  }

  class Book {
    constructor(name, price, author) {
      this.name = name;
      this.price = price;
      this.author = author;
    }
  }

  function startAddingBooks(event) {
    event.preventDefault();
    const numBooksInput = document.getElementById("numBooksInput").value;
    const numBooks = parseInt(numBooksInput);
    if (!isNaN(numBooks) && numBooks > 0) {
      displayForm();
    } else {
      alert("Please enter a valid number of books.");
    }
  }

  function displayForm() {
    document.getElementById("num-books").style.display = "none";
    document.getElementById("data-form").style.display = "block";
  }

  let books = [];

  function addBook() {
    const bookName = document.getElementById("bookName").value.trim();
    const bookPrice = document.getElementById("bookPrice").value.trim();
    const authorName = document.getElementById("authorName").value.trim();
    const authorEmail = document.getElementById("authorEmail").value.trim();

    const namePattern = /^[a-zA-Z0-9\s]+$/;
    const authorPattern = /^[a-zA-Z\s]+$/;

    if (!namePattern.test(bookName)) {
      alert("Please enter a valid book name.");
      return;
    }

    if (bookPrice == null || bookPrice < 1) {
      alert("Please enter a valid price.");
      return;
    }

    if (!authorPattern.test(authorName)) {
      alert("Please enter a valid author name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(authorEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const author = new Author(authorName, authorEmail);
    const book = new Book(bookName, bookPrice, author);
    books.push(book);
    if (
      books.length ===
      parseInt(document.getElementById("numBooksInput").value)
    ) {
      displayTable();
    }
    document.getElementById("input-form").reset();
  }

  function displayTable() {
    document.getElementById("data-form").style.display = "none";
    document.getElementById("data-table").style.display = "block";
    const table = document.getElementById("table");
    table.innerHTML = `
        <tr>
            <th>Book Name</th>
            <th>Price</th>
            <th>Author Name</th>
            <th>Author Email</th>
            <th>Actions</th>
        </tr>
    `;
    books.forEach((book, index) => {
      const row = table.insertRow();
      row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
            <td>${book.author.email}</td>
            <td>
                <button class="edit-button" onclick="editBook(${index})">Edit</button>
                <button class="delete-button" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
    });
  }

  function editBook(index) {
    const table = document.getElementById("table");
    const row = table.rows[index + 1];
    const cells = row.cells;

    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const text = cell.innerText;
      cell.innerHTML = `<input type="text" value="${text}">`;
    }

    const actionCell = cells[cells.length - 1];
    const deleteButton = actionCell.querySelector(".delete-button");
    deleteButton.disabled = true; // Disable delete button during edit

    const editButton = actionCell.querySelector(".edit-button");
    editButton.style.display = "none"; // Hide the Edit button

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = function () {
      saveChanges(index);
    };
    actionCell.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = function () {
      cancelEdit(index);
    };
    actionCell.appendChild(cancelButton);

    row.classList.add("edit-mode");
  }

  function saveChanges(index) {
    const table = document.getElementById("table");
    const row = table.rows[index + 1];
    const cells = row.cells;

    const updatedBook = {
      name: cells[0].querySelector("input").value.trim(),
      price: cells[1].querySelector("input").value.trim(),
      author: {
        name: cells[2].querySelector("input").value.trim(),
        email: cells[3].querySelector("input").value.trim(),
      },
    };

    books[index] = updatedBook;
    displayTable();
  }

  function cancelEdit(index) {
    displayTable();
  }

  function deleteBook(index) {
    books.splice(index, 1);
    displayTable();
  }