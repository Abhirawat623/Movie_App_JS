import { createAllMovies } from "./createMovies.js"

const moviesParentContainer = document.getElementById('movies');
const searcher = document.querySelector('.searcher');
let searchedValue="";
let arrOfFilteredMovie=[];
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
return arrOfFilteredMovie;

}



const handleOnSerch= (event)=>{
    searchedValue= event.target.value.toLowerCase();
 
 let arrOfSearchedMovie = getFilteredData();
  console.log(arrOfSearchedMovie);
  moviesParentContainer.innerHTML="";
  createAllMovies(arrOfSearchedMovie,moviesParentContainer,createElement);

}


searcher.addEventListener("keyup",handleOnSerch)