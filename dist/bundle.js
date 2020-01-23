/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Actor.ts":
/*!**********************!*\
  !*** ./src/Actor.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var actionsToRadians = {
    Up: -Math.PI / 2,
    Down: Math.PI / 2,
    Left: Math.PI,
    Right: 0.0
};
var Actor = /** @class */ (function () {
    function Actor(_grid) {
        this._grid = _grid;
        this._state = _grid.startNode;
    }
    Actor.prototype.actions = function () {
        return this._grid.getActions(this._state.x, this._state.y);
    };
    Object.defineProperty(Actor.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Actor.prototype.takeAction = function (action) {
        this._lastActionWithState = {
            last: this._state,
            action: action
        };
        this._state = action.node;
    };
    Actor.prototype.render = function (context) {
        var _a = context.canvas, width = _a.width, height = _a.height;
        var cellWidth = width / this._grid.lengthOfSides;
        var cellHeight = height / this._grid.lengthOfSides;
        context.save();
        context.translate(cellWidth * this._state.x + cellWidth / 2, cellHeight * this._state.y + cellHeight / 2);
        context.fillStyle = "rgba(0,0,0,0.5)";
        context.beginPath();
        context.arc(0, 0, 6.25, 0, 360);
        context.fill();
        context.restore();
        if (this._lastActionWithState !== null) {
            var _b = this._lastActionWithState, _c = _b.last, lastX = _c.x, lastY = _c.y, actionName = _b.action.action;
            context.save();
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.translate(cellWidth * lastX + cellWidth / 2, cellHeight * lastY + cellHeight / 2);
            context.rotate(actionsToRadians[actionName]);
            context.beginPath();
            context.moveTo(5, -1);
            context.lineTo(12.5, -1);
            context.lineTo(12.5, -5);
            context.lineTo(20, 0);
            context.lineTo(12.5, 5);
            context.lineTo(12.5, 1);
            context.lineTo(5, 1);
            context.lineTo(5, -1);
            context.fill();
            context.restore();
        }
    };
    return Actor;
}());
/* harmony default export */ __webpack_exports__["default"] = (Actor);


/***/ }),

