// image
import title from "../image/title.png";
import connect from "../image/connect.png";
import mLog from "../image/mLogin.png";
import log from "../image/login.png";
import help from "../image/help.png";


import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connectors";
import { isNoEthereumObject } from "../lib/errors";
import { MyContract } from "../lib/mycontract";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { account, active, activate, deactivate } = useWeb3React();
    const navigate = useNavigate();
    const handleConnect = () => {
        if (active) {
            deactivate();
            return;
        }
        activate(injected, (error) => {
            if (isNoEthereumObject(error))
                window.open("https://metamask.io/download.html");
        });
    };
    const login_u = () => {
        MyContract.methods.login_u(account).call({ from: account }).then((data) => {
            if (data === false) {
                alert("등록되지 않았습니다!");
                window.location.reload();
            }
            else {
                navigate("/main");
            }
        })
    }
    const login_m = () => {
        MyContract.methods.login_m(account).call({ from: account }).then((data) => {
            if (data === false) {
                alert("관리자가 아닙니다!");
                window.location.reload();
            }
            else {
                navigate("/man");
            }
        })
    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img id="title" alt="title" src={title}></img>
                </li>
                <li>
                    <img id="con" alt="지갑 연결"
                        onClick={handleConnect} src={connect}>
                    </img>
                </li>
                <li>
                    <h3 id="account_">{"연결된 지갑주소 : "}</h3>
                    <h3 id="account">{account}</h3>
                </li>
                <li>
                    <img id="login" alt="로그인"
                        onClick={login_u}
                        src={log}
                    >
                    </img>
                </li>
                <li>
                    <img id="manager_log" alt="관리자 로그인"
                        onClick={login_m}
                        src={mLog}
                    >
                    </img>
                </li>
                <li>
                    <Link to="/">
                        <img id="help" alt="도움말"
                            src={help}>
                        </img>
                    </Link>
                </li>
            </ul>
        </div>);
}
export default Login;