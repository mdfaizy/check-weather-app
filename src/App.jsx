// import  ReactDOM  from "react-dom/client";
import './App.css'
// import Tempharater from "./component/Tempharater";
import TopSection from "./component/TopSection";
// import Navbar from "./component/Navbar";
import {Routes,Route} from 'react-router-dom';
import CurrentWeather from './component/CurrentWeather';
import SearchWeather from './component/SearchWeather';
import Home from './component/Home';


function App() {
  return (
    <div className='app_container'>
       <div className="main">
      <TopSection/>
        {/* <Navbar /> */}
        <Home/>
        {/* <Tempharater/> */}

       </div>
       <Routes>
       <Route path="/currentweather" element={<CurrentWeather />} />
       <Route path="/searchWeather" element={<SearchWeather />} />
       </Routes>
     
    </div>
  )
}

export default App
