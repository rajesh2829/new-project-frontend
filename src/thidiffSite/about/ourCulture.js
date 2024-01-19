import React from "react";
import Heading4 from "../../components/static/header/heading4";

function OurCulture() {
  return (
    <div>
      <div className="container">
        <Heading4
          className="font-weight-bold text-center "
          heading="Our Culture"
          style={{ color: "#224a8b" }}
        />
        <Heading4
          className="font-weight-bold text-center"
          heading="Learn, Implement, Grow and have Fun"
          style={{ color: "#dd776a" }}
        />
        <paragraphContentSection
          paragraphclass="text-center"
          paragraph="ThiDiff culture is to learn and grow. Organizational success is largely dependent on how 
          fast and in what way its people connect with each other for mutual benefit.
           ThiDiff encourages Corporate team building, fun-filled activities, games, birthday celebrations in order to create a stronger bond and spirit of co-operation & motivation at work."
          subpharagraphclass="text-center"
          Subpharagraph="ThiDiff believes and encourages the employees on Self-directed learning of latest technologies. This approach increases the motivation of employees to learn from various 
          online resources, since they are the makers of their own knowledge, they experience a sense of 
          independence while learning. This process keeps them engaged, since they have to acquire 
          knowledge on their own, and apply it along with their skills to find solutions to their 
          problems, evolve their learning and be encouraged for lifelong learning."
        />
      </div>
    </div>
  );
}

export default OurCulture;
