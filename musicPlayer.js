const myAudio = document.querySelector("audio");
const myPlay = document.getElementById("play");

isAudioPlaying = false;

function playAudio() {
  isAudioPlaying = true;
  myAudio.play();
  myPlay.classList.replace("fa-play", "fa-pause");
  mySongImage.classList.add("rotateimage");
}

function pauseAudio() {
  isAudioPlaying = false;
  myAudio.pause();
  myPlay.classList.replace("fa-pause", "fa-play");
}

myPlay.addEventListener("click", function () {
  // logic to play the Audio and pause the Audio
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});


//  Raw Data of the Songs taken in an Object
const songsData = [
  {
    singerName: "Arjit Singh",
    songName: "O-sjni-re",
    info: "image-1",
  },

  {
    singerName: "Khailash Kher",
    songName: "Saiyyan",
    info: "image-2",
  },

  {
    singerName: "Arjit Singh",
    songName: "Anuvanuvu..",
    info: "image-3",
  },
  {
    singerName: "Sai Abhyankkar",
    songName: "Aasa kuda",
    info: "image-4",
  },
  {
    singerName: "Sai Abhyankkar",
    songName: "Katchi Sera",
    info: "image-5",
  },
];

const mySinger = document.getElementById("singer");
const mySong = document.getElementById("song");
const mySongImage = document.querySelector("img");
const myForward = document.getElementById("forward");
const myBackward = document.getElementById("backward");

// method to load the songs dynamically from the Songs data
function loadSong(songsData) {
  mySinger.innerText = songsData.singerName;
  mySong.innerText = songsData.songName;
  mySongImage.src = `IMAGES/${songsData.info}.jpg`;
  myAudio.src = `AUDIO/${songsData.info}.mp3`;
}

let songIndex = 0;
myForward.addEventListener("click", nextSong);

function nextSong() {
  songIndex++;
  if (songIndex > songsData.length - 1) {
    songIndex = 0;
  }
  // logic to play next song
  loadSong(songsData[songIndex]);

  playAudio();
}

myBackward.addEventListener("click", nextSong);

function nextSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsData.length - 1;
  }
  // logic to play backward song
  loadSong(songsData[songIndex]);

  playAudio();
}

const myProgressBar = document.getElementById("progressBar");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("currentTime");

myAudio.addEventListener("timeupdate", function (event) {
  if (isAudioPlaying) {
    // Get the current time of the media element (e.g. video or audio)
    let myCurrentTime = event.srcElement.currentTime;
    // Get the total duration of the media element
    let myDuration = event.srcElement.duration;
    let myAudioPercentage = (myCurrentTime / myDuration) * 100; //calculating the time percentage
    myProgressBar.style.width = `${myAudioPercentage}%`;

    // converting seconds to minutes and seconds
    // displaying the current time and duration
    const durationInMinutes = Math.floor(myDuration / 60);
    let durationInSeconds = Math.floor(myDuration % 60);
    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`;
    }
    let totalDurationTime = `${durationInMinutes}:${durationInSeconds}`;
    duration.innerText = totalDurationTime;

    // displaying the current time and duration
    const currentTimeInMinutes = Math.floor(myCurrentTime / 60);
    let currentTimeInSecs = Math.floor(myCurrentTime % 60);

    if (currentTimeInSecs < 10) {
      currentTimeInSecs = `0${currentTimeInSecs}`;
    }
    let totalCurrentTime = `${currentTimeInMinutes}:${currentTimeInSecs}`;
    currentTime.innerText = totalCurrentTime;
  }
});
