let total =0; //total of dragged products in the basket

list = []; 

// transfering data = id (name) + price of product
function drag(ev, price) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("price", price);
    document.getElementById("product").innerText = "Product: " + ev.target.id;
    document.getElementById("price").innerText = "Price: " + price + "€";
}


//The default drop behavior for certain DOM elements like <div>s in browsers typically does not accept dropping. This behavior will intercept the behavior  attempting to implement. To ensure the desired drop behavior, preventDefault is applied
function allowDrop(ev) {
    ev.preventDefault();
}

//item(name and price) is dropped on a valid drop target
function drop(ev, bag) {
    if (ev.target.id == "bag" || ev.target.id == "organic") {
        ev.preventDefault();

        //collecting the data of the item that is being transferred
        let data = ev.dataTransfer.getData("id");
        let price = parseInt(ev.dataTransfer.getData("price"));

        clear(data);

        //adding a new item
    if (bag) {
        total += price;
        list.push({"name": data, "price": price});
        }

        //refresh price after adding an item
        document.getElementById("total").innerText = total;
        //adding an item to the bag or product area
        ev.target.appendChild(document.getElementById(data));
    }

}
//a drag operation ends
function end(){
    document.getElementById("product").innerText = "";
    document.getElementById("price").innerText = " ";
}

function clear(name){
    //actual list created
    let listActual = []
    list.forEach(item => {
        if (item["name"] != name){
            listActual.push({"name": item["name"], "price": item["price"]});
        }
        else{
            total -= item["price"];
        }
    });

    list = listActual;
}
