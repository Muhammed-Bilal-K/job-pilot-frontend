import { Api } from "../services/api";
import companyRoutes from "../services/endPoints/companyEndPoint";

interface ICompanyInfo {
  companyId: string;
  name: string;
  email: string;
  about: string;
  logo: string;
}

interface IUpdateCompanyInfo {
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

//Api2  --> Api
export const SubmitCompnayInfo = async (data: ICompanyInfo) => {
  try {
    const res = await Api.post(companyRoutes.companyInfoCreate, { ...data });

    return res;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

//Api2  --> Api
export const UpdateCompanyInfo = async (data: IUpdateCompanyInfo) => {
  try {
    const res = await Api.put(companyRoutes.companyInfoUpdate, { ...data });

    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

//Api2  --> Api
export const GetSpecificCompany = async (id: string) => {
  try {
    const res = await Api.get(companyRoutes.specificCompany(id));

    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};


