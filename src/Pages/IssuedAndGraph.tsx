import React from "react";
import IssuedBookDashboard from "@/components/IssuedBookDashboard";
import { ComponentDemo } from "@/components/VisitorsAndBookIssuesGraph";

const IssuedAndGraph: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4 p-4">
      <IssuedBookDashboard />
      <ComponentDemo />
    </div>
  );
};

export default IssuedAndGraph;
