//Global variables
var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var Productcatagory = document.getElementById("Productcatagory");
var ProductDescription = document.getElementById("ProductDescription");
var addproductbtn = document.getElementById("addproductbtn");
var updateproductbtn = document.getElementById("updateproductbtn");
var productlist;
var newindex = 0;

var validatedName = document.getElementById("validatedName");
var validatedprice = document.getElementById("validatedprice");
var validatedcat = document.getElementById("validatedcat");
var validatedDesc = document.getElementById("validatedDesc");



if (localStorage.getItem("productlist") == null) {
    productlist = []; // in case of first visit for user
} else {
    productlist = JSON.parse(localStorage.getItem("productlist"));// at getitem>> should change string to array.rule
    displayproduct(productlist);
}


function addproduct() {
    if (validateProductName() & validateProductPrice() & validateProductCatagory() & validateProductDesc()) {
        var product = {
            name: ProductName.value,
            price: ProductPrice.value,
            catagory: Productcatagory.value,
            Description: ProductDescription.value,
        }
        productlist.push(product);
        // after any edit in array .should edit in productist display & localstoage
        displayproduct(productlist);
        storeProduct();
        clearform(); //clear after add product 
    }
}



function displayproduct(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box += `  <tr>
        <td>${i + 1}</td>
        <td>${list[i].newname ? list[i].newname : list[i].name}</td> 
        <td>${list[i].price}</td>
        <td>${list[i].catagory}</td>
        <td>${list[i].Description}</td>
        <td><button class="btn btn-primary btn-sm" onclick="updateproduct(${i})">Update</button></td>
        <td><button class="btn btn-secondary btn-sm" onclick="deleteproduct(${i})">Delete</button></td>
    </tr>    `
    }
    document.getElementById("tbody").innerHTML = box;
}
//  ternary operator....<td>${list[i].newname ? list[i].newname : list[i].name}</td> 
// variable = (condition) ? expressionTrue : expressionFalse;


function storeProduct() {
    localStorage.setItem("productlist", JSON.stringify(productlist)); // to change any thing to string
}

function deleteproduct(index) {
    productlist.splice(index, 1);
    storeProduct();
    displayproduct(productlist);
}


function searchName(term) {
    var searchlist = [];
    for (var i = 0; i < productlist.length; i++) {
        //change both terms to lowercase to copmare 
        if (productlist[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            //change term search to color:danger
            productlist[i].newname = productlist[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger fw-bold">${term}</span>`);
            searchlist.push(productlist[i]);
        }
    }
    displayproduct(searchlist);
}

//solid system ... single responsability
//Don't repeat your self..DRY
function clearform() {
    ProductName.value = "";
    ProductPrice.value = "";
    Productcatagory.value = "";
    ProductDescription.value = "";
}

function updateproduct(updatedIndex) {
    ProductName.value = productlist[updatedIndex].name;
    ProductPrice.value = productlist[updatedIndex].price;
    Productcatagory.value = productlist[updatedIndex].catagory;
    ProductDescription.value = productlist[updatedIndex].Description;
    addproductbtn.classList.add("d-none");
    updateproductbtn.classList.replace("d-none", "d-block");
    newindex = updatedIndex;
}


function displayUpdatedProduct(index) {
    if (validateProductName() & validateProductPrice() & validateProductCatagory() & validateProductDesc()) {
        var product = {
            name: ProductName.value,
            price: ProductPrice.value,
            catagory: Productcatagory.value,
            Description: ProductDescription.value,
        }
        productlist.splice(index, 1, product);
        displayproduct(productlist);
        addproductbtn.classList.replace("d-none", "d-block");
        updateproductbtn.classList.replace("d-block", "d-none");
        storeProduct();
        clearform(); //clear after add product
    }
}


function validateProductName() {
    var regex = /^[A-Z]([a-z]){1,9}$/;
    if (regex.test(ProductName.value) == true) {
        validatedName.innerHTML = ``;
        return true;
    } else {
        validatedName.innerHTML = `invalid charachter..first character is uppercase then 1 to 9 lowercase `;
        return false;
    }
}

function validateProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(ProductPrice.value) == true) {
        validatedprice.innerHTML = ``;
        return true;
    } else {
        validatedprice.innerHTML = `invalid price..price should be between 1000 to 10000 EGP`
        return false;
    }
}

function validateProductCatagory() {
    var regex = /^(tv|mobile|laptop)$/i;
    if (regex.test(Productcatagory.value) == true) {
        validatedcat.innerHTML = ``;
        return true;
    } else {
        validatedcat.innerHTML = `invalid item..catagory should be tv or laptop or mobile`;
        return false;
    }
}


function validateProductDesc() {
    var regex = /^.{10,}$/s;
    if (regex.test(ProductDescription.value) == true) {
        validatedDesc.innerHTML = ``;
        return true;
    } else {
        validatedDesc.innerHTML = `invalid..minimum character should be 10 char`;
        return false;
    }
}

