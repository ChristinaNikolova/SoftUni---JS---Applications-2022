import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { profilePage } from "./views/profile.js";

const root = document.getElementById('content');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);

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
        document.querySelectorAll('a.user').forEach((a) => {
            a.style.display = 'inline';
        });

        document.querySelectorAll('a.guest').forEach((a) => {
            a.style.display = 'none';
        });
    } else {
        document.querySelectorAll('a.user').forEach((a) => {
            a.style.display = 'none';
        });

        document.querySelectorAll('a.guest').forEach((a) => {
            a.style.display = 'inline';
        });
    }
}