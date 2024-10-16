import React from 'react';

function ReportPanel({ report }) {
  return (
    <section className="output-panel">
      <h2>Your Report 😜</h2>
      <p>{report}</p>
    </section>
  );
}

export default ReportPanel;
