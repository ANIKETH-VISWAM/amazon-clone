
import { cart,deleteProduct,updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
function renderDeliveryOption(){


    let cartSummaryHtml='';


    cart.forEach((item)=>{
        const productId=item.productId;
        let matchingProduct;
        products.forEach((product)=>{
            if (product.id===productId){
                matchingProduct=product;
            }
        });
        
    const deliveryOptionId=item.deliveryOptionId;
    let delivaryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
            delivaryOption=option;
        }
    })
    const today=dayjs();
    const deliveryDate=today.add(delivaryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');


        cartSummaryHtml+=`
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            $${(matchingProduct.priceCents/100).toFixed(2)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
        ${deliveryOptionsHTML(matchingProduct,item)};
        </div>
        </div>
    </div>
        `
    });
    function deliveryOptionsHTML(matchingProduct,item){
        let html='';
        deliveryOptions.forEach((deliveryOption)=>{
            const today=dayjs();
            const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
            const dateString=deliveryDate.format('dddd, MMMM D');
            const priceString=deliveryOption.priceCents===0
            ? 'FREE'
            :`${(deliveryOption.priceCents/100).toFixed(2)}`;
            const ischecked=deliveryOption.id===item.deliveryOptionId
            html+=`
                <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
                <input type="radio" ${ischecked ?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>    
            
            `
        })
        return html;
    }
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
        const productId= link.dataset.productId;
        deleteProduct(productId);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantity();
        });
        

    });

    function updateCartQuantity(){
        let cartQuantity=0;
            cart.forEach((item)=>{
                cartQuantity+=item.quantity;
            });

    document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} items`;
    };
    updateCartQuantity();
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderDeliveryOption();
        });
    });

};
renderDeliveryOption();

