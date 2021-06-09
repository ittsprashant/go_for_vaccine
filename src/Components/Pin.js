import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Input } from 'antd';
import { Select, Divider } from 'antd';
import Home from './Home'




const { TabPane } = Tabs;


class Pin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            disableDistrictDropdown: true,
            stateList: [{ "state_id": 1, "state_name": "Andaman and Nicobar Islands" }, { "state_id": 2, "state_name": "Andhra Pradesh" }, { "state_id": 3, "state_name": "Arunachal Pradesh" }, { "state_id": 4, "state_name": "Assam" }, { "state_id": 5, "state_name": "Bihar" }, { "state_id": 6, "state_name": "Chandigarh" }, { "state_id": 7, "state_name": "Chhattisgarh" }, { "state_id": 8, "state_name": "Dadra and Nagar Haveli" }, { "state_id": 37, "state_name": "Daman and Diu" }, { "state_id": 9, "state_name": "Delhi" }, { "state_id": 10, "state_name": "Goa" }, { "state_id": 11, "state_name": "Gujarat" }, { "state_id": 12, "state_name": "Haryana" }, { "state_id": 13, "state_name": "Himachal Pradesh" }, { "state_id": 14, "state_name": "Jammu and Kashmir" }, { "state_id": 15, "state_name": "Jharkhand" }, { "state_id": 16, "state_name": "Karnataka" }, { "state_id": 17, "state_name": "Kerala" }, { "state_id": 18, "state_name": "Ladakh" }, { "state_id": 19, "state_name": "Lakshadweep" }, { "state_id": 20, "state_name": "Madhya Pradesh" }, { "state_id": 21, "state_name": "Maharashtra" }, { "state_id": 22, "state_name": "Manipur" }, { "state_id": 23, "state_name": "Meghalaya" }, { "state_id": 24, "state_name": "Mizoram" }, { "state_id": 25, "state_name": "Nagaland" }, { "state_id": 26, "state_name": "Odisha" }, { "state_id": 27, "state_name": "Puducherry" }, { "state_id": 28, "state_name": "Punjab" }, { "state_id": 29, "state_name": "Rajasthan" }, { "state_id": 30, "state_name": "Sikkim" }, { "state_id": 31, "state_name": "Tamil Nadu" }, { "state_id": 32, "state_name": "Telangana" }, { "state_id": 33, "state_name": "Tripura" }, { "state_id": 34, "state_name": "Uttar Pradesh" }, { "state_id": 35, "state_name": "Uttarakhand" }, { "state_id": 36, "state_name": "West Bengal" }],

            state_name: 'Please select state',
            district_name: 'Please select district',
            districtList: [],
            errorResp: '',
            pin: '',
            district_id: '',
            showMainForm: false,
            pin:'',
            flag: '' //this flag tells whether next is done from pin section or district section



        }
    }

    handleCancelMainPage = (value) => {
        this.setState({
            showMainForm: !value
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

    nextPin = () => {
        var s = new RegExp("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$");
        console.log('test1', s.test(this.state.pin))

        if (this.state.pin != '' && !isNaN(this.state.pin) && s.test(this.state.pin)) {
            this.setState({
                errorResp: '',
                flag: 'pin',
                showMainForm: true,

            })
        }
        else {
            this.setState({
                errorResp: 'Please enter correct PIN'
            })
        }
    }


    nextDistrict = () => {
        if (this.state.district_id != '') {
            console.log('next btn district', this.state)
            this.setState({
                errorResp: '',
                showMainForm: true,
                flag: 'district'

            })
        }
        else {
            this.setState({
                errorResp: 'Please select state and district'
            })
        }
    }

    render() {
        return (
            <>
                <div className='main-box'>

                    {!this.state.showMainForm ? <>

                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Search By PIN" key="1">
                                <Input placeholder="Please enter PIN" value={this.state.pin} onChange={(e) => { this.setState({ pin: e.target.value }) }} />
                                {/* <Divider /> */}

                                <button onClick={this.nextPin} className='next-btn'>Next</button>
                                <p style={{ color: 'red' }}>{this.state.errorResp}</p>

                            </TabPane>
                            <TabPane tab="Search By District" key="2">

                                <div className='row-1'>
                                    <div className='district-section'>
                                        <p className='label' style={{ marginTop: '1px' }}>State</p>
                                        <Select
                                            showSearch
                                            disabled={this.state.disableOptions}
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
                                            showSearch
                                            disabled={this.state.disableDistrictDropdown}
                                            placeholder="Please select district"
                                            value={this.state.district_name}
                                            onChange={this.handleSelectDistrict}
                                            style={{ width: '90%' }}
                                        >
                                            {this.handleDropdownDistrict()}
                                        </Select>
                                    </div>
                                    {/* <Divider /> */}

                                    <button onClick={this.nextDistrict} className='next-btn'>Next</button>
                                    <p style={{ color: 'red' }}>{this.state.errorResp}</p>


                                </div>
                            </TabPane>
                        </Tabs>
                    </> : <><Home district_id={this.state.district_id} pin={this.state.pin} flag={this.state.flag} handleCancelMainPage={this.handleCancelMainPage} /></>}


                </div>
            </>
        )
    }
}

export default Pin
