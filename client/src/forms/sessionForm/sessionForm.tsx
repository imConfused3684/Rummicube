import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import "./sessionForm.css";
import { NavLink } from "react-router-dom";

interface FlagProp{
    flag: boolean;
}

function MoveOrSack({flag}:FlagProp){
    function funcS() {}

    function funcNo() {}
    function funcOk() {}

    if(flag){
        return (
            <div className="sackWrapper">
                <InfoButton  text="S" func={funcS} />
            </div>
        )
    }
    else{
        return (
            <div className="move">
                <InfoButton text="No" func={funcNo} />
                <InfoButton text="Ok" func={funcOk} />
            </div>
        )
        
    }
}

export default function SessionForm() {
    function func777() {}
    function func789() {}

    return (
    <div className="card">

        <NavLink className="exitGameButtWrapper" to="/main">
            <RumButton text={"Выход"} func={() => {}} />    
        </NavLink>

        <div className="sortButts">
            <InfoButton text="789" func={func789} />
            <InfoButton text="777" func={func777} />
        </div>

        <MoveOrSack flag={false} />
    </div>
    );
}