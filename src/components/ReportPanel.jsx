import React from "react";

const ReportPanel = ({ report }) => {
  if (!report) {
    return (
      <div className="p-6 max-w-4xl  mx-auto mt-4">
        <div className="bg-gray-50 rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">My Dodgy Suggestion on the Stock</h3>
          <p className="text-gray-600">No report available. Please generate a report to see the results.</p>
        </div>
      </div>
    );
  }

  return (

    <div className="max-w-lg p-3  mx-auto mt-4 rounded">
      <div className="report  rounded-lg p-1">
      <div className="p-2 rounded opacity-50 bg-black shadow mb-4"><h3 className="text-xl font-semibold">My Dodgy Suggestion on the Stocks</h3></div>
        <div className="prose opacity-50 shadow rounded max-w-none p-3">
          <div className="repo">
            <p>{report}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPanel;