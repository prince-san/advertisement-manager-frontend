import axios from "axios";
import React from "react";
import "../style.css"
import { SideBarSearch } from "./SideBarSearch";

export function SideBar(props: {
    sideBarName: string, 
    searchName: string
    entityName: string}) {
    const [result, setResult] = React.useState(
        Array({"id" : 0, "name": "", "requestId": ""}));

    React.useEffect(() => {
        axios.get(
            `${props.entityName}/`
        ).then((response: {data: Array<{id: number, name: string, requestId: string}>}) => {
            setResult(response.data);
        })
    }, []);
    
    return (
    <aside className="sidebar">
        <header className="sidebar__header">{`${props.sideBarName}:`}</header>

        <section className="sidebar__content">
            <SideBarSearch 
                placeholder={`Enter ${props.searchName} name...`}
                entityName={props.entityName}
                setResult={(r: Array<{id: number, name: string, requestId: string}>) => setResult(r)}/>
            <div className="sidebar__menu">
                {result.map((e) => {return <a href={`/${props.entityName}/${e.id}`} className="sidebar__menu-item">{e.name}</a>})}
            </div>
        </section>

        <footer className="sidebar__footer">
            <a href={`/${props.entityName}`} className="sidebar__submit-button">{`Create new ${props.searchName}`}</a>
        </footer>
    </aside>
    );
}