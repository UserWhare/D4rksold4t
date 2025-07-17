document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('bgm');
    const volumeSlider = document.getElementById('volume-slider');
    const playPauseButton = document.getElementById('play-pause-button');
    const musicDiv = document.getElementById('music');

    const startMusicOnFirstClick = () => {
        audioPlayer.play();
        document.removeEventListener('click', startMusicOnFirstClick);
    };
    document.addEventListener('click', startMusicOnFirstClick);

    const setVolume = (value) => {
        audioPlayer.volume = value / 100;
    };
    setVolume(volumeSlider.value);
    volumeSlider.addEventListener('input', (event) => setVolume(event.target.value));

    const togglePlay = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = "Pause";
            musicDiv.style.display = "block"; 
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = "Play";
            musicDiv.style.display = "none";   
        }
    };
    playPauseButton.textContent = "Play";
    playPauseButton.addEventListener('click', togglePlay);

    audioPlayer.addEventListener('play', () => {
        playPauseButton.textContent = "Pause";
        musicDiv.style.display = "block";
    });
    audioPlayer.addEventListener('pause', () => {
        playPauseButton.textContent = "Play";
        musicDiv.style.display = "none";
    });

    (function titleScroller() {
        const message = "  [# S 4 F 3 0 n W 4 y #]";
        let position = 0;
        let direction = 'forward';
        const speed = 150;

        function scroll() {
            if (direction === 'forward') {
                position++;
                if (position > message.length) {
                    direction = 'backward';
                    setTimeout(scroll, speed * 10);
                    return;
                }
                document.title = message.substring(0, position);
            } else { 
                position--;
                if (position < 0) {
                    position = 0;
                    direction = 'forward';
                    setTimeout(scroll, speed * 5);
                    return;
                }
                document.title = message.substring(0, position);
            }
            setTimeout(scroll, speed);
        }
        scroll();
    })();

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'u') {
            e.preventDefault();
        }
    });
});
