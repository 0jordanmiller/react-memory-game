import React from 'react';
import { Image } from 'semantic-ui-react';


const imageCard = (props) => {
  return (
    <div>
      <Image className='image' key={props.key} src={props.imagesrc} onClick={props.clickProp} />
    </div>
  )
}



export default imageCard;