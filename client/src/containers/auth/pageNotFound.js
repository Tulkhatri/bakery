import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <h1>Page Not Found </h1>
            <Link to='/'>
                <button>Back to home</button>
            </Link>
        </>
    );
}
export default PageNotFound;