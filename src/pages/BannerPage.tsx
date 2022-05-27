import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../widgets/NavigationBar";
import { SideBar } from "../widgets/SideBar";

export function BannerPage() {
    const params = useParams();

    const [result, setResult] = useState({
        id: 0,
        name: "",
        textField: "",
        price: "",
        categoryRequestIds: [""]
    });
    React.useEffect(() => {
        axios.get(
            `banners/${params.bannerId}`
        ).then((response: {data: {
            id: number, name: string, textField: string, price: string, categoryRequestIds: Array<string>}}) => {
            setResult(response.data);
        })
    }, []);

    const [categories, setCategories] = useState(
        [{id: 0, name: "", requestId: ""}]
    );
    React.useEffect(() => {
        axios.get(
            `categories/`
        ).then((response: {data: Array<{id: number, name: string, requestId: string}>}) => {
            setCategories(response.data);
        })
    }, []);

    const [error, setError] = useState("");

    return (
        <div className="container">
            <NavigationBar currentPage="banners"/>
            <main className="main">
                <SideBar 
                    sideBarName="Banners"
                    searchName="banner"
                    entityName="banners"/>
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
                                <div className="content__form-item-title">Price</div>
                                <div className="content__form-item-content">
                                    <input 
                                        className="content__input" 
                                        type="text" 
                                        value={`${result.price}`} 
                                        onChange={e => setResult({...result, price: e.target.value})}/>
                                </div>
                            </div>
                            <div className="content__form-item">
                                <div className="content__form-item-title">Category</div>
                                <div className="content__form-item-content">
                                    <select 
                                        className="content__select" 
                                        multiple
                                        onChange={e => {
                                            setResult({...result, categoryRequestIds: Array.from(e.target.selectedOptions).map(el => el.value)})
                                            }}>
                                        {categories.map(e => {
                                            return <option value={e.requestId} selected={result.categoryRequestIds.includes(e.requestId)}>{e.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="content__form-item">
                                <div className="content__form-item-title">Text</div>
                                <div className="content__form-item-content">
                                    <textarea className="content__textarea" value={result.textField} onChange={e => setResult({...result, textField: e.target.value})}/>
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
                                        `banners/`,
                                        result
                                    ).then(response =>
                                        console.log(response)
                                    ).catch(error => {
                                        setError(error.response.data);
                                    })
                                }}
                                >Save</button>
                            <button 
                                className="content__button content__button_red"
                                onClick={() => {
                                    setError("");
                                    axios.delete(
                                        `banners/${result.id}`
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