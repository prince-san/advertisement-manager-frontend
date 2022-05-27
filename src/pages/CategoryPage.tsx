import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../widgets/NavigationBar";
import { SideBar } from "../widgets/SideBar";

export function CategoryPage() {
    const params = useParams();

    const [result, setResult] = useState({
        id: 0,
        name: "",
        requestId: ""
    });
    React.useEffect(() => {
        axios.get(
            `categories/${params.categoryId}`
        ).then((response: {data: {
            id: number, name: string, requestId: string}}) => {
            setResult(response.data);
        })
    }, []);

    const [error, setError] = useState("");

    return (
        <div className="container">
            <NavigationBar currentPage="categories"/>
            <main className="main">
                <SideBar 
                    sideBarName="Categories"
                    searchName="category"
                    entityName="categories"/>
                <section className="content">
                    <header className="content__header">
                        <span className="content__header-text">{`${result.name} ID: ${result.id}`}</span>
                    </header>
                    <div className="content__body">
                        <div className="content__form">
                        <div className="content__form-item">
                                <div className="content__form-item-title">Name</div>
                                <div className="content__form-item-content">
                                    <input 
                                        className="content__input" 
                                        type="text" 
                                        value={`${result.name}`}
                                        onChange={e => setResult({...result, name: e.target.value})} />
                                </div>
                            </div>
                            <div className="content__form-item">
                                <div className="content__form-item-title">Request ID</div>
                                <div className="content__form-item-content">
                                    <input 
                                        className="content__input" 
                                        type="text" 
                                        value={`${result.requestId}`}
                                        onChange={e => setResult({...result, requestId: e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="content__footer">
                        <div className="content__buttons">
                            <button 
                                className="content__button content__button_dark"
                                onClick={() => {
                                    setError("");
                                    axios.put(
                                        `categories/`,
                                        result
                                    ).then(response =>
                                        console.log(response)
                                    ).catch(error => {
                                        setError(error.response.data);
                                    })
                                }}>Save</button>
                            <button 
                                className="content__button content__button_red"
                                onClick={() => {
                                    setError("");
                                    axios.delete(
                                        `categories/${result.id}`
                                    ).then(response =>
                                        console.log(response)
                                    ).catch(error => {
                                        setError(error.response.data);
                                    })
                                }}>Delete</button>
                        </div>
                    </footer>

                    {error && 
                        <div className="error">
                            <span className="error__text">{error}</span>
                        </div>  
                    }
                </section>
            </main>
        </div>
    );
}