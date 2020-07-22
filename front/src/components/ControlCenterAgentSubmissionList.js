import React from 'react'

import {Table, List} from "antd";
import {Layout} from "antd";
import {withRouter} from 'react-router-dom';
import sendGetRequestAndSet from "../functions/sendGetRequestAndSet";

class ControlCenterAgentSubmissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            form_info: {},
            title: '',
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

    nextPath(path) {
        this.props.history.push(path)
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
                                    console.log(locations)
                                    // this.nextPath(`/submission/${this.props.match.params.id}/${record.id}`)
                                }
                            })}
                        />
                    </Content>
                </Layout>
            </>
        )
    }
}

export default withRouter(ControlCenterAgentSubmissionList)
