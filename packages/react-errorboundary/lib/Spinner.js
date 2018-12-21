"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_1 = require("./styled");
var Spinner = function () { return (React.createElement(Wrapper, null,
    React.createElement(SpinnerNode, null))); };
var rotation = styled_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n"])));
var Wrapper = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\theight: 36px;\n\tleft: 50%;\n\tposition: absolute;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\twidth: 36px;\n\tz-index: 10;\n"], ["\n\theight: 36px;\n\tleft: 50%;\n\tposition: absolute;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\twidth: 36px;\n\tz-index: 10;\n"])));
var SpinnerNode = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tposition: absolute;\n\tdisplay: inline-block;\n\theight: 24px;\n\twidth: 24px;\n\tvertical-align: middle;\n\n\tanimation: ", " 0.6s infinite linear;\n\n\tborder-radius: 100%;\n\tborder-bottom: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-left: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-right: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-top: 6px solid rgba(150, 150, 150, 0.8);\n"], ["\n\tposition: absolute;\n\tdisplay: inline-block;\n\theight: 24px;\n\twidth: 24px;\n\tvertical-align: middle;\n\n\tanimation: ", " 0.6s infinite linear;\n\n\tborder-radius: 100%;\n\tborder-bottom: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-left: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-right: 6px solid rgba(150, 150, 150, 0.15);\n\tborder-top: 6px solid rgba(150, 150, 150, 0.8);\n"])), rotation);
exports.default = Spinner;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Spinner.js.map