import React from "react";
import { Avatar, Button, List, Skeleton } from "antd";

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const avatarUrl = 'https://eu.ui-avatars.com/api/?background=1890ff&color=fff&size=128&name=';

const subscriptionQuery = ``

class Subscription extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    fetch(fakeDataUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      return response.json();
    }).then(response => {
      callback(response);
    })
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({loading: true, name: {}}))),
    });

    this.getData(response => {
      const data = this.state.data.concat(response.results);

      console.log(data);

      this.setState(
        {
          data,
          list: data,
          loading: false,
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

  render() {
    const {initLoading, loading, list} = this.state;

    const loadMore =
      !initLoading && !loading ? (
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
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>
            ]}>
            <Skeleton avatar title={true} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar size="large" src={avatarUrl + item.email}/>
                }
                title={item.name.last}
                description='description...'
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
