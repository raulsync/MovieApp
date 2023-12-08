/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration } from "./features/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
