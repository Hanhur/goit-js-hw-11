// fetch photos function
const axios = require("axios").default;
import { Notify } from "notiflix";

async function fetchPhotos(searchQueryResult) 
{
    const {
        baseUrl,
        key,
        image_type,
        orientation,
        safesearch,
        order,
        page,
        per_page
    } = pixabayAPI;

    pixabayAPI.page = `${pageN}`;

    console.log("page", page);

    const response = await axios.get(`${baseUrl}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&order=${order}&page=${page}&per_page=${per_page}`);
    const results = response.data;
    console.log("response.data", response.data);

    console.log("response", response);
    console.log("page", page);

    const { total, totalHits, hits } = results;
    const totalPages = Math.ceil(totalHits / per_page);

    if (total === 0) 
    {
        throw new Error();
    }

    //total pages check
    if (page >= totalPages) 
    {
        btnLoadMore.classList.remove("is-visible");
        Notify.failure("We're sorry, but you've reached the end of search results.");
        return results;
    }
    console.log("totalHits", totalHits);
    console.log("per_page", per_page);

    console.log("totalPages=", totalPages);

    //received data
    return results;
}

// render photos function, make html markup

async function renderedPhotos(results) 
{
    const { hits } = results;

    markupData.markup = hits.map((hit) =>
    `<a href="${hit.largeImageURL}">
        <div class="photo-card">
            <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" class="img-item" />
            <div class="info">
                <p class="info-item">
                    <b>Likes:</b>${hit.likes}
                </p>
                <p class="info-item">
                    <b>Views:</b>${hit.views}
                </p>
                <p class="info-item">
                    <b>Comments:</b>${hit.comments}
                </p>
                <p class="info-item">
                    <b>Downloads:</b>${hit.downloads}
                </p>
            </div>
        </div>
    </a>`).join("");

    return markupData.markup;
}