if(typeof window.curPageName != 'function') {
	// function curPageName() {
		// var sPath=window.location.pathname;
		// var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
		// return sPage;
	// }
	// special setting for the standard
	function curPageName() {
		var sPath=window.location.pathname;
		var sPage = sPath.substring(sPath.indexOf('/') + 1);
		return sPage;
	}
}
if(typeof window.getUrlVars != 'function') {
	function getUrlVars(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++){
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
}
var comScoreUrl = curPageName();
var comScoreC2="&c2=9053246";
var comScoreNsSite="&ns_site=news";
var comScoreNsVsite="&ns_vsite=ts";
var comScoreNsVsiteVal=".ts";
var comScoreSite="&name=news";
var comScoreSection="";
var comScoreCategory="";
var comScoreContentType="";  // content-type : video/gallery/article
var comScoreProduct="&product=news";
var comScoreType=""; // page view = "" , non page view ="&ns_type=hidden"
var webpageCategory;
var bufferTheStandard = " - The Standard";
var webpageArticleVal = document.title.replace(/(^\s+|\s+$)/g, '');
webpageArticleVal = (webpageArticleVal.substr(bufferTheStandard.length*-1) == bufferTheStandard)?webpageArticleVal.substr(0 , webpageArticleVal.length - bufferTheStandard.length):webpageArticleVal;
var comScoreArticleName='.'+webpageArticleVal;
var webpagDate;
var webpagDate2;
var webpageCategoryType; // 0 : breaking news ; 1 : sections + features ; 2 : special ; 3 : Potshot

switch(comScoreUrl){
	case "":
	case "index.php":
		comScoreContentType = ".home";
		comScoreSection = ".main";
		webpageCategoryType = "";
		break;
	case "breaking_news_list.php":
		comScoreContentType = ".home";
		comScoreSection = ".breakingNews";
		webpageCategoryType = 0;
		break;
	case "breaking-news.php.php":
		comScoreContentType = ".article";
		comScoreSection = ".breakingNews";
		webpageCategoryType = 0;
		break;
	case "sections_news_list.asp":
		comScoreContentType = ".home";
		webpageCategoryType = 1;
		break;
	case "section-news.php":
		comScoreContentType = ".article";
		webpageCategoryType = 1;
		break;	
	case "search.php":
		comScoreSection = ".search";
		comScoreContentType = ".home";
		webpageCategoryType = 2;
		break;
	case "archive.php":
		comScoreContentType = ".archive";
		webpageCategoryType = 2;
		break;	
	case "show_image.php":
		comScoreSection = ".Potshot";
		comScoreContentType = ".gallery";
		webpageCategoryType = 3;
		break;	
	case "member_login.php":
		comScoreContentType = ".member_login";
		webpageCategoryType = "";
		break;
	case "member_register.php":
		comScoreContentType = ".member_register";
		webpageCategoryType = "";
		break;
	default:
		if (comScoreUrl.substring(0, comScoreUrl.indexOf('/')) == "special") {
			comScoreSection = ".special";
			comScoreContentType = "." + comScoreUrl.substring(comScoreUrl.indexOf('/') + 1);
			if (comScoreContentType.indexOf('/') == -1) {
				comScoreContentType = comScoreContentType.substring(0 , comScoreContentType.length - 1);
			} else {
				comScoreContentType = comScoreContentType.substring(0 , comScoreContentType.indexOf('/'));
			}
			webpageCategoryType = 2;
		} else {
			comScoreContentType = "";
		}
}

if (webpageCategoryType == 0) {
	webpageCategory = getUrlVars()['cid'];

	if (webpageCategory != "" && webpageCategory != 'undefined' && webpageCategory != null) {
	} else {
		webpageCategory = "a";
	}

	if (comScoreContentType == ".home") {
		comScoreArticleName = "";
	}

	if (comScoreCategory == "") {
		switch(webpageCategory){
			case "a" :
				comScoreCategory = "";
				break; 
			case "1" :
				comScoreCategory = ".Business";
				break; 
			case "2" :
				comScoreCategory = ".China";
				break; 
			case "3" :
				comScoreCategory = ".HongKong";
				break; 
			case "4" :
				comScoreCategory = ".World";
				break; 
			case "5" :
				comScoreCategory = ".Sports";
				break;
			default:
				comScoreCategory = "";
		}
	}
} else if (webpageCategoryType == 1) {
	webpageCategory = getUrlVars()['sid'];
	//webpageDate = getUrlVars()['d_str'];
 
	if (comScoreContentType == ".home") {
		comScoreArticleName = "";
	}
	
	if (comScoreSection == "") {
		comScoreSection = ".sections";
		switch (webpageCategory) {
			case "11" : 
				comScoreCategory = ".TopNews";
				break; 
			case "4" : 
				comScoreCategory = ".Local";
				break; 
			case "2" : 
				comScoreCategory = ".Business";
				break; 
			case "3" : 
				comScoreCategory = ".China";
				break; 
			case "9" : 
				comScoreCategory = ".Focus/ViewPoint";
				break; 
			case "5" : 
				comScoreCategory = ".CityTalk";
				break; 
			case "6" : 
				comScoreCategory = ".World";
				break; 
			case "8" : 
				comScoreCategory = ".Sport";
				break; 
			case "7" : 
				comScoreCategory = ".People";
				break; 
			case "21" : 
				comScoreCategory = ".CentralStation";
				break; 
			case "17" : 
				comScoreCategory = ".Editorial";
				break; 		
			case "10" : 
				comScoreCategory = ".Markets";
				break; 
			case "12" : 
				comScoreCategory = ".WeekendGlitz";
				break; 
			case "16" : 
				comScoreSection = ".features";
				var webpagefc = getUrlVars()['fc'];
				if (webpagefc != "" && webpagefc != 'undefined' && webpagefc != null) {
					switch (webpagefc) {
						case "1" : 
							comScoreCategory = ".MoneyGlitz";
							break; 
						case "2" : 
							comScoreCategory = ".Technology";
							break; 
						case "3" : 
							comScoreCategory = ".HealthAndBeauty";
							break; 
						case "4" : 
							comScoreCategory = ".Education";
							break; 
						case "5" : 
							comScoreCategory = ".Fashion";
							break;					
						case "6" : 
							comScoreCategory = ".Motoring";
							break; 
						case "7" : 
							comScoreCategory = ".Property";
							break; 	
						case "8" : 
							comScoreCategory = ".Macau";
							break; 	
						case "9" : 
							comScoreCategory = ".WiningAndDining";
							break; 	
						case "10" : 
							comScoreCategory = ".ArtAndCulture";
							break; 
						case "11" : 
							comScoreCategory = ".HomeDecor";
							break; 
						case "12" : 
							comScoreCategory = ".Travel";
							break; 
						case "13" : 
							comScoreCategory = ".OverseasProperty";
							break; 
						case "14" : 
							comScoreCategory = ".OverseasEducation";
							break; 
						case "15" : 
							comScoreCategory = ".EnglishLearning";
							break; 
						default:
							comScoreCategory = ".MoneyGlitz";
					}
				}
				break; 
			default:
				comScoreSection = ".search";
				comScoreCategory = ".result";
		}
	}
} else if (webpageCategoryType == 2) {
	comScoreArticleName = "";
} else if (webpageCategoryType == 3) {
	var webpageid = getUrlVars()['id'];
	if (webpageid != "" && webpageid != 'undefined' && webpageid != null) {
		comScoreArticleName = "." + webpageid;
	} else {
		comScoreContentType = "";
	}
}else{
	comScoreContentType = "";
}

if (comScoreArticleName == ".-" || comScoreArticleName.substring(1) == bufferTheStandard.replace(/(^\s+|\s+$)/g, '')) {
	// console.log("this is worng title: ["+ comScoreArticleName.substring(1) + "]");
	comScoreContentType = "";
} else if (comScoreArticleName.substr(bufferTheStandard.length*-1) == bufferTheStandard) {
	comScoreContentType = "";
}


// name=<vsite>.<section>.<content-type>.<article-name>
var comScoreName=comScoreSite+comScoreNsVsiteVal+comScoreSection+comScoreCategory+comScoreContentType+comScoreArticleName;
var comScoreTag=comScoreC2+comScoreNsSite+comScoreNsVsite+comScoreName+comScoreProduct;

udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2'+comScoreTag);
console.log('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2'+comScoreTag);
// Begin comScore Inline Tag 1.1302.13
// <![CDATA[
function udm_(e){
var t="comScore=",n=document,r=n.cookie,i="",s="indexOf",o="substring",u="length",a=2048,f,l="&ns_",c="&",h,p,d,v,m=window,g=m.encodeURIComponent||escape;if(r[s](t)+1)for(d=0,p=r.split(";"),v=p[u];d<v;d++)h=p[d][s](t),h+1&&(i=c+unescape(p[d][o](h+t[u])));e+=l+"_t="+ +(new Date)+l+"c="+(n.characterSet||n.defaultCharset||"")+"&c8="+g(n.title)+i+"&c7="+g(n.URL)+"&c9="+g(n.referrer),e[u]>a&&e[s](c)>0&&(f=e[o](0,a-8).lastIndexOf(c),e=(e[o](0,f)+l+"cut="+g(e[o](f+1)))[o](0,a)),n.images?(h=new Image,m.ns_p||(ns_p=h),h.src=e):n.write("<","p","><",'img src="',e,'" height="1" width="1" alt="*"',"><","/p",">")};
if (comScoreContentType != "") {
	udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2'+comScoreTag);
	//console.log("this is title: ["+ comScoreArticleName.substring(1) + "]");
}
//<noscript><p><img src="http://b.scorecardresearch.com/p?c1=2<?=$comScoreTag?>" height="1" width="1" alt="*"></p></noscript>
//  End comScore Inline Tag
function comScoreBtnClick(sn_btn,btn_name,btn_search){
	var comScoreBtn = '';
	if (sn_btn!=''){comScoreBtn=comScoreBtn+'&sn_btn='+sn_btn; }
	if (btn_name!=''){comScoreBtn=comScoreBtn+'&btn_name='+btn_name; }
	if (btn_search!=''){comScoreBtn=comScoreBtn+'&btn_search='+btn_search; }
	udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2'+comScoreC2+comScoreNsSite+comScoreNsVsite+comScoreProduct+comScoreBtn+'&ns_type=hidden');
}