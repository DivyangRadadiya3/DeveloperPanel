import React from "react";
import ContestwiseEarn from "./ContestwiseEarn";
import SubjecteEarn from "./SubjectEarn";
import SlotTimeEarn from "./SlotTimeEarn";
import UserEarn from "./UserEarn";
import CoachingEarn from "./CoachingEarn";

export default function ContestEarningHome() {
  return (
    <>
      <div className="overflow-hidden space-y-6 pb-4">
        <ContestwiseEarn />
        <SubjecteEarn />
        <SlotTimeEarn />
        <UserEarn />
        <CoachingEarn />
      </div>
    </>
  );
}
