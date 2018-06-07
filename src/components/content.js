import React, { Component } from 'react';
import {
    Profile,
    Avatar,
    Info,
} from './Css'
class Content extends Component {
    constructor() {
        super();
    }

        // http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=7A5F85FA779E5B3887295BDD14C3C2BC&steamids=76561198058962210
        // fetch('api.openweathermap.org/data/2.5/weather?q='+ city +'')
        // fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial')
    render(){

        const {error, players} = this.props;
        console.log(players);
        let raw_time = parseInt( players.timecreated ) * 1000 ;
        let the_date = new Date( raw_time );
        let formatted_date = the_date.toDateString();
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!players) {
            return <div>Loading...</div>;
        } else {
            return (
                <Profile>
                    <Avatar><img src={players.avatarfull} alt="avatar" />
                        <a href={players.profileurl} target="_blank">Go to Profile</a>
                    </Avatar>
                    <Info>
                        <p>{players.steamid}</p>
                        <p className="status">Online Status — <span className={players.personastate === 0 ? 'offline' : 'online'}>{players.personastate === 0 ? 'offline' : 'online'}</span></p>
                    <p>Date registration — {formatted_date}</p>
                        <a href="/game" >Game Profile</a>
                    </Info>
                </Profile>
            );
        }
    }
}

export default Content;