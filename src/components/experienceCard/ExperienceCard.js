import React, {useState, createRef} from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";

export default function ExperienceCard({cardInfo, isDark, onExpand, isExpanded, onCollapse, maxLen,showKnowMore,hideOnMobile}) {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({descBullets, isDark}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "sub-title dark-mode-text" : "sub-title"}
          >
            {item}
          </li>
        ))
      : null;
  };
  let newBullets = [];
  let bullets = cardInfo.descBullets;
  let isLongText = false;
  bullets.forEach((bullet) => {
    // add till total len < maxLen and remove extra characters
    if (newBullets.join(" ").length + bullet.length < maxLen) {
      newBullets.push(bullet);
    }
    else{
      isLongText = true;
    }
  });

  if(isLongText){
    newBullets[newBullets.length - 1] = newBullets[newBullets.length - 1]+"...";
  }

  return (
    <div 
      className={`${isDark?'experience-card-dark':'experience-card'} ${isExpanded?'expanded':''} ${hideOnMobile?'hidden':''}`} 
      onClick={() => {if(isExpanded) onCollapse(); else onExpand();}}
    >
      <div style={{background: rgb(colorArrays)}} className="experience-banner">
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <h5 className="experience-text-company">{cardInfo.company}</h5>
        </div>

        <img
          crossOrigin={"anonymous"}
          ref={imgRef}
          className="experience-roundedimg"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
          onLoad={() => getColorArrays()}
        />
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h5>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
        </p>
        <div className="desc-bullets">
          <ul>
            <GetDescBullets descBullets={newBullets} isDark={isDark} />
          </ul>
        </div>
      </div>
      {
        showKnowMore && <div className={isDark ? "know-more-dark" : "know-more"}>
        <a
          href={cardInfo.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Know more 
        </a>
      </div>
      }
      {
        isExpanded && <div className={isDark ? "close-dark" : "close"}>
        <a
          href={cardInfo.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Close
        </a>
      </div>
      }
    </div>
  );
}
