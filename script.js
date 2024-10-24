document.addEventListener("DOMContentLoaded", () => {
    
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 39.99 },
        { id: 3, name: "Product 3", price: 49.99 },
    ];
    
    let cart = []
    
    products.forEach(product => {

        const productDiv = document.createElement('div');

        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>`;

        productList.appendChild(productDiv);

    });

    productList.addEventListener('click', (e) => {

        if(e.target.tagName === "BUTTON") {

            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId );
            //console.log(product);
            addToCart(product);
        }

    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {

        cartItems.innerHTML = "";
        let totalPrice = 0

        if(cart.length > 0){

            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');

            cart.forEach(item => {

                totalPrice += item.price;

                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)}
                <button data-id="${item.id}">Remove</button>`
                
                cartItem.style.padding = '2px';
                cartItem.style.display = 'flex';
                cartItem.style.alignItems = 'center';
                cartItem.style.justifyContent = 'space-between';

                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`

            });
        }else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
        }
        
    }

    cartItems.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON"){
            const removeProductId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(removeProductId); 
        }
    });

    function removeFromCart(productId) {
        cart = cart.filter((product) => product.id !== productId); // Remove the product
        renderCart(); // Re-render the cart
    }

    checkoutBtn.addEventListener('click', ()=> {
        cart.length = 0
        alert("Checkout Successfully!")
        renderCart();
    });

});









