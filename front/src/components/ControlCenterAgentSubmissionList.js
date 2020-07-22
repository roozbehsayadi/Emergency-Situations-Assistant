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
        console.log(this.props.id)
        this.handleTableCreation = this.handleTableCreation.bind(this)
    }

    handleTableCreation = (data) => {
        this.setState({
            answers: data,
        })
        if (this.state.answers.length > 0) {
            let answer = this.state.answers[0]
            this.handleFormInfo({
                title: answer.title,
                id: answer.formId,
            })
        }
    }

    handleFormInfo = (data) => {
        this.setState({
            form_info: data,
        })
        this.setState({
            title: `submissions of form ${data.title}`
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
            console.log(answer.answers)
            answer.answers.forEach((value, index) => {
                dict[value.name] = value.answer;
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
        console.log(this.state.answers)
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
                        <h1>Oh you're a control center agent. Here are submissions for
                            form {this.state.form_info.title}</h1>
                        <h1>form id:
                            {this.state.form_info.id}
                        </h1>
                        <Table
                            dataSource={answers}
                            columns={columns}
                            onRow={(record, index) => ({
                                onClick: () => {
                                    this.nextPath(`/submission/${this.props.match.params.id}/${record.id}`)
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
