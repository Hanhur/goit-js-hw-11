import "./sass/index.scss";
import SimpleLightbox from "simplelightbox";
import { Notify } from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";
import Photos from './js/fetchPhotos';

//===========================================================================================================
//let variables
let searchQueryResult = "";
let q = "";
let pageN = 1;
let gallery = new SimpleLightbox(".gallery a", { enableKeyboard: true });

//Objects
//pixabayObj
const pixabayAPI = {
    baseUrl: "https://pixabay.com/api/",
    key: "3705719-850a353db1ffe60c326d386e6",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    order: "popular",
    page: "1",
    per_page: "40"
};

//markup
const markupData = {
    markup: "",
    htmlCode: ""
};

//======================================================================================================================
// searchForm and gallery find in DOM
const searchForm = document.querySelector(".search-form");
const gallerySelector = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

btnLoadMore.addEventListener("click", async () => {
    pageN += 1;
    pixabayAPI.page = `${pageN}`;

    try 
    {
        const results = await fetchPhotos(searchQueryResult);
        markupData.htmlCode = await renderedPhotos(results);

        gallerySelector.insertAdjacentHTML("beforeend", markupData.htmlCode);
        btnLoadMore.classList.add("is-visible");

        // simpleLightbox gallery destroys and reinitilized
        gallery.refresh();

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
        const { total, totalHits, hits } = results;
        const totalPages = Math.ceil(totalHits / per_page);

        if (page >= totalPages) 
        {
            btnLoadMore.classList.remove("is-visible");
        }

        console.log("results", results);
    } 
    catch (error) 
    {
        Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    console.log("btnLoadMore working");
    console.log("");
});

// event listener search form

searchForm.addEventListener("submit", async e => {
    e.preventDefault();

    const { elements: { searchQuery } } = e.target;

    searchQueryResult = searchQuery.value;

    console.log("searchQueryResult:", `"${searchQueryResult}"`);
    console.log("q:", `"${q}"`);

    if (searchQueryResult === "") 
    {
        console.log(searchQueryResult);
        gallerySelector.innerHTML = "";
        btnLoadMore.classList.remove("is-visible");

        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

    if (searchQueryResult !== q) 
    {
        console.log("CHANGED!!! NOT EMPTY QUERY");

        pageN = 1;
        pixabayAPI.page = `${pageN}`;

        gallerySelector.innerHTML = "";
        btnLoadMore.classList.remove("is-visible");
    } 
    else 
    {
        console.log("page+1!!!");

        pageN += 1;
        pixabayAPI.page = `${pageN}`;

        btnLoadMore.classList.remove("is-visible");
    }

    q = searchQueryResult;

    try 
    {
        const results = await fetchPhotos(searchQueryResult);
        markupData.htmlCode = await renderedPhotos(results);

        gallerySelector.insertAdjacentHTML("beforeend", markupData.htmlCode);
        btnLoadMore.classList.add("is-visible");

        // simpleLightbox gallery destroys and reinitilized
        gallery.refresh();

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
        const { total, totalHits, hits } = results;
        const totalPages = Math.ceil(totalHits / per_page);

        if (page >= totalPages) 
        {
            btnLoadMore.classList.remove("is-visible");
        }
        Notify.success(`'Hooray! We found ${results.totalHits} images.'`);

        console.log("results", results);
    } 
    catch (error) 
    {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    console.log("");
});
