document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productImage = document.getElementById('product-image').files[0];
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productVideo = document.getElementById('product-video').value;

        if (productImage && productName && productPrice && productVideo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const product = {
                    image: e.target.result,
                    name: productName,
                    price: productPrice,
                    video: productVideo
                };

                // Сохранение товара в localStorage
                let products = JSON.parse(localStorage.getItem('products')) || [];
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));

                // Очистка формы
                productForm.reset();

                // Обновление списка товаров
                displayProducts();
            };
            reader.readAsDataURL(productImage);
        }
    });

    function displayProducts() {
        productList.innerHTML = '';
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const name = document.createElement('div');
            name.classList.add('product-item-name');
            name.textContent = product.name;

            const price = document.createElement('div');
            price.classList.add('product-item-price');
            price.textContent = product.price;

            const videoLink = document.createElement('a');
            videoLink.href = product.video;
            videoLink.target = '_blank';
            videoLink.textContent = 'Обзор на YouTube';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('product-item-delete');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', function() {
                products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            });

            productItem.appendChild(img);
            productItem.appendChild(name);
            productItem.appendChild(price);
            productItem.appendChild(videoLink);
            productItem.appendChild(deleteButton);

            productList.appendChild(productItem);
        });
    }

    // Отображение товаров при загрузке страницы
    displayProducts();
});
