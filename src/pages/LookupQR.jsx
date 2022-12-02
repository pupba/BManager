//image
import Back from "../image/back.png";
import qrse from "../image/qrsearch.png";

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const LookupQR = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const back = () => {
        navigate("/Main");
    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img
                        id={"title"}
                        alt={"qr조회"}
                        src={qrse}
                    >
                    </img>
                </li>
                <li>
                    <img
                        id={"back"}
                        alt={"뒤로가기"}
                        onClick={back}
                        src={Back}
                    >
                    </img>
                </li>
                <li>
                    <h2>{"비품 코드를 입력하면 QR이 변합니다!"}</h2>
                    <QRCode id="qr" value={code} size={"250"} />
                </li>
                <li>
                    {"비품 코드 --> "}<input
                        type={"text"}
                        placeholder={"비품코드를 입력해주세요"}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}>
                    </input>
                </li>
            </ul>
        </div>

    )
}
export default LookupQR;