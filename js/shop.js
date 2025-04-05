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
    
    actualizeCountProduct();
    applyPromotionsCart(product);
}

// Exercise 2
function cleanCart() {

    let number = document.getElementById("count_product");
    let totalPriceResult = document.getElementById("total_price");

    number.innerHTML = 0;
    totalPriceResult.innerHTML = 0;

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

    let totalPriceResult = document.getElementById("total_price");
    
    total = 0;
    
    let cartTotal = 0;
    
    for(let i = 0; i < cart.length; i++){
        let subtotal = cart[i].subtotalWithDiscount;
        cartTotal += parseFloat(subtotal)
    }
    
    total = cartTotal.toFixed(2)
    
    totalPriceResult.innerHTML = total;
}

// Exercise 4
function applyPromotionsCart(product) {
  
    let productId = product.id
    let productPrice = product.price;
    let productQuantity = product.quantity;

    let totalPrice = productPrice * productQuantity;

    if(productId == 1 || productId == 3){
        if(productQuantity >= product.offer.number){
            let totalDiscountPrice = (productPrice - (productPrice * (product.offer.percent / 100))) * productQuantity;
            product.subtotalWithDiscount = totalDiscountPrice.toFixed(2);
        } else {
            product.subtotalWithDiscount = totalPrice.toFixed(2);
        }
    } else {
        product.subtotalWithDiscount = totalPrice.toFixed(2);
    }

}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    for(let product of cart){

        let productId = product.id
        let productName = product.name;
        let productPrice = product.price;
        let productQuantity = product.quantity;
        let productWithDiscount = product.subtotalWithDiscount;
        
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
        newQuantity.id = "product-quantity-id-" + productId;
        newQuantity.textContent = productQuantity;
        newProduct.appendChild(newQuantity);

        let newDiscount = document.createElement("th");
        newDiscount.id = "product-discount-id-" + productId;
        newDiscount.textContent = productWithDiscount;
        newProduct.appendChild(newDiscount);

        let newButton = document.createElement("th");
        let theButton = document.createElement("button");
        theButton.id = "button-for-product-id-" + productId;
        theButton.classList.add("btn");
        theButton.classList.add("btn-outline-dark");
        theButton.textContent = "Remove";
        newButton.appendChild(theButton);
        newProduct.appendChild(newButton);

        container.appendChild(newProduct);

        let removeButton = document.getElementById("button-for-product-id-" + productId);
        removeButton.addEventListener("click", () => {
            removeFromCart(productId);
        });

    }    

}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
   
    let existingProduct = document.getElementById("product-" + id);
    let totalPriceResult = document.getElementById("total_price");
    let number = document.getElementById("count_product");
    let productQuantityElement = document.getElementById("product-quantity-id-" + id);
    let productWithDiscountElement = document.getElementById("product-discount-id-" + id);

    const productById = cart.find(product => product.id == id);
        
    if(productById.quantity < 2){
        
        const index = cart.indexOf(productById);
        cart.splice(index, 1);

        existingProduct.remove();

    } else {
        
        productById.quantity--
        
        applyPromotionsCart(productById);
 
        productQuantityElement.textContent = productById.quantity;
        productWithDiscountElement.textContent = productById.subtotalWithDiscount;

    }

    if(cart.length >= 1){
        number.innerHTML = cart.length;
    }else{
        number.innerHTML = 0;
    }

    total -= productById.subtotalWithDiscount;
    
    totalPriceResult.innerHTML = total.toFixed(2);

}

function open_modal(){
    printCart();
    calculateTotal();
}