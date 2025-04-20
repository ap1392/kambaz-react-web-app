import React from 'react';
import { useParams } from 'react-router-dom';

export default function Piazza() {
  const { cid } = useParams();
  return (
    <div id="wd-piazza" className="p-3">
      <h2 className="text-danger">Piazza for Course {cid}</h2>
      <div className="d-flex mt-4" style={{ height: '80vh' }}>
        <div id="piazza-sidebar" className="border-end pe-3" style={{ width: '300px' }}>
          {/* Sidebar placeholder */}
          <p>Sidebar (folders, posts list)</p>
        </div>
        <div id="piazza-content" className="flex-fill ps-3">
          {/* Main content placeholder */}
          <p>Main content area (post view, new post form, etc.)</p>
        </div>
      </div>
    </div>
  );
} 