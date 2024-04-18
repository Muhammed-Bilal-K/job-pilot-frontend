import React, { useEffect, useRef, useState } from "react";
import { ShowLeftComponent } from "../ShowLeftComo";
import SettingNavbar from "./SettingNavbar";
import { storage } from "../../../../app/utilities/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { currentUser } from "../../../../apis/auth";
import { GetSpecificUser, HandleUserRestInfo } from "../../../../apis/user";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LoginInSuccess } from "../../../../redux/slices/user.slice";
import { message } from "antd";

interface IUserInfo {
  userId: string;
  name: string;
  address: string;
  logo: string;
  education: string;
  experience: string;
  websiteUrl: string;
  preferredJob: string;
  bio: string;
  resumeUrl: string;
}

const UserInfo: React.FC = () => {
  const [candidate, setCandidate] = useState("");
  const [userInfo, setUserInfo] = useState<any>({});
  const dispatch = useDispatch();
  const User: any = useSelector((state: RootState) => {
    return state.user.currentUser;
  });

  useEffect(() => {
    if (User) {
      setCandidate(User.fullname);
    }
  }, [candidate]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && !candidate) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(LoginInSuccess(user.data.currentUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(token);
    }
  }, [candidate]);

  useEffect(() => {
    const fetchData = async () => {
      if (User?._id) {
        const response = await GetSpecificUser(User._id);
        if (response.user) {
          console.log(response.user);
          setUserInfo(response.user);
        }
      }
    };

    fetchData();
  }, [User?._id]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const UserNameRef = useRef<HTMLInputElement>(null);
  const AddressRef = useRef<HTMLInputElement>(null);
  const ExperineceRef = useRef<HTMLInputElement>(null);
  const EducationRef = useRef<HTMLInputElement>(null);
  const WebsiteRef = useRef<HTMLInputElement>(null);
  const BioGraphyRef = useRef<HTMLTextAreaElement>(null);
  const PreferredRef = useRef<HTMLInputElement>(null);
  // Add a ref for the resume input file element
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleLogoInputClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleUploadResume = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click(); // Trigger click event to open file dialog
    }
  };

  let resumeURL: string;
  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const resumeFile = e.target.files?.[0];
    if (resumeFile) {
      const fileName = new Date().getTime() + resumeFile.name;
      const resumeRef = ref(storage, `userResumes/${fileName}`);

      try {
        await uploadBytes(resumeRef, resumeFile);
        resumeURL = await getDownloadURL(resumeRef);
        // You can do something with the resume URL here, like saving it to state or database
        console.log("Resume uploaded successfully. URL:", resumeURL);
        message.info("Resume uploaded successfully");
      } catch (error) {
        console.error("Error uploading resume:", error);
        // Handle error
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = UserNameRef.current?.value || "";
    const address = AddressRef.current?.value || "";
    const experience = ExperineceRef.current?.value || "";
    const education = EducationRef.current?.value || "";
    const website = WebsiteRef.current?.value || "";
    const bioGraphgy = BioGraphyRef.current?.value || "";
    const preferredJob = PreferredRef.current?.value || "";
    const logoFile = logoInputRef.current?.files?.[0];

    let logoURL = userInfo.userlogo ? userInfo.userlogo : "";
    resumeURL = userInfo.resumeUrl ? userInfo.resumeUrl : resumeURL;

    if (logoFile) {
      const fileSizeInMB = logoFile.size / (1024 * 1024);
      if (fileSizeInMB <= 4) {
        const fileName = new Date().getTime() + logoFile.name;
        const logoRef = ref(storage, `userImages/${fileName}`);

        await uploadBytes(logoRef, logoFile);
        logoURL = await getDownloadURL(logoRef);
      } else {
        message.info(
          "File size exceeds 4 MB limit. Please choose a smaller file"
        );
      }
    }

    try {
      const datas: IUserInfo = {
        userId: User._id,
        name: userName,
        address: address,
        education: education,
        experience: experience,
        websiteUrl: website,
        bio: bioGraphgy,
        preferredJob: preferredJob,
        logo: logoURL,
        resumeUrl: resumeURL,
      };
      console.log(datas);

      if (datas.logo === "") {
        message.info("Input can't Empty");
        return;
      }

      if (datas.resumeUrl === undefined || "" || null) {
        message.info("resume is empty");
        return;
      }

      console.log(datas);

      const res = await HandleUserRestInfo(datas);
      if (res) {
        message.info("profile updated");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(userInfo);

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <SettingNavbar />
        <h5 className="mt-3 font-semibold mb-4">User Info</h5>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="boxshow">
              <h5>Upload Logo</h5>
              <input
                type="file"
                accept=".jpg,.png"
                className="hidden"
                ref={logoInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setUserInfo({
                        ...userInfo,
                        userlogo: e.target?.result?.toString() || "",
                      });
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              <div className="refer-file" onClick={handleLogoInputClick}>
                {userInfo.userlogo ? (
                  <img
                    className="w-48 rounded-2xl py-1"
                    src={userInfo.userlogo}
                    alt="userImage"
                  />
                ) : (
                  <p className="profileuploading">upload here!</p>
                )}
              </div>
            </div>
            <div className="boxshow comapny-input-from">
              <div className="flex gap-5" style={{ marginBottom: "0px" }}>
                <div>
                  <label htmlFor="">User Name</label>
                  <input
                    type="text"
                    name="user-name"
                    placeholder="user Name"
                    ref={UserNameRef}
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">User Address</label>
                  <input
                    type="text"
                    placeholder="User address"
                    name="user-address"
                    ref={AddressRef}
                    value={userInfo.address}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, address: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex gap-5" style={{ marginBottom: "0px" }}>
                <div>
                  <label htmlFor="">Experience</label>
                  <input
                    type="text"
                    name="user-experience"
                    placeholder="Experience"
                    ref={ExperineceRef}
                    value={userInfo.experienceLevel}
                    required
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        experienceLevel: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">User Education</label>
                  <input
                    type="text"
                    placeholder="User Education"
                    name="education"
                    ref={EducationRef}
                    value={userInfo.educations}
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, educations: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Personal Website</label>
                <input
                  type="text"
                  placeholder="website Url"
                  name="website"
                  ref={WebsiteRef}
                  required
                  value={userInfo.linkedinUrl}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, linkedinUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <div>
                  <label htmlFor="">Prefered Jobs</label>
                  <input
                    type="text"
                    placeholder="Enter prefered jobs"
                    name="preferredJob"
                    ref={PreferredRef}
                    value={userInfo.preferredJob}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, preferredJob: e.target.value })
                    }
                    required
                  />
                  <p className="mt-2 font-thin text-xs">
                    use ',' after enter a job eg: mern,java,..
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="comapny-input-from">
            <div>
              <label htmlFor="">About Us</label>
              <textarea
                name="bio-graphy"
                placeholder="Write about your company here..."
                ref={BioGraphyRef}
                value={userInfo.biography}
                required
                onChange={(e) =>
                  setUserInfo({ ...userInfo, biography: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div className="" style={{ width: "17%" }}>
            <h1>Your Resume/Cv</h1>
            {userInfo.resumeUrl && (
              <div className="flex justify-between resume-user items-center">
                <div>
                  <IoDocumentTextOutline />
                </div>
                <div>
                  <p>Main Resume</p>
                </div>
                <div>
                  <HiDotsHorizontal />
                </div>
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              ref={resumeInputRef}
              onChange={handleResumeChange}
            />
            <p onClick={handleUploadResume}>Add resume +</p>
          </div>
          <div className="text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
