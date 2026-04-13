import React from "react";
import "./Landing.scss";
import Button from "@/components/ui/Button";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-bg">
        <img src="public/images/Landingbg.png" alt="background" />
      </div>
      <div className="inner">
        <div className="t-wrap">
          <h2>
            <img src="/images/logo.svg" alt="logo" />
           
            <NavLink to="/login" className="btn-link">
              <Button text="시작하기" className="intro" />
            </NavLink>
          </h2>
          <p>여행한 모든 지역을 기록 하고 저장 하세요.</p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
