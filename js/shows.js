displayPopularShows();
async function displayPopularShows() {
    const result = await fetchAPIdata('tv/popular');
    let results=[...result];
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
                ${show.poster_path ? `<img src="https://tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="">` : `<img src="../images/no-image.jpg" class="card-img-top" alt="Movie Title">`}
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${show.first_air_date}</small>
                </p>
            </div>`;
            document.querySelector('#popular-shows').appendChild(div);
    })
}
async function fetchAPIdata(endpoint){
    const API_KEY='011ab9bface6eb0c8345cf31ac16adeb';//never keep it in here in production
    const APIURL='https://api.themoviedb.org/3/';
    const response=await fetch(`${APIURL}${endpoint}?api_key=${API_KEY}`)
    const data=await response.json();
    return data.results;
}