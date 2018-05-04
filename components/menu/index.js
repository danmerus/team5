import React from 'react';

import TimeWatch from './TimeWatch/TimeWatch.js';
import AddToContactsForm from './AddToContactForm/AddToContactsForm.js';
import ProfileModal from '../ProfileModal/ProfileModal.js';
import Contacts from './Contacts/Contacts.js';
import Bell from 'react-icons/lib/fa/bell-o';
import AlarmInputModal from './AlarmInputModal/AlarmInputModal.js';

import './styles.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUrl: props.menu.avatar,
            name: props.menu.name,
            contactList: props.contacts,
            link: props.menu.link,
            registered: props.menu.registered
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNewContact = this.handleNewContact.bind(this);
        this.handleCloseAlarmModal = this.handleCloseAlarmModal.bind(this);
        this.handleOpenAlarmModal = this.handleOpenAlarmModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleOpenAlarmModal() {
        this.setState({ showAlarmModal: true });
    }

    handleCloseAlarmModal() {
        this.setState({ showAlarmModal: false });
    }

    handleNewContact(contact) {
        const newContacts = this.state.contactList.slice();
        newContacts.push(contact);

        this.setState({
            contactList: newContacts
        });
    }

    render() {

        return (
            <div className='menu'>
                <ProfileModal
                    showModal={this.state.showModal}
                    username={this.state.name}
                    handleCloseModal={this.handleCloseModal}
                    avatarUrl={this.state.avatarUrl}
                />
                <AlarmInputModal
                    showModal={this.state.showAlarmModal}
                    handleCloseModal={this.handleCloseAlarmModal}
                />

                <div className='menu__avatar-wrapper'>
                    <img
                        className="menu__avatar-img"
                        src={this.state.avatarUrl}
                        onClick={this.handleOpenModal}
                        draggable='false'
                    />
                </div>

                <div className='menu__name-and-time'>
                    {this.state.name}
                    <TimeWatch/>
                </div>

                <Contacts
                    contactList={this.state.contactList}
                />

                <AddToContactsForm
                    handleNewContact={this.handleNewContact}
                    currentUser={this.state.name}
                />
                <button className='menu__alarm-button' onClick={this.handleOpenAlarmModal}>
                    Будильник
                    <Bell className="menu__alarm-icon"/>
                </button>
            </div>
        );
    }
}
