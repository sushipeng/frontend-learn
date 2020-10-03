var CONST_CURRENT_VER = "development";
var CONST_SITE_TARGET_DIR = "/_site/";

function isDocumentationSiteViewedLocally() {
    return location.href.indexOf(CONST_SITE_TARGET_DIR) != -1;
}

function generateNavigationBarAndCrumbs() {
    var crumbs = "<ol class='breadcrumb'>";

    var activeVersion = getActiveDocumentationVersionInView(true);

    var uri = new URI(document.location);
    var segments = uri.segment();
    
    for (var i = 1; i < segments.length; i++) {
	var clz = ((i + 1) >= segments.length) ? 'breadcrumb-item active' : 'breadcrumb-item ';
	clz += "capitalize";      
	    
	var page = null;
	
	if ((i + 1) >= segments.length) {
		page = document.title.replace("CAS -", "").trim();
	} else {
		page = segments[i].replace(".html", "").replace(/-/g, " ").replace(/_/g, " ").replace(/index/g, "");  
	}
        crumbs += "<li class='" + clz + "'><a href='#'>" + page + "</a></li>";
    }

    crumbs += "</ol>";

    $("#docsNavBar").prepend(crumbs);

}

function getActiveDocumentationVersionInView(returnBlankIfNoVersion) {
    var currentVersion = CONST_CURRENT_VER;
    var href = location.href;
    var index = isDocumentationSiteViewedLocally() ? href.indexOf(CONST_SITE_TARGET_DIR) : -1;

    if (index == -1) {
        var uri = new URI(document.location);

        if (uri.filename() != uri.segment(1) && uri.segment(1) != "developer") {
            currentVersion = uri.segment(1);
        } else if (returnBlankIfNoVersion) {
            return "";
        }
    } else {
        href = href.substring(index + 7);
        index = href.indexOf("/");
        currentVersion = href.substring(0, index);
    }
    return currentVersion;
}


function loadSidebarForActiveVersion() {
    $.get( "/cas/" + getActiveDocumentationVersionInView() + "/sidebar.html", function( data ) {

        var menu = $(data);

        if ( menu.first().is('ul') ) {

            // menu.addClass('nav collapse').attr('id', 'sidebarTopics');
            menu.addClass('nav').attr('id', 'sidebarTopics');

            var topLevel = menu.find('> li>a');

            var subLevel = menu.find('> li ul');

            var nestedMenu = menu.find("ul li" ).has( "ul" ).children('a');

            topLevel.each(function() {
                sidebarTopNav( $(this) );
            });

            subLevel.each( function() {
                sidebarSubNav( $(this) );
            });

            nestedMenu.each(function() {
                sidebarTopNav( $(this) );
            });

            $('#sidebartoc').append(menu);

            generateSidebarLinksForActiveVersion();

        } else {
            $('#sidebartoc').hide();
        }


    });
}

