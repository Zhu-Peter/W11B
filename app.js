let items_JSON = Cookies.get(`cart`);
let selected_items = [];
if (!(items_JSON === undefined)){
  selected_items = JSON.parse(items_JSON);
}
let cart_items = document.body.getElementsByClassName(`item`);

for (let i = 0; i < cart_items.length; i++) {
  cart_items[i].addEventListener("click", addToCart);

  if (!(selected_items.find(a => a.item_name === cart_items[i].getElementsByClassName('item_title')[0].innerHTML) == undefined)) {
    cart_items[i].style.border = 'solid green 2px';
  }
}

function addToCart() {
  if (!(selected_items.find(a => a.item_name === this.getElementsByClassName('item_title')[0].innerHTML) == undefined)) {
    selected_items.splice(
      selected_items.findIndex(
        (a) => a.item_name === this.getElementsByClassName('item_title')[0].innerHTML
      ),
      1
    );
    updateCookies(selected_items);
  } else {
    this.style.border = 'solid green 2px';

    let item_selection = {
      item_name: this.getElementsByClassName('item_title')[0].innerHTML,
      item_description: this.getElementsByClassName('item_description')[0].innerHTML,
      item_link: this.getElementsByClassName('item_image')[0].attributes.src.value,
    };
    selected_items.push(item_selection);
    updateCookies(selected_items);
  }
}

function updateCookies(value) {
  let value_JSON = JSON.stringify(value);
  Cookies.set("cart", value_JSON);
  console.log(value)
}
