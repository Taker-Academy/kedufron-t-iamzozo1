const ARSENAL = 0;
const CHELSEA = 1;

function element_exist(panier, element_id) {
    if (panier.length <= 0)
        return 0;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == element_id)
            return 1;
    }
    return 0;
}

function ajouterAuPanier(element) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    if (element_exist(panier, element.id)) {
        for (let i = 0; i < panier.length; i++) {
            console.log("in the loop", panier[i].id, "element: ", element.id);
            if (panier[i].id == element.id) {
                console.log("trying to add to panier: ", panier[i].amount);
                panier[i].amount += 1;
            }
        }
    } else
        panier.push(element);
    localStorage.setItem('panier', JSON.stringify(panier));
}

function newElement(id, name, price) {
    let new_product = {
        id: id,
        nom: name,
        prix: price,
        amount: 1
    };
    return new_product;
}

function get_article_nb(id)
{
    let panier = JSON.parse(localStorage.getItem('panier'));

    if (panier == null)
        return 0;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == id) {
            return panier[i].amount;
        }
    }
    return 0;
}

function show_element(id) {
    let element = document.getElementById(id);

    element.style.visibility = "visible";
}

function is_good_page(page) {
    return window.location.pathname === page;
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
    if (is_good_page("/panier.html"))
        display_good_ids();
};
