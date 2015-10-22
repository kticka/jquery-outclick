class Outclick 

  constructor: ->
    @objects = []

  check: (element, event) ->
    not element.is(event.target) and element.has(event.target).length is 0

  trigger: (e) ->
    execute = false
    $.each @objects, (index, el) =>
      if @check(el.container, e)
        if el.related.length < 1 then execute = true
        else 
          $.each el.related, (index, relation) =>
            if @check(relation, e)
              execute = true
            else
              execute = false
              false
        el.callback.call(el.container) if execute  


outclick = new Outclick

$.fn.outclick = (options = {}) -> 
  options.related ||= []
  options.callback  ||= => @hide()
  outclick.objects.push { container: @, related: options.related, callback: options.callback }

$.fn.outclickStop = ->
  items = $.grep outclick.objects, (e) => e.container.is(@)
  if (items.length > 0)
    item = items[0]
    index = $.inArray(item, outclick.objects)
    if (index > -1)
      outclick.objects.splice(index, 1)

$(document).mouseup (e) =>
  outclick.trigger(e)