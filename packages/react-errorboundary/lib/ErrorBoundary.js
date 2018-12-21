"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var React = require("react");
var styled_1 = require("./styled");
var Spinner_1 = require("./Spinner");
require("react-json-pretty/JSONPretty.monikai.styl");
var JSONPretty = require("react-json-pretty");
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: null,
            errorInfo: null
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.error) {
            return (React.createElement(ErrorContainer, null,
                React.createElement("h1", null, "Error"),
                React.createElement("p", null, this.state.error.toString()),
                React.createElement(React.Suspense, { fallback: React.createElement(Spinner_1.default, null) },
                    React.createElement(JSONPretty, { json: JSON.stringify(this.state.errorInfo) }))));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
exports.default = ErrorBoundary;
var ErrorContainer = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tcolor: white;\n\tbackground: #0f202d;\n\tfont-family: 'Source Code Pro', monospace;\n\th1,\n\tp {\n\t\tfont-family: 'Open Sans', sans-serif;\n\t\tcolor: #f25c54;\n\t}\n"], ["\n\tcolor: white;\n\tbackground: #0f202d;\n\tfont-family: 'Source Code Pro', monospace;\n\th1,\n\tp {\n\t\tfont-family: 'Open Sans', sans-serif;\n\t\tcolor: #f25c54;\n\t}\n"])));
var templateObject_1;
//# sourceMappingURL=ErrorBoundary.js.map