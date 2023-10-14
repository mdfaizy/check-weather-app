import './Top.css';
import { FaSun } from 'react-icons/fa';
const TopSection = () => {
  return (
    <div className='top-bar'>
     <span className="top-bar-head">
        <FaSun className="top-bar-head-icon" fontSize="large" />
        <h1>WEATHER</h1>
        <FaSun className="top-bar-head-icon" fontSize="large" />
      </span>
    </div>
  )
}
export default TopSection
