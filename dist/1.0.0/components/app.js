"use strict";define("module/c",[],function(e){var o={f:function(){console.log(222)},y:"11",z:"22"};console.log("c131","y1","y44y",o),console.log("youwe0")}),define("index",["module/c"],function(e){$("#js_yibu").on("click",function(){require(["module/b","text!module/tpl.html","api/home"],function(e,o,n){console.log(e,o,n),n.getUser()})})}),window.DOMAIN={},window.DOMAIN.env={baseUrl:"build/components",host:"http://localhost:8090/"},require.config({baseUrl:DOMAIN.env.baseUrl,paths:{}}),require(["index"]),define("app",["index"],function(){});