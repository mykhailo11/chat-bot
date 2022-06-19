import React from "react";
import styles from "./Cloud.module.css";

const Cloud = (props) => {
    const color = props.color;
    const textColor = props.textColor;
    const text = props.text;
    return (
        <div
            style={{
                backgroundColor: color,
                color: textColor
            }} 
            className={`${styles["cloud"]} ${props.className}`}
        >
            {text}
        </div>
    );
};

export default Cloud;