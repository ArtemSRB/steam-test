import React, { Component } from 'react';
import {
    Input,
    Button
} from './Css'
import { BrowserRouter, Route} from 'react-router-dom';
import Game from './game'
import Content from './content';
import axios from 'axios';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            submitted: false,
            players:[],
            value:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const localValue = localStorage.getItem('id');
        console.log(localValue);
        let self = this;
        if(localValue){
            axios.post('http://localhost/steam/steamapi.php', {
                data: localValue,
            })
                .then(function (response) {
                    console.log(response.data.response.players[0]);
                    self.setState({
                        players:response.data.response.players[0],
                        submitted:true
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let id = this.state.value;
        localStorage.setItem('id', this.state.value);
        const localValue = localStorage.getItem('id')
        console.log(localValue)
        let self = this;
        axios.post('http://localhost/steam/steamapi.php', {
                data: id,
        })
            .then(function (response) {
                console.log(response.data.response.players[0]);
                self.setState({
                players:response.data.response.players[0],
                submitted:true
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render()
    {

        const { value, isLoaded, error, players} = this.state;
        let WrappedHome;
        if (this.state.submitted === true) {
            WrappedHome = function(props) {
                return (<Content {...props}
                                 value={value}
                                 isLoaded={isLoaded}
                                 players={players}
                                 error={error}  />);
            };
        }
        return (
            <div>
            <form action="" className="form_search" onSubmit={this.handleSubmit} >
                <Input type="text" placeholder="steam id" minLength="15" value={this.state.value}  onChange={this.handleChange}/>
                <Button type="submit" >get data</Button>

            </form>
                <BrowserRouter>
                    <div>
                    <Route exact path="/" component={WrappedHome}/>
                    <Route path="/game" component={Game} />
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}


export default Form;