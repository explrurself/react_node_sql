const base_url = "http://localhost:5500/";
const img_url = "http://localhost:5500";

const Constants = {
  img_url,
  get_url: {
    getSingleUser: base_url + "getusers/single",
  },
  post_url: {
    register: base_url + "getusers/register",
    login: base_url + "getusers/login",
  },
  put_url: {
    update_profile: base_url + "getusers/update-profile",
  },
  delete_url: {
    delete_profile: base_url + "getusers/delete",
  },
};

export default Constants