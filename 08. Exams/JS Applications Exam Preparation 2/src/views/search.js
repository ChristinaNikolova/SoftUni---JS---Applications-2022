import { searchByYear } from '../api/data.js';
import { html, nothing } from '../lib.js';

const searchTemplate = (listings, isSearched, onSearch) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>

        ${isSearched
            ? html`
                <div class="listings">

                    ${listings.length === 0
                        ? html`<p class="no-cars"> No results.</p>`
                        : listings.map(listingCard)
                    }
    
                </div>`
            : nothing
        }
       
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

export function searchPage(ctx) {
    let listings = [];
    let isSearched = false;

    ctx.render(searchTemplate(listings, isSearched, onSearch));

    async function onSearch() {
        const query = document.getElementById('search-input').value;

        if(!query) {
            return alert('The field is required!');
        }

        listings = await searchByYear(query);
        isSearched = true;
        document.getElementById('search-input').value = '';

        ctx.render(searchTemplate(listings, isSearched, onSearch));
    }
}