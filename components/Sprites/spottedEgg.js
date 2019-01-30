import React from 'react';
import { Svg } from 'expo';
const { Path, G, Circle } = Svg;

export default SpottedEgg = (props) => {
    const spotsColor = props.spotsColor;
    const eggshellColor = props.eggshellColor;
    const eggshellOutline = props.eggshellOutline;

    const slimeEggHeight = props.height;
    const slimeEggWidth = props.width;
    const slimeEggScale = props.scale;
    const slimeEggTransformX = props.transformX;
    const slimeEggTransformY = props.transformY;

    return (
        <Svg
            height={slimeEggHeight}
            width={slimeEggWidth}
        >
            <G
                transform={`translate(${slimeEggTransformX},${slimeEggTransformY})`}
                scale={slimeEggScale}>
                <Path
                    fill={`rgba(${eggshellColor.red}, ${eggshellColor.green},  ${eggshellColor.blue}, ${eggshellColor.transparency})`}
                    stroke={`rgba(${eggshellOutline.red}, ${eggshellOutline.green},  ${eggshellOutline.blue}, ${eggshellOutline.transparency})`}
                    strokeMiterLimit="4"
                    d="m 97.834,77 c 0,26.601 -21.564,48.166 -48.166,48.166 C 23.064,125.166 1.5,103.601 1.5,77 1.5,50.397 23.064,1.4999997 49.668,1.4999997 76.27,1.4999997 97.834,50.397 97.834,77 Z"
                />
                <Path
                    fill={`rgba(${eggshellColor.red}, ${eggshellColor.green},  ${eggshellColor.blue}, ${eggshellColor.transparency})`}
                    d="M 49.668,1.4999997 V 125.166 C 76.27,125.166 97.834,103.601 97.834,77 97.834,50.397 76.27,1.4999997 49.668,1.4999997 Z"
                />
                <Path
                    d="m 19.82,104.326 c 4.445,4.857 9.34,7.236 6.738,9.617 -2.604,2.381 -8.316,0.371 -12.762,-4.486 C 9.353,104.599 7.86,98.73 10.464,96.348 c 2.602,-2.379 4.913,3.117 9.356,7.978 z"
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                />
                <Path
                    d="m 79.514,104.326 c -4.445,4.857 -9.34,7.236 -6.738,9.617 2.604,2.381 8.316,0.371 12.762,-4.486 4.443,-4.858 5.936,-10.727 3.332,-13.109 -2.602,-2.379 -4.913,3.117 -9.356,7.978 z"
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`} />
                <Path
                    fill={`rgba(${eggshellOutline.red}, ${eggshellOutline.green},  ${eggshellOutline.blue}, ${eggshellOutline.transparency})`}
                    d="M 49.668,126.666 C 22.281,126.666 0,104.386 0,77 0,63.058 5.612,44.036 14.299,28.54 24.616,10.136 37.177,-2.9786364e-7 49.668,-2.9786364e-7 62.158,-2.9786364e-7 74.719,10.136 85.035,28.54 93.722,44.036 99.334,63.058 99.334,77 c 0,27.386 -22.28,49.666 -49.666,49.666 z m 0,-123.6660003 C 34.344,2.9999997 22.57,19.921 16.916,30.007 8.462,45.088 3,63.534 3,77 c 0,25.732 20.936,46.666 46.668,46.666 25.731,0 46.666,-20.934 46.666,-46.666 0,-13.466 -5.462,-31.912 -13.916,-46.993 C 76.765,19.921 64.991,2.9999997 49.668,2.9999997 Z"
                />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="m 77.957,89.47 c -6.268,13.575 -19.066,21.016 -28.588,16.62 -9.521,-4.396 -5.098,-12.389 1.17,-25.965 6.266,-13.573 12.002,-27.589 21.523,-23.191 9.522,4.394 12.161,18.963 5.895,32.536 z"
                />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="m 72.063,56.934 c -9.521,-4.397 -15.258,9.618 -21.523,23.191 -0.297,0.641 -0.586,1.265 -0.871,1.88 v 24.209 c 9.488,4.109 22.088,-3.309 28.289,-16.744 6.265,-13.573 3.626,-28.142 -5.895,-32.536 z"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="21.970001"
                    cy="38.547001"
                    r="3.0599999"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="33.012001"
                    cy="23.91"
                    r="1.197"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="26.759998"
                    cy="56.110001"
                    r="1.73"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="53.725998"
                    cy="113.216"
                    r="1.73"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="45.584999"
                    cy="111.486"
                    r="1.73"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="70.212997"
                    cy="29.976999"
                    r="3.5369999"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="80.247002"
                    cy="45.066002"
                    r="3.46"
                />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="31.001999"
                    cy="91.446999"
                    r="3.4590001"
                />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="m 53.393,40.692 c 0,8.108 3.498,14.682 -4.611,14.682 -8.109,0 -14.682,-6.573 -14.682,-14.682 0,-8.109 6.572,-14.685 14.682,-14.685 8.109,10e-4 4.611,6.577 4.611,14.685 z"
                />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="m 49.668,55.341 c 6.951,-0.482 3.725,-6.854 3.725,-14.648 0,-7.794 3.227,-14.169 -3.725,-14.651 z"
                />
              
            </G>
        </Svg>
    );


}