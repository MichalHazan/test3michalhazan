import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './List';
import Info from './Info';
import Add from './Add';

export default function Main({ searchTerm }) {
  return <div>
    <Routes>
      <Route path="/" element={<List searchTerm={searchTerm} />}></Route>
      <Route path="/info" element={<Info />}></Route>
      <Route path="/add" element={<Add />}></Route>
    </Routes>
  </div>;
}
