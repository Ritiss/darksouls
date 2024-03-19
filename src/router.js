import React from 'react';
import MainPage from './pages/Main/index';
import GameItem from './pages/Game/index';
import CharactersItem from './pages/Characters';
import Character from './pages/Characters/Item';
import ArmorItem from './pages/Armor';
import Armor from './pages/Armor/Item';
import WeaponsItem from './pages/Weapons';
import Dead from './pages/Dead';
import GamesPage from './pages/Games';
import Weapon from './pages/Weapons/Item';

const routes = [
    {
        path: `/`,
        exact: true,
        title: ``,
        component: MainPage
    },
    {
        path: `/games`,
        exact: true,
        title: ``,
        component: GamesPage
    },
    {
        path: `/games/:title`,
        exact: true,
        title: ``,
        component: GameItem
    },
    {
        path: `/games/:title/Dead`,
        exact: true,
        title: ``,
        component: Dead
    },
    {
        path: `/games/:title/characters/`,
        exact: true,
        title: ``,
        component: CharactersItem
    },
    {
        path: `/games/:title/characters/:name`,
        exact: true,
        title: ``,
        component: Character
    },
    {
        path: `/games/:title/armor/`,
        exact: true,
        title: ``,
        component: ArmorItem
    },
    {
        path: `/games/:title/armor/:name`,
        exact: true,
        title: ``,
        component: Armor
    },
    {
        path: `/games/:title/weapons/`,
        exact: true,
        title: ``,
        component: WeaponsItem
    },
    {
        path: `/games/:title/weapons/:name`,
        exact: true,
        title: ``,
        component: Weapon
    },
    {
        component: () => <div>
            <h2>404</h2>
        </div>
    }
];

export default routes;
