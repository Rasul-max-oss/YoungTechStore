
//Перемещение корзины при скролле

/*
window.addEventListener('scroll', function() {
    var cartIcon = document.getElementById('cartIcon');
    var scrollTop = window.scrollY;
    var windowHeight = window.innerHeight;

    cartIcon.style.transform = 'translateY(' + scrollTop + 'px)';
});

*/





const orderButtons = document.querySelectorAll('#order-border');
let cartItems = [];
let shopItem = 0;

const icon = document.getElementById('cartIconItem');
const finalPrice = document.getElementById("finalPrice");


function editPrice(priceString){
    let price = parseFloat(priceString.replace(/\s+/g, ''));    
    return price;
}

orderButtons.forEach(button => {
    let flag = true;

    button.addEventListener('click', function() {
        const productItem = button.parentElement;
        const productName = productItem.querySelector('h3').textContent;
        const priceStr= productItem.querySelector('.new-price').textContent;
        const productPrice = editPrice(priceStr); //переводим цену  строку в число
        const productImage = productItem.querySelector('img').src;

       
        const productData = {
            name: productName,
            price: productPrice,
            image: productImage
        };
        editPrice(productImage,);
        if (flag) {
            shopItem++;
            button.innerHTML = "Убрать";
            cartItems.push(productData);
            flag = false;
        } else {
            shopItem--;
            button.innerHTML = "Заказать";
            cartItems = cartItems.filter(item => item.name !== productName);
            flag = true;
        }

        icon.innerHTML = "🛒" + shopItem;

        console.log(cartItems); // Для проверки, что товары добавляются и удаляются корректно
        console.log(cartItems[0].name);
    });
});




const modal = document.getElementById('cartModal');
const modalContent = document.getElementById('cartItems');
const span = document.getElementsByClassName('close')[0];

icon.addEventListener('click', function() {  
    modalContent.innerHTML = ''; // Очистим содержимое, чтобы избежать дублирования  

    cartItems.forEach(item => {  
        const itemDiv = createCartItem(item);
        modalContent.appendChild(itemDiv);  

    });  

    console.log(cartItems)

    modal.style.display = 'block';  
});

//Функция добавление  продукта в массив
function pushProduct(item){
    const productItem = item.parentElement.parentElement;
    console.log(productItem);

    const productName = productItem.querySelector('.itemTitle').textContent;
    let productPriceStr = productItem.querySelector('.itemPrice').textContent;
    const productPrice = editPrice(productPriceStr);
    const productImage = productItem.querySelector('img').src;
    console.log(productName);
    console.log(productPrice);
    console.log(productImage);

    const productData = {
        name: productName,
        price: productPrice,
        image: productImage
    };
    cartItems.push(productData)
    console.log(cartItems)
}
//Функция удаление продукта из массива
function removeProduct(item,counter) { 
    const productItem = item.parentElement.parentElement; 
    
    const productName = productItem.querySelector('.itemTitle').textContent; 
   
    // Находим индекс продукта в cartItems
    const productIndex = cartItems.findIndex(product => product.name === productName); 

    if(counter<1){
        productItem.remove();
    }

    
    // Если продукт найден, удаляем его
    if (productIndex !== -1) {
        cartItems.splice(productIndex, 1);
        console.log("Удалён продукт: ${productName}"); 
    } else {
        console.log("Продукт с именем ${productName} не найден в корзине."); 
    }

    console.log(cartItems,productItem); 
   
}


function createCartItem(item) {
    const itemDiv = document.createElement('div');  
    itemDiv.className = "cartItem";  

    // Создаем изображение 
    const img = document.createElement('img'); 
    img.src = item.image; 
    img.width = 200; 
    img.height = 200; 
    itemDiv.appendChild(img); 

    // Создаем заголовок 
    const itTitle = document.createElement('p'); 
    itTitle.className = "itemTitle"; 
    itTitle.textContent = item.name;  
    itemDiv.appendChild(itTitle); 

    // Создаем контейнер для счетчика 
    const counterContainer = document.createElement('div');  
    counterContainer.className = "counter-container";  

    let counter = 1; 
    const itCount = document.createElement('span');  
    itCount.textContent = counter;  

    // Создаем кнопки и счетчик 
    const btnDecrease = createButton("-", () => {
        if (counter > 1) { 
            counter--; 
            updatePrice(itPrice, item.price, counter);
            removeProduct(btnDecrease,counter);
            itCount.textContent = counter; 
        } 
    });

   
    const btnIncrease = createButton("+", () => {
        counter++; 
        pushProduct(btnDecrease);
        updatePrice(itPrice, item.price, counter);
        itCount.textContent = counter; 
    });

    counterContainer.appendChild(btnDecrease);  
    counterContainer.appendChild(itCount);  
    counterContainer.appendChild(btnIncrease);  
    itemDiv.appendChild(counterContainer);  

    // Создаем цену 
    const itPrice = document.createElement('p');  
    itPrice.className = "itemPrice"; // Добавляем класс для стилизации 
    updatePrice(itPrice, item.price, counter);//обновляем цену учитывая количество
    itemDiv.appendChild(itPrice);  

    return itemDiv;
}

//Для создание кнопки
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

//обновление цены 
function updatePrice(priceElement, priceString, quantity) {
    let summ=0;
    if(cartItems.length !=0){
       cartItems.forEach(el =>{
        summ+=el.price;
       });
    }
    console.log(summ);

    let price = priceString;    
    
    priceElement.textContent = (price * quantity); //цену умножаем на количество
    finalPrice.textContent = summ;
}


// Закрытие модального окна при нажатии на крестик
span.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие модального окна при нажатии вне его
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});



