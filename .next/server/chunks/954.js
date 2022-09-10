"use strict";
exports.id = 954;
exports.ids = [954];
exports.modules = {

/***/ 3082:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "s": () => (/* binding */ AnimationContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const AnimationContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const AnimationContextProvider = ({ children  })=>{
    const headerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: initialAnimationHandler , 1: setInitialAnimationHandler  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AnimationContext.Provider, {
        value: {
            initialAnimationHandler,
            setInitialAnimationHandler,
            headerRef
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnimationContextProvider);


/***/ }),

/***/ 2279:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ DataContext),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Token_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2095);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Token_context__WEBPACK_IMPORTED_MODULE_2__]);
_Token_context__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const DataContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const DataContextProvider = ({ children  })=>{
    const { activeUsersSocket , questions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Token_context__WEBPACK_IMPORTED_MODULE_2__/* .TokenContext */ .M);
    const { 0: candidateName , 1: setCandidateName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: selectedAnswers , 1: setSelectedAnswers  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: percentagePerQuestion , 1: setPercentagePerQuestion  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: percentage , 1: setPercentage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: qualityText , 1: setQualityText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            for(let i = 0; i < selectedAnswers.length; i++){
                const answer = selectedAnswers[i];
                setPercentagePerQuestion([
                    ...percentagePerQuestion,
                    answer.points
                ]);
            }
        } catch (error) {}
    }, [
        selectedAnswers,
        setPercentagePerQuestion
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            //calculate points
            for(let i = 0; i < percentagePerQuestion.length; i++){
                const percentOfThisQuestion = percentagePerQuestion[i];
                const prevPercentage = percentagePerQuestion[i - 1];
                const total = prevPercentage === undefined ? percentOfThisQuestion : prevPercentage + percentOfThisQuestion;
                if (total < 20) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "red"
                        },
                        children: "Poor"
                    }));
                } else if (total < 40) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "green"
                        },
                        children: "Fair"
                    }));
                } else if (total < 60) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "green"
                        },
                        children: "Good"
                    }));
                } else if (total < 80) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "lightgreen"
                        },
                        children: "Very Good"
                    }));
                } else if (total < 100) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "lightgreen"
                        },
                        children: "Excellent"
                    }));
                } else if (total >= 100) {
                    setQualityText(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "lightgreen"
                        },
                        children: "Outstanding"
                    }));
                }
                setPercentage(total);
                if (questions.length !== 0 && percentagePerQuestion.length === questions.length && i === percentagePerQuestion.length - 1) {
                    if (activeUsersSocket !== null) {
                        activeUsersSocket.emit("add-candidate", {
                            candidateName: candidateName,
                            score: total
                        });
                    }
                }
            }
        } catch (error) {}
    }, [
        percentagePerQuestion,
        setPercentage,
        questions
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DataContext.Provider, {
        value: {
            candidateName,
            setCandidateName,
            selectedAnswers,
            setSelectedAnswers,
            percentage,
            qualityText,
            setPercentagePerQuestion,
            setPercentage,
            setQualityText
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataContextProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;