function ajouterAuPanier(element) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    panier.push(element);
    localStorage.setItem('panier', JSON.stringify(panier));
    alert("click");
}

function newElement(id, name, price) {
    let new_product = {
        id: id,
        nom: name,
        prix: price
    };
    return new_product;
}
ajouterAuPanier(newElement(1, "mug", 34.99));
