import React from "react";

export const EndMessage = ({ hasMore }) => {
  return !hasMore ? (
    <p style={{ textAlign: "center", color: "white" }}>
      No more tweets to show!
    </p>
  ) : null;
};
