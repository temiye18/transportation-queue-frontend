import { useState, useEffect } from "react";
import DeliveryQueue from "./components/DeliveryQueue";
import Planner from "./components/Planner";
import axios from "axios";
import { handleCreatePlanner } from "./helpers/api";
import { base_url } from "./constants/baseURL";

function App() {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/getCustomers`);
      setQueue(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleOnDrag = (e, customer) => {
    e.dataTransfer.setData("customer", JSON.stringify(customer));
  };

  const handleDropOnSlot = (e) => {
    let customer = JSON.parse(e.dataTransfer.getData("customer"));

    if (e.target.innerHTML === "") {
      e.target.innerHTML = `<span>
    <span>id: ${customer._id.slice(-4)}</span><br/>
    <span>name: ${customer.customerName}</span><br/>
    <span>pickup: ${customer.pickUpLocation}</span><br/>
    <span>drop-off:${customer.dropOffLocation}</span>
    </span>`;
      setQueue((prevQueue) => prevQueue.filter((c) => c._id !== customer._id));

      const newCustomer = {
        id: customer._id,
        customerName: customer.customerName,
        pickUpLocation: customer.pickUpLocation,
        dropOffLocation: customer.dropOffLocation,
      };
      const date = e.target.id;
      const slot = e.target.getAttribute("slot");
      handleCreatePlanner(date, slot, newCustomer);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Transportation Queue</h1>
      <main>
        <DeliveryQueue queue={queue} handleOnDrag={handleOnDrag} />
        <Planner
          handleDragOver={handleDragOver}
          handleDropOnSlot={handleDropOnSlot}
        />
      </main>
    </>
  );
}

export default App;
