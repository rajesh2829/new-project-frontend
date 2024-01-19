// Status Constants
export const Status = {
  ACTIVE : "Active",
  INACTIVE : "InActive",
};

class Customer {
    //lastname and firstname
    static GetDisplayName = (firstName, lastName) => {
        let name;
      if (firstName && lastName) {
        return name = firstName + " " + lastName;
      } else {
        return name = firstName;
      }
    };
  }
  export default Customer;