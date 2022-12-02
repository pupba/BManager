//image
import seeq from "../image/searcheq.png";
import Back from "../image/back.png";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import QRScanner from "react-webcam-qr-scanner";


const Search = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate("/main");
    }
    const handleScannerLoad = (mode) => {
        console.log("모드", mode);
    }
    const [code, setCode] = useState("");
    const handleDecode = (result) => {
        setCode(result.data);
    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img
                        id={"title"}
                        alt="비품 검색"
                        src={seeq}
                    >
                    </img>
                </li>
                <li>
                    <img
                        id={"back"}
                        alt="뒤로가기"
                        onClick={back}
                        src={Back}
                    >
                    </img>
                </li>
            </ul>
            <ul>
                <li>
                    <QRScanner
                        className="qrscan"
                        onDecode={handleDecode}
                        onScannerLoad={handleScannerLoad}
                        constraints={{
                            audio: false,
                            video: {
                                facingMode: "environment"
                            }
                        }}
                        captureSize={{ width: 300, height: 300 }}
                        style={{ width: "30em" }}
                    />
                </li>
                <li>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate("/pros", { state: code })
                        document.getElementById("code").value = "";
                    }
                    }>
                        <input
                            id="code"
                            value={code}
                            type={"text"}
                            placeholder={"QR코드 스캔 또는 비품 코드를 직접 입력해주세요!!"}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        >
                        </input>
                        <input
                            type={"submit"}
                            value={"검색"}>
                        </input>
                    </form>
                </li>
            </ul>
        </div >)
}
export default Search;