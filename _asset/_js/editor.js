$(function() {
	WD.INIT();
});

var WD = $;


/******************************
 * common
 ******************************/
WD.COMMON = function() {
	var $pc = $(".page-editor-pc"),
		$mobile = $(".page-editor-m");

	// resize Frame
	var resizeFrame = function() {

		// Todo temp
		console.log("resize Frame");

		var resizeFunction = function() {

			var minHeight = 600,
				winHeight = $(window).height(),
				mHeaderHeight = $mobile.find("#header").outerHeight(),
				fixBttHeight = $(".fix-btt-wrap").outerHeight(),
				sideHeight;

			if (winHeight <= minHeight) {
				sideHeight = minHeight;
			} else {
				sideHeight = winHeight;
			}

			/*pc*/
			$pc.outerHeight(sideHeight);
			$pc.find(".editor-wrap").outerHeight(sideHeight);
			$pc.find(".left-side").outerHeight(sideHeight);
			$pc.find(".right-side").outerHeight(sideHeight);
			$pc.find(".left-side .tab-pane").outerHeight(sideHeight - 50);
			/*$pc.find(".left-side .slide-wrap").outerHeight(sideHeight - 50 - 150);*/

			$pc.find(".right-side .right-con.r1 .info-wrap").outerHeight(sideHeight - 162);
			$pc.find(".right-side .right-con.r1 .info-wrap ._over-wrap").outerHeight(sideHeight - 162 - 140);

			$pc.find(".right-side .right-con.r2 .info-wrap").outerHeight(sideHeight - 225);
			$pc.find(".right-side .right-con.r2 .info-wrap ._over-wrap").outerHeight(sideHeight - 225 - 20);

			/*mobile*/
			$mobile.find(".editor-wrap").outerHeight(winHeight - mHeaderHeight - fixBttHeight);
		};

		resizeFunction();
		$(window).resize(function() {
			resizeFunction();
		});
	};

	var rightSide = function() {

		var bind = function() {
			reset();
			$pc.find(".right-side .btn-request").unbind("click").on("click", function() {
				$pc.find(".right-side .right-con").removeClass("_active");
				$pc.find(".right-side .right-con").eq(1).addClass("_active");
			});
			$pc.find(".right-side .btn-prev").unbind("click").on("click", function() {
				$pc.find(".right-side .right-con").removeClass("_active");
				$pc.find(".right-side .right-con").eq(0).addClass("_active");
			});
			$pc.find(".right-side ._cancle").unbind("click").on("click", function() {
				$pc.find(".right-side ._form textarea").val("");
			});
		};
		var reset = function() {
			$pc.find(".right-side .right-con").removeClass("_active");
			$pc.find(".right-side .right-con").eq(0).addClass("_active");
		};
		bind();
	};

	var init = function() {
		rightSide();
		resizeFrame();
	};
	init();
};

/******************************
 * common function
 ******************************/
WD.FUNCTION = function() {

	// dropBox
	var dropBox = function() {
		var bind = function() {

			$("._drop-box ._btn-drop").unbind("click");
			$(document).on("click", "._drop-box ._btn-drop", function(e) {

				// Todo temp
				console.log("dropBox click");

				e.stopPropagation();
				e.preventDefault();

				var $dropBox = $(this).parent();
				reset($dropBox.siblings());

				$dropBox.toggleClass("_open");

				if (!$(".left-side").hasClass("_open")) {
					$(".page-editor-pc").addClass("_hideSide");
				} else {
					$(".page-editor-pc").removeClass("_hideSide");
				}
			})
		};

		var reset = function(sid) {
			var $dropBox = sid ? sid : $("._drop-box");
			$dropBox.removeClass("_open");
		};
		bind();
	};

	var init = function() {
		dropBox();
	};
	init();
};

/******************************
 * pop up common
 ******************************/
