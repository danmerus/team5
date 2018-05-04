import React from 'react';
import ReactModal from 'react-modal';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';


import './styles.css';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            showModal: nextProps.showModal,
            username: nextProps.username,
            handleCloseModal: nextProps.handleCloseModal,
            githubUrl: `https://github.com/${nextProps.username}`,
            avatarUrl: nextProps.avatarUrl
        };
    }

    render() {
        return (
            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.state.handleCloseModal}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, .2)',
                        justifyContent: 'center',
                        zIndex: 1000
                    },
                    content: {
                        backgroundColor: 'rgba(0, 0, 0, .0)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: 470,
                        height: 250,
                        border: null
                    }
                }}
            >
                <div>
                    <div className='profile'>
                        <div className='alarm__inputs'>
                            <label className='alarm__datetime-label'>
                                <span className='alarm__datetime-text'>Когда разбудить:</span>
                                <input className='alarm__datetime-input' type="datetime-local"/>
                            </label>
                            <form className='alarm__mobile-label'>
                                <span className='alarm__mobile-text'>Куда позвонить:</span>
                                <Phone
                                    className='alarm__mobile-input'
                                    country="RU"
                                    placeholder="Ваш телефон"
                                    value={ this.state.value }
                                    onChange={ value => this.setState({ value }) }/>
                            </form>
                        </div>
                    </div>
                    <button className='profile__close-button'
                        onClick={this.state.handleCloseModal}>close</button>
                </div>
            </ReactModal>);
    }
}
