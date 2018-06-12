import React, { Component } from 'react';
import noImg from './img/no-img.gif'
import Modal from './modal';
import {
    Games,
    Sort,
    Page,
    Achiev
} from './Css'
import axios from "axios/index";
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            gameid: [],
            currentPage: 1,
            activeModal: null,
            dataPerPage: 2
        };
        this.sorted = { playtime_forever: true, name: true };
        this.handleClick = this.handleClick.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.hideModal = this.hideModal.bind(this);
        let self = this;
        const localValue = localStorage.getItem('id');
        console.log(localValue);
        axios.post('http://localhost/steam/steamgameapi.php', {
            data: localValue,
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    data:response.data.response.games
                })
            })
            .then(function () {
                self.setState({ isLoading: false })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };
    clickHandler = (e, i) => {
        this.setState({ activeModal: i });

    };

    hideModal = () => {
        this.setState({ activeModal: null });

    };

    sort = (type) =>  {
        const { data } = this.state;
        console.log(data)
        const isSorted = this.sorted[type];
        let direction = isSorted ? 1 : -1;
        const sorted = data.slice().sort((a, b) => {
            if (a[type] === b[type]) { return 0; }
            if (type === "name") { return a[type].toLowerCase() > b[type].toLowerCase() ? direction : direction * -1; }
            return a[type] > b[type] ? direction : direction * -1;
        });
        this.sorted[type] = !isSorted;
        this.setState({ data: sorted });
    };
    pageItem = (number) =>  {
        return (
            <li
                key={number}
                id={number}
                onClick={this.handleClick}
                className={number === this.state.currentPage ? 'active' : ''}
            >
                {number}
            </li>
        );
    };

    pagination = (m, c) =>  {
        let current = c,
            last = m,
            delta = 1,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(this.pageItem(l + 1));
                } else if (i - l !== 1) {
                    rangeWithDots.push(this.pageItem('...'));
                }
            }
            rangeWithDots.push(this.pageItem(i));
            l = i;
        }
        return rangeWithDots;
    };
    render()
    {
        const {data, currentPage, dataPerPage,isLoading} = this.state;
        if (isLoading) {
            return(
                <Games>

                    <div>
                        <p>Loading...</p>
                    </div>
                </Games>
            )
        }
        const indexOfLastTodo = currentPage * dataPerPage;
        const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
        const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map((object, i) => {
            return (
                <Games key={i}>
                    { <img src={
                        !object.img_logo_url ?
                            `${noImg}` :
                            `http://media.steampowered.com/steamcommunity/public/images/apps/${object.appid}/${object.img_logo_url}.jpg`}
                         alt={object.name}/>}
                    {<div>
                        <p>{object.name}</p>
                        <p>Play Times — {Math.floor( object.playtime_forever / 60)} hours {object.playtime_forever % 60} minutes</p>
                        <p>AppId — {object.appid}</p>
                        <Achiev  id={i} onClick={e => this.clickHandler(e, i)}>Achiev</Achiev>

                    </div>}
                    {this.state.activeModal === i ?
                        <Modal
                            id={i}
                            name={object.name}
                            gameid={object.appid}
                            show={this.state.activeModal === i}
                            onHide={this.hideModal} >
                        </Modal>
                        : null}
                </Games>

            )
        });
        const tp = Math.ceil(data.length / dataPerPage);
        if (!data) { return (<p>Loading...</p>); }
        return (
            <div>
                <Sort className="sort-game-a" onClick={() => this.sort('name')}>A-Z</Sort>
                <Sort className="sort-game-h" onClick={() => this.sort('playtime_forever')}>Hours</Sort>
                <div className="item-game-block">
                    {renderTodos}
                </div>
                <Page>
                    {this.pagination(tp, currentPage)}

                </Page>
            </div>
        );
    }
}


export default Game;