import React from 'react';
import PropTypes from 'prop-types';
import dataDone from './AchiveDone.json';
import {
    ModalBackDrop,
    ModalContent,
    Scroll,
    Close,
    ItemScroll
} from './Css'
import axios from "axios/index";
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            dataDone: [],
            empty:false,
        };

    }

    componentDidMount(){
        this.setState({ isLoading: true });
        const {gameid} = this.props;
        let self = this;
        const localValue = localStorage.getItem('id');
        axios.post('http://localhost/steam/steamachived.php', {
            gameid:gameid,
            data: localValue,
        })
            .then(function (response) {
                let check = response.data.game.availableGameStats.achievements;
                if(check === undefined){
                    console.log('oh');
                    self.setState({
                        empty:true
                    })
                }
                else{
                    self.setState({
                        data:response.data.game
                    });

                    return (axios.post('http://localhost/steam/steamachiveddone.php', {
                        gameid:gameid,
                        data: localValue,
                    }).then(function (response) {
                        console.log(response.data);
                        self.setState({
                            dataDone:response.data.playerstats
                        })
                    })
                        .catch(function (error) {
                            console.log(error);
                        }))

                }

            })
            .then(function () {
                self.setState({ isLoading: false })
            })     .catch(function (error) {
            console.log(error);
        });


    }
    render() {
        const {name} = this.props;

        const {data, dataDone,isLoading,empty} = this.state;
        // Render nothing if the "show" prop is false
        if(!this.props.onHide) {
            return null;
        }
        if (isLoading) {
            return(
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                            <h1>Loading ...</h1>
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            )
        }

        if(empty === false){
            return(
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                            <h1>sorry this game not achived</h1>
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            )
        }
        if(empty){
            return(
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                            <h1>true</h1>
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            )
        }
        else if(data.length !== 0) {
            const DataAchive = data.availableGameStats.achievements;

            const DataDoneAchiev = dataDone.achievements;
            console.log(DataDoneAchiev)
            return (
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                                {
                                    DataAchive.map((item,i) => <ItemScroll key={i}>
                                        <img src={
                                            DataDoneAchiev[i].achieved === 1 ?
                                                `${item.icon}` :
                                                `${item.icongray}`} alt={item.name} />
                                        <p>{item.displayName}</p>
                                        <p>{item.description}</p>
                                            <p>{DataDoneAchiev[i].unlocktime === 0 ?
                                                ` ` :
                                                (new Date(DataDoneAchiev[i].unlocktime * 1000)).toDateString()
                                            }</p>
                                    </ItemScroll>)
                                }
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            );
        }

    }
}

Modal.propTypes = {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;