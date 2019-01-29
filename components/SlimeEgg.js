import React from 'react';

import { Svg } from 'expo';
const { Path, G, Circle } = Svg;

export default SlimeEgg = (props) => {
    //Color is a customizable prop
    const spotsColor = (props.spotsColor ? props.spotsColor : {
        red: 123,
        green: 198,
        blue: 123,
        transparency: 1
    });
    const eggshellColor = (props.eggshellColor ? props.eggshellColor : {
        red: 255,
        green: 255,
        blue: 250,
        transparency: 1
    });
    const eggshellOutline = (props.eggshellOutline ? props.eggshellOutline : {
        red: 0,
        green: 0,
        blue: 0,
        transparency: 1
    });

    //Defaults are provided for height/width/scale 
    const slimeEggHeight = (props.height ? props.height : 105);
    const slimeEggWidth = (props.height ? props.width : 100);
    const slimeEggScale = (props.scale ? props.scale : 0.80);
    const slimeEggTransformX = (props.transformX ? props.transformX : 0);
    const slimeEggTransformY = (props.transformY ? props.transformY : 0);
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
                    d="M111.5,77c0,26.601-21.564,48.166-48.166,48.166c-26.604,0-48.168-21.565-48.168-48.166    c0-26.603,21.564-75.5,48.168-75.5C89.936,1.5,111.5,50.397,111.5,77z"
                />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="M33.486,104.326c4.445,4.857,9.34,7.236,6.738,9.617c-2.604,2.381-8.316,0.371-12.762-4.486     c-4.443-4.858-5.936-10.727-3.332-13.109C26.732,93.969,29.043,99.465,33.486,104.326z" />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="M93.18,104.326c-4.445,4.857-9.34,7.236-6.738,9.617c2.604,2.381,8.316,0.371,12.762-4.486     c4.443-4.858,5.936-10.727,3.332-13.109C99.934,93.969,97.623,99.465,93.18,104.326z" />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="M91.623,89.47c-6.268,13.575-19.066,21.016-28.588,16.62c-9.521-4.396-5.098-12.389,1.17-25.965    c6.266-13.573,12.002-27.589,21.523-23.191C95.25,61.328,97.889,75.897,91.623,89.47z" />
                <Path
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    d="M85.729,56.934c-9.521-4.397-15.258,9.618-21.523,23.191c-0.297,0.641-0.586,1.265-0.871,1.88    v24.209c9.488,4.109,22.088-3.309,28.289-16.744C97.889,75.897,95.25,61.328,85.729,56.934z" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="35.636"
                    cy="38.547"
                    r="3.06" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="46.678" cy="23.91" r="1.197" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="40.426" cy="56.11" r="1.73" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="67.392" cy="113.216" r="1.73" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="59.251" cy="111.486" r="1.73" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="83.879" cy="29.977" r="3.537" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="93.913" cy="45.066" r="3.46" />
                <Circle
                    fill={`rgba(${spotsColor.red}, ${spotsColor.green},  ${spotsColor.blue}, ${spotsColor.transparency})`}
                    cx="44.668" cy="91.447" r="3.459" />
                </G>
                
        </Svg>
    );

}