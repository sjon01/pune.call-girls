// _BEGIN HEADER JS
$(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }
});
// ENDS HEADER JS

// _BEGIN MOBILE MENU JS
$(document).ready(function() {
    $(".mobile-toggle-ico").click(function() {
        $(".mobile-sidebar-wrap").addClass("mobile-sidebar-wrap-show");
    });

    $(".close-ico").click(function() {
        $(".mobile-sidebar-wrap").removeClass("mobile-sidebar-wrap-show");
    });

    $(".mobile-sidebar-wrap").show();
});

$(document).mouseup(function(e) {
    var popup = $(".mobile-sidebar-wrap");
    if (!$(".mobile-toggle-ico").is(e.target) &&
        !popup.is(e.target) &&
        popup.has(e.target).length === 0
    ) {
        popup.removeClass("mobile-sidebar-wrap-show");
    }
});

$(document).ready(function() {
    $(".list-menu .link").click(function() {
        $(".mobile-sidebar-wrap").removeClass("mobile-sidebar-wrap-show");
    });
});
// _ENDS MOBILE MENU JS

jQuery(document).ready(function() {
    var nextdata = 'no';

    function getData(limit, start, cityname, country, lowcost, highcost) {
        jQuery.ajax({
            url: "moredata.php",
            method: "POST",
            data: {
                limit: limit,
                start: start,
                city: cityname,
                location: country,
                lowcost: lowcost,
                highcost: highcost
            },
            dataType: 'html',
            cache: false,
            async: true,
            success: function(html) {
                if (html === '') {
                    nextdata = 'yes';
                } else {
                    jQuery('#card-grid .card-col:last').after(html);
                    jQuery("#nextdata").attr("data-curentp", start + 1);
                    nextdata = 'no';
                }
            }
        });
    }

    $(window).scroll(function() {
        if (
            $(window).scrollTop() + $(window).height() >= $("#card-grid").height() &&
            nextdata === 'no'
        ) {
            nextdata = 'yes';
            let limit = parseInt(jQuery("#nextdata").val());
            let nextpage = parseInt(jQuery("#nextdata").attr("data-curentp"));
            let cityname = jQuery("#nextdata").attr("data-cityname");
            let country = jQuery("#nextdata").attr("data-country");
            let lowcost = jQuery("#nextdata").attr("data-lowcost");
            let highcost = jQuery("#nextdata").attr("data-highcost");

            // Uncomment below to activate loading
            // getData(limit, nextpage, cityname, country, lowcost, highcost);
        }
    });

    // Removed postadd() and postclone.php call here

    $('.filter_option').change(function() {
        let currentval = $(this).val();
        $(".filter_option").val('');
        $(this).val(currentval);
        $("#filter-form").submit();
    });
});