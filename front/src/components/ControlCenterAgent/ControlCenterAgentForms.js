import React from 'react'

import {Table} from "antd";
import {Layout} from "antd";
import {withRouter} from 'react-router-dom';
import sendGetRequestAndSet from "../../functions/sendGetRequestAndSet";

class ControlCenterAgentForms extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
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
        sendGetRequestAndSet('forms', this.props.token, this.handleTableCreation)
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
            {title: '#', dataIndex: 'key', key: 'key', width: '1%',},
            {title: 'id', dataIndex: 'id', key: 'id', width: '4%',},
            {title: 'title', dataIndex: 'title', key: 'title',},
            {title: 'number of submissions', dataIndex: 'submit_count', key: 'submit_count',},
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
                                    this.nextPath('submissions/' + record.id)
                                }
                            })}
                        />
                    </Content>
                </Layout>
            </>
        )
    }
}

export default withRouter(ControlCenterAgentForms)
