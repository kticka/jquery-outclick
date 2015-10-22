var Outclick, outclick;

Outclick = (function() {
  function Outclick() {
    this.objects = [];
  }

  Outclick.prototype.check = function(element, event) {
    return !element.is(event.target) && element.has(event.target).length === 0;
  };

  Outclick.prototype.trigger = function(e) {
    var execute;
    execute = false;
    return $.each(this.objects, (function(_this) {
      return function(index, el) {
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
      };
    })(this));
  };

  return Outclick;

})();

outclick = new Outclick;

$.fn.outclick = function(options) {
  if (options == null) {
    options = {};
  }
  options.related || (options.related = []);
  options.callback || (options.callback = (function(_this) {
    return function() {
      return _this.hide();
    };
  })(this));
  return outclick.objects.push({
    container: this,
    related: options.related,
    callback: options.callback
  });
};

$.fn.outclickStop = function() {
  var index, item, items;
  items = $.grep(outclick.objects, (function(_this) {
    return function(e) {
      return e.container.is(_this);
    };
  })(this));
  if (items.length > 0) {
    item = items[0];
    index = $.inArray(item, outclick.objects);
    if (index > -1) {
      return outclick.objects.splice(index, 1);
    }
  }
};

$(document).mouseup((function(_this) {
  return function(e) {
    return outclick.trigger(e);
  };
})(this));