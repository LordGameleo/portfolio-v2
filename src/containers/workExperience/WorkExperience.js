import React, {useState,useContext,useEffect} from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const [expandIndex, setExpandIndex] = React.useState(-1);

  let isMobile = window.innerWidth < 768;
  
  if (workExperiences.display) {
    return (
      <div id="experience">
        <Fade bottom duration={1000} distance="20px">
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">Experiences</h1>
              <div className="experience-cards-div">
                {
                  expandIndex !== -1 && <ExperienceCard
                    key={expandIndex+"-focus"}
                    isDark={isDark}
                    onExpand={() => setExpandIndex(expandIndex)}
                    onCollapse={() => setExpandIndex(-1)}
                    maxLen={10000}
                    showKnowMore={false}
                    isExpanded={true}
                    hideOnMobile={true}
                    cardInfo={{
                      company: workExperiences.experience[expandIndex].company,
                      desc: workExperiences.experience[expandIndex].desc,
                      date: workExperiences.experience[expandIndex].date,
                      companylogo: workExperiences.experience[expandIndex].companylogo,
                      role: workExperiences.experience[expandIndex].role,
                      descBullets: workExperiences.experience[expandIndex].descBullets
                    }}
                  />
                }
                {workExperiences.experience.map((card, i) => {
                  return (
                    <ExperienceCard
                      key={i}
                      isDark={isDark}
                      onExpand={() => setExpandIndex(i)}
                      onCollapse={() => setExpandIndex(-1)}
                      maxLen={isMobile && expandIndex===i ?1000:200}
                      isExpanded={isMobile && expandIndex===i ?true:false}
                      showKnowMore={true}
                      cardInfo={{
                        company: card.company,
                        desc: card.desc,
                        date: card.date,
                        companylogo: card.companylogo,
                        role: card.role,
                        descBullets: card.descBullets
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}
