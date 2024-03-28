/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/detect-browser/es/index.js":
/*!*************************************************!*\
  !*** ./node_modules/detect-browser/es/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BotInfo: () => (/* binding */ BotInfo),
/* harmony export */   BrowserInfo: () => (/* binding */ BrowserInfo),
/* harmony export */   NodeInfo: () => (/* binding */ NodeInfo),
/* harmony export */   ReactNativeInfo: () => (/* binding */ ReactNativeInfo),
/* harmony export */   SearchBotDeviceInfo: () => (/* binding */ SearchBotDeviceInfo),
/* harmony export */   browserName: () => (/* binding */ browserName),
/* harmony export */   detect: () => (/* binding */ detect),
/* harmony export */   detectOS: () => (/* binding */ detectOS),
/* harmony export */   getNodeVersion: () => (/* binding */ getNodeVersion),
/* harmony export */   parseUserAgent: () => (/* binding */ parseUserAgent)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = /** @class */ (function () {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = 'browser';
    }
    return BrowserInfo;
}());

var NodeInfo = /** @class */ (function () {
    function NodeInfo(version) {
        this.version = version;
        this.type = 'node';
        this.name = 'node';
        this.os = process.platform;
    }
    return NodeInfo;
}());

var SearchBotDeviceInfo = /** @class */ (function () {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = 'bot-device';
    }
    return SearchBotDeviceInfo;
}());

var BotInfo = /** @class */ (function () {
    function BotInfo() {
        this.type = 'bot';
        this.bot = true; // NOTE: deprecated test name instead
        this.name = 'bot';
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}());

var ReactNativeInfo = /** @class */ (function () {
    function ReactNativeInfo() {
        this.type = 'react-native';
        this.name = 'react-native';
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}());

// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    ['aol', /AOLShield\/([0-9\._]+)/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['edge-ios', /EdgiOS\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
    ['silk', /\bSilk\/([0-9._-]+)\b/],
    ['miui', /MiuiBrowser\/([0-9\.]+)$/],
    ['beaker', /BeakerBrowser\/([0-9\.]+)/],
    ['edge-chromium', /EdgA?\/([0-9\.]+)/],
    [
        'chromium-webview',
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
    ],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
    ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    ['pie', /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
    ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['facebook', /FB[AS]V\/([0-9\.]+)/],
    ['instagram', /Instagram\s([0-9\.]+)/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ['curl', /^curl\/([0-9\.]+)$/],
    ['searchbot', SEARCHBOX_UA_REGEX],
];
var operatingSystemRules = [
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Chrome OS', /CrOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\/2/],
];
function detect(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof document === 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative') {
        return new ReactNativeInfo();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return (ua !== '' &&
        userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0], regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false));
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name = matchedRule[0], match = matchedRule[1];
    if (name === 'searchbot') {
        return new BotInfo();
    }
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
    }
    else {
        versionParts = [];
    }
    var version = versionParts.join('.');
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    }
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== 'undefined' && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}


/***/ }),

/***/ "./src/components/Interconnect.ts":
/*!****************************************!*\
  !*** ./src/components/Interconnect.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cssCarouselSlider: () => (/* binding */ cssCarouselSlider),
/* harmony export */   cssGeneral: () => (/* binding */ cssGeneral),
/* harmony export */   cssSlideOn: () => (/* binding */ cssSlideOn)
/* harmony export */ });
const cssGeneral = `@keyframes horizontal-shaking{0%,100%{transform:translateX(0)}25%,75%{transform:translateX(5px)}50%{transform:translateX(-5px)}}.tns-nav{text-align:center;margin:10px 0}.tns-nav>.tns-nav-active{background:#999!important}.tns-nav>[aria-controls]{cursor:pointer;width:25px;height:25px;padding:0;margin:0 5px;border-radius:50%;background:#ddd;border:0}.container{display:flex;flex-direction:column}.row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.row input[type=text]{width:100%}.mb-20{margin-bottom:20px}.left{text-align:left}`;
const cssCarouselSlider = `.slider-container{width:500px;overflow:hidden;position:relative}.slider{height:100%;display:flex;transition:left .5s;position:inherit}.slide{position:relative;background:#000}.slide img, .slide video{width:501px;height:300px;object-fit:contain}.slider-controls{display:flex;justify-content:center;margin-top:10px;margin-bottom:10px}.slider-controls button{cursor: pointer;width:25px;height:25px;padding:0;margin:0 5px;border-radius:50%;background:#ddd;border:0}.slider-controls button.active{background:#999}`;
const cssSlideOn = `.slideon{position:relative;display:inline-block;width:42px;height:24px;vertical-align:middle}.slideon>input,input.slideon{display:none}.slideon-slider{position:absolute;cursor:pointer;border-radius:34px;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.slideon-slider:before{position:absolute;content:"";height:22px;width:22px;left:1px;bottom:1px;border-radius:50%;background-color:#fff;-webkit-transition:.4s;transition:.4s;-webkit-box-shadow:0 0 3px 0 rgba(0,0,0,.45);-moz-box-shadow:0 0 3px 0 rgba(0,0,0,.45);box-shadow:0 0 3px 0 rgb(0,0,0,.45)}.slideon input:checked~.slideon-slider{background-color:#007bff}.slideon input:checked~.slideon-slider:before{-webkit-transform:translateX(18px);-ms-transform:translateX(18px);transform:translateX(18px)}.slideon input:disabled~.slideon-slider{opacity:.5}`;


/***/ }),

