console.log("ES6 version");


function deleteFun(index) {

    let data = localStorage.getItem('data');
    let allBooks = JSON.parse(data);
    allBooks.splice(index,1);
    localStorage.setItem('data', JSON.stringify(allBooks));
        Display.add();
}

class Book {
    constructor(name, author, type){
        
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{



    static add(){

    let data = localStorage.getItem('data');
    if(data==null){
        let uistr ='';
        tableBody.innerHTML = uistr;
    }else{

        let allBooks = JSON.parse(data);
    
        let uistr ='';
        allBooks.forEach((book,index) => {
            uistr +=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                <td>
                <button id="${index}" 
                onclick="deleteFun(${index})" 
                type="button"
                 class="btn btn-danger"
                 style ="
                 padding-left: 8px;
                 padding-top: 2px;
                 padding-right: 8px;
                 padding-bottom: 2px;"><i class="fas fa-trash fa-1x"></i></button></td>
            </tr>
            `; 
        });
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = uistr;
    }
    };

    

    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }else{
            return true;
        }
    };


    clearForm () {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    };

    show(type,mssg){
        let msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                             <strong>Message:</strong> ${mssg}
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;
                         setTimeout(() => {
                             msg.innerHTML='';
                         }, 5000);
     };
}



Display.add();

//Add submit listener to form 
let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("Form submited");
    



    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let dsa = document.getElementById('dsa');
    let comp = document.getElementById('comp');
    let proj = document.getElementById('proj');

    if (dsa.checked) {
        type = "Data Structure & Algo";//dsa.value;
    } else if (comp.checked) {
        type = "Computer Subject";//comp.value;
    } else if (proj.checked) {
        type = "Software Project";//proj.value;
    }


    
    let arr = localStorage.getItem("data");
    let allBooks;
    if (arr == null) {
        allBooks = [];
    } else {
        allBooks = JSON.parse(arr);
    }

   

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {

        allBooks.push(book);
        localStorage.setItem('data', JSON.stringify(allBooks));
        Display.add();
        display.clearForm();
        confetti({
            particleCount: 500,
            spread: 150,
          });
        display.show('success', "your book is Added !");
    } else {
        display.show('danger', 'You cannot add this book !');
    }


    e.preventDefault();
}
