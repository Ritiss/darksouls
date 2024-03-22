import React from 'react';
import classnames from 'classnames';
import style from './style.css';

const cn = classnames.bind(style);

class Weapon extends React.Component {
    constructor() {
        super();

        this.state = {
            currentWeapon: window.location.href.split('/')[6],
            currentGame: window.location.href.split('/')[4],
            weapons: {
                _id: null,
                id: null,
                title: null,
                type: null,
                phys_damage: null,
                magic_damage: null,
                fire_damage: null,
                lightning_damage: null,
                weight: null,
                description: null,
                image: null
            },
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
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataWeapons,
            this.getDataGames
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
        let context = this;

        fetch(`http://localhost:3001/api/getWeaponsData/:${context.state.currentWeapon}`)
            .then((data) => data.json())
            .then((res) => this.setState({
                weapons: {
                    _id: res.data._id,
                    id: res.data.id,
                    title: res.data.title,
                    type: (res.data.type).split('_').join(' '),
                    phys_damage: res.data.phys_damage,
                    magic_damage: res.data.magic_damage,
                    fire_damage: res.data.fire_damage,
                    lightning_damage: res.data.lightning_damage,
                    weight: res.data.weight,
                    description: res.data.description,
                    image: res.data.image
                }
            }));
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
            currentWeapon
        } = this.state;

        return <div className="characterList">
            <audio id={'bgmusic'} src={`/assets/sounds/${gameItem.audio}`} loop />
            <div className="bigBoy">
                <div className="backgr">
                    <div className="block">
                        <div className="cont1">
                            <div
                                className="img chs"
                                style={{ backgroundImage: `url(${weapons.image})` }}
                            />
                            <div className="weight chs param">
                                <p>Weight</p>
                                <p>{weapons.weight}</p>
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="name chs tex">
                                <p>{weapons.title}</p>
                            </div>
                            <div className="type chs tex">
                                <p>{weapons.type}</p>
                            </div>
                            <div className="description chs tex">
                                <p>{weapons.description}</p>
                            </div>

                            <div className="stats chs tex">
                                <div className="defense">
                                    <div>
                                        <img src="/assets/img/phys_damage.jpg" alt="" title='Physical Damage' />
                                        <p>{weapons.phys_damage}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/magic_damage.jpg" alt="" title='Magic Damage' />
                                        <p>{weapons.magic_damage}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/fire_damage.jpg" alt="" title='Fire Damage' />
                                        <p>{weapons.fire_damage}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/light_damage.jpg" alt="" title='Lightning Damage' />
                                        <p>{weapons.lightning_damage}</p>
                                    </div>
                                </div>
                                <div className="res">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <video src={`/assets/videos/${gameItem.video}`} className={'video'} autoPlay loop muted />
        </div>

    }
}

export default Weapon;
