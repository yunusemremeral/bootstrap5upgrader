(function() {
  var RULESET = [
    {
      title: "Upgrade CSS/JS CDN Reference",
      description: "Inspect HTML for references to a recognized BootstrapCDN version of Bootstrap and swap it out for Bootstrap 4.",
      run: function(doc) {
        var count = 0;
        
        // Replace Bootstrap CDN CSS with 3.0.0-rc1 version
        $(doc).find("link[rel=stylesheet][href]").each(function() {
          $link = $(this);
          var href = $link.attr('href')
          if ( href && href.match(new RegExp("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.[0-6]/css/bootstrap.min.css")) ) {
            $link.attr("href","https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css");
            count++;
          }
        });
		
	          
        // Replace Bootstrap CDN JS with 3.0.0-rc1 version
        $(doc).find("script[src]").each(function() {
          $script = $(this);
          var src = $script.attr('src')
          if ( src && src.match(new RegExp(" //netdna.bootstrapcdn.com/bootstrap/3.3.[0-6]/js/bootstrap.min.js")) ) {
            $script.attr("href","https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js");
            count++;
          }
        });
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Typography",
      description: "Dropped the <code>.page-header</code> class entirely.",
      run: function(doc) {
        var count = 0;
        
        for (var i = 1; i <= 12; i++) {
          var sI = i.toString();
          $(doc).find(".span" + sI).each(function() {
            $this = $(this);
            // Make sure we're dealing with a container, not a form element
            if ( $this.is("section, div, aside, article") ) {
              $this.removeClass("span" + sI).addClass("col-sm-" + sI + " col-lg-" + sI);
              count += $this.length;
            }
          });
        }
        
        // Remove all deprecated classes
        $pageHeader = $(doc).find(".page-header")
        if ($pageHeader.length > 0) {
          count += $pageHeader.length;
          $pageHeader.removeClass('page-header');
        }
        
        // Remove .container-fluid since it doesn't do anything
        $blockquote = $(doc).find("blockquote")
        if ($blockquote.length > 0) {
          count += $blockquote.length;
          $blockquote.addClass('blockquote');
        }
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Fix Button  Classes",
      description: "Renamed <code>.btn-default</code> to <code>.btn-secondary</code>, dropped classes <code>.btn-xs</code>, <code>.btn-group-xs</code>",
      run: function(doc) {
        var $buttonDef = $(doc).find(".btn-default");
        var $buttonXs = $(doc).find(".btn-xs");
        var $buttonGr = $(doc).find(".btn-group-xs");
        var count = $buttonDef.length + $buttonGr.length + $buttonGr.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $buttonDef.removeClass('btn-default').addClass('btn-secondary');
        $buttonXs.removeClass('btn-xs');
        $buttonXs.removeClass('btn-group-xs');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	  {
      title: "Navbar",
      description: "Dropped the <code>.navbar-form</code> class entirely. It’s no longer necessary.",
      run: function(doc) {
        var $navForm = $(doc).find(".navbar-form");
    
        var count = $navForm.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $navForm.removeClass('navbar-form');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	{
      title: "Fix Images Classes",
      description: "Renamed <code class=\"highlighter-rouge\">.img-responsive</code> to <code class=\"highlighter-rouge\">.img-fluid</code>.",
      run: function(doc) {
        var $images = $(doc).find(".img-responsive");
        var count = $images.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $images.removeClass('img-responsive').addClass('img-fluid');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Pager",
      description: "Renamed <code>.previous</code> and <code>.next</code> to <code>.pager-prev</code> and <code>.pager-next</code>.",
      run: function(doc) {
        $pagerPrev = $(doc).find(".previous");
        $pagerNext = $(doc).find(".next");
        var count = $pagerPrev.length + $pagerNext.length;
        $pagerPrev.removeClass('previous').addClass('pager-prev');
        $pagerPrev.removeClass('next').addClass('pager-next');
		
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	/*{
      title: "Pagination",
      description: "Renamed <code>.previous</code> and <code>.next</code> to <code>.pager-prev</code> and <code>.pager-next</code>.",
      run: function(doc) {
        $pagerPrev = $(doc).find(".previous");
        $pagerNext = $(doc).find(".next");
        var count = $pagerPrev.length + $pagerNext.length;
        $pagerPrev.removeClass('previous').addClass('pager-prev');
        $pagerPrev.removeClass('next').addClass('pager-next');
		
        return (count > 0) ? count + " Replaced" : false;
      }
    },*/
    
    {
      title: "Tables",
      description: "Renamed <code>.table-condensed</code> to <code>.table-sm</code> for consistency.",
	  run: function(doc) {
        var $tables = $(doc).find(".table-condensed");
        var count = $tables.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $tables.removeClass('table-condensed').addClass('table-sm');
        
        return (count > 0) ? count + " Replaced" : false;
      }
     
    },
    
    {
      title: "Panels, thumbnails, and wells",
      description: "Dropped entirely for the new card component.",
      run: function(doc) {
        var count = 0;
        
        $panel = $(doc).find(".panel");
        $panel.removeClass('panel-default');
        $panel.removeClass('panel').addClass('card');
        count += $panel.length;        
		
		$well = $(doc).find(".well");
        $well.removeClass('well').addClass('card');
        count += $well.length;		
		
		$thumb = $(doc).find(".thumbnail");
        $thumb.removeClass('thumbnail').addClass('card');
        count += $thumb.length;
        
        $panelHeading = $(doc).find(".panel-heading");
        $panelHeading.removeClass('panel-heading').addClass('card-header');
        count += $panelHeading.length;

		$panelTitle = $(doc).find(".panel-title");
        $panelTitle.removeClass('panel-title').addClass('card-title');
        count += $panelTitle.length;
		
		$panelBody = $(doc).find(".panel-body");
        $panelBody.removeClass('panel-body').addClass('card-block');
        count += $panelBody.length;	
		
		$panelFoot = $(doc).find(".panel-footer");
        $panelFoot.removeClass('panel-footer').addClass('card-footer');
        count += $panelFoot.length;		
		
		
		$panelPrim = $(doc).find(".panel-primary");
        $panelPrim.removeClass('panel-primary').addClass('card-primary');
        count += $panelPrim.length;
		
		$panelSucc = $(doc).find(".panel-success");
        $panelSucc.removeClass('panel-success').addClass('card-success');
        count += $panelSucc.length;		
		
		$panelInfo = $(doc).find(".panel-info");
        $panelInfo.removeClass('panel-info').addClass('card-info');
        count += $panelInfo.length;
		
		$panelWarn = $(doc).find(".panel-warning");
        $panelWarn.removeClass('panel-warning').addClass('card-warning');
        count += $panelWarn.length;
		
		$panelDang = $(doc).find(".panel-danger");
        $panelDang.removeClass('panel-danger').addClass('card-danger');
        count += $panelDang.length;
		      

        
        return (count > 0) ? count + " Replaced" : false;        
      }
    },
      
    {
      title: "Carousel",
      description: "Renamed <code>.item</code> to <code>.carousel-item</code> .",
      run: function(doc) {
        $carousel = $(doc).find(".carousel");
        $item = $($carousel).find(".item");
        $item.removeClass('item').addClass('carousel-item');
        var count = $item.length;
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
  
    {
      title: "Utilities",
      description: "Removed <code>.pull-left</code> and <code>.pull-right</code> since they’re redundant to <code>.pull-xs-left</code> and <code>.pull-xs-right</code>",
      run: function (doc) {
	  $pullL = $(doc).find(".pull-left");
       $pullL.removeClass('pull-left');	 
	   $pullR = $(doc).find(".pull-right");
       $pullR.removeClass('pull-right');
        var count = $pullL.length + $pullR.length;
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	{
      title: "Responsive utilities",
      description: "The old classes (<code class=\"highlighter-rouge\">.hidden-xs</code> <code class=\"highlighter-rouge\">.hidden-sm</code> <code class=\"highlighter-rouge\">.hidden-md</code> <code class=\"highlighter-rouge\">.hidden-lg</code> <code class=\"highlighter-rouge\">.visible-xs-block</code> <code class=\"highlighter-rouge\">.visible-xs-inline</code> <code class=\"highlighter-rouge\">.visible-xs-inline-block</code> <code class=\"highlighter-rouge\">.visible-sm-block</code> <code class=\"highlighter-rouge\">.visible-sm-inline</code> <code class=\"highlighter-rouge\">.visible-sm-inline-block</code> <code class=\"highlighter-rouge\">.visible-md-block</code> <code class=\"highlighter-rouge\">.visible-md-inline</code> <code class=\"highlighter-rouge\">.visible-md-inline-block</code> <code class=\"highlighter-rouge\">.visible-lg-block</code> <code class=\"highlighter-rouge\">.visible-lg-inline</code> <code class=\"highlighter-rouge\">.visible-lg-inline-block</code>) are gone. The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-down</code> classes hide the element when the viewport is at the given breakpoint or smaller (e.g. <code class=\"highlighter-rouge\">.hidden-md-down</code> hides an element on extra-small, small, and medium devices). <p>Rather than using explicit <code class=\"highlighter-rouge\">.visible-*</code> classes, you make an element visible by simply not hiding it at that screen size. You can combine one <code class=\"highlighter-rouge\">.hidden-*-up</code> class with one <code class=\"highlighter-rouge\">.hidden-*-down</code> class to show an element only on a given interval of screen sizes (e.g. <code class=\"highlighter-rouge\">.hidden-sm-down.hidden-xl-up</code> shows the element only on medium and large devices).</p> <p>Note that the changes to the grid breakpoints in v4 means that you’ll need to go one breakpoint larger to achieve the same results (e.g. <code class=\"highlighter-rouge\">.hidden-md</code> is more similar to <code class=\"highlighter-rouge\">.hidden-lg-down</code> than to <code class=\"highlighter-rouge\">.hidden-md-down</code>). The new responsive utility classes don’t attempt to accommodate less common cases where an element’s visibility can’t be expressed as a single contiguous range of viewport sizes; you will instead need to use custom CSS in such cases.</p>",
      run: function (doc) {
		$hideXs = $(doc).find(".hidden-xs");
        $hideXs.removeClass('hidden-xs').addClass('hidden-xs-up');
        count += $hideXs.length;    
		
		$hideSm = $(doc).find(".hidden-sm");
        $hideSm.removeClass('hidden-sm').addClass('hidden-sm-up');
        count += $hideSm.length;
		
		$hideMd = $(doc).find(".hidden-md");
        $hideMd.removeClass('hidden-md').addClass('hidden-md-up');
        count += $hideMd.length;
		
		$hideLg = $(doc).find(".hidden-lg");
        $hideLg.removeClass('hidden-lg').addClass('hidden-lg-up');
        count += $hideLg.length;
		
		 var count = $hideLg.length + $hideMd.length + $hideSm.length + $hideXs.length;
        
        return (count > 0) ? count + " Replaced" : false;
		
      }
    },
  
    {
      title: "BS 4 to 5 Changes - Forms & RTL",
      description: '<h5 id="rtl">RTL<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#rtl" style="padding-left: 0.375em;"></a></h5><ul><li>Horizontal direction specific variables, utilities, and mixins have all been renamed to use logical properties like those found in flexbox layouts—e.g., <code>start</code> and <code>end</code> in lieu of <code>left</code> and <code>right</code>.</li></ul><h5 id="forms">Forms<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#forms" style="padding-left: 0.375em;"></a></h5><ul><li><p><strong>Added new floating forms!</strong> We’ve promoted the Floating labels example to fully supported form components. <a href="/docs/5.0/forms/floating-labels/">See the new Floating labels page.</a></p></li><li><p><span class="badge bg-danger">Breaking</span> <strong>Consolidated native and custom form elements.</strong> Checkboxes, radios, selects, and other inputs that had native and custom classes in v4 have been consolidated. Now nearly all our form elements are entirely custom, most without the need for custom HTML.</p><ul><li><code>.custom-check</code> is now <code>.form-check</code>.</li><li><code>.custom-check.custom-switch</code> is now <code>.form-check.form-switch</code>.</li><li><code>.custom-select</code> is now <code>.form-select</code>.</li><li><code>.custom-file</code> and <code>.form-file</code> have been replaced by custom styles on top of <code>.form-control</code>.</li><li><code>.custom-range</code> is now <code>.form-range</code>.</li><li>Dropped native <code>.form-control-file</code> and <code>.form-control-range</code>.</li></ul></li><li><p><span class="badge bg-danger">Breaking</span> Dropped <code>.input-group-append</code> and <code>.input-group-prepend</code>. You can now just add buttons and <code>.input-group-text</code> as direct children of the input groups.</p></li><li><p>The longstanding <a href="https://github.com/twbs/bootstrap/issues/25110">Missing border radius on input group with validation feedback bug</a> is finally fixed by adding an additional <code>.has-validation</code> class to input groups with validation.</p></li><li><p><span class="badge bg-danger">Breaking</span> <strong>Dropped form-specific layout classes for our grid system.</strong> Use our grid and utilities instead of <code>.form-group</code>, <code>.form-row</code>, or <code>.form-inline</code>.</p></li><li><p><span class="badge bg-danger">Breaking</span> Form labels now require <code>.form-label</code>.</p></li><li><p><span class="badge bg-danger">Breaking</span> <code>.form-text</code> no longer sets <code>display</code>, allowing you to create inline or block help text as you wish just by changing the HTML element.</p></li><li><p>Validation icons are no longer applied to <code>&lt;select&gt;</code>s with <code>multiple</code>.</p></li><li><p>Rearranged source Sass files under <code>scss/forms/</code>, including input group styles.</p></li></ul>',
      run: function (doc) {
		var changedCount = 0;
		var droppedCount = 0;
		var otherWarnings = "";
		
        $customFile = $(doc).find(".custom-file");
        $customFile.removeClass('custom-file').addClass('form-control');
        changedCount += $customFile.length;
		
		$customCheck = $(doc).find(".custom-check");
        $customCheck.removeClass('custom-check').addClass('form-check');
        changedCount += $customCheck.length;
		
		$customCheckCustomSwitch = $(doc).find(".custom-check.custom-switch");
        $customCheckCustomSwitch.removeClass('custom-check.custom-switch').addClass('form-check.form-switch');
        changedCount += $customCheckCustomSwitch.length;
		
		$customSelect = $(doc).find(".custom-select");
        $customSelect.removeClass('custom-select').addClass('form-select');
        changedCount += $customSelect.length;
		
		$customFile = $(doc).find(".form-file");
        $customFile.removeClass('form-file').addClass('form-control');
        changedCount += $customFile.length;
		
		$customRange = $(doc).find(".custom-range");
        $customRange.removeClass('custom-range').addClass('form-range');
        changedCount += $customRange.length;
		
		
		//dropssssssssssss
		$textJustify = $(doc).find(".text-justify");
        $textJustify.removeClass('text-justify')
		droppedCount += $textJustify.length;
		
		$inputGroupAppend = $(doc).find(".input-group-append");
        $inputGroupAppend.removeClass('input-group-append')
		droppedCount += $inputGroupAppend.length;
		
		$inputGroupPrepend = $(doc).find(".input-group-prepend");
        $inputGroupPrepend.removeClass('input-group-prepend')
		droppedCount += $inputGroupPrepend.length;
		
		$formControlFile = $(doc).find(".form-control-file");
        $formControlFile.removeClass('form-control-file')
		droppedCount += $formControlFile.length;
		
		$leftItem = doc.documentElement.innerHTML.search('left');
		$rightItem = doc.documentElement.innerHTML.search('right');
		
		
		otherWarnings += ($leftItem != -1 || $rightItem != -1) ? "Check left or right notation (ntw: start and end)" : "";
		otherWarnings += (droppedCount > 0) ? droppedCount + " Dropped" : "";
		otherWarnings += (changedCount > 0) ? changedCount + " Replaced " : "";
		
		return otherWarnings;
        
      }
    },
	{
      title: "BS 4 to 5 Changes - Buttons & Cards & Badges",
      description: '<h5 id="buttons">Buttons<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#buttons" style="padding-left: 0.375em;"></a></h5><ul><li><p><span class="badge bg-danger">Breaking</span> <strong><a href="https://getbootstrap.com/docs/5.0/forms/checks-radios/#toggle-buttons">Toggle buttons</a>, with checkboxes or radios, no longer require JavaScript and have new markup.</strong> We no longer require a wrapping element, add <code>.btn-check</code> to the <code>&lt;input&gt;</code>, and pair it with any <code>.btn</code> classes on the <code>&lt;label&gt;</code>. <a href="https://github.com/twbs/bootstrap/pull/30650">See #30650</a>. <em>The docs for this has moved from our Buttons page to the new Forms section.</em></p></li><li><p><span class="badge bg-danger">Breaking</span> <strong>Dropped <code>.btn-block</code> for utilities.</strong> Instead of using <code>.btn-block</code> on the <code>.btn</code>, wrap your buttons with <code>.d-grid</code> and a <code>.gap-*</code> utility to space them as needed. Switch to responsive classes for even more control over them. <a href="https://getbootstrap.com/docs/5.0/components/buttons/#block-buttons">Read the docs for some examples.</a></p></li><li><p>Updated our <code>button-variant()</code> and <code>button-outline-variant()</code> mixins to support additional parameters.</p></li><li><p>Updated buttons to ensure increased contrast on hover and active states.</p></li><li><p>Disabled buttons now have <code>pointer-events: none;</code>.</p></li></ul><h5 id="card">Card<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#card" style="padding-left: 0.375em;"></a></h5><ul><li><p><span class="badge bg-danger">Breaking</span> Dropped <code>.card-deck</code> in favor of our grid. Wrap your cards in column classes and add a parent <code>.row-cols-*</code> container to recreate card decks (but with more control over responsive alignment).</p></li><li><p><span class="badge bg-danger">Breaking</span> Dropped <code>.card-columns</code> in favor of Masonry. <a href="https://github.com/twbs/bootstrap/pull/28922">See #28922</a>.</p></li><li><p><span class="badge bg-danger">Breaking</span> Replaced the <code>.card</code> based accordion with a <a href="/docs/5.0/components/accordion/">new Accordion component</a>.</p></li></ul><h5 id="badges">Badges<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#badges" style="padding-left: 0.375em;"></a></h5><ul><li><p><span class="badge bg-danger">Breaking</span> Dropped all <code>.badge-*</code> color classes for background utilities (e.g., use <code>.bg-primary</code> instead of <code>.badge-primary</code>).</p></li><li><p><span class="badge bg-danger">Breaking</span> Dropped <code>.badge-pill</code>—use the <code>.rounded-pill</code> utility instead.</p></li><li><p><span class="badge bg-danger">Breaking</span> Removed hover and focus styles for <code>&lt;a&gt;</code> and <code>&lt;button&gt;</code> elements.</p></li><li><p>Increased default padding for badges from <code>.25em</code>/<code>.5em</code> to <code>.35em</code>/<code>.65em</code>.</p></li></ul>',
      run: function (doc) {
		var droppedCount = 0;
		var otherWarnings = "";
		var changedCount = 0;
		
		$badgePill = $(doc).find(".badge-pill");
        $badgePill.removeClass('badge-pill').addClass('rounded-pill');
        changedCount += $badgePill.length;
	    
		$badgeItem = doc.documentElement.innerHTML.search('badge');
		
		$buttonBlock = $(doc).find(".btn-block");
        $buttonBlock.removeClass('btn-block')
		droppedCount += $buttonBlock.length;
		
		$cardColumns = $(doc).find(".card-columns");
        $cardColumns.removeClass('card-columns')
		droppedCount += $cardColumns.length;
		
		$cardColumns = $(doc).find(".close");
		
		
		otherWarnings += ($badgeItem != -1) ? "Check Badge" : "";
		otherWarnings += (droppedCount > 0) ? droppedCount + " Dropped" : "";
		otherWarnings += (changedCount > 0) ? changedCount + " Replaced " : "";
		otherWarnings += ($cardColumns.length > 0) ? "Check .close class, it changed with .btn-class" : "";
		return otherWarnings;
      }
	},
	{
      title: "BS 4 to 5 Changes - Popovers & Tooltips",
      description: '<h5 id="popovers">Popovers<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#popovers" style="padding-left: 0.375em;"></a></h5><ul><li><p><span class="badge bg-danger">Breaking</span> Renamed <code>.arrow</code> to <code>.popover-arrow</code> in our default popover template.</p></li><li><p>Renamed <code>whiteList</code> option to <code>allowList</code>.</p></li></ul><h5 id="tooltips">Tooltips<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#tooltips" style="padding-left: 0.375em;"></a></h5><ul><li><p><span class="badge bg-danger">Breaking</span> Renamed <code>.arrow</code> to <code>.tooltip-arrow</code> in our default tooltip template.</p></li><li><p><span class="badge bg-danger">Breaking</span> The default value for the <code>fallbackPlacements</code> is changed to <code>["top", "right", "bottom", "left"]</code> for better placement of popper elements.</p></li><li><p><span class="badge bg-danger">Breaking</span> Renamed <code>whiteList</code> option to <code>allowList</code>.</p></li></ul>',
      run: function (doc) {
		var droppedCount = 0;
		var otherWarnings = "";
		var changedCount = 0;
		
		$arrow = $(doc).find(".arrow");	
		$whiteList = doc.documentElement.innerHTML.search('whiteList');
		
		otherWarnings += ($arrow.length > 0) ? "Check .arrow class, it changed with .popover-arrow or .tooltip-arrow" : "";
		otherWarnings += ($whiteList != -1) ? "Check whiteList for Tooltips, it changed with allowList" : "";
		return otherWarnings;
      }
    },
	{
      title: "BS 4 to 5 Changes - Utilities",
      description: '<li><p><span class="badge bg-danger">Breaking</span> Renamed several utilities to use logical property names instead of directional names with the addition of RTL support:</p><ul><li>Renamed <code>.left-*</code> and <code>.right-*</code> to <code>.start-*</code> and <code>.end-*</code>.</li><li>Renamed <code>.float-left</code> and <code>.float-right</code> to <code>.float-start</code> and <code>.float-end</code>.</li><li>Renamed <code>.border-left</code> and <code>.border-right</code> to <code>.border-start</code> and <code>.border-end</code>.</li><li>Renamed <code>.rounded-left</code> and <code>.rounded-right</code> to <code>.rounded-start</code> and <code>.rounded-end</code>.</li><li>Renamed <code>.ml-*</code> and <code>.mr-*</code> to <code>.ms-*</code> and <code>.me-*</code>.</li><li>Renamed <code>.pl-*</code> and <code>.pr-*</code> to <code>.ps-*</code> and <code>.pe-*</code>.</li><li>Renamed <code>.text-left</code> and <code>.text-right</code> to <code>.text-start</code> and <code>.text-end</code>.</li></ul></li>',
      run: function (doc) {
		var droppedCount = 0;
		var otherWarnings = "";
		var changedCount = 0;
		
		$floatLeft = $(doc).find(".float-left");
        $floatLeft.removeClass('float-left').addClass('float-start');
        changedCount += $floatLeft.length;
		
		$floatRight = $(doc).find(".float-right");
        $floatRight.removeClass('float-right').addClass('float-end');
        changedCount += $floatRight.length;
		
		$borderLeft = $(doc).find(".border-left");
        $borderLeft.removeClass('border-left').addClass('border-start');
        changedCount += $borderLeft.length;
		
		$borderRight = $(doc).find(".border-right");
        $borderRight.removeClass('border-right').addClass('border-end');
        changedCount += $borderRight.length;
	  
	    $roundedLeft = $(doc).find(".rounded-left");
        $roundedLeft.removeClass('rounded-left').addClass('rounded-start');
        changedCount += $roundedLeft.length;
		
		$roundedRight = $(doc).find(".rounded-right");
        $roundedRight.removeClass('rounded-right').addClass('rounded-end');
        changedCount += $roundedRight.length;
		
		$borderRight = $(doc).find(".border-right");
        $borderRight.removeClass('border-right').addClass('border-end');
        changedCount += $borderRight.length;
		
		$textLeft = $(doc).find(".text-left");
        $textLeft.removeClass('text-left').addClass('text-start');
        changedCount += $textLeft.length;
		
		$textRight = $(doc).find(".text-right");
        $textRight.removeClass('text-right').addClass('text-end');
        changedCount += $textRight.length;
		
		$textMonospace = $(doc).find(".text-monospace");
        $textMonospace.removeClass('text-monospace').addClass('font-monospace');
        changedCount += $textMonospace.length;
		
		otherWarnings += (changedCount > 0) ? changedCount + " Replaced " : "";
		otherWarnings += ($arrow.length > 0) ? " Check .arrow class, it changed with .popover-arrow or .tooltip-arrow" : "";
		otherWarnings += ($badgeItem != -1) ? " Check whiteList for Tooltips, it changed with allowList" : "";
		return otherWarnings;
      }
    },
	{
	  title: "BS 4 to 5 Changes - Replace all parts of class",
      description: '',
      run: function (doc) {
		var changedCount = 0;
		var otherWarnings = "";
		
		$fontWeight = doc.search('font-weight-');
		if($fontWeight != -1)
			doc = doc.replaceAll('font-weight-','fw-');
		changedCount += ($fontWeight != -1 ? 1 : 0);
		
		$fontStyle = doc.search('font-style-');
		if($fontStyle != -1)
			doc = doc.replaceAll('font-style-','fst-');
		changedCount += ($fontStyle != -1 ? 1 : 0);
		
		$mlNotation = doc.search('ml-');
		if($mlNotation != -1)
			doc = doc.replaceAll('ml-','ms-');
		changedCount += ($mlNotation != -1 ? 1 : 0);
		
		$mrNotation = doc.search('mr-');
		if($mrNotation != -1)
			doc = doc.replaceAll('mr-','me-');
		changedCount += ($mrNotation != -1 ? 1 : 0);
		
		$plNotation = doc.search('pl-');
		if($plNotation != -1)
			doc = doc.replaceAll('pl-','ps-');
		changedCount += ($plNotation != -1 ? 1 : 0);
		
		$prNotation = doc.search('pr-');
		if($prNotation != -1)
			doc = doc.replaceAll('pr-','pe-');
		changedCount += ($prNotation != -1 ? 1 : 0);
		
		$leftNotation = doc.search('left-');
		if($leftNotation != -1)
			doc = doc.replaceAll('left-','start-');
		changedCount += ($leftNotation != -1 ? 1 : 0);
		
		$rightNotation = doc.search('right-');
		if($rightNotation != -1)
			doc = doc.replaceAll('right-','end-');
		changedCount += ($rightNotation != -1 ? 1 : 0);
		
		$dataToggle = doc.search('data-toggle=');
		if($dataToggle != -1)
			doc = doc.replaceAll('data-toggle=','data-bs-toggle=');
		changedCount += ($dataToggle != -1 ? 1 : 0);
		
		$whiteList = doc.search('whitelist');
		if($whiteList != -1)
			doc = doc.replaceAll('whitelist','allowList');
		changedCount += ($whiteList != -1 ? 1 : 0);
		
		otherWarnings += (changedCount > 0) ? changedCount + " Replaced " : "";
		return {res: otherWarnings, output: doc};
	}
	}
	
  ];
  
  var Upgrader = {
    rules: RULESET,
    perform: function(input, report) {
      var doc = (new DOMParser()).parseFromString(input, 'text/html');
      var results = [];
      for (var i = 0; i < Upgrader.rules.length-1; i++) {
        var rule = Upgrader.rules[i];
        results.push(rule.run(doc));
      }
      
      var output = "<!doctype html>\n" + doc.getElementsByTagName("html")[0].outerHTML;
	  var response = Upgrader.rules[Upgrader.rules.length-1].run(output);
	  
	  output = response.output;
	  results.push(response.res);
	  
      
      if (report) {
        return {
          output: output,
          results: results
        }
      } else {
        return output;
      }
    }
  }
  
  window.BootstrapUpgrader = Upgrader;
})()