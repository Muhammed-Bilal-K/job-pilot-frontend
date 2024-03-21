import React from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { ShowLeftComponent } from './ShowLeftComo'

const Dashboard:React.FC = () => {
  return (
    <div className="showcase">
    <ShowLeftComponent/>
    <div className='showright'>
        <div className="top-info">Hello, Michel</div>
        <div className="bottom-info">
          <div className="bottom-left">
            <div className="job-applied-info">
              <div className="job-applied-count"><p>
                235</p></div>
              <div className="job-applied-title"><h4>Open Jobs</h4></div>
            </div>
            <div className="icons">
                <PiSuitcaseSimpleBold className='icon-size' />
            </div>
          </div>
          <div className="bottom-right">
            <div className="favorite-candidate-info">
              <div className="favorite-candidate-count"><p>234</p></div>
              <div className="favorite-candidate-title"><h4>Favorite Candidates</h4></div>
            </div>
            <div className="icons">
              <FaRegBookmark className='icon-size text-orange-300'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard