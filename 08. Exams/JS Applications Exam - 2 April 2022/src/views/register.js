import { html } from '../lib.js';
import { register } from '../api/api.js';

const registerTemplate = (onSubmit) => html`
    <section id="registerPage">
        <form @submit=${onSubmit} class="registerForm">
            <img src="./images/logo.png" alt="logo" />
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Register</button>
    
            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPassword = formData.get('repeatPassword').trim();

        if (!email || !password || !repeatPassword) {
            return alert('All fields are required!');
        }

        if (password !== repeatPassword) {
            return alert('Passwords are not equal!');
        }

        await register(email, password);
        e.target.reset();

        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}