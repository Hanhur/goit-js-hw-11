
// button load more

btnLoadMore.addEventListener("click", async () => {

    pageN += 1;
    pixabayAPI.page = `${pageN}`;

try {

    const results = await fetchPhotos(searchQueryResult);
    markupData.htmlCode = await renderedPhotos(results);
    
    gallerySelector.insertAdjacentHTML("beforeend", markupData.htmlCode);
    btnLoadMore.classList.add("is-visible");
    
    // simpleLightbox gallery destroys and reinitilized
    gallery.refresh();

    const { baseUrl, key, image_type, orientation, safesearch, order, page, per_page } = pixabayAPI;
    const { total, totalHits, hits } = results;    
    const totalPages = Math.ceil(totalHits / per_page);
    
if (page >= totalPages) {
        
        btnLoadMore.classList.remove("is-visible");
    };

    console.log("results", results);

}

catch (error) {

    Notify.failure("We're sorry, but you've reached the end of search results.");

}

console.log("btnLoadMore working");
console.log("");
});

export {btnLoadMore};