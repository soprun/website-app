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
        <Menu.Item key="1">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className={s.link} to="/dashboard">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link className={s.link} to="/login">
            Log in
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link className={s.link} to="/register">
            Sign up
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link className={s.link} to="/logout">
            Log out
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