/***/ "./src/components/Modal.ts":
/*!*********************************!*\
  !*** ./src/components/Modal.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");


class Modal {
    constructor(modalOptions) {
        this.modal = null;
        this.imageURL = modalOptions?.imageURL || '';
        this.heading = modalOptions?.heading || [''];
        this.headingStyle = modalOptions?.headingStyle || '';
        this.body = modalOptions?.body || [''];
        this.bodyStyle = modalOptions?.bodyStyle || '';
        this.buttonList = modalOptions?.buttonList || [];
        this.callback = modalOptions?.callback || null;
        let element = document.getElementById(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal');
        if (element == null) {
            var style = document.createElement('style');
            style.id = ___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal';
            style.innerHTML = `.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-overlay{display:none!important;opacity:0!important;transition:all ease .1s!important;position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1000!important;background:rgba(0,0,0,.65)!important;justify-content:center!important;align-items:center!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal{transition:width ease-in-out .1s!important;display:inline-block!important;width:400px!important;padding:1.6px!important;z-index:1001!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal select{margin-left:.8px!important;border:solid 1px #dbdbdb!important;border-radius:3px!important;color:#262626!important;outline:0!important;padding:3px!important;text-align:center!important}@media (min-width:736px){.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal{width:500px!important}}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-content{position:relative;display:flex;flex-direction:column;width:100%!important;pointer-events:auto!important;background-clip:padding-box!important;outline:0!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-header{color:#fff!important;background-color:#fd1d1d!important;background-image:linear-gradient(45deg,#405de6,#5851db,#833ab4,#c13584,#e1306c,#fd1d1d)!important;border-top-left-radius:12px!important;border-top-right-radius:12px!important;padding:0 16px 0 16px!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-header h5{color:#fff!important;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important;font-size:16px!important;margin:revert!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-header h5:nth-child(2){margin-top:-15px!important;margin-bottom:20px!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-body{background:#fff!important;color:black!important;position:relative!important;-webkit-box-flex:1!important;-ms-flex:1 1 auto!important;flex:1 1 auto!important;padding:16px!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-body > img{background: black;object-fit:scale-down}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-body p{display:block!important;margin:revert!important;margin-block-start:1em!important;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important;font-size:16px!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-footer{background-color:#fff!important;border-top:1px solid #dbdbdb!important;border-left:0!important;border-right:0!important;border-bottom-left-radius:12px!important;border-bottom-right-radius:12px!important;line-height:1.5!important;min-height:48px!important;padding:4px 8px!important;user-select:none!important;display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;-webkit-box-pack:end!important;-ms-flex-pack:end!important;justify-content:center!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-footer button{width:100%!important;min-height:39px!important;background-color:transparent!important;border:0!important;outline:0!important;cursor:pointer!important;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important;font-size:16px!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-footer button.active{color:#0095e2!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-show{opacity:1!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-visible{display:flex!important}#${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-bulk-download-indicator{text-align:center!important}.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-db {
    color: #fff!important;
    background: linear-gradient(45deg,#405de6,#5851db,#833ab4,#c13584,#e1306c,#fd1d1d)!important;
    display: block;
    padding: 0.8rem;
    width: 100%;
    border: none;
    cursor: pointer;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-db:focus {
  outline: none;
  background: linear-gradient(45deg, rgba(64, 93, 230, 0.5), rgba(88, 81, 219, 0.5), rgba(131, 58, 180, 0.5), rgba(193, 53, 132, 0.5), rgba(225, 48, 108, 0.5), rgba(253, 29, 29, 0.5))!important;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-header {
  text-align: center;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-header h5 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-text-left {
  margin-right: auto;
}
.header-text-right {
  margin-left: auto;
}
.header-text-middle {
  margin: 0;
}
.header-text-right:last-child {
  margin-right: 30px;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-settings {
  cursor: pointer;
  display: inline-block;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  width: 40px;
  height: 40px;
  top: 16px;
  right: 16px;
  position: absolute;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-settings:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-body input {
  color: black!important;
}
.${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}-modal-body button {
  border-top-left-radius:0!important;
  border-bottom-left-radius:0!important;
}`;
            document.head.appendChild(style);
        }
    }
    get element() {
        return this.modal;
    }
    createModal() {
        const modalElement = document.createElement('div');
        modalElement.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-overlay');
        const modal = document.createElement('div');
        modal.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal');
        modalElement.appendChild(modal);
        const modalContent = document.createElement('div');
        modalContent.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-content');
        modal.appendChild(modalContent);
        const modalHeader = document.createElement('div');
        modalHeader.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-header');
        if (this.headingStyle.length > 0) {
            modalHeader.setAttribute('style', this.headingStyle);
        }
        modalContent.appendChild(modalHeader);
        this.heading.forEach(heading => {
            if (typeof heading === 'string' && !/<\/?[a-z][\s\S]*>/i.test(heading)) {
                const modalTitle = document.createElement('h5');
                modalTitle.innerHTML = heading;
                modalHeader.appendChild(modalTitle);
            }
            else {
                if (/<\/?[a-z][\s\S]*>/i.test(heading)) {
                    let i;
                    let a = document.createElement('div');
                    let b = document.createDocumentFragment();
                    a.innerHTML = heading;
                    while (i = a.firstChild) {
                        b.appendChild(i);
                    }
                    modalHeader.appendChild(b);
                }
                else {
                    modalHeader.appendChild(heading);
                }
            }
        });
        const modalBody = document.createElement('div');
        modalBody.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-body');
        if (this.bodyStyle.length > 0) {
            modalBody.setAttribute('style', this.bodyStyle);
        }
        modalContent.appendChild(modalBody);
        if (this.imageURL.length > 0) {
            const imageWrapper = document.createElement('div');
            modalContent.appendChild(imageWrapper);
            const image = document.createElement('img');
            image.setAttribute('height', '76px');
            image.setAttribute('width', '76px');
            image.style.margin = 'auto';
            image.style.paddingBottom = '20px';
            image.setAttribute('src', this.imageURL);
            imageWrapper.appendChild(image);
        }
        this.body.forEach(content => {
            if (typeof content === 'string' && !/<\/?[a-z][\s\S]*>/i.test(content)) {
                const modalText = document.createElement('p');
                modalText.innerText = content;
                modalBody.appendChild(modalText);
            }
            else {
                if (/<\/?[a-z][\s\S]*>/i.test(content)) {
                    let i;
                    let a = document.createElement('div');
                    let b = document.createDocumentFragment();
                    a.innerHTML = content;
                    while (i = a.firstChild) {
                        b.appendChild(i);
                    }
                    modalBody.appendChild(b);
                }
                else {
                    modalBody.appendChild(content);
                }
            }
        });
        if (this.buttonList.length > 0) {
            const modalFooter = document.createElement('div');
            modalFooter.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-footer');
            modalContent.appendChild(modalFooter);
            this.buttonList.forEach((button) => {
                const modalButton = document.createElement('button');
                modalButton.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-button');
                modalButton.innerText = button.text;
                if (button.active) {
                    modalButton.classList.add('active');
                }
                modalButton.onclick = () => {
                    if (button && button.callback) {
                        button.callback();
                    }
                    this.close.bind(this)();
                };
                modalFooter.appendChild(modalButton);
            });
        }
        else {
            modalContent.style.paddingBottom = '4px;';
        }
        return modalElement;
    }
    async open() {
        if (this.modal) {
            await this.close();
        }
        this.modal = this.createModal();
        document.body.appendChild(this.modal);
        this.modal.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-visible');
        setTimeout(() => {
            this.modal.classList.add(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-show');
        });
        // Re-trigger the callback function if it exists
        if (this?.callback) {
            this.callback(this, this.modal);
        }
    }
    async close() {
        if (!this.modal) {
            return;
        }
        this.modal.classList.remove(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-show');
        await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_1__.sleep)(100);
        this.modal.classList.remove(___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-visible');
        this.modal.parentNode.removeChild(this.modal);
        this.modal = null;
    }
    async refresh() {
        if (this.modal) {
            this.modal.parentNode.removeChild(this.modal);
            this.modal = null;
        }
        await this.open();
        // Re-trigger the callback function if it exists
        if (this?.callback) {
            this.callback(this, this.modal.querySelector('.' + ___WEBPACK_IMPORTED_MODULE_0__.program.NAME + '-modal-body'));
        }
    }
}


/***/ }),

/***/ "./src/helpers/localize.ts":
/*!*********************************!*\
  !*** ./src/helpers/localize.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _localization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../localization */ "./src/localization.ts");


let shortLang = navigator.language;
if (shortLang.indexOf('-') !== -1) {
    shortLang = shortLang.split('-')[0];
}
if (shortLang.indexOf('_') !== -1) {
    shortLang = shortLang.split('_')[0];
}
const LANGS_NORMALIZE = {
    'de': 'de-DE',
    'en': 'en-US',
    'es': 'es-AR',
    'pt': 'pt-BR'
};
const LANG_DEFAULT = LANGS_NORMALIZE[shortLang];
/**
 * @name: localize! function to return localized strings in localization
 * @param: str {string} [required] str of language
 * @param: lang {string} [default navigator language]
 * @return str in language selected
 *
 */
function localize(str, lang = LANG_DEFAULT) {
    try {
        // eslint-disable-next-line no-prototype-builtins
        if (!_localization__WEBPACK_IMPORTED_MODULE_1__["default"].langs.hasOwnProperty(lang)) {
            lang = 'en-US'; // default lang
        }
        if (_localization__WEBPACK_IMPORTED_MODULE_1__["default"].langs[lang][str]) {
            return _localization__WEBPACK_IMPORTED_MODULE_1__["default"].langs[lang][str];
        }
        return '';
    }
    catch (e) {
        console.error(`[${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}]LOC error:`, e);
        return `ops, an error ocurred in localization system. Enter in https://github.com/ThinkBIG-Company/${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}/issues/new and open an issue with this code: 'LOC_dont_found_str_neither_default:[${lang}->${str}]'
    for more information open the console`;
    }
}
console.info(localize('helpers.localize_defaultlang').replace('${LANG_DEFAULT}', LANG_DEFAULT));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);


/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateModalBody: () => (/* binding */ generateModalBody),
/* harmony export */   getElementInViewPercentage: () => (/* binding */ getElementInViewPercentage),
/* harmony export */   getMediaFromInfoApi: () => (/* binding */ getMediaFromInfoApi),
/* harmony export */   getUserFromInfoApi: () => (/* binding */ getUserFromInfoApi),
/* harmony export */   getUserInfoFromWebProfileApi: () => (/* binding */ getUserInfoFromWebProfileApi),
/* harmony export */   removeStyleTagsWithIDs: () => (/* binding */ removeStyleTagsWithIDs),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   userFilenameFormatter: () => (/* binding */ userFilenameFormatter)
/* harmony export */ });
/* harmony import */ var _model_mediaType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/mediaType */ "./src/model/mediaType.ts");
/* harmony import */ var _localize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localize */ "./src/helpers/localize.ts");


