import React from "react";
import { Avatar, Button, List, PageHeader, Skeleton } from "antd";
import { SubscriberForm } from "./SubscriberForm";
import collection from "../../utils/collection";

const avatarUrl = 'https://eu.ui-avatars.com/api/?background=1890ff&color=fff&size=128&format=svg&name=';

const subscriberAllQuery = `
query subscriberAllQuery($offset: Int, $limit: Int) {
  subscriberAll(offset: $offset, limit: $limit) {
    id
    email
    emailConfirmed
    phone
    phoneConfirmed
    firstName
    lastName
    gender
    language
    website
  }
}
`;
const subscriberMutation = `
mutation subscriberMutation(
  $id: ID,
  $email: String!,
  $emailConfirmed: Boolean!,
  $firstName: String,
  $gender: String!,
  $language: language!,
  $lastName: String,
  $phone: String,
  $phoneConfirmed: Boolean!,
  $website: String
) {
  subscriber(input: {
    id: $id,
    email: $email,
    emailConfirmed: $emailConfirmed,
    firstName: $firstName,
    lastName: $lastName
    gender: $gender,
    language: $language,
    phone: $phone,
    phoneConfirmed: $phoneConfirmed,
    website: $website
  }) {
    id
    email
    emailConfirmed
    phone
    phoneConfirmed
    firstName
    lastName
    gender
    language
    website
  }
}
`;

const subscriberAll = new collection(subscriberAllQuery);

export class Subscriber extends React.Component {
  state = {
    init: true,
    loading: false,
    data: [],
    list: [],
    offset: 0,
    limit: 10,
    editValue: {},
    editVisible: false,
    editConfirmLoading: false,
  };

  componentDidMount() {

    const res = subscriberAll.fetchAll(1);
      console.log(res);

    // this.getCollection(
    //   subscriberAllQuery,
    //   {},
    //   response => {
    //     this.setState({
    //       init: false,
    //       // data: response,
    //       collection: response,
    //       offset: this.state.limit,
    //     });
    //   })
  }

  getCollection = (query, variables, callback) => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          offset: this.state.offset,
          limit: this.state.limit,
          ...variables
        },
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      callback(response.data.subscriberAll);
    })
  }

  showEdit = (item) => {
    this.setState({
      editValue: item || {},
      editVisible: true
    })
  }

  onEditHandleOk = (values) => {
    this.setState({
      editConfirmLoading: true,
    })
  };

  onEditHandleCancel = () => {
    this.setState({
      editValue: {},
      editVisible: false,
    })
  };

  render() {
    const {
      init,
      loading,
      collection,
      editValue,
      editVisible,
      editConfirmLoading,
    } = this.state;

    return (
      <>
        <PageHeader
          title={this.props.title}
          subTitle={this.props.subTitle}
          extra={
            <Button type="ghost" onClick={() => {
              this.showEdit()
            }}>
              Create subscriber
            </Button>
          }
        />
        <SubscriberForm
          value={editValue}
          visible={editVisible}
          confirmLoading={editConfirmLoading}
          onCreate={this.onEditHandleOk}
          onCancel={this.onEditHandleCancel}
        />
        <List
          loading={init}
          itemLayout="horizontal"
          size="large"
          dataSource={collection}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Button type="primary" onClick={e => this.showEdit(item, e)}>
                  edit
                </Button>,
                <Button type="dashed">
                  more
                </Button>,
              ]}>
              <Skeleton avatar title={true} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar size="large" src={avatarUrl + item.firstName + '+' + item.lastName}/>
                  }
                  title={item.firstName + ' ' + item.lastName}
                  description={item.email}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
  }
}
