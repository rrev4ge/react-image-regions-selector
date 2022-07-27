import React, { useState } from 'react';
import { RegionSelector } from 'react-image-regions-selector';

const Home = () => {

  const [upImg, setUpImg] = useState();


  const onSelectFile = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.addEventListener('load', () => setUpImg(reader.result));
    reader.readAsDataURL(e.target.files[0]);
  }
  };

  return (
    <div
        style = {{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            alignContent: "space-evenly",
            flexDirection: "column",
            gap: 25,
        }}
    >
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
       <div
           style={{
             padding: 8,
             position: "relative",
            }}
       >
        <RegionSelector src={upImg}  />
      </div>
    </div>
  );
}

export default Home;