const mediaInfoCache = new Map(); // key: media id, value: info json
const mediaIdCache = new Map(); // key: post id, value: media id
async function fetchVideoURL(articleNode, videoElem) {
    const poster = videoElem.getAttribute("poster");
    const timeNodes = articleNode.querySelectorAll("time");
    const posterUrl = timeNodes[timeNodes.length - 1].parentNode.parentNode.href;
    const posterPattern = /\/([^\/?]*)\?/;
    const posterMatch = poster?.match(posterPattern);
    const postFileName = posterMatch?.[1];
    const resp = await fetch(posterUrl);
    const content = await resp.text();
    const pattern = new RegExp(`${postFileName}.*?video_versions.*?url":("[^"]*")`, "s");
    const match = content.match(pattern);
    let videoUrl = JSON.parse(match?.[1] ?? "");
    videoUrl = videoUrl.replace(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g, "https://scontent.cdninstagram.com");
    videoElem.setAttribute("videoURL", videoUrl);
    return videoUrl;
}
const findAppId = () => {
    const appIdPattern = /"X-IG-App-ID":"([\d]+)"/;
    const bodyScripts = document.querySelectorAll("body > script");
    for (let i = 0; i < bodyScripts.length; ++i) {
        const match = bodyScripts[i].text.match(appIdPattern);
        if (match)
            return match[1];
    }
    return null;
};
function findPostId(articleNode) {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/reels/")) {
        return pathname.split("/")[2];
    }
    else if (pathname.startsWith("/stories/")) {
        return pathname.split("/")[3];
    }
    else if (pathname.startsWith("/reel/")) {
        return pathname.split("/")[2];
    }
    const postIdPattern = /^\/p\/([^/]+)\//;
    const aNodes = articleNode.querySelectorAll("a");
    for (let i = 0; i < aNodes.length; ++i) {
        const link = aNodes[i].getAttribute("href");
        if (link) {
            const match = link.match(postIdPattern);
            if (match)
                return match[1];
        }
    }
    return null;
}
const findMediaId = async (postId) => {
    const mediaIdPattern = /instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/;
    const match = window.location.href.match(/www.instagram.com\/stories\/[^\/]+\/(\d+)/);
    if (match)
        return match[1];
    if (!mediaIdCache.has(postId)) {
        const postUrl = `https://www.instagram.com/p/${postId}/`;
        const resp = await fetch(postUrl);
        const text = await resp.text();
        const idMatch = text.match(mediaIdPattern);
        if (!idMatch)
            return null;
        let mediaId = null;
        for (let i = 0; i < idMatch.length; ++i) {
            if (idMatch[i])
                mediaId = idMatch[i];
        }
        if (!mediaId)
            return null;
        mediaIdCache.set(postId, mediaId);
    }
    return mediaIdCache.get(postId);
};
const getImgOrVedioUrl = (item) => {
    if ("video_versions" in item) {
        return item.video_versions[0].url;
    }
    else {
        return item.image_versions2.candidates[0].url;
    }
};
const getVideoSrc = async (articleNode, videoElem) => {
    let url = videoElem.getAttribute("src");
    if (videoElem.hasAttribute("videoURL")) {
        url = videoElem.getAttribute("videoURL");
    }
    else if (url === null || url.includes("blob")) {
        url = await fetchVideoURL(articleNode, videoElem);
    }
    return url;
};
async function generateModalBody(el, program) {
    let found = false;
    let mediaType = _model_mediaType__WEBPACK_IMPORTED_MODULE_0__.MediaType.UNDEFINED;
    let mediaInfo = null;
    mediaInfo = await getMediaFromInfoApi(el);
    let modalBody = "";
    let selectedIndex = 0;
    let userName = undefined;
    if (mediaInfo && mediaInfo.user && mediaInfo.user.username) {
        userName = mediaInfo.user.username;
    }
    else {
        console.log("Failed to fetch user information");
    }
    let url = null;
    // Check if is an ad
    const storedSetting1Checkbox = localStorage.getItem(program.NAME + "_setting1_checkbox") || "false";
    if (storedSetting1Checkbox !== null && storedSetting1Checkbox !== undefined && storedSetting1Checkbox === "false" && mediaInfo.product_type == "ad") {
        mediaType = _model_mediaType__WEBPACK_IMPORTED_MODULE_0__.MediaType.Ad;
        return { found, mediaType, mediaInfo, modalBody, selectedIndex, userName };
    }
    const mediaPostedAtDateObj = new Date(mediaInfo.taken_at * 1000);
    let formattedFilename = "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}";
    const storedSetting1Input = localStorage.getItem(program.NAME + "_setting1_input") || formattedFilename;
    if (storedSetting1Input !== null && storedSetting1Input !== undefined) {
        const fRegexPlaceholders = {
            Minute: mediaPostedAtDateObj.getMinutes().toString().padStart(2, "0"),
            Hour: mediaPostedAtDateObj.getHours().toString().padStart(2, "0"),
            Day: mediaPostedAtDateObj.getDate().toString().padStart(2, "0"),
            Month: (mediaPostedAtDateObj.getMonth() + 1).toString().padStart(2, "0"),
            Year: mediaPostedAtDateObj.getFullYear().toString(),
            Username: userName
        };
        formattedFilename = userFilenameFormatter(storedSetting1Input, fRegexPlaceholders);
    }
    let openInNewTab = false;
    const storedSetting3Checkbox = localStorage.getItem(program.NAME + "_setting3_checkbox") || "false";
    if (storedSetting3Checkbox !== null && storedSetting3Checkbox !== undefined) {
        openInNewTab = storedSetting3Checkbox === "true";
    }
    if ("carousel_media" in mediaInfo) {
        found = true;
        mediaType = _model_mediaType__WEBPACK_IMPORTED_MODULE_0__.MediaType.Carousel;
        const isPostView = window.location.pathname.startsWith("/p/");
        let dotsList;
        if (isPostView) {
            dotsList = el.querySelectorAll(`:scope > div > div > div > div:nth-child(2)>div`);
        }
        else {
            dotsList = el.querySelectorAll(`:scope > div > div:nth-child(2) > div >div>div> div>div:nth-child(2)>div`);
        }
        selectedIndex = [...dotsList].findIndex((i) => i.classList.length === 2);
        modalBody += `<div class="slider-container"><div class="slider">`;
        for (let sC = 0; sC < mediaInfo?.carousel_media?.length; sC++) {
            const scMedia = mediaInfo.carousel_media[sC];
            if (typeof scMedia.video_dash_manifest !== "undefined" && scMedia.video_dash_manifest !== null) {
                url = getImgOrVedioUrl(scMedia);
                if (url === null) {
                    const videoElem = el.querySelector("article  div > video");
                    url = await getVideoSrc(el, videoElem);
                }
                modalBody += `<div class="slide"><video style="background:black;" height="450" src="${url}" controls="controls" preload="metadata"></video>`;
                // Add download button
                if (openInNewTab) {
                    modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
                }
                else {
                    modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + "_" + Number(sC + 1) + ".mp4")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
                }
                modalBody += `</div>`;
            }
            else {
                url = getImgOrVedioUrl(scMedia);
                if (url === null) {
                    const imgElem = el.querySelector("article div[role] div > img");
                    if (imgElem) {
                        // media type is image
                        url = imgElem.getAttribute("src");
                    }
                    else {
                        console.log("Err: not find media at handle post single");
                    }
                }
                modalBody += `<div class="slide"><img src="${url}" />`;
                // Add download button
                if (openInNewTab) {
                    modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
                }
                else {
                    modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + "_" + Number(sC + 1) + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
                }
                modalBody += `</div>`;
            }
        }
        modalBody += `</div><div class="slider-controls"></div></div>`;
    }
    else {
        // Single video
        if (typeof mediaInfo.video_dash_manifest !== "undefined" && mediaInfo.video_dash_manifest !== null) {
            found = true;
            mediaType = _model_mediaType__WEBPACK_IMPORTED_MODULE_0__.MediaType.Video;
            url = getImgOrVedioUrl(mediaInfo);
            if (url === null) {
                const videoElem = el.querySelector("article  div > video");
                url = await getVideoSrc(el, videoElem);
            }
            modalBody += `<video style="background:black;" width="500" height="450" src="${url}" controls="controls" preload="metadata"></video>`;
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
            }
            else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + ".mp4")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
            }
            // Single image
        }
        else {
            found = true;
            mediaType = _model_mediaType__WEBPACK_IMPORTED_MODULE_0__.MediaType.Image;
            url = getImgOrVedioUrl(mediaInfo);
            if (url === null) {
                const imgElem = el.querySelector("article div[role] div > img");
                if (imgElem) {
                    // media type is image
                    url = imgElem.getAttribute("src");
                }
                else {
                    console.log("Err: not find media at handle post single");
                }
            }
            modalBody += `<img width="500" height="450" src="${url}" />`;
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
            }
            else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_localize__WEBPACK_IMPORTED_MODULE_1__["default"])("index@download")}</a>`;
            }
        }
    }
    return { found, mediaType, mediaInfo, modalBody, selectedIndex, userName };
}
function getElementInViewPercentage(el) {
    let viewport;
    if (window !== null && window !== undefined) {
        viewport = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight
        };
    }
    else {
        viewport = document.documentElement;
    }
    const elementBoundingRect = el.getBoundingClientRect();
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset
    };
    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0;
    }
    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100;
    }
    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100;
    }
    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;
    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
    }
    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }
    const percentageInView = (elementHeightInView / window.innerHeight) * 100;
    return Math.round(percentageInView);
}
const getMediaFromInfoApi = async (articleNode) => {
    try {
        const appId = findAppId();
        if (!appId) {
            console.log("Cannot find appid");
            return null;
        }
        const postId = findPostId(articleNode);
        if (!postId) {
            console.log("Cannot find post id");
            return null;
        }
        const mediaId = await findMediaId(postId);
        if (!mediaId) {
            console.log("Cannot find media id");
            return null;
        }
        if (!mediaInfoCache.has(mediaId)) {
            const url = "https://i.instagram.com/api/v1/media/" + mediaId + "/info/";
            const resp = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "X-IG-App-ID": appId,
                },
                credentials: "include",
                mode: "cors",
            });
            if (resp.status !== 200) {
                console.log(`Fetch info API failed with status code: ${resp.status}`);
                return null;
            }
            const respJson = await resp.json();
            mediaInfoCache.set(mediaId, respJson);
        }
        const infoJson = mediaInfoCache.get(mediaId);
        return infoJson.items[0];
    }
    catch (e) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`);
        return null;
    }
};
const getUserFromInfoApi = async (userId) => {
    try {
        const appId = findAppId();
        if (!appId) {
            console.log("Cannot find appid");
            return null;
        }
        const url = "https://i.instagram.com/api/v1/users/" + userId + "/info/";
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "X-IG-App-ID": appId,
            },
            credentials: "include",
            mode: "cors",
        });
        if (resp.status !== 200) {
            console.log(`Fetch info API failed with status code: ${resp.status}`);
            return null;
        }
        const infoJson = await resp.json();
        return infoJson;
    }
    catch (e) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`);
        return null;
    }
};
const getUserInfoFromWebProfileApi = async (userName) => {
    try {
        const appId = findAppId();
        if (!appId) {
            console.log("Cannot find appid");
            return null;
        }
        const url = "https://i.instagram.com/api/v1/users/web_profile_info/?username=" + userName;
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "X-IG-App-ID": appId,
            },
            credentials: "include",
            mode: "cors",
        });
        if (resp.status !== 200) {
            console.log(`Fetch info API failed with status code: ${resp.status}`);
            return null;
        }
        const infoJson = await resp.json();
        return infoJson;
    }
    catch (e) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`);
        return null;
    }
};
function removeStyleTagsWithIDs(idsToRemove) {
    const styleTags = document.querySelectorAll("style[id]");
    styleTags.forEach(styleTag => {
        if (idsToRemove.includes(styleTag.id)) {
            styleTag.parentNode.removeChild(styleTag);
        }
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
}
function userFilenameFormatter(filename, placeholders) {
    // Replace placeholders with corresponding values
    for (const placeholder in placeholders) {
        const regex = new RegExp(`{${placeholder}}`, "g");
        filename = filename.replace(regex, placeholders[placeholder]);
    }
    // Replace spaces with dashes (-)
    filename = filename.replace(/\s+/g, "-");
    // Remove any special characters except dashes, underscores, and dots
    filename = filename.replace(/[^\w-.]/g, "");
    return filename;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   program: () => (/* binding */ program)
/* harmony export */ });
/* harmony import */ var _modules_MediaScanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MediaScanner */ "./src/modules/MediaScanner.ts");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.ts");
/* harmony import */ var detect_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! detect-browser */ "./node_modules/detect-browser/es/index.js");
/* harmony import */ var _modules_Update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Update */ "./src/modules/Update.ts");
/* harmony import */ var _helpers_localize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/localize */ "./src/helpers/localize.ts");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils.ts");
/* harmony import */ var _model_mediaType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model/mediaType */ "./src/model/mediaType.ts");







