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
    render(){

        const {error, players} = this.props;
        console.log(error)
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (players === undefined) {
            return(
                <Profile>
                    <div>Error!</div>
                </Profile>
            );
        } else {
            let raw_time = parseInt( players.timecreated ) * 1000 ;
            let the_date = new Date( raw_time );
            let formatted_date = the_date.toDateString();
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