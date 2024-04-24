import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { GetSpecificCompany } from "../../../apis/employer";
import { useParams } from "react-router-dom";
import { RiStackLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import { RiTwitterXLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { RootState } from "../../../redux/store";
import { EmployerSpecificJobs, MakeFavoriteJob } from "../../../apis/job";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { RiBuilding2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

interface Job {
  _id: string;
  company?: { companyname: string };
  jobTitle: string;
  logo: string
  jobtype: string;
  minSalary: string;
  maxSalary: string;
  country: string;
  state: string;
  companylogo: string;
}

export const EmploDetails: React.FC = () => {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState<any>({});
  const [joblist, setJoblist] = useState<Job[]>([]);
  const { id } = useParams<{ id: string }>();
  const [specificCompany, setSpecificCompany] = useState<any>();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });

  console.log(User);
  
    if (!joblist) {
      return (
        <>
          <span className="sr-only">Loading...</span>
        </>
      );
    }
  
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const respo = await GetSpecificCompany(id);
        console.log(respo.Company);
        setSpecificCompany(respo.Company);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (specificCompany?.email) {
      const fetchData = async () => {
        const res = await EmployerSpecificJobs(specificCompany?.email);
        console.log(res.jobs);
  
        setJoblist(res.jobs);
      };
      fetchData();
    }
  }, [specificCompany?.email]);


  const handleClick = (job: any) => {
    console.log(job);

    console.log(job._id);
    navigate(`/find-job/job-details/${job._id}`);
  };

  const HandleFaovriteJobs = async (id: string) => {
    const jobInfo = {
      JobId: id,
    };

    if (User?._id === undefined || null) {
      return message.info("need to signIn First");
    }

    try {
      // const res = await MakeFavoriteJob(User._id, jobInfo);
      // console.log(res);
      // message.info(res.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(specificCompany);

  return (
    <>
      <Navbar />
      <div className="job-Show">
        <div className="job-show-left">
          <h1>Job Details</h1>
        </div>
        <div className="job-show-right">
          Home/ Find Job/ {specificCompany?.name} / Job Details
        </div>
      </div>
      <div className="class-for-container-in-emplo-details py-0 px-40">
        <div className="move-for-banner">
          <img
            className="banner-image-emplo"
            src={specificCompany?.banner}
            alt="the banner image"
          />
        </div>
      </div>
      <div className="emplo-info-show-banner py-0 px-40">
        <div className="flex justify-between small-banner-handle">
          <div className="w-1/2 flex gap-2 items-center">
            <div>
              <img
                className="rounded-full w-10"
                src={specificCompany?.logo}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-2xl">{specificCompany?.name}</h1>
              <p>{specificCompany?.industryType}</p>
            </div>
          </div>
          <div className="flex justify-between w-1/2">
            <div>
              <div>
                <RiStackLine />
              </div>
              <div>
                <h3>TEAM SIZE</h3>
              </div>
              <div>
                <h5>{specificCompany?.teamSize}</h5>
              </div>
            </div>
            <div>
              <div>
                <FaRegCalendarAlt />
              </div>
              <div>
                <h3>FOUND IN</h3>
              </div>
              <div>
                <h5>{specificCompany?.yearEstablished}</h5>
              </div>
            </div>
            <div>
              <div>
                <PiSuitcaseSimpleLight />
              </div>
              <div>
                <h3>INDUSTRY TYPE</h3>
              </div>
              <div>
                <h5>{specificCompany?.industryType}</h5>
              </div>
            </div>
            <div>
              <div>
                <RiBuilding2Fill />
              </div>
              <div>
                <h3 className="uppercase">Organization TYPE</h3>
              </div>
              <div>
                <h5>{specificCompany?.organizationType}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="emplo-info-compl-detail py-0 px-40 flex mt-5 h-full">
        <div className="w-2/3">
          <div>
            <h2 className="text-xl mt-5 font-semibold">Descriptions</h2>
            <h5 className="mt-4 mr-5">{specificCompany?.about}</h5>

            <p className="mt-2 mr-5 justify-normal">
              The role will involve translating project specifications into
              clean, test-driven, easily maintainable code. You will work with
              the Project and Development teams as well as with the Technical
              Director, adhering closely to project plans and delivering work
              that meets functional & non-functional requirements. You will have
              the opportunity to create new, innovative, secure and scalable
              features for our clients on the Shopify platform
            </p>
          </div>
          <div>
            <h2 className="text-xl mt-5 font-semibold">Company Benefits</h2>
            <p className="mt-2 mr-5 justify-normal">
              Great troubleshooting and analytical skills combined with the
              desire to tackle challenges head-on years of experience in
              back-end development working either with multiple smaller projects
              simultaneously or large-scale applications.
              <br /> Experience with HTML, JavaScript, CSS, PHP, Symphony and/or
              Laravel Working regularly with APIs and Web Services (REST,
              GrapthQL, SOAP, etc) Have experience/awareness in Agile
              application development, commercial off-the-shelf software,
              middleware, servers and storage, and database management.
              <br /> Familiarity with version control and project management
              systems (e.g., Github, Jira) Great troubleshooting and analytical
              skills combined with the desire to tackle challenges head-on
              Ambitious and hungry to grow your career in a fast-growing agency
            </p>
          </div>
        </div>
        <div
          className="w-1/2 h-1/2 mt-5 border-gray-600 rounded-md follow-media-set"
          style={{ border: "1px solid #ecd1aa" }}
        >
          <h2 className="text-xl font-semibold ml-7 mt-7">
            Contact Information
          </h2>
          <div className="flex justify-start items-center my-4 ml-6">
            <div>
              <TbWorld className="text-blue-600 text-3xl" />
            </div>
            <div className="ml-3">
              <h5 className="text-blue-600 uppercase">website</h5>
              <p>{specificCompany?.website}</p>
            </div>
          </div>
          <div className="flex justify-start items-center my-4 ml-6">
            <div>
              <BiPhoneCall className="text-blue-600 text-3xl" />
            </div>
            <div className="ml-3">
              <h5 className="text-blue-600 uppercase">phone</h5>
              <p>
                {specificCompany?.phone
                  ? specificCompany.phone
                  : "+1-23-2323232323"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center my-4 ml-6 mb-5">
            <div>
              <MdOutlineEmail className="text-blue-600 text-3xl" />
            </div>
            <div className="ml-3">
              <h5 className="text-blue-600 uppercase">Email Address</h5>
              <p>
                {specificCompany?.email
                  ? specificCompany.email
                  : "Email Address"}
              </p>
            </div>
          </div>
          <div className="follow-media my-3">
            <h2 className="text-xl font-semibold ml-7 mt-7">Follow us on :</h2>
            <div className="flex">
              <RiTwitterXLine className="ml-7 mt-2" />
              <FaSquareFacebook className="mt-2 ml-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full related-job">
        <div className="py-0 px-40 mt-5">
          <div>
            <h2 className="text-2xl font-semibold mt-12">Openings Jobs</h2>
            <div>
              <div className="job-list mt-16" style={{padding:"0px"}}>
                {joblist.map((job, index) => (
                      <div
                        className="job-box flex items-end"
                        style={{ justifyContent: "space-between" }}
                        key={index}
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => handleClick(job)}
                        >
                          <h3 className="capitalize">{job.jobTitle}</h3>
                          <div className="job-box-type-amount">
                            <p className="uppercase">{job.jobtype}</p>
                            <p className="salary-nego">
                              Salary: ${job.minSalary} - ${job.maxSalary}
                            </p>
                          </div>
                          <div className="job-box-logo-loca">
                            <img
                              className="img-size-data"
                              src={specificCompany?.logo}
                              alt="Company Logo"
                            />
                            <p>
                              {job.company ? (
                                <p className="company-bold">
                                  {job.company.companyname}
                                </p>
                              ) : (
                                <p className="company-bold">company</p>
                              )}
                              <p className="location-change flex justify-center items-center gap-1">
                                {" "}
                                <IoLocationOutline /> {job.state}, {job.country}
                              </p>
                            </p>
                          </div>
                        </div>
                        <div>
                          <span>
                            <FaRegBookmark
                              className="cursor-pointer"
                              onClick={() => {
                                HandleFaovriteJobs(job._id);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