console.clear();
const APP_NAME = "instantgram_light";
// Init browser detection
const browser = (0,detect_browser__WEBPACK_IMPORTED_MODULE_6__.detect)();
const program = {
    NAME: APP_NAME,
    VERSION: "2023.10.28",
    browser: browser,
    hostname: window.location.hostname,
    path: window.location.pathname,
    regexHostname: /^instagram\.com/,
    regexRootPath: /^\/+$/,
    regexProfilePath: /^\/([A-Za-z0-9._]{2,3})+\/$/,
    regexPostPath: /^\/p\//,
    regexReelURI: /reel\/(.*)+/,
    regexReelsURI: /reels\/(.*)+/,
    regexStoriesURI: /stories\/(.*)+/,
    foundByModule: null,
    foundMediaObj: undefined
};
if (true) {
    console.info(["Developer Mode Caution!", program]);
    if (program.browser) {
        console.info(["Browser Name", program.browser.name]);
        console.info(["Browser Version", program.browser.version]);
        console.info(["Browser OS", program.browser.os]);
    }
}
function playCurrentStory(el) {
    // Trigger a click event on the play button if it exists
    let svgElement = el.querySelector("svg[viewBox='0 0 24 24']");
    if (svgElement !== null) {
        if (typeof svgElement.click === "function") {
            svgElement.click();
        }
        else {
            // Alternative approach for older browsers
            const clickEvent = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
            });
            svgElement.dispatchEvent(clickEvent);
        }
    }
}
function initSaveSettings(el) {
    for (let i = 1; i <= 3; i++) {
        const settingName = `setting${i}`;
        // For checkboxes
        const checkbox = el.querySelector(`#${settingName}-checkbox`);
        if (checkbox) {
            const storedData = localStorage.getItem(program.NAME + '_' + settingName + '_checkbox');
            checkbox.checked = storedData === 'true';
            checkbox.addEventListener("change", () => {
                const storedData = localStorage.getItem(program.NAME + '_' + settingName + '_checkbox');
                const checked = String(checkbox.checked);
                // Save merged settings to LocalStorage
                localStorage.setItem(program.NAME + '_' + settingName + '_checkbox', checked);
            });
        }
        // For input text
        const inputText = el.querySelector(`#${settingName}-input`);
        if (inputText) {
            const storedData = localStorage.getItem(program.NAME + '_' + settingName + '_input');
            inputText.value = storedData || "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}";
            const saveFilenameFormat = el.querySelector("#saveFilenameFormat");
            saveFilenameFormat.addEventListener("click", (event) => {
                event.preventDefault();
                const storedData = localStorage.getItem(program.NAME + '_' + settingName + '_input');
                const input = String(inputText.value);
                // Save merged settings to LocalStorage
                localStorage.setItem(program.NAME + '_' + settingName + '_input', input);
                saveFilenameFormat.textContent = (0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@saved");
                saveFilenameFormat.style.color = "white";
                saveFilenameFormat.style.backgroundColor = "green";
                setTimeout(() => {
                    saveFilenameFormat.textContent = (0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@save");
                    saveFilenameFormat.style.color = "black";
                    saveFilenameFormat.style.backgroundColor = "buttonface";
                }, 1000);
            });
        }
    }
}
async function handleProfilePage() {
    try {
        let userInfo = null;
        let userId = null;
        const regex = /instagram.com\/([A-Za-z0-9_.]+)/;
        const match = window.location.href.match(regex);
        if (match) {
            const username = match[1];
            userInfo = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_4__.getUserInfoFromWebProfileApi)(username);
            userId = userInfo.data.user.id;
        }
        else {
            console.log("Could not get the username from insta url.");
        }
        userInfo = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_4__.getUserFromInfoApi)(userId);
        if (userInfo) {
            let openInNewTab = false;
            const storedSetting3Checkbox = localStorage.getItem(program.NAME + "_setting3_checkbox") || "false";
            if (storedSetting3Checkbox !== null && storedSetting3Checkbox !== undefined) {
                openInNewTab = storedSetting3Checkbox === "true";
            }
            const url = userInfo.user.hd_profile_pic_url_info.url;
            const username = userInfo.user.username;
            let modalBody = "";
            modalBody += `<div class="slide"><img src="${url}" />`;
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@download")}</a>`;
            }
            else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(username + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@download")}</a>`;
            }
            modalBody += `</div>`;
            program.foundMediaObj = {
                found: true,
                mediaType: _model_mediaType__WEBPACK_IMPORTED_MODULE_5__.MediaType.Image,
                mediaInfo: undefined,
                modalBody: modalBody,
                selectedIndex: undefined,
                userName: username
            };
            handleMediaFound(document, username);
        }
        else {
            console.log("Failed to fetch user information");
        }
    }
    catch (e) {
        console.log(`Some error in handleProfilePage: ${e}\n${e.stack}`);
        return null;
    }
}
function handleMediaNotFound() {
    if (!program.foundByModule) {
        new _components_Modal__WEBPACK_IMPORTED_MODULE_1__.Modal({
            heading: [
                `<h5>
            <span class="header-text-left">[${program.NAME}]</span>
            <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
          </h5>`
            ],
            body: [(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@alert_dontFound")],
            bodyStyle: "text-align:center",
            buttonList: [{ active: true, text: "Ok" }]
        }).open();
    }
}
function handleMediaFound(document, userName) {
    new _components_Modal__WEBPACK_IMPORTED_MODULE_1__.Modal({
        heading: [
            `<h5>
          <span class="header-text-middle">@${userName}
            <button class="${program.NAME}-settings">
              <svg style="margin-left: auto; margin-right: auto;" aria-label="Optionen" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Optionen</title>
                <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </button>
          </span>
        </h5>`
        ],
        body: [program.foundMediaObj.modalBody],
        bodyStyle: "padding:0!important;text-align:center",
        buttonList: [{ active: true, text: (0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@close") }],
        callback: (_modal, el) => {
            if (el.querySelector(".slider") !== null) {
                const slider = el.querySelector(".slider");
                const slides = el.querySelectorAll(".slide");
                const sliderControls = el.querySelector(".slider-controls");
                let slideIndex = program.foundMediaObj.selectedIndex;
                for (let i = 0; i < slides.length; i++) {
                    const button = document.createElement("button");
                    button.setAttribute("data-index", String(i));
                    button.innerHTML = String(i + 1);
                    button.addEventListener("click", () => {
                        slideIndex = i;
                        updateSliderPosition();
                    });
                    sliderControls.appendChild(button);
                }
                const buttons = el.querySelectorAll(".slider-controls button");
                function updateSliderPosition() {
                    const slideWidth = slides[0].clientWidth;
                    const translateX = -slideWidth * slideIndex;
                    slider.style.transform = `translateX(${translateX}px)`;
                    buttons.forEach((button, index) => {
                        button.classList.toggle("active", index === slideIndex);
                    });
                }
                buttons[slideIndex].classList.add("active");
                updateSliderPosition();
            }
            el.querySelector(`.${program.NAME}-settings`).addEventListener("click", () => {
                new _components_Modal__WEBPACK_IMPORTED_MODULE_1__.Modal({
                    heading: [
                        `<h5>
                <span class="header-text-left">[${program.NAME}]</span>
                <span class="header-text-middle">${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@title")}</span>
                <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
              </h5>`
                    ],
                    body: [
                        `<form style="padding-top: 25px;padding-bottom: 25px;padding-left: 20px;padding-right: 20px;">
                <div class="container">
                  <div class="row mb-20"><strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_attention")}</strong></div>
                  <div class="row">
                    <div class="left"><strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_1")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting1-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left"><strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_2")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting2-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left"><strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_3")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting3-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">&nbsp;</div>
                  <div class="row">
                    <div class="left" style="text-align: left">
                      <strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_4")}</strong><br>
                      {Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}<br><br>
                      <strong>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index#program#modal_settings@settings_4_1")}</strong>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left" style="display: contents">
                      <input type="text" id="setting1-input" value="{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}">
                      <button type="button" id="saveFilenameFormat">${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@save")}</button>
                    </div>
                  </div>
                </div>
              </form>`
                    ],
                    bodyStyle: "padding:0!important;text-align:center",
                    buttonList: [{ active: true, text: (0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@close") }],
                    callback: (_modal, el) => {
                        initSaveSettings(el);
                    }
                }).open();
            });
            el.querySelector("." + program.NAME + "-modal-footer > ." + program.NAME + "-modal-button").addEventListener("click", () => {
                // Remove previous executed bookmarklet stuff
                const idsToRemove = [
                    program.NAME + '-cssGeneral',
                    program.NAME + '-cssSlideOn',
                    program.NAME + '-cssCarouselSlider'
                ];
                // Call the function to remove <style> tags from the entire DOM
                (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_4__.removeStyleTagsWithIDs)(idsToRemove);
            });
        }
    }).open();
}
function handleInstagramSite() {
    new _modules_MediaScanner__WEBPACK_IMPORTED_MODULE_0__.MediaScanner().execute(program, (scannerProgram) => {
        if (true) {
            console.log("scannerFound", scannerProgram.foundMediaObj.found);
            console.log("foundByModule", scannerProgram.foundByModule);
        }
        if (scannerProgram.foundMediaObj.found) {
            handleMediaFound(document, scannerProgram.foundMediaObj.userName);
        }
        else {
            if (scannerProgram.foundMediaObj.mediaType == _model_mediaType__WEBPACK_IMPORTED_MODULE_5__.MediaType.Ad) {
                return;
            }
            if (scannerProgram.regexProfilePath.test(scannerProgram.path)) {
                handleProfilePage();
            }
            else {
                handleMediaNotFound();
            }
        }
    });
    if (false) {}
}
function handleNonInstagramSite() {
    new _components_Modal__WEBPACK_IMPORTED_MODULE_1__.Modal({
        heading: [
            `<h5>
          <span class="header-text-left">[${program.NAME}]</span>
          <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
        </h5>`
        ],
        body: [(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_3__["default"])("index@alert_onlyWorks")],
        bodyStyle: "text-align:center",
        buttonList: [{ active: true, text: "Ok" }]
    }).open();
}
/* ===============================
 =            Program            =
 ===============================*/
// verify if are running on instagram site
if (program.hostname === "instagram.com" || program.hostname === "www.instagram.com") {
    handleInstagramSite();
}
else {
    handleNonInstagramSite();
}
/* =====  End of Program  ======*/ 


/***/ }),

/***/ "./src/localization.ts":
/*!*****************************!*\
  !*** ./src/localization.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    'langs': {
        'en-US': {
            'helpers.localize_defaultlang': '[instantgram-light] set language: ${LANG_DEFAULT} \n For more information about available languages please check http://thinkbig-company.github.io/instantgram',
            'index@alert_onlyWorks': 'Works only on instagram.com',
            'index@profilepage_downloader_disabled': 'Sorry the ProfilePage downloader is currently disabled because instagram changed their system.\n\nMaybe in the future there will be a solution to fix the problem.',
            'index@alert_dontFound': 'Did you open any Instagram post? Like for example<br/><div style="text-align:center"><a href="https://www.instagram.com/p/CIGrv1VMBkS/" target="_blank" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'initial\'">https://www.instagram.com/p/CIGrv1VMBkS/</a></div>',
            'index#program#modal_settings@title': 'Settings',
            'index#program#modal_settings@settings_attention': 'Attention: You have to open [instantgram-light] again for your changes to be active!',
            'index#program#modal_settings@settings_1': 'Enable monetized posts<br>(ad blockers must be disabled)',
            'index#program#modal_settings@settings_2': 'Stories pause when opening [instantgram-light]',
            'index#program#modal_settings@settings_3': 'Open download in new tab',
            'index#program#modal_settings@settings_4': 'Change the file name format for downloads.<br/>The default format is as follows.',
            'index#program#modal_settings@settings_4_1': 'You can omit the above placeholders completely or customize them by adding hyphens, underscores, and periods.',
            'index@download': 'Download',
            'index@save': 'Save',
            'index@saved': 'Saved',
            'index@close': 'Close',
            'modules.update@consoleWarnOutdatedInfo': '[instantgram-light] is outdated. Please check http://thinkbig-company.github.io/instantgram for available updates.',
            'modules.update@consoleWarnOutdatedInfoVersions': '[instantgram-light] Installed version: ${data.version} | New update: ${data.onlineVersion}',
            'modules.update@determineIfGetUpdateIsNecessary_contacting': '[instantgram-light] is looking for available updates...',
            'modules.update@determineIfGetUpdateIsNecessary_updated': '[instantgram-light] updated your current version.',
            'modules.update@determineIfGetUpdateIsNecessary_@update_available': 'There is a new update available',
            'modules.update@determineIfGetUpdateIsNecessary_@load_update': 'Get update'
        },
        'es-AR': {
            'helpers.localize_defaultlang': '[instantgram-light] establecer idioma: ${LANG_DEFAULT} \n Para más información sobre los idiomas disponibles, consulte http://thinkbig-company.github.io/instantgram',
            'index@alert_onlyWorks': 'Sólo funciona en instagram.com',
            'index@profilepage_downloader_disabled': 'Lo siento, la descarga de ProfilePage está deshabilitada actualmente porque Instagram cambió su sistema.\n\nTal vez en el futuro haya una solución para solucionar el problema.',
            'index@alert_dontFound': '¿Has abierto algún post de Instagram? Como por ejemplo<br/><div style="text-align:center"><a href="https://www.instagram.com/p/CIGrv1VMBkS/" target="_blank" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'initial\'">https://www.instagram.com/p/CIGrv1VMBkS/</a></div>',
            'index#program#modal_settings@title': 'Ajustes',
            'index#program#modal_settings@settings_attention': 'Atención: ¡Tienes que abrir [instantgram-light] nuevamente para que los cambios estén activos!',
            'index#program#modal_settings@settings_1': 'Habilitar publicaciones monetizadas<br>(los bloqueadores de anuncios deben estar deshabilitados)',
            'index#program#modal_settings@settings_2': 'Historias en pausa al abrir [instantgram-light]',
            'index#program#modal_settings@settings_3': 'Abrir la descarga en una nueva pestaña',
            'index#program#modal_settings@settings_4': 'Cambie el formato del nombre de archivo para las descargas.<br/>El formato predeterminado es el siguiente',
            'index#program#modal_settings@settings_4_1': 'Puede omitir por completo los marcadores de posición anteriores o personalizarlos agregando guiones, guiones bajos y puntos.',
            'index@download': 'Descargar',
            'index@save': 'Ahorrar',
            'index@saved': 'Salvado',
            'index@close': 'Cerca',
            'modules.update@consoleWarnOutdatedInfo': '[instantgram-light] es obsoleto. Consulte en http://thinkbig-company.github.io/instantgram las actualizaciones disponibles.',
            'modules.update@consoleWarnOutdatedInfoVersions': '[instantgram-light] Versión instalada: ${data.version} | Nueva actualización: ${data.onlineVersion}',
            'modules.update@determineIfGetUpdateIsNecessary_contacting': '[instantgram-light] está buscando actualizaciones disponibles...',
            'modules.update@determineIfGetUpdateIsNecessary_updated': '[instantgram-light] ha actualizado su versión actual.',
            'modules.update@determineIfGetUpdateIsNecessary_@update_available': 'Hay una nueva actualización disponible',
            'modules.update@determineIfGetUpdateIsNecessary_@load_update': 'Obtener información'
        },
        'de-DE': {
            'helpers.localize_defaultlang': 'Ausgewählte Sprache: ${LANG_DEFAULT} \n Weitere Informationen zu den unterstützten Sprachen findest du auf http://thinkbig-company.github.io/instantgram',
            'index@alert_onlyWorks': 'Funktioniert nur auf instagram.com',
            'index@profilepage_downloader_disabled': 'Leider ist der ProfilePage-Downloader derzeit deaktiviert, da Instagram sein System geändert hat.\n\nVielleicht gibt es in Zukunft eine Lösung für dieses Problem.',
            'index@alert_dontFound': 'Hast du einen Instagram Post geöffnet? Zum Beispiel<br/><div style="text-align:center"><a href="https://www.instagram.com/p/CIGrv1VMBkS/" target="_blank" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'initial\'">https://www.instagram.com/p/CIGrv1VMBkS/</a></div>',
            'index#program#modal_settings@title': 'Einstellungen',
            'index#program#modal_settings@settings_attention': 'Achtung: Sie müssen [instantgram-light] erneut öffnen, damit ihre Änderungen aktiv sind!',
            'index#program#modal_settings@settings_1': 'Monetarisierte Beiträge aktivieren<br>(Werbeblocker müssen deaktiviert sein)',
            'index#program#modal_settings@settings_2': 'Stories pausieren beim öffnen von [instantgram-light]',
            'index#program#modal_settings@settings_3': 'Download in neuem Tab öffnen',
            'index#program#modal_settings@settings_4': 'Ändern Sie das Dateinamenformat für Downloads.<br/>Das Standardformat ist wie folgt',
            'index#program#modal_settings@settings_4_1': 'Sie können die obigen Platzhalter komplett weglassen oder sie durch Hinzufügen von Bindestrichen, Unterstrichen und Punkten anpassen.',
            'index@download': 'Herunterladen',
            'index@save': 'Speichern',
            'index@saved': 'Gespeichert',
            'index@close': 'Schließen',
            'modules.update@consoleWarnOutdatedInfo': '[instantgram-light] ist veraltet. Bitte besuche die Seite http://thinkbig-company.github.io/instantgram für ein Update.',
            'modules.update@consoleWarnOutdatedInfoVersions': '[instantgram-light] Installierte Version: ${data.version} | Neue Version: ${data.onlineVersion}',
            'modules.update@determineIfGetUpdateIsNecessary_contacting': '[instantgram-light] sucht nach neuen verfügbaren Updates...',
            'modules.update@determineIfGetUpdateIsNecessary_updated': '[instantgram-light] wurde aktualisiert.',
            'modules.update@determineIfGetUpdateIsNecessary_@update_available': 'Es ist ein neues Update verfügbar',
            'modules.update@determineIfGetUpdateIsNecessary_@load_update': 'Update laden'
        },
        'pt-BR': {
            'helpers.localize_defaultlang': '[instantgram-light] idioma configurado: ${LANG_DEFAULT} \npara mais informações sobre os idiomas suportados, acesse http://thinkbig-company.github.io/instantgram',
            'index@alert_onlyWorks': '[instantgram-light] somente funciona no instagram.com',
            'index@profilepage_downloader_disabled': 'Lamentamos que o programa de download ProfilePage esteja atualmente desativado porque o programa mudou seu sistema.\n\nTalvez, no futuro, haja uma solução para resolver o problema.',
            'index@alert_dontFound': 'ops, você está em algum post do instagram? ex:<br/><div style="text-align:center"><a href="https://www.instagram.com/p/CIGrv1VMBkS/" target="_blank" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'initial\'">https://www.instagram.com/p/CIGrv1VMBkS/</a></div>',
            'index#program#modal_settings@title': 'Configurações',
            'index#program#modal_settings@settings_attention': 'Atenção: Você precisa abrir o [instantgram-light] novamente para que suas alterações sejam ativadas!',
            'index#program#modal_settings@settings_1': 'Habilitar postagens monetizadas<br>(os bloqueadores de anúncios devem estar desativados)',
            'index#program#modal_settings@settings_2': 'As histórias fazem uma pausa ao abrir [instantgram-light]',
            'index#program#modal_settings@settings_3': 'Abrir o download em uma nova guia',
            'index#program#modal_settings@settings_4': 'Altere o formato do nome do arquivo para downloads.<br/>O formato padrão é o seguinte',
            'index#program#modal_settings@settings_4_1': 'Você pode omitir completamente os espaços reservados acima ou ajustá-los adicionando hífens, sublinhados e pontos.',
            'index@download': 'Download',
            'index@save': 'Salvar',
            'index@saved': 'Salvo em',
            'index@close': 'Fechar',
            'modules.update@consoleWarnOutdatedInfo': '[instantgram-light] está desatualizado. Acesse http://thinkbig-company.github.io/instantgram para atualizar',
            'modules.update@consoleWarnOutdatedInfoVersions': '[instantgram-light] versão local: ${data.version} | nova versão: ${data.onlineVersion}',
            'modules.update@determineIfGetUpdateIsNecessary_contacting': '[instantgram-light] está procurando atualizações...',
            'modules.update@determineIfGetUpdateIsNecessary_updated': '[instantgram-light] informações locais atualizadas',
            'modules.update@determineIfGetUpdateIsNecessary_@update_available': 'Há uma nova atualização disponível',
            'modules.update@determineIfGetUpdateIsNecessary_@load_update': 'Carga de actualização'
        }
    }
});


/***/ }),

/***/ "./src/model/mediaType.ts":
/*!********************************!*\
  !*** ./src/model/mediaType.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaType: () => (/* binding */ MediaType)
/* harmony export */ });
var MediaType;
(function (MediaType) {
    MediaType["Ad"] = "AD";
    MediaType["Image"] = "IMAGE";
    MediaType["Video"] = "VIDEO";
    MediaType["Carousel"] = "CAROUSEL";
    MediaType["UNDEFINED"] = "UNDEFINED";
})(MediaType || (MediaType = {}));


/***/ }),

