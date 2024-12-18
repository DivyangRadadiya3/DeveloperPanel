import React from "react";
import QuestionReport from "./QuestionReport";
import ResultReport from "./ResultReport";
import UserReport from "./UserReport";

export default function ReportHomePage() {
  return (
    <>
      <section className="space-y-4 pb-4">
        <QuestionReport />
        <ResultReport />
        <UserReport />
      </section>
    </>
  );
}
