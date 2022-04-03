import { searchByName } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (albums, isSearched, isLoggedIn, onSearch) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>

        ${isSearched
            ? html`
                    <div class="search-result">
                        ${albums.length === 0
                        ? html`<p class="no-result">No result.</p>`
                        : albums.map((a) => albumCard(a, isLoggedIn))
                }
                    </div>`
            : nothing
        }

    </section>
`;

const albumCard = (album, isLoggedIn) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
           
            ${isLoggedIn
                ? html` 
                    <div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>`
                : nothing
            }
        </div>
    </div>
`;

export function searchPage(ctx) {
    let albums = [];
    let isSearched = false;
    const isLoggedIn = getUserData();

    ctx.render(searchTemplate(albums, isSearched, isLoggedIn, onSearch));

    async function onSearch() {
        const query = document.getElementById('search-input').value;

        if(!query) {
            return alert('The field is required!');
        }

        albums = await searchByName(query);
        isSearched = true;
        document.getElementById('search-input').value = '';

        ctx.render(searchTemplate(albums, isSearched, isLoggedIn, onSearch));

    }
}