// event listener search form
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const { elements: { searchQuery } } = e.target;
    
    searchQueryResult = searchQuery.value;


    // console.log
    console.log("searchQueryResult:",`"${searchQueryResult}"`);
    console.log("q:", `"${q}"`);
    
    if (searchQueryResult === '') {
        console.log(searchQueryResult);
        gallerySelector.innerHTML = "";
        btnLoadMore.classList.remove("is-visible");
        
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            
    };

    if (searchQueryResult !== q) {

        console.log("CHANGED!!! NOT EMPTY QUERY");

        pageN = 1;
        pixabayAPI.page = `${pageN}`;

        gallerySelector.innerHTML = "";
        btnLoadMore.classList.remove("is-visible");

    } else {

        console.log("page+1!!!");

        pageN += 1;
        pixabayAPI.page = `${pageN}`;
        
        btnLoadMore.classList.remove("is-visible");

    };
    
    q = searchQueryResult;
    
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

        Notify.success(`'Hooray! We found ${results.totalHits} images.'`);

        //console.log
        console.log("results", results);

    }

    catch (error) {
    
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    };
    console.log("");
});

// button load more
const gallerySelector = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
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

