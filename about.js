var resultID = sessionStorage.getItem('id'); //fetch the stored id from localStorage and the fetch api using the fetched id

console.log(resultID)

fetch();

function fetch()
{
    let url = "https://www.omdbapi.com/?i="+ resultID +"&apikey=47d7c26c";//we are passing to the url the id that we have fetched (i = " " )
    console.log(url);
    $.get(url, function (data) {
    
        let result = data;//fetches  result from data

        const record = document.createElement("div");
        record.classList.add("about-details");

        //Title,Year,Rated,Released, Runtime,Genre,Director, Writer, Actors, Plot, Poster, imdbRating, Type 
        record.innerHTML = `
              <div>
                <div>Title:${data.Title}</div><br><br>
                <div> Year: ${data.Year}</div><br><br>
                <div> Rated: ${data.Rated}</div><br><br>
                <div>Released:${data.Released}</div><br><br>
                <div>Actors: ${data.Actors}</div><br><br>
                <div>Plot:${data.Plot}</div><br><br>
              </div>
              
              <div>
                <img src="${data.Poster}">
              </div>
              `;

              $(".about").append(record);
    });
    
    $("#home").click(function(){
    window.location.assign('./index.html');
});
    
    $("#fav").click(function(){
    window.location.assign('./favourites.html');
});

}