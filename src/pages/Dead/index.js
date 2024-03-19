import React from 'react';
import classnames from 'classnames';
import style from './style.css';

const cn = classnames.bind(style);

class Dead extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
        ];

        for (let i = 0; i < datas.length; i++) {
            datas[i]();

            if (!this.state.intervalIsSet) {
                let interval = setInterval(datas[i](), 1000);
                this.setState({ intervalIsSet: interval });
            }
        }

        document.addEventListener('mousemove', e => {
            Object.assign(document.documentElement, {
                style: `
                --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
                --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
                `
            })
        })

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


        const audio = new Audio("/assets/sounds/sound_dd.mp3"),
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


    render() {
        const { 
        } = this.state;

        return <main>
            <audio id={'bgmusic'} src={`/assets/sounds/Dark-Souls-III-Soul-of-Cinder-Second-Phase.mp3`} loop />

            <section className="layers">
                <div className="layers_cont">
                    <div
                        className="layer layer_1"
                        style={{ background: "#000" }}
                    />
                    <div className="layer layer_2 here" />
                    <div className="layer layer_3">
                        <div className="cont">
                            <div className="blur">
                                <div className="block fire_button">
                                    <h1 className="element-animation">Open the chest</h1>
                                </div>
                                <div className="legend">
                                    <h2 className="text_frt">You died</h2>
                                    <h3 className="text_bf">You died</h3>
                                </div>
                                <div className="link">
                                    <h2>
                                        <a href={`/games`}>Try again</a>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="layer layer_4" style="background-image: url(assets/img/layer_4.png);"></div> */}
                    <canvas className="particles par" data-color="#af2f2f" />
                    <canvas className="particles par layer_5" data-color="#af2f2f" />
                    <canvas className="particles par layer_7" data-color="#af2f2f" />
                </div>
            </section>
        </main>
    }
}

export default Dead;
