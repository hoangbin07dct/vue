export default {
  role: (state) => {
    return state.role?.map((item) => {
      return {
        name: item.role_name,
        value: item.role_id
      };
    });
  }
};
