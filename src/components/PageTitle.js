import React from 'react';

function PageTitle({ title = 'Judul', subtitle = '' }) {
  return (
    <div className="pagetitle">
      <h1 className="main-title">{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default PageTitle;
