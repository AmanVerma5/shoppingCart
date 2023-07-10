// https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg

async function getData(){
    let response=await fetch("https://fakestoreapi.com/products")
    let data=await response.json();
    addData(data)
}
let fetchedData=[];
function addData(data){
    data.forEach((element)=>{
        let color=getRandomColor();
        let size=getRandomSize();
        element.color=color;
        element.size=size;
    })
    fetchedData=data;
    console.log(data)
    displayItmes(data)
}

getData();


function getRandomColor(){
    let x=['red', 'blue', 'green', 'black', 'white'];
    let random=Math.floor(Math.random()*5);
    return x[random];
}

function getRandomSize(){
    let size=['S','L','M','XL']
    let random=Math.floor(Math.random()*4);
    return size[random];
}


function displayItmes(data){
    let mensSection=document.getElementById("mens-clothing");
    let womensSection=document.getElementById("womens-clothing")
    let jewellerySection=document.getElementById("display-jewellery")
    let electronicsSection=document.getElementById("display-electronics")
    for(let i=0;i<data.length;i++){
        let container=document.createElement("item-container")
        container.className="item-container";
        let innerHTML=`<div class="image-section"><img src=${data[i].image}></div>
                        <div class="title">${data[i].title}</div>
                        <div class="costnsize">
                            <div class="cost">$${data[i].price}</div>
                            <div class="size">${data[i].size}</div>
                        </div>
                        <div class="color">${data[i].color}</div>
                        <div class="rating-section">${data[i].rating.rate}/5</div>
                        <hr><div id="hiddenid">${data[i].id}</div>
                        <div class="cart">Add to Cart</div>`
        container.innerHTML=innerHTML;
        if(data[i].category=="men's clothing"){   
            let div=mensSection.getElementsByClassName("display-items")[0];
            div.append(container);
        }else
        if(data[i].category=="women's clothing"){ 
            let div=womensSection.getElementsByClassName("display-items")[0];
            div.append(container);
        } else     
        if(data[i].category=="jewelery"){   
            let div=jewellerySection.getElementsByClassName("display-items")[0]; 
            div.append(container);
        }   else{
            let div=electronicsSection.getElementsByClassName("display-items")[0];
            div.append(container);
        }
        let addToCartButton = container.querySelector(".cart");
       addToCartButton.addEventListener("click", addToCart);   
    }
    
}


const buttons = document.querySelectorAll("#tag-search button");
buttons.forEach((button)=>{
    button.addEventListener("click",()=>filterUsingTag(button))
})

function filterUsingTag(button){
    clearAllFilters()
    if(button.style.backgroundColor!=="black"){
        buttons.forEach((element)=>{
            element.style.backgroundColor="white"
            element.style.color="black"
        })
        button.style.backgroundColor="black"
        button.style.color="white"
        let mensSection=document.getElementById("mens-clothing");
        let womensSection=document.getElementById("womens-clothing")
        let jewellerySection=document.getElementById("display-jewellery")
        let electronicsSection=document.getElementById("display-electronics")
        let filterSection=document.getElementById("display-filters");
        if(button.id=="all"){
            mensSection.style.display="block";
            womensSection.style.display="block";
            jewellerySection.style.display="block";
            electronicsSection.style.display="block";
            filterSection.style.display="none";
        }else if(button.id=="mens"){
            mensSection.style.display="block";
            womensSection.style.display="none";
            jewellerySection.style.display="none";
            electronicsSection.style.display="none";
            filterSection.style.display="none";
        }else if(button.id=="womens"){
            mensSection.style.display="none";
            womensSection.style.display="block";
            jewellerySection.style.display="none";
            electronicsSection.style.display="none";
            filterSection.style.display="none";
        }else if(button.id=="jewellery"){
            mensSection.style.display="none";
            womensSection.style.display="none";
            jewellerySection.style.display="block";
            electronicsSection.style.display="none";
            filterSection.style.display="none";
        }else{
            mensSection.style.display="none";
            womensSection.style.display="none";
            jewellerySection.style.display="none";
            electronicsSection.style.display="block";
            filterSection.style.display="none";
        }
    }
}

function clearAllFilters(){
    const inputs = document.querySelectorAll("#filter-container input");
    inputs.forEach((input)=>{
        input.checked=false;
        })
}

const apply=document.querySelector("#filter-container button");
apply.addEventListener("click",()=>{
    clearTagSearch()
    applyfilters()
})


function clearTagSearch(){
    buttons.forEach((button)=>{
        button.style.backgroundColor="white"
        button.style.color="black"
    })
}

