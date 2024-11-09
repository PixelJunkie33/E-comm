let lastScrollTop = 0;
const topBar = document.getElementById("topBar");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // User is scrolling down
        topBar.classList.add("hidden");
    } else {
        // User is scrolling up
        topBar.classList.remove("hidden");
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

fetch('productList_01.json')
    .then(response => response.json())
    .then(data => {
        const productGrid = document.getElementById('product-grid');
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';

            const imageUrl = JSON.parse(product.image)[0];
            productDiv.innerHTML = `
                <img src="${imageUrl}" alt="${product.product_name}" class="img-fluid product-img">
                <div class="product-name mb-4 mt-4">${product.product_name}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="price">$${product.discounted_price.toFixed(2)}</span>
                        <span class="original-price text-muted" style="text-decoration: line-through; font-size: 10px;">
                            $${product.retail_price.toFixed(2)}
                        </span>
                    </div>
                    <div class="cart">
                        <!-- Cart icon SVG here -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
                    </div>
                </div>
            `;

            productGrid.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error:', error));
