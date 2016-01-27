/*!
 * jQuery Outclick (https://github.com/kticka/jQuery.outclick)
 * Copyright (c) 2016 Karolis Tička
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
$.outclick = {
  instances: [],
  trigger: function(event) {
    return $.each($.outclick.instances, function(index, instance) {
      if ($.outclick.outside(instance.element, event.target)) {
        if (typeof instance.callback === 'function') {
          return instance.callback.call(instance.element);
        }
      }
    });
  },
  create: function(element, options, callback) {
    var instance;
    if (options == null) {
      options = [];
    }
    instance = {
      element: element,
      callback: callback
    };
    return this.instances.push({
      element: element,
      options: options,
      callback: callback
    });
  },
  enable: function() {
    return $(document).on('mouseup.outclick', this.trigger);
  },
  disable: function() {
    return $(document).off('mouseup.outclick');
  },
  reset: function() {
    $.outclick.disable();
    return $.outclick.enable();
  },
  outside: function(element, target) {
    return !element.is(target) && element.has(target).length === 0;
  }
};

$.fn.outclick = function(callback, options) {
  if (options == null) {
    options = [];
  }
  $.outclick.reset();
  $.outclick.create(this, options, callback);
  return this;
};