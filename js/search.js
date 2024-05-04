const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
  };
  
  async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
  
    if (global.search.term !== '' && global.search.term !== null) {
      // todo and display results
      const { results, total_pages, page, total_results } = await searchAPIdata();
      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;
  
      console.log(global.search.totalPages);
      if (results.length === 0) {
        showAlert('No Results Found');
        return;
      }
      displaySearchResults(results);
      displayPagination(total_pages);
  
      console.log(results);
    } else {
      showAlert('Please enter a search term', 'alert-error');
    }
  }
  
  function displaySearchResults(results) 
  {
    document.querySelector('#search-results').innerHTML='';
    document.querySelector('#search-results-heading').innerHTML='';
    document.querySelector('#pagination').innerHTML='';
    results.forEach((result) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
              ${result.poster_path ? `<img src="https://tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="">` : `<img src="../images/no-image.jpg" class="card-img-top" alt="Movie Title">`}
          </a>
          <div class="card-body">
              <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
              <p class="card-text">
                  <small class="text-muted">Release: ${
                    global.search.type === 'movie' ? result.release_date : result.first_air_date
                  }</small>
              </p>
          </div>`;
      document.querySelector('#search-results-heading').innerHTML = `<h2>${results.length} of${global.search.totalResults} results for ${global.search.term}</h2>`;
      document.querySelector('#search-results').appendChild(div);
    });
  }
  
  async function searchAPIdata() {
    const APIURL = 'https://api.themoviedb.org/3/';
    const API_KEY = '011ab9bface6eb0c8345cf31ac16adeb';
    const response = await fetch(`${APIURL}search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}&page=${global.search.page}`);
    const data = await response.json();
    return data;
  }
  
  function showAlert(message, className) {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(() => alertEl.remove(), 2000);
  }
  
  search();
  
  function displayPagination(totalPages) {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
      <div class="page-counter">${global.search.page} of ${totalPages}</div>`;
    document.querySelector('#pagination').appendChild(div);
    //disable prev if on first page
    if(global.search.page===1){
        document.querySelector('#prev').disabled=true;
    }
    if(global.search.totalPages===global.search.page){
        document.querySelector('#next').disabled=true;

    }
    //Next Page
    document.querySelector('#next').addEventListener('click',async()=>{
        global.search.page++;
        const{results,total_pages}=await searchAPIdata();
        displaySearchResults(results);
    })
    document.querySelector('#prev').addEventListener('click',async()=>{
        global.search.page--;
        const{results,total_pages}=await searchAPIdata();
        displaySearchResults(results);
    })
}
