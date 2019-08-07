/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.

  let results = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  console.log(results);

  let showArr = [];

  for (let showItem of results.data) {
    console.log(showItem); // whole object

    let showImage;
    if (!showItem.show.image) {
      showImage = "https://tinyurl.com/tv-missing";
    } else { 
      showImage = `${showItem.show.image.medium}`
    }

    let showObj = {
      id: `${showItem.show.id}`,
      name: `${showItem.show.name}`,
      summary: `${showItem.show.summary}`,
      image: showImage
    }
    showArr.push(showObj);
  }

  return showArr;
  // return [
  //   {
  //     id: `${results.data[0].show.id}`,
  //     name: `${results.data[0].show.name}`,
  //     summary: `${results.data[0].show.summary}`,
  //     image: `${results.data[0].show.image}`
  //   }
  // ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src=${show.image}>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}
