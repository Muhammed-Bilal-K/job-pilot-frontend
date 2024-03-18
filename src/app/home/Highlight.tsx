import React from 'react';
import logoBanner from '../../assets/Illustration.png';

const Highlight:React.FC = () => {
    return (
        <div className="banner-section">
          <div className="left-section">
            <div className="text-content">
              <h2>Find the job of your <br /> dreams, interest & skills.</h2>
              <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam <br />  in scelerisque leo, eget sollicitudin velit vestibulum.</p>
            </div>
            <div className="search-inputs">
              <input type="text" className='input-search one' placeholder="Job title, keyword, etc." />
              <input type="text" className='input-search' placeholder="Your location" />
              <button>Find job</button>
            </div>
            <p className='mt-3 text-xs pl-3 font-medium ring-gray-500'>suggestion : Desinger,Programmer,Animation</p>
          </div>
          <div className="right-section">
            <img className='logobanner' src={logoBanner} alt="" />
          </div>
        </div>
      );
    
}

export default Highlight