import React from 'react';
import basicEgg from './Sprites/spottedEgg';
import CrackedEgg from './Sprites/spottedEggIncubatorCracked';
import IncubatingEgg from './Sprites/spottedEggIncubating';
import SpottedEgg from './Sprites/spottedEgg';

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
    const slimeEggHeight = (props.height ? props.height : 128);
    const slimeEggWidth = (props.height ? props.width : 100);
    const slimeEggScale = (props.scale ? props.scale : 1);
    const slimeEggTransformX = (props.transformX ? props.transformX : 0);
    const slimeEggTransformY = (props.transformY ? props.transformY : 0);

    if (props.lifeStage === "incubating") {
       return <IncubatingEgg
            spotsColor={spotsColor}
            eggshellColor={eggshellColor}
            eggshellOutline={eggshellOutline}
            height={slimeEggHeight}
            width={slimeEggWidth}
            scale={slimeEggScale}
            transformX={Math.floor(slimeEggWidth * 0.14)}
            transformY={slimeEggTransformY} />
    }

    else if (props.lifeStage === "readyToHatch") {
        return <CrackedEgg
            spotsColor={spotsColor}
            eggshellColor={eggshellColor}
            eggshellOutline={eggshellOutline}
            height={slimeEggHeight}
            width={slimeEggWidth}
            scale={slimeEggScale}
            transformX={Math.floor(slimeEggWidth * 0.14)}
            transformY={slimeEggTransformY} />
    }

    return <SpottedEgg
        spotsColor={spotsColor}
        eggshellColor={eggshellColor}
        eggshellOutline={eggshellOutline}
        height={slimeEggHeight}
        width={slimeEggWidth}
        scale={slimeEggScale}
        transformX={slimeEggTransformX}
        transformY={slimeEggTransformY} />
}