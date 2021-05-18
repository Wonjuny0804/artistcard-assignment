import axios from 'axios';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const getData = async datatype => {
  const data = await axios.get(`${process.env.REACT_APP_URL}${datatype}`);
  return data;
}