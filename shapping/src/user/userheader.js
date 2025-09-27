import { Link } from "react-router-dom";

const Userheader = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top p-3">

            <div className="container">

                <a class="navbar-brand text-white">
                    <i className="fa fa-shopping-bag fa-lg text-warning"></i> <b>Keep@Shopping</b>
                    </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/"><li className="fa fa-home"></li> Home</Link>
                        </li>

                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/cart"><li className="fa fa-shopping-cart"></li> My Cart</Link>
                        </li>

                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/login"><li className="fa fa-lock"></li> Seller Login</Link>
                        </li>

                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/register"><li className="fa fa-user-plus"></li> Seller Create Account</Link>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    )

}
export default Userheader;