WD.POP = {
	// 팝업 open
	open: function(e, popData) {
		// Todo temp
		console.log("팝업 open");

		var $pop = [
			'<div id="pop">',
			'   <div class="pop-wrap">',
			'       <div class="pop-inner">',
			'           <header class="header-pop" data-sid="header"></header>',
			'           <div class="pop-content" data-sid="content"></div>',
			/*'           <div class="btn-wrap"><a href="javascirpt:void(0)" class="pop-close _closePop" tabindex="0"><span class="txt">닫기</span></a></div>',*/
			'       </div>',
			'   </div>',
			'</div>'
		].join('');

		$("#pop").remove();
		$("body").append($pop).addClass("_noscroll");

		if (e) {
			var popLoad = e.attr("data-load"),
				popSeq = e.attr("data-seq");

			// load 방식
			if (popLoad) {
				$("#pop").find(".header-pop").remove();
				$("#pop").find("[data-sid=content]").load(popLoad + "?seq=" + popSeq, function() {
					// focus 관편
					WD.POP.tabPress($("#pop .pop-wrap"));

					// repositoin
					WD.POP.reposition();
				});
			}
		} else if (popData) {
			$("#pop").find("[data-sid=header]").html(popData.title);
			// append 방식
			if (popData.html) {
				$("#pop").find("[data-sid=content]").html(popData.html);
			}
			if (popData.customClass) {
				$(".pop-wrap").addClass(popData.customClass);
			}

			// focus 관편
			WD.POP.tabPress($("#pop .pop-wrap"));

			// repositoin
			WD.POP.reposition();
		}

	},

	// 팝업 Close
	close: function() {

		// Todo temp
		console.log("팝업 Close");

		$("#pop").remove();
		$("body").removeClass("_noscroll");
	},

	// 팝업내 focus 돌기
	tabPress: function(pop) {

		// Todo temp
		console.log("팝업 탭설정");

		var linkData = pop.find("[TabIndex=0]");
		linkData[0].focus();

		linkData.last().on("keydown", function(e) {
			// 팝업 마지막focus에서 탭 클릭시 처음으로
			if (e.keyCode == 9) {
				pop.attr("tabindex", "0");
				pop.focus();
				pop.attr("tabindex", "");
			}

			// 팝업 마지막focus에서 쉬프트 탭 클릭시 이전으로
			if (event.keyCode == 9 && event.shiftKey) {
				var eq = linkData.length - 1 < 0 ? 0 : linkData.length - 1;
				linkData.eq(eq).focus();
			}
		});

		// 팝업 처음focus에서 쉬프트 탭 클릭시 마지막으로
		linkData.eq(0).on("keydown", function(e) {
			if (event.keyCode == 9 && event.shiftKey) {
				pop.append('<a href="javascript:void(0);" id="templink"></a>');
				$("#templink").focus();
				$("#templink").remove();
			}
		});
	},

	reposition: function() {

		// Todo temp
		console.log("팝업 reposition");

		var resizeFunction = function() {
			var popWidth = $(".pop-wrap").outerWidth(),
				popHeight = $(".pop-wrap").outerHeight(),
				winHeight = $(window).height(),
				headerHeight = $(".pop-wrap .header-pop").outerHeight(),
				bttHeight = $(".pop-wrap .btt-wrap").outerHeight(),
				conHeight = $(".pop-wrap .inner").height(),
				maxConHeight = winHeight - 20 - headerHeight - bttHeight;

			var popReHeight, popConHeight;

			console.log(maxConHeight, conHeight)

			if (maxConHeight <= conHeight) {
				$(".pop-wrap .load-content").outerHeight(maxConHeight);
				// overflow
				WD.EVENT.overflow(".pop-wrap", "");
			} else {
				$(".pop-wrap .load-content").outerHeight(conHeight + 30);
			}

		};
		resizeFunction();
		$(window).resize(function() {
			resizeFunction();
		});
	},

	bind: function() {
		$("._pop").unbind("click");
		$(document).on("click", "._pop", function() {
			// pop open
			WD.POP.open($(this));
			var $returnFocus = $(this);

			$("._closePop").unbind("click");
			$(document).on("click", "._closePop", function() {
				// pop close
				WD.POP.close();

				// return focus
				$returnFocus.focus();
			});
		});
	}
};

/******************************
 * event
 ******************************/
WD.EVENT = {

	// tab controll
	tabControll: function(sid) {
		if (!sid) sid = $(document);

		var bind = function() {
			reset();
			sid.find("._btn-tab").unbind("click").on("click", function() {

				// Todo temp
				console.log("tab click");

				var $tabContainer = $(this).parents("._tab-container");
				var val = $(this).attr("data-tab-value");

				$(this).addClass("_active");
				$(this).siblings().removeClass("_active");
				$tabContainer.find(".tab-pane.t" + val).addClass("_active");
				$tabContainer.find(".tab-pane.t" + val).siblings().removeClass("_active");
			});

			/* 최초실행시 */
			sid.find("._tab-container ._btn-tab").eq(0).click();
		};
		var reset = function() {
			sid.find("._tab-container ._tab-inner").removeClass("_active");
		};
		bind();
	},

	// 스크롤바
	overflow: function(sid, option) {
		var option = $.extend({
			axis: "y",
			theme: "dark-thin",
			scrollButtons: true
		}, option || {});

        // Todo temp
        console.log("스크롤 : ", sid, option);

		if (!sid) sid = $(document);
		$(sid).find("._over-wrap").mCustomScrollbar({
			axis: option.axis,
			theme: option.theme,
			scrollButtons: {enable: option.scrollButtons}
		});

		$(sid).find("._over-wrap-x").mCustomScrollbar({
			axis: "x",
			theme: option.theme,
			scrollButtons: {enable: option.scrollButtons}
		});
	},

	resizeBox: function() {
		// Todo temp
		console.log("resizeBox");

		var cols = document.querySelectorAll('[data-recol]'), encountered = []
		for (i = 0; i < cols.length; i++) {
			var attr = cols[i].getAttribute('data-recol')
			if (encountered.indexOf(attr) === -1) {
				encountered.push(attr)
			}
		}
		for (set = 0; set < encountered.length; set++) {
			var col = document.querySelectorAll('[data-recol="' + encountered[set]
				+ '"]'), group = []
			for (i = 0; i < col.length; i++) {
				col[i].style.height = 'auto'
				group.push(col[i].scrollHeight)
			}
			for (i = 0; i < col.length; i++) {
				col[i].style.height = Math.max.apply(Math, group) + 'px'
			}
		}
	}
};

WD.RETURN = {

	// substring left
	Left: function(Str, Num) {
		if (Num <= 0)
			return "";
		else if (Num > String(Str).length)
			return Str;
		else
			return String(Str).substring(0, Num);
	},

	// substring riight
	Right: function(Str, Num) {
		if (Num <= 0)
			return "";
		else if (Num > String(Str).length)
			return Str;
		else {
			var iLen = String(Str).length;
			return String(Str).substring(iLen, iLen - Num);
		}
	},

	// get param
	getParam: function(paramName) {
		var _tempUrl = window.location.search.substring(1);
		if (_tempUrl) {
			var _tempArray = _tempUrl.split('&');
			for (var i = 0; i < _tempArray.length; i++) {
				var _keyValuePair = _tempArray[i].split('=');
				if (_keyValuePair[0] === paramName) {
					return _keyValuePair[1];
				}
			}
		}
	}
};

/******************************
 * init
 ******************************/
WD.INIT = function() {
	WD.COMMON();
	WD.FUNCTION();
	WD.EVENT.tabControll();
	/*WD.EVENT.overflow();*/
	WD.POP.bind();
};



