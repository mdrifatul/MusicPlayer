const img = document.querySelector("img");
// const music = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const volume_show = document.getElementById("volume_show");
const recent_volume = document.getElementById("volume");
const volume_icon = document.getElementById("volume_icon");

const progress = document.getElementById("progress");
const current_time = document.getElementById("current_time");
const total_duration = document.getElementById("duration");


// create Element

const music = document.createElement('audio');


const songs = [
    {
        path:"songs/Allah1.m4a",
        name: "Allah1",
        title: "Rahman Ya Rahm..",
        artist: "Malek",
        img: "images/Allah1.jpg",
    },
    {
        path:"songs/Allah2.m4a",
        name: "Allah2",
        title: "Allah ho Allah..",
        artist: "Yusuf",
        img: "images/Allah2.jpg",
    },
    {
        path:"songs/Allah3.m4a",
        name: "Allah3",
        title: "Ya nabi salamu..",
        artist: "Ishaq",
        img: "images/Allah3.jpg",
    },
]

let isplaying = false;

// for play function
const playMusic = () =>{
    music.play();
    isplaying = true;
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime');
};


// for pause function
const pauseMusic = () =>{
    music.pause();
    isplaying = false;
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime');
};

play.addEventListener('click', () =>{
    // if(isplaying){
    //     pauseMusic();
    // }else{
    //     playMusic();
    // }
    isplaying? pauseMusic() : playMusic();
});




// changing music data

let songIndex = 0

const loadSong = (songIndex) => {
    title.textContent = songs[songIndex].title;
    artist.textContent = songs[songIndex].artist;
    music.src = songs[songIndex].path; 
    img.src = songs[songIndex].img;   
}

loadSong(songIndex);




const nextSong = () =>{
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playMusic();
}

const prevSong = () =>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playMusic();
}

// volume mute

const audioplay = () =>{
    isplaying = false;
    volume_icon.classList.replace('fa-volume-mute','fa-volume-up');
    volume_icon.classList.add("volume-up-do");

}
const audiopause = () =>{
    isplaying = true;
    volume_icon.classList.replace('fa-volume-up','fa-volume-mute');
    volume_icon.classList.add("volume-up-do");
}

volume_icon.addEventListener('click',(event) =>{
    music.volume = 0;
    volume.value = 0;
    isplaying? audioplay() : audiopause();
})


// volume change

function volume_change(){
	music.volume = recent_volume.value / 100;
}


// progress bar update

music.addEventListener('timeupdate',(event) =>{

    let {currentTime, duration} = event.target;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // duration update

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

    // current time

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
    
});

progress_div.addEventListener('click',(event) => {
    const {duration} = music;

    move_progress = (event.offsetX / event.target.clientWidth) * duration;
    music.currentTime = move_progress;
})




music.addEventListener('ended',nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
