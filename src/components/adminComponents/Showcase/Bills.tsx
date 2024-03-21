import React, { useState } from "react";
import { ShowLeftComponent } from "./ShowLeftComo";
import { FiPlusCircle } from "react-icons/fi";

const billandplans = [
  {
    planName: "Basic Plan",
    amount: "$1500",
    desc: "Basic plan description nsdlfndsfnsdf dkfmsdnfsfdsofsn pasomddasndsdfns pdsnfndn",
    date: "2024-03-22",
    smallDesc: "Basic",
  },
  {
    planName: "Standard Plan",
    amount: "$20",
    desc: "Standard plan description",
    date: "2024-03-23",
    smallDesc: "Standard",
  },
  {
    planName: "Premium Plan",
    amount: "$30",
    desc: "Premium plan description",
    date: "2024-03-24",
    smallDesc: "Premium",
  },
];

const Bills: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [planFeatures, setPlanFeatures] = useState("");
  const [planDescription, setPlanDescription] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePlanNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(e.target.value);
  };

  const handlePlanPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanPrice(e.target.value);
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate >= currentDate) {
      setExpireDate(selectedDate);
    }
  };

  const handlePlanFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanFeatures(e.target.value);
  };

  const handlePlanDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlanDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit form:", planName, planPrice, expireDate, planFeatures, planDescription);
    // Clear form fields
    setPlanName("");
    setPlanPrice("");
    setExpireDate("");
    setPlanFeatures("");
    setPlanDescription("");
    // Close modal
    setIsModalOpen(false);
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <h2>Active Plans</h2>
        <div className="bills-grid">
          {billandplans.map((bill, index) => (
            <div className="bill-box" key={index}>
              <h3>{bill.planName}</h3>
              <p className="billAmount">{bill.amount}<span>/month</span> </p>
              <p className="billdesc">{bill.desc}</p>
              <p className="billdate">{bill.date}</p>
              <p className="pb-3">{bill.smallDesc}</p>
              <button className="billedit">Edit Now</button>
              <button className="billdelete">Delete</button>
            </div>
          ))}
          <div className="border-dotted" onClick={toggleModal}>
            <div className="posticon">
              <FiPlusCircle />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-black bg-opacity-50 fixed inset-0" onClick={toggleModal}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-5 relative z-99">
            <div className="flex items-center justify-between border-b">
              <h3 className="text-lg font-semibold text-gray-900">Create New Product</h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={toggleModal}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={planName}
                    onChange={handlePlanNameChange}
                   
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                    Plan Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={planPrice}
                    onChange={handlePlanPriceChange}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan price"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="expireDate" className="block mb-2 text-sm font-medium text-gray-900">
                    Expire Date
                  </label>
                  <input
                    type="date"
                    name="expireDate"
                    id="expireDate"
                    value={expireDate}
                    onChange={handleExpireDateChange}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="planFeatures" className="block mb-2 text-sm font-medium text-gray-900">
                    Plan Features
                  </label>
                  <input
                    type="text"
                    name="planFeatures"
                    id="planFeatures"
                    value={planFeatures}
                    onChange={handlePlanFeaturesChange}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan features"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="planDescription" className="block mb-2 text-sm font-medium text-gray-900">
                    Plan Description
                  </label>
                  <textarea
                    id="planDescription"
                    name="planDescription"
                    rows={4}
                    value={planDescription}
                    onChange={handlePlanDescriptionChange}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan description"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add New Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