function sidebarTopNav( el ) {
    // If the link is an anchor, then wire up toggle functionality, otherwise leave it.
    if ( el.attr('href').search(/(?:^|)#/g) >= 0 ) {
        el.attr({
            'data-toggle': "collapse",
            'data-parent': "#" + $(this).closest('ul').attr('id'),
            'aria-expanded': "false",
            title: $(this)[0].innerText,
            class: 'collapsed'
        })
        .append('<i class="expand"></i></a>');
    } else {

    }
};


function sidebarSubNav( el ) {
    var prevId = $(el).prev('a').attr('href');

    if ( prevId.search(/^#.*$/) >= 0) {
        prevId = prevId.substr(1);
    } else {
        prevId = '';
    }

    if (!prevId == '') {
        $(el).addClass('nav collapse').attr('id', prevId);
    }
}

function hideDevelopmentVersionWarning() {
    var formattedVersion = getActiveDocumentationVersionInView(true);
    if (formattedVersion != CONST_CURRENT_VER || formattedVersion == "") {
        $("#dev-doc-info").hide();
    } else {
	$("#dev-doc-info").show();    
    }
}

function generateSidebarLinksForActiveVersion() {
    $('#sidebar a').each(function () {
        var href = this.href;

        if (href.indexOf("$version") != -1) {
            href = href.replace("$version", "cas/" + getActiveDocumentationVersionInView());
            $(this).attr('href', href);
        }
    });
}

function generateToolbarIcons() {
    var CAS_REPO_URL_GITHUB = $('#forkme_banner').attr('href');
    var activeVersion = getActiveDocumentationVersionInView(true);

    var uri = new URI(document.location);
    var segments = uri.segment();
    var page = "";

    for (var i = 1; i < segments.length; i++) {
        page += segments[i] + "/";
    }
    editablePage = page.replace(".html", ".md");
    editablePage = editablePage.replace(CONST_CURRENT_VER, "")
    editablePage = editablePage.replace(activeVersion, "")
    if (editablePage == "") {
        editablePage = "index.md";
    }

    var imagesPath = "/cas/images/";
    if (isDocumentationSiteViewedLocally()) {
        var loc = location.href;
        var index = loc.indexOf(CONST_SITE_TARGET_DIR);
        var uri2 = loc.substring(0, index + CONST_SITE_TARGET_DIR.length);
        imagesPath = uri2 + "images/"
    }


    if (activeVersion != CONST_CURRENT_VER && activeVersion != "") {
        var linkToDev = "/cas/" + page.replace(activeVersion, CONST_CURRENT_VER);
        linkToDev = linkToDev.replace("html/", "html");

        $('#toolbarIcons').append("<a href='" + linkToDev +
            "'><i class='fa fa-cogs' title='See the latest version of this page'></i></a>");
    }

    var baseLink = CAS_REPO_URL_GITHUB;
    var editLink = "";
    var historyLink = "";
    var deleteLink = "";

    if (activeVersion == "") {
        editLink = baseLink + "/edit/gh-pages/";
        historyLink = baseLink + "/commits/gh-pages/";
        deleteLink = baseLink + "/delete/gh-pages/";
    } else if (activeVersion == CONST_CURRENT_VER) {
        editLink = baseLink + "/edit/master/docs/cas-server-documentation/";
        historyLink = baseLink + "/commits/master/docs/cas-server-documentation/";
        deleteLink = baseLink + "/delete/master/docs/cas-server-documentation/";
    } else if (activeVersion.indexOf("5.") != -1 || activeVersion.indexOf("6.") != -1) {
        editLink = baseLink + "/edit/" + activeVersion + "/docs/cas-server-documentation/";
        historyLink = baseLink + "/commits/" + activeVersion + "/docs/cas-server-documentation/";
        deleteLink = baseLink + "/delete/" + activeVersion + "/docs/cas-server-documentation/";
    } else if (activeVersion != CONST_CURRENT_VER) {
        editLink = baseLink + "/edit/" + activeVersion + "/cas-server-documentation/";
        historyLink = baseLink + "/commits/" + activeVersion + "/cas-server-documentation/";
        deleteLink = baseLink + "/delete/" + activeVersion + "/cas-server-documentation/";
    }

    editLink += editablePage;


    $('#toolbarIcons').append("<a target='_blank' href='" + editLink +
        "'><i class='fa fa-pencil' title='Edit with Github'></i></a>");

    historyLink += editablePage;


    $('#toolbarIcons').append("<a target='_blank' href='" + historyLink +
        "'><i class='fa fa-history' title='View commit history on Github'></i></a>");

    deleteLink += editablePage;


    $('#toolbarIcons').append("<a target='_blank' href='" + deleteLink +
        "'><i class='fa fa-times' title='Delete with Github'></i></a>");
}

function generateTableOfContentsForPage() {
    var toc = $('#tableOfContents ul');
    var page_contents = $('#pageContents ul');
    var arr = [];

    var headings = $('#cas-docs-container').find('h1, h2,h3');
    var subMenu = false;
    var subMenuId = null;

    headings.each(function (idx) {
        if ($(this).is('h1,h2')) {
            // If it is a H2 and the submenu flag is NOT set, then arr.push('<li>h2 text')
            if (!subMenu) {
                arr.push( tocItem(this.id, this.textContent));
            }

            // If it is a H2 and the submenu flag is set, then arr.push('</ul><li>h2 text')
            if (subMenu) {
                subMenu = false;
                arr.push('</ul></li>');
                arr.push( tocItem(this.id, this.textContent));
            }
        }
        ; // End H2

        if ($(this).is('h3')) {
            // If it is a H3 and the submenu flag is NOT set, then set the submenu flag then arr.push('<ul><li>h3 text</li>')
            if (!subMenu) {
                subMenu = true;
                arr.push('<ul class="nav">');
                arr.push( tocItem(this.id, this.textContent));
            } else if (subMenu) {
                arr.push( tocItem(this.id, this.textContent));
            }
        }
        ; // End H2
    });

    // After the loop, close the last <li> tag
    if (subMenu) {
        arr.push('</ul></li>');
    } else {
        arr.push('</li>');
    }

    toc.append(arr.join(''));
    page_contents.append(arr.join(''));
}

function tocItem(id, text) {
    return '<li><a href="#' + id + '">' + text + '</a>';
}


function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}



function generateDependencyLangFragments() {
  var preElements = $("div.language-xml.highlighter-rouge div.highlight td.rouge-code pre");
  $.each( preElements, function( i, val ) {

      var text = $(val).text();
      if (!text.trim().startsWith("<dependency>")) {
          return;
      }

      var mavenXml = $(val).html();

      xmlDoc = $.parseXML(text),
      $xml = $( xmlDoc ),
      $groupId = $xml.find("groupId");
      $artifactId = $xml.find("artifactId");
      
      var gradleDep = "<span class='nt'>compile</span> \"" + $groupId.text() + "<span class='p'>:</span>" + $artifactId.text() + "<span class='p'>:</span><span class='nt'>${project.'cas.version'}</span>\"";

	// do not break up this line	  
      var gradleFragment = `<div class='highlight'><pre class='highlight'><code><table style='border-spacing: 0'><tbody><tr><td class='gutter gl' style='text-align: right'><pre class='lineno'>1</pre></td><td class='code'><pre>` + gradleDep + `</pre></td></tr></tbody></table></code></pre></div>`;

      var parentTable = $(val).closest('pre.highlight').parent();

      var mavenId = Math.floor((Math.random() * 10000) + 1);
      var gradleId = Math.floor((Math.random() * 10000) + 1);
      
      var tabs = "<ul class='nav nav-pills'> \
  <li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#maven" + mavenId + "'>Maven</a></li> \
  <li class='nav-item'><a class='nav-link' data-toggle='tab' href='#gradle" + gradleId + "'>Gradle</a></li> \
  <li role='presentation' class='nav-item dropdown'> \
      <a class='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>Resources<span class='caret'></span></a> \
      <div class='dropdown-menu'> \
          <a class='dropdown-item' href='https://github.com/apereo/cas-overlay-template'>CAS Server Maven Overlay</a> \
          <a class='dropdown-item' href='https://github.com/apereo/cas-gradle-overlay-template'>CAS Server Gradle Overlay</a> \
          <div class='dropdown-divider'></div> \
          <a class='dropdown-item' href='https://github.com/apereo/cas-services-management-overlay'>CAS Management Maven Overlay</a> \
          <a class='dropdown-item' href='https://github.com/apereo/cas-services-management-gradle-overlay'>CAS Management Gradle Overlay</a> \
	  <div class='dropdown-divider'></div> \
	  <a class='dropdown-item' href='https://github.com/apereo/cas-configserver-overlay'>CAS Configuration Server Overlay</a> \
	  <a class='dropdown-item' href='https://github.com/apereo/cas-discoveryserver-overlay'>CAS Discovery Server Overlay</a> \
	  <a class='dropdown-item' href='https://github.com/apereo/cas-bootadmin-overlay'>CAS Spring Boot Admin Server</a> \
	  <div class='dropdown-divider'></div> \
<a class='dropdown-item' href='https://github.com/apereo/cas-webapp-docker'>Dockerized CAS Deployment</a> \
      </div> \
  </li> \
  </ul> \
  <div class='tab-content clearfix'> \
    <div class='tab-pane fade in active language-xml highlighter-rouge' id='maven" + mavenId + "'>" + parentTable.html() + "</div> \
    <div class='tab-pane fade in language-java highlighter-rouge' id='gradle" + gradleId + "'>" + gradleFragment + "</div> \
  </div>";

      var divHighlight = parentTable.closest('div.highlight').parent();
      
      divHighlight.empty();
      divHighlight.prepend(tabs);
  });
}

function responsiveImages() {
    $('img').each(function() {
        $(this).addClass('img-fluid');
    });
}

function responsiveTables() {
    $('table').each(function() {
        $(this).addClass('table table-responsive');
    });
}

function copyButton() {
    $('pre.highlight').each(function() {
        var btn = '<button class="copy-button hidden-md-down fa fa-clipboard" data-toggle="tooltip" title="Copy Code" />';
        $(this).append( btn );
    });
}

function enableBootstrapTooltips() {
	$('[data-toggle="tooltip"]').tooltip(); 
}

var clipboard = new Clipboard('.copy-button', {
    text: function(trigger) {
        var code = $(trigger).parent().find('td.rouge-code pre').text()
        return code;
    }
});

clipboard.on('success', function(e) {
    e.clearSelection();
});

$(function () {
	
    
    loadSidebarForActiveVersion();
    generateTableOfContentsForPage();
    generateDependencyLangFragments();
    generateToolbarIcons();
    generateNavigationBarAndCrumbs();
	
    responsiveImages();
    responsiveTables();

    copyButton();

    var formattedVersion = getActiveDocumentationVersionInView();
    if (formattedVersion != "" && formattedVersion.indexOf(CONST_CURRENT_VER) == -1) {
        formattedVersion = " (" + formattedVersion + ")"
    } else {
        formattedVersion = "";
    }
    hideDevelopmentVersionWarning();
    //document.title = $("h1").first().text() + formattedVersion;

    $('[data-toggle=offcanvas]').click(function () {
        $(this).toggleClass('visible-xs-up text-center');
        $(this).find('i').toggleClass('fa-chevron-left fa-chevron-right');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-xs-down');

    });
    enableBootstrapTooltips();
});


$(function() {
  return $("h2, h3, h4, h5, h6").each(function(i, el) {
    var $el, icon, id;
    $el = $(el);
    id = $el.attr('id');
    icon = '<i class="fa fa-link"></i>';
    if (id) {
      return $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
    }
  });
});
