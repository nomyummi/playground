//TODO: Change this class to a factory function (put in comments)
class Book {
    bookElement;
    titleChild;
    titleChildText;
    authorChild;
    numPages;
    numPagesChild;
    readStatusChild;
    editButton;
    constructor(title,author,numPages, readStatus){
        this.numPages = numPages;
        // Add book to the grid
        this.bookElement = document.createElement("div");
        this.bookElement.classList.add("book");
        
        this.titleChild = document.createElement("div");
        this.titleChild.classList.add("title-grid");
        this.titleChildText = document.createElement("span");
        this.titleChildText.textContent = title ? title : "---";
        this.titleChild.appendChild(this.titleChildText);
        this.bookElement.appendChild(this.titleChild);

        this.authorChild = document.createElement("div");
        this.authorChild.classList.add("author-grid");
        this.authorChild.textContent = author ? author : "---";
        this.bookElement.appendChild(this.authorChild);

        this.numPagesChild = document.createElement("div");
        this.numPagesChild.classList.add("num-pages-grid");
        this.numPagesChild.textContent = this.numPages +  " pages";
        this.bookElement.appendChild(this.numPagesChild);

        this.readStatusChild = document.createElement("div");
        this.readStatusChild.classList.add("read-status-grid");
        this.readStatusChild.textContent = readStatus;
        this.bookElement.appendChild(this.readStatusChild);
        
        this.editButton = document.createElement("button");
        this.editButton.classList.add("edit-button");
        this.editButton.textContent = "✎";
        this.editButton.style.visibility = "hidden";
        this.editButton.inEditMode = true;
        this.editButton.addEventListener("click",(e)=>{
            showForm(e);
            titleInput.value = this.titleChildText.textContent;
            authorInput.value = this.authorChild.textContent;
            numPagesInput.value = this.numPages;
            let readStatusToNum = {
                "read": 0,
                "in progress" : 1,
                "not read": 2
            };
            radioButtonsInput[readStatusToNum[this.readStatusChild.textContent]].checked = true;
            this.editButton.style.visibility = "hidden";
            bookBeingEdited = this;
        });
        this.bookElement.addEventListener("mouseover",()=>{
            this.editButton.style.visibility = "visible";
        });
        this.bookElement.addEventListener("mouseleave",()=>{
            this.editButton.style.visibility = "hidden";
        });
        this.bookElement.append(this.editButton);
        bookGrid.appendChild(this.bookElement);
    }

    deleteBookElement = () => {
        this.bookElement.remove();
    }

    updateBookElement = (title,author,numPages,readStatus) =>{
        this.titleChildText.textContent = title;
        this.authorChild.textContent = author;
        this.numPages = numPages;
        this.numPagesChild.textContent = this.numPages +  " pages";
        this.readStatusChild.textContent = readStatus;
    }
}
let bookBeingEdited;

const header = document.querySelector("header");
const addBookButton = document.getElementById("add-book-button");

const darkenedBackground = document.getElementById("darkened-background");
const formWrapper = document.getElementById("form-wrapper");
const cancelButton = document.getElementById("cancel-button");
const submitForm = document.getElementById("submit-form");
const updateBookButton = document.getElementById("update-book");
const deleteBookButton = document.getElementById("delete-book");
const formTitle = document.getElementById("form-title");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numPagesInput = document.getElementById("num-pages");
const radioButtonsInput = document.getElementsByName("read-status");

const bookGrid = document.getElementById("book-grid");

addBookButton.addEventListener("click",showForm);
addBookButton.inEditMode = false;
cancelButton.addEventListener("click",hideForm);
submitForm.addEventListener("click",addBook);
deleteBookButton.addEventListener("click",deleteBook);
updateBookButton.addEventListener("click",updateBook);

function deleteBook(){
    bookBeingEdited.deleteBookElement();
    hideForm();
}

function updateBook(){
    let title = titleInput.value;
    let author = authorInput.value;
    let numPages = numPagesInput.value;
    let readStatus = getRadioValue().replace(/-/g, " ");
    bookBeingEdited.updateBookElement(title,author,numPages,readStatus);
    hideForm();
}
function addBook(){
    let title = titleInput.value;
    let author = authorInput.value;
    let numPages = numPagesInput.value;
    let readStatus = getRadioValue().replace(/-/g, " ");
    let newBook = new Book(title,author,numPages,readStatus);
    hideForm();
}

function showForm(e){
    darkenedBackground.style.visibility = "visible";
    formWrapper.style.visibility = "visible";
    formWrapper.style["animation-name"] = "fade-in";
    formWrapper.style["animation-duration"] = "0.5s";
    if (e.currentTarget.inEditMode === false){
        formTitle.textContent = "New Book";
        submitForm.style.visibility = "visible";
        updateBookButton.style.visibility = "hidden";
        deleteBookButton.style.visibility = "hidden";

    }
    else {
        formTitle.textContent = "Edit Book";
        submitForm.style.visibility = "hidden";
        updateBookButton.style.visibility = "visible";
        deleteBookButton.style.visibility = "visible";
    }
}

function hideForm(){
    darkenedBackground.style.visibility = "hidden";
    formWrapper.style.visibility = "hidden";
    formWrapper.style["animation-name"] = "";
    formWrapper.style["animation-duration"] = "";
    submitForm.style.visibility = "hidden";
    updateBookButton.style.visibility = "hidden";
    deleteBookButton.style.visibility = "hidden";  
    clearForm();
}

function clearForm(){
    titleInput.value = "";
    authorInput.value = "";
    numPagesInput.value = "0";
    radioButtonsInput[0].checked = true;
}

function getRadioValue(){
    for (i = 0; i < radioButtonsInput.length; i++){
        if (radioButtonsInput[i].checked) {
            return radioButtonsInput[i].value;
        }
    }
}
