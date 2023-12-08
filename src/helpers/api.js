import axios from "axios";
import { base_url } from "../constants/baseURL";

const updateCustomer = async (date, slot, data) => {
  try {
    await axios.patch(
      `${base_url}/api/updateCustomer/${date}?slot=${slot}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

const handleCreatePlanner = async (date, slot, data) => {
  try {
    const response = await axios.post(
      `${base_url}/api/addCustomer?date=${date}&slot=${slot}`,
      data
    );

    console.log(response);
  } catch (error) {
    console.log(error);
    if (error.response.status === 409) {
      updateCustomer(date, slot, data);
    }
  }
};

export { handleCreatePlanner };
