import { deleteMemeById, getMemeById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (meme, isCreator, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
    
                ${isCreator
                    ? html`
                            <a class="button warning" href="/edit/${meme._id}">Edit</a>
                            <button @click=${onDelete} class="button danger">Delete</button>`
                    : nothing
                }
    
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);

    const user = getUserData();
    const isCreator = user && user.id === meme._ownerId;

    ctx.render(detailsTemplate(meme, isCreator, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this meme?');

        if(confirmation) {
            await deleteMemeById(id);
            ctx.page.redirect('/memes');
        }
    }
}