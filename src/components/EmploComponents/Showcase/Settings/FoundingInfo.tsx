import React, { useEffect, useRef, useState } from "react";
import { ShowLeftComponent } from "../ShowLeftComo";
import SettingNavbar from "./SettingNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { currentUser } from "../../../../apis/auth";
import { signInSuccess } from "../../../../redux/slices/employer.slice";
import {
  GetSpecificCompany,
  UpdateCompanyInfo,
} from "../../../../apis/employer";
import { message } from "antd";

interface ICompanyInfo {
  companyId: string;
  organizationType: string;
  industryType: string;
  teamSize: string;
  yearOfEstablished: string;
  companyWebsiteUrl: string;
  country: string;
  state: string;
  companyVision: string;
  socialLinks1: string;
  socialLinks2: string;
}

interface StateOption {
  name: string;
  value: string;
}

const FoundingInfo: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [empInfo, setEmpInfo] = useState<any>({});

  const stateOptions: { [key: string]: StateOption[] } = {
    India: [
      { name: "Delhi", value: "Delhi" },
      { name: "Maharashtra", value: "Maharashtra" },
      { name: "Karnataka", value: "Karnataka" },
    ],
    USA: [
      { name: "New York", value: "New York" },
      { name: "California", value: "California" },
      { name: "Texas", value: "Texas" },
    ],
  };

  const [employer, setEmployer] = useState<string>("");

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
    if (Employer?._id) {
      const fetchData = async () => {
        const respo = await GetSpecificCompany(Employer._id);
        console.log(respo.Company);
        setEmpInfo(respo.Company);
      };
      fetchData();
    }
  }, [Employer?._id]);

  console.log(empInfo, "from the emplo infppppppp");

  const OrganizationTypeRef = useRef<HTMLSelectElement>(null);
  const IndustryTypeRef = useRef<HTMLSelectElement>(null);
  const TeamSizeRef = useRef<HTMLSelectElement>(null);
  const YearOfEstablishedRef = useRef<HTMLInputElement>(null);
  const CompanyWebsiteUrlRef = useRef<HTMLInputElement>(null);
  const SocialLinks1Ref = useRef<HTMLInputElement>(null);
  const SocialLinks2Ref = useRef<HTMLInputElement>(null);
  const CompanyVisionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const OrganizationType = OrganizationTypeRef.current?.value || "";
    const IndustryType = IndustryTypeRef.current?.value || "";
    const TeamSize = TeamSizeRef.current?.value || "";
    const YearOfEstablished = YearOfEstablishedRef.current?.value || "";
    const CompanyWebsiteUrl = CompanyWebsiteUrlRef.current?.value || "";
    const CompanyVision = CompanyVisionRef.current?.value || "";
    const SocialLinks1 = SocialLinks1Ref.current?.value || "";
    const SocialLinks2 = SocialLinks2Ref.current?.value || "";

    if (OrganizationType === '' || IndustryType === '' || TeamSize === '' || YearOfEstablished === '' || CompanyWebsiteUrl === ''
      || CompanyVision === '' || SocialLinks1 === '' || SocialLinks2 === ''
    ) {
      message.warning('fill all remaining informations');
      return;
    }

    try {
      const datas: ICompanyInfo = {
        companyId: Employer?._id,
        organizationType: OrganizationType,
        industryType: IndustryType,
        teamSize: TeamSize,
        yearOfEstablished: YearOfEstablished,
        companyWebsiteUrl: CompanyWebsiteUrl,
        country: selectedCountry,
        state: selectedState,
        companyVision: CompanyVision,
        socialLinks1: SocialLinks1,
        socialLinks2: SocialLinks2,
      };
      console.log(datas);

      const res = await UpdateCompanyInfo(datas);
      message.loading('progressing.....')
      console.log(res);
      if (res.message == 'Company Data saved successfully.') {
        message.success(res.data.message);
        location.reload();
      } else {
        message.error("something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <SettingNavbar />
        <h5 className="mt-3 font-semibold mb-4">Founding Info</h5>
        <form onSubmit={handleSubmit}>
          <div className="company-select-form flex gap-5">
            <div className="inner-part-select" style={{ width: "30%" }}>
              <label htmlFor="organization-type" className="font-bold">
                Organization Type
              </label>
              <select
                required
                className="select-part"
                ref={OrganizationTypeRef}
                value={empInfo.organizationType}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, organizationType: e.target.value })
                }
                id="organization-type"
                name="organization-type"
                style={{ width: "100%" }}
              >
                <option value="corporation">Corporation</option>
                <option value="partnership">Partnership</option>
                <option value="sole-proprietorship">Sole Proprietorship</option>
                <option value="non-profit">Non-Profit</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={{ width: "30%" }}>
              <label htmlFor="industry-type" className="font-bold">
                Industry Type
              </label>
              <select
                required
                id="industry-type"
                name="industry-type"
                ref={IndustryTypeRef}
                style={{ width: "100%" }}
              >
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={{ width: "30%" }}>
              <label htmlFor="team-size" className="font-bold">
                Team Size
              </label>
              <select
                id="team-size"
                name="team-size"
                required
                style={{ width: "100%" }}
                ref={TeamSizeRef}
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value="501+">501+</option>
              </select>
            </div>
          </div>
          <div
            className="comapny-input-from gap-5"
            style={{ flexDirection: "row" }}
          >
            <div style={{ width: "30%" }}>
              <label htmlFor="">Year Of Established</label>
              <input
                type="date"
                className="mt-2"
                required
                ref={YearOfEstablishedRef}
                value={empInfo.yearEstablished}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, yearEstablished: e.target.value })
                }
                name="company-name"
                placeholder="Company Name"
              />
            </div>
            <div style={{ width: "30%" }}>
              <label htmlFor="">Company Website Url</label>
              <input
                className="mt-2"
                type="text"
                required
                ref={CompanyWebsiteUrlRef}
                value={empInfo.website}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, website: e.target.value })
                }
                placeholder="Company Email address"
                name="email-address"
              />
            </div>
          </div>

          <div>
            <h3>Locations</h3>

            <div className="company-select-form flex gap-5">
              <div style={{ width: "40%" }}>
                <label htmlFor="country" className="font-bold">
                  Country
                </label>
                <select
                  required
                  id="country"
                  name="country"
                  onChange={handleCountryChange}
                  value={selectedCountry}
                  // value={empInfo.country}
                  // onChange={(e) =>
                  //   setEmpInfo({ ...empInfo, country: e.target.value })
                  // }
                >
                  <option value="">Select Country</option>
                  {Object.keys(stateOptions).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ width: "40%" }}>
                <label htmlFor="state" className="font-bold">
                  State
                </label>
                <select
                  required
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {selectedCountry &&
                    stateOptions[selectedCountry] &&
                    stateOptions[selectedCountry].map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="company-vision">
              <label className="block" htmlFor="">
                Company Vision
              </label>
              <textarea
                ref={CompanyVisionRef}
                value={empInfo.vision}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, vision: e.target.value })
                }
                required
                name="about-us"
                placeholder="Write about your company here..."
              ></textarea>
            </div>
          </div>

          <div
            className="comapny-input-from gap-5"
            style={{ flexDirection: "row" }}
          >
            <div style={{ width: "40%" }}>
              <label htmlFor="">Social Links 1</label>
              <input
                type="text"
                required
                ref={SocialLinks1Ref}
                value={empInfo.socialLinks1}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, socialLinks1: e.target.value })
                }
                className="mt-2"
                name="company-name"
                placeholder="Company Name"
              />
            </div>
            <div style={{ width: "40%" }}>
              <label htmlFor="">Social Links 2</label>
              <input
                className="mt-2"
                required
                type="text"
                ref={SocialLinks2Ref}
                value={empInfo.socialLinks2}
                onChange={(e) =>
                  setEmpInfo({ ...empInfo, socialLinks2: e.target.value })
                }
                placeholder="Company Email address"
                name="email-address"
              />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FoundingInfo;