/***/ "./src/Grid.ts":
/*!*********************!*\
  !*** ./src/Grid.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function nodeFromTemplate(template, index, lengthOfSides) {
    return {
        wall: template === "W",
        x: index % lengthOfSides,
        y: Math.floor(index / lengthOfSides),
        start: template === "S",
        destination: template === "D"
    };
}
var Grid = /** @class */ (function () {
    function Grid(template) {
        var _this = this;
        this._grid = [];
        this._length = 0;
        template = template.replace(/\s+/gim, "");
        this._length = Math.floor(Math.sqrt(template.length));
        this._grid = template.split("").map(function (t, i) { return nodeFromTemplate(t, i, _this._length); });
    }
    Grid.prototype.getNode = function (x, y) {
        return this._grid[this._length * y + x];
    };
    Grid.prototype.getActions = function (x, y) {
        return [
            [this.getNode(x - 1, y), "Left"],
            [this.getNode(x, y - 1), "Up"],
            [this.getNode(x + 1, y), "Right"],
            [this.getNode(x, y + 1), "Down"]
        ]
            .filter(function (_a) {
            var node = _a[0], action = _a[1];
            return node !== null && node.wall === false;
        })
            .map(function (_a) {
            var node = _a[0], action = _a[1];
            return ({ node: node, action: action });
        });
    };
    Object.defineProperty(Grid.prototype, "lengthOfSides", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "grid", {
        get: function () {
            return this._grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "startNode", {
        get: function () {
            return this._grid.filter(function (x) { return x.start; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "destinationNode", {
        get: function () {
            return this._grid.filter(function (x) { return x.destination; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.getNodeAtPixel = function (x, y, context) {
        var _a = this.getCellDimensions(context), cellWidth = _a.cellWidth, cellHeight = _a.cellHeight;
        var cellX = Math.floor(x / cellWidth), cellY = Math.floor(y / cellHeight);
        return this.getNode(cellX, cellY);
    };
    Grid.prototype.render = function (context) {
        var _a = this.getCellDimensions(context), cellWidth = _a.cellWidth, cellHeight = _a.cellHeight;
        for (var y = 0; y < this.lengthOfSides; ++y)
            for (var x = 0; x < this.lengthOfSides; ++x) {
                context.save();
                context.translate(x * cellWidth, y * cellHeight);
                context.strokeStyle = context.fillStyle = "#555";
                context.lineWidth = 2;
                var node = this.getNode(x, y);
                if (node == null)
                    continue;
                context.strokeRect(0, 0, cellWidth, cellHeight);
                if (node.wall) {
                    context.fillRect(0, 0, cellWidth, cellHeight);
                }
                if (node.start) {
                    context.strokeStyle = "green";
                    context.lineWidth = 4;
                    context.beginPath();
                    context.arc(cellWidth / 2, cellHeight / 2, cellWidth / 4, 0, 360);
                    context.stroke();
                }
                if (node.destination) {
                    context.lineWidth = 4;
                    context.strokeStyle = "red";
                    context.beginPath();
                    context.arc(cellWidth / 2, cellHeight / 2, cellWidth / 4, 0, 360);
                    context.stroke();
                }
                context.restore();
            }
    };
    Grid.prototype.getCellDimensions = function (context) {
        var _a = context.canvas, width = _a.width, height = _a.height;
        var cellWidth = width / this.lengthOfSides;
        var cellHeight = height / this.lengthOfSides;
        return { cellWidth: cellWidth, cellHeight: cellHeight };
    };
    return Grid;
}());
/* harmony default export */ __webpack_exports__["default"] = (Grid);


/***/ }),

/***/ "./src/Policy.ts":
/*!***********************!*\
  !*** ./src/Policy.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Policy = /** @class */ (function () {
    function Policy(_values) {
        this._values = _values;
        this.explorationFactor = 0.01;
        this.discount = 0.95;
        this.learningRate = 0.1;
    }
    Policy.fromString = function (localStorageData, size) {
        try {
            var values = JSON.parse(localStorageData);
            if (!values)
                throw "Cannot parse data!";
            return new Policy(values);
        }
        catch (e) {
            return this.fromSeed(function () { return 0; }, size);
        }
    };
    Policy.prototype.serialize = function () {
        return JSON.stringify(this._values);
    };
    Policy.prototype.value = function (state) {
        var x = state.x, y = state.y;
        return this._values[x][y];
    };
    Policy.prototype.setValue = function (state, value) {
        var x = state.x, y = state.y;
        this._values[x][y] = value;
    };
    Policy.prototype.processStep = function (fromState, toState, reward) {
        var newValue = this.value(fromState) +
            this.learningRate * (reward + this.discount * this.value(toState) - this.value(fromState));
        this.setValue(fromState, newValue);
    };
    Policy.prototype.evaluate = function (actions) {
        var _this = this;
        if (actions.length === 0)
            return null;
        if (Math.random() < this.explorationFactor) {
            console.log("exploring!");
            return actions[Math.floor(Math.random() * actions.length)];
        }
        var maxAction = actions[0];
        actions.forEach(function (a) {
            if (_this.value(a.node) > _this.value(maxAction.node)) {
                maxAction = a;
            }
        });
        return maxAction;
    };
    Policy.fromSeed = function (seed, size) {
        var stateValues = [];
        for (var i = 0; i < size; ++i) {
            stateValues[i] = [];
            for (var j = 0; j < size; ++j) {
                stateValues[i][j] = seed();
            }
        }
        return new Policy(stateValues);
    };
    return Policy;
}());
/* harmony default export */ __webpack_exports__["default"] = (Policy);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid */ "./src/Grid.ts");
/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Actor */ "./src/Actor.ts");
/* harmony import */ var _Policy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Policy */ "./src/Policy.ts");



var grid, ctx, agent, policy;
var generationP = document.querySelector('#generation');
var cumulativeReward = 0, generation = 0;
function addListener(id, onChange) {
    var valueSpan = document.querySelector("label[for = \"" + id.slice(1) + "\"] > .value");
    document.querySelector(id).addEventListener('change', function (e) {
        var element = e.target;
        var value = parseInt(element.value, 10) / 100.0;
        valueSpan.innerText = element.value + "%";
        onChange(value);
    });
}
function bootstrap() {
    var canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    var template = "\n   WWWWWWWWWW\n   W........W\n   W.W..WW..W\n   WSW..W..WW\n   WWWWWW...W\n   W......W.W\n   W.WW...W.W\n   W..W.WW..W\n   W.......DW\n   WWWWWWWWWW";
    grid = new _Grid__WEBPACK_IMPORTED_MODULE_0__["default"](template.replace(/\s+/gim, ''));
    agent = new _Actor__WEBPACK_IMPORTED_MODULE_1__["default"](grid);
    var serializedPolicy = localStorage.getItem('policy');
    if (serializedPolicy) {
        policy = _Policy__WEBPACK_IMPORTED_MODULE_2__["default"].fromString(serializedPolicy, grid.lengthOfSides);
    }
    else {
        policy = _Policy__WEBPACK_IMPORTED_MODULE_2__["default"].fromSeed(function () { return 0.5; }, grid.lengthOfSides);
    }
    document.querySelector('#reset-policy').addEventListener('click', function () {
        policy = _Policy__WEBPACK_IMPORTED_MODULE_2__["default"].fromSeed(function () { return 0.5; }, grid.lengthOfSides);
        reset();
    });
    canvas.addEventListener('click', function (e) {
        var node = grid.getNodeAtPixel(e.offsetX, e.offsetY, ctx);
        if (node != null) {
            node.wall = !node.wall;
        }
        reset();
    });
    addListener('#learning-rate', function (val) { return (policy.learningRate = val); });
    addListener('#exploration-factor', function (val) { return (policy.explorationFactor = val); });
    addListener('#discount', function (val) { return (policy.discount = val); });
    requestAnimationFrame(loop);
}
function reward(state, action) {
    if (action == null)
        return -2.0;
    if (action.node === grid.destinationNode) {
        return 1.0;
    }
    return -1.0;
}
function reset() {
    generation = 0;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}
function render() {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    grid.render(ctx);
    agent.render(ctx);
}
function update() {
    if (agent.state === grid.destinationNode) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        console.log('Found end, cumulative reward = ' + cumulativeReward);
        agent.takeAction({ action: '', node: grid.startNode });
        cumulativeReward = 0;
        generationP.innerText = "Generation: " + generation++;
        localStorage.setItem('policy', policy.serialize());
        return;
    }
    var actions = agent.actions();
    var prevState = agent.state;
    var pickedAction = policy.evaluate(actions);
    if (pickedAction != null) {
        agent.takeAction(pickedAction);
    }
    var nextState = agent.state;
    var stepReward = reward(agent.state, pickedAction);
    cumulativeReward += stepReward;
    policy.processStep(prevState, nextState, stepReward);
}
document.addEventListener('DOMContentLoaded', bootstrap);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9Qb2xpY3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRUE7QUFBQSxJQUFNLGdCQUFnQixHQUE4QjtJQUNsRCxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDYixLQUFLLEVBQUUsR0FBRztDQUNYLENBQUM7QUFFRjtJQVFFLGVBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxD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LENBQUM7SUFFOUIsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7UUFDeEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQztJQUVELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFFOUIsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFckQsZ0JBQWdCLElBQUksVUFBVSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IEdyaWQsIHsgR3JpZE5vZGUsIEdyaWRBY3Rpb24gfSBmcm9tIFwiLi9HcmlkXCI7XG5pbXBvcnQgQWN0b3JTdGF0ZSBmcm9tIFwiLi9BY3RvclN0YXRlXCI7XG5cbmNvbnN0IGFjdGlvbnNUb1JhZGlhbnM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gIFVwOiAtTWF0aC5QSSAvIDIsXG4gIERvd246IE1hdGguUEkgLyAyLFxuICBMZWZ0OiBNYXRoLlBJLFxuICBSaWdodDogMC4wXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvciB7XG4gIHByaXZhdGUgX3N0YXRlOiBBY3RvclN0YXRlO1xuXG4gIHByaXZhdGUgX2xhc3RBY3Rpb25XaXRoU3RhdGU6IHtcbiAgICBsYXN0OiBBY3RvclN0YXRlO1xuICAgIGFjdGlvbjogR3JpZEFjdGlvbjtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ncmlkOiBHcmlkKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBfZ3JpZC5zdGFydE5vZGU7XG4gIH1cblxuICBhY3Rpb25zKCk6IEdyaWRBY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0QWN0aW9ucyh0aGlzLl9zdGF0ZS54LCB0aGlzLl9zdGF0ZS55KTtcbiAgfVxuXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICB0YWtlQWN0aW9uKGFjdGlvbjogR3JpZEFjdGlvbikge1xuICAgIHRoaXMuX2xhc3RBY3Rpb25XaXRoU3RhdGUgPSB7XG4gICAgICBsYXN0OiB0aGlzLl9zdGF0ZSxcbiAgICAgIGFjdGlvblxuICAgIH07XG4gICAgdGhpcy5fc3RhdGUgPSBhY3Rpb24ubm9kZTtcbiAgfVxuXG4gIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNvbnRleHQuY2FudmFzO1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IHdpZHRoIC8gdGhpcy5fZ3JpZC5sZW5ndGhPZlNpZGVzO1xuICAgIGNvbnN0IGNlbGxIZWlnaHQgPSBoZWlnaHQgLyB0aGlzLl9ncmlkLmxlbmd0aE9mU2lkZXM7XG5cbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShcbiAgICAgIGNlbGxXaWR0aCAqIHRoaXMuX3N0YXRlLnggKyBjZWxsV2lkdGggLyAyLFxuICAgICAgY2VsbEhlaWdodCAqIHRoaXMuX3N0YXRlLnkgKyBjZWxsSGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmMoMCwgMCwgNi4yNSwgMCwgMzYwKTtcblxuICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIGlmICh0aGlzLl9sYXN0QWN0aW9uV2l0aFN0YXRlICE9PSBudWxsKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxhc3Q6IHsgeDogbGFzdFgsIHk6IGxhc3RZIH0sXG4gICAgICAgIGFjdGlvbjogeyBhY3Rpb246IGFjdGlvbk5hbWUgfVxuICAgICAgfSA9IHRoaXMuX2xhc3RBY3Rpb25XaXRoU3RhdGU7XG5cbiAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgICAgY29udGV4dC50cmFuc2xhdGUoY2VsbFdpZHRoICogbGFzdFggKyBjZWxsV2lkdGggLyAyLCBjZWxsSGVpZ2h0ICogbGFzdFkgKyBjZWxsSGVpZ2h0IC8gMik7XG4gICAgICBjb250ZXh0LnJvdGF0ZShhY3Rpb25zVG9SYWRpYW5zW2FjdGlvbk5hbWVdKTtcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgIGNvbnRleHQubW92ZVRvKDUsIC0xKTtcbiAgICAgIGNvbnRleHQubGluZVRvKDEyLjUsIC0xKTtcbiAgICAgIGNvbnRleHQubGluZVRvKDEyLjUsIC01KTtcbiAgICAgIGNvbnRleHQubGluZVRvKDIwLCAwKTtcbiAgICAgIGNvbnRleHQubGluZVRvKDEyLjUsIDUpO1xuICAgICAgY29udGV4dC5saW5lVG8oMTIuNSwgMSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyg1LCAxKTtcbiAgICAgIGNvbnRleHQubGluZVRvKDUsIC0xKTtcblxuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgR3JpZE5vZGUge1xuICB3YWxsOiBib29sZWFuO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgc3RhcnQ6IGJvb2xlYW47XG4gIGRlc3RpbmF0aW9uOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBY3Rpb24ge1xuICBub2RlOiBHcmlkTm9kZTtcbiAgYWN0aW9uOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIG5vZGVGcm9tVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgbGVuZ3RoT2ZTaWRlczogbnVtYmVyKTogR3JpZE5vZGUge1xuICByZXR1cm4ge1xuICAgIHdhbGw6IHRlbXBsYXRlID09PSBcIldcIixcbiAgICB4OiBpbmRleCAlIGxlbmd0aE9mU2lkZXMsXG4gICAgeTogTWF0aC5mbG9vcihpbmRleCAvIGxlbmd0aE9mU2lkZXMpLFxuICAgIHN0YXJ0OiB0ZW1wbGF0ZSA9PT0gXCJTXCIsXG4gICAgZGVzdGluYXRpb246IHRlbXBsYXRlID09PSBcIkRcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIHtcbiAgcHJpdmF0ZSBfZ3JpZDogR3JpZE5vZGVbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2xlbmd0aDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZTogc3RyaW5nKSB7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC9cXHMrL2dpbSwgXCJcIik7XG5cbiAgICB0aGlzLl9sZW5ndGggPSBNYXRoLmZsb29yKE1hdGguc3FydCh0ZW1wbGF0ZS5sZW5ndGgpKTtcblxuICAgIHRoaXMuX2dyaWQgPSB0ZW1wbGF0ZS5zcGxpdChcIlwiKS5tYXAoKHQsIGkpID0+IG5vZGVGcm9tVGVtcGxhdGUodCwgaSwgdGhpcy5fbGVuZ3RoKSk7XG4gIH1cblxuICBnZXROb2RlKHg6IG51bWJlciwgeTogbnVtYmVyKTogR3JpZE5vZGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZFt0aGlzLl9sZW5ndGggKiB5ICsgeF07XG4gIH1cblxuICBnZXRBY3Rpb25zKHg6IG51bWJlciwgeTogbnVtYmVyKTogR3JpZEFjdGlvbltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgW3RoaXMuZ2V0Tm9kZSh4IC0gMSwgeSksIFwiTGVmdFwiXSxcbiAgICAgIFt0aGlzLmdldE5vZGUoeCwgeSAtIDEpLCBcIlVwXCJdLFxuICAgICAgW3RoaXMuZ2V0Tm9kZSh4ICsgMSwgeSksIFwiUmlnaHRcIl0sXG4gICAgICBbdGhpcy5nZXROb2RlKHgsIHkgKyAxKSwgXCJEb3duXCJdXG4gICAgXVxuICAgICAgLmZpbHRlcigoW25vZGUsIGFjdGlvbl06IFtHcmlkTm9kZSB8IG51bGwsIHN0cmluZ10pID0+IG5vZGUgIT09IG51bGwgJiYgbm9kZS53YWxsID09PSBmYWxzZSlcbiAgICAgIC5tYXAoKFtub2RlLCBhY3Rpb25dOiBbR3JpZE5vZGUsIHN0cmluZ10pID0+ICh7IG5vZGUsIGFjdGlvbiB9KSk7XG4gIH1cblxuICBnZXQgbGVuZ3RoT2ZTaWRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG4gIH1cblxuICBnZXQgZ3JpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZDtcbiAgfVxuXG4gIGdldCBzdGFydE5vZGUoKTogR3JpZE5vZGUge1xuICAgIHJldHVybiB0aGlzLl9ncmlkLmZpbHRlcih4ID0+IHguc3RhcnQpWzBdO1xuICB9XG5cbiAgZ2V0IGRlc3RpbmF0aW9uTm9kZSgpOiBHcmlkTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZmlsdGVyKHggPT4geC5kZXN0aW5hdGlvbilbMF07XG4gIH1cblxuICBnZXROb2RlQXRQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogR3JpZE5vZGUge1xuICAgIGNvbnN0IHsgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0IH0gPSB0aGlzLmdldENlbGxEaW1lbnNpb25zKGNvbnRleHQpO1xuXG4gICAgY29uc3QgY2VsbFggPSBNYXRoLmZsb29yKHggLyBjZWxsV2lkdGgpLFxuICAgICAgY2VsbFkgPSBNYXRoLmZsb29yKHkgLyBjZWxsSGVpZ2h0KTtcblxuICAgIHJldHVybiB0aGlzLmdldE5vZGUoY2VsbFgsIGNlbGxZKTtcbiAgfVxuXG4gIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICBjb25zdCB7IGNlbGxXaWR0aCwgY2VsbEhlaWdodCB9ID0gdGhpcy5nZXRDZWxsRGltZW5zaW9ucyhjb250ZXh0KTtcblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5sZW5ndGhPZlNpZGVzOyArK3kpXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMubGVuZ3RoT2ZTaWRlczsgKyt4KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh4ICogY2VsbFdpZHRoLCB5ICogY2VsbEhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzU1NVwiO1xuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldE5vZGUoeCwgeSk7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpO1xuICAgICAgICBpZiAobm9kZS53YWxsKSB7XG4gICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuc3RhcnQpIHtcbiAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gNDtcbiAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGNvbnRleHQuYXJjKGNlbGxXaWR0aCAvIDIsIGNlbGxIZWlnaHQgLyAyLCBjZWxsV2lkdGggLyA0LCAwLCAzNjApO1xuICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuZGVzdGluYXRpb24pIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDQ7XG4gICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG5cbiAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgY29udGV4dC5hcmMoY2VsbFdpZHRoIC8gMiwgY2VsbEhlaWdodCAvIDIsIGNlbGxXaWR0aCAvIDQsIDAsIDM2MCk7XG4gICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2VsbERpbWVuc2lvbnMoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjb250ZXh0LmNhbnZhcztcbiAgICBjb25zdCBjZWxsV2lkdGggPSB3aWR0aCAvIHRoaXMubGVuZ3RoT2ZTaWRlcztcbiAgICBjb25zdCBjZWxsSGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy5sZW5ndGhPZlNpZGVzO1xuICAgIHJldHVybiB7IGNlbGxXaWR0aCwgY2VsbEhlaWdodCB9O1xuICB9XG59XG4iLCJpbXBvcnQgQWN0b3JTdGF0ZSBmcm9tIFwiLi9BY3RvclN0YXRlXCI7XG5pbXBvcnQgeyBHcmlkQWN0aW9uIH0gZnJvbSBcIi4vR3JpZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xpY3kge1xuICBwdWJsaWMgZXhwbG9yYXRpb25GYWN0b3IgPSAwLjAxO1xuICBwdWJsaWMgZGlzY291bnQgPSAwLjk1O1xuICBwdWJsaWMgbGVhcm5pbmdSYXRlID0gMC4xO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWVzOiBudW1iZXJbXVtdKSB7fVxuXG4gIHN0YXRpYyBmcm9tU3RyaW5nKGxvY2FsU3RvcmFnZURhdGE6IHN0cmluZywgc2l6ZTogbnVtYmVyKTogUG9saWN5IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VEYXRhKSBhcyBudW1iZXJbXVtdO1xuICAgICAgaWYgKCF2YWx1ZXMpIHRocm93IFwiQ2Fubm90IHBhcnNlIGRhdGEhXCI7XG5cbiAgICAgIHJldHVybiBuZXcgUG9saWN5KHZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZnJvbVNlZWQoKCkgPT4gMCwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgc2VyaWFsaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlcyk7XG4gIH1cblxuICB2YWx1ZShzdGF0ZTogQWN0b3JTdGF0ZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBzdGF0ZTtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzW3hdW3ldO1xuICB9XG5cbiAgc2V0VmFsdWUoc3RhdGU6IEFjdG9yU3RhdGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHN0YXRlO1xuICAgIHRoaXMuX3ZhbHVlc1t4XVt5XSA9IHZhbHVlO1xuICB9XG5cbiAgcHJvY2Vzc1N0ZXAoZnJvbVN0YXRlOiBBY3RvclN0YXRlLCB0b1N0YXRlOiBBY3RvclN0YXRlLCByZXdhcmQ6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld1ZhbHVlID1cbiAgICAgIHRoaXMudmFsdWUoZnJvbVN0YXRlKSArXG4gICAgICB0aGlzLmxlYXJuaW5nUmF0ZSAqIChyZXdhcmQgKyB0aGlzLmRpc2NvdW50ICogdGhpcy52YWx1ZSh0b1N0YXRlKSAtIHRoaXMudmFsdWUoZnJvbVN0YXRlKSk7XG5cbiAgICB0aGlzLnNldFZhbHVlKGZyb21TdGF0ZSwgbmV3VmFsdWUpO1xuICB9XG5cbiAgZXZhbHVhdGUoYWN0aW9uczogR3JpZEFjdGlvbltdKTogR3JpZEFjdGlvbiB7XG4gICAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5leHBsb3JhdGlvbkZhY3Rvcikge1xuICAgICAgY29uc29sZS5sb2coXCJleHBsb3JpbmchXCIpO1xuICAgICAgcmV0dXJuIGFjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWN0aW9ucy5sZW5ndGgpXTtcbiAgICB9XG5cbiAgICBsZXQgbWF4QWN0aW9uID0gYWN0aW9uc1swXTtcblxuICAgIGFjdGlvbnMuZm9yRWFjaChhID0+IHtcbiAgICAgIGlmICh0aGlzLnZhbHVlKGEubm9kZSkgPiB0aGlzLnZhbHVlKG1heEFjdGlvbi5ub2RlKSkge1xuICAgICAgICBtYXhBY3Rpb24gPSBhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1heEFjdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2VlZChzZWVkOiAoKSA9PiBudW1iZXIsIHNpemU6IG51bWJlcik6IFBvbGljeSB7XG4gICAgY29uc3Qgc3RhdGVWYWx1ZXM6IG51bWJlcltdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgc3RhdGVWYWx1ZXNbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XG4gICAgICAgIHN0YXRlVmFsdWVzW2ldW2pdID0gc2VlZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUG9saWN5KHN0YXRlVmFsdWVzKTtcbiAgfVxufVxuIiwiaW1wb3J0IEdyaWQsIHsgR3JpZEFjdGlvbiB9IGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgQWN0b3IgZnJvbSAnLi9BY3Rvcic7XG5pbXBvcnQgQWN0b3JTdGF0ZSBmcm9tICcuL0FjdG9yU3RhdGUnO1xuaW1wb3J0IFBvbGljeSBmcm9tICcuL1BvbGljeSc7XG5cbmxldCBncmlkOiBHcmlkLCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgYWdlbnQ6IEFjdG9yLCBwb2xpY3k6IFBvbGljeTtcblxuY29uc3QgZ2VuZXJhdGlvblAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2dlbmVyYXRpb24nLFxuKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcblxubGV0IGN1bXVsYXRpdmVSZXdhcmQgPSAwLFxuICBnZW5lcmF0aW9uID0gMDtcblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIoaWQ6IHN0cmluZywgb25DaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkKSB7XG4gIGNvbnN0IHZhbHVlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYGxhYmVsW2ZvciA9IFwiJHtpZC5zbGljZSgxKX1cIl0gPiAudmFsdWVgLFxuICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGVsZW1lbnQudmFsdWUsIDEwKSAvIDEwMC4wO1xuICAgIHZhbHVlU3Bhbi5pbm5lclRleHQgPSBgJHtlbGVtZW50LnZhbHVlfSVgO1xuICAgIG9uQ2hhbmdlKHZhbHVlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNvbnN0IHRlbXBsYXRlID0gYFxuICAgV1dXV1dXV1dXV1xuICAgVy4uLi4uLi4uV1xuICAgVy5XLi5XVy4uV1xuICAgV1NXLi5XLi5XV1xuICAgV1dXV1dXLi4uV1xuICAgVy4uLi4uLlcuV1xuICAgVy5XVy4uLlcuV1xuICAgVy4uVy5XVy4uV1xuICAgVy4uLi4uLi5EV1xuICAgV1dXV1dXV1dXV2A7XG5cbiAgZ3JpZCA9IG5ldyBHcmlkKHRlbXBsYXRlLnJlcGxhY2UoL1xccysvZ2ltLCAnJykpO1xuICBhZ2VudCA9IG5ldyBBY3RvcihncmlkKTtcblxuICBjb25zdCBzZXJpYWxpemVkUG9saWN5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BvbGljeScpO1xuXG4gIGlmIChzZXJpYWxpemVkUG9saWN5KSB7XG4gICAgcG9saWN5ID0gUG9saWN5LmZyb21TdHJpbmcoc2VyaWFsaXplZFBvbGljeSwgZ3JpZC5sZW5ndGhPZlNpZGVzKTtcbiAgfSBlbHNlIHtcbiAgICBwb2xpY3kgPSBQb2xpY3kuZnJvbVNlZWQoKCkgPT4gMC41LCBncmlkLmxlbmd0aE9mU2lkZXMpO1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc2V0LXBvbGljeScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHBvbGljeSA9IFBvbGljeS5mcm9tU2VlZCgoKSA9PiAwLjUsIGdyaWQubGVuZ3RoT2ZTaWRlcyk7XG4gICAgcmVzZXQoKTtcbiAgfSk7XG5cbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBub2RlID0gZ3JpZC5nZXROb2RlQXRQaXhlbChlLm9mZnNldFgsIGUub2Zmc2V0WSwgY3R4KTtcblxuICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgIG5vZGUud2FsbCA9ICFub2RlLndhbGw7XG4gICAgfVxuXG4gICAgcmVzZXQoKTtcbiAgfSk7XG5cbiAgYWRkTGlzdGVuZXIoJyNsZWFybmluZy1yYXRlJywgKHZhbCkgPT4gKHBvbGljeS5sZWFybmluZ1JhdGUgPSB2YWwpKTtcbiAgYWRkTGlzdGVuZXIoJyNleHBsb3JhdGlvbi1mYWN0b3InLCAodmFsKSA9PiAocG9saWN5LmV4cGxvcmF0aW9uRmFjdG9yID0gdmFsKSk7XG4gIGFkZExpc3RlbmVyKCcjZGlzY291bnQnLCAodmFsKSA9PiAocG9saWN5LmRpc2NvdW50ID0gdmFsKSk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xufVxuXG5mdW5jdGlvbiByZXdhcmQoc3RhdGU6IEFjdG9yU3RhdGUsIGFjdGlvbjogR3JpZEFjdGlvbik6IG51bWJlciB7XG4gIGlmIChhY3Rpb24gPT0gbnVsbCkgcmV0dXJuIC0yLjA7XG4gIGlmIChhY3Rpb24ubm9kZSA9PT0gZ3JpZC5kZXN0aW5hdGlvbk5vZGUpIHtcbiAgICByZXR1cm4gMS4wO1xuICB9XG5cbiAgcmV0dXJuIC0xLjA7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBnZW5lcmF0aW9uID0gMDtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGxvb3AoKSB7XG4gIHVwZGF0ZSgpO1xuICByZW5kZXIoKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuICBncmlkLnJlbmRlcihjdHgpO1xuICBhZ2VudC5yZW5kZXIoY3R4KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICBpZiAoYWdlbnQuc3RhdGUgPT09IGdyaWQuZGVzdGluYXRpb25Ob2RlKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG4gICAgY29uc29sZS5sb2coJ0ZvdW5kIGVuZCwgY3VtdWxhdGl2ZSByZXdhcmQgPSAnICsgY3VtdWxhdGl2ZVJld2FyZCk7XG4gICAgYWdlbnQudGFrZUFjdGlvbih7IGFjdGlvbjogJycsIG5vZGU6IGdyaWQuc3RhcnROb2RlIH0pO1xuICAgIGN1bXVsYXRpdmVSZXdhcmQgPSAwO1xuICAgIGdlbmVyYXRpb25QLmlubmVyVGV4dCA9IGBHZW5lcmF0aW9uOiAke2dlbmVyYXRpb24rK31gO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwb2xpY3knLCBwb2xpY3kuc2VyaWFsaXplKCkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFjdGlvbnMgPSBhZ2VudC5hY3Rpb25zKCk7XG5cbiAgY29uc3QgcHJldlN0YXRlID0gYWdlbnQuc3RhdGU7XG5cbiAgY29uc3QgcGlja2VkQWN0aW9uID0gcG9saWN5LmV2YWx1YXRlKGFjdGlvbnMpO1xuXG4gIGlmIChwaWNrZWRBY3Rpb24gIT0gbnVsbCkge1xuICAgIGFnZW50LnRha2VBY3Rpb24ocGlja2VkQWN0aW9uKTtcbiAgfVxuXG4gIGNvbnN0IG5leHRTdGF0ZSA9IGFnZW50LnN0YXRlO1xuXG4gIGNvbnN0IHN0ZXBSZXdhcmQgPSByZXdhcmQoYWdlbnQuc3RhdGUsIHBpY2tlZEFjdGlvbik7XG5cbiAgY3VtdWxhdGl2ZVJld2FyZCArPSBzdGVwUmV3YXJkO1xuXG4gIHBvbGljeS5wcm9jZXNzU3RlcChwcmV2U3RhdGUsIG5leHRTdGF0ZSwgc3RlcFJld2FyZCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBib290c3RyYXApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==