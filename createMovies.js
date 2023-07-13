

export const createAllMovies = (movies, cardParentElement,createElement) =>{

    for (let movie of movies){
    const cardContainer = createElement("div");
    cardContainer.classList.add("card");

    const imageCardContainer = createElement("div");
    imageCardContainer.classList.add("card-image");

    const image = createElement("img");
    image.classList.add("image");
    image.setAttribute("src",movie.img_link);
    image.setAttribute("alt",movie.name);

    imageCardContainer.appendChild(image);

    cardContainer.appendChild(imageCardContainer);

   const cardDetailsContainer= createElement("div");     
   cardDetailsContainer.classList.add("card-details");

//title
   const movieTitle = createElement("div");
   movieTitle.classList.add("movie-title");
   movieTitle.innerText = movie.name;

   cardDetailsContainer.appendChild(movieTitle);

   //genre

   const movieGenre =createElement("div");
   movieGenre.classList.add("movie-genre");
   movieGenre.innerText = movie.genre;

   cardDetailsContainer.appendChild(movieGenre);

   //rating container

   const movieRatings =createElement("div");
   movieRatings.classList.add("movie-ratings");

   const starIcon =createElement("span");
   starIcon.classList.add("fa", "fa-star");
   movieRatings.appendChild(starIcon);

   //rating value 

   const ratingValue =createElement("span");
   ratingValue.classList.add("rating-value");
   ratingValue.innerText= movie.imdb_rating;
   movieRatings.appendChild(ratingValue);
   
    //length

   const movieLength = createElement("div");
   movieLength.classList.add("movie-length")
   movieLength.innerText=`Mins: ${movie.duration}`;
   movieRatings.appendChild(movieLength);
   
   cardDetailsContainer.appendChild(movieRatings);
   cardContainer.appendChild(cardDetailsContainer);

   cardParentElement.appendChild(cardContainer);
    };
}