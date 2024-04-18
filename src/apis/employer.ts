import { Api2 } from "../services/api";
import companyRoutes from "../services/endPoints/companyEndPoint";

interface ICompanyInfo {
  companyId: string;
  name: string;
  email: string;
  about: string;
  logo: string;
}

export const SubmitCompnayInfo = async (data: ICompanyInfo) => {
  try {
    const res = await Api2.post(companyRoutes.companyInfoCreate, { ...data });

    return res;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

export const GetSpecificCompany = async (id: string) => {
  try {
    const res = await Api2.get(companyRoutes.specificCompany(id));

    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};