/***/ "./src/modules/FeedScanner.ts":
/*!************************************!*\
  !*** ./src/modules/FeedScanner.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeedScanner: () => (/* binding */ FeedScanner)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");

class FeedScanner {
    getName() {
        return "FeedScanner";
    }
    /** @suppress {uselessCode} */
    async execute(program, callback) {
        /* =====================================
         =              FeedScanner            =
         ==================================== */
        try {
            // Define default variables
            // All grabed feed posts
            let $articles;
            // Article
            let $article;
            // Scanner begins
            $articles = document.getElementsByTagName("article");
            let mediaElInfos = [];
            // Find needed post
            for (let i1 = 0; i1 < $articles.length; i1++) {
                let mediaEl = $articles[i1];
                if (mediaEl != null && typeof mediaEl.getBoundingClientRect() != null) {
                    let elemVisiblePercentage = (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.getElementInViewPercentage)(mediaEl);
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage });
                }
                else {
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage: 0 });
                }
            }
            let objMax = mediaElInfos.reduce((max, current) => max.elemVisiblePercentage > current.elemVisiblePercentage ? max : current);
            $article = $articles[objMax.i1];
            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                // DON'T MESS WITH ME INSTA!
                // If any adblocker active dont grab it
                if ($article.getBoundingClientRect().height < 40) {
                    return;
                }
                let v = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.generateModalBody)($article, program);
                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedIndex: v.selectedIndex,
                    userName: v.userName
                };
            }
            callback(program);
        }
        catch (e) {
            //console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e)
            console.error(this.getName() + "()", e);
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            };
            callback(program);
        }
        /* =====  End of FeedScanner ======*/
    }
}


