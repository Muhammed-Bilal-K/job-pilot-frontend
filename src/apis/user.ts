import { Api, Api5 } from "../services/api";
import UserRoute from "../services/endPoints/userEndpoints";

interface IUserInfo {
    userId: string;
    name: string;
    address: string;
    logo: string;
    education: string;
    experience: string;
    websiteUrl: string;
    bio: string;
    resumeUrl : string;
  }

//Api5  --> Api
export const HandleUserRestInfo = async (data: IUserInfo) => {
    try {
      const res = await Api.post(UserRoute.UserInfoRestCreate, { ...data });
  
      return res;
    } catch (error) {
      console.error("Error creating company details:", error);
      throw new Error("Error creating company details:");
    }
  };

  //Api5  --> Api
export const GetSpecificUser = async (id: string) => {
    try {
      const res = await Api.get(UserRoute.UserByAuthId(id));
  
      return res.data;
    } catch (error) {
      console.error("Error creating company details:", error);
      throw new Error("Error creating company details:");
    }
  };