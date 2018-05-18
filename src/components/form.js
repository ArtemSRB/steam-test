import React, { Component } from 'react';
import {
    Input,
    Button
} from './Css'
import data from './API.json';
import { BrowserRouter, Route} from 'react-router-dom';
import Game from './game'
import Content from './content';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            data: data.response.players[0],
            value:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('id', this.state.value);
        const localValue = localStorage.getItem('id');
        console.log(localValue);

    };
    render()
    {

        const { value, isLoaded, error, items, data} = this.state;
        const WrappedHome = function(props) {
            return (<Content {...props}
                          data={data}
                          value={value}
                          isLoaded={isLoaded}
                          items={items}
                          error={error}  />);
        };
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