/***/ }),

/***/ "./src/modules/MediaScanner.ts":
/*!*************************************!*\
  !*** ./src/modules/MediaScanner.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaScanner: () => (/* binding */ MediaScanner)
/* harmony export */ });
/* harmony import */ var _components_Interconnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Interconnect */ "./src/components/Interconnect.ts");
/* harmony import */ var _FeedScanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedScanner */ "./src/modules/FeedScanner.ts");
/* harmony import */ var _PostReelScanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PostReelScanner */ "./src/modules/PostReelScanner.ts");
/* harmony import */ var _ReelsScanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReelsScanner */ "./src/modules/ReelsScanner.ts");
/* harmony import */ var _StoriesScanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StoriesScanner */ "./src/modules/StoriesScanner.ts");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");






class MediaScanner {
    getName() {
        return "MediaScanner";
    }
    /** @suppress {uselessCode} */
    async execute(program, callback) {
        /* =====================================
         =         MediaScanner                =
         ==================================== */
        try {
            // Scanner begins
            // Cancel execution when modal already opened
            const appRunning = document.querySelector("div." + program.NAME + "-modal-overlay." + program.NAME + "-modal-visible." + program.NAME + "-modal-show");
            if (appRunning) {
                let iModal = document.querySelector("." + program.NAME + "-modal");
                iModal.style.animation = "horizontal-shaking 0.25s linear infinite";
                // Stop shaking
                setTimeout(function () {
                    iModal.style.animation = null;
                }, 1000);
                return;
            }
            // Remove previous executed bookmarklet stuff
            const idsToRemove = [
                program.NAME + '-cssGeneral',
                program.NAME + '-cssSlideOn',
                program.NAME + '-cssCarouselSlider'
            ];
            // Call the function to remove <style> tags from the entire DOM
            (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_5__.removeStyleTagsWithIDs)(idsToRemove);
            // Create new needed stuff
            const generalStyle = document.createElement("style");
            generalStyle.id = program.NAME + "-cssGeneral";
            // Set the innerHTML property to the JavaScript code
            generalStyle.innerHTML = _components_Interconnect__WEBPACK_IMPORTED_MODULE_0__.cssGeneral;
            // Append the script element to the document
            document.body.appendChild(generalStyle);
            // Switch css
            const switchStyle = document.createElement("style");
            switchStyle.id = program.NAME + "-cssSlideOn";
            // Set the innerHTML property to the JavaScript code
            switchStyle.innerHTML = _components_Interconnect__WEBPACK_IMPORTED_MODULE_0__.cssSlideOn;
            // Append the script element to the document
            document.body.appendChild(switchStyle);
            const carouselSliderStyle = document.createElement("style");
            carouselSliderStyle.id = program.NAME + "-cssCarouselSlider";
            // Set the innerHTML property to the JavaScript code
            carouselSliderStyle.innerHTML = _components_Interconnect__WEBPACK_IMPORTED_MODULE_0__.cssCarouselSlider;
            // Append the script element to the document
            document.body.appendChild(carouselSliderStyle);
            // Handle specific modules
            // Detect profile root path
            if (program.regexProfilePath.test(program.path)) {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaInfo: undefined,
                    modalBody: undefined,
                    selectedIndex: undefined,
                    userName: undefined
                };
                callback(program);
                return;
            }
            // Detect story video/image
            if (program.regexStoriesURI.test(program.path)) {
                new _StoriesScanner__WEBPACK_IMPORTED_MODULE_4__.StoriesScanner().execute(program, function (scannerProgram) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new _StoriesScanner__WEBPACK_IMPORTED_MODULE_4__.StoriesScanner().getName();
                    }
                    callback(scannerProgram);
                });
            }
            // Detect feed posts
            if (program.regexRootPath.test(program.path)) {
                new _FeedScanner__WEBPACK_IMPORTED_MODULE_1__.FeedScanner().execute(program, function (scannerProgram) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new _FeedScanner__WEBPACK_IMPORTED_MODULE_1__.FeedScanner().getName();
                    }
                    callback(scannerProgram);
                });
            }
            // Detect reels
            if (program.regexReelsURI.test(program.path)) {
                new _ReelsScanner__WEBPACK_IMPORTED_MODULE_3__.ReelsScanner().execute(program, function (scannerProgram) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new _ReelsScanner__WEBPACK_IMPORTED_MODULE_3__.ReelsScanner().getName();
                    }
                    callback(scannerProgram);
                });
            }
            // Detect modal posts, reels
            if (program.regexPostPath.test(program.path) || program.regexReelURI.test(program.path)) {
                new _PostReelScanner__WEBPACK_IMPORTED_MODULE_2__.PostReelScanner().execute(program, function (scannerProgram) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new _PostReelScanner__WEBPACK_IMPORTED_MODULE_2__.PostReelScanner().getName();
                    }
                    callback(scannerProgram);
                });
            }
            return;
        }
        catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e);
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            };
            callback(program);
        }
        /* =====  End of MediaScanner ======*/
    }
}


