import React from 'react';
import classnames from 'classnames';
import style from './style.css';

const cn = classnames.bind(style);

class GamesPage extends React.Component {
    constructor() {
        super();

        this.state = {
            characters: [],
            games: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataCharacters,
            this.getDataGames
        ];

        for (let i = 0; i < datas.length; i++) {
            datas[i]();

            if (!this.state.intervalIsSet) {
                let interval = setInterval(datas[i](), 1000);
                this.setState({ intervalIsSet: interval });
            }
        }

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


        const audio = new Audio("../sounds/sound.mp3"),
            buttonF = document.querySelectorAll(".fire_button");

        buttonF.forEach(btn => {
            btn.addEventListener("click", () => {
                audio.play();
                document.querySelector(".block").classList.add("transparent");
                document.querySelector(".legend").classList.add("active");
                document.querySelector(".text_frt").classList.add("text_add");
                document.querySelector(".text_bf").classList.add("text_an");
                document.querySelector(".blur").classList.add("blur_bg");
                document.querySelector(".link").classList.add("rest");
                document.querySelector(".here").classList.add("deleted");
            });
        });


        function onEntry(entry) {
            entry.forEach(change => {
                if (change.isIntersecting) {
                    change.target.classList.add('element-show');
                }
            });
        }

        let options = {
            threshold: [0.5]
        };
        let observer = new IntersectionObserver(onEntry, options);
        let elements = document.querySelectorAll('.element-animation');

        for (let elm of elements) {
            observer.observe(elm);
        }

        let dot;

        let particles = document.querySelectorAll('.particles'),
            radius = 1.4,
            number = 70

        particles.forEach(node => {

            let color = node.dataset.color

            const ctx = node.getContext('2d'),
                clr = hexToRgbA(color),
                width = window.innerWidth,
                height = window.innerHeight

            node.width = width
            node.height = height
            ctx.fillStyle = clr

            let dots = {
                num: number,
                distance: 200,
                d_radius: 200,
                velocity: -.9,
                array: []
            }

            function Dot() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = dots.velocity + Math.random()
                this.vy = dots.velocity + Math.random()
                this.radius = Math.random() * radius
            }

            Dot.prototype = {

                create: function () {
                    ctx.beginPath()
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                    ctx.fill()
                },

                animate: function () {
                    for (let i = 0; i < dots.num; i++) {
                        let dot = dots.array[i]
                        if (dot.x < 0 || dot.x > width) {
                            dot.vx = - dot.vx
                            dot.vy = dot.vy
                        } else if (dot.y < 0 || dot.y > height) {
                            dot.vx = dot.vx
                            dot.vy = - dot.vy
                        }
                        dot.x += dot.vx
                        dot.y += dot.vy
                    }
                }
            }

            function createDots() {
                ctx.clearRect(0, 0, width, height)
                for (let i = 0; i < dots.num; i++) {
                    dots.array.push(new Dot())
                    dot = dots.array[i]
                    dot.create()
                }
                dot.animate()
            }

            setInterval(createDots, 1000 / 30)

        })

        function hexToRgbA(hex) {
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                let c = hex.substring(1).split('')
                if (c.length == 3) { c = [c[0], c[0], c[1], c[1], c[2], c[2]] }
                c = `0x${c.join('')}`
                return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 1`
            } throw new Error('Bad Hex')
        }

    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataCharacters = () => {
        fetch('http://localhost:3001/api/getCharactersData')
            .then((data) => data.json())
            .then((res) => this.setState({ characters: res.data }));
    };

    getDataGames = () => {
        fetch('http://localhost:3001/api/getGamesData')
            .then((data) => data.json())
            .then((res) => this.setState({ games: res.data }));
    };

    render() {
        const { characters,
            games
        } = this.state;

        return <div className={'gameList'}>
            <div className={'cont'}>
                <audio id={'bgmusic'} src={`/assets/sounds/Majula.mp3`} loop />

                <canvas className={cn('particles', 'par')} data-color="#ffffff"></canvas>

                <div className={cn('logo', 'element-animation')}>
                    <h1>Hearth of Souls</h1>
                </div>

                <div className={'series'}>
                    {games.map(item => {
                        const what = item.title.replace(/ /g, '_');

                        return <a href={`/games/${what}`}>
                            <div className={'block'}>
                                <div className={'img'} style={{ backgroundImage: `url(/assets/img/${item.img})` }}></div>
                                <div className={'ser_number'}>
                                    <h2 className={''}>{item.title}</h2>
                                    <h4 className={''}>{item.release_date}</h4>
                                </div>
                            </div>
                        </a>
                    }
                    )}

                </div>

            </div>

            <video src={`/assets/videos/smoke-background-optimized.mp4`} className={'video'} autoPlay loop muted></video>

        </div>
    }
}

export default GamesPage;
