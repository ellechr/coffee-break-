document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');
    const cartItems = document.getElementById('cart-items');
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutChange = document.getElementById('checkout-change');
    const registerButton = document.getElementById('register-button');
    const checkoutButton = document.getElementById('checkout-button');
    const clearButton = document.getElementById('clear-button');
    const registerSection = document.getElementById('register-section');
    const checkoutSection = document.getElementById('checkout-section');
    const continueToCheckoutBtn = document.querySelector('input[type="submit"]');
    const amountGivenInput = document.getElementById('amountgiven');

    products.forEach(product => {
        const addToCartButton = product.querySelector('button');
        addToCartButton.addEventListener('click', () => {
            const productName = product.dataset.name;
            const productPrice = parseFloat(product.dataset.price);
            const quantity = parseInt(product.querySelector('input[name="quantity"]').value);
            const totalPrice = productPrice * quantity;

            const existingItem = cartItems.querySelector(`[data-name="${productName}"]`);
            if (existingItem) {
                const existingQuantity = parseInt(existingItem.querySelector('.quantity').textContent);
                existingItem.querySelector('.quantity').textContent = existingQuantity + quantity;
                existingItem.querySelector('.total-price').textContent = (existingQuantity + quantity) * productPrice;
            } else {
                const li = document.createElement('li');
                li.dataset.name = productName;
                li.innerHTML = `${productName} <span class="quantity">${quantity}</span> x Php ${productPrice} = <span class="total-price">${totalPrice}</span>`;
                cartItems.appendChild(li);
            }

            updateCartTotal();
        });
    });

    function updateCartTotal() {
        const items = cartItems.querySelectorAll('li');
        let total = 0;
        items.forEach(item => {
            total += parseFloat(item.querySelector('.total-price').textContent);
        });
        cartTotal.textContent = total.toFixed(2);
    }

    registerButton.addEventListener('click', () => {
        registerSection.style.display = 'block';
        checkoutSection.style.display = 'none';
    });

    checkoutButton.addEventListener('click', () => {
        checkoutSection.style.display = 'block';
        registerSection.style.display = 'none';
    });

    clearButton.addEventListener('click', () => {
        cartItems.innerHTML = '';
        cartTotal.textContent = '0.00';
    });

    continueToCheckoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = registerSection.querySelectorAll('input[type="text"]');
        let hasMissingInput = false;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                hasMissingInput = true;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (hasMissingInput) {
            alert('Please fill in all fields.');
        } else {
            alert('Thank you for ordering!');
        }
    });

    amountGivenInput.addEventListener('input', () => {
        const amountGiven = parseFloat(amountGivenInput.value) || 0;
        const total = parseFloat(cartTotal.textContent);
        checkoutTotal.textContent = total.toFixed(2);
        checkoutChange.textContent = (amountGiven - total).toFixed(2);
    });
});