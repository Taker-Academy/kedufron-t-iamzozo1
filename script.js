const ARSENAL = 0;
const CHELSEA = 1;

function ajouterAuPanier(element) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    panier.push(element);
    localStorage.setItem('panier', JSON.stringify(panier));
}

function newElement(id, name, price) {
    let new_product = {
        id: id,
        nom: name,
        prix: price
    };
    return new_product;
}

function get_article_nb(id)
{
    let panier = JSON.parse(localStorage.getItem('panier'));
    let article_nb = 0;

    if (panier == null)
        return 0;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == id) {
            article_nb += 1;
        }
    }
    return article_nb;
}

function show_element(id) {
    let element = document.getElementById(id);

    console.log("this is id: ", id);
    element.style.visibility = "visible";
}

function display_good_ids() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    let articleCountSpan;
    let totalCountSpan;
    let articleCount;
    let priceSpan;

    if (panier == null) {
        show_element("empty-cart");
        return;
    }
    for (let i = 0; i < panier.length; i++) {
        show_element("article-" + panier[i].id);
        articleCountSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-count");
        totalCountSpan = document.querySelector("#article-" + panier[i].id +" > div > p > #total-count");
        priceSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-price");
        articleCount = get_article_nb(panier[i].id);
        articleCountSpan.textContent = articleCount;
        priceSpan.textContent = panier[i].prix + "€";
        totalCountSpan.textContent = articleCount * panier[i].prix + "€";
    }
        
}

window.onload = function() {
    display_good_ids();
};
