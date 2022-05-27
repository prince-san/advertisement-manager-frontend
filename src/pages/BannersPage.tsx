import { NavigationBar } from "../widgets/NavigationBar";
import "../style.css"
import { SideBar } from "../widgets/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";

export function BannersPage() {
    const [result, setResult] = useState({
        name: "",
        textField: "",
        price: "",
        categoryRequestIds: [""]
    });

    const [categories, setCategories] = useState(
        [{id: 0, name: "", requestId: ""}]
    );
    useEffect(() => {
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
                            <span className="content__header-text">Create new banner</span>
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
                                    axios.post(
                                        `banners/`,
                                        result
                                    ).then(response =>
                                        console.log(response)
                                    ).catch(error =>
                                        setError(error.response.data)   
                                    );}
                                }
                                >Save</button>
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