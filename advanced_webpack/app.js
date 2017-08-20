require('jquery')
import Carousel from './js/Carousel'
import GoTop from './js/GoTop'
import Waterfall from './js/Waterfall'

new GoTop($('body'));
new Waterfall();
carousel($('.container'));

function carousel ($ct) {
    $ct.each(function (index, node) {
        new Carousel($(node));
    })
}