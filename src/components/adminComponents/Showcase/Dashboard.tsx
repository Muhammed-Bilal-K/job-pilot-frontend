import React from 'react'
import { BsBuildings } from 'react-icons/bs';
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { ShowLeftComponent } from './ShowLeftComo';

const Dashboard:React.FC = () => {
  return (
    <div className="showcase">
    <ShowLeftComponent/>
    <div className='showright'>
        <div className="top-info">Hello, Admin</div>
        <div className="bottom-info">
          <div className="bottom-left">
            <div className="job-applied-info">
              <div className="job-applied-count"><p>
                235</p></div>
              <div className="job-applied-title"><h4>Candidates</h4></div>
            </div>
            <div className="icons">
                <PiSuitcaseSimpleBold className='icon-size' />
            </div>
          </div>
          <div className="bottom-right">
            <div className="favorite-candidate-info">
              <div className="favorite-candidate-count"><p>234</p></div>
              <div className="favorite-candidate-title"><h4>Employers</h4></div>
            </div>
            <div className="icons">
              <BsBuildings className='icon-size text-orange-300'/>
            </div>
          </div>
        </div>
        <div className='admin-graph'>
            <h2>graph</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard