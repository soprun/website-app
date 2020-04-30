import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { Layout as LayoutApp } from 'antd';
import antd from 'antd/dist/antd.css';
import s from './Layout.css';

import Header from "../Header";

export default function Layout({children}) {
  useStyles(antd, s);
  return (
    <LayoutApp className={s.layout}>
      <Header/>
      <LayoutApp.Content className={s.main}>
        <div className={s.content}>
          {children}
        </div>
      </LayoutApp.Content>
      <LayoutApp.Footer className={s.footer}>
        Ant Design © 2018 Created by Ant UED
      </LayoutApp.Footer>
    </LayoutApp>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
