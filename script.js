const ARSENAL = 0;
const CHELSEA = 1;

//check if the given element id is present in the cart
function element_exist(panier, element_id) {
    if (panier.length <= 0)
        return 0;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == element_id)
            return 1;
    }
    return 0;
}

//add an item in the cart in the local storage
function ajouterAuPanier(element) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    if (element_exist(panier, element.id)) {
        for (let i = 0; i < panier.length; i++) {
            if (panier[i].id == element.id) {
                panier[i].amount += 1;
            }
        }
    } else
        panier.push(element);
    localStorage.setItem('panier', JSON.stringify(panier));
    display_good_ids();
}

//remove an element from the cart
function remove_one(element_id) {
    let panier = JSON.parse(localStorage.getItem('panier'));

    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id == element_id) {
            panier[i].amount -= 1;
            localStorage.setItem('panier', JSON.stringify(panier));
            display_good_ids();
            return true;
        }
    }
    return false;
}

//add a new element in the cart
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

    if (id == "empty-cart")
        element.style.display = "block";
    else
        element.style.display = "flex";
}

function hide_element(id) {
    let element = document.getElementById(id);

    element.style.display = "none";
}

function is_empty(panier) {
    if (panier == null)
        return true;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].amount > 0)
            return false;
    }
    return true;
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

    if (is_empty(panier)) {
        show_element("empty-cart");
    }
    if (panier == null)
        return;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].amount > 0)
            show_element("article-" + panier[i].id);
        else
            hide_element("article-" + panier[i].id);
        console.log("aùount:", panier[i].amount);
        articleCountSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-count");
        totalCountSpan = document.querySelector("#article-" + panier[i].id +" > div > p > #total-count");
        priceSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-price");
        articleCount = get_article_nb(panier[i].id);
        articleCountSpan.textContent = articleCount;
        priceSpan.textContent = panier[i].prix + "€";
        totalCountSpan.textContent = articleCount * panier[i].prix + "€";
    }
        
}

document.addEventListener("DOMContentLoaded", function() {
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };
        console.log(formData);
    }
    document.getElementById('submit_button').addEventListener('click', handleFormSubmit);
});

window.onload = function() {
    if (is_good_page("/panier.html"))
        display_good_ids();
};