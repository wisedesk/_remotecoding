(function(window, $)
{
	$(function()
	{
		var pzItems = $("[data-elem='pzItem']"),
			tempItem = $("[data-elem='tempItem']"),
			thumbScrollerElem = $("div[data-elem='thumbScroller']").eq(0),
			thumbHolder = $("div[data-elem='thumbHolder']").eq(0),
			fullscreenThumbHolder = $("div[data-elem='fullscreenThumbHolder']").eq(0),
			thumbScroller = null,
			pz = new PinchZoomer(tempItem),
			_index = -1,
			oldIndex = -1,
			blankThumbUrl = "assets/blank.jpg";
		
		//initTooltip();
		pzItems.detach();
		setupThumbs();
		
		setIndex(0);	
		
		pz.on(PinchZoomer.FULLSCREEN_TOGGLE, onFullscreenToggle);
		
		function initTooltip(tooltipElem)
		{
			var trigger = Utils.isTouchDevice() ? "click" : "hover",
				markerTooltips = tooltipElem ? $(tooltipElem).find(".tooltip").not(".tooltipstered") : $(".tooltip").not(".tooltipstered"),
				len = markerTooltips.length;
			
			for(var i = 0; i < len; i++)
			{
				var markerTooltip = markerTooltips.eq(i);
				markerTooltip.attr("title", markerTooltip.data("title"));
				
				var tipHanlder = new Hammer(markerTooltip.get(0));
				tipHanlder.on('press pressup', onTipHandler);
				
			}
			
			if(Utils.browser.name == "Firefox")
			{
				markerTooltips.tooltipster({trigger:"hover", theme: 'tooltipster-light'});
				
			}
			else
			{
				markerTooltips.tooltipster({trigger: 'custom',
											triggerOpen: { mouseenter: true },
											triggerClose: { mouseleave: true },
											theme: 'tooltipster-light' });
				
			}
		}
		
		function onTipHandler(e)
		{
			if(e.type == "press")
			{
				$(e.target).tooltipster('open');
			}
			else
			{
				$(e.target).tooltipster('close');
			}
		}
		
		function onFullscreenToggle()
		{
			if(thumbScroller != null && fullscreenThumbHolder.length > 0)
			{
				
				if(pz.fullscreen())
				{
					console.log("FULLSCREEN!");
					fullscreenThumbHolder.append(thumbScrollerElem);
					thumbScroller.resize();
				}
				else
				{
					console.log("NO FULLSCREEN!");
					thumbHolder.append(thumbScrollerElem);
					thumbScroller.resize();
				}
			}
		}
		
		function setIndex(val)
		{
			if(val !== _index && val >= 0 && val < pzItems.length)
			{
				index = val;
				
				var pzItem = pzItems.eq(index);
				
				pz.elem(pzItem, false, false);
				pz.vars({adjustHeight:-fullscreenThumbHolder.height()});
				
				if(thumbScroller != null)
				{
					thumbScroller.index(index)	
				}
				
				initTooltip(pz.elem());
			}
		}
		
		function setupThumbs()
		{
			if(thumbScrollerElem.length > 0)
			{
				var pzLen = pzItems.length,
					thumbs = [];
				for(var i = 0; i < pzLen; i++)
				{
					var pzItem = pzItems.eq(i);
					pzItem.data("parsed", false)
					pzItem.data("obj", {})
					thumbs.push({url:pzItem.data("thumb") || blankThumbUrl});
				}
				var thumbVars = $.extend({initShow:true}, Utils.stringToObject("{" + thumbScrollerElem.data("options") + "}") );
				
				thumbScroller = new ThumbScroller(thumbScrollerElem, thumbs, thumbVars);
				thumbScroller.on(ThumbScroller.INDEX_CHANGE, onIndexChange);
			}
		}
		
		function onIndexChange()
		{
			var i = thumbScroller.index();
			
			setIndex(i);
		}
	});
	
}(window, jQuery)); 