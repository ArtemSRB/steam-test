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
            submitted: false,
            isLoaded: true,
            players:[],
            value:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const localValue = localStorage.getItem('id');
        let self = this;
        if(localValue){
            axios.post('http://test-steam.tmweb.ru/steamapi.php', {
                data: localValue,
            })
                .then(response => {
                    console.log(response);
                    self.setState({
                        players:response.data.response.players[0],
                        submitted:true,
                    })
                })
                .catch(error => {
                    console.log(error);
                    self.setState({
                        error:true,
                        submitted:true,
                    })
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
        let self = this;
        axios.post('http://test-steam.tmweb.ru/steamapi.php', {
                data: id,
        })
            .then(response => {
                console.log(response.data.response.players[0]);
                self.setState({
                players:response.data.response.players[0],
                submitted:true,
                })
            })
            .catch(error => {
                console.log(error);
                self.setState({
                    error:true,
                    submitted:true,
                })
            });
    };
    render()
    {

        const { value, error, players} = this.state;
        const enabled =
            value.length > 15;
        let WrappedHome;

            if (this.state.submitted === true) {
                    WrappedHome = function(props) {
                        return (<Content {...props}
                                         value={value}
                                         players={players}
                                         error={error}  />);
                    };
            }

        return (
            <div>
                <form action="" className="form_search" onSubmit={this.handleSubmit} >
                    <Input type="text" placeholder="steam id"  value={this.state.value}  onChange={this.handleChange}/>
                    <Button type="submit" disabled={!enabled}>get data</Button>

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