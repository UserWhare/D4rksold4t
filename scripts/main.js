// Roda o script só depois que o HTML carregou tudo, pra não dar erro.
document.addEventListener('DOMContentLoaded', () => {

    // Pegando os elementos que vou usar várias vezes
    const audioPlayer = document.getElementById('bgm');
    const volumeSlider = document.getElementById('volume-slider');
    const playPauseButton = document.getElementById('play-pause-button');

    // --- workaround pro autoplay de áudio que os navegadores bloqueiam ---
    const startMusicOnFirstClick = () => {
        audioPlayer.play();
        document.removeEventListener('click', startMusicOnFirstClick); // Roda só uma vez
    };
    document.addEventListener('click', startMusicOnFirstClick);

    // --- Controle de Volume ---
    const setVolume = (value) => {
        // O valor do slider vai de 0-100, e o do áudio de 0.0-1.0
        audioPlayer.volume = value / 100;
    };
    // Define o volume inicial
    setVolume(volumeSlider.value);
    // Listener pra quando o slider mudar
    volumeSlider.addEventListener('input', (event) => setVolume(event.target.value));

    // --- Controle de Play/Pause ---
    let isPlaying = false; 
    // Ouve os eventos do player pra saber se tá tocando ou não
    audioPlayer.onplaying = () => {
        isPlaying = true;
        playPauseButton.textContent = "Pause";
    };
    audioPlayer.onpause = () => {
        isPlaying = false;
        playPauseButton.textContent = "Play";
    };
    // Função que troca o estado do player
    const togglePlay = () => {
        isPlaying ? audioPlayer.pause() : audioPlayer.play();
    };
    // Listener do botão
    playPauseButton.addEventListener('click', togglePlay);

    // --- Efeito de "máquina de escrever" no título da página ---
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
                    setTimeout(scroll, speed * 5); // Pausa no final
                    return;
                }
                document.title = message.substring(0, position);
            } else { 
                position--;
                if (position < 0) {
                    direction = 'forward';
                    setTimeout(scroll, speed * 5); // Pausa no início
                    return;
                }
                const start = Math.max(0, message.length - position);
                document.title = message.substring(start);
            }
            setTimeout(scroll, speed);
        }
        scroll();
    })();

    // --- Bloqueios de Ações (antigo hide.js) ---
    // Bloqueia o menu de contexto (clique direito)
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Bloqueia alguns atalhos do teclado
    document.addEventListener('keydown', (e) => {
        // Bloqueia F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Bloqueia Ctrl+U (Ver código-fonte), Ctrl+C (Copiar), Ctrl+V (Colar)
        if (e.ctrlKey && ['u', 'c', 'v'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    });

});