function applyfilters(){
    let colors=document.querySelectorAll("#filtercolors input")
    let sizes=document.querySelectorAll("#filtersizes input")
    let range=document.querySelector("#filterratings input")
    let prices=document.querySelectorAll("#filterprices input")

    let selectedColors=[];
    let selectedSizes=[];
    let selectedRange=range.value;
    let selectedPrices=[];

    colors.forEach((color)=>{
        if(color.checked==true){
            selectedColors.push(color.id)
        }
    })
    sizes.forEach((size)=>{
        if(size.checked==true){
            selectedSizes.push(size.id)
        }
    })
    prices.forEach((price)=>{
        if(price.checked==true){
            selectedPrices.push(price.id)
        }
    })


    let mensSection=document.getElementById("mens-clothing");
    let womensSection=document.getElementById("womens-clothing")
    let jewellerySection=document.getElementById("display-jewellery")
    let electronicsSection=document.getElementById("display-electronics")
    let filterSection=document.getElementById("display-filters");
    let display=filterSection.getElementsByClassName("display-items")[0];
    display.innerHTML="";
    mensSection.style.display="none";
    womensSection.style.display="none";
    jewellerySection.style.display="none";
    electronicsSection.style.display="none";
    filterSection.style.display="block";

    let filteredData = fetchedData;

   
  
    if (selectedColors.length > 0) {
      filteredData = filteredData.filter((item) => selectedColors.includes(item.color));
    }
  
    if (selectedSizes.length > 0) {
      filteredData = filteredData.filter((item) => selectedSizes.includes(item.size));
    }
    if(selectedPrices.length>0){
        filteredData = filteredData.filter((item) => {
            for(let i=0;i<selectedPrices.length;i++){
                if(selectedPrices[i]=='$0'){
                    if(item.price>=0 && item.price<=25) return item;
                }else if(selectedPrices[i]=='$26'){
                    if(item.price>=26 && item.price<=50) return item;
                }else if(selectedPrices[i]=='$51'){
                    if(item.price>=51 && item.price<=100) return item;
                }else if(selectedPrices[i]=="$101"){
                    if(item.price>=101) return item;
                }
            }
        });
    }

    filteredData=filteredData.filter((item)=>{
        if(item.rating.rate<=selectedRange) return item;
    })


    filteredData.forEach((data)=>{
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
                            <hr><div id="hiddenid">${data.id}</div>
                            <div class="cart">Add to Cart</div>`
            container.innerHTML=innerHTML;
            display.append(container)
            let addToCartButton = container.querySelector(".cart");
            addToCartButton.addEventListener("click", addToCart);
        })
}



let range=document.querySelector("#filterratings input")
range.addEventListener("input",()=>{
    let span=document.getElementById("ratingValue")
    span.innerText=range.value;
})


let searchBarInput = document.querySelector("#search-bar input");
searchBarInput.addEventListener("input",()=>{
    clearAllFilters();
    clearTagSearch()
    let str=searchBarInput.value.toLowerCase();
    let mensSection=document.getElementById("mens-clothing");
    let womensSection=document.getElementById("womens-clothing")
    let jewellerySection=document.getElementById("display-jewellery")
    let electronicsSection=document.getElementById("display-electronics")
    let filterSection=document.getElementById("display-filters");
    let display=filterSection.getElementsByClassName("display-items")[0];
    display.innerHTML="";
    
    if(str=""){
        mensSection.style.display="block";
        womensSection.style.display="block";
        jewellerySection.style.display="block";
        electronicsSection.style.display="block";
        filterSection.style.display="none";
    }else{
        mensSection.style.display="none";
        womensSection.style.display="none";
        jewellerySection.style.display="none";
        electronicsSection.style.display="none";
        filterSection.style.display="block";
        let filteredData=[];
        for (obj of fetchedData) {
            let s = obj.title.toLowerCase();
            if (s.includes(str)) {
              filteredData.push(obj)
            }
          }
        filteredData.forEach((data)=>{
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
                            <hr><div id="hiddenid">${data.id}</div>
                            <div class="cart">Add to Cart</div>`
            container.innerHTML=innerHTML;
            display.append(container)
        })
    }
})


const logOut=document.getElementById("logout")
logOut.addEventListener("click",()=>{
    localStorage.removeItem("currentUser");
    window.location.pathname="../index.html"
})

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



function addToCart() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    let parent=this.parentNode.childNodes
    let hiddenDiv = Array.from(parent).find((node) => node.id === 'hiddenid');
    this.removeEventListener("click",addToCart)
    this.innerText="Added to cart"
    for(let i=0;i<fetchedData.length;i++){
        if(fetchedData[i].id==hiddenDiv.innerText){
            fetchedData[i].quantity=1;
            cartItems.push(fetchedData[i])
            localStorage.setItem("cart", JSON.stringify(cartItems));
            break;
        }
    }
}

let cart=document.getElementById('cart')
cart.addEventListener("click",()=>{
    window.location.pathname="../Cart/"
})

let profile=document.getElementById("profile")
profile.addEventListener("click",()=>{
    window.location.pathname="../Profile/"
})

const filterButton = document.getElementById('filter-button');
const filterDropdown = document.getElementById('filter-dropdown');

filterButton.addEventListener('click', () => {
    filterButton.parentElement.classList.toggle('active');
});