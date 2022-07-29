import React, { useState } from 'react';
// import 'react-image-regions-selector/dist/index.css';
import { AppLayout } from '../../layout';

const HomePage = () => {
  const [uploadImg, setUploadImg] = useState<any>();

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUploadImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent: 'space-evenly',
        flexDirection: 'column',
        gap: 25,
      }}
    >
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <div
        style={{
          padding: 8,
          position: 'relative',
        }}
      >
        {/* <RegionSelector src={uploadImg} /> */}
      </div>
    </div>
  );
};

export default HomePage;
