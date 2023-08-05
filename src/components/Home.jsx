import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => state.user.userinfo);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4>Home Content</h4>
              <h5>Welcome {username}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
