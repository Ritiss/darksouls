import React from 'react';
import classnames from 'classnames';
import style from './caracter.css';

const cn = classnames.bind(style);

class Character extends React.Component {
    constructor() {
        super();

        this.state = {
            currentCharacter: window.location.href.split('/')[6],
            currentGame: window.location.href.split('/')[4],
            character: {
                _id: null,
                id: null,
                name: null,
                type: null,
                health: null,
                souls: null,
                game: null,
                image: null,
                description: null
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
            this.getDataCharacter,
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

    getDataCharacter = () => {
        let context = this;

        fetch(`http://localhost:3001/api/getCharactersData/:${context.state.currentCharacter}`)
            .then((data) => data.json())
            .then((res) => this.setState({
                character: {

                    _id: res.data._id,
                    id: res.data.id,
                    name: res.data.name,
                    type: res.data.type,
                    health: res.data.health,
                    souls: res.data.souls,
                    game: res.data.game,
                    image: res.data.image,
                    description: res.data.description
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
        const { character,
            gameItem,
            currentCharacter
        } = this.state;

        return <div className="characterList">
            <audio id={'bgmusic'} src={`/assets/sounds/${gameItem.audio}`} loop />
            <div className="bigBoy">
                <div className="backgr">
                    <div className="block">
                        <div className="cont1">
                            <div
                                className="img chs"
                                style={{ backgroundImage: `url(${character.image})` }}
                            />
                            <div className="hp chs param">
                                <p>Health</p>
                                <p>{character.health}</p>
                            </div>
                            <div className="souls chs param">
                                <p>Souls</p>
                                <p>{character.souls}</p>
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="name chs tex">
                                <p>{character.name}</p>
                            </div>
                            <div className="type chs tex">
                                <p>{character.type}</p>
                            </div>
                            <div className="description chs tex">
                                <p>{character.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Character;
