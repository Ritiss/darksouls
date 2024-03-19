

document.getElementById("toggleMusic").onclick = function () {

    let myaudio = document.getElementById("bgmusic");

    if (myaudio.paused == true) {
        document.getElementById("bgmusic").play();
        this.style.background = "url(/assets/img/note.png) no-repeat";
        this.style.backgroundSize = "100%";
    } else if (myaudio.paused == false) {
        document.getElementById("bgmusic").pause();
        this.style.background = "url(/assets/img/notent.png) no-repeat";
        this.style.backgroundSize = "100%";
    }
}

