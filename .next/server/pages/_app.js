"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9222:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SocketContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Token_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2095);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Token_context__WEBPACK_IMPORTED_MODULE_2__]);
_Token_context__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const SocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const SocketContextProvider = ({ children  })=>{
    const { token , adminSocket , activeUsersSocket , setConnections , setVisits , setTitle , setPresentationText , setQuestions , setCandidates , setCandidate ,  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Token_context__WEBPACK_IMPORTED_MODULE_2__/* .TokenContext */ .M);
    //handle active users socket
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            if (activeUsersSocket !== null) {
                try {
                    activeUsersSocket.on("connect", ()=>{
                        //get initial data
                        activeUsersSocket.on("connections", (msg)=>{
                            setConnections(msg);
                        });
                        activeUsersSocket.on("visits", (msg)=>{
                            setVisits(msg.totalVisits);
                        });
                        activeUsersSocket.on("title", (msg)=>{
                            setTitle(msg);
                        });
                        activeUsersSocket.on("presentationText", (msg)=>{
                            setPresentationText(msg);
                        });
                        activeUsersSocket.on("questions", (msg)=>{
                            setQuestions(msg);
                        });
                        activeUsersSocket.on("candidates", (msg)=>{
                            setCandidates(msg);
                        });
                        activeUsersSocket.on("candidate", (msg)=>{
                            setCandidate(msg);
                        });
                    });
                } catch (error) {}
            }
        } catch (error1) {}
    }, [
        activeUsersSocket
    ]);
    //handle admin socket
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            if (adminSocket !== null && token !== null && token !== undefined && token !== "") {
                try {
                    adminSocket.on("connect", ()=>{
                        //get initial data
                        adminSocket.on("title", (msg)=>{
                            setTitle(msg);
                        });
                        adminSocket.on("presentationText", (msg)=>{
                            setPresentationText(msg);
                        });
                        adminSocket.on("questions", (msg)=>{
                            setQuestions(msg);
                        });
                    });
                } catch (error) {}
            }
        } catch (error1) {}
    }, [
        adminSocket,
        token
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SocketContext.Provider, {
        value: {},
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketContextProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8510:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Animation_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3082);
/* harmony import */ var _context_Data_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2279);
/* harmony import */ var _context_Token_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2095);
/* harmony import */ var _context_Socket_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9222);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_Data_context__WEBPACK_IMPORTED_MODULE_2__, _context_Token_context__WEBPACK_IMPORTED_MODULE_3__, _context_Socket_context__WEBPACK_IMPORTED_MODULE_4__]);
([_context_Data_context__WEBPACK_IMPORTED_MODULE_2__, _context_Token_context__WEBPACK_IMPORTED_MODULE_3__, _context_Socket_context__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_Token_context__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_Socket_context__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_Data_context__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_Animation_context__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                })
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4612:
/***/ ((module) => {

module.exports = import("socket.io-client");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [95,954], () => (__webpack_exec__(8510)));
module.exports = __webpack_exports__;

})();