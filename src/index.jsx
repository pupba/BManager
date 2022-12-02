import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// css
import "./css/index.css"
// pages
import Login from "./pages/Login";
import Main from "./pages/Main"
import EnrollEQ from "./pages/EnrollEq";
import MakeQR from "./pages/MakeQR";
import LookupQR from "./pages/LookupQR";
import Search from "./pages/Search";
import ProductSearch from "./pages/ProductSearch";
import Manager from "./pages/Manager";
function getLibrary(providers) {
    const library = new Web3Provider(providers, "any");
    return library;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/enroleq" element={<EnrollEQ />}></Route>
                <Route path="/makeqr" element={<MakeQR />}></Route>
                <Route path="/lookupqr" element={<LookupQR />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/pros" element={<ProductSearch />}></Route>
                <Route path="/man" element={<Manager />}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
