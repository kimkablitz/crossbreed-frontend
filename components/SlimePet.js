import React from 'react';

import { Svg } from 'expo';
const { Path, G } = Svg;

export default SlimePet = (props) => {
  //We are REQUIRED to provide color, otherwise it breaks
  const outlineColor = props.outlineColor;
  const { red, blue, green, transparency } = props.baseColor;

  //Defaults are provided for height/width/scale 
  const slimeHeight = (props.height ? props.height : 100);
  const slimeWidth = (props.height ? props.width : 100);
  const slimeScale = (props.scale ? props.scale : 0.80);
  const slimeTransformX = (props.transformX ? props.transformX : -40);
  const slimeTransformY = (props.transformY ? props.transformY : 5);
  return (
    <Svg
      height={slimeHeight}
      width={slimeWidth}
    >
      <G
        transform={`translate(${slimeTransformX},${slimeTransformY})`}
        scale={slimeScale}
      >
        <Path
          fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
          strokeWidth="2"
          stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
          strokeMiterLimit="4"
          d="m 101.29761,114.66882 c 30.19696,0 58.2993,-6.30453 58.2993,-39.935556 0,-43.631446 -30.32098,-64.092558 -58.2993,-64.092558 -27.978306,0 -58.299281,20.461112 -58.299281,64.093939 0,33.629645 28.102335,39.934175 58.299281,39.934175 z m 0,0" />
        <Path
          fill="#fd99c7"
          d="m 131.39751,79.408167 h -7.03902 c -1.46072,0 -2.64583,-1.183735 -2.64583,-2.645833 0,-1.460722 1.18511,-2.645833 2.64583,-2.645833 h 7.03902 c 1.46072,0 2.64583,1.185111 2.64583,2.645833 0,1.462098 -1.18511,2.645833 -2.64583,2.645833 z m 0,0" />
        <Path
          fill="#fd99c7"
          d="m 78.243817,79.408167 h -7.039018 c -1.460722,0 -2.645834,-1.183735 -2.645834,-2.645833 0,-1.460722 1.185112,-2.645833 2.645834,-2.645833 h 7.039018 c 1.460719,0 2.645833,1.185111 2.645833,2.645833 0,1.462098 -1.185114,2.645833 -2.645833,2.645833 z m 0,0" />
        <Path
          fill={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
          stroke='rgba(0,0,0,1)'
          d="m 127.89867,71.812419 c 1.46072,0 2.64584,-1.183735 2.64584,-2.645833 v -5.166265 c 0,-1.462101 -1.18512,-2.645833 -2.64584,-2.645833 -1.46072,0 -2.64583,1.183732 -2.64583,2.645833 v 5.166265 c 0,1.462098 1.18511,2.645833 2.64583,2.645833 z m 0,0" />
        <Path
          fill={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
          stroke='rgba(0,0,0,1)'
          d="m 74.744977,71.812419 c 1.460722,0 2.645834,-1.183735 2.645834,-2.645833 v -5.166265 c 0,-1.462101 -1.185112,-2.645833 -2.645834,-2.645833 -1.462098,0 -2.645833,1.183732 -2.645833,2.645833 v 5.166265 c 0,1.462098 1.183735,2.645833 2.645833,2.645833 z m 0,0" />
        <Path
          fill={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
          stroke='rgba(0,0,0,1)'
          d="m 101.32183,79.117401 c 2.61551,0 5.07531,-1.09692 6.7455,-3.00826 0.96186,-1.099672 0.85025,-2.771232 -0.25081,-3.733106 -1.09967,-0.961869 -2.77123,-0.848871 -3.7331,0.250806 -0.6656,0.762056 -1.67294,1.198893 -2.76159,1.198893 -1.08866,0 -2.096002,-0.436837 -2.761596,-1.198893 -0.961869,-1.099677 -2.633429,-1.212675 -3.733104,-0.250806 -1.101053,0.961874 -1.212675,2.633434 -0.250804,3.733106 1.670183,1.91134 4.128604,3.00826 6.745504,3.00826 z m 0,0" />
      </G>
    </Svg>
  );

}