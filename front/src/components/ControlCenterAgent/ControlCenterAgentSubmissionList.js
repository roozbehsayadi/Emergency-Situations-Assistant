import React from 'react'

import {Table, Modal, Input, Button, Space} from "antd";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {Layout} from "antd";
import {withRouter} from 'react-router-dom';
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
import sendGetRequestAndSet from "../../functions/sendGetRequestAndSet";
import CSVExport from "./CSVExport";

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
            searchText: '',
            searchedColumns: '',
        }
        this.handleTableCreation = this.handleTableCreation.bind(this)
        this.createMapContents = this.createMapContents.bind(this)
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
            modal_content: [],
        });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };
    createMapContents = (locations, new_title) => {
        this.setState({
            modal_content: [],
        })
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
        this.setState({
            modal_title: new_title,
            modal_content: list,
        })
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
            {title: 'username', dataIndex: 'username', key: 'username', ...this.getColumnSearchProps('username')},
        ])

        let numeric_columns = []
        if (this.state.answers.length > 0) {
            this.state.answers[0].answers.forEach((value, index) => {
                let column = {
                    title: value.title,
                    dataIndex: value.name,
                    key: value.name,
                    ...this.getColumnSearchProps(value.name),
                }
                columns.push(column)
                if (column.type === 'Number')
                    numeric_columns.push(true)
                else
                    numeric_columns.push(false)
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
                        {this.state.answers.length > 0 ? CSVExport(this.state.answers) : '-'}
                        <Table
                            dataSource={answers}
                            columns={columns}
                            onRow={(record, index) => ({
                                onClick: () => {
                                    let locations = []
                                    this.state.answers[record.key - 1].answers.forEach((value, index_) => {
                                        if (value.type === "Location")
                                            locations.push(value)
                                    })
                                    let new_title = `locations on row ${record.key}`
                                    this.createMapContents(locations, new_title)
                                    this.showModal()
                                    // this.nextPath(`/submission/${this.props.match.params.id}/${record.id}`)
                                }
                            })}
                            summary={pageData => {
                                let counts = Array(numeric_columns.length).fill(0)
                                pageData.forEach((value, index) => {
                                    Object.keys(value).forEach((field, field_index) => {
                                        if (numeric_columns[field_index])
                                            counts[field_index] += field
                                    })
                                })
                                return (
                                    <>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell>Summery</Table.Summary.Cell>
                                            <Table.Summary.Cell>-</Table.Summary.Cell>
                                            {numeric_columns.map((value, index) => (
                                                <Table.Summary.Cell>
                                                    {value ? counts[index] : '-'}
                                                </Table.Summary.Cell>
                                            ))}
                                        </Table.Summary.Row>
                                    </>
                                )
                            }}
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
