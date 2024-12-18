import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotfound from "../Page404";
import UserDetails from "../UserData/UserDetails";
import HomeBanner from "../Banner/HomeBanner";
import SubjectData from "../Subjects/SubjectData";
import AddSubject from "../Subjects/AddSubject";
import EditSubjectSection from "../Subjects/EditSubjectSection";
import AddIntroduction from "../Information/AddIntroduction";
import ContestHome from "../ContestType/ContestHome";
import ClassesHomePage from "../Classes/ClassesHomePage";
import InformationHome from "../Information/InformationHome";
import AddUser from "../UserData/AddUser";
import EditUser from "../UserData/Edituser";
import ReportHomePage from "../Report/ReportHomePage";
import KYCHomePage from "../KYC/KYCHomePage";
import ContestEarningHome from "../ContestEarning/ContestEarningHome";
import Incomeboard from "../IncomeExpense/Incomeboard";
import PasswordUpdate from "../NewPassword/PasswordUpdate";
import CreateContest from "../AddContest/CreateContest";
import AddContestHomepage from "../AddContest/AddContestHomepage";

export default function RouteManger() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Incomeboard />} />
        <Route path="/kyc" element={<KYCHomePage />} />
        <Route path="/report" element={<ReportHomePage />} />
        <Route path="/addContest" element={<AddContestHomepage />} />
        <Route path="/createContest" element={<CreateContest />} />
        <Route path="/contestEarning" element={<ContestEarningHome />} />
        <Route path="/classes" element={<ClassesHomePage />} />
        <Route path="/contestType" element={<ContestHome />} />
        <Route path="/information" element={<InformationHome />} />
        <Route path="/addIntroduction" element={<AddIntroduction />} />
        <Route path="/subject" element={<SubjectData />} />
        <Route path="/addSubject" element={<AddSubject />} />
        <Route path="/editSubject" element={<EditSubjectSection />} />
        <Route path="/banner" element={<HomeBanner />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route exact path="/resetpassword" element={<PasswordUpdate />} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </>
  );
}
