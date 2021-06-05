import React, { Component } from 'react'
import { Checkbox, Divider } from 'antd';
import { Radio } from 'antd';
import { Select } from 'antd';
import track from '../track.mp3';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



import 'antd/dist/antd.css'
const CheckboxGroup = Checkbox.Group;

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ageValue: '18',
            ageOptions: ['18', '45'],
            selectedAge: '18',
            selectedAgeValue: '18',
            state_id: '',
            district_id: '',
            state_name: 'Please select state',
            district_name: 'Please select district',
            districtList: [],
            disableDistrictDropdown: true,
            disableOptions: false,
            vaccineOptions: ['Any', 'COVISHIELD', 'COVAXIN'],
            selectedVaccine: 'Any',
            daysOptions: ['7 days', '14 days'],
            selectedDays: '7 days',
            doseOptions: ['First', 'Second'],
            selectedDose: 'First',
            btn_text: 'Get Notified',
            showHideClassName: 'modal display-none',
            click_btn_disable: false,
            resList: [],
            dose1: 1,
            dose2: 0,
            show: false,
            beep: true,
            doseBool: '',
            resListDose1: [],
            resListDose2: [],
            errorResp: '',
            cancelBtnShow: 'hide-cancel-btn',
            showHowToUse: false,
            stateList: [{ "state_id": 1, "state_name": "Andaman and Nicobar Islands" }, { "state_id": 2, "state_name": "Andhra Pradesh" }, { "state_id": 3, "state_name": "Arunachal Pradesh" }, { "state_id": 4, "state_name": "Assam" }, { "state_id": 5, "state_name": "Bihar" }, { "state_id": 6, "state_name": "Chandigarh" }, { "state_id": 7, "state_name": "Chhattisgarh" }, { "state_id": 8, "state_name": "Dadra and Nagar Haveli" }, { "state_id": 37, "state_name": "Daman and Diu" }, { "state_id": 9, "state_name": "Delhi" }, { "state_id": 10, "state_name": "Goa" }, { "state_id": 11, "state_name": "Gujarat" }, { "state_id": 12, "state_name": "Haryana" }, { "state_id": 13, "state_name": "Himachal Pradesh" }, { "state_id": 14, "state_name": "Jammu and Kashmir" }, { "state_id": 15, "state_name": "Jharkhand" }, { "state_id": 16, "state_name": "Karnataka" }, { "state_id": 17, "state_name": "Kerala" }, { "state_id": 18, "state_name": "Ladakh" }, { "state_id": 19, "state_name": "Lakshadweep" }, { "state_id": 20, "state_name": "Madhya Pradesh" }, { "state_id": 21, "state_name": "Maharashtra" }, { "state_id": 22, "state_name": "Manipur" }, { "state_id": 23, "state_name": "Meghalaya" }, { "state_id": 24, "state_name": "Mizoram" }, { "state_id": 25, "state_name": "Nagaland" }, { "state_id": 26, "state_name": "Odisha" }, { "state_id": 27, "state_name": "Puducherry" }, { "state_id": 28, "state_name": "Punjab" }, { "state_id": 29, "state_name": "Rajasthan" }, { "state_id": 30, "state_name": "Sikkim" }, { "state_id": 31, "state_name": "Tamil Nadu" }, { "state_id": 32, "state_name": "Telangana" }, { "state_id": 33, "state_name": "Tripura" }, { "state_id": 34, "state_name": "Uttar Pradesh" }, { "state_id": 35, "state_name": "Uttarakhand" }, { "state_id": 36, "state_name": "West Bengal" }],
        }
    }

    selectAge = (e) => {
        // console.log(e.target.value)
        if (e.target.value == '18') {
            this.setState({
                selectedAge: e.target.value,
                selectedAgeValue: '18'
            })
        }
        else {
            this.setState({
                selectedAge: e.target.value,
                selectedAgeValue: '45'
            })
        }
    }

    selectVaccine = (e) => {
        // console.log(e.target.value)
        this.setState({
            selectedVaccine: e.target.value
        })
    }

    selectDays = (e) => {
        // console.log(e.target.value)
        this.setState({
            selectedDays: e.target.value
        })
    }

    selectDose = (e) => {
        // console.log(e.target.value)
        if (e.target.value == 'First') {
            this.setState({
                dose1: 1,
                dose2: 0,
                doseBool: ''
            })
        }
        else {
            this.setState({
                dose2: 1,
                dose1: 0,
                doseBool: '/true'
            })
        }
        this.setState({
            selectedDose: e.target.value
        })
    }

    handleDropdownState = () => {
        return (
            this.state.stateList.map((i, j) => {
                return (
                    <option key={i.state_id} value={i.state_id + '-' + i.state_name}>{i.state_name}</option>
                )
            })
        )
    }

    handleDropdownDistrict = () => {
        return (
            this.state.districtList.map((i, j) => {
                return (
                    <option key={i.district_id} value={i.district_id + '-' + i.district_name}>{i.district_name}</option>
                )
            })
        )
    }


    handleSelectState = (e) => {
        let y = e.split('-')
        this.setState({
            state_id: y[0],
            state_name: y[1]
            // stateName: 
        }, () => {

            fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + this.state.state_id, {
                method: 'GET',
                // body: formData
            }).then((res) => res.json())
                .then(res => {
                    // console.log('analytics =', res)
                    this.setState({
                        districtList: res.districts,
                        disableDistrictDropdown: false
                    })
                })
                .then(error => {
                    console.log(error)
                })
        })
    }


    handleSelectDistrict = (e) => {
        let x = e.split('-')
        this.setState({
            district_id: x[0],
            district_name: x[1],
            errorResp: ''
        })
    }

    getNotified = () => {
        // console.log('btn clicked')
        if (this.state.district_id != '') {
            this.setState({
                animate_div: 'animated_div',
                btn_text: 'Finding Slots',
                click_btn_disable: true,
                disableOptions: true,
                disableDistrictDropdown: true,
                errorResp: '',
                cancelBtnShow: 'show-cancel-btn',
            })
            // this.checkSlot()
            var self = this
            // self.checkSlot(timer)

            var timer = setInterval(function () {
                // your code goes here...
                console.log('recheck for slots')
                self.setState({
                    timer: timer
                }, () => {
                    self.checkSlot()
                })
            }, 60 * 1000); // 60 * 1000 milsec
        }
        else {
            this.setState({
                errorResp: 'Please select state and district'
            })
        }
    }

    checkSlot = () => {
        console.log('check slot')

        fetch('https://forvaccine.online/go/fetch/' + this.state.district_id + this.state.doseBool, {
            method: 'GET',
        }).then((res) => res.json())
            .then(res => {

               
        // clearInterval(this.state.timer)

                // console.log('res =', res)
                var x = []
                // console.log('before map x =', x)

                res.map((s, j) => {
                    s.sessions.map((i, k) => {
                        if (this.state.dose1 > 0 && i.vaccine == this.state.selectedVaccine && i.min_age_limit == this.state.selectedAgeValue && i.available_capacity > 20 && (i.available_capacity_dose1 > 20)) {
                            x.push({ 's': s, 'sessions': i })
                            // console.log('in 1st dose', x)
                        }
                        else if (this.state.dose2 > 0 && i.vaccine == this.state.selectedVaccine && i.min_age_limit == this.state.selectedAgeValue && i.available_capacity > 20 && (i.available_capacity_dose2 > 20)) {

                            // console.log('in 2nd dose')
                            x.push({ 's': s, 'sessions': i })
                        }
                        else if (this.state.dose1 > 0 && this.state.selectedVaccine == 'Any' && i.min_age_limit == this.state.selectedAgeValue && i.available_capacity > 20 && (i.available_capacity_dose1 > 20)) {

                            // console.log('in First dose any vaccine')
                            x.push({ 's': s, 'sessions': i })
                        }
                        else if (this.state.dose2 > 0 && this.state.selectedVaccine == 'Any' && i.min_age_limit == this.state.selectedAgeValue && i.available_capacity > 20 && (i.available_capacity_dose2 > 20)) {

                            // console.log('in 2nd dose any vaccine')
                            x.push({ 's': s, 'sessions': i })
                        }
                    })
                })

                // console.log('after map x =', x)

                if (x.length > 0 && this.state.dose1 > 0) {

                    // console.log('in x dose 1')
                    this.setState({
                        show: true,
                        resListDose1: x,
                        resListDose2: [],
                        showHideClassName: 'modal display-block',
                    }, () => {
                        this.beep()
                    })
                }
                else if (x.length > 0 && this.state.dose2 > 0) {

                    // console.log('in x dose2')
                    this.setState({
                        showHideClassName: 'modal display-block',
                        show: true,
                        resListDose2: x,
                        resListDose1: []
                    }, () => {
                        this.beep()
                    })
                }
                else {
                    // console.log('no dose')
                    this.setState({
                        showHideClassName: 'modal display-none',
                        show: false,
                        animate_div: 'animated_div',
                        btn_text: 'Finding Slots',
                        click_btn_disable: true,
                        resListDose2: [],
                        resListDose1: [],
                        cancelBtnShow: 'show-cancel-btn',
                    })
                }
            })
            .then(error => {
                console.log(error)
            })
    }

    beep = () => {
        // console.log('in beep')
        const audio = new Audio(track);
        audio.play();
    }

    handleCancel = () => {

        this.setState({
            showHideClassName: 'modal display-none',
            show: false,
            disableOptions: true,
            beep: false,
            resListDose1: [],
            resListDose2: [],
            cancelBtnShow: 'show-cancel-btn',
            animate_div: 'animated_div',
            btn_text: 'Finding Slots',
            click_btn_disable: true,
        })
    }

    handleCancelHowToUse = () => {

        this.setState({
            showHowToUse: false,
        })
    }

    cancelFindingSlot = () => {

        console.log('cancel finding slot clicked', this.state.timer)

        clearInterval(this.state.timer)
        this.setState({
            showHideClassName: 'modal display-none',
            show: false,
            animate_div: '',
            click_btn_disable: false,
            btn_text: 'Get Notified',
            resListDose2: [],
            resListDose1: [],
            cancelBtnShow: 'hide-cancel-btn',
            disableOptions: false,
            disableDistrictDropdown: false

            // state_name: 'Please select state',
            // district_id: '',
            // state_id: '',
            // district_name: 'Please select district'
        })
    }

    createCardsDose1 = () => {
        // console.log('in create cards dose2')
        return (
            this.state.resListDose1.map((s, j) => {
                return (
                    <div>
                        <div className='analytics-card' style={{ textAlign: 'left' }}>
                            <p className='ana-details'>Hospital Name:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.s.centerDetails.split('\n')[0].split(':')[1]}</span></p>
                            <p className='ana-details'>Pin:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.s.pincode}</span></p>
                            <p className='ana-details'>Vaccine:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.vaccine}</span></p>
                            <p className='ana-details'>Date:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.date}</span></p>
                            <p className='ana-details'>Slots for First Dose: <span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.available_capacity_dose1}</span></p>
                            <p className='ana-details'>Free/Paid: {s.s.fee_type == 'Paid' ? <><span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>Paid</span></> : <><span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>Free</span></>}</p>
                            <p className='ana-details'><a href='https://selfregistration.cowin.gov.in/' target='_blank'>Book your slots now</a></p>
                        </div>
                    </div>
                )
            })
        )

    }


    createCardsDose2 = () => {
        return (
            this.state.resListDose2.map((s, j) => {
                return (
                    <div>
                        <div className='analytics-card' style={{ textAlign: 'left' }}>
                            <p className='ana-details'>Hospital Name:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.s.centerDetails.split('\n')[0].split(':')[1]}</span></p>
                            <p className='ana-details'>Pin:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.s.pincode}</span></p>
                            <p className='ana-details'>Vaccine:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.vaccine}</span></p>
                            <p className='ana-details'>Date:<span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.date}</span></p>
                            <p className='ana-details'>Slots for Second Dose: <span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>{s.sessions.available_capacity_dose2}</span></p>
                            <p className='ana-details'>Free/Paid: {s.s.fee_type == 'Paid' ? <><span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>Paid</span></> : <><span style={{ float: 'right', fontWeight: '400', color: '#ff6c34' }}>Free</span></>}</p>
                            <p className='ana-details'><a href='https://selfregistration.cowin.gov.in/' target='_blank'>Book your slots now</a></p>
                        </div>
                    </div>
                )
            })
        )
    }


    render() {

        return (
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
                <div className='main-box'>
                    <div className='form-to-fill'>
                        <div className='row'>
                            <div className='age-section col'>
                                <p className='label' style={{ marginTop: '1px' }}>Minimum Age</p>
                                <Radio.Group disabled={this.state.disableOptions} options={this.state.ageOptions} onChange={this.selectAge} value={this.state.selectedAge} />
                            </div>
                            <Divider />
                        </div>


                        <div className='row-1'>
                            <div className='age-section'>
                                <p className='label' style={{ marginTop: '1px' }}>Availability Search For Days</p>
                                <Radio.Group style={{ letterSpacing: '0.7px' }} disabled={this.state.disableOptions} options={this.state.daysOptions} onChange={this.selectDays} value={this.state.selectedDays} />
                            </div>

                            <Divider />
                        </div>


                        <div className='row-1'>
                            <div className='district-section'>
                                <p className='label' style={{ marginTop: '1px' }}>State</p>
                                <Select
                                    disabled={this.state.disableOptions}
                                    // mode="multiple"
                                    // disabled={this.state.disable}
                                    // allowClear
                                    placeholder="Please select state"
                                    value={this.state.state_name}
                                    onChange={this.handleSelectState}
                                    style={{ width: '90%' }}
                                >
                                    {this.handleDropdownState()}
                                </Select>
                            </div>
                            <br></br>

                            <div className='district-section'>
                                <p className='label' style={{ marginTop: '1px' }}>District</p>
                                <Select
                                    // mode="multiple"
                                    disabled={this.state.disableDistrictDropdown}
                                    // allowClear
                                    placeholder="Please select district"
                                    value={this.state.district_name}
                                    onChange={this.handleSelectDistrict}
                                    style={{ width: '90%' }}
                                >
                                    {this.handleDropdownDistrict()}
                                </Select>
                            </div>
                            <Divider />

                        </div>

                        <div className='row-1'>
                            <div className='age-section'>
                                <p className='label' style={{ marginTop: '1px' }}>Vaccine Type</p>
                                <Radio.Group style={{ letterSpacing: '0.7px' }} disabled={this.state.disableOptions} options={this.state.vaccineOptions} onChange={this.selectVaccine} value={this.state.selectedVaccine} />
                            </div>
                            <Divider />
                        </div>

                        <div className='row-1'>
                            <div className='age-section'>
                                <p className='label' style={{ marginTop: '1px' }}>Dose</p>
                                <Radio.Group style={{ letterSpacing: '0.7px' }} disabled={this.state.disableOptions} options={this.state.doseOptions} onChange={this.selectDose} value={this.state.selectedDose} />
                            </div>
                            <Divider />
                        </div>
                        <div>
                            <button onClick={this.getNotified} id={this.state.animate_div} disabled={this.state.click_btn_disable} style={{ background: '#ff6c34', color: '#fff', borderRadius: '6px', border: 'solid 2px 3ff6c34', letterSpacing: '0.8px', padding: '4px 10px' }}>{this.state.btn_text}</button>

                            {/* <div id='animated_div'>Finding Slot</div>
                            <p className='animate__pulse'>test</p> */}
                        </div>

                        <div className={this.state.cancelBtnShow}>
                            <button onClick={this.cancelFindingSlot} style={{ background: '#ff0000', color: '#fff', borderRadius: '6px', border: 'solid 2px 3ff6c34', letterSpacing: '0.8px', padding: '4px 10px', marginTop: '10px' }}>Cancel</button>

                            {/* <div id='animated_div'>Finding Slot</div>
                            <p className='animate__pulse'>test</p> */}
                        </div>
                        <p style={{ color: 'red' }}>{this.state.errorResp}</p>


                    </div>
                </div>
                <div style={{ color: '#fff', textAlign: 'center' }}><p className='footer'>Managed by <a className='creator' href='https://www.linkedin.com/in/abhishek-agarwal-gurugram/'>Abhishek</a> & <a className='creator' href='https://www.linkedin.com/in/itsprashant95/'>Prashant</a></p></div>



                {/* modal open */}

                <Modal dialogClassName="my-modal" show={this.state.show} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Slots Available</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='ro' >
                            {/* {this.createCards()} */}
                            {this.state.dose1 > 0 ? <> {this.createCardsDose1()}</> : <>{this.createCardsDose2()}</>}

                        </div>
                    </Modal.Body>
                </Modal>

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
            </div>
        )
    }
}

export default Home
