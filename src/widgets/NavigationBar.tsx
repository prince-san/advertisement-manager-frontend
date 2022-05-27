import '../style.css';

export function NavigationBar(props: {currentPage: string}) {
    return (
        <header className="header">
            <nav className="header__nav">
                <a href="../banners" className={props.currentPage === "banners" ? "header__link header__link_active" : "header__link"}>Banners</a>
                <a href="../categories" className={props.currentPage === "categories" ? "header__link header__link_active" : "header__link"}>Categories</a>
            </nav>
        </header>
    );
}