import React from "react";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermAndcondition from "./TermAndcondition";
import HowToPlay from "./HowToPlay";
import Legality from "./Legality";
import AboutUs from "./AboutUs";

export default function InformationHome() {
  return (
    <>
      <div className="overflow-hidden space-y-4">
        <PrivacyPolicyPage />
        <TermAndcondition />
        <Legality />
        <AboutUs />
        <HowToPlay />
      </div>
    </>
  );
}
