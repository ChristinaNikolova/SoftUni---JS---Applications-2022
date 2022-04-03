import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { homePage } from './views/home.js';
import { listingsPage } from "./views/listings.js";
import { loginPage } from './views/login.js';
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myListingsPage } from "./views/my-listings.js";
import { searchPage } from "./views/search.js";

const root = document.getElementById('site-content');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/listings', listingsPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listings', myListingsPage);
page('/by-year', searchPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('profile').style.display = 'inline';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-message').textContent = `Welcome ${userData.username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline';
    }
}