import React, { useState } from "react";
import "./PartnerContract.css"; // Import CSS file for styling

const PartnerContract = ({ onNext }) => {
  const [terms, setTerms] = useState([
    { text: "", accepted: false },
    // Initial empty term
  ]);

  const [paymentDetails, setPaymentDetails] = useState({
    commissionRate: "",
    paymentMethod: "",
    bankAccount: "",
  });

  const [ownerDetails, setOwnerDetails] = useState({
    ownerName: "",
    ownerSignature: "",
    ownerPicture: "",
  });

  const handleTermChange = (index, event) => {
    const { value } = event.target;
    const updatedTerms = [...terms];
    updatedTerms[index].text = value;
    setTerms(updatedTerms);
  };

  const handleAcceptanceChange = (index) => {
    const updatedTerms = [...terms];
    updatedTerms[index].accepted = !updatedTerms[index].accepted;
    setTerms(updatedTerms);
  };

  const handlePaymentDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleOwnerDetailsChange = (event) => {
    const { name, value } = event.target;
    setOwnerDetails({ ...ownerDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to handle form submission, such as sending the data to a server
    onNext(); // Call the onNext function to navigate to the next step
  };

  return (
    <div className="partner-contract container2 res-details">
      <form onSubmit={handleSubmit}>
        <div className="owner-details">
          <table className="partner-table">
            <tr>
              <td>Logistics Services</td>
              <td>
                Orders will be delivered to customers by Yummy Foods delivery
                partners Only
              </td>
            </tr>
            <tr>
              <td>Commission charges Yummy Foods Logistics</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Payment Mechanism Fee</td>
              <td>1.84% + taxes of order value</td>
            </tr>
            <tr>
              <td>Cancellation Fees:</td>
              <td>If applicable, as set out in the terms</td>
            </tr>
            <tr>
              <td>Additional Terms:</td>
              <td>
               <b>Logistics Services and Charges:</b>  <br />
                1.Logistics Services shall be rendered in accordance with the
                term. <br />
                2.The Restaurant Partner agrees it shall not charge delivery
                charges from the customers for order for which Yummy Foods
                undertakes logistics Services. <br />
                3.Yummy Foods has no control, in any mames whatever, with
                respect to the ratings reviews received by the Restaurant
                Partner, for the logistics services availed through yummy foods,
                as ratings are dependent on multiple factors including but not
                limited to each customers experience.
                <br />
                <br />
                <b>Taxes:</b>All amounts payabe here and shall be exclusve of
                applicable taxs, which shall be payable by the Rstaurant Partner{" "}
                <br />
                <br />
                <input type="checkbox" name="Agree " id="" required />
                Agree
                <br />
                Restaurant Partner Compensation! As set out in the Terms.
              </td>
            </tr>
            <tr>
              <td colSpan="2">Receive and accept Contract On email</td>
            </tr>
            <tr>
              <td colSpan="2">
                Enter your email*
                <input type="email" name="" id="" />
                <br />
                <br />
                <button className="submit-button">Send</button>
              </td>
            </tr>
          </table>
        </div>
      </form>
    </div>
  );
};

export default PartnerContract;
