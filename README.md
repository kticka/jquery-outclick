Outclick
========

Trigger callback, when click outside element

Usage
=====

$(element).outclick({ 
 callback: function() { $(this).hide() }
});

It is also possible to pass related objects. When you click on related object, action will not be considered as click outside main object bounds.

$(element).outclick({ 
 callback: function() { $(this).hide() }
 related: [$(element1), $(element2)]
});