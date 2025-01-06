import React from "react";

const ReportPanel = ({ report }) => {
  if (!report) {
    return (
      <div className="p-6 max-w-4xl mx-auto mt-4">
        <div className="bg-gray-50 rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Stock Analysis Report</h3>
          <p className="text-gray-600">No report available. Please generate a report to see the results.</p>
        </div>
      </div>
    );
  }

  return (

    <div className="max-w-lg p-3 bg-black/50 mx-auto mt-4 rounded">
      <div className="report bg-black/50 rounded-lg p-1">
      <div className="p-1 bg-primary rounded shadow text-white mb-4"> <h3 className="text-xl font-semibold">Stock Analysis Report</h3></div>
        <div className="prose bg-white shadow rounded max-w-none p-3">
          <div className="text-black text-sm">
            <p>{report}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ReportPanel;