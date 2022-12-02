//image
import seeq from "../image/searcheq.png";
import Back from "../image/back.png";
import TTS from "../image/tts.png";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { MyContract } from "../lib/mycontract";

const ProductSearch = () => {
    const location = useLocation();
    const CODE = location.state;
    const { account } = useWeb3React();
    const [equ, setEQ] = useState({
        code: CODE,
        pname: "",
        pstand: "",
        price: "",
        dates: "",
        manager: ''
    })
    const [managerName, setManName] = useState("");
    useEffect((state) => {
        MyContract.methods.eq_get(CODE).call()
            .then(async (data) => {
                await setEQ({
                    code: data.eq_code,
                    pname: data.eq_name,
                    pstand: data.eq_standard,
                    price: data.eq_price,
                    dates: data.eq_date,
                    manager: data.eq_manage,
                });
                await MyContract.methods.getInfo(equ.manager).call()
                    .then((data) => {
                        setManName(data.name);
                    })
            })
    }, [CODE, account, equ.manager])
    const navigate = useNavigate();
    const back = () => {
        navigate("/main");
    }
    const tts = () => {
        if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
            alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
            return;
        }
        window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화
        const speechMsg = new SpeechSynthesisUtterance();
        speechMsg.rate = 0.7 || 1; // 속도: 0.1 ~ 10      
        speechMsg.pitch = 1.2 || 1;// 음높이: 0 ~ 2
        speechMsg.lang = "ko-KR" || "ko-KR";
        speechMsg.text = "비품 코드 " + equ.code +
            "품명 " + equ.pname + "규격 "
            + equ.pstand + "취득단가 " + equ.price + "원"
            + "취득일자 " + equ.dates + "관리자 이름 " + managerName;
        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
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
                <li>
                    <img
                        id={"back"}
                        alt={"음성읽기"}
                        onClick={tts}
                        src={TTS}
                    >
                    </img>
                </li>
                <li>
                    <table id="eqTable" border={1}>
                        <tbody>
                            <tr>
                                <th>{"비품 코드"}</th>
                                <td>{equ.code}</td>
                            </tr>
                            <tr>
                                <th>{"품명"}</th>
                                <td>{equ.pname}</td>
                            </tr>
                            <tr>
                                <th>{"규격"}</th>
                                <td>{equ.pstand}</td>
                            </tr>
                            <tr>
                                <th>{"취득단가"}</th>
                                <td>{equ.price}</td>
                            </tr>
                            <tr>
                                <th>{"취득 일자"}</th>
                                <td>{equ.dates}</td>
                            </tr>
                            <tr>
                                <th>{"관리자 이름"}</th>
                                <td>{managerName}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>)
}
export default ProductSearch;