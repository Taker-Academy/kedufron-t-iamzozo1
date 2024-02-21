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

    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == id) {
            article_nb += 1;
        }
    }
    return article_nb;
}
window.onload = function() {
    let articleCountSpan = document.getElementById("article-count");
    let totalCountSpan = document.getElementById("total-count");
    let articleCount = get_article_nb(1);//a changer

    articleCountSpan.textContent = articleCount;
    totalCountSpan.textContent = articleCount * 34.99;

};
