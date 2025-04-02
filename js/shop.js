// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
    for(let i = 0; i < products.length; i++){
        let product = products[i]
        let idActual = product.id
        let inCart = false
        if(id == idActual){
            for(let j = 0; j < cart.length; j++){
                let cartProduct = cart[j]
                if(product == cartProduct){
                    inCart = true
                }
            }
            if(inCart){
                product.quantity += 1
            } else {
                product.quantity = 1
                cart.push(product)
            }
        }
    }
    const actualizeCountProduct = () => {
        let number = document.getElementById("count_product");
        const count = cart.reduce((acum, current) => acum + current.quantity, 0);
        number.innerHTML = `${count}`
    }
    
    const product = products.find(product => product.id == id);
    let productId = product.id
    let productName = product.name;
    let productPrice = product.price;
    let productQuantity = product.quantity;
    let productWithDiscount = product.subtotalWithDiscount;

    actualizeCountProduct();
    applyPromotionsCart();
    printCart(productId, productName, productPrice, productQuantity, productWithDiscount);
}

// Exercise 2
function cleanCart() {
    
    for(let i of cart){
        let productId = i.id;
        let product = document.getElementById("product-" + productId);
        product.remove();
    }
    cart.splice(0, cart.length);
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        let product = cart[i];
        let productPrice = product.price;
        if(product.quantity > 1){
            if(product.subtotalWithDiscount == undefined){
                productPrice = productPrice * product.quantity;
            }else{
                productPrice = product.subtotalWithDiscount * product.quantity;
            }
        }
        total += productPrice;
    }
    total = total.toFixed(2);
    return total
}

// Exercise 4
function applyPromotionsCart() {
    cart.forEach(item => {
        if(item.id == 1 || item.id == 3){
            if(item.quantity >= item.offer.number){
                let totalPrice = (item.price - (item.price * (item.offer.percent / 100))) * item.quantity;
                item.subtotalWithDiscount = totalPrice.toFixed(2)
            } else {
                let totalPrice = item.price * item.quantity;
                item.subtotalWithDiscount = totalPrice.toFixed(2)
            }
        } else {
            let totalPrice = item.price * item.quantity;
            item.subtotalWithDiscount = totalPrice.toFixed(2)
        }
    })
    console.log(cart)
}

// Exercise 5
function printCart(productId, productName, productPrice, productQuantity, productWithDiscount) {
    // Fill the shopping cart modal manipulating the shopping cart dom

    let existingProduct = document.getElementById("product-" + productId);
    if(existingProduct) {
        existingProduct.remove();
    }
    
    let container = document.getElementById("cart_list");
    
    let newProduct = document.createElement('tr');
    newProduct.id = "product-" + productId;
    
    let newName = document.createElement("th");
    newName.textContent = productName;
    newProduct.appendChild(newName);
    
    let newPrice = document.createElement("th");
    newPrice.textContent = productPrice;
    newProduct.appendChild(newPrice);

    let newQuantity = document.createElement("th");
    newQuantity.textContent = productQuantity;
    newProduct.appendChild(newQuantity);

    let newDiscount = document.createElement("th");
    newDiscount.textContent = productWithDiscount;
    newProduct.appendChild(newDiscount);

    container.appendChild(newProduct);

    let totalPriceResult = document.getElementById("total_price");
    totalPriceResult.innerHTML = 0;
    const totalPrice = calculateTotal();
    totalPriceResult.innerHTML = totalPrice;

}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}

function open_modal() {
    printCart();
}