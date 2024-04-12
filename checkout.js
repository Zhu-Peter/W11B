let items_JSON = Cookies.get(`cart`);
let items = JSON.parse(items_JSON);
// console.log(items)

let container = document.getElementById("items_container")

if (items.length == 0){
    document.getElementById("items_title").innerHTML = `<h2 style="color: red;" class="item_title">Cart is empty! Add an item by clicking on it's box from the homepage</h2>`
}else{
    refreshPage();
}    

function RemoveItem(){
    // console.log("remove", this)
    items.splice(
        items.findIndex(
          (a) => a.item_name === this.attributes.item_name.value
        ),
        1
      );
      updateCookies(items);
      refreshPage();
      if(items.length === 0){
        document.getElementById("items_title").innerHTML = `<h2 style="color: red;" class="item_title">Cart is empty! Add an item by clicking on it's box from the homepage</h2>`
      }
}

function updateCookies(value) {
    let value_JSON = JSON.stringify(value);
    Cookies.set("cart", value_JSON);
    console.log(value)
}

function refreshPage(){
    container.innerHTML = '';
    for (let i = 0; i<items.length;i++){
        container.insertAdjacentHTML("beforeend", `
        <div class="item" style="display: grid;
        background-color: rgb(212, 243, 255);
        padding: 30px;
        max-width: 50vw">
                    <h1 class="item_title">${items[i].item_name}</h1>
                    <p>${items[i].item_description}</p>
                    <img style="width: 200px;" src="${items[i].item_link}" alt=""><br>
                    <button class="item_button" item_name="${items[i].item_name}">Remove</button>
                </div>
        `)
        document.body.getElementsByClassName(`item_button`)[i].addEventListener('click', RemoveItem)
    }
}