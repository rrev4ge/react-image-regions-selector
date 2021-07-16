import React, { useCallback, useEffect, useRef, useState } from 'react';
import RegionSelector from '../../components/RegionSelector/RegionSelector';

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
    <div style = {{
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translate(-50%, -10%)', 
      display: 'flex',
      flexFlow: 'column', 
      alignItems: 'center',
      justifyAlign: 'center',
      justifyContent: 'space-evenly',
      height: '100vh',
    }}>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <RegionSelector src={upImg}  />
      <div>
      </div>
    </div>
  );
}

export default Home;