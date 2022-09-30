document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('bgm').play();
    document.removeEventListener('click', musicPlay);
}