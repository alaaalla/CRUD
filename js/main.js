var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var save = document.getElementById("save");
var counter;
var productsList;
localStorage.getItem("productsList") == null ? productsList = [] : productsList = JSON.parse(localStorage.getItem("productsList"));
displayProduct(productsList);
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value
  };
  if (validateName() && validatePrice() && validateCategory() && validateDesc()) {
    productsList.push(product);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProduct(productsList);
    validateName();
    validatePrice();
    validateCategory();
    validateDesc();
    clearInput();
    save.classList.add("d-none");
  }
}

function displayProduct(data) {
  var cartona = ``;
  for (var i = 0; i < data.length; i++) {
    cartona += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].newName ? data[i].newName : data[i].name}</td>
            <td>${data[i].price}</td>
            <td>${data[i].category}</td>
            <td>${data[i].description}</td>
            <td><button class="btn btn-warning" onclick ="UpdateProduct(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function deleteProduct(index) {
  productsList.splice(index, 1)
  localStorage.setItem("productsList", JSON.stringify(productsList));
  displayProduct(productsList);
}

function clearInput() {
  productName.value = '',
    productPrice.value = '',
    productCategory.value = '',
    productDescription.value = ''
};

function UpdateProduct(index) {
  productName.value = productsList[index].name,
    productPrice.value = productsList[index].price,
    productCategory.value = productsList[index].category,
    productDescription.value = productsList[index].description,
    counter = index;
  save.classList.remove("d-none")
}

function saveUpdate() {
  productsList[counter].name = productName.value,
    productsList[counter].price = productPrice.value,
    productsList[counter].category = productCategory.value,
    productsList[counter].description = productDescription.value
  localStorage.setItem("productsList", JSON.stringify(productsList));
  displayProduct(productsList);
  save.classList.add("d-none");
  clearInput();
}
function validateName() {
  var regex = /^[A-Z]/;
  if (regex.test(productName.value)) {
    productName.style.border = "none";
    document.getElementById("invalidName").classList.add("d-none");
    return true;
  }
  else {
    productName.style.border = "solid 4px red";
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  }
}
function validatePrice() {
  var regex = /^[0-9]+/
  if (regex.test(productPrice.value)) {
    productPrice.style.border = "none";
    document.getElementById("invalidNumber").classList.add("d-none");
    return true;
  }
  else {
    productPrice.style.border = "solid 4px red";
    document.getElementById("invalidNumber").classList.remove("d-none");
    return false;
  }
}
function validateCategory() {
  var regex = /^[A-Z]/
  if (regex.test(productCategory.value)) {
    productCategory.style.border = "none";
    document.getElementById("invalidCategory").classList.add("d-none");
    return true;
  }
  else {
    productCategory.style.border = "solid 4px red";
    document.getElementById("invalidCategory").classList.remove("d-none");
    return false;
  }
}
function validateDesc() {
  var regex = /^[A-Z]/;
  if (regex.test(productDescription.value)) {
    productDescription.style.border = "none";
    document.getElementById("invalidDescription").classList.add("d-none");
    return true;
  }
  else {
    productDescription.style.border = "solid 4px red";
    document.getElementById("invalidDescription").classList.remove("d-none");
    return false;
  }
}
function searchProduct(input) {
  var newProductsList = [];
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].name.toLowerCase().includes(input.toLowerCase())) {
      var output = input.match(/[a-zA-Z]/ig);
      console.log(output);
      productsList[i].newName = productsList[i].name.replaceAll(output, `<span class="text-success">${input}</span>`)
      newProductsList.push(productsList[i]);
    }
    displayProduct(newProductsList);
  }
}