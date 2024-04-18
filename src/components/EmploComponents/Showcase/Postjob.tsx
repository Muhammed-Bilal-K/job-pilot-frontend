import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "./ShowLeftComo";
import subImage from "../../../assets/subs plan.png";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {
  CreateJobByCompany,
  CurrentAuthInfo,
  GetAllPlansDetails,
  GetCompanyInfo,
  currentUser,
  makePayment,
} from "../../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { RootState } from '../../../redux/store';
import { signInSuccess } from "../../../redux/slices/employer.slice";

interface Plan {
  _id: string;
  type: string;
  name: string;
  description: string;
  amount: number;
  features: string[];
}

interface CompanyInfo {
  _id: string;
  companyname: string;
}

interface CompanyAuthInfo {
  _id: string;
  name: string;
  stripeCustomerId: string;
}

interface FormData {
  company?: string;
  jobTitle: string;
  tags: string;
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  education: string;
  experience: string;
  jobtype: string;
  expiredate: string;
  joblevel: string;
  applicationNo: string;
  country: string;
  state: string;
  jobDescription: string;
}

const initialErrors = {
  jobTitle: "",
  tags: "",
  jobRole: "",
  minSalary: "",
  maxSalary: "",
  education: "",
  experience: "",
  jobtype: "",
  expiredate: "",
  joblevel: "",
  applicationNo: "",
  country: "",
  state: "",
  jobDescription: "",
};