/***/ }),

/***/ "./src/modules/PostReelScanner.ts":
/*!****************************************!*\
  !*** ./src/modules/PostReelScanner.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostReelScanner: () => (/* binding */ PostReelScanner)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");

class PostReelScanner {
    getName() {
        return "PostReelScanner";
    }
    /** @suppress {uselessCode} */
    async execute(program, callback) {
        /* =====================================
         =              PostScanner            =
         ==================================== */
        try {
            // Define default variables
            // Article
            let $article;
            // Scanner begins
            if (document.querySelector('div[role="dialog"] article')) {
                $article = document.querySelector('div[role="dialog"] article');
            }
            else {
                $article = document.querySelector("section main > div > :first-child > :first-child");
            }
            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                let v = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.generateModalBody)($article, program);
                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedIndex: v.selectedIndex,
                    userName: v.userName
                };
            }
            callback(program);
        }
        catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e);
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            };
            callback(program);
        }
        /* =====  End of PostScanner ======*/
    }
}


/***/ }),

/***/ "./src/modules/ReelsScanner.ts":
/*!*************************************!*\
  !*** ./src/modules/ReelsScanner.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReelsScanner: () => (/* binding */ ReelsScanner)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");

class ReelsScanner {
    getName() {
        return "ReelsScanner";
    }
    getPostId() {
        const url = window.location.href;
        const regex = /\/p\/([a-zA-Z0-9_-]+)/;
        const postId = url.match(regex)?.[1];
        return postId;
    }
    /** @suppress {uselessCode} */
    async execute(program, callback) {
        /* =====================================
         =        ReelsScanner                 =
         ==================================== */
        try {
            // Define default variables
            let modalBody = "";
            // All grabed feed posts
            let $articles;
            // Article
            let $article;
            // Scanner begins
            $articles = document.querySelectorAll('section > main > div > div');
            $articles = Array.from($articles).filter(function (element) {
                return element.children.length > 0;
            });
            let mediaElInfos = [];
            // Find needed post
            for (let i1 = 0; i1 < $articles.length; i1++) {
                let mediaEl = $articles[i1];
                if (mediaEl != null && typeof mediaEl.getBoundingClientRect() != null) {
                    let elemVisiblePercentage = (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.getElementInViewPercentage)(mediaEl);
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage });
                }
                else {
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage: 0 });
                }
            }
            let objMax = mediaElInfos.reduce((max, current) => max.elemVisiblePercentage > current.elemVisiblePercentage ? max : current);
            $article = $articles[objMax.i1];
            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                let v = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.generateModalBody)($article, program);
                modalBody += v.modalBody;
                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: modalBody,
                    selectedIndex: v.selectedIndex,
                    userName: v.userName
                };
            }
            callback(program);
        }
        catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e);
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            };
            callback(program);
        }
        /* =====  End of ReelsScanner ======*/
    }
}


