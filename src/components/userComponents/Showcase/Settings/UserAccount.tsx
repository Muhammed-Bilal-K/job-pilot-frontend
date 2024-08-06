import React, { useRef } from "react";
import { ShowLeftComponent } from "../ShowLeftComo";
import SettingNavbar from "./SettingNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store";
// import { currentUser } from "../../../../apis/auth";
// import { signInSuccess } from "../../../../redux/slices/employer.slice";
// import {
//   GetSpecificCompany,
//   SubmitCompnayInfo,
// } from "../../../../apis/employer";
// import { message } from "antd";

interface ICompanyInfo {
  userId: string;
  phone: string;
  email: string;
}

const UserAccount: React.FC = () => {
  //   const [employer, setEmployer] = useState<string>("");
  // const [empInfo, setEmpInfo] = useState<any>({});
  //   const dispatch = useDispatch();
  //   const Employer: any = useSelector((state: RootState) => {
  //     return state.employer.currentEmployer;
  //   });

  //   useEffect(() => {
  //     if (Employer) {
  //       setEmployer(Employer?.fullname);
  //     }
  //   }, [Employer]);

  //   useEffect(() => {
  //     const token = localStorage.getItem("Emplo");
  //     if (token && !employer) {
  //       const fetchUserData = async (token: string) => {
  //         try {
  //           const user = await currentUser(token);
  //           dispatch(signInSuccess(user.data.currentUser));
  //         } catch (error) {
  //           console.error("Error fetching user data:", error);
  //         }
  //       };

  //       fetchUserData(token);
  //     }
  //   }, [employer]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await GetSpecificCompany(Employer?._id);
  //       if (response.Company) {
  //         setEmpInfo({});
  //       }
  //     };
  //     fetchData();
  //   }, [Employer?._id]);

  const phoneRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = phoneRef.current?.value || "";
    const emailAddress = emailAddressRef.current?.value || "";

    try {
      const datas: ICompanyInfo = {
        userId: "Employer?._id",
        phone: phone,
        email: emailAddress,
      };
      console.log(datas);

      //   const res = await SubmitCompnayInfo(datas);
      //   if (res) {
      //     message.info("profile updated");
      //     location.reload();
      //   }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <SettingNavbar />
        <h5 className="mt-3 font-semibold mb-4">Contact Information</h5>
        <form onSubmit={handleSubmit}>
          <div className="comapny-input-from" style={{ width: "75%" }}>
            <div>
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="company-name"
                placeholder="Company Name"
                ref={phoneRef}
                // value={Employer?.fullname}
              />
            </div>
            <div>
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                placeholder="Company Email address"
                name="email-address"
                ref={emailAddressRef}
                // value={Employer?.email}
              />
            </div>
            <button className="text-start" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div>
          <h1>Change Password</h1>
          <form>
            <div
              className="comapny-input-from flex gap-10"
              style={{ flexDirection: "row" }}
            >
              <div>
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  placeholder="Company Email address"
                  name="email-address"
                  ref={emailAddressRef}
                  // value={Employer?.email}
                />
              </div>
              <div>
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  placeholder="Company Email address"
                  name="email-address"
                  ref={emailAddressRef}
                  // value={Employer?.email}
                />
              </div>
              <div>
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  placeholder="Company Email address"
                  name="email-address"
                  ref={emailAddressRef}
                  // value={Employer?.email}
                />
              </div>
            </div>
            <button className="text-start" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          <h1>Delete Your Account</h1>
          <div>
            <p>
              Here at Velstar, we don't just make websites, we create
              exceptional digital experiences that consumers love. Our team of
              designers, developers, strategists, and creators work together to
              push brands to the next level. From Platform Migration, User
              Experience & User Interface Design, to Digital Marketing, we have
              a proven track record in delivering outstanding eCommerce
              solutions and driving sales for our clients.
            </p>
          </div>
          <button className="text-start" type="submit">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