const Postjob: React.FC = () => {
  const [employer, setEmployer] = useState("");
  const dispatch =  useDispatch();
  const Employer : any = useSelector((state : RootState) => {
    return state.employer.currentEmployer;
  });
  console.log(Employer);
  
  

  const [planDetail, setPlanDetail] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comp, setComp] = useState<CompanyInfo[]>([]);
  const [compAuth, SetcompAuth] = useState<CompanyAuthInfo[]>([]);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [formData, setFormData] = useState<FormData>({
    company: "",
    jobTitle: "",
    tags: "",
    jobRole: "",
    minSalary: "",
    maxSalary: "",
    education: "",
    experience: "",
    jobtype: "",
    expiredate: "",
    joblevel: "",
    applicationNo: "",
    country: "",
    state: "",
    jobDescription: "",
  });

  useEffect(() => {
    if (Employer) {
      setEmployer(Employer.fullname);
    }
  }, [Employer]);

  useEffect(() => {
    const token = localStorage.getItem('Emplo');
    if (token && !employer) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(signInSuccess(user.data.currentUser));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData(token);
    }
  }, [employer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetAllPlansDetails();
        console.log(res.data.planDetail);
        setPlanDetail(res.data.planDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CurrentAuthInfo();
        console.log(res.data.AuthInfo);
        SetcompAuth(res.data.AuthInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetCompanyInfo();
        console.log(res.data.comInfo);
        setComp(res.data.comInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(compAuth);
  

  useEffect(() => {
    const cmp = localStorage.getItem("Company");
    console.log(cmp);
    
    const authId = compAuth.find((v) => v.name === cmp);
    console.log(authId);
    if (authId && authId.stripeCustomerId != "None") {
      setIsModalOpen(true);
    }
    if (authId) {
      localStorage.setItem("companyAuhtId", authId._id);
    }
  }, [compAuth]);

  useEffect(() => {
    const cmp = localStorage.getItem("Company");
    const referenceId = comp.find((value) => value.companyname === cmp);
    console.log(referenceId);

    if (referenceId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        company: referenceId._id,
      }));
    }
  }, [comp]);

  const HandleSubcription = async (planId: string) => {
    const plan = planDetail.find((id) => id._id === planId);
    const companyId = localStorage.getItem("companyAuhtId");
    const allData = {
      plan: plan,
      companyId: companyId,
      planAmount: plan?.amount,
    };
    console.log(allData);
    
    const res = await makePayment(allData);
    console.log(res.data.url);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "jobTitle":
        if (value.trim() === "") {
          error = "Job title is required.";
        }
        break;
      case "tags":
        if (value.trim() === "") {
          error = "Tags are required.";
        }
        break;
      case "jobRole":
        if (value.trim() === "") {
          error = "Job role is required.";
        }
        break;
      case "minSalary":
        if (value.trim() === "") {
          error = "Minimum salary is required.";
        }
        break;
      case "maxSalary":
        if (value.trim() === "") {
          error = "Maximum salary is required.";
        }
        break;
      case "education":
        if (value.trim() === "") {
          error = "Education field is required.";
        }
        break;
      case "experience":
        if (value.trim() === "") {
          error = "Experience field is required.";
        }
        break;
      case "jobtype":
        if (value.trim() === "") {
          error = "Job type is required.";
        }
        break;
      case "expiredate":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < currentDate) {
          error = "Expire date must be a future date.";
          return;
        }
        break;
      case "joblevel":
        if (value.trim() === "") {
          error = "Job level is required.";
        }
        break;
      case "applicationNo":
        if (value.trim() === "") {
          error = "Application number is required.";
        }
        break;
      case "country":
        if (value.trim() === "") {
          error = "Country is required.";
        }
        break;
      case "state":
        if (value.trim() === "") {
          error = "State is required.";
        }
        break;
      case "jobDescription":
        if (value.trim() === "") {
          error = "Job description is required.";
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const formErrors: Record<string, string> = {};
      Object.keys(formData).forEach((key) => {
        switch (key) {
          case "jobTitle":
            if (formData[key].trim() === "") {
              formErrors[key] = "Job title is required.";
            }
            break;
          case "tags":
            if (formData[key].trim() === "") {
              formErrors[key] = "Tags are required.";
            }
            break;
          case "jobRole":
            if (formData[key].trim() === "") {
              formErrors[key] = "Job role is required.";
            }
            break;
          case "minSalary":
            if (formData[key].trim() === "") {
              formErrors[key] = "Minimum salary must be a number.";
            }
            break;
          case "maxSalary":
            if (formData[key].trim() === "") {
              formErrors[key] = "Maximum salary must be a number.";
            }
            break;
          case "education":
            if (formData[key].trim() === "") {
              formErrors[key] = "Education field is required.";
            }
            break;
          case "experience":
            if (formData[key].trim() === "") {
              formErrors[key] = "Experience field is required.";
            }
            break;
          case "jobtype":
            if (formData[key].trim() === "") {
              formErrors[key] = "Job type is required.";
            }
            break;
          case "expiredate":
            const currentDate = new Date();
            const selectedDate = new Date(formData[key]);
            if (selectedDate < currentDate) {
              formErrors[key] = "Expire date must be a future date.";
            }
            break;
          case "joblevel":
            if (formData[key].trim() === "") {
              formErrors[key] = "Job level is required.";
            }
            break;
          case "applicationNo":
            if (formData[key].trim() === "") {
              formErrors[key] = "Application number is required.";
            }
            break;
          case "country":
            if (formData[key].trim() === "") {
              formErrors[key] = "Country is required.";
            }
            break;
          case "state":
            if (formData[key].trim() === "") {
              formErrors[key] = "State is required.";
            }
            break;
          case "jobDescription":
            if (formData[key].trim() === "") {
              formErrors[key] = "Job description is required.";
            }
            break;
          default:
            break;
        }
      });

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      console.log(formData);
      try {
        const res = await CreateJobByCompany(formData);
        console.log(res.data);
        if (res.data.message == "job created successfully.") {
          message.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />

      {isModalOpen ? (
        <div id="crud-modal" className="modal-container w-full">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="post-Job">Post a Job</h1>
            </div>
            <div className="modal-body">
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jobTitle"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type job title"
                      required
                    />
                    {errors.jobTitle && (
                      <div className="error">{errors.jobTitle}</div>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="tags"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type tags"
                      required
                    />
                    {errors.tags && <div className="error">{errors.tags}</div>}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="jobRole"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Job Role
                    </label>
                    <input
                      type="text"
                      name="jobRole"
                      id="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type job role"
                      required
                    />
                    {errors.jobRole && (
                      <div className="error">{errors.jobRole}</div>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="minSalary"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Minimum Salary
                    </label>
                    <input
                      type="number"
                      name="minSalary"
                      id="minSalary"
                      value={formData.minSalary}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter minimum salary"
                      required
                    />
                    {errors.minSalary && (
                      <div className="error">{errors.minSalary}</div>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="maxSalary"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Maximum Salary
                    </label>
                    <input
                      type="number"
                      name="maxSalary"
                      id="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter maximum salary"
                      required
                    />
                    {errors.maxSalary && (
                      <div className="error">{errors.maxSalary}</div>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      id="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Job Type"
                      required
                    />
                    {errors.education && (
                      <div className="error">{errors.education}</div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      id="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Job Type"
                      required
                    />
                    {errors.experience && (
                      <div className="error">{errors.experience}</div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Job Type
                    </label>
                    <input
                      type="text"
                      name="jobtype"
                      id="jobtype"
                      value={formData.jobtype}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Job Type"
                      required
                    />
                    {errors.jobtype && (
                      <div className="error">{errors.jobtype}</div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Expire Date
                    </label>
                    <input
                      type="date"
                      name="expiredate"
                      id="expiredate"
                      value={formData.expiredate}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="dd/mm/yyyy"
                      required
                    />
                    {errors.expiredate && (
                      <div className="error">{errors.expiredate}</div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Job Level
                    </label>
                    <input
                      type="text"
                      name="joblevel"
                      id="joblevel"
                      value={formData.joblevel}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter experience requirements"
                      required
                    />
                    {errors.joblevel && (
                      <div className="error">{errors.joblevel}</div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Application No.
                    </label>
                    <input
                      type="text"
                      name="applicationNo"
                      id="applicationNo"
                      value={formData.applicationNo}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter experience requirements"
                      required
                    />
                    {errors.applicationNo && (
                      <div className="error">{errors.applicationNo}</div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="jobTitle"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type job title"
                      required
                    />
                    {errors.country && (
                      <div className="error">{errors.country}</div>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="tags"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type tags"
                      required
                    />
                    {errors.state && (
                      <div className="error">{errors.state}</div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="tags"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Job Descriptions
                    </label>
                    <textarea
                      placeholder="job description"
                      required
                      name="jobDescription"
                      onChange={handleChange}
                      value={formData.jobDescription}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    ></textarea>
                    {errors.jobDescription && (
                      <div className="error">{errors.jobDescription}</div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a11  1 0 011-1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Post Job
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="showright">
          <div className="subscription-options">
            <h2 className="heading-subscription">
              Buy Premium Subscription to Post a Job
            </h2>
            <div className="subscription-details">
              <div className="left-content">
                <p>
                  The role will involve translating project specifications into
                  clean, test-driven, easily maintainable code. You will work
                  with the Project and Development teams as well as with the
                  Technical Director, adhering closely to project plans and
                  delivering work that meets functional & non-functional
                  requirements. You will have the opportunity to create new,
                  innovative, secure and scalable features for our clients on
                  the Shopify platform
                </p>
              </div>
              <div className="right-image">
                <img src={subImage} alt="Subscription Image" />
              </div>
            </div>
            <div className="subscription-plans">
              {planDetail.map((plan) => (
                <div key={plan.type} className={`plan ${plan.type} plan-all`}>
                  <div className="px-3">
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                    <div className="text-center">
                      <h3 className="amount-month">
                        ${plan.amount}
                        <span>/month</span>
                      </h3>
                    </div>
                  </div>
                  <hr />
                  <div className="plan-features">
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li
                          className="flex items-center justify-center my-4"
                          key={index}
                        >
                          {" "}
                          <IoCheckmarkCircleSharp color="blue" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="choose-plan-button"
                    onClick={() => {
                      HandleSubcription(plan._id);
                    }}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postjob;
