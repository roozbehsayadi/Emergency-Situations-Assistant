import React from 'react'

import {Table} from "antd";
import {Layout} from "antd";

class ControlCenterAgentForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'forms list',
            forms: [],
        }
        this.handleTableCreation = this.handleTableCreation.bind(this)
    }

    handleTableCreation = (data) => {
        this.setState({
            forms: data,
        })
    }

    componentDidMount() {
        // TODO: request here.
        this.handleTableCreation([
            {id: 1, 'title': 'test from 1', 'submit_count': 5},
            {id: 2, 'title': 'test from 2', 'submit_count': 6},
            {id: 3, 'title': 'test from 3', 'submit_count': 7},
        ])
    }

    nextPath(path) {
        this.props.history.push(path)
    }

    render() {
        const {Content} = Layout
        const forms = this.state.forms.map((form, index) => {
            return {
                key: index + 1,
                id: form.id,
                title: form.title,
                submit_count: form.submit_count,
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
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '4%',
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'number of submissions',
                dataIndex: 'submit_count',
                key: 'submit_count',
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
                        <h1>Oh you're a control center agent. Here are your forms.</h1>
                        <Table
                            dataSource={forms}
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

export default ControlCenterAgentForms
