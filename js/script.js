const global={
    currentPage: window.location.pathname,
    search:{
        term:'',
        type:'',
        page:1,
        totalPages:1
    }
};
//highlight active linkS
function highlightActivelink(){
    const links=document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }

    })
}
//init App
function init() {
    switch(global.currentPage){
        case '/':
            case '/index.html':
            console.log('Home');
            break;
        case '/shows.html':
        console.log('Shows');
        break;
        case '/movie-details.html':
        console.log('Movie details');
        break;
        case  '/tv-details.html':
        console.log('TV details')
        break;
        case '/search.html':
        console.log('Search');
        break;

    }
    highlightActivelink();
}
document.addEventListener('DOMContentLoaded',init);
//fetch data from TMDB API
async function fetchAPIdata(endpoint){
    const API_KEY='011ab9bface6eb0c8345cf31ac16adeb';//never keep it in here in production
    const APIURL='https://api.themoviedb.org/3/';
    showspinner();
    const response=await fetch(`${APIURL}${endpoint}?api_key=${API_KEY}`)
    const data=await response.json();
    hidespinner();
    console.log(data);
    return data;
}
async function displayPopularMovies() {
    const result = await fetchAPIdata('movie/popular');
    let results=[...result.results];
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${movie.poster_path ? `<img src="https://tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="">` : `<img src="../images/no-image.jpg" class="card-img-top" alt="Movie Title">`}
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>`;
            document.querySelector('#popular-movies').appendChild(div);
    })
}
function hidespinner(){
    document.querySelector('.spinner').classList.remove('show');
}
function showspinner(){
    document.querySelector('.spinner').classList.add('show');
}

displayPopularMovies();
async function displayslider(){
    const result=await fetchAPIdata('movie/now_playing');
    console.log(result);
    result.results.forEach((movie)=>{
        const div=document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML=`
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i>${movie.vote_average} / 10
        </h4>
      </div>`;
      document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}
function initSwiper(){
    const swiper=new Swiper('.swiper',{
        slidesPerView:1,
        spaceBetween:30,
        freeMode:true,
        loop:true,
        autoplay:{
            delay:4000,
            disableOnInteraction:false
        },breakpoints:{
            500:{
                slidesPerView:2
            },
            700:{
                slidesPerView:3
            },
            1200:{
                slidesPerView:4
            }
        }
    })
}
displayslider()
/*search()
async function search() {
    const queryString=window.location.search;
    const urlParams= new URLSearchParams(queryString);
    global.search.type=urlParams.get('type');
    global.search.term=urlParams.get('search-term');   
    if(global.search.term!==''&& global.search.term!==null){
        //todo and display results
    const results= await searchAPIdata();    
    }
    else{
        showAlert('Please enter a search term');
    }
}
async function searchAPIdata(){
    const APIURL='https://api.themoviedb.org/3/';
    const API_KEY='011ab9bface6eb0c8345cf31ac16adeb';
    const response=await fetch(`${APIURL}search/${global.search.type}?api_key=${API_KEY}language=en-US&query=${global.search.term}`);
}
function showAlert(message,className){
    const alertEl=document.createElement('div');
    alertEl.classList.add('alert',className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(()=>alertEl.remove(),2000);
} */