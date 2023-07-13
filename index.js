import { createAllMovies } from "./createMovies.js"

const moviesParentContainer = document.getElementById('movies');


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