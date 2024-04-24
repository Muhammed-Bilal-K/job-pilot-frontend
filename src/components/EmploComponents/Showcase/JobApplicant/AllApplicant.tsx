import React, { useEffect, useState } from "react";
import ApplicantNav from "./ApplicantNav";
import { ShowLeftComponent } from "../ShowLeftComo";
import { useNavigate, useParams } from "react-router-dom";
import {
  JobAppliedCandiadate,
  SpecificJobAppliedCandiadates,
} from "../../../../apis/job";
import { CreateConversation } from "../../../../apis/chat";
import { message } from "antd";
import { GetSpecificUser } from "../../../../apis/user";

const AllApplicant: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [applications, setApplications] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [specificUserId, setSpecificUserId] = useState<string>("");
  const [specificUserByJobInfo, setSpecificUserByJobInfo] = useState<any>({});
  const [specificUserPersonalDetail, setSpecificUserPersonalDetail] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const respo = await SpecificJobAppliedCandiadates(id!);
      console.log(respo.jobs);
      setApplications(respo.jobs);
    };
    fetchData();
  }, [id]);

  const HandleShowDetail = (UserId: string) => {
    setShowModal(true);
    console.log(UserId);
    setSpecificUserId(UserId)
  };
  
  useEffect(()=>{
    if (specificUserId) { 
      const fetchData = async () => {
        const respo = await JobAppliedCandiadate(specificUserId , id! );
        const response = await GetSpecificUser(specificUserId);
        setSpecificUserPersonalDetail(response.user);
        setSpecificUserByJobInfo(respo.jobs);
      };
      fetchData();
    }
  },[specificUserId])

  const createConverBwUser = async (compId: string, userId: string) => {
    console.log(compId);
    console.log(userId);
    const allData = {
      senderId: compId,
      recieverId: userId,
    };

    message.open({
      type: "loading",
      content: "Action in progress..",
      duration: 3,
    });

    try {
      const res = await CreateConversation(allData);
      console.log(res);
      if (res.convo) {
        message.success("conversation created successfully");
      }
      setTimeout(() => {
        navigate(`/message/${compId}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(specificUserByJobInfo);
  console.log(specificUserPersonalDetail);
  

  return (
    <>
      <div className="showcase">
        <ShowLeftComponent />
        <div className="showright">
          <ApplicantNav JobId={id} />
          <table className="employers-table">
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>
                    <div>
                      <div className="mb-2">
                        <p className="font-semibold capitalize">
                          {application.user.name}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <p className="font-medium capitalize">
                            {application.job.jobTitle}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-medium capitalize">
                            {application.job.experience} - experience
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        createConverBwUser(
                          application.job.company,
                          application.user._id
                        );
                      }}
                      className="ml-5 cursor-pointer"
                    >
                      Open To Message
                    </span>
                  </td>
                  <td>
                    {application.resumeURL && (
                      <a
                        href={application.resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download CV
                      </a>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        HandleShowDetail(application.user._id);
                      }}
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
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-75 outline-none focus:outline-none">
            <div className="relative w-full max-w-5xl mx-auto my-6">
              {/* Modal content */}
              <div className="modal-content">
                {/* Modal header */}
                <div className="relative flex items-center justify-between p-5 bg-white border-b border-gray-300 rounded-tl-lg rounded-tr-lg">
                  <h3 className="text-lg font-semibold">User Details</h3>
                  <button
                    className="absolute top-0 right-0 p-2 mt-2 mr-2 text-sm font-bold text-gray-500 transition-colors duration-150 hover:text-gray-700"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/* Modal body */}
                <div className="relative p-6 bg-white">
                  {/* Modal body content */}
                  <div>
                    <div>
                        <div>
                          <img className="img-data-in-job-apply" src={specificUserPersonalDetail.userlogo} alt="" />
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllApplicant;
