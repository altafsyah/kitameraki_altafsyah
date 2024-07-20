"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleTaskRoutes;
var url = require("url");
var task_controller_1 = require("../controllers/task-controller");
var helper_1 = require("../helper");
function handleTaskRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedURL, path, trimmedPath, method, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedURL = url.parse(req.url);
                    path = parsedURL.pathname;
                    trimmedPath = path.replace(/^\/+|\/+$/g, "");
                    method = req.method;
                    if (!(trimmedPath === "tasks")) return [3 /*break*/, 1];
                    if (method === "GET") {
                        (0, task_controller_1.getTasks)(req, res);
                    }
                    else if (method === "POST") {
                        (0, task_controller_1.createTask)(req, res);
                    }
                    else {
                        (0, helper_1.notFound)(res, "Not Found");
                    }
                    return [3 /*break*/, 5];
                case 1:
                    if (!trimmedPath.startsWith("tasks/")) return [3 /*break*/, 5];
                    id = parseInt(trimmedPath.split("/")[1]);
                    if (!(req.method === "GET")) return [3 /*break*/, 2];
                    (0, task_controller_1.getTaskById)(req, res, id);
                    return [3 /*break*/, 5];
                case 2:
                    if (!(req.method === "PUT")) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, task_controller_1.updateTask)(req, res, id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    if (req.method === "DELETE") {
                        (0, task_controller_1.deleteTask)(res, id);
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