/***/ }),

/***/ "./src/modules/StoriesScanner.ts":
/*!***************************************!*\
  !*** ./src/modules/StoriesScanner.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoriesScanner: () => (/* binding */ StoriesScanner)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");

class StoriesScanner {
    getName() {
        return "StoriesScanner";
    }
    pauseCurrentStory(el) {
        // Trigger a click event on the pause button if it exists
        let svgElement = el.querySelector("svg[viewBox='0 0 48 48']");
        if (svgElement !== null) {
            if (typeof svgElement.click === "function") {
                svgElement.click();
            }
            else {
                // Alternative approach for older browsers
                const clickEvent = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                svgElement.dispatchEvent(clickEvent);
            }
        }
    }
    /** @suppress {uselessCode} */
    async execute(program, callback) {
        /* =====================================
         =            StoriesScanner           =
         ==================================== */
        try {
            // Define default variables
            let modalBody = "";
            // Container
            let $container = document.querySelector("body > div:nth-child(3)");
            // Scanner begins
            if ($container) {
                // Detect right frontend
                let multipleStoriesCount = $container.querySelector("section > div > div").childElementCount;
                // Specific selector for each frontend
                if (multipleStoriesCount > 1) {
                    let stories = $container.querySelector("section > div > div").childNodes;
                    for (let i = 0; i < stories.length; i++) {
                        let transformStyle = stories[i].style.transform;
                        if (stories[i].childElementCount > 0 && transformStyle.includes("scale(1)")) {
                            // Pause any playing videos before show modal
                            const pauseSettings = localStorage.getItem(program.NAME + '_setting2_checkbox');
                            if (pauseSettings !== null && pauseSettings !== undefined && pauseSettings === 'true') {
                                this.pauseCurrentStory(stories[i]);
                            }
                            let v = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.generateModalBody)(stories[i], program);
                            modalBody += v.modalBody;
                            program.foundMediaObj = {
                                found: v.found,
                                mediaType: v.mediaType,
                                mediaInfo: v.mediaInfo,
                                modalBody: modalBody,
                                selectedIndex: v.selectedIndex,
                                userName: v.userName
                            };
                            break;
                        }
                    }
                }
                else {
                    let story = $container.querySelectorAll("section");
                    // Pause any playing videos before show modal
                    const pauseSettings = localStorage.getItem(program.NAME + '_setting2_checkbox');
                    if (pauseSettings !== null && pauseSettings !== undefined && pauseSettings === 'true') {
                        this.pauseCurrentStory(story[0]);
                    }
                    let v = await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.generateModalBody)(story, program);
                    modalBody += v.modalBody;
                    program.foundMediaObj = {
                        found: v.found,
                        mediaType: v.mediaType,
                        mediaInfo: v.mediaInfo,
                        modalBody: modalBody,
                        selectedIndex: v.selectedIndex,
                        userName: v.userName
                    };
                }
            }
            else {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaInfo: undefined,
                    modalBody: undefined,
                    selectedIndex: undefined,
                    userName: undefined
                };
            }
            callback(program);
        }
        catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e);
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            };
            callback(program);
        }
        /* =====  End of StoriesScanner ======*/
    }
}


/***/ }),

/***/ "./src/modules/Update.ts":
/*!*******************************!*\
  !*** ./src/modules/Update.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Modal */ "./src/components/Modal.ts");
/* harmony import */ var _helpers_localize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/localize */ "./src/helpers/localize.ts");



function informOutdatedVersionInDevConsole(data) {
    console.warn((0,_helpers_localize__WEBPACK_IMPORTED_MODULE_2__["default"])('modules.update@consoleWarnOutdatedInfo'));
    console.warn((0,_helpers_localize__WEBPACK_IMPORTED_MODULE_2__["default"])('modules.update@consoleWarnOutdatedInfoVersions')
        .replace('${data.version}', data.version)
        .replace('${data.onlineVersion}', data.onlineVersion));
}
function determineIfGetUpdateIsNecessary(localVersion) {
    const data = window.localStorage.getItem(`${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}`);
    if (typeof data === 'string') {
        const _data = JSON.parse(data);
        // Sync installed version with localStorage
        window.localStorage.setItem(`${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}`, JSON.stringify({
            version: localVersion,
            onlineVersion: _data.onlineVersion,
            lastVerification: _data.lastVerification,
            dateExpiration: _data.dateExpiration
        }));
        // compare versions cached
        const onlineVersion = new Date(_data.onlineVersion);
        const installedVersion = new Date(_data.onlineVersion);
        if (onlineVersion > installedVersion) {
            informOutdatedVersionInDevConsole(_data);
        }
        // compare date now with expiration
        if (Date.now() > _data.dateExpiration) {
            return true; // must have update new informations from github
        }
        else {
            return false; // have localStorage and is on the date
        }
    }
    else {
        return true; // dont have localStorage
    }
}
async function update(localVersion) {
    if (determineIfGetUpdateIsNecessary(localVersion)) {
        const response = await fetch('https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables={%22id%22:45039295328,%22first%22:100}');
        const respJson = await response.json();
        const changelog = respJson.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text;
        const changelogSplitted = changelog.split("::");
        const changelogNewReleaseDate = changelogSplitted[0];
        const changelogText = changelogSplitted[1];
        // Generate unordered list
        const sentences = changelogText.split(/[.!?]/);
        let ul = '<ul style="padding: 20px;">';
        sentences.forEach((sentence) => {
            if (sentence.trim() !== '') {
                ul += `<li>${sentence.trim()}</li>`;
            }
        });
        ul += '</ul>';
        const onlineVersion = changelogNewReleaseDate;
        // verify update each 2 days
        const limitDate = new Date();
        limitDate.setTime(limitDate.getTime() + 6 * 60 * 60 * 1000);
        window.localStorage.setItem(`${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}`, JSON.stringify({
            version: localVersion,
            onlineVersion,
            lastVerification: Date.now(),
            dateExpiration: limitDate.valueOf()
        }));
        console.info((0,_helpers_localize__WEBPACK_IMPORTED_MODULE_2__["default"])('modules.update@determineIfGetUpdateIsNecessary_updated'));
        // if instagram post had a update, notify in console and in a modal
        const _onlineVersion = new Date(onlineVersion);
        const installedVersion = new Date(localVersion);
        if (_onlineVersion > installedVersion) {
            new _components_Modal__WEBPACK_IMPORTED_MODULE_1__.Modal({
                heading: [
                    `<h5>
                        <span class="header-text-left">[${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}]</span>
                        <span class="header-text-right" style="margin-right: 0">v${localVersion}</span>
                    </h5>
                    `
                ],
                body: [
                    `<div style='display: block;border: 2px solid rgb(0 0 0 / 70%);border-left: none;border-right: none;border-top: none;padding: 5px;font-variant: small-caps;font-weight: 900;font-size: 16px;'>Es ist ein neues Update verfügbar <span style='float:right'>v${onlineVersion}</span></div><div style='text-align:left'><h2 style='font-weight: bold;'><br>Changelog</h2>${ul}</div><a href='http://thinkbig-company.github.io/${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}' target='_blank' onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='initial'" style='display: block; text-align: center;text-decoration: initial; margin: 0px auto; padding: 10px; color: black; border-style: solid; border-image-slice: 1; border-width: 3px; border-image-source: linear-gradient(to left, rgb(213, 58, 157), rgb(116, 58, 213));'>${(0,_helpers_localize__WEBPACK_IMPORTED_MODULE_2__["default"])('modules.update@determineIfGetUpdateIsNecessary_@load_update')}</a>`,
                ],
                buttonList: [
                    {
                        active: true,
                        text: 'Ok',
                    },
                ],
            }).open();
            const data = JSON.parse(window.localStorage.getItem(`${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}`));
            informOutdatedVersionInDevConsole(data);
        }
        else {
            console.info(window.localStorage.getItem(`${___WEBPACK_IMPORTED_MODULE_0__.program.NAME}`));
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (update);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map