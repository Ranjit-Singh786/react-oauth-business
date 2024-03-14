import React, { useState } from 'react';
import ReactStars from 'react-stars';

function Rating({count,ratingchange,size,activecolor,value}) {
  const [svalue, setSvalue] = useState(0)
  // Map the string value to corresponding number
  const valueMap = {
    "ONE": 1,
    "TWO": 2,
    "THREE": 3,
    "FOUR": 4,
    "FIVE": 5
  };

  // Set the initial state based on the provided value
  useState(() => {
    if (valueMap.hasOwnProperty(value)) {
      setSvalue(valueMap[value]);
    }
  }, [value]);


  return (
    <div>
      <ReactStars
        value = {svalue}
        count={count}
        onChange={ratingchange}
        size={size}
        activeColor={activecolor}
        edit={false}
      />
    </div>
  );
}

export default Rating;
