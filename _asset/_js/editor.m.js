$(function() {
	startPage();
});

/******************************
 * 페이지 공통
 ******************************/
var startPage = function() {
    var $android = $(".ua-android"),
        $ios = $(".ua-ios"),
        $fixSide = $(".fix-side");

    // hash 관련 동작
    var pageSetting = function(){
	    var setHash  = function(){
            var currentHash = location.hash.replace('#', '');

            switch(currentHash) {
                case "inquiry":
                    // 시안수정요청
                    fixOpen();
                    break;
                case "inquiry-temp":
                    // 임시저장
                    inquiryTemp();
                    break;
                case "inquiry-close":
                    // fixSide 레이어닫기
                    fixClose();
                    break;
                case "inquiry-design":
                    // 디자인 수정사항 작성하기 focus
                    inquiryDesign();
                    break;
                case "key-blur":
                    // 토글버튼
                    keyBlur();
                    break;
                case "complete":
                    // 시안확정하기
                    inquirySave();
                    break;
                case "inquiry-key":
                    // 시안확정하기
                    inquiryKey();
                    break;
                case "request":
                    // 시안확정하기
                    request();
                    break;
                default:
                    // reset
                    reset();
            }
        }
        $(window).on("hashchange", function() {
            setHash();
        });
        setHash();
	}

    // 버튼 "시안주정중" 으로 변경
    var btnChange = function() {

        console.log("시안수정중 버튼변경");

        var txt = $fixSide.find("textarea").val();

        if(txt && txt != "") {
            $(".fix-btt-wrap ._btn-from").addClass("_editor");
        } else {
            $(".fix-btt-wrap ._btn-from").removeClass("_editor");
        }
    };

    // 임시저장
    var saveTemp = function() {
        // 버튼 체인지
        btnChange();

        console.log("임시저장")

        // Todo
        /*$.ajax({
            type: 'POST',
            url: "",
            dataType: 'json',
            success: function (res) {
                reset();
            },
            error: function () {
                console.info("Load Error!");
            }
        });*/
    };

    // 저장
    var save = function() {

        console.log("저장")

        // Todo
        /*$.ajax({
            type: 'POST',
            url: "",
            dataType: 'json',
            success: function (res) {
                reset();
            },
            error: function () {
                console.info("Load Error!");
            }
        });*/
    };

    // fixSide 레이어 open
    var fixOpen = function() {

        console.log("fixSide 레이어open");

        $("body").addClass("inquiry");
        $("body").removeClass("close");

        $fixSide.addClass("_fixed");
        $fixSide.find(".fix-con").addClass("_active");

        $fixSide.find(".fix-btt-wrap").addClass("_hide");

        noScroll();
        keyFocus();
    };

    // fixSide 레이어닫기
    var fixClose = function() {

        console.log("fixSide 레이어닫기");

        $("body").removeClass("inquiry close");
        $fixSide.removeClass("open-key _fixed");
        $fixSide.find(".fix-con").removeClass("_active");
        $fixSide.find(".fix-btt-wrap").removeClass("_hide");
        keyBlur();
        WD.POP.close();
        Scroll();
    };

	// reset
    var reset = function() {

        console.log("reset");

        $fixSide.find(".article-wrap textarea").val("");
        $("._text").text("");
        $(".fix-btt-wrap ._btn-from").removeClass("_editor");

        // fixSide 레이어닫기
        fixClose();
        Scroll();
    };

    // 키보드내리기
    var keyBlur = function() {

        console.log("키보드내리기")

        $fixSide.removeClass("open-key");
        $fixSide.find(".article-wrap.a1 textarea").blur();
    };

    // 키보드올리기
    var keyFocus = function() {
        console.log("키보드올리기")

        $android.find(".fix-side .article-wrap textarea").focus();
    };

	// 임시저장 버튼 클릭
    var inquiryTemp = function() {

        console.log("임시저장");

        fixClose();
        saveTemp();
    };

    // 작성완료 클릭
    var inquirySave = function() {

        console.log("작성완료 클릭");

        reset();
        save();
    };

    // 시안수정요청 버튼 클릭
    var inquiryDesign = function() {

        console.log("시안수정요청 버튼 클릭");

        fixOpen();
    };

    // 시안확정 textarea
    var inquiryKey = function() {
        fixOpen();

        var txt = $("textarea._text").val();

        $fixSide.find(".article-wrap textarea").val(txt);
        $android.find(".fix-side .article-wrap textarea").focus();
    };

    // textarea request
    var request = function() {

        console.log("text request");

        var txt = $fixSide.find(".article-wrap textarea").val();

        console.log(txt);
        if(txt && txt != "") {
            $("._text").text(txt);
        }
        fixClose();
    };

	var bind = function(){

        $fixSide.find("._btn-drop").unbind("click").on("click", function(){
            if($fixSide.hasClass("open-key")) {
                $(this).attr("href", "#key-blur");
            } else {
                $(this).attr("href", "#inquiry-close");
            }
        });

        $fixSide.find("textarea").unbind("focus").on("focus", function(){
            $fixSide.addClass("open-key");
        });

        $fixSide.find("._btn-drop._b2").unbind("click").on("click", function(){
            if($fixSide.hasClass("open-key")) {
                $(this).attr("href", "#key-blur");
            } else {
                $(this).attr("href", "#request");
            }
        });
    };

    var menu = function() {
		$(".btn-menu").on("click", function() {
			console.log("menu on");
			$(".menu-wrap").addClass("_active");

			noScroll();
		});

		$(".menu-wrap .menu-dimm").on("click", function() {
			$(".menu-wrap").removeClass("_active");

			Scroll();
		});
	};

	var init = function() {
        pageSetting();
	    menu();
        bind();
	};
	init();
};

