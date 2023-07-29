let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteall = document.getElementById("deleteAll");
let mood = "Create";
let temp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (mood === "Create") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        dataPro.push(newpro);
      }
    } else {
      dataPro.push(newpro);
    }
  } else {
    dataPro[temp] = newpro;
    mood = "Create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += ` 
         <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateItem(${i})'id="update">update</button></td>
        <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>

    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  if (dataPro.length > 0) {
    deleteall.innerHTML = `<button onclick="deleteAll()" >Delete All(${dataPro.length})</button>`;
  } else {
    deleteall.innerHTML = "";
  }
}
showData();

function deleteItem(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function updateItem(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  getTotal();
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function SearchBy(id) {
  let SearchBox = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    SearchBox.placeholder = "Search by " + searchMood;
  } else {
    searchMood = "category";
    SearchBox.placeholder = "Search by " + searchMood;
  }
  console.log(searchMood);
  SearchBox.focus();
  SearchBox.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if ((searchMood == "title")) {
      if (dataPro[i].title.includes(value)) {
        table += ` 
            <tr>
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td><button onclick='updateItem(${i})'id="update">update</button></td>
           <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>
       </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += ` 
            <tr>
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td><button onclick='updateItem(${i})'id="update">update</button></td>
           <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>
   
       </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
