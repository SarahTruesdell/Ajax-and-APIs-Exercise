// AXIOS REVIEW
// Using Axios for all the examples/requests in this lesson
// Using the Star Wars API (https://swapi.dev/documentation) for the first three examples/requests in this lesson
// NOTE: When working with API requests and using Live Server it is best to save as you go (AKA Turn off Auto Save) so a requests is not made every time you make a change to the file

// CONSUMING THE PROMISE WITH ".THEN"
// Example 1
// Making a GET request using Axios
axios.get(`https://swapi.dev/api/people/1/`)
// Consuming the returned Promise ("res" holds the value of the returned response)
.then(res => {
  console.log(`Example 1 was Successful`);
  console.log(res);
  // With Axios the data requested is inside the "data" key/property of the returned response (AKA JavaScript Object because Axios converts the JSON response into JavaScript)
  console.log(res.data);
  // Accessing the value for the "name" key/property inside of the "data" key/property (NOTE: The value for the "data" key is an object)
  console.log(res.data.name); // Luke Skywalker
  // Selecting the first div, creating a new h3 element, adding the element to the webpage/document inside the div, and setting "Luke Skywalker" as the value for the innerText on the h3.
  const div1 = document.querySelector(`#first`);
  const h3 = document.createElement(`h3`);
  div1.append(h3);
  h3.innerText = res.data.name;
})
// Using ".catch" in case the request fails
// NOTE: Catching the error for a failed request in the "err" parameter
.catch(err => {
  console.log(`Example 1 was NOT Successful`);
  console.log(err);
});

// Example 2
axios.get(`https://swapi.dev/api/starships/`)
.then(res => {
  console.log(`Example 2 was Successful`);
  console.log(res);
  console.log(res.data);
  // The value for the "results" key/property is an array of objects (NOTE: Each object holds data about a certain Starship)
  console.log(res.data.results);
  const allStarships = res.data.results;
  const div2 = document.querySelector(`#second`);
  // Using a For Loop to loop through the objects in the allStarships array. Also, the value for "ship" each time the code in the loops runs will be an object in the allStarships array.
  for (ship of allStarships){
    console.log(ship);
    const h3 = document.createElement(`h3`);
    div2.append(h3);
    // Accessing/using the value for the "name" key/property inside of the object to set the innerText on the created h3 element
    h3.innerText = ship.name;
  }
})
.catch(err => {
  console.log(`Example 2 was NOT Successful`);
  console.log(err);
});

// CONSUMING THE PROMISE WITH ASYNC AWAIT
// Example 3
async function starWarsMovies(){
  // Code in the try runs if the request is Successful
  try {
    const response = await axios.get(`https://swapi.dev/api/films/`);
    console.log(`Example 3 was Successful`);
    console.log(response);
    console.log(response.data);
    // The value for the "results" key is an array of objects (NOTE: Each object holds data about a Star Wars movie/film)
    console.log(response.data.results);
    const allMovies = response.data.results;
    const div3 = document.querySelector(`#third`);
    // Using a For Loop to loop through the objects in the allMovies array. Also, the value for "movie" each time the code in the loops runs will be an object in the allMovies array.
    for (movie of allMovies){
      console.log(movie);
      const h1 = document.createElement(`h1`);
      const p = document.createElement(`p`);
      div3.append(h1, p);
      // Accessing/using the value for the "episode_id" & "title" keys/properties inside of the object to set the innerText on the created h1 element
      h1.innerText = `Episode ${movie.episode_id}: ${movie.title}`;
      // Accessing/using the value for the "opening_crawl" key/property inside of the object to set the innerText on the created p element
      p.innerText = movie.opening_crawl;
    }

  // Code in the catch runs if the request is NOT Successful (NOTE: Catching the error for a failed request in the "err" parameter)
  } catch (err) {
    console.log(`Example 3 was NOT Successful`);
    console.log(err);
  }
}
// Running the async await function which sends the request
starWarsMovies()

// Example 4 (Example of an API that uses an API Key)
// Using the OMDB (The Open Movie Database) API (http://www.omdbapi.com/) for this example/request
// NOTE: Some APIs require an API key to be able to interact with it (AKA To make a request to the API)

const div4 = document.querySelector(`#fourth`);
const example4H1 = document.createElement(`h1`);
const example4p = document.createElement(`p`);
const image = document.createElement(`img`);

// Creating the "title" variable, but NOT setting a value yet, because a value will be set to it when the form is submitted
let title;

async function omdb(){
  // Building out Endpoint/URL...

  // API Key (This API key was provided by requesting an API key at the following webpage: http://www.omdbapi.com/apikey.aspx)
  
  const apiKey = `db7c7992`;
  const baseURL = `http://www.omdbapi.com/?apikey=${apiKey}`;
  const endpoint = `&t=${title}`;
  // Concatenating values/strings together to build out the full URL/Endpoint
  const fullURL = baseURL + endpoint;
  // Same as above
  // const fullURL = `http://www.omdbapi.com/?apikey=db7c7992&t=${title}`;

  try {
    const response = await axios.get(fullURL);
    console.log(`Example 4 was Successful`);
    console.log(response.data);
    // Setting the returned object containing data about the title, which was entered into the form, as the value for the "result" variable
    const result = response.data;
    // Accessing/using the values for the "Title", "Plot", & "Poster" keys inside of the "result" object to set the value for the innerText and src properties on the created h1, p, and img elements.
    example4H1.innerText = result.Title;
    example4p.innerText = result.Plot;
    image.src = result.Poster;
    div4.append(example4H1);
    div4.append(example4p);
    div4.append(image);
  } catch (err) {
    console.log(`Example 4 Failed`);
    console.log(err);
  }
}

const form = document.querySelector(`form`);
form.addEventListener(`submit`, m => {
  // Stops the form from submitting so the values inside can be accessed
  m.preventDefault();

  // Using querySelector which selects the first match of the CSS selector (AKA input) that is used (NOTE: This will select the text input)
  const movieInput = document.querySelector(`input`)

  // Updating the value of the "title" variable using the value in the text input
  title = movieInput.value;

  // Running the async omdb function
  omdb();

  // Clears out the text input after the user clicks "Submit"
  movieInput.value = ``;
});