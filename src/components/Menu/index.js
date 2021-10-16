import './style.css';
import logo from '../assets/logo.svg';

function Menu() {
  return (
      <div className="left menu-item">
        <nav className="menu">
          <img className="logo" src= {logo}/>
         
        </nav>    
      </div>      
  );
}
export default Menu;