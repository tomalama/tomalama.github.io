$(document).ready(function() {
    runIntro();
    $(".grid").hide();
    $(".grid").attr("hidden", null)
    $(".tags").hide();
    $(".last-updated").hide();
    $("#search").hide();
    $("#search").attr("hidden", null)

    // quick search regex
    var qsRegex;

    // search bar suggestions
    var placeholders = ['Type something here...','projects...','resume...','contact...'];

    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        filter: function() {
            return qsRegex ? $(this).text().match( qsRegex ) : true;
        },
        getSortData: {
            lastUpdated: function(elem) {
                return Date.parse($(elem).find('.last-updated').text());
            }
        },
        sortBy: 'lastUpdated',
        sortAscending: false
    });

    // use value of search field to filter
    var $quicksearch = $('#search').keyup( debounce( function() {
        if ($quicksearch.val() == "") {
            window.setTimeout(function () {
                $("#search-div").removeClass("top").addClass("center-fixed");
            }, 75);
            $grid.fadeOut(100);
        } else {
            $('#search-div').removeClass("center-fixed").addClass("top");
            $grid.fadeIn(200);
            qsRegex = new RegExp( $quicksearch.val(), 'gi' );
            $grid.isotope();
        }
    }, 50 ) );

    window.setTimeout(function cycle() {
        var placeholder = placeholders.shift();
        $('#search').attr('placeholder', placeholder);
        placeholders.push(placeholder);
        setTimeout(cycle, 2000);
    }, 4000);
});

function runIntro() {

    $introText = $('#intro-hello');
    $introText.delay(200).fadeIn(400)
    .delay(400).fadeOut(400)
    // 1400 Timeout required for next text
    .delay(200).fadeIn(400)
    .delay(800).fadeOut(400);
    // 3200 Timeout required for search bar to fade in

    window.setTimeout(function () {
        $introText.text("Welcome to Tommy Nguyen's website.");
    }, 1200);

    window.setTimeout(function () {
        $("#search").fadeIn(400);
        $("#search").focus();
    }, 3200);
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
    var timeout;
    return function debounced() {
        if ( timeout ) {
        clearTimeout( timeout );
        }
        function delayed() {
            fn();
            timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
    }
}
