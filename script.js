
const api = {
    searchSong: 'https://api.lyrics.ovh/suggest/',
    findLyrics: 'https://api.lyrics.ovh/v1/'
}

document.getElementById('search').addEventListener('click', () =>{
    const searchInput = document.getElementById('search-input').value;
    fetch(`${api.searchSong}${searchInput}`)
    .then(res => res.json())
    .then(data => {
        searchResult(data);
        console.log(data);
    })
})

 

const searchResult = data => {
    document.getElementById('result').innerHTML = "";
    document.getElementById('lyrics').innerText = "";
    document.getElementById('lyrics-title').innerText = "";
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const title = element.title;
        const artist = element.artist.name;
        const img = element.album.cover_small
        var lyricsText = 'https://api.lyrics.ovh/v1/' + artist + "/" + title;

        document.getElementById('result').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                        <div class="col-md-2">
                                                        <img src="${img}">
                                                        </div>
                                                        <div class="col-md-7">
                                                        <h4 class="lyrics-name"> ${title} </h4>
                                                        <p class="author lead">Album by <span> ${artist} </span></p>
                                                        </div>
                                                        <div class="col-md-3 text-md-right text-center">
                                                        <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                                        </div>
                                                        </div>`;                                                                                                                                                                                                                                                                   
    }   
}

function getLyrics(artist,title){
    fetch(`${api.findLyrics}${artist}/${title}`)
    .then(response => response.json())
    .then(data => showLyrics(data, title));
}

function showLyrics(data, title){
    if (data.lyrics == undefined) {
        document.getElementById('lyrics').innerText = 'Sorry, The Lyrics is not available in Server';
        alert('Sorry, The Lyrics is not available in Server');
    }
    else{
        document.getElementById('lyrics').innerText = data.lyrics;
    }
    document.getElementById('lyrics-title').innerText = title;        
}


