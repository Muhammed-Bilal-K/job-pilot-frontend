const UserRoute = {
    UserInfoRestCreate: "/api/v4/user/profile",
    UserByAuthId: (id : string) => `/api/v4/user/specific-profile/${id}`,
}

export default UserRoute;