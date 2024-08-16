

let songs=[
    {name:"Dolor - sit amet", url:"Songs/John Denver ♥ Take Me Home Country Roads The Ultimate Collection with Lyrics.mp3"},
    {name: "Natalia Sykes - surrender", url:"Songs/Natalie Taylor Surrender Official Video - Copy.mp3"},
    {name:"hillsong",url:"Songs/Oceans Where Feet May Fail Live Hillsong UNITED.mp3"}
];           
let song={
    name:"Dolor - sit amet",
    url:"Songs/John Denver ♥ Take Me Home Country Roads The Ultimate Collection with Lyrics.mp3"
}

let audio=new Audio();
// audio.src=songs[2].url;


// document.addEventListener('click',function(){
//     audio.play();
// })
        
// console.log(songs[0].name)

let songsContainer = document.querySelector(".playlist");
console.log(songsContainer);

let currentSongIndex=0;
let trackName=document.querySelector(".track-name");


let playSong=document.querySelector(".play")
playSong.addEventListener('click', function(){
    play(currentSongIndex);
    // isPlaying=true;
}

);
let pauseSong=document.querySelector(".pause")
pauseSong.addEventListener('click', function(){
    playPause();
    // isPlaying=false;
}

);
let previousSong=document.querySelector(".previous")
previousSong.addEventListener('click', function(){
    currentSongIndex --;
    if (currentSongIndex < 0){
        currentSongIndex = 0;
    }
    // isPlaying=false;
    play(currentSongIndex);
}

);
let nextSong=document.querySelector(".next")
nextSong.addEventListener('click',function(){
    currentSongIndex ++;
    if (currentSongIndex>songs.length - 1){
        currentSongIndex = 0;
    }
    // isPlaying=true;
    play(currentSongIndex);
}

);

audio.addEventListener('ended',function(){
    currentSongIndex ++;
    if (currentSongIndex>songs.length - 1){
        currentSongIndex = 0;
    }
    // isPlaying=true;
    showNotification(songs[currentSongIndex].name,songs[currentSongIndex].name,'Songs/icon.png');
    play(currentSongIndex);
}
)
let seekBar = document.getElementById('seekBar');
audio.addEventListener('timeupdate',function(){
    let progress= (audio.currentTime/audio.duration)*100;
    seekBar.value=progress;
})
seekBar.addEventListener('input',()=>{
    let time=(seekBar.value/100)*audio.duration;
    audio.currentTime=time;
})
function displaySongs(){
    for (let i=0;i<songs.length;i++){
        songsContainer.innerHTML+=(
            `<div class="track" onclick="play(${i})">
                <button class="play">&#9658;</button>
                <span>${songs[i].name}</span>
                <span class="duration">4:00</span>
            </div>`  
        );
    }

};




displaySongs();

// {/* <div class="track">
//         <button class="play">&#9658;</button>
//         <span>Dolor - sit amet</span>
//         <span class="duration">4:00</span>
//     </div> */}


// let isPlaying = true;
function play(index){
    currentSongIndex=index;
    audio.src=songs[index].url;
    trackName.innerHTML=songs[index].name;

    playSong.innerHTML=`&#9646;&#9646;`;
    // if (isPlaying){
    //     audio.src=songs[index].url;

    // }
    // audio.src=songs[index].url;
    
    // isPlaying = true; 
    audio.playbackRate=1;

    
     audio.onloadedmetadata=function(){
        let duration=audio.duration*0;
        console.log(duration);
        audio.currentTime= duration
        audio.play();

     }
    //audio.currentTime= duration

    

}


let isPaused=false;
let playPause=_=>{
    if(isPaused){
        audio.play();
        isPaused=false;
        playSong.innerHTML=`&#9646;&#9646;`;
    }else{
        audio.pause();
        isPaused=true
        playSong.innerHTML=`&#9654;`;
    }

}


let showNotification = (title,body,icon) => {

    if ("Notification" in window) {
        console.log(Notification.permission);
        if (Notification.permission == "granted") {
            new Notification(title, { body: body, icon: icon });
        } else {
            Notification.requestPermission().then(function (permission) {
                if (permission == "granted") {
                    new Notification(title, { body: body, icon: icon });
                }
            })
        }
    } else {
        alert("Browser does not support notifications")
    }

}