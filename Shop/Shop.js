document.addEventListener("DOMContentLoaded", function() {
    // Selecting important DOM elements and initializing an empty cart array.
    const cartItemsContainer = document.querySelector('.cart-items');
    const feedbackElement = document.querySelector('.feedback');
    const checkoutButton = document.querySelector('.checkout-btn');
    const totalPriceElement = document.querySelector('.total-price');
    let cart = [];

    // Function to add items to the cart.
    function addToCart(product, price, size = null, color = null) {
        const cartItem = {
            product: product,
            price: price,
            size: size,
            color: color
        };
        cart.push(cartItem);
        updateCartDisplay();
    }

    // Function to update the cart display.
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear the current cart display.
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price;
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.product}</span>
                ${item.size ? `<span>Size: ${item.size}</span>` : ''}
                ${item.color ? `<span>Color: ${item.color}</span>` : ''}
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

        // Adding event listeners to remove buttons.
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    // Function to remove items from the cart.
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    // Handler for adding items to the cart.
    function handleAddToCart(event) {
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const productElement = event.target.closest('.product');
        const size = productElement.querySelector('select[id^="size"]')?.value || null;
        const color = productElement.querySelector('select[id^="color"]')?.value || null;
        addToCart(product, price, size, color);
    }

    // Function to generate a reference number.
    function generateReferenceNumber() {
        return 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Handler for the checkout process.
    function handleCheckout() {
        if (cart.length === 0) {
            feedbackElement.textContent = 'No products in the cart.';
            setTimeout(() => {
                feedbackElement.textContent = '';
            }, 1000);
        } else {
            const totalPrice = cart.reduce((total, item) => total + item.price, 0);
            const referenceNumber = generateReferenceNumber();
            
            // Store total price and reference number in localStorage
            localStorage.setItem('totalPrice', totalPrice.toFixed(2));
            localStorage.setItem('referenceNumber', referenceNumber);
            
            // Redirect to checkout page
            window.location.href = './Checkout.html';
        }
    }

    // Adding event listeners to "Add to Cart" buttons.
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Adding event listener to the checkout button.
    checkoutButton.addEventListener('click', handleCheckout);

    // Adding hover effect for product images.
    const products = document.querySelectorAll('.product img');
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.style.transform = 'scale(1.05)';
            product.style.transition = 'transform 0.3s ease';
        });
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'scale(1)';
        });
    });
});

// Function to sort products by price
function sortProducts(sortOrder) {
    let products = document.querySelector('.product-list');
    let sortedProducts = Array.from(products.children).sort((a, b) => {
        let priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        let priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
        if (sortOrder === 'low-high') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    products.innerHTML = '';
    sortedProducts.forEach(product => products.appendChild(product));
}

// Event listener for radio buttons to sort products
document.querySelectorAll('input[name="sort"]').forEach(input => {
    input.addEventListener('change', () => {
        sortProducts(input.value);
    });
});

// Function to handle checkout
function handleCheckout() {
    // Get the total price
    let totalPrice = calculateTotalPrice(); // Implement your calculation logic

    // Store the total price in localStorage
    localStorage.setItem('totalPrice', totalPrice);

    // Redirect to checkout page
    window.location.href = './checkout.html';
}

