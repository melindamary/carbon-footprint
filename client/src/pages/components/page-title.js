import React from "react";
import './styles.css';

export const PageTitle = (props) => {
    return (
        <>
            <div className="page-head">
                    <h2>{props.name}</h2>
            </div>     
        </>
    );
}