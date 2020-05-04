import React from "react";
import { Avatar, Button, List, Modal, Skeleton } from "antd";

const avatarUrl = 'https://eu.ui-avatars.com/api/?background=1890ff&color=fff&size=128&format=svg&name=';
const count = 10;
const query = `
query subscriberQuery($offset: Int, $limit: Int) {
  subscriberAll(offset: $offset, limit: $limit) {
    id
    email
    phone
    language
  }
}
`

const loadingData = {
  loading: true,
  id: null,
  email: null,
  phone: null,
  language: null,
};

class Subscription extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    offset: 0,
    limit: count,
    editItem: {},
    editVisible: false,
    editConfirmLoading: false,
  };

  componentDidMount() {
    this.getData(response => {
      this.setState({
        initLoading: false,
        data: response.subscriberAll,
        list: response.subscriberAll,
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
      callback(response.data);
    })
  };

  onLoadCollection = (offset) => {
    // this.getData(response => {
    //   this.setState({
    //     initLoading: false,
    //     data: response.subscriberAll,
    //     list: response.subscriberAll,
    //     variables: {
    //       offset: 0,
    //       limit: count,
    //     }
    //   });
    // });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(this.state.limit)].map(() => (loadingData))
      ),
    });

    this.getData(response => {
      let loading = false;

      if (!response.subscriberAll.length) {
        loading = true;
      }

      const data = this.state.data.concat(response.subscriberAll);

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

  onEditVisible = (item) => {
    this.setState({
      editItem: item,
      editVisible: true,
    });
  }

  onEditHandleOk = (item) => {
    this.setState({
      initLoading: true,
      editConfirmLoading: true,
    });

    console.log(this.state.editItem)

    setTimeout(() => {
      this.setState({
        editVisible: false,
        editConfirmLoading: false,
      });
    }, 3000);
  }

  onEditHandleCancel = () => {
    this.setState({
      editVisible: false,
    });
  }

  render() {
    const {initLoading, loading, list, editItem, editVisible, editConfirmLoading} = this.state;

    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}>
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    return (
      <>
        <Modal
          title={editItem.email}
          visible={editVisible}
          onOk={this.onEditHandleOk}
          confirmLoading={editConfirmLoading}
          onCancel={this.onEditHandleCancel}>
          <p>ModalText</p>
        </Modal>
        <List
          loading={initLoading}
          itemLayout="horizontal"
          size="large"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <>
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
                      <Avatar size="large" src={avatarUrl + item.email}/>
                    }
                    title={item.email}
                    //title={<a href={item.href}>{item.title}</a>}
                    description={JSON.stringify(item)}
                  />
                  {/*<div>content</div>*/}
                </Skeleton>
              </List.Item>
            </>
          )}
        />
      </>
    );
  }
}

export default Subscription
