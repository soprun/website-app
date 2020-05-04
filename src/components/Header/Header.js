import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import { Layout, Menu } from 'antd';
import s from './Header.css';
import Link from '../Link';

export default function Header() {
  useStyles(s);
  return (
    <Layout.Header>
      <div className={s.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="0">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className={s.link} to="/dashboard">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link className={s.link} to="/subscriber">
            Subscriber
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link className={s.link} to="/signIn">
            Sign in
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link className={s.link} to="/signUp">
            Sign up
          </Link>
        </Menu.Item>
        {/*<Menu.Item key="6">*/}
        {/*  <Link className={s.link} to="/logout">*/}
        {/*    Log out*/}
        {/*  </Link>*/}
        {/*</Menu.Item>*/}
      </Menu>
    </Layout.Header>
  );
}
