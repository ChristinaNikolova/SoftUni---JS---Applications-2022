import { getUserListings } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const myListingsTemplate = (listings) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            ${listings.length === 0
                ? html`<p class="no-cars"> You haven't listed any cars yet.</p>`
                : listings.map(listingCard)
            }
            
        </div>
    </section>
`;

const listingCard = (listing) => html`
    <div class="listing">
        <div class="preview">
            <img src=${listing.imageUrl}>
        </div>
        <h2>${listing.brand} ${listing.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${listing.year}</h3>
                <h3>Price: ${listing.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${listing._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;

export async function myListingsPage(ctx) {
    const userId = getUserData().id;
    const listings = await getUserListings(userId);

    ctx.render(myListingsTemplate(listings));
}