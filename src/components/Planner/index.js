import { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../constants/baseURL";

const Planner = ({ handleDragOver, handleDropOnSlot }) => {
  const [plannerData, setPlannerData] = useState([]);

  const fetchPlanner = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/getPlanners`);

      setPlannerData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlanner();
  }, []);
  const currentDate = new Date();
  const plannerDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    plannerDates.push(nextDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  const validPlanners = plannerData.filter((planner) => {
    return (
      plannerDates.includes(planner.date) &&
      planner.date >= currentDate.toISOString().split("T")[0]
    );
  });

  const plannerSlots = plannerDates.map((date) => {
    const matchingPlanner = validPlanners.find(
      (planner) => planner.date === date
    );

    if (matchingPlanner) {
      return {
        date: matchingPlanner.date,
        slot_1: matchingPlanner.slot_1,
        slot_2: matchingPlanner.slot_2,
        slot_3: matchingPlanner.slot_3,
        slot_4: matchingPlanner.slot_4,
      };
    } else {
      return {
        date,
        slot_1: {
          id: null,
          customerName: null,
          pickUpLocation: null,
          dropOffLocation: null,
        },
        slot_2: {
          id: null,
          customerName: null,
          pickUpLocation: null,
          dropOffLocation: null,
        },
        slot_3: {
          id: null,
          customerName: null,
          pickUpLocation: null,
          dropOffLocation: null,
        },
        slot_4: {
          id: null,
          customerName: null,
          pickUpLocation: null,
          dropOffLocation: null,
        },
      };
    }
  });

  return (
    <div className="planner-container">
      <table>
        <caption>Planner</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot 1</th>
            <th>Slot 2</th>
            <th>Slot 3</th>
            <th>Slot 4</th>
          </tr>
        </thead>
        <tbody>
          {plannerSlots.map((slot) => (
            <tr key={slot.date}>
              <td>{slot?.date}</td>
              <td
                onDrop={(e) => handleDropOnSlot(e)}
                onDragOver={(e) => handleDragOver(e)}
                id={slot.date}
                slot="slot_1"
              >
                {slot.slot_1.id ? (
                  <span>
                    <span>id: {slot?.slot_1?.id?.slice(-4)}</span>
                    <br />
                    <span>name: {slot?.slot_1?.customerName}</span>
                    <br />
                    <span>pickup: {slot?.slot_1?.pickUpLocation}</span>
                    <br />
                    <span>drop-off: {slot?.slot_1?.dropOffLocation}</span>
                  </span>
                ) : null}
              </td>
              <td
                onDrop={(e) => handleDropOnSlot(e)}
                onDragOver={(e) => handleDragOver(e)}
                id={slot.date}
                slot="slot_2"
              >
                {slot.slot_2.id ? (
                  <span>
                    <span>id: {slot?.slot_2?.id?.slice(-4)}</span>
                    <br />
                    <span>name: {slot?.slot_2?.customerName}</span>
                    <br />
                    <span>pickup: {slot?.slot_2?.pickUpLocation}</span>
                    <br />
                    <span>drop-off: {slot?.slot_2?.dropOffLocation}</span>
                  </span>
                ) : null}
              </td>
              <td
                onDrop={(e) => handleDropOnSlot(e)}
                onDragOver={(e) => handleDragOver(e)}
                id={slot.date}
                slot="slot_3"
              >
                {slot.slot_3.id ? (
                  <span>
                    <span>id: {slot?.slot_3?.id?.slice(-4)}</span>
                    <br />
                    <span>name: {slot?.slot_3?.customerName}</span>
                    <br />
                    <span>pickup: {slot?.slot_3?.pickUpLocation}</span>
                    <br />
                    <span>drop-off: {slot?.slot_3?.dropOffLocation}</span>
                  </span>
                ) : null}
              </td>
              <td
                onDrop={(e) => handleDropOnSlot(e)}
                onDragOver={(e) => handleDragOver(e)}
                id={slot.date}
                slot="slot_4"
              >
                {slot.slot_4.id ? (
                  <span>
                    <span>id: {slot?.slot_4?.id?.slice(-4)}</span>
                    <br />
                    <span>name: {slot?.slot_4?.customerName}</span>
                    <br />
                    <span>pickup: {slot?.slot_4?.pickUpLocation}</span>
                    <br />
                    <span>drop-off: {slot?.slot_4?.dropOffLocation}</span>
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Planner;
