function displayName(){
    let name=document.getElementById("name")
    let currentUser=localStorage.getItem("currentUser")
    let allUsers=JSON.parse(localStorage.getItem("users"));
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].email==currentUser){
            name.innerText=`${allUsers[i].firstName} ${allUsers[i].lastName}`;
            break;
        }
    }
}
displayName();

let shopDiv=document.getElementById("shop")
shopDiv.addEventListener("click",()=>{
    window.location.pathname='../shop/'
})

let cart=localStorage.getItem("cart")

function displayCart(){
    let cart=JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    let display=document.getElementsByClassName("display-items")[0];
    display.innerHTML="";
    cart.forEach((data)=>{
        let container=document.createElement("item-container")
        container.className="item-container";
        let innerHTML=`<div class="image-section"><img src=${data.image}></div>
                        <div class="title">${data.title}</div>
                        <div class="costnsize">
                            <div class="cost">$${data.price}</div>
                            <div class="size">${data.size}</div>
                        </div>
                        <div class="color">${data.color}</div>
                        <div class="rating-section">${data.rating.rate}/5</div>
                        <hr><div class="hiddenid">${data.id}</div>
                        <div class="cart">Remove from Cart</div>`
        container.innerHTML=innerHTML;
        display.append(container)
        let removeFromCart = container.querySelector(".cart");
        removeFromCart.addEventListener("click", removeItemFromCart);   
    })

}

displayCart();


function removeItemFromCart(){
    let cart=JSON.parse(localStorage.getItem("cart"))
    let id=parseInt(this.parentNode.querySelector(".hiddenid").innerText);
    let arr=[];
    for(let i=0;i<cart.length;i++){
        if(cart[i].id!==id){
            arr.push(cart[i])
        }
    }
    localStorage.setItem('cart',JSON.stringify(arr));
    displayCart();
    displayCheckoutList();
}


function displayCheckoutList(){
    let cart=JSON.parse(localStorage.getItem("cart"))
    let rightdiv=document.getElementById("product-name");
    rightdiv.innerHTML="";
    for(let i=0;i<cart.length;i++){
        let div=document.createElement("div");
        div.className="price-container";
        div.innerHTML=`<div class="title">Title: ${cart[i].title}</div>
        <div class="price">Price:$${cart[i].price}</div>
        <div class="quantity">
        <div class='quantity-value'>Quantity: ${cart[i].quantity}</div>
        <div class="hiddenid">${cart[i].id}</div>
          <button class="add">+</button>
          <button class="subtract">-</button>
        </div>`
        rightdiv.append(div)
        let addButton = div.querySelector(".add");
        let subtractButton = div.querySelector(".subtract");
        addButton.addEventListener("click", updateAdd);
        subtractButton.addEventListener("click",updateSubtract);
    }
}

displayCheckoutList();  

function updateAdd(){
    let quantitydiv=this.parentNode.querySelector('.quantity-value');
    let quantity=parseInt(quantitydiv.innerText.split(' ')[1])+1;
    quantitydiv.innerText=`Quantinty: ${quantity}`;
    let cart=JSON.parse(localStorage.getItem("cart"));
    let id=parseInt(this.parentNode.querySelector('.hiddenid').innerText);
    console.log(id);
    for(let i=0;i<cart.length;i++){
        if(cart[i].id==id){
            cart[i].quantity=quantity;
        }
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    updateTotal();
}

function updateSubtract(){
    let quantitydiv=this.parentNode.querySelector('.quantity-value');
    let quantity=parseInt(quantitydiv.innerText.split(' ')[1])-1;
    quantitydiv.innerText=`Quantinty: ${quantity}`;
    let cart=JSON.parse(localStorage.getItem("cart"));
    let id=parseInt(this.parentNode.querySelector('.hiddenid').innerText);
    if(quantity<=0){
        let updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart();
        displayCheckoutList();
    }else{
        for(let i=0;i<cart.length;i++){
            if(cart[i].id==id){
                cart[i].quantity=quantity;
            }
        }
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    updateTotal();
}
let amount=100;
function updateTotal(){
    let cart=JSON.parse(localStorage.getItem("cart"));
    let dollar=document.getElementById("dollar")
    let inr=document.getElementById("inr");
    let sum=0;
    for(let i=0;i<cart.length;i++){
        sum=sum+(cart[i].quantity*cart[i].price);
    }
    inr.innerText=`₹${(sum*82.63).toFixed(2)}`
    amount=parseInt((sum*82.63).toFixed(2));
    sum=sum.toFixed(2);
    dollar.innerText=`$${sum}`;
}
updateTotal();

let checkoutBtn=document.getElementById("payBtn");
console.log(checkoutBtn);
checkoutBtn.addEventListener("click", function () {
    var options = {
        key: "rzp_test_4ysnEOBMvkSBzS", // Enter the Key ID generated from the Dashboard
        amount: amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MeShop. Checkout",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
          color: "#122620",
        },
        image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
        handler: function () {
          location.href = "./shop.html";
        },
        options: {
          checkout: {
            method: {
              netbanking: 0,
              card: 0,
              upi: 1,
              wallet: 0,
            },
          },
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
  });