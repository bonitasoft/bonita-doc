webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(4);
	var browser_1 = __webpack_require__(149);
	var router_1 = __webpack_require__(58);
	var http_1 = __webpack_require__(148);
	var app_1 = __webpack_require__(517);
	document.addEventListener('DOMContentLoaded', function main() {
	    browser_1.bootstrap(app_1.App, ( false ? [] : browser_1.ELEMENT_PROBE_PROVIDERS).concat(http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, [
	        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
	    ]))
	        .catch(function (err) { return console.error(err); });
	});


/***/ },

/***/ 313:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 314:
/***/ function(module, exports) {

	module.exports = "<div>\n  <span x-large>Your Content Here</span>\n  <input type=\"text\" [value]=\"title.value\" (input)=\"title.value = $event.target.value\" autofocus>\n  <!--\n    Rather than wiring up two-way data-binding ourselves\n    we can use Angular's [(ngModel)] syntax\n    <input type=\"text\" [(ngModel)]=\"title.value\">\n  -->\n\n  <pre>this.title = {{ title | json }}</pre>\n</div>\n"

/***/ },

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var router_1 = __webpack_require__(58);
	var common_1 = __webpack_require__(90);
	var router_active_1 = __webpack_require__(518);
	var home_1 = __webpack_require__(520);
	var App = (function () {
	    function App() {
	        this.name = 'bonita-doc';
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            providers: common_1.FORM_PROVIDERS.slice(),
	            directives: router_1.ROUTER_DIRECTIVES.concat([router_active_1.RouterActive]),
	            pipes: [],
	            styles: ["\n    nav ul {\n      display: inline;\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n      width: 60px;\n    }\n    nav li {\n      display: inline;\n    }\n    nav li.active {\n      background-color: lightgray;\n    }\n  "],
	            template: "\n    <header>\n      <nav>\n        <h1>Hello {{ name }}</h1>\n        <ul>\n          <li router-active=\"active\">\n            <a [routerLink]=\" ['Index'] \">Index</a>\n          </li>\n          <li router-active=\"active\">\n            <a [routerLink]=\" ['Home'] \">Home</a>\n          </li>\n        </ul>\n      </nav>\n    </header>\n\n    <main>\n      <router-outlet>Random</router-outlet>\n    </main>\n\n    <footer>\n      bonita-doc by <a href=\"mailto:julien.reboul@bonitasoft.com\" target=\"_top\">Julien Reboul</a>\n    </footer>\n  "
	        }),
	        router_1.RouteConfig([
	            { path: '/', component: home_1.Home, name: 'Index' },
	            { path: '/home', component: home_1.Home, name: 'Home' },
	            { path: '/**', redirectTo: ['Index'] }
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var router_1 = __webpack_require__(58);
	var lang_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(4);
	var router_2 = __webpack_require__(58);
	var RouterActive = (function () {
	    function RouterActive(router, element, renderer, routerLink, routerActiveAttr) {
	        var _this = this;
	        this.routerActive = null;
	        this.routerActiveAttr = 'active';
	        router.subscribe(function () {
	            var active = routerLink.first.isRouteActive;
	            renderer.setElementClass(element.nativeElement, _this._attrOrProp(), active);
	        });
	    }
	    RouterActive.prototype._attrOrProp = function () {
	        return lang_1.isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
	    };
	    RouterActive = __decorate([
	        core_1.Directive({
	            selector: '[router-active]',
	            inputs: ['routerActive']
	        }),
	        __param(3, core_1.Query(router_2.RouterLink)),
	        __param(4, core_1.Attribute('router-active')), 
	        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, core_1.Renderer, core_1.QueryList, String])
	    ], RouterActive);
	    return RouterActive;
	}());
	exports.RouterActive = RouterActive;


/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var XLarge = (function () {
	    function XLarge(element, renderer) {
	        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
	    }
	    XLarge = __decorate([
	        core_1.Directive({
	            selector: '[x-large]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
	    ], XLarge);
	    return XLarge;
	}());
	exports.XLarge = XLarge;


/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(90);
	var http_1 = __webpack_require__(148);
	var title_1 = __webpack_require__(521);
	var x_large_1 = __webpack_require__(519);
	var Home = (function () {
	    function Home(title, http) {
	        this.title = title;
	        this.http = http;
	    }
	    Home.prototype.ngOnInit = function () {
	        console.log('hello Home component');
	    };
	    Home = __decorate([
	        core_1.Component({
	            selector: 'home',
	            providers: [
	                title_1.Title
	            ],
	            directives: common_1.FORM_DIRECTIVES.concat([
	                x_large_1.XLarge
	            ]),
	            pipes: [],
	            styles: [__webpack_require__(313)],
	            template: __webpack_require__(314)
	        }), 
	        __metadata('design:paramtypes', [title_1.Title, http_1.Http])
	    ], Home);
	    return Home;
	}());
	exports.Home = Home;


/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var Title = (function () {
	    function Title() {
	        this.value = 'Angular 2';
	    }
	    Title = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Title);
	    return Title;
	}());
	exports.Title = Title;


/***/ }

});
//# sourceMappingURL=main.map