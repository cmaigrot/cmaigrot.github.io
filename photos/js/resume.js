(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

})(jQuery); // End of use strict


function getClasses() {
	var classes = {
  		"Animaux" : "",
  		// subclasses of 'Animaux'
  		"Vertébrés" : "Animaux",
  		"Invertébrés" : "Animaux",
  		// subclasses of 'Vertébrés'
  		"Poissons" : "Vertébrés",
  		"Reptiles" : "Vertébrés",
  		"Amphibiens" : "Vertébrés",
  		"Oiseaux" : "Vertébrés",
  		"Mammifères" : "Vertébrés",
  		// subclasses of 'Mammifères'
  		"Insectivores" : "Mammifères",
  		"Carnivores" : "Mammifères",
  		"Chriptères" : "Mammifères",
  		"Pinnipèdes" : "Mammifères",
  		"Séréniens" : "Mammifères",
  		"Marsupiaux" : "Mammifères",
  		"Primates" : "Mammifères",
  		"Cétacés" : "Mammifères",
  		"Édentés" : "Mammifères",
  		"Lagomorphes" : "Mammifères",
  		"Rongeurs" : "Mammifères",
  		"Ongulés" : "Mammifères",
  		// subclasses of 'Rongeurs'
  		"Ragondin" : "Rongeurs",
  		// subclasses of 'Oiseaux'
  		"Passereaux" : "Oiseaux",
  		"Impennes" : "Oiseaux",
  		"Rapace" : "Oiseaux",
  		"Coureurs" : "Oiseaux",
  		"Palmipèdes" : "Oiseaux",
  		"Échassiers" : "Oiseaux",
  		"Colombins" : "Oiseaux",
  		"Grimpeurs" : "Oiseaux",
  		"Gallinacés" : "Oiseaux",
  		// subclasses of 'Rapace'
  		"Buse variable" : "Rapace",
  		// subclasses of 'Échassiers'
  		"Héron cendré" : "Échassiers",
  		"Aigrette garzette" : "Échassiers",
  		"Moineau domestique" : "Passereaux",

  	} ;
  	return classes;
}

function getPhotos() {
	var photos = {
  		"IMG_7206.JPG" : "Héron cendré",
  		"IMG_7209.JPG" : "Héron cendré",
  		"IMG_7274.JPG" : "Héron cendré",
  		"IMG_7272.JPG" : "Aigrette garzette",
  		"IMG_7447.JPG" : "Ragondin",
  		"IMG_7310.JPG" : "Moineau domestique",
  		"IMG_7597.JPG" : "Buse variable"
  	} ;
  	return photos;
}

function getSubClasses(classes, current_class) {
	var children = new Array();
    $.each(classes, function(key, value) {
      if( value === current_class && getPhotosBasedOnAClass(key).length > 0) {
			children.push(key);
      }
	});
	return children
}

function getSubClassesRec(classes, current_class) {
	var children = new Array();
    $.each(classes, function(key, value) {
      if( value === current_class ) {
		if(getPhotosBasedOnAClass(key).length > 0) {
			children.push(key);
			var subChildren = getSubClassesRec(classes, key);
			$.each(subChildren, function(key2, value2) {
				children.push(value2);
			}) ;
		}
      }
	});
	return children
}

function getSubClassesLeefs(classes, current_class) {
	var children = new Array();
    $.each(classes, function(key, value) {
      if( value === current_class ) {
		if(getPhotosBasedOnAClass(key).length > 0) {
			children.push(key);
			var subChildren = getSubClassesRec(classes, key);
			$.each(subChildren, function(key2, value2) {
				children.push(value2);
			}) ;
		}
      }
	});
	return children
}

function getPhotosBasedOnAClass(current_class) {
	var photos = getPhotos() ;
	var photosBasedOnAClass = new Array() ;
	var allSpecies = getSubClassesRec(getClasses(), current_class) ;
	
	$.each(photos, function(photo_name, photo_class) {
		if($.inArray(photo_class, allSpecies) >= 0 || current_class === photo_class) {
			photosBasedOnAClass.push(photo_name);
		}		
	});
	return photosBasedOnAClass;
}

function getSpecie(photo_name_param) {
	var photos = getPhotos() ;
	var response = "Unknown"
	$.each(photos, function(photo_name, photo_class) {
		if(photo_name_param === photo_name) {
			response = photo_class ;
		}		
	});
	
	return response;
}


function refresh(current_class) {
	
	var classes = getClasses()
	var parent = classes[current_class]
	// alert("Parent : " + parent) ;
	// end - getParent()
	
	$("#hierarchy_category").html("") ; 
	if(parent.length > 0) {
		$("#hierarchy_category").html($("#hierarchy_category").html()+"<li class=\"nav-item\"><a onClick=\"refresh('" + parent + "'); return false;\" class=\"nav-link js-scroll-trigger\" href=\"\"><i class=\"fa fa-arrow-circle-o-left\" aria-hidden=\"true\"></i> " + parent + " ("+getPhotosBasedOnAClass(parent).length+")</a></li>") ;
	}
	
	
	$(".actual_class").text(current_class) ;
	var subClassesRec = getSubClassesRec(classes, current_class)
	if(subClassesRec.length > 0) {
		$(".actual_subclasses").text("Sous-classes : ") ;
		$.each(subClassesRec, function(rank, value) {
			$(".actual_subclasses").text($(".actual_subclasses").text() + (rank>0?", ":"") + value) ;
		});
	} else {
		$(".actual_subclasses").text("") ;
	}
	
	$("#hierarchy_category").html($("#hierarchy_category").html()+"<li class=\"nav-item actual_class\"><span class=\"nav-link\">" + current_class + " ("+getPhotosBasedOnAClass(current_class).length+")</span></li>") ;
	
	var children = getSubClasses(classes, current_class) ;
	$.each(children, function(key, value) {
		$("#hierarchy_category").html($("#hierarchy_category").html()+"<li class=\"nav-item\"><a onClick=\"refresh('" + value + "'); return false;\" class=\"nav-link js-scroll-trigger\" href=\"\">" + value + " ("+getPhotosBasedOnAClass(value).length+") <i class=\"fa fa-arrow-circle-o-right\" aria-hidden=\"true\"></i></a></li>") ;
	});
	
	
	// PHOTOS
	var photos = getPhotosBasedOnAClass(current_class);

	$("#list_photos").html("");
	var image_size = 1 ;
	if (photos.length == 1) { image_size = 12 ; }
	if (photos.length == 2) { image_size = 6  ; }
	if (photos.length == 3) { image_size = 4  ; }
	$.each(photos, function(rank, value) {
		$("#list_photos").html($("#list_photos").html() + '<div class="col-sm-'+image_size+'"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a onClick="refresh(\'' + getSpecie(value) + '\'); return false;">'+getSpecie(value)+'</a></h3></div><div class="panel-body"><img alt="" src="img/photos/'+value+'" /></div></div></div><!-- /.col-sm-3 -->') ;
	});

}

$( document ).ready(function() {
	 current_class = "Vertébrés" ;
	 refresh(current_class) ;
});