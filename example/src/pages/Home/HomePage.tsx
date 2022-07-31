import React, { useState } from 'react';
import { RegionSelector } from 'react-image-regions-selector';
import 'react-image-regions-selector/dist/index.css';
import { useWindowDimensions } from '../../hooks';

const HomePage = () => {
  const [uploadImg, setUploadImg] = useState<any>();
  const windowDimensions = useWindowDimensions();

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
        <RegionSelector
          src={uploadImg}
          inProportions
          completedCrops={[
            {
              height: '0.25',
              id: 'cb9011dc-a3ef-466d-aa2e-c765727b276d',
              width: '0.33',
              x: '0.17',
              y: '0.14',
              content: 'sadfgfdsgfdshgdfsgsfdgsfsdddddddddddddddddddddddddddddddddddddddddddddddd',
            },
          ]}
          width={windowDimensions.width < 500 ? 280 : 400}
          maxCrops={2}
          cropConfig={{
            hasDeleteButton: true,
            hasContent: true,
          }}
          giveCompletedCrops={(crops) => {
            console.log({ crops });
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
