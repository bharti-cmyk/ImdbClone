var temp = document.querySelector(".template");
let list = [];
list = JSON.parse(sessionStorage.getItem('data'));


// to fetch the  updated list 
fetching(list);
function fetching(list) {

    for (var i = 0; i < list.length; i++) {
        fetch(list[i]);
    }
}




function fetch(id){
    
        let url = "https://www.omdbapi.com/?i="+ id+"&apikey=47d7c26c";
        console.log(url);
        $.get(url, function (data) {
    
            let result = data;//fetch all the data 
    
            const record = document.createElement("div");

            record.innerHTML=`<div class ="poster">
                    <img src="${data.Poster}">
                    <div class="details">
                        <p>Name:  ${data.Title}</p>
                        <p>Year: ${data.Year}</p>
                    </div>
                    <div class="favourites">
                        <button class ="btn" id="more-info" value=${data.imdbID}>Info</button>
                    </div>
                    </div>
                        <button id="delete" value=${data.imdbID}>Delete</button>
                    
                 <br><hr>`;

                

                //deletes a record from favourites list
                const deleteButton = record.querySelector("#delete");
                deleteButton.addEventListener("click", (event) => deleteRecord(event, data.imdbID));

                //get more information using imdbid in about page
                const infoButton = record.querySelector("#more-info");
                infoButton.addEventListener("click", () => getInfo(data.imdbID));
            
                
            temp.prepend(record);//add record to last  in list
        });
    
    // });
}

//get more information using imdbID in page about
function getInfo(infoId){
    sessionStorage.setItem('id', infoId);
    window.location.assign('./about.html');

}

//deletes record from localStorage and html page
function deleteRecord(event, imdbID) {
    //fetches the parent div of the button 
    const self = event.target;
  
    const record= self.parentElement;
    
    deleteFromLocal(imdbID);//deletes record from localStorage
    record.remove();//deletes record from html page
}
  
  function deleteFromLocal(imdbID) {
    let list = [];
    list = JSON.parse(sessionStorage.getItem('data'));

  
    const index = list.indexOf(imdbID);
    list.splice(index, 1);
    sessionStorage.setItem("data", JSON.stringify(list));
  }

  //go back to home page index.html
$("#home").click(function(){
    window.location.assign('./index.html');
});

