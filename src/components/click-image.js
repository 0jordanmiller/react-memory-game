import React from "react";
import { Image } from "semantic-ui-react";

const imageCard = propss => {
  return (
    <div>
      <Image
        className="image"
        key={propss.key}
        src={propss.imagesrc}
        onClick={propss.clickProp}
      />
    </div>
  );
};

export default imageCard;
