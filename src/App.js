import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "./Component/layout/DefaultLayout.js";
import LoginPage from "./Component/Login/LoginPage.js";
import Loading from "./Component/Loader/Loading.js";
import PageNotfound from "./Component/Page404.js";
import UserList from "./Component/UserData/UserList";
import HomeBanner from "./Component/Banner/HomeBanner";
import SubjectList from "./Component/Subjects/SubjectList";
import AddSubject from "./Component/Subjects/AddSubject";
import EditSubject from "./Component/Subjects/EditSubject.js";
import AddIntroduction from "./Component/Information/AddIntroduction";
import ContestHome from "./Component/ContestType/ContestTypeHome";
import ClassesHomePage from "./Component/Classes/ClassesHomePage";
import InformationHome from "./Component/Information/InformationHome";
import AddUser from "./Component/UserData/AddUser";
import EditClasses from "./Component/Classes/EditClass";
import ReportHomePage from "./Component/Report/ReportHomePage";
import KYCHomePage from "./Component/KYC/KYCHomePage";
import ContestEarningHome from "./Component/ContestEarning/ContestEarningHome";
import Incomeboard from "./Component/IncomeExpense/Incomeboard";
import PasswordUpdate from "./Component/NewPassword/PasswordUpdate";
import CreateContest from "./Component/AddContest/CreateContest";
import AddContestHomepage from "./Component/AddContest/AddContestHomepage";
import EditContest from "./Component/AddContest/EditContest.js";

function App() {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const loginInfo = useSelector((state) => state.authConfig);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loginInfo.isLoggedIn !== true ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <DefaultLayout>
          <Routes>
            <Route exact path="/" element={<Incomeboard />} />
            <Route path="/kyc" element={<KYCHomePage />} />
            <Route path="/report" element={<ReportHomePage />} />
            <Route path="/addContest" element={<AddContestHomepage />} />
            <Route path="/createContest" element={<CreateContest />} />
            <Route path="/editContest" element={<EditContest />} />
            <Route path="/contestEarning" element={<ContestEarningHome />} />
            <Route path="/classes" element={<ClassesHomePage />} />
            <Route path="/contestType" element={<ContestHome />} />
            <Route path="/information" element={<InformationHome />} />
            <Route path="/addIntroduction" element={<AddIntroduction />} />
            <Route path="/subject" element={<SubjectList />} />
            <Route path="/addSubject" element={<AddSubject />} />
            <Route path="/editSubject" element={<EditSubject />} />
            <Route path="/banner" element={<HomeBanner />} />
            <Route path="/students" element={<UserList />} />
            <Route path="/addUser" element={<AddUser />} />
            {/* <Route path="/editUser" element={<EditClasses />} /> */}
            <Route path="/resetpassword" element={<PasswordUpdate />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;