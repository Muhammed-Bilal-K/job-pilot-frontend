import React from 'react'
import { ShowLeftComponent } from '../ShowLeftComo'
import ApplicantNav from './ApplicantNav'
import { useParams } from 'react-router-dom';

export const ShortList : React.FC= () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="showcase">
        <ShowLeftComponent />
        <div className="showright">
          <ApplicantNav JobId={id} />
          <table className="employers-table">
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="mb-2">
                      <p className="font-semibold">Michal</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <p className="font-medium">UI UX Designer</p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium">7 - experience</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>Open To Message</td>
                <td>Download CV</td>
                <td>
                  <button
                    className="view-applications-btn px-5 py-2 rounded-lg"
                    style={{ backgroundColor: "#E7F0FA" }}
                  >
                    View Details
                  </button>
                </td>
                <td className="shortlist-td">
                  <button className="make-shortlist-btn px-0 py-2 rounded-lg">
                    Make Shortlist
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
