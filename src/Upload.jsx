import { Link } from "react-router-dom";
import Dropzone from "./Dropzone.jsx";


const Upload = () =>
{

    return (
        <div className="upload background text">
            <div className="navigation" >
                <Link className="navigation-button rounded-[20px]" to="/" style={{background:'#b6bfc1', color:'#111314'}}>
                    Home
                </Link>
            </div>

            <Dropzone/>
        </div>
    )
}

export default Upload