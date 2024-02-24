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

    // console.log("starting ")
    if (panier == null) {
        show_element("empty-cart");
        return;
    }
    console.log("panier length:", panier.length);
    for (let i = 0; i < panier.length; i++)
        show_element("article-" + panier[i].id);
}

window.onload = function() {
    let articleCountSpan = document.getElementById("article-count");
    let totalCountSpan = document.getElementById("total-count");
    let articleCount = get_article_nb(0);//a changer

    articleCountSpan.textContent = articleCount;
    totalCountSpan.textContent = articleCount * 34.99;
    display_good_ids();
};
