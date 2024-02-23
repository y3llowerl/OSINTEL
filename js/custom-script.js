$(document).ready(function () {
	var gtmScriptLoaded = false;
	if(!gtmScriptLoaded)
	{
		var headGTMEle = document.createElement("script");
		var gtmHeadText = document.createTextNode("(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TBD3JCM');");
		headGTMEle.appendChild(gtmHeadText);
		$('head').prepend(headGTMEle);
		
		var bodyGTMEle = document.createElement("noscript");
		var gtmIframeEle = document.createElement("iframe");
		gtmIframeEle.setAttribute("src", "https://www.googletagmanager.com/ns.html?id=GTM-TBD3JCM");
		gtmIframeEle.setAttribute("height", "0");
		gtmIframeEle.setAttribute("width", "0");
		gtmIframeEle.setAttribute("style", "display:none;visibility:hidden");
		bodyGTMEle.appendChild(gtmIframeEle);
		$('body').prepend(bodyGTMEle);
		gtmScriptLoaded = true;
	}
	$('link[rel="alternate"]').each(function(){
        var hrefurl = $(this).attr("href");
        var hrefurllang = $(this).attr("hreflang");
		$('#footer-locale-dropdown a').each(function(){
        footerherf = $(this).attr("href");
	    footertext = $(this).html();

	   if ((footerherf=='https://www.opentext.com/') && (hrefurllang=='en'))
	    {
	     
		 $(this).attr('href', hrefurl);
	    } else if ((footerherf=='https://www.opentext.jp/') && (hrefurllang=='ja-jp'))
	    {
	     $(this).attr('href', hrefurl);
	    } else if ((footerherf=='https://www.opentext.fr/') && (hrefurllang=='fr-fr'))
	    {
	     $(this).attr('href', hrefurl);
	    } else if ((footerherf=='https://www.opentext.de/') && (hrefurllang=='de-de'))
	    {
	     $(this).attr('href', hrefurl);
	    } 
	     else if ((footerherf=='https://www.opentext.se/') && (hrefurllang=='se-se'))
	    {
	     $(this).attr('href', hrefurl);
	    }
	    else if ((footerherf=='https://www.opentext.co.uk/') &&  (hrefurllang=='en-gb'))
	    {
	     $(this).attr('href', hrefurl);
	    } 
	    else if ((footerherf=='https://www.opentext.com.au/') && (hrefurllang=='en-au'))
	    {
	     $(this).attr('href', hrefurl);
	    } 
	 
        });
      });
	var headerhrefurl ='';	
	if ($('html').is(':lang(en-gb)')){
	  headerhrefurl = 'https://searchopentext.com/?l=uk';
	 } else if ($('html').is(':lang(ja-jp)')){
	  headerhrefurl = 'https://searchopentext.com/?l=jp';
	 } else if ($('html').is(':lang(fr-fr)')){
	  headerhrefurl = 'https://searchopentext.com/?l=fr';
	 } else if ($('html').is(':lang(de-de)')){
	  headerhrefurl = 'https://searchopentext.com/?l=de';
	 } else if ($('html').is(':lang(en-au)')){
	 headerhrefurl = 'https://searchopentext.com/?l=au';
	 }  else if ($('html').is(':lang(sv-se)')){
	 headerhrefurl = 'https://searchopentext.com/?l=se';
	 }
	 if (headerhrefurl!='')
	 {
	  $("#search-mobile").attr('href',headerhrefurl);
	  $("#search-desktop").attr('href',headerhrefurl);
	 
	  headerhrefurl ='';
	 } 
	 //KK added this on 06/27/2023 for nav fix
	 var lang = ($("html").attr("lang")=="en")?"":$("html").attr("lang");
	 $("a.navbar-brand").attr("href","/" + lang); 
	 var contact_label, contact_link, productsaz_label, productsaz_link;
  	 if ($("html").attr("lang").length != 2){
       $('head').append('<link rel="stylesheet" href="/assets/css/hide-resources.css" type="text/css" />');
     }
	 switch(lang) {
		  case 'ja-jp':
			contact_label = 'お問い合わせ';
			productsaz_label='五十音順の製品一覧';
			productsaz_link='https://www.opentext.com/ja-jp/products/listing';
			contact_link = 'https://www.opentext.jp/about/contact-us/contact-opentext';
			break;
		  case 'de-de':
			contact_label = 'Kontakt';
			productsaz_label='Produktliste A–Z';
			productsaz_link='	https://www.opentext.com/de-de/produkte/liste';
			contact_link = 'https://www.opentext.de/uber-uns/contact-us/contact-opentext';
			break;
		  case 'fr-fr':
			contact_label = 'Contact';
			productsaz_label='Liste des produits de A à Z';
			productsaz_link='https://www.opentext.com/fr-fr/produits/liste';
			contact_link = 'https://www.opentext.fr/a-propos/contact-us/contact-opentext';
			break;	
		    case 'pt-br':
			contact_label = 'Contato';
			productsaz_label='Listagem de produtos de A a Z';
			productsaz_link='https://www.opentext.com/pt-br/produtos/listagem';
			contact_link = 'https://www.opentext.com/pt-br/contato';
			phone_num = "55 11 2536 0000";
			break;

			case 'es-es':
			contact_label = 'Contacto';
			productsaz_label='Lista de productos de la A a la Z';
			productsaz_link='https://www.opentext.com/es-es/productos/listado';
			contact_link = 'https://www.opentext.com/es-es/pongase-en-contacto-con';
			phone_num = "34 91 141 90 00";
			break;

			case 'it-it':
			contact_label = 'Contatto';
			productsaz_label='Elenco dei prodotti dalla A alla Z';
			productsaz_link='https://www.opentext.com/it-it/prodotti/quotazione';
			contact_link = 'https://www.opentext.com/it-it/contatto';
			phone_num = "800-4996-5440";
			break;

			case 'ko-kr':
			contact_label = '연락처';
			productsaz_label='A-Z 제품 목록';
			productsaz_link='https://www.opentext.com/ko-kr/products/listing';
			contact_link = 'https://www.opentext.com/ko-kr/contact';
			phone_num = "82 2-2185-1000";
			break;

			case 'zh-cn':
			contact_label = '联系方式';
			productsaz_label='A-Z 产品列表';
			productsaz_link='https://www.opentext.com/zh-cn/products/listing';
			contact_link = 'https://www.opentext.com/zh-cn/contact';
			phone_num = "400-810-8710";
			break;

			case 'zh-tw':
			contact_label = '聯繫';
			productsaz_label='A-Z 產品清單';
			productsaz_link='https://www.opentext.com/zh-tw/products/listing';
			contact_link = 'https://www.opentext.com/zh-tw/contact';
			phone_num = "886 2 5592 4949";
			break;      
		  default:
			contact_label = 'Contact';
			productsaz_label='A-Z product listing';
			productsaz_link='https://www.opentext.com/products/listing';
			contact_link = 'https://www.opentext.com/contact';
		}
		$("a.sitenav-contact").attr("href",contact_link);
		$("p.sitenav-menu-single").children("a").attr("href",productsaz_link);
  		$("p.sitenav-menu-single").children("a").text(productsaz_label);
		$("a.sitenav-contact").html(contact_label);
		if (typeof phone_num !== 'undefined') {
          $("a.ot-footer__phone").attr("href","tel:"+ phone_num);
         }
		$("p.sitenav-menu-single").children("a").html(productsaz_label);
	//KK added this on 06/27/2023 for nav fix	


});

(function(g,a,t,e,d,c,o){
if (!g[d]) {g.GatedContentObject=d;
g[d]=g[d]||function(){(g[d].q=g[d].q||[]).push(arguments)};
c=a.createElement(t),o=a.getElementsByTagName(t)[0];
c.async=1;c.src=e;o.parentNode.insertBefore(c, o)}
})(window, document, 'script', 'https://app.gatedcontent.com/scripts/25583474/app.js', 'gcdc');
gcdc('loadGates');

    
