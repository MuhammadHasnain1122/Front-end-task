import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AddNotes from './components/AddNotes';
import ViewNotes from './components/ViewNotes';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
const notes = localStorage.getItem("notes");
  localStorage.setItem("notes", notes || "[]")

  return (

    <Routes>
      <Route exact path="/add" element={<AddNotes />}></Route>
      <Route exact path="/view" element={<ViewNotes/>}></Route>
      <Route exact path="/" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
