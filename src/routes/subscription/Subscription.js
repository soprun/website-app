import React from "react";
import { Avatar, Button, List, Skeleton } from "antd";

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
    variables: {
      offset: 0,
      limit: count,
    }
  };

  componentDidMount() {
    this.getData(response => {
      this.setState({
        initLoading: false,
        data: response.subscriberAll,
        list: response.subscriberAll,
        variables: {
          offset: count,
          limit: count,
        }
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
        variables: this.state.variables,
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      callback(response.data);
    })
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => (loadingData))
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
          variables: {
            offset: this.state.variables.offset + count,
            limit: count,
          }
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

  showDeleteConfirm = (id) => {
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        console.log(id)
      },
    });
  }


  render() {
    const {initLoading, loading, list} = this.state;

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
      <List
        loading={initLoading}
        itemLayout="horizontal"
        size="large"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}>
            <Skeleton avatar title={true} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar size="large" src={avatarUrl + item.email}/>
                }
                title={item.email}
                description={JSON.stringify(item)}
              />
              {/*<div>content</div>*/}
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default Subscription
