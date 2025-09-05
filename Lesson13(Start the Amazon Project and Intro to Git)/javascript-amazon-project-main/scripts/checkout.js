import { cart, deleteFromCart, updateFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { priceFormat } from "./utils/priceFormat.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let productHtml='';
let matchingItem;
cart.forEach((cartItem)=>{
  let productId = cartItem.productId;

  products.forEach((product)=>{
    if(product.id === productId){
      matchingItem = product;
      productHtml += 
      `
        <div class="cart-item-container 
        js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                $${priceFormat(matchingItem.priceCents)}
              </div>
              <div class="product-quantity js-product-quantity-${matchingItem.id}">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id= "${matchingItem.id}">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id= "${matchingItem.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingItem)}
            </div>
          </div>
        </div>
      `;
    }
  }); 
});
document.querySelector(".js-order-summary").innerHTML = productHtml;

document.querySelectorAll('.js-delete-quantity').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    deleteFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll('.js-update-quantity').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    updateFromCart(productId);
  })
});

let cartItems = 0;
cart.forEach(()=>{
  cartItems+=1;
});
let cartItemHtml =`${cartItems} items`;
document.querySelector(".js-cart-item").innerHTML = cartItemHtml;

function deliveryOptionsHTML(matchingItem) {
  let html ='';
  deliveryOptions.forEach((deliveryOptions) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOptions.deliveryDate, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOptions.priceCents
     === 0 
     ? 'FREE'
     : `$${priceFormat(deliveryOptions.priceCents)}`;
    html +=
    `
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
      </div>
    </div>
    `
  });
  return html;
}