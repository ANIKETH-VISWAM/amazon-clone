export let cart = JSON.parse(localStorage.getItem('cart'));





if(!cart){
    cart=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'1'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:3,
        deliveryOptionId:'2'
    }];
   
    
};

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
};

export function addToCart(productId){
    let matchingItem;

    cart.forEach((item)=>{
        if (productId===item.productId){
            matchingItem=item;
        }


    });
    const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
    
    const quantity=Number(quantitySelector.value);
    if (matchingItem){
        matchingItem.quantity+=quantity;
    }else{
        cart.push({
            productId:productId,
            quantity:quantity,
            deliveryOptionId:'1'
        })
    }
    saveToStorage();
};
export function updateCartQuantity(){
        let cartQuantity=0;
        cart.forEach((item)=>{
            cartQuantity+=item.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
        
};



export function deleteProduct(productId){
    let newcart=[];
    cart.forEach((item)=>{
        if(item.productId != productId){
            newcart.push(item);
        }
    })
    cart=newcart;
    saveToStorage();
    
};
export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;

    cart.forEach((item)=>{
        if (productId===item.productId){
            matchingItem=item;
        }


    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
};
