// Your code here
// creating a new variable and assigning it the vaulue of the API url, so that we can easily access and call it.
let url = "http://localhost:3000/films";
//here, we are going to create a fuction called addMovieTitles, and thus we are going to populate the <ul> tags using the <li> tags, which thus contain the movietitles that have been fetched from the API, declared by the variable url. 
function addMovieTitles() {
    // initiates a http request from the server, and if successful, then:
    fetch(url)
        // if the request is successful, we are going to perform the actions synced in the arrow function as below:
        .then(response => {
            // if the response is is not successful:
            if (!response.ok) {
                // we will throw an error message to the user.
                throw new Error('Network response was not ok.');
            }
            // otherwise if the response is okay, the .then() method is chained to parse the JSON content of the response.  
            return response.json();
        })
        .then(data => {
            // The map method iterates over each movie object in the data array and extracts the title property in all of them.
            const titles = data.map(movie => movie.title);
            // we are going to get html document by that id and assign it to a variable filmsList
            const filmsList = document.getElementById("films");
            // writing into html document the movie titles it was going to fetch and assign it an empty string, to make sure that the value entered is nothing else but a string data type.
            filmsList.textContent = " ";
            data.forEach(movie => {
                const li = document.createElement("li");
                // getting the list and assigning it a classname
                li.className = "film item";
                li.textContent = movie.title;
                // Add event listener to each movie title for changing the poster
                li.addEventListener('click', () => {
                    changePoster(movie.poster);
                });
                // Add a new event listener to each movie title for updating the movie title
                li.addEventListener('click', () => {
                    updateMovieTitle(movie.title);
                });
                // Add a new event listener to each movie title for updating the movie description
                li.addEventListener('click', () => {
                    updateMovieDescription(movie.description);
                });
                // Add a new event listener to each movie title for updating the showtime
                li.addEventListener('click', () => {
                    updateShowtime(movie.showtime);
                });
                // Add a new event listener to each movie title for updating the runtime
                li.addEventListener('click', () => {
                    updateRuntime(movie.runtime);
                });
                // Add a new event listener to each movie title for updating the remaining tickets
                li.addEventListener('click', () => {
                    updateRemainingTickets(movie.tickets_sold);
                });
                filmsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
}
// Function to update the remaining tickets in the HTML
function updateRemainingTickets(remainingTickets) {
    const ticketNumElement = document.getElementById("ticket-num");
    ticketNumElement.textContent = `${remainingTickets}`;
}
// Function to handle the "Buy Ticket" button click
function handleBuyTicket() {
    const ticketNumElement = document.getElementById("ticket-num");
    let remainingTickets = parseInt(ticketNumElement.textContent);
    // Reduce the remaining tickets by 1 if there are tickets available
    if (remainingTickets > 0) {
        remainingTickets--;
        updateRemainingTickets(remainingTickets);
    }
    // Disable the button and display a message if tickets have run out
    if (remainingTickets <= 0) {
        const buyTicketButton = document.getElementById("buy-ticket");
        buyTicketButton.disabled = true;
        buyTicketButton.textContent = "Sold Out! NEXT TIME BUY EARLY!";
    }
}

// Function to change the poster image based on the selected movie
function changePoster(posterUrl) {
    const posterImg = document.getElementById("poster");
    posterImg.src = posterUrl;
}
// Function to update the movie title in the HTML
function updateMovieTitle(title) {
    const titleElement = document.getElementById("title");
    titleElement.textContent = title;
}
// Function to update the movie description in the HTML
function updateMovieDescription(description) {
    const filmInfoElement = document.getElementById("film-info");
    filmInfoElement.textContent = description;
}
// Function to update the showtime in the HTML
function updateShowtime(showtime) {
    const showtimeElement = document.getElementById("showtime");
    showtimeElement.textContent = showtime;
}
// Function to update the runtime in the HTML
function updateRuntime(runtime) {
    const runtimeElement = document.getElementById("runtime");
    runtimeElement.textContent = `${runtime} minutes`;
}
// Add event listener to the "Buy Ticket" button
const buyTicketButton = document.getElementById("buy-ticket");
buyTicketButton.addEventListener("click", handleBuyTicket);



// Call the function to fetch and display movie titles
addMovieTitles();