const video = document.querySelector('.video')
const playBtn = document.querySelector('.play-button')
const cPlayBtn = document.querySelector('.c-play-button')
const speaker = document.querySelector('.speaker')
const timeCurrent = document.querySelector('.time-current')
const timeDuration = document.querySelector('.time-duration')
const progress = document.querySelector('.progress')
const fullscreenIcon = document.querySelector('.fullscreen-icon')
const videoContainer = document.querySelector('.video-container')
const volume = document.querySelector('#volume')

video.addEventListener('click', playPause)
playBtn.addEventListener('click', playPause)
cPlayBtn.addEventListener('click', playPause)
speaker.addEventListener('click', mute)
video.addEventListener('timeupdate', timeUpdate)
video.addEventListener('canplay', getDuration)
progress.addEventListener('click', videoRewind)
fullscreenIcon.addEventListener('click', toggleFullscreen)
volume.addEventListener('change', changeVolume)


function playPause() {
    if (video.paused) {
        video.play()
        playBtn.style.display = 'none'
        cPlayBtn.classList.replace('play', 'pause')
    } else {
        video.pause()
        playBtn.style.display = 'block'
        cPlayBtn.classList.replace('pause', 'play')
    }
}

function mute() {
    if(video.muted) {
        video.muted = false
        speaker.innerHTML = '&#x1F50A;'
    } else {
        video.muted = true
        speaker.innerHTML = '&#x1F507;'
        // volume.value = 0
    }
}

function changeVolume() {
    video.volume = volume.value
    if (video.muted || video.volume === 0) {
        mute()
        volume.value = (event.offsetX * 100) / volume.offsetWidth
    }
    console.log(event)
}

function timeUpdate() {
    const minutes = Math.floor(video.currentTime / 60)
    const seconds = Math.floor(video.currentTime - minutes * 60)
    const x = minutes < 10 ? '0' + minutes : minutes
    const y = seconds < 10 ? '0' + seconds : seconds
    timeCurrent.innerHTML = x + ':' + y
    progress.value = (video.currentTime * 100) / video.duration
}

function getDuration() {
    const minutes = Math.floor(video.duration / 60)
    const seconds = Math.floor(video.duration - minutes * 60)
    const x = minutes < 10 ? '0' + minutes : minutes
    const y = seconds < 10 ? '0' + seconds : seconds
    timeDuration.innerHTML = x + ':' + y
}

function videoRewind() {
    progress.value = (event.offsetX * 100) / progress.offsetWidth
    video.pause()
    video.currentTime = video.duration * (event.offsetX / progress.offsetWidth)
    playPause()
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        video.style.width = '100%'
        video.style.height = '100%'
        fullscreenIcon.innerHTML = '&swarr;';
    } else {
        document.exitFullscreen();
        fullscreenIcon.innerHTML = '&nearr;';
    }
}