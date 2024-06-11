// console.log(shopCardItem);

let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCard = () => {

    return( shop.innerHTML = shopCardItem.map((x) => {

        let {id, name, desc, img, price} = x;

        let search = basket.find((x) => x.id === id) || [];

        return `
        <div class="shoppingCart" id ="product-id-${id}">
            <img src="${img}" alt="">

            <div class="detail">
                <h2>${name}</h2>
                <p>${desc}</p>

                <div class="price-quantity">
                    <span>$ ${price}</span>

                    <div class="price">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <span id = ${id}>
                        ${search.item === undefined ? 0 : search.item}
                        </span>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        `

    }).join(""))

}

generateCard();


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

    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));


}


let update = (id) => {

    let search = basket.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item;

    calculation();

}


let calculation = () => {

    let CartQunatity = document.getElementById("CartQunatity");

    CartQunatity.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);


}

calculation();