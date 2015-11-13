// Scraping script used on Chrome console on https://de.wikipedia.org/wiki/Kategorie:Biermarke_(Deutschland)
var beers = [];
$('.mw-content-ltr:eq(0) .mw-category-group a').each(function() {
    var $this = $(this);
    beers.push({
        name: $this.text(),
        url: 'https://de.wikipedia.org' + $this.attr("href")
    });
});
JSON.stringify(beers);