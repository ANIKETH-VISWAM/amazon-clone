import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((item) => {
        const product=getProduct(item.productId);
        productPriceCents+=product.priceCents*item.quantity;
        const deliveryOption=getdeliveryOption(item.deliveryOptionId);
        shippingPriceCents+=deliveryOption.priceCents
        
    });
    console.log(productPriceCents);
    console.log(shippingPriceCents);
    const totalBeforeTax=productPriceCents+shippingPriceCents;
    console.log(totalBeforeTax);
    const taxCents=totalBeforeTax*0.05;
    const totalCents=totalBeforeTax+taxCents;
    console.log(taxCents);
    console.log(totalCents);
    const paymentSummaryHTML=`
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)})</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
            
    
    
    `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}