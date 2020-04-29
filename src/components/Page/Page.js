import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import antd from 'antd/dist/antd.compact.css';
import s from './Page.css';
import { Layout, Menu } from 'antd';

const {Header, Content, Footer} = Layout;

export default function Page({children}) {
  useStyles(antd, s);
  return (
    <Layout className="layout">
      <Header>
        <div className={s.logo}/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">About</Menu.Item>
          <Menu.Item key="2">Dashboard</Menu.Item>
          <Menu.Item key="3">Log in</Menu.Item>
          <Menu.Item key="4">Sign up</Menu.Item>
          <Menu.Item key="5">Log out</Menu.Item>
        </Menu>
      </Header>
      <Content className={s.main}>
        <div className={s.content}>
            {children}
        </div>
      </Content>
      <Footer className={s.footer}>
        Ant Design © 2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
