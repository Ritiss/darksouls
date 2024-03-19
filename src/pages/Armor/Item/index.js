import React from 'react';
import classnames from 'classnames';
import style from './style.css';

const cn = classnames.bind(style);

class Armor extends React.Component {
    constructor() {
        super();

        this.state = {
            currentCharacter: window.location.href.split('/')[6],
            currentGame: window.location.href.split('/')[4],
            armor: {
                _id: null,
                id: null,
                title: null,
                type: null,
                phys_defense: null,
                magic_defense: null,
                fire_defense: null,
                lightning_defense: null,
                bleed_resistance: null,
                poison_resistance: null,
                curse_resistance: null,
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
            this.getDataArmor,
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

    getDataArmor = () => {
        let context = this;

        fetch(`http://localhost:3001/api/getArmorData/:${context.state.currentCharacter}`)
            .then((data) => data.json())
            .then((res) => this.setState({
                armor: {

                    _id: res.data._id,
                    id: res.data.id,
                    title: res.data.title,
                    type: res.data.type,
                    phys_defense: res.data.phys_defense,
                    magic_defense: res.data.magic_defense,
                    fire_defense: res.data.fire_defense,
                    lightning_defense: res.data.lightning_defense,
                    bleed_resistance: res.data.bleed_resistance,
                    poison_resistance: res.data.poison_resistance,
                    curse_resistance: res.data.curse_resistance,
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
        const { armor,
            currentCharacter,
            gameItem
        } = this.state;

        return <div className="characterList">
            <audio id={'bgmusic'} src={`/assets/sounds/${gameItem.audio}`} loop />
            <div className="bigBoy">
                <div className="backgr">
                    <div className="block">
                        <div className="cont1">
                            <div
                                className="img chs"
                                style={{ backgroundImage: `url(${armor.image})` }}
                            />
                            <div className="weight chs param">
                                <p>Weight</p>
                                <p>{armor.weight}</p>
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="name chs tex">
                                <p>{armor.title}</p>
                            </div>
                            <div className="type chs tex">
                                <p>{armor.type} set</p>
                            </div>
                            <div className="description chs tex">
                                <p>{armor.description}</p>
                            </div>

                            <div className="stats chs tex">
                                <div className="defense">
                                    <div>
                                        <img src="/assets/img/phys_def.jpg" alt="" title='Physical Defense' />
                                        <p>{armor.phys_defense}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/mag_def.jpg" alt="" title='Magic Defense' />
                                        <p>{armor.magic_defense}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/fire_def.jpg" alt="" title='Fire Defense' />
                                        <p>{armor.fire_defense}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/light_def.jpg" alt="" title='Lightning Defense' />
                                        <p>{armor.lightning_defense}</p>
                                    </div>
                                </div>
                                <div className="res">
                                    <div>
                                        <img src="/assets/img/bleed_res.jpg" alt="" title='Bleed Resist' />
                                        <p>{armor.bleed_resistance}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/poison_res.jpg" alt="" title='Poison Resist' />
                                        <p>{armor.poison_resistance}</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/curse_res.jpg" alt="" title='Curse Resist' />
                                        <p>{armor.curse_resistance}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default Armor;
