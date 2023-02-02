import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AddNotes from './components/AddNotes';
import ViewNotes from './components/ViewNotes';

function App() {
  return (
   
    <Routes>
      <Route exact path="/" element={<AddNotes/>}></Route>
      <Route exact path="/view" element={<ViewNotes/>}></Route>
    </Routes>
  );
}

export default App;
