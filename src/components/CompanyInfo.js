import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompanyInfo = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const bearerToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setAccounts(data.accounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <h1
        className="mx-auto text-center"
        style={{ display: "grid", placeItems: "center" }}
      >
        Accounts
      </h1>

      <div className="row">
        {loading ? ( // Render loading indicator if data is still being fetched
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          accounts?.map((account) => (
            <div
              key={account.name}
              className="col-md-3 mb-4"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div
                className="card"
                onClick={() => {
                  const getId = account.name.split("/")[1];

                  navigate(`/reviews/${getId}`);
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Account Name: {account.accountName}
                  </h5>
                  <p className="card-text">Type: {account.type}</p>
                  <p className="card-text">
                    Verification State: {account.verificationState}
                  </p>
                  <p className="card-text">
                    Vetted State: {account.vettedState}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CompanyInfo;
