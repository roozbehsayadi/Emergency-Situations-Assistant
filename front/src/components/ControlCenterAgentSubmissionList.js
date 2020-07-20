import React from 'react'

import {Table} from "antd";
import {Layout} from "antd";

class ControlCenterAgentSubmissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: `submissions of form ${this.props.form_info.title}`,
            users: [],
            form_info: {},
        }
        this.handleTableCreation = this.handleTableCreation.bind(this)
    }

    handleTableCreation = (data) => {
        this.setState({
            users: data,
        })
    }

    handleFormInfo = (data) => {
        this.setState({
            form_info: data,
        })
    }

    componentDidMount() {
        // TODO: request here.
        this.handleTableCreation([
            {user_id: 'test user 1'},
            {user_id: 'test user 2'},
            {user_id: 'test user 3'},
        ])
        this.handleFormInfo({
            title: 'test form 1',
            id: 1,
            field_count: 5,
        })
    }

    nextPath(path) {
        this.props.history.push(path)
    }

    render() {
        const {Content} = Layout
        const users = this.state.users.map((user, index) => {
            return {
                key: index + 1,
                user_id: user.user_id,
            }
        })

        const columns = [
            {
                title: '#',
                dataIndex: 'key',
                key: 'key',
                width: '1%',
            },
            {
                title: 'user id',
                dataIndex: 'user_id',
                key: 'user_id',
            },
        ]
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
                            form {this.props.form_info.title}.</h1>
                        <h2>form id: {this.props.form_info.id}</h2>
                        <h2>form's field count: {this.props.form_info.field_count}</h2>
                        <Table
                            dataSource={users}
                            columns={columns}
                            onRow={(record, index) => ({
                                onClick: () => {
                                    // this.nextPath(
                                    // TODO: url to view the form.
                                    // )
                                }
                            })}
                        />
                    </Content>
                </Layout>
            </>
        )
    }
}

export default ControlCenterAgentSubmissionList
