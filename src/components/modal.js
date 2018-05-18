import React from 'react';
import PropTypes from 'prop-types';
import data from './Achived.json';
import dataDone from './AchiveDone.json';
import {
    ModalBackDrop,
    ModalContent,
    Scroll,
    Close,
    ItemScroll
} from './Css'
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data.game.availableGameStats,
            dataDone: dataDone.playerstats,
        };
    }
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.onHide) {
            return null;
        }

        const {name} = this.props;
        const {data, dataDone} = this.state;
        const DataAchiev = data.achievements;
        const DataDoneAchiev = dataDone.achievements;
        return (
            <ModalBackDrop className="backdrop" >
                <ModalContent className="modal">
                    <Close onClick={this.props.onHide}>
                        &times;
                    </Close>
                    <h2>{name}</h2>
                    <Scroll>
                    {
                        DataAchiev.map((item,i) => <ItemScroll key={i}>
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

Modal.propTypes = {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;