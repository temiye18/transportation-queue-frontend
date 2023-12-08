const DeliveryQueue = ({ queue, handleOnDrag }) => {
  return (
    <div className="queue-container">
      <table>
        <caption>Delivery Queue</caption>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Pick-up Location</th>
            <th>Drop-off Location</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((customer) => (
            <tr
              key={customer._id}
              draggable
              onDragStart={(e) => handleOnDrag(e, customer)}
            >
              <td>{customer._id.slice(-4)}</td>
              <td>{customer.customerName}</td>
              <td>{customer.pickUpLocation}</td>
              <td>{customer.dropOffLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryQueue;
