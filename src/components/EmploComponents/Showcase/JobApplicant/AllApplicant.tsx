import React, { useEffect, useState } from "react";
import ApplicantNav from "./ApplicantNav";
import { ShowLeftComponent } from "../ShowLeftComo";
import { useNavigate, useParams } from "react-router-dom";
import { SpecificJobAppliedCandiadates } from "../../../../apis/job";
import { CreateConversation } from "../../../../apis/chat";
import { message } from "antd";

const AllApplicant: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const respo = await SpecificJobAppliedCandiadates(id!);
      console.log(respo.jobs);
      setApplications(respo.jobs);
    };
    fetchData();
  }, [id]);

  const createConverBwUser = async (compId : string , userId : string) => {
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
  }

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
                      <span onClick={()=>{
                        createConverBwUser(application.job.company, application.user._id )
                      }} className="ml-5 cursor-pointer">Open To Message</span>
                    {/* <Link to={`/message/${application.job.company}`}>
                      <span className="ml-5">Open To Message</span>
                    </Link> */}
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
      </div>
    </>
  );
};

export default AllApplicant;
