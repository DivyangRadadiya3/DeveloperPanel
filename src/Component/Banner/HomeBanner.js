import React, { useEffect, useState } from "react";
import ResultBanner from "./ResultBanner";
import ImgUpdatePage from "./ImgUpdatePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BannerData from "./BannerData";
import { bannerDataList } from "../../Context/Action/index";
import { fetchBannerData } from "../../ApiHandler/bannerApi";

export default function HomeBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [bannerData, setBannerData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchBannerData(accessToken);
        setBannerData(data);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, [accessToken, dispatch]);

  useEffect(() => {
    const homeFiltered = bannerData.filter(item => item.type === 'home');
    const resultFiltered = bannerData.filter(item => item.type === 'result');
    setHomeData(homeFiltered);
    setResultData(resultFiltered);
  }, [bannerData]);

  return (
    <>
      <section className="space-y-6">
        <BannerData home={bannerData}/>
        <ResultBanner result={resultData} />
      </section>
    </>
  );
}
