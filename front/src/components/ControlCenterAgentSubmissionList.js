import React from 'react'

import {Table, Modal} from "antd";
import {Layout} from "antd";
import {withRouter} from 'react-router-dom';
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
import sendGetRequestAndSet from "../functions/sendGetRequestAndSet";

class ControlCenterAgentSubmissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            form_info: {},
            title: '',
            visible: false,
            modal_title: '',
            modal_content: [],
        }
        this.handleTableCreation = this.handleTableCreation.bind(this)
    }

    handleTableCreation = (data) => {
        this.setState({
            answers: data.answers,
        })
        this.setState({
            title: data.title,
        })
    }

    componentDidMount() {
        sendGetRequestAndSet(`forms/${this.props.match.params.id}/`, this.props.token, this.handleTableCreation)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    createMapContents(locations) {
        let list = []
        locations.forEach((value, index) => {
            list.push(
                <Map
                    google={this.props.google}
                    zoom={14}
                    containerStyle={{width: '300px', height: '300px'}}
                    initialCenter={{
                        lat: value.answer[0],
                        lng: value.answer[1]
                    }}
                    key={index}
                >
                    <Marker
                        key={index}
                        possition={{
                            lat: value.answer[0],
                            lng: value.answer[1]
                        }}
                    />
                </Map>
            )
        })
        console.log(list)
        this.state.modal_content = list
    }

    render() {
        const {Content} = Layout

        const answers = this.state.answers.map((answer, index) => {
            let dict = {}

            answer.answers.forEach((value, index) => {
                if (value.type !== "Location")
                    dict[value.name] = value.answer;
                else
                    dict[value.name] = value.areas.toString();
            })
            return {
                key: index + 1,
                username: answer.username,
                ...dict
            }
        })

        let columns = []
        columns.push(...[
            {title: '#', dataIndex: 'key', key: 'key', width: '1%',},
            {title: 'username', dataIndex: 'username', key: 'username',},
        ])

        if (this.state.answers.length > 0) {
            this.state.answers[0].answers.forEach((value, index) => {
                let column = {
                    title: value.title,
                    dataIndex: value.name,
                    key: value.name,
                }
                columns.push(column)
            })
        }

        return (
            <>
                <Layout>
                    <Content
                        style={{
                            textAlign: 'left',
                            marginLeft: '7%',
                            width: '86%',
                            marginTop: '2%',
                        }}
                    >
                        <h1>Here are submissions for form "{this.state.title}"</h1>
                        <Table
                            dataSource={answers}
                            columns={columns}
                            onRow={(record, index) => ({
                                onClick: () => {
                                    let locations = []
                                    this.state.answers[index].answers.forEach((value, index_) => {
                                        if (value.type === "Location")
                                            locations.push(value)
                                    })
                                    this.state.modal_title = `locations on row ${index + 1}`
                                    this.createMapContents(locations)
                                    this.showModal()
                                    // this.nextPath(`/submission/${this.props.match.params.id}/${record.id}`)
                                }
                            })}
                        />
                        <Modal
                            title={this.state.modal_title}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <ul>
                                {this.state.modal_content.map(item => (
                                    <li
                                        key={item}
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            marginBottom: '50px'
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Modal>
                    </Content>
                </Layout>
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(withRouter(ControlCenterAgentSubmissionList))
