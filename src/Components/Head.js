import React, { Component } from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pin from './Pin'


class Nav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showHowToUse: false,
        }
    }

    handleCancelHowToUse = () => {

        this.setState({
            showHowToUse: false,
        })
    }


    render() {
        return (
            <>
                <div id='wrapper'>
                    <div className='info-section'>
                        <p className='info-section-head'>ForVaccine</p>
                        <p style={{ fontSize: '16px', padding: '7px', marginBottom: '2px' }}>Get notified whenever slots open up. Just fill in the details, sit back and relax!</p>
                        <div className='flex-container'>
                            <p className='details-to-use'><CheckCircleOutlineIcon style={{ fontSize: '22px' }} /> Choose details</p>
                            <p className='details-to-use'><NotificationsNoneIcon style={{ fontSize: '22px' }} /> Get notified</p>
                            <p className='details-to-use'><LocalHospitalIcon style={{ fontSize: '22px' }} /> Book slots</p>
                        </div>
                        <p style={{ fontSize: '16px', padding: '7px' }}><a className='find_slot'
                            onClick={() => {
                                this.setState({
                                    showHowToUse: true
                                })
                            }}>How to find a slot?</a></p>
                    </div>
                    <Pin/>
                    <div style={{ color: '#fff', textAlign: 'center' }}><p className='footer'>Managed by <a className='creator' href='https://www.linkedin.com/in/abhishek-agarwal-gurugram/'>Abhishek</a> & <a className='creator' href='https://www.linkedin.com/in/itsprashant95/'>Prashant</a></p></div>
                </div>

                {/* modal for how to use */}
                <Modal dialogClassName="my-modal" show={this.state.showHowToUse} onHide={this.handleCancelHowToUse}>
                    <Modal.Header closeButton>
                        <Modal.Title>It is easy to use</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>Choose minimum age from given options</li>
                            <li>Choose number of days</li>
                            <li>Select state and district</li>
                            <li>Chooose vaccine</li>
                            <li>Chooose whether it is your first dose or second</li>
                            <li>Click on 'Get Notified'</li>
                        </ul>
                        <p>Our Webapp will keep on searching for slots according to your choices and notify you. Available slots will be displayed with relevant details.</p>
                        <p>Best part - if you miss a notification it will still keep on searching for slots until you chose to cancel.</p>
                        <p></p>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Nav
