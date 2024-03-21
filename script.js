"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "song11.mp3",
    displayName: "Tum Hi Aana",
    cover: "anni.png",
    artist: "Jubin Nautiyal, Payal Dev",
  },
  {
    path: "song12.mp3",
    displayName: "Bol Na Halke Halke",
    cover: "anni2.jpg",
    artist: "Rahat Fateh Ali Khan",
  },
  {
    path: "song13.mp3",
    displayName: "Aram Ata Hai Deedar Se Tere",
    cover: "anni3.jpg",
    artist: "Azaan Sami Khan",
  },
  {
    path: "song14.mp3",
    displayName: "Banjaara",
    cover: "anni6.jpg",
    artist: "Mohammad Irfan",
  },
  {
    path: "song15.mp3",
    displayName: "Jitni Dafa",
    cover: "anni4.jpg",
    artist: "Yasser Desai, Rashmi Virag",
  },
  {
    path: "song16.mp3",
    displayName: "Milne Hai Mujhse Aayi",
    cover: "anni5.jpg",
    artist: "Arijit Singh",
  },
  {
    path: "song17.mp3",
    displayName: "Lo Safar",
    cover: "anni7.jpg",
    artist: "Jubin Nautiyal",
  },
  {
    path: "song18.mp3",
    displayName: "Bulleya",
    cover: "anni8.jpg",
    artist: "Amit Mishra",
  },
  {
    path: "song19.mp3",
    displayName: "Chand Sifarish",
    cover: "anni9.jpg",
    artist: "Kailash Kher, Shaan",
  },
  {
    path: "song20.mp3",
    displayName: "Uska Hi Banana",
    cover: "anni10.jpg",
    artist: "Arijit Singh",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

