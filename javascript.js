const issuedBooks = [];

function issueBook() {
  const bookName = document.getElementById("book-name").value;
  const issuedTo = document.getElementById("issued-to").value;
  const issuedTime = new Date().toLocaleString();
  const id = issuedBooks.length + 1;
  const status = "not returned";

  issuedBooks.push({id, bookName, issuedTo, issuedTime, status});

  displayIssuedBooks();
}

function displayIssuedBooks() {
  const tableBody = document.querySelector("#issued-books tbody");
  tableBody.innerHTML = "";

  issuedBooks.forEach(book => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.innerText = book.id;
    row.appendChild(idCell);

    const bookNameCell = document.createElement("td");
    bookNameCell.innerText = book.bookName;
    row.appendChild(bookNameCell);

    const issuedToCell = document.createElement("td");
    issuedToCell.innerText = book.issuedTo;
    row.appendChild(issuedToCell);

    const issuedTimeCell = document.createElement("td");
    issuedTimeCell.innerText = book.issuedTime;
    row.appendChild(issuedTimeCell);

    const statusCell = document.createElement("td");
    statusCell.innerText = book.status;
    statusCell.contentEditable = true;
    statusCell.addEventListener("blur", () => updateStatus(book.id, statusCell.innerText));
    row.appendChild(statusCell);

    if (book.status === "returned") {
      statusCell.classList.add("status-returned");
    } else {
      statusCell.classList.add("status-not-returned");
    }

    tableBody.appendChild(row);
  });
}

function updateStatus(id, status) {
  const book = issuedBooks.find(book => book.id === id);
  book.status = status;

  const statusCell = document.querySelector(`#issued-books tbody tr:nth-of-type(${id}) td:nth-of-type(5)`);
  statusCell.innerText = status;

  if (status === "returned") {
    statusCell.classList.remove("status-not-returned");
    statusCell.classList.add("status-returned");
  } else {
    statusCell.classList.remove("status-returned");
    statusCell.classList.add("status-not-returned");
  }
}
