"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var tasks = [];
var id = 1;
exports.Task = {
    create: function (task) {
        var newTask = __assign(__assign({}, task), { id: id++ });
        tasks.push(newTask);
        return newTask;
    },
    update: function (id, data) {
        var index = tasks.findIndex(function (task) { return task.id === id; });
        if (index !== 1) {
            tasks[index] = __assign(__assign({}, tasks[index]), data);
            return tasks;
        }
        return null;
    },
    delete: function (id) {
        var index = tasks.findIndex(function (task) { return task.id === id; });
        if (index !== -1) {
            return tasks.splice(index, 1)[0];
        }
        return null;
    },
    getAll: function () {
        return __spreadArray([], tasks, true);
    },
    getById: function (id) {
        return tasks.find(function (task) { return task.id === id; });
    },
};
