import React, { useEffect, useState } from "react";
import { ShowLeftComponent } from "../Showcase/ShowLeftComo";
import User from "../../../assets/Ellipse 18.png";
import { allUsers, blockUser , deleteUserByAdmin } from "../../../apis/auth";
import Swal from 'sweetalert2';

interface IUserList {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  isBlock: boolean;
}

const Candidate: React.FC = () => {
  const [users, setUsers] = useState<IUserList[]>([]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUserByAdmin(id);
        if (res.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(()=>{
            location.reload();
          });
        }
      }
    });
  }

  const HandleBlock = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, blocked!"
      }).then( async (result) => {
        if (result.isConfirmed) {
          const res = await blockUser(id);
          if (res.success === true) {
            Swal.fire({
              title: "Blocked!",
              text: "Your user has been blocked.",
              icon: "success"
            }).then(()=>{
              location.reload();
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const HandleBlock = async (id: string) => {
  //   try {
  //    const res = await blockUser(id);
  //    console.log(res.success);
  //    if (res.success === true) {
  //     setTimeout(() => {
  //       location.reload();
  //     }, 100);
  //    }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const res = await allUsers();
      console.log(res.Users);
      setUsers(res.Users);
    };
    fetchData();
  }, []);

  return (
    <div className="showcase">
      <ShowLeftComponent />
      <div className="showright">
        <h2 className="pb-5">Job-Pliot Candidates</h2>
        <table className="w-full">
          <thead style={{ backgroundColor: "#F2F2F2" }}>
            <tr>
              <th className="px-3 py-3">Candidates</th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-3 py-3">
                  <div className="flex items-center space-x-4">
                    <div>
                      <img src={User} alt="compImg" />
                    </div>
                    <div>
                      <div>
                        <h4 className="capitalize">{user.fullname}</h4>
                      </div>
                      <div>
                        <p className="capitalize">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center">
                    <p
                      onClick={() => HandleBlock(user._id)}
                      className="cursor-pointer"
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-aliceblue p-4 text-black text-base font-medium rounded-xl bottom-0"
                      style={{ backgroundColor: "#E7F0FA" }}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidate;
