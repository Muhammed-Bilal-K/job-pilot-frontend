import React from "react";
import "./success.css";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <>
      <div className="screen-top-part">
        <div className="border-top"></div>
        <svg width="166" height="150" id="topIcon">
          <g id="Shot" fill="none" fill-rule="evenodd">
            <g id="shot2" transform="translate(-135 -157)">
              <g id="success-card" transform="translate(48 120)">
                <g id="Top-Icon" transform="translate(99.9 47.7)">
                  <g id="Bubbles" fill="#5AE9BA">
                    <g id="bottom-bubbles" transform="translate(0 76)">
                      <ellipse
                        id="Oval-Copy-3"
                        cx="12.8571429"
                        cy="13.2605405"
                        rx="12.8571429"
                        ry="12.8432432"
                      />
                      <ellipse
                        id="Oval-Copy-4"
                        cx="25.0714286"
                        cy="34.4518919"
                        rx="8.35714286"
                        ry="8.34810811"
                      />
                      <ellipse
                        id="Oval-Copy-6"
                        cx="42.4285714"
                        cy="31.2410811"
                        rx="7.71428571"
                        ry="7.70594595"
                      />
                    </g>
                    <g id="top-bubbles" transform="translate(92)">
                      <ellipse
                        id="Oval"
                        cx="13.4285714"
                        cy="23.76"
                        rx="12.8571429"
                        ry="12.8432432"
                      />
                      <ellipse
                        id="Oval-Copy"
                        cx="37.8571429"
                        cy="25.0443243"
                        rx="5.14285714"
                        ry="5.1372973"
                      />
                      <ellipse
                        id="Oval-Copy-2"
                        cx="30.1428571"
                        cy="7.70594595"
                        rx="7.71428571"
                        ry="7.70594595"
                      />
                    </g>
                  </g>
                  <g id="Circle" transform="translate(18.9 11.7)">
                    <ellipse
                      id="blue-color"
                      cx="56.341267"
                      cy="54.0791109"
                      fill="#5AE9BA"
                      rx="51.2193336"
                      ry="51.5039151"
                    />
                    <ellipse
                      id="border"
                      cx="51.2283287"
                      cy="51.5039151"
                      stroke="#3C474D"
                      stroke-width="5"
                      rx="51.2193336"
                      ry="51.5039151"
                    />
                    <path
                      id="success"
                      fill="#FFF"
                      fillRule="nonzero"
                      d="M50.511,4.25c-24.385,0-44.25,19.865-44.25,44.25s19.865,44.25,44.25,44.25s44.25-19.865,44.25-44.25 S74.896,4.25,50.511,4.25z M37.386,65.068L20.5,48.183l4.186-4.186l12.7,12.7l22.371-22.371l4.186,4.186L37.386,65.068z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>

        <h3>SUCCESS!</h3>
        <p>You have successfully purchased.</p>
        <Link to="/employer/emplo-dash">
          <p className="text-black mt-5">Home</p>
        </Link>
      </div>
    </>
  );
};

export default Success;
