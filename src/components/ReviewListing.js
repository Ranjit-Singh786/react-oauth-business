import React, { useEffect, useState } from "react";
import Rating from "./Rating";

function ReviewListing({ accounts }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviewCount, settotalReviewCount] = useState(0);
  const [replyIndex, setReplyIndex] = useState(null); // Index of the review being replied to
  const [replyValue, setReplyValue] = useState(""); // Value of the reply
  const [bearerToken, setBearerToken] = useState(""); // Value of the reply

  useEffect(() => {
    setBearerToken(localStorage.getItem("accessToken") || "")
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!accounts || accounts.length === 0) return;
  
        const accountId = accounts[0].name.split("/")[1];
        const locationResponse = await fetch(
          `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?read_mask=name,languageCode,storeCode,title`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        if (!locationResponse.ok) {
          throw new Error("Failed to fetch locations");
        }
        const locationData = await locationResponse.json();
        const locationId = locationData.locations[0].name.split("/")[1];
        setLocationId(locationId);
  
        const reviewsResponse = await fetch(
          `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData?.reviews);
        setAverageRating(reviewsData?.averageRating);
        setNextPageToken(reviewsData?.nextPageToken);
        settotalReviewCount(reviewsData?.totalReviewCount)
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    if (accounts && accounts.length > 0 && bearerToken) {
      fetchReviews();
    }
  }, [bearerToken, accounts]);

 

  const handleLoadMore = async () => {
    try {
      if (!locationId || !nextPageToken) return;

      const accountId = accounts[0].name.split("/")[1];
      const reviewsResponse = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageToken=${nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!reviewsResponse.ok) {
        throw new Error("Failed to fetch more reviews");
      }

      const reviewsData = await reviewsResponse.json();
      const updatedReviews = [...reviews, ...reviewsData?.reviews];

      setReviews(updatedReviews);
      setNextPageToken(reviewsData?.nextPageToken);
    } catch (error) {
      console.error("Error fetching more reviews:", error);
    }
  };

  const handleReplyClick = (index) => {
    setReplyIndex(index);
  };

  const handleReplyChange = (event) => {
    setReplyValue(event.target.value);
  };

  const handleReplySubmit = () => {
    // Implement your reply submission logic here
    setReplyIndex(null); // Close reply section after submission
    setReplyValue(""); // Clear reply input
  };

  const renderProgressBar = (starRating) => {
    const percentage = (starRating / 5) * 100;
    return (
      <>
        <h3>Review summary</h3>
      <div className="d-flex align-items-center">
        <div className="progress col-6">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={starRating}
            aria-valuemin="0"
            aria-valuemax="5"
          ></div>
        </div>
        <div className="rating-cus">{averageRating.toFixed(1)}</div>
      </div>
      </>
    );
  };

  return (
    <>
      <h1 className="center_cs col-6">Reviews {accounts[0]?.accountName}</h1>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div>
            <div>{renderProgressBar(averageRating)}</div>
          </div>
          {reviews?.map((value, index) => (
            <div key={value?.reviewId || index} className="card  text-start col-6 ">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">{value?.reviewer?.displayName}</h5>
                <Rating
                  className="rating-center"
                  count={5}
                  size={24}
                  value={value?.starRating}
                />
                <small className="text-muted">Created at: {new Date(value?.createTime).toLocaleString()}</small>
              </div>
              <div className="card-body">
                <p className="card-text">{value?.comment}</p>
                {replyIndex === index && (
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your reply here..."
                      value={replyValue}
                      onChange={handleReplyChange}
                    ></textarea>
                    <button className="btn btn-primary mt-2" onClick={handleReplySubmit}>
                      Submit Reply
                    </button>
                  </div>
                )}
               {replyIndex !==index &&( <button className="btn btn-link" onClick={() => handleReplyClick(index)}>Reply</button>)}
              </div>
              {value.reviewReply && (
                <div className="card-footer">
                  <h6>Response:</h6>
                  <p>{value.reviewReply.comment}</p>
                </div>
              )}
            </div>
          ))}

          {totalReviewCount!==reviews?.length &&(
          <div className="row col-6 justify-content-center">
            <div className="col-auto">
              <button onClick={handleLoadMore} className="btn btn-primary mt-3">
                Load More...
              </button>
            </div>
          </div>)}
        </>
      )}
    </>
  );
}

export default ReviewListing;
