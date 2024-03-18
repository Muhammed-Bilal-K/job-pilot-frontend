import React from 'react';
import briefcase from '../../assets/briefcase-duotone 1.png';
import buildcase from '../../assets/buildings 2.png';
import people from '../../assets/users-duotone 1.png';

const BoxSection: React.FC = () => {
  return (
    <div className='contain-all-box'>
        <div className="box-section">
      <div className="box">
        <div className="box-left">
          <img className='image-of-alldata' src={briefcase} alt="Image 1" />
        </div>
        <div className="box-right">
          <div className="top-section">135433</div>
          <div className="bottom-section">Live Job</div>
        </div>
      </div>
      <div className="box">
        <div className="box-left">
          <img className='image-of-alldata' src={buildcase} alt="Image 2" />
        </div>
        <div className="box-right">
          <div className="top-section">135433</div>
          <div className="bottom-section">Companies</div>
        </div>
      </div>
      <div className="box">
        <div className="box-left">
          <img className='image-of-alldata' src={people} alt="Image 3" />
        </div>
        <div className="box-right">
          <div className="top-section">135433</div>
          <div className="bottom-section">Candidates</div>
        </div>
      </div>
      <div className="box">
        <div className="box-left">
          <img className='image-of-alldata' src={briefcase} alt="Image 4" />
        </div>
        <div className="box-right">
          <div className="top-section">135433</div>
          <div className="bottom-section">New JObs</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BoxSection;
