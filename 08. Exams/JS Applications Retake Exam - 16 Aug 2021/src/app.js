import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from "./views/register.js";
import { gamesPage } from "./views/games.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

const root = document.getElementById('main-content');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/games', gamesPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

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
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline';
    }
}