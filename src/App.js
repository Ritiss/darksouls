import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pathname: props.history.location.pathname
        };
    }

    audioFunc() {
        let isMusicMuted;

        if (localStorage.getItem('isMusicMuted') == null) {
            isMusicMuted = false;
        } else {
            isMusicMuted = JSON.parse(localStorage.getItem('isMusicMuted'));
        }

        function musicMute(isMusicMuted, musicToggle, musicPlayer) {
            console.log(musicPlayer)
            if (isMusicMuted) {
                musicPlayer.pause();
                musicToggle.style.background = "url(/assets/img/notent.png) no-repeat";
            } else {
                musicPlayer.play();
                musicToggle.style.background = "url(/assets/img/note.png) no-repeat";
            }

            musicToggle.style.backgroundSize = "100%";
        }

        setTimeout(function () {
            let musicToggle = document.getElementById("toggleMusic");
            let musicPlayer = document.getElementById("bgmusic");

            musicMute(isMusicMuted, musicToggle, musicPlayer);

            musicToggle.onclick = function () {
                isMusicMuted = !isMusicMuted;
                musicMute(isMusicMuted, musicToggle, musicPlayer);
                localStorage.setItem('isMusicMuted', JSON.stringify(isMusicMuted));
            }
        }, 800)
    }


    componentDidMount() {

        window.onpageshow = function (event) { if (event.persisted) { window.location.reload(); } };

        window.h.listen((e) => {
            this.setState({
                pathname: e.pathname
            });
        });

        let pathArray = (this.state.pathname.split('/'));
        let currentPath;

        if (pathArray[pathArray.length - 1] == '') {
            pathArray.pop();
        }

        if (pathArray[pathArray.length - 1] == '') {
            currentPath = 'main';
        } else if (pathArray[pathArray.length - 2] == 'characters') {
            currentPath = 'character'
        } else if (pathArray[pathArray.length - 2] == 'armor') {
            currentPath = 'arr'
        } else if (pathArray[pathArray.length - 2] == 'weapons') {
            currentPath = 'weapon'
        } else {
            currentPath = pathArray[pathArray.length - 1];
        }

        document.querySelector('html').classList.add(currentPath + '_page');

        this.audioFunc();
    }

    render() {
        return <React.Fragment>

            <main>
                {this.props.children}
            </main>

            <div id={'toggleMusic'} className={'butt'} />
        </React.Fragment>;
    }
}

export default App;
