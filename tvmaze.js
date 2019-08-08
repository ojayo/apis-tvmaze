
async function searchShows(query) {
  let results = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  let showArr = [];

  for (let showItem of results.data) {
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
            <button data-show-id="${show.id}" id="${show.id}">Episodes</button>
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

  $(".card-body button").on("click", function(evt) {
    evt.preventDefault();
    let showId = $(evt.target).closest('.Show').attr('data-show-id');
    console.log(showId);
    getEpisodes(showId);
  })
});
/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
async function getEpisodes(id) {
  let episodeObj = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  for (let episode of episodeObj.data) {
    let $episode = $(
      `<li>id: ${id}</li>
        <li>name: ${episodeObj.name}</li>
        <li>season: ${episodeObj.season}</li>
        <li>number: ${episodeObj.number}</li>
      `);
    $("#episodes-list").append($episode);
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  // TODO: return array-of-episode-info, as described in docstring above
  }
  $("#episodes-area").show();
}
