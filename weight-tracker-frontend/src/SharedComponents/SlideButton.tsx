import { useState } from "react";
import styleC from './SlideButton.module.css';

interface propsType {
    optionOne: string;
    optionTwo: string;
}

export default (props: propsType) => {
    const [selOption, setSelOption] = useState<string>(props.optionOne);
    const styles = getStyles(props);
    return(
        <input type='range' min='1' max='2' id=''/>
        // <div style={styles.container}>
        //     <div className={styleC.circle}></div>
        //     {/* {props.optionOne} */}
        // </div>
    );
};

function getStyles(props: propsType) {
    const styles: {[key: string]: any} = {};
    styles.slider = {

    }
    return styles;
}