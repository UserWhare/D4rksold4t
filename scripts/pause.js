function playPause() {
  var icon = document.getElementById("play-pause");
    if (icon.classList.contains("fa-play")) { //<i class="fas fa-play"></i>
      icon.classList.remove("fa-play"); // <i class="fas fa-play"></i>
      icon.classList.add("fa-pause");
  } else {
     icon.classList.remove("fa-pause");
     icon.classList.add("fa-play"); // <i class="fas fa-play"></i>
  }
}

var myAudio = document.getElementById("bgm");
var isPlaying = false;

function togglePlay() {
if (isPlaying) {
  myAudio.pause()
} else {
  myAudio.play();
}
};
myAudio.onplaying = function() {
isPlaying = true;
};
myAudio.onpause = function() {
isPlaying = false;
};

window.SetVolume = function(val)
{
var player = document.getElementById('bgm');
console.log('Before: ' + player.volume);
player.volume = val / 100;
console.log('After: ' + player.volume);
}