/******************************
 * index_m.html
 ******************************/
var editor = function() {
    var $nav = $(".fix-nav");
    $nav.find(".nav-item").removeClass("_active");
    $nav.find(".nav-item").eq(0).addClass("_active");

    var editorBind = function() {

        $(".btn-view").unbind("click").on("click", function() {

            $(".left-side").addClass("_open");
            $("body").addClass("_noscroll");
            $("body").addClass("_showLeft");
            /*$("body").addEventListener("touchmove", preventDefault, false);*/
        });
        $(".editor-wrap .dim").unbind("click").on("click", function() {
            $(".left-side").removeClass("_open");
            $("body").removeClass("_noscroll");
            $("body").removeClass("_showLeft");
            /*$("body").removeEventListener("touchmove", preventDefault, false);*/
        });

        $(".left-side .item").on("click", addImages);

        $nav.find(".nav-item[data-action=anchor]").unbind("click").on("click", function() {
            var hash = $(this).attr("data-sid");
            location.href="detail_m.html#sec"+ hash;
        });
    };

    var addImages = function(){

        $(this).parent().addClass("_active");
        $(this).parent().siblings().removeClass("_active");

        var $editor = $("#editor"),
            src = $(this).attr("data-src"),
            $zoomHolder = '<div class="zoomHolder"><img data-src="'+ src +'" data-elem="pinchzoomer" data-options="scaleMode:proportionalInside" /></div>';

        $editor.find(".zoomHolder").remove();
        $editor.append($zoomHolder);
        $editor.find("[data-elem=pinchzoomer]").pinchzoomer();
    }

    var sideOverflow = function() {
        var option = {
            axis: "y",
            scrollButtons: false
        };
        WD.EVENT.overflow(".left-side", option);

        var bind = function() {
            $(".btn-arrow._prev").unbind("click").on("click", function() {
                var $overWrap = $(this).parents(".tab-pane").find("._over-wrap");
                $overWrap.mCustomScrollbar("scrollTo", "top");
            });
            $(".btn-arrow._next").unbind("click").on("click", function() {
                var $overWrap = $(this).parents(".tab-pane").find("._over-wrap");
                $overWrap.mCustomScrollbar("scrollTo", "bottom");
            })
        };
        bind();
    };

    var editorInit = function() {
        sideOverflow();
        editorBind();
        $(".left-side li").eq(0).find(".item").click();
    };
    editorInit();
};

/******************************
 * detail_m.html
 ******************************/
var navScroll = function(){
    var $nav = $(".fix-nav"),
        hash = location.hash.replace('#', '');

    if(hash) {
        /*var nowAnchor = hash.indexOf("sec");*/
        if(hash.indexOf("sec") > -1){
            var nowAnchor = hash.replace('sec', '');
        }
    }
    $nav.find(".nav-item").removeClass("_active");


    if(nowAnchor) {
        $nav.find(".nav-item").eq(nowAnchor).addClass("_active");
        $('html, body').animate({
            scrollTop: $("section.tab-pane.t" + nowAnchor).offset().top - $("#header").height() + 'px'
        }, 500);
    } else {
        $nav.find(".nav-item").eq(1).addClass("_active");
    }

    $nav.find(".nav-item[data-action=anchor]").unbind("click").on("click", function(){
        var sid = $(this).attr("data-sid");
        $('html, body').animate({
            scrollTop: $("section.tab-pane.t" + sid).offset().top - $("#header").height() + 'px'
        }, 500);

        $nav.find(".nav-item").eq(sid).addClass("_active");
        $nav.find(".nav-item").eq(sid).siblings().removeClass("_active");
    });

    var header = $("#header").outerHeight(),
        t1Top = $("section.tab-pane.t1").offset().top - header,
        t2Top = $("section.tab-pane.t2").offset().top - header,
        t3Top = $("section.tab-pane.t3").offset().top - header,
        winHeight = $(window).outerHeight(),
        conHeight = $(".tab-container").outerHeight(),
        btt = conHeight - winHeight + header;

    $(window).scroll(function() {
        var offsetTop = $("#header").offset().top;

        console.log(offsetTop, btt);

        $nav.find(".nav-item").removeClass("_active");

        if (t2Top > offsetTop) {
            $nav.find(".nav-item").eq(1).addClass("_active");
        } else if (t2Top <= offsetTop && t3Top > offsetTop) {
            if(btt != offsetTop) {
                $nav.find(".nav-item").eq(2).addClass("_active");
            } else {
                $nav.find(".nav-item").eq(3).addClass("_active");
            }
        } else if (t3Top <= offsetTop) {
            $nav.find(".nav-item").eq(3).addClass("_active");
        }
    });
}

/******************************
 * get url
 ******************************/
var getUrl = function(){
    var href = location.href,
        res = href.split("#");

    return res[0];
}

/******************************
 * get parameter
 ******************************/
var getQuerystring = function(paramName){
    var _tempUrl = window.location.search.substring(1);
    if(_tempUrl) {
        var _tempArray = _tempUrl.split('&');
        for (var i = 0; i < _tempArray.length; i++) {
            var _keyValuePair = _tempArray[i].split('=');

            if (_keyValuePair[0] == paramName) {
                return _keyValuePair[1];
            }
        }
    }
}

function noScroll() {
	$("body").addClass("_noscroll");
	/*$("body").bind('touchmove', function(e){e.preventDefault()});*/

    $("body").css('overflow-y', 'hidden');
	console.log("스크롤막기")
}

function Scroll() {
	$("body").removeClass("_noscroll");
	/*$("body").unbind('touchmove'); //스크롤 방지 해제*/

    $("body").css('overflow-y', '');
	console.log("스크롤 방지 해제")
}

