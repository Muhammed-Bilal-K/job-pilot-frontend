import React, { useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { ShowLeftComponent } from "./ShowLeftComo";
import {
  DeniedEmployer,
  VerifyEmployer,
  allEmployers,
} from "../../../apis/auth";

interface IUserList {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  isBlock: boolean;
  isVerify: Number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<IUserList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await allEmployers();
      setUsers(res.Users);
    };
    fetchData();
  }, []);

  const filteredData = users.filter((item) => item.isVerify === 0);

  const BtnVerifyDone = async (id: string) => {
    try {
      await VerifyEmployer(id);
      location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };
  
  const BtnVerifyDenied = async (id: string) => {
    try {
      await DeniedEmployer(id);
      location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <div className="top-info">Hello, Admin</div>
        <div className="bottom-info">
          <div className="bottom-left">
            <div className="job-applied-info">
              <div className="job-applied-count">
                <p>235</p>
              </div>
              <div className="job-applied-title">
                <h4>Candidates</h4>
              </div>
            </div>
            <div className="icons">
              <PiSuitcaseSimpleBold className="icon-size" />
            </div>
          </div>
          <div className="bottom-right">
            <div className="favorite-candidate-info">
              <div className="favorite-candidate-count">
                <p>234</p>
              </div>
              <div className="favorite-candidate-title">
                <h4>Employers</h4>
              </div>
            </div>
            <div className="icons">
              <BsBuildings className="icon-size text-orange-300" />
            </div>
          </div>
        </div>
        <div className="admin-graph">
          <h2>graph</h2>
        </div>
        <div className="New-Employers">
          <h1>New Employers</h1>
          <table className="employers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="approve-btn"
                        onClick={() => BtnVerifyDone(item._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => BtnVerifyDenied(item._id)}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <h1 className="text-center">No Data Available</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
