//image
import title from "../image/eqenrollQR.png";
import Back from "../image/back.png";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
const MakeQR = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const back = () => {
        navigate("/Main");
    }
    return (
        <div id="container">
            <li>
                <img
                    id={"title"}
                    alt="title"
                    src={title}
                >
                </img>
            </li>
            <ul>
                <li>
                    <img
                        id={"back"}
                        alt={"뒤로가기"}
                        onClick={back}
                        src={Back}
                    ></img>
                </li>
            </ul>
            <ul>
                <li>
                    <table border={1} id={"eqTable"}>
                        <caption>{"비품 데이터 내용"}</caption>
                        <tbody>
                            <tr>
                                <th>{"비품 코드"}</th>
                                <td>{data.code}</td>
                            </tr>
                            <tr>
                                <th>{"품명"}</th>
                                <td>{data.pname}</td>
                            </tr>
                            <tr>
                                <th>{"규격"}</th>
                                <td>{data.pstand}</td>
                            </tr>
                            <tr>
                                <th>{"취득 단가"}</th>
                                <td>{data.price}</td>
                            </tr>
                            <tr>
                                <th>{"취득 일자"}</th>
                                <td>{data.dates}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
                <li>
                    <QRCode
                        id="qr"
                        className="QRc"
                        value={data.code}
                        size={"250"} />
                    <br></br>
                    {"비품 코드 : "
                    }<input readOnly value={data.code}>
                    </input>
                </li>
            </ul>
        </div >
    )
}
export default MakeQR;