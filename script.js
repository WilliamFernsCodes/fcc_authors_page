const authorContainer = document.getElementById("author-container"); // get the authors container, where all of the author cards will be displayed in
const loadMoreBtn = document.getElementById("load-more-btn"); // button that will load more authors

// app state
let startingIndex = 0; // The current starting index for the authors. It goes 8 forward each time button is clicked
let endingIndex = 8; // The ending index. It goes 8 forward when the button is clicked. Used for slicing the authors, this is the ending number
let authorDataArr = []; // array to store all authors data

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json") // make a fetch (GET) request, to fetch all the authors from freecodecamp
.then(res => res.json()) // wait for the response, and get it as json
.then(data => { // this gives us access to the data in json format. Access it, and set author data to data.
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex)); // display authors, slice it so that it only shows a few.
})
.catch(err => authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`) // aatch any errors that might arise, by adding a <p> tag inside the author container, telling the user that there was an error.

// function to fetch more users. Called when user press loadMoreButton.
const fetchMoreAuthors = () => {
  startingIndex += 8; // increment the starting index by 8, as we already have the current 8 items.
  endingIndex += 8; // increment the ending index by 8, as we want the next 8 items.
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex)); // append the new 8 items to the authors container, by slicing authorDataArr with startingIndex and endingIndex.
  if (authorDataArr.length <= endingIndex) { // if authorDataArr.length <= endingIndex, meaning that ending index is bigger or equal to the authorDatArr.lengt, disable button, set cursor to "not-allowed", and set the textContent to "No more data to load".
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = "No more data to load";
  }
}

// function to take authors parameter and append new cards to the authorContainer.
const displayAuthors = (authors) => {
  authors.forEach(({author, image, url, bio}, index) => { // iterate through the authors, extract the author, url, and bio.
    // append a new author card using the destructured values.
    authorContainer.innerHTML += `<div id=${index} class="user-card"> 
<h2 class="author-name">${author}</h2>
<img class="user-img" src="${image}" alt="${author} avatar" />
<div class="purple-divider"></div>
<p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
<a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
</div>`;
  });
}

// add an event listener to listen for clicks on loadMoreBtn, calling fetchMoreAuthors on click.
loadMoreBtn.addEventListener("click", fetchMoreAuthors)
