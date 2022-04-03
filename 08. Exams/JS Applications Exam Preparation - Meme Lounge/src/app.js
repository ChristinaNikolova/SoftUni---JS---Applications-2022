import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { memesPage } from "./views/memes.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myProfilePage } from "./views/my-profile.js";

const root = document.querySelector('main');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/memes', memesPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-profile', myProfilePage);

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
        document.querySelector('div.user').style.display = 'inline';
        document.querySelector('div.guest').style.display = 'none';
        document.querySelector('div.profile span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('div.user').style.display = 'none';
        document.querySelector('div.guest').style.display = 'inline';
    }
}