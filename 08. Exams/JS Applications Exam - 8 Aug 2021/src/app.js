import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myBooksPage } from "./views/my-books.js";

const root = document.getElementById('site-content');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);

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
        document.getElementById('user').style.display = 'inline';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('div#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline';
    }
}