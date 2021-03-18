let myLibrary = [];
const newBook = document.querySelector(".newBook");
const newBookForm = document.querySelector(".newBookForm");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push({
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.read,
  });
}

function showBooks(arr) {
  arr.forEach((book) => console.log(book));
}

document.querySelector(".newBookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;
  const addBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  addBookToLibrary(addBook);
  newBook.classList.remove("hide");
  newBookForm.classList.remove("show");
  localStorage.setItem("library", JSON.stringify(myLibrary));
});

document.querySelector(".showBooks").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".library").textContent = "";

  myLibrary = JSON.parse(localStorage.getItem("library"));

  console.log(myLibrary);

  myLibrary.forEach((book) => {
    if (book != null) {
      document.querySelector(".library").innerHTML += `<li>${
        book.title
      } written by ${book.author}, ${
        book.pages == "" ? "pages: unknown" : book.pages
      }, read: ${
        book.read ? "<span>✓</span>" : "X"
      }<span class="del">     Remove</span></li>`;
    }
  });
  document.querySelector(".library").classList.toggle("show");
});

document.querySelector(".close").addEventListener("click", (e) => {
  e.preventDefault();
  newBookForm.classList.remove("show");
  newBook.classList.remove("hide");
});

document.querySelector(".addBtn").addEventListener("click", (e) => {
  e.preventDefault();
  newBook.classList.add("hide");
  newBookForm.classList.add("show");
});

document.querySelector("ul").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName == "SPAN") {
    myLibrary.forEach((bookie) => {
      if (bookie != null) {
        if (e.target.parentElement.textContent.includes(bookie.title)) {
          delete myLibrary[myLibrary.indexOf(bookie)];
        }
      }
    });
    e.target.parentElement.remove();
  }
  localStorage.setItem("library", JSON.stringify(myLibrary));
});
