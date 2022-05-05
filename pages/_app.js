import { wrapper } from "../store/store";
import "../styles/index.css";
import App from "next/app";
import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastProvider } from "react-toast-notifications";
import ToastNoti from "../utils/ToastNoti";
import { appWithTranslation } from 'next-i18next';


class MyApp extends App {

  render() {
    //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
    const { Component, pageProps } = this.props;

    return (
      <Component {...pageProps} />
      // <AuthProvider authenticated={authenticated}>
      //   <Component {...pageProps} />
      // </AuthProvider>
    );
  }
}
export default wrapper.withRedux(appWithTranslation(MyApp)); 