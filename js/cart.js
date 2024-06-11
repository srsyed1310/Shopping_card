let label = document.getElementById("label");
let shoppingCard = document.getElementById("shoppingCard");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {

    let CartQunatity = document.getElementById("CartQunatity");

    CartQunatity.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);


}

calculation();



let generateItemCard = () => {

    if(basket.length !== 0){

        return (shoppingCard.innerHTML = basket.map((x) =>
        {

            let {id, item} = x;

            let search = shopCardItem.find((y) => y.id === id) || [];

            return `
            <div class="card">
            <img src=${search.img} alt="">
    
            <div class="CardDetails">
    
                <div class="title-price">
                    <h4>
                        <p class="card-product-name">${search.name}</p>
                        <p class="card-product-price">$ ${search.price}</p>
                    </h4>
                    <i onclick ="removeItem(${id})" class="fa-solid fa-xmark"></i>
    
                </div>
    
                <div class="price">
                    <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                    <span id = ${id}>
                    ${item}
                    </span>
                    <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                </div>
    
                <h3 class="itemAmount">$ ${item * search.price}</h3>
            </div>
        </div>
    
    
            `

        }).join())


    }

    else{
        shoppingCard.innerHTML = "";

        label.innerHTML = `
        <h2 class="empty-heading">Card is Empty</h2>

        <a href="index.html">
            <button class="BackToHome">Back To Home</button>
        </a>
        `;
    }

}

generateItemCard();


let increment = (id) =>{

    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id : selectedItem.id,
            item : 1,
        });
    }
    else{
        search.item += 1;
    }


    update(selectedItem.id);

    generateItemCard();

    TotalBill();

    localStorage.setItem("data", JSON.stringify(basket));

    // console.log(basket);

}


let decrement = (id) =>{

    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    if (search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectedItem.id);

    basket = basket.filter ((x) => x.item !== 0);

    generateItemCard();
    TotalBill();

    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));


}


let update = (id) => {

    let search = basket.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item;

    calculation();
    TotalBill();

}


let removeItem = (id) => {

    let selectedItem = id;

   basket = basket.filter((x) => x.id !== selectedItem.id);

    generateItemCard();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket))
}


let clearCart = () => {



    basket = [];
    generateItemCard();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}


let TotalBill = () => {

    if(basket.length !== 0){

        let amount = basket.map((x) => {

            let {item , id} = x;

            let search = shopCardItem.find((y) => y.id === id) || [];

            return search.price * item;


        }).reduce((x, y) => x + y , 0)

        label.innerHTML = `
        <div class ="totalBillDiv">
            <h2 class ="totalBill" >Total Bill : $ ${amount}</h2>
            <div class="BillButton">
                <button class="checkout">Check Out</button>
                <button onclick = " clearCart()" class="clear">Clear</button>
            </div>
        </div>
        `;


    }

    else return;


}

TotalBill();