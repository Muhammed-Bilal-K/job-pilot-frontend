import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "./ShowLeftComo";
import { FiPlusCircle } from "react-icons/fi";
import { GetAllPlansDetails, PlanCreatedByAdmin, PlanDeletedByAdmin, UpdatePlan } from "../../../apis/auth";
import Swal from 'sweetalert2';

interface PlanDetail {
  _id: string;
  name: string;
  amount: string;
  description: string;
  features: string[];
}

interface PlanInputValues {
  name: string;
  description: string;
  amount: string;
  features: string[];
}
const Bills: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planFeatures, setPlanFeatures] = useState([""]);
  const [planDescription, setPlanDescription] = useState("");
  const [editedPlanId, setEditedPlanId] = useState<string | null>(null);
  const [bills,setBills] = useState<PlanDetail[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await GetAllPlansDetails();
        console.log(res.data.planDetail);
        setBills(res.data.planDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[])

  const toggleModal = (mode: 'add' | 'edit', plan?: PlanDetail) => {
    setIsModalOpen(!isModalOpen);
    setModalMode(mode);
    if (mode === 'edit' && plan) { 
      setPlanName(plan.name);
      setPlanPrice(plan.amount);
      setPlanFeatures(plan.features);
      setPlanDescription(plan.description);
      setEditedPlanId(plan._id);
    } else {
      setPlanName("");
      setPlanPrice("");
      setPlanFeatures([""]);
      setPlanDescription("");
      setEditedPlanId(null);
    }
  };

  const handlePlanFeaturesChange = (index: number, value: string) => {
    const updatedFeatures = [...planFeatures];
    updatedFeatures[index] = value;
    setPlanFeatures(updatedFeatures);
  };

  const addPlanFeature = () => {
    setPlanFeatures([...planFeatures, ""]);
  };

  const removePlanFeature = (index: number) => {
    const updatedFeatures = [...planFeatures];
    updatedFeatures.splice(index, 1);
    setPlanFeatures(updatedFeatures);
  };

  const HandleDeleteSub = async (id : string) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const adminToken = localStorage.getItem('AdminToken');
        console.log(adminToken);
        const res = await PlanDeletedByAdmin(id,adminToken!);
        if (res.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(()=>{
            location.reload();
          });
        }
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planData: PlanInputValues = {
      name: planName,
      amount: planPrice,
      description: planDescription,
      features: planFeatures,
    };

    if (modalMode === 'add') {
      const adminToken = localStorage.getItem('AdminToken');
      const added = await PlanCreatedByAdmin(planData , adminToken!);
      console.log(added.data);
      if (added.data) {
        location.reload();
      }
    } else if (modalMode === 'edit' && editedPlanId) { 
      const updated = await UpdatePlan(editedPlanId, planData);
      console.log(updated);
      
    }

    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <h2>Active Plans</h2>
        <div className="bills-grid">
          {bills.map((bill, index) => (
            <div className="bill-box" key={index}>
              <h3 className="uppercase">{bill.name}</h3>
              <p className="billAmount">
                {bill.amount}
                <span>/month</span>{" "}
              </p>
              <p className="billdesc mb-2">{bill.description}</p>
              <button className="billedit" onClick={() => toggleModal('edit', bill)}>Edit Now</button> {/* Change 7 */}
              <button className="billdelete" onClick={() => HandleDeleteSub(bill._id)}>Delete</button>
            </div>
          ))}
          {bills.length < 3 && (
            <div className="border-dotted" onClick={() => toggleModal('add')}> {/* Change 8 */}
              <div className="posticon">
                <FiPlusCircle />
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="bg-black bg-opacity-50 fixed inset-0"
          ></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-5 relative z-99">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalMode === 'add' ? 'Create New Product' : 'Edit Product'}
            </h3>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="planName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="planPrice"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Plan Price
                  </label>
                  <input
                    type="text"
                    value={planPrice}
                    onChange={(e) => setPlanPrice(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="planFeatures"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Plan Features
                  </label>
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center px-1 py-1">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handlePlanFeaturesChange(index, e.target.value)
                        }
                        className="mr-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter plan feature"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removePlanFeature(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addPlanFeature}>
                    Add Feature
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="planDescription"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Plan Description
                  </label>
                  <textarea
                    id="planDescription"
                    rows={4}
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter plan description"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => toggleModal('add')}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Add Plan
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
