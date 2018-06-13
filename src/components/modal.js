import React from 'react';
import PropTypes from 'prop-types';
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
        axios.post('http://test-steam.tmweb.ru/steamachived.php', {
            gameid:gameid,
            data: localValue,
        })
            .then(response => {
                    self.setState({
                        data:response.data.game.availableGameStats.achievements
                    });

                    return (axios.post('http://test-steam.tmweb.ru/steamachiveddone.php', {
                        gameid:gameid,
                        data: localValue,
                    })    .then(response => {
                        console.log(response.data);
                        self.setState({
                            dataDone:response.data.playerstats.achievements
                        })
                    })
                        .catch(error => {
                            console.log(error);

                            self.setState({
                                isLoading: false,
                                empty:true
                            })
                        }))

            })
            .then( () => {
                self.setState({ isLoading: false })
            })
            .catch(error => {
            console.log(error);

            self.setState({
                isLoading: false,
                empty:true,
            })

        });


    }
    render() {
        const {name} = this.props;
        const {data, dataDone,isLoading,empty} = this.state;
        if(data === undefined){
            return(
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                            <h1>This game does not have achievements</h1>
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            )
        }
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

        if(empty === true){
            return(
                <ModalBackDrop className="backdrop" >
                    <ModalContent className="modal">
                        <Close onClick={this.props.onHide}>
                            &times;
                        </Close>
                        <h2>{name}</h2>
                        <Scroll>
                            <h1>This game does not have achievements</h1>
                        </Scroll>

                    </ModalContent>
                </ModalBackDrop>
            )
        }
        if(empty === false){
            const DataAchive = data;
            const DataDoneAchiev = dataDone;
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