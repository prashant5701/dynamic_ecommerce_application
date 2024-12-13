let productsWrapperEle = document.getElementById("productsWrapper");
const cartProducts = document.getElementById("cartProducts");
let totalPriceCount = document.createElement("div");


async function fetchData() {
    let resp = await fetch("https://fakestoreapi.com/products");
    let products = await resp.json();
    console.log(products);

    DisplayProducts(products);
}
fetchData();

// let DBdata = [
//     { 
//         id: 1,
//         title: "Laptop",
//         brand: "HP",
//         price: 50000,
//         pic: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c07991100_1.png"
//     },
//     {
//         id: 2,
//         title: "Laptop",
//         brand: "Dell",
//         price: 60000,
//         pic: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=679&qlt=100,1&resMode=sharp2&size=679,402&chrss=full"
//     },
//     {
//         id: 3,
//         title: "Laptop",
//         brand: "Asus",
//         price: 80000,
//         pic: "https://m.media-amazon.com/images/I/718YGA3IL6L.jpg"
//     },
//     {
//         id: 4,
//         title: "Laptop",
//         brand: "Lenovo",
//         price: 40000,
//         pic: "https://www.reliancedigital.in/medias/Lenovo-Yoga-Laptop-494351836-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w2Mzk3MHxpbWFnZS9qcGVnfGltYWdlcy9oODMvaDJmLzEwMTAxNTEwODk3Njk0LmpwZ3wzMjA1YTQ2YTc1OWIxYjY1MDI0NDhjNWJlMzRiOTNhYWUyYTM1NTQyOGYxY2ZjOGQ4MmQyMzcwZjRjMjlkYjkw"
//     },

// ]

let cartItems = [];

function DisplayProducts(products) {

    products.map((product) => {

        // console.log(products); 

        // creating element dynamically
        let card = document.createElement("div");
        let image = document.createElement("img");
        let cardTitle = document.createElement("h2");
        let cardBrand = document.createElement("h2");
        let price = document.createElement("p");
        let addCart = document.createElement("button");

        // setting attribute to elements dynamically
        card.setAttribute("class", "card");
        cardTitle.textContent = product.title;
        cardBrand.textContent = `${product.description.slice(0, 20)}...`;
        price.innerHTML = `&#8377;${product.price}`;
        addCart.textContent = "Add to cart";

        // adding event listener to button 
        addCart.addEventListener('click', () => {
            // console.log("Item addedd to cart");
            // console.log(product);


            let existingProduct = cartItems.find((ele) => {
                return ele.id === product.id;
            });


            if (existingProduct) {
                // product.quantity+=1;
                existingProduct.quantity += 1;
            }
            else {
                cartItems.push({ ...product, quantity: 1 })
                addCart.textContent = "Add More";

            }
            localStorage.setItem("cart", JSON.stringify(cartItems));
            // console.log(cartItems);

            DisplayCartItems();

        });


        // appending all element as a child of card 
        card.append(image, cardTitle, cardBrand, price, addCart);


        //  appending all element as a child of productsWrapper
        productsWrapperEle.append(card)

        // adding content in html element
        image.setAttribute("src", product.image);
    })
}

// ==================================================================javascript for cart and calling this function in addCartButton ===========
function DisplayCartItems() {
    console.log("Display Cart Items");
    let cartData = JSON.parse(localStorage.getItem("cart"))
    console.log(cartData);
    cartProducts.innerHTML="";
    // totalPriceCount.innerHTML="";
    let total_price_of_all_products = 0;
    console.log("test1");


    cartData.map((item)=>{
        console.log("test2");
        
        let cartCard = document.createElement("article");
        let itemImage = document.createElement("img");
        let itemTitle = document.createElement("h1");
        let itemQuantity = document.createElement("p");
        let itemPrice = document.createElement("p");
        let removeButton = document.createElement("button");

        cartCard.setAttribute("id","cartCard");
        itemImage.setAttribute("src",item.image);
        // product.description.slice(0, 20)}...
        itemTitle.textContent=`${item.title.slice(0,20)}...`;
        itemQuantity.textContent=`Quantity : ${item.quantity}`;
        itemPrice.innerHTML=`Total price :&#8377;  ${item.quantity*item.price}`;
        removeButton.innerHTML="Remove"

        total_price_of_all_products += item.quantity*item.price;  
       


        cartCard.append(itemImage,itemTitle,itemQuantity,itemPrice,removeButton);

        cartProducts.append(cartCard)


    })
      // ===============creating total price container===========================
      totalPriceCount.textContent="";
      totalPriceCount.textContent = `Your total amount is : ${total_price_of_all_products}`;
      let allProductsPrice = document.getElementById("allProductsPrice");

      allProductsPrice.append(totalPriceCount);


}

        
