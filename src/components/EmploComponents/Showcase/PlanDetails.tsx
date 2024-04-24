import React from "react";
import { ShowLeftComponent } from "./ShowLeftComo";

const PlanDetails: React.FC = () => {
  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <div className="">
          <h1>Plan Details</h1>
          <div className="flex gap-5 mt-5">
            <div className="current-plan-detail">
              <h3 className="text-lg font-semibold">current Plan</h3>
              <h1 className="text-4xl font-bold">Premium</h1>
              <p className="text-sm font-light mt-5">
                Here at Starve, we don't just make websites, we create
                exceptional digital experiences that consumers love.
              </p>
              <button className="change-plan-detail">Change Plan</button>
            </div>
            <div className="plan-detail-show">
              <h3 className="text-lg font-semibold">Plan Details</h3>
              <p className="text-sm font-light mt-2">
                Here at Starve, we don't just make websites, we create
                exceptional digital experiences that consumers love.
              </p>
              <p>6 active jobs</p>
            </div>
          </div>
          <div className="show-choose-for-next-pay">
            <h3 className="text-lg font-semibold">Next Payment</h3>
            <h3 className="text-blue-600">
              <span className="font-bold text-3xl">$1500</span>/Month
            </h3>
            <p className="text-sm font-light mt-2">
              Here at Starve, we don't just make websites, we create exceptional
              digital experiences that consumers love.
            </p>
            <p className="text-xl font-semibold mt-1">NOV 29, 2024</p>
            <p className="text-sm font-thin mt-1">Here at Starve, we don't just make websites.</p>
            <button className="px-10 py-2.5 mt-5 change-plan-amount text-white" style={{backgroundColor:"#0A65CC"}}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
