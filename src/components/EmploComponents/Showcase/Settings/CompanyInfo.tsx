import React, { useEffect, useRef, useState } from "react";
import { ShowLeftComponent } from "../ShowLeftComo";
import SettingNavbar from "./SettingNavbar";
import { storage } from "../../../../app/utilities/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { currentUser } from "../../../../apis/auth";
import {
  signInSuccess,
} from "../../../../redux/slices/employer.slice";
import {
  GetSpecificCompany,
  SubmitCompnayInfo,
} from "../../../../apis/employer";
import { message } from "antd";

interface ICompanyInfo {
  companyId: string;
  name: string;
  email: string;
  about: string;
  logo: string;
  banner: string;
}

const CompanyInfo: React.FC = () => {
  const [employer, setEmployer] = useState<string>("");
  const [empInfo, setEmpInfo] = useState<{
    _id: string;
    fullname? : string;
    logo: string;
    banner: string;
    email?: string;
    about: string;
  }>({
    _id: "",
    email : "",
    fullname : "",
    logo: "",
    banner: "",
    about: "",
  });
  const dispatch = useDispatch();
  const Employer: any = useSelector((state: RootState) => {
    return state.employer.currentEmployer;
  });
  console.log(Employer);

  useEffect(() => {
    if (Employer) {
      setEmployer(Employer?.fullname);
    }
  }, [Employer]);

  useEffect(() => {
    const token = localStorage.getItem("Emplo");
    if (token && !employer) {
      const fetchUserData = async (token: string) => {
        try {
          const user = await currentUser(token);
          dispatch(signInSuccess(user.data.currentUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(token);
    }
  }, [employer]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSpecificCompany(Employer?._id);
      if (response.Company) {
        setEmpInfo({
          _id: response.Company._id,
          logo: response.Company.logo || "",
          banner: response.Company.banner || "",
          about: response.Company.about,
        });
      }
    };
    fetchData();
  }, [Employer?._id]);

  console.log(empInfo);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const aboutUsRef = useRef<HTMLTextAreaElement>(null);

  const handleLogoInputClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleBannerInputClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyName = companyNameRef.current?.value || "";
    const emailAddress = emailAddressRef.current?.value || "";
    const aboutUs = aboutUsRef.current?.value || "";
    const logoFile = logoInputRef.current?.files?.[0];
    const bannerFile = bannerInputRef.current?.files?.[0];

    let logoURL = "";
    if (logoFile) {
      const fileSizeInMB = logoFile.size / (1024 * 1024);
      if (fileSizeInMB <= 4) {
        const fileName = new Date().getTime() + logoFile.name;
        const logoRef = ref(storage, `logos/${fileName}`);

        await uploadBytes(logoRef, logoFile);
        logoURL = await getDownloadURL(logoRef);
      } else {
        message.info(
          "File size exceeds 4 MB limit. Please choose a smaller file"
        );
      }
    }

    let bannerURL = "";
    if (bannerFile) {
      const fileSizeInMB = bannerFile.size / (1024 * 1024);
      if (fileSizeInMB <= 4) {
        const fileName = new Date().getTime() + bannerFile.name;
        const bannerRef = ref(storage, `banners/${fileName}`);

        await uploadBytes(bannerRef, bannerFile);
        bannerURL = await getDownloadURL(bannerRef);
      } else {
        message.info(
          "File size exceeds 4 MB limit. Please choose a smaller file"
        );
      }
    }

    try {
      const datas: ICompanyInfo = {
        companyId: Employer?._id,
        name: companyName,
        email: emailAddress,
        about: aboutUs,
        logo: logoURL,
        banner: bannerURL,
      };
      console.log(datas);
      
      const res = await SubmitCompnayInfo(datas);
      if (res) {
        message.info("profile updated");
        location.reload();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <SettingNavbar />
        <h5 className="mt-3 font-semibold mb-4">Company Info</h5>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="boxshow">
              <h5>Upload Logo</h5>
              <input
                type="file"
                accept=".jpg,.png"
                className="hidden"
                ref={logoInputRef}
              />
              <div className="refer-file" onClick={handleLogoInputClick}>
                {empInfo.logo ? (
                  <img
                    className="w-48 rounded-2xl py-1"
                    src={empInfo.logo}
                    alt=""
                  />
                ) : (
                  <p className="profileuploading">upload here!</p>
                )}
              </div>
            </div>
            <div className="boxshow pl-5">
              <h5>Upload Banner</h5>
              <input
                type="file"
                accept=".jpg,.png"
                className="hidden"
                ref={bannerInputRef}
              />
              <div className="refer-file" onClick={handleBannerInputClick}>
                {empInfo.banner ? (
                  <img
                    className="border object-contain"
                    style={{ height: "195px", width: "53rem" }}
                    src={empInfo.banner}
                    alt=""
                  />
                ) : (
                  <p className="profileuploading banneruploading">
                    upload here!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="comapny-input-from">
            <div>
              <label htmlFor="">Company Name</label>
              <input
                type="text"
                name="company-name"
                placeholder="Company Name"
                ref={companyNameRef}
                value={Employer?.fullname}
                onChange={(e) =>
                  setEmpInfo({ ...Employer, fullname: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                placeholder="Company Email address"
                name="email-address"
                ref={emailAddressRef}
                value={Employer?.email}
                onChange={(e) =>
                  setEmpInfo({ ...Employer, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">About Us</label>
              <textarea
                name="about-us"
                placeholder="Write about your company here..."
                ref={aboutUsRef}
                value={empInfo.about}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, about: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
