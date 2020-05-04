import React from "react";
import { Avatar, Button, List, Skeleton } from "antd";
import { CollectionEdit } from "./CollectionEdit";

const avatarUrl = 'https://eu.ui-avatars.com/api/?background=1890ff&color=fff&size=128&format=svg&name=';
const count = 10;
const query = `
query subscriberQuery($offset: Int, $limit: Int) {
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

const layoutForm = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
};

const loadingData = {
  loading: true,
  id: null,
  email: null,
  phone: null,
  language: null,
};

class Subscriber extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    offset: 0,
    limit: count,

    editVisible: false,
    editConfirmLoading: false,
  };

  componentDidMount() {
    this.getData(response => {
      this.setState({
        initLoading: false,
        data: response,
        list: response,
        offset: this.state.limit,
      });
    });
  }

  getData = callback => {
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
        },
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      callback(response.data.subscriberAll);
    })
  };

  onCollectionLoad = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(this.state.limit)].map(() => (loadingData))
      ),
    });

    this.getData(response => {
      let loading = false;

      if (!response.length) {
        loading = true;
      }

      const data = this.state.data.concat(response);

      this.setState(
        {
          data,
          list: data,
          loading: loading,
          offset: this.state.offset + this.state.limit,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  onEditVisible = (value) => {
    this.setState({
      editValue: value,
      editVisible: true,
      editConfirmLoading: false,
    });
  }

  onEditHandler = (values) => {
    // console.log('Received values of form: ', values);

    this.setState({
      editConfirmLoading: true,
    });

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: values,
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      console.log(response.data.subscriberAll);
    })
  }

  onEditCancel = () => {
    this.setState({
      editValue: {},
      editVisible: false,
      editConfirmLoading: false,
    });
  }

  render() {
    const {
      initLoading,
      loading,
      list,

      editValue,
      editVisible,
      editConfirmLoading
    } = this.state;

    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}>
        <Button onClick={this.onCollectionLoad}>loading more</Button>
      </div>
    ) : null;

    return (
      <>
        <CollectionEdit
          visible={editVisible}
          confirmLoading={editConfirmLoading}
          defaultValue={editValue}
          onHandler={this.onEditHandler}
          onCancel={this.onEditCancel}
        />
        <List
          loading={initLoading}
          itemLayout="horizontal"
          size="large"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Button type="primary" onClick={e => this.onEditVisible(item, e)}>
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
                  // description={JSON.stringify(item)}
                />
                {/*<div>content</div>*/}
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default Subscriber
