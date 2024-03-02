const ARSENAL = 1;
const CHELSEA = 2;

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

    console.log("adding this element:", element.id);
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

//clear the local storage
function empty_cart()
{
    localStorage.clear();
    return true;
}

//add a new element in the cart
function newElement(id, name, price, img) {
    let new_product = {
        id: id,
        name: name,
        price: price,
        createdIn: new Date(),
        image: img,
        amount: 1
    };
    return new_product;
}

//return the quantity of the article with the given id
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

    if (element == null)
        return;
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

function get_cart_cost() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    let total_price = 0;

    if (panier == null || panier.length == 0)
        return total_price;
    for (let i = 0; i <= localStorage.length; i++)
        total_price += panier[i].amount * panier[i].price;
    return total_price.toFixed(2);
}

function is_good_page(page) {
    return window.location.pathname === page;
}

// function to display only the articles in the cart in the 'panier pager'
function display_good_ids() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    let articleCountSpan;
    let totalCountSpan;
    let articleCount;
    let priceSpan;
    let cartTotalSpan;

    if (!is_good_page("/panier.html"))
        return;
    if (is_empty(panier)) {
        show_element("empty-cart");
    }
    if (panier == null)
        return;
    show_element("buy-wrapper");
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].amount > 0)
            show_element("article-" + panier[i].id);
        else
            hide_element("article-" + panier[i].id);
        articleCountSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-count");
        totalCountSpan = document.querySelector("#article-" + panier[i].id +" > div > p > #total-count");
        priceSpan = document.querySelector("#article-" + panier[i].id + " > div > p > #article-price");
        articleCount = get_article_nb(panier[i].id);
        articleCountSpan.textContent = articleCount;
        priceSpan.textContent = panier[i].price.toFixed(2) + "€";
        totalCountSpan.textContent = (articleCount * panier[i].price).toFixed(2) + "€";
    }
    cartTotalSpan = document.getElementById("command-cost");
    cartTotalSpan.textContent = get_cart_cost();
}

//interactc with the API
function create_command(orderDetails) {
    const url = 'https://api.kedufront.juniortaker.com/order/';

    axios.post(url, orderDetails)
        .then(response => {
            const command_id = response.data.command_id
            hide_element("contactForm");
            console.log('Order created successfully:', command_id);
            alert("Commande passée avec succès.\nNuméro de commande: " + command_id);
            empty_cart();
            display_good_ids();
        })
        .catch(error => {
            alert("Erreur dans la création de la commande.");
            if (error.response) {
                console.error('Error creating order:', error.response.data);
            } else if (error.request) {
                console.error('Error creating order: No response received');
            } else {
                console.error('Error creating order:', error.message);
            }
        });
}

function get_cart() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    let cart;
    let cart_item = {
        id: 0,
        amount: 0
    }
    if (panier == null)
        return panier;
    for (let i = 0; i < panier.length; i++) {
        cart_item.id = panier[i].id;
        cart_item.amount = panier[i].amount;
        cart.push(cart_item);
    }
    return cart;
}

//get the information about the client
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };

    console.log("Form data:", formData);
    create_command(formData);
    document.getElementById('contactForm').reset();
}

// Function to setup event listener for form submission
function setupFormEventListener() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleFormSubmit);
}

window.onload = function() {
    if (is_good_page("/panier.html")) {
        display_good_ids();
        console.log("before waiting event");
    }
};

document.addEventListener("DOMContentLoaded", setupFormEventListener);

//could add total price on every page too