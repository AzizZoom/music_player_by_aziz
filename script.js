const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const song = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

// Check If Playing
let isPlaying = false;

// Play
function playMusic() {
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaying = true;
    music.play();
}

// Pause
function pauseMusic() {
    playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    playBtn.setAttribute('title', 'Play');
    isPlaying = false;
    music.pause();
}

// Play/Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()))

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous and Next Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length -1;
    }
    loadSong(song[songIndex]);
    playMusic();
}

function nextSong() {
    songIndex++;
    if (songIndex > song.length -1) {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playMusic();
}

// On Load - Select First Song
loadSong(song[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;
        // Update Progress Bar Width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate Display For Duration
        const durationMinute = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching Duration Element To Avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinute}:${durationSeconds}`;
        }
        // Calculate Display For Current Time
        const currentTimeMinute = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickPosition = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickPosition / width) * duration;
}

// Event Listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);