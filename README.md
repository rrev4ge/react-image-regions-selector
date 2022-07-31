# REGIONS SELECTOR COMPONENT

## <a href="https://rrev4ge.github.io/react-image-regions-selector" target="_blank">DEMO on GitHub Pages</a>

![demo_screenshot](./react-image-regions-selector-(demo).png)

### Call Preview
```jsx
<RegionSelector
  src={uploadImg} // string (url or data)
  inProportions // optional - Default: false (pixels or proportions)
  regions={[{x:10, y:10, width: 20, height:20}, {x:50, y:50, width: 30, height:25}]} // optional Default: []
  width={windowDimensions.width < 720 ? 300 : 500}
  maxRegionListLenght={9} // optional - Default: 1000
  cropConfig={{
    hasDeleteButton: true,
    hasContent: true,
  }} // optional
  onRegionChange={(regions) => {
    setRegions(regions);
  }} // optional
/>
```
### TERMS OF REFERENCE FOR THE COMPONENT FOR SELECTING REGIONS FROM <a href="https://gist.github.com/mjr27/477972795a0e8c08e2d45dd9771e8c78" target="_blank">Cyril mjr27</a>:

### Examples

I have not seen components with such functionality (logically, otherwise I would
there was no such task). The closest thing I've found:
* https://github.com/DominicTobias/react-image-crop#readme
* https://fengyuanchen.github.io/cropperjs/


### Task:

Develop a component to select/modify multiple rectangular regions in a region.

Necessary functionality:

* create a new region:
  * The left button is pressed outside the existing region
  * Mouse moves. in this case, the dotted line draws a rectangle,
    corresponding to future boundaries. If the pointer is out of bounds
    component, the region is limited by the boundaries of the component (the region cannot
    be larger than the originally specified size)
  * if the user presses the right button without releasing the left button
    or escape, the operation is canceled
  * When the user releases the left button, a region is created with angles in the start
    and endpoint
* Move region:
  * The left button is pressed inside the existing region
  * Mouse moves. in this case, the region follows the mouse. The region cannot leave
  Component boundaries.
  * if the right button is pressed at this moment, the operation is canceled.
  * The left button is released. The region will finally move to a new place.
* Resize
  * the left button is pressed within the "squares" in the corners of the region or in the middles
    its parties
  * mouse moves, while changing the size of the region. The region cannot go beyond the limits
    component
  * if the right button is pressed, the operation is canceled
  * The left button is released. The size of the region is finally changing
* Delete Region -- Right-click within the region.
