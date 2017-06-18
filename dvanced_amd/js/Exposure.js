define(['jquery'], function($){	
  var Lazy = (function () {
    function Exposure($target, callback) {
      this.target = $target;
      this.callback = callback;
      this.bind();
      this.checkload();
    }

    Exposure.prototype.bind = function () {
      var _this = this;
      var clock;
      $(window).on('scroll', function () {
        if (clock) {
          clearTimeout(clock);
        }
        clock = setTimeout(function () {
          _this.checkload(_this.target)
        }, 300)
      })
    }

    Exposure.prototype.checkload = function () {
      var _this = this;
      $(this.target).each(function (index, node) {
        if (_this.checkShow($(node))) {
          _this.callback($(node));
        }
      })
    }

    Exposure.prototype.checkShow = function ($node) {
      var windowHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),
        offsetTop = $node.offset().top;
      //&& scrollTop < offsetTop + $node.outerHeight() /判断窗口上面的元素是否显示
      if (windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + $node.outerHeight()) {
        return true;
      }
        return false;
    }
    return {
      init: function ($target, callback) {
        $target.each(function (index, target) {
          new Exposure($(target), callback)
        })
      }
    }
  })()
  return Lazy;

  Lazy.init($('.container img'), function ($node) {
    loadImg($node);
  })

  // function isload($img) {
  // 	return $img.attr('src') === $img.attr('data-src')
  // }

  function loadImg($img) {
    var imgUrl = $img.attr('data-src');
    $img.attr('src', imgUrl);
  }			
})