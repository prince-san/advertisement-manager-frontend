import axios from "axios";
import React from "react";



export function SideBarSearch(props: {
    placeholder: string, 
    entityName: string, 
    setResult: (arg: Array<{id: number, name: string, requestId: string}>) => void}) {
    const [input, setInput] = React.useState("");

    return (
        <div className="sidebar__search">
            <input 
                className="sidebar__search-input" 
                type="text" 
                placeholder={props.placeholder}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    axios.get(
                        `${props.entityName}/search?searchRequest=${e.target.value}`
                    ).then((response: {data: Array<{id: number, name: string, requestId: string}>}) => {
                        console.log(response);
                        props.setResult(response.data);
                    }).catch(error => {
                        console.log(error);
                    })
                }} />
            <span className="sidebar__search-icon"></span>
        </div>
    );
}