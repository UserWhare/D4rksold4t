document.addEventListener('DOMContentLoaded', () => {

    const audioPlayer = document.getElementById('bgm');
    const volumeSlider = document.getElementById('volume-slider');
    const playPauseButton = document.getElementById('play-pause-button');

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

    let isPlaying = false;
    audioPlayer.onplaying = () => {
        isPlaying = true;
        playPauseButton.textContent = "Pause";
    };
    audioPlayer.onpause = () => {
        isPlaying = false;
        playPauseButton.textContent = "Play";
    };
    const togglePlay = () => {
        isPlaying ? audioPlayer.pause() : audioPlayer.play();
    };
    playPauseButton.addEventListener('click', togglePlay);

    (function titleScroller() {
        const message = "   [# S 4 F 3 0 n W 4 y #]";
        let position = 0;
        let direction = 'forward';
        const speed = 150;

        function scroll() {
            if (direction === 'forward') {
                position++;
                if (position > message.length) {
                    direction = 'backward';
                    setTimeout(scroll, speed * 5);
                    return;
                }
                document.title = message.substring(0, position);
            } else {
                position--;
                if (position < 0) {
                    direction = 'forward';
                    setTimeout(scroll, speed * 5);
                    return;
                }
                const start = Math.max(0, message.length - position);
                document.title = message.substring(start);
            }
            setTimeout(scroll, speed);
        }
        scroll();
    })();

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
        }
        if (e.ctrlKey && ['u', 'c', 'v'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    });

});
