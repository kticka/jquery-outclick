(function() {
  var Outclick, outclick,
    _this = this;

  Outclick = (function() {

    Outclick.name = 'Outclick';

    function Outclick() {
      this.objects = [];
    }

    Outclick.prototype.check = function(element, event) {
      return !element.is(event.target) && element.has(event.target).length === 0;
    };

    Outclick.prototype.trigger = function(e) {
      var execute,
        _this = this;
      execute = false;
      return $.each(this.objects, function(index, el) {
        if (_this.check(el.container, e)) {
          if (el.related.length < 1) {
            execute = true;
          } else {
            $.each(el.related, function(index, relation) {
              if (_this.check(relation, e)) {
                return execute = true;
              } else {
                execute = false;
                return false;
              }
            });
          }
          if (execute) {
            return el.callback.call(el.container);
          }
        }
      });
    };

    return Outclick;

  })();

  outclick = new Outclick;

  $.fn.outclick = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    options.related || (options.related = []);
    options.callback || (options.callback = function() {
      return _this.hide();
    });
    return outclick.objects.push({
      container: this,
      related: options.related,
      callback: options.callback
    });
  };

  $(document).mouseup(function(e) {
    return outclick.trigger(e);
  });

}).call(this);