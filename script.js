let favarray = []; //array to hold all the ids that has been added to favourites
var temp = document.querySelector(".template");

console.log(temp);

//on click to search button it fetches api from Omdb and displays all the result 
var result = $("#Search").click(function(e){
    e.preventDefault();
    var search = $("#movie-name").val();
    console.log(search);
    let url = "https://www.omdbapi.com/?s="+ search +"&apikey=47d7c26c"; //url with attached api key
    console.log(url);

    $.get(url, function (data) {

        let imagesUrl = data.Search;
       if(!imagesUrl){ //if no data exists with that name then alert no movie exists
        //$('#movie-name').val('');
            window.alert("No Movie Found");
       }

        else{
            $(temp).empty();
            for (let imageUrl of imagesUrl) { //if  result exists then it fetches them and displays the data for all the records 
            console.log(imageUrl.Poster,imageUrl.Title,imageUrl.Year);

            let data = imageUrl.imdbID;
            let record = document.createElement("div");

            record.innerHTML=`<div class ="poster">
                    <img src="${imageUrl.Poster}">
                    <div class="details">
                        <p>Name:  ${imageUrl.Title}</p>
                        <p>Year: ${imageUrl.Year}</p>
                        <div class="favourites">
                        <button class="btn" id="fav" value=${imageUrl.imdbID}>Add to favourites</button><br>
                        <button class="btn" id="more-info" value=${imageUrl.imdbID} >More Info</button><div>
                    </div>
                </div> <br><hr>`;
            //using imdbid as unique key in value attribute of buttons for storing data in localStorage and deleting data from localStorage
                const favButton = record.querySelector("#fav");
                favButton.addEventListener("click", () => favpush(imageUrl.imdbID));
            
                const infoButton = record.querySelector("#more-info");
                infoButton.addEventListener("click", () => getInfo(imageUrl.imdbID));
                

                
                  
            temp.append(record);
        }

        $('#movie-name').val('');
    }
    });
});
//method to show details of selected movie on about page
function getInfo(infoId){
    sessionStorage.setItem('id', infoId);
    window.location.assign('./about.html');

}

//method to add selected item on favourites list
function favpush (favid){ 
    console.log(favid);
    if (favarray.includes(favid)) {
        alert("Already Added to the Favourite List");
        return;
    }
    favarray.push(favid);
    console.log(favarray);
    sessionStorage.setItem('data', JSON.stringify(favarray));// add updated array to localStorage
    alert("Added to favourites");
  }

  //shows added items on favourites list on page favourites
$(".fav-button").click(function(){
    window.location.assign('./favourites.html');
});