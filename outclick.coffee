class Outclick 

  constructor: ->
    @objects = []

  check: (element, event) ->
    not element.is(event.target) and element.has(event.target).length is 0

  trigger: (e) ->
    $.each @objects, (index, el) =>
      if @check(el.container, e)
        if el.relations.length < 1
          el.callback.call(el.container)
        else
          $.each el.relations, (index, relation) =>
            if @check(relation, e)
              el.callback.call(el.container)

outclick = new Outclick

$.fn.outclick = (options = {}) -> 
  options.relations ||= []
  options.callback  ||= => @hide()
  outclick.objects.push { container: @, relations: options.relations, callback: options.callback }

$(document).mouseup (e) =>
  outclick.trigger(e)