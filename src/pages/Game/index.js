import React from 'react';
import classnames from 'classnames';
import style from './style.css';

const cn = classnames.bind(style);

class GameItem extends React.Component {
    constructor() {
        super();

        this.state = {
            currentGame: window.location.href.split('/')[4],
            characters: [],
            gameItem: {
                _id: null,
                id: null,
                title: null,
                release_date: null,
                description: null,
                img: null,
                video: null,
                audio: null,
                info: null
            },
            games: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataCharacters,
            this.getDataGames,
            this.getDataGame
        ];

        for (let i = 0; i < datas.length; i++) {
            datas[i]();

            if (!this.state.intervalIsSet) {
                let interval = setInterval(datas[i](), 1000);
                this.setState({ intervalIsSet: interval });
            }
        }

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

    getDataGame = () => {
        fetch('http://localhost:3001/api/getGamesData')
            .then((data) => data.json())
            .then((res) => this.setState({ games: res.data }));
    };

    getDataGames = () => {
        let context = this;

        fetch(`http://localhost:3001/api/getGamesData/:${context.state.currentGame}`)
            .then((data) => data.json())
            .then((res) => this.setState({
                gameItem: {

                    _id: res.data._id,
                    id: res.data.id,
                    title: res.data.title,
                    release_date: res.data.release_date,
                    description: res.data.description,
                    img: res.data.img,
                    video: res.data.video,
                    audio: res.data.audio,
                    info: res.data.info
                }
            }));

    };

    render() {
        const { characters,
            gameItem,
            games,
            currentGame
        } = this.state;

        return <>
            <header>
                <div className={'cont'}>
                    <audio id={'bgmusic'} src={`/assets/sounds/${gameItem.audio}`} loop />

                    <canvas className={cn('particles', 'par')} data-color="#7e553c"></canvas>
                    <canvas className={cn('particles', 'par')} data-color="#d09d7d"></canvas>

                    <div className={'headerTitle'}>
                    </div>
                    <section className={'headerCont'}>
                        <div className={'foreword'}>
                            <h1>{gameItem.title}</h1>
                            <p>{gameItem.description}</p>
                        </div>
                    </section>
                </div>
                <video src={`/assets/videos/${gameItem.video}`} className={'video'} autoPlay loop muted />
            </header>
            <main>
                <div className={'forBack'}>
                    <section className={cn('cont', 'forDescription')}>
                        <div className={'img_desc'}>
                            <div />
                        </div>
                        <div className={'desc'}>
                            <h2 className={'element-animation'}>Description</h2>
                            <p className={'element-animation'}>{gameItem.info}</p>
                            <a href={`/games/${currentGame}/dead`} className={cn('btn', 'element-animation')}>
                                More
                            </a>
                        </div>
                    </section>
                </div>
                <div className={'forBackground'}>
                    <div className={'cont'}>
                        <section className={'menuDirectory'}>
                            <h4 className={'element-animation'}>Categories</h4>
                            <div className={'circles'}>
                                <a href={`/games/${currentGame}/characters/`}>
                                    <div className={cn('block', 'circleDrink1')}>
                                        <h5 className={'text'}>

                                            Characters

                                        </h5>
                                    </div>
                                </a>
                                <a href={`/games/${currentGame}/armor/`}>
                                    <div className={cn('block', 'circleDrink2')}>
                                        <h5 className={'text'}>Armor</h5>
                                    </div>
                                </a>
                                <a href={`/games/${currentGame}/weapons/`}>
                                    <div className={cn('block', 'circleDrink3')}>
                                        <h5 className={'text'}>Weapons</h5>
                                    </div>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <footer>
                <div className={'cont'}>
                    <div className="back_menu">
                        <div className="btn_menu">
                            <a href={`/`} className="btn">
                                Go home
                            </a>
                        </div>
                        <div className="btn_menu">
                            <a href={`/games`} className="btn">
                                Hearth
                            </a>
                        </div>
                        {games.map(item => {
                            const what = item.title.replace(/ /g, '_');

                            return <div className="btn_menu">
                                <a href={`/games/${what}`} className="btn">
                                    {item.title}
                                </a>
                            </div>
                        }
                        )}
                    </div>
                    <p className={'copy'}>
                        <span className={'copySpan'}>©</span>
                        <span>2024 ISIP group</span>
                    </p>
                </div>
            </footer>
        </>
    }
}

export default GameItem;
