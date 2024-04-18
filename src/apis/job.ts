import { Api3 } from "../services/api";
import JobRoute from "../services/endPoints/jobEndpoint";

export const EmployerSpecificJobs = async (email: string) => {
  try {
    const res = await Api3.get(JobRoute.companyJobList(email));
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

export const SpecificJobAppliedCandiadates = async (id: string) => {
  try {
    const res = await Api3.get(JobRoute.SpecificJobAppliedCandiadates(id));
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

export const MakeFavoriteJob = async (id: string , data : any) => {
  try {
    const res = await Api3.put(JobRoute.makeJobFavoriite(id), { ...data});
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

export const ListAllPreferredJobs = async (id: string , data : any) => {
  try {
    const res = await Api3.put(JobRoute.makeJobFavoriite(id), { ...data});
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};



export const PreferredJobs = async (
  preferedJobList: any,
) => {
  try {
    const res = await Api3.get(JobRoute.ListAllPreferredJobs, {
      params: { preferedJobList },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

