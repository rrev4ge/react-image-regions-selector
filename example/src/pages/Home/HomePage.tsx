import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { RegionSelector, TCoordinateType } from 'react-image-regions-selector';
import 'react-image-regions-selector/dist/index.css';
import { useWindowDimensions } from '../../hooks';

const HomePage = () => {
  const [uploadImg, setUploadImg] = useState<any>();
  const windowDimensions = useWindowDimensions();
  const [regions, setRegions] = useState<TCoordinateType[]>([
    {
      x: 0.0,
      y: 0.0,
      width: 0.99,
      height: 0.11,
      id: 'First Crop title',
    },
    {
      x: 0.0,
      y: 0.38,
      width: 1.0,
      height: 0.17,
      id: 'Second Crop title',
      content: 'Second Crop title',
    },
    {
      x: 0.0,
      y: 0.88,
      width: 1.0,
      height: 0.12,
      id: 'Third Crop title',
      content: 'Third Crop title',
    },
  ]);

  useEffect(() => {
    console.log({ regions });
  }, [regions]);

  // const onSelectFile = (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     console.log({ file: e.target.files[0] });
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => setUploadImg(reader.result));
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

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
      <Upload.Dragger
        style={{
          height: 90,
        }}
        name="files"
        accept="image/*"
        multiple={false}
        maxCount={1}
        onChange={({ file }) => {
          const reader = new FileReader();
          reader.onload = (_e) => setUploadImg(reader.result as string);
          reader.readAsDataURL(file.originFileObj!);
        }}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess && onSuccess('ok');
          }, 0);
        }}
      >
        <p
          className="ant-upload-drag-icon"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 5,
            alignItems: 'center',
            padding: '0 10px',
            marginBottom: 0,
          }}
        >
          <InboxOutlined />
          <span className="ant-upload-text">
            Click or drag Image to this area
          </span>
        </p>
      </Upload.Dragger>
      {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
      <div
        style={{
          padding: 8,
          position: 'relative',
        }}
      >
        <RegionSelector
          src={uploadImg}
          inProportions
          regions={regions}
          width={windowDimensions.width < 720 ? 300 : 500}
          maxRegionListLength={9}
          cropConfig={{
            hasDeleteButton: true,
            hasContent: true,
          }}
          onRegionChange={(regions) => {
            setRegions(regions);
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
