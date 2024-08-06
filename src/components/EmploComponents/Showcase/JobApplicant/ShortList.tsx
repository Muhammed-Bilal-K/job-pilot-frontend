import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "../ShowLeftComo";
import ApplicantNav from "./ApplicantNav";
import { useParams } from "react-router-dom";
import { SpecificJobAppliedCandiadates } from "../../../../apis/job";

export const ShortList: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const respo = await SpecificJobAppliedCandiadates(id!);
      setApplications(respo.jobs);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="showcase">
        <ShowLeftComponent />
        <div className="showright">
          <ApplicantNav JobId={id} />
          <table className="employers-table">
            <tbody>
              {applications.map((application) => (
                application.shortlisted && (
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
                      // onClick={() => {
                      //   HandleShowDetail(application.user._id);
                      // }}
                      className="view-applications-btn px-5 py-2 rounded-lg"
                      style={{ backgroundColor: "#E7F0FA" }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
