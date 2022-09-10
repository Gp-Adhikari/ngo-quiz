"use strict";
exports.id = 95;
exports.ids = [95];
exports.modules = {

/***/ 6052:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Loading = ({ loading  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: loading === true ? "loading show-loading" : "loading hide-loading",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "centered",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "blob-1"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "blob-2"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


/***/ }),

/***/ 2095:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ TokenContext),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6052);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4612);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_3__]);
socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const TokenContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const TokenContextProvider = ({ children  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: token , 1: setToken  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: activeUsersSocket , 1: setActiveUsersSocket  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: adminSocket , 1: setAdminSocket  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: connections , 1: setConnections  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: visits , 1: setVisits  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: title , 1: setTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: presentationText , 1: setPresentationText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: questions , 1: setQuestions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: candidate , 1: setCandidate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: candidates , 1: setCandidates  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: language , 1: setLanguage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("en");
    //get token every 12 minutes
    const MINUTE_MS = 1000 * 60 * 8;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            if (token !== "" || token !== undefined || token !== null) {
                const interval = setInterval(()=>{
                    fetch("/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    }).then((res)=>res.json()).then((data)=>{
                        if (data.status === true) {
                            setToken(data.token);
                        } else {
                            setToken("");
                        }
                    });
                }, MINUTE_MS);
                return ()=>clearInterval(interval);
            }
        } catch (error) {}
    }, [
        token
    ]);
    //connect to socket
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setActiveUsersSocket(socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"].connect("/activeUsers", {
            transports: [
                "websocket"
            ]
        }));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            setAdminSocket(socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"].connect("/connect", {
                transports: [
                    "websocket"
                ],
                auth: {
                    token: `Bearer ${token}`
                }
            }));
        } catch (error) {}
    }, [
        token
    ]);
    //get token if refresh token exists in cookie
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            setLoading(true);
            fetch("/token", {
                method: "POST",
                credentials: "include"
            }).then((res)=>res.json()).then((data)=>{
                if (data.status === true) {
                    setToken(data.token);
                    setAdminSocket(socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"].connect("/connect", {
                        transports: [
                            "websocket"
                        ],
                        auth: {
                            token: `Bearer ${data.token}`
                        }
                    }));
                } else {
                    setToken(null);
                }
            });
        } catch (error) {}
    }, [
        setToken
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(TokenContext.Provider, {
        value: {
            token,
            setToken,
            loading,
            setLoading,
            visits,
            setVisits,
            adminSocket,
            connections,
            setConnections,
            setAdminSocket,
            activeUsersSocket,
            setActiveUsersSocket,
            title,
            setTitle,
            language,
            setLanguage,
            presentationText,
            setPresentationText,
            questions,
            setQuestions,
            candidates,
            setCandidates,
            candidate,
            setCandidate
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading_component__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                loading: loading
            }),
            children
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TokenContextProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;