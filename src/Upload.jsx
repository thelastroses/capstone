import { Link } from "react-router-dom";
import Dropzone from "./Dropzone.jsx";

const Upload = () =>
{

    return (
        <div className="upload background text" style={{  }}>
                <Link className="navigation-button" to="/">
                    Home
                </Link>        
            <Dropzone/>

            <div className='flex items-center justify-center '>
                <label>
                    <input type="radio" value="2D" name="2D"/>
                    <div className="pl-2 pr-10">
                        2D
                    </div>
                </label>
                <label>
                    <input type="radio" value="3D" name="3D"/>
                    <div className="pl-2 pr-10">
                        3D
                    </div>
                </label>
                <label>
                    <input type="radio" value="Both" name="Both"/>
                    <div className="pl-2">
                        Both
                    </div>
                </label>
            </div>
        </div>
    )
}

export default Upload