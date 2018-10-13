$(document).ready(function(){
  $("#member-login").hover(function(){
    $(this).find(".login-panel").removeClass("hidden");
    $(this).find(".btn-login").addClass("focus");
  },function(){
    $(this).find(".login-panel").addClass("hidden");
    $(this).find(".btn-login").removeClass("focus");
  });
  
  $(".img-link").hover(
  function(){
	  var thisHeight = $(this).height();
	  var $thisText = $(this).find("span");
	  var textHeight = $thisText.innerHeight();
	  $thisText.animate({top: thisHeight-textHeight});
  },
  function(){
	  var thisHeight = $(this).height();
	  var $thisText = $(this).find("span");
	  var textHeight = $thisText.innerHeight();
	  $thisText.animate({top: thisHeight});
  });
  $(".show-more").click(function(){
	 //$(this).addClass("active");      	 
  });
  // for search
  if($("#search-filter")&&typeof(moment)==="function"){
	  var $searchFilter = $("#search-filter");
	  $searchFilter.click(function(){
			$(".search-filter").toggle(500);
	  });
  //Timeline
	  var $search_range = $("#search-range"),
		  $range_from = $("#range-from"),
		  $range_to = $("#range-to");
		  
	  var track = function(data){
		  $range_from.val(		
				moment(data.from, "X").format("L")
			);
			$range_to.val(		
				moment(data.to, "X").format("L")
			);	  
		  };
		  
	  $search_range.ionRangeSlider({
		grid: 'true',
		type:'double',
		force_edges: true,
		hide_min_max: true,
		min: +moment().subtract(1, "years").format("X"),
		max: +moment().format("X"),
		prettify: function (num) {
			return moment(num, "X").format("LL");
		},
		onStart: track,
		onChange: track,
		onFinish: track,
		onUpdate: track
		});
		
  //Sections
  var $searchFilterCheckbox = $(".search-filter input[type='checkbox']");
  var addNoCheckedCls = function(odj){
		if(odj.is(":checked")){
			odj.parent("label").removeClass("no-checked");
		}else{
			odj.parent("label").addClass("no-checked");
		}
	  };
	  $searchFilterCheckbox.each(function() {
        addNoCheckedCls($(this));
      });
	  $searchFilterCheckbox.click(function(){
		  addNoCheckedCls($(this));	  
  	  });
  };
  /*
  $(window).scroll(function() {	  
		var currenttop = $(window).scrollTop();
		// for free tickets
		if($('#free-tickets')){
			var freeTicketsOffset = $('#free-tickets').offset();		
			if (currenttop > freeTicketsOffset.top) {
				$("#free-tickets .head").addClass("scroll-down");
			}else{
				$("#free-tickets .head").removeClass("scroll-down");
			}
		}
  });
  */
  
});


