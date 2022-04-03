import { deleteListingById, getListingById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (listing, isCreator, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${listing.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${listing.brand}</li>
                <li><span>Model:</span>${listing.model}</li>
                <li><span>Year:</span>${listing.year}</li>
                <li><span>Price:</span>${listing.price}$</li>
            </ul>
    
            <p class="description-para">${listing.description}</p>
    
            ${isCreator
                ? html`
                    <div class="listings-buttons">
                        <a href="/edit/${listing._id}" class="button-list">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                    </div>`
                : nothing
            }
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const listing = await getListingById(id);

    const user = getUserData();
    const isCreator = user && user.id === listing._ownerId;

    ctx.render(detailsTemplate(listing, isCreator, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this listing?');

        if(confirmation) {
            await deleteListingById(id);
            ctx.page.redirect('/listings');
        }
    }
}