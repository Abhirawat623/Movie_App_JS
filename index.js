import { createAllMovies } from "./createMovies.js"

const moviesParentContainer = document.getElementById('movies');
const searcher = document.querySelector('.searcher');
const ratingSelector = document.getElementById('rating-container');
const genreSelector = document.getElementById('genre-container');

let searchedValue="";
let selectedRating=0;
let arrOfFilteredMovie=[];
let selectedGenre= ''; //for finding genre

const movieURL = "https://movies-app.prakashsakari.repl.co/api/movies";

const getData = async (movieURL)=>{
try{
    const {data} = await axios.get(movieURL);
    return data;
}
catch(err){
    console.log(err);
}
}

const movies = await getData(movieURL);

console.log(movies)

const createElement = (element)=> document.createElement(element);

createAllMovies(movies,moviesParentContainer,createElement);

function getFilteredData(){
arrOfFilteredMovie = searchedValue?.length > 0 ? movies.filter(movie=>
    //    (searchedValue.includesmovie.name.toLowerCase() ||
    //    searchedValue === movie.director_name.toLowerCase() ||
       movie.name.toLowerCase().includes(searchedValue) ||
       movie.director_name.toLowerCase().includes(searchedValue)||
       movie.writter_name.toLowerCase().split(",").includes(searchedValue) ||
       movie.cast_name.toLowerCase().split(",").includes(searchedValue)) :  movies;
       console.log(arrOfFilteredMovie);

if(selectedRating>0){
    arrOfFilteredMovie= searchedValue?.length>0 ? arrOfFilteredMovie:movies;
    //if something is in rating then if its greater than 0 ,then it would be filteredarra of movies
    arrOfFilteredMovie= arrOfFilteredMovie.filter(movie=>
        movie.imdb_rating >= selectedRating);
        //it will be filtered when rating is equal to or gretaer than my selected Rating
}

// imp if genre is greater than 0 and ratin is greater than 7 ten its filtered accordin to te ratin first then it will 
//filter accordin to te movie where it will be the filtered acc rto te including genre of te logic
if(selectedGenre?.length>0){
    arrOfFilteredMovie = searchedValue?.length >0 || selectedRating > 7 ? arrOfFilteredMovie : movies;
    //if searched and rating already selected then it will be searched( we cant take selected rating .length as it is alrady in lenth)
    arrOfFilteredMovie = arrOfFilteredMovie.filter( movie=>movie.genre.includes(selectedGenre));
}

return arrOfFilteredMovie;

}



const handleOnSerch= (event)=>{
    searchedValue= event.target.value.toLowerCase();
    let arrOfSearchedMovie = getFilteredData();
  console.log(arrOfSearchedMovie);
  moviesParentContainer.innerHTML="";
  createAllMovies(arrOfSearchedMovie,moviesParentContainer,createElement);

}


searcher.addEventListener("keyup",handleOnSerch);

const handleOnClickRating =(event)=>{
selectedRating = event.target.value;
let arrOfSelectedRating = getFilteredData();
moviesParentContainer.innerHTML="";
createAllMovies(selectedRating ? arrOfSelectedRating: movies,moviesParentContainer,createElement);

}
ratingSelector.addEventListener('click',handleOnClickRating);


const genres = movies.reduce((acc,cur)=>{

let arrOfGenres =[];
let arrOfTempGenres = cur.genre.split(',');
//the newer string of genres splitted in words;
acc=[...acc,...arrOfTempGenres]; 
//older and newer all splitted genres are added again and again

//all the genres of till selected is in the array
for (let genre of acc) {
if(!arrOfGenres.includes(genre)){
//it means if empty array doesnt have new splitted genre then it will be added
arrOfGenres=[...arrOfGenres,genre]
//here genre is looped of all splitted genres

}
}
return arrOfGenres;},[])





//for options of genres
for(let genre of genres){
    const genresenreOption = createElement('option');
     genresenreOption.classList.add("option");
     genresenreOption.setAttribute("value",genre);
     genresenreOption.innerText = genre;
     genreSelector.appendChild(genresenreOption);
}

const handleOnGenreSelect=(event)=>{
    const selectedGenre= event.target.value;
    const arrOfSelectedgenre = getFilteredData();
    moviesParentContainer.innerHTML="";
   createAllMovies(selectedGenre ? arrOfSelectedgenre : movies,moviesParentContainer,createElement);
}


genreSelector.addEventListener('change',handleOnGenreSelect);


