export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
 cart = [
    {
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionsId: '1'
    },
    {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionsId: '2'
    }
  ];
} 


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
    productId: productId,
    quantity: 1,
    deliveryOptionsId: '1'
  });
  }
  saveToStorage();
}

export function deleteFromCart(productId) {
  const newcart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  saveToStorage();
}

function saveQuantity(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity = quantity;
  }
  saveToStorage();
}

export function updateFromCart(productId) {
  let updateHtml= '';

  cart.forEach((cartItem)=> {
    if(cartItem.productId === productId) {
      updateHtml = 
      `
        <p>
          <input id="quantity-${productId}" class="js-quantity" style="width: 30px; height: 10px;" placeholder="${cartItem.quantity}">
          <span class="save-quantity-link link-primary js-save-quantity" data-product-id= "${productId}">
            Save
          </span>
        </p>  
      `;

      document.querySelector(`.js-product-quantity-${productId}`).innerHTML = updateHtml;

      const elementSaveBtn = document.querySelector('.js-save-quantity');
      
      elementSaveBtn.addEventListener('click', ()=> {
        const elementQuantity = document.querySelector(".js-quantity").value;
        saveQuantity(productId, elementQuantity);
        updateHtml=
        `
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-quantity" data-product-id= "${cartItem.productId}">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id= "${cartItem.productId}">
          Delete
        </span>
        `;
        console.log(updateHtml);
        document.querySelector(`.js-product-quantity-${productId}`).innerHTML = updateHtml;
      });
    }
  });
}


