import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { username } = useSelector((state) => state.user.userinfo);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4>About {username}</h4>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                illo, atque beatae soluta libero reiciendis quaerat omnis amet
                error ipsa adipisci. Minus ullam voluptatibus corrupti eveniet,
                eum harum inventore assumenda.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
