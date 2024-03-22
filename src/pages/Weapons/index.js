import React from 'react';
import classnames from 'classnames';
import style from '../Characters/category.css';

const cn = classnames.bind(style);

class WeaponsItem extends React.Component {
    constructor() {
        super();

        this.state = {
            currentGame: window.location.href.split('/')[4],
            weapons: [],
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
            this.getDataWeapons,
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
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataWeapons = () => {
        fetch('http://localhost:3001/api/getWeaponsData')
            .then((data) => data.json())
            .then((res) => this.setState({ weapons: res.data }));
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
        const { weapons,
            gameItem,
            games,
            currentGame
        } = this.state;

        let weaponTypes = [...new Set(weapons.filter((item) => (currentGame === item.game.replace(/ /g, '_'))).map((item) => item.type))];
     console.log(weaponTypes)
        return <>
            <audio id={'bgmusic'} src={`/assets/sounds/${gameItem.audio}`} loop />

            <header>
                <div className="cont">
                    <section className="headerCont">
                        <div className="foreword">
                            <h1>{gameItem.title}</h1>
                            <p>Weapons</p>
                        </div>
                    </section>
                </div>
            </header>
            <main>
                <div className="forBackground">
                    <div className="cont">
                        <section className="menuDirectory">
                            <div className="blocks">
                                {weaponTypes.map(type => {
                                    return <div className="block">
                                        <h5 className="text">{type.replace('_', ' ')}s</h5>
                                        {weapons.filter((item) => (
                                            (currentGame === item.game.replace(/ /g, '_')) && (item.type === type)
                                        )).map(item => {
                                            const what = item.title.replace(/ /g, '_');
                                            return <a href={`/games/${currentGame}/weapons/${what}`} className={'itemIt'}>
                                                {item.title}
                                            </a>;
                                        })}
                                    </div>
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <video src={`/assets/videos/${gameItem.video}`} className={'video'} autoPlay loop muted />
            <footer>
                <div className="cont">
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
                    <p className="copy">
                        <span className="copySpan">©</span>
                        <span>2024 ISIP group</span>
                    </p>
                </div>
            </footer>
        </>
    }
}

export default WeaponsItem;
