$.outclick =
	
	instances: []

	trigger: (event) ->
		$.each $.outclick.instances, (index, instance) ->
			if $.outclick.outside(instance.element, event.target)
				if typeof instance.callback == 'function'
					instance.callback.call(instance.element)
		
	create: (element, options = [], callback) ->
		instance = { element: element, callback: callback }
		@.instances.push {element: element, options: options, callback: callback }

	enable: ->
		$(document).bind 'click.outclick', @trigger

	disable: ->
		$(document).unbind 'click.outclick'

	reset: ->
		$.outclick.disable()
		$.outclick.enable()

	outside: (element, target) ->
		not element.is(event.target) and element.has(event.target).length is 0
	

$.fn.outclick = (callback, options = []) ->
	$.outclick.reset()
	$.outclick.create(@, options, callback)
	return @