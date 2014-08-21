Outclick
========

Trigger callback, when click outside element

Usage
-----

```
$(element).outclick({ 
 callback: function() { $(this).hide() }
});
```

It is also possible to pass related objects. When you click on related object, action will not be considered as click outside main object bounds.

```
$(element).outclick({ 
 callback: function() { $(this).hide() }
 related: [$(element1), $(element2)]
});
```

Sometimes you can have multiple elements, with same structure. 

```
$(element).each(function() {
  $(this).outclick({
   callback: function() { $(this).hide() },
   related: [
     $(this).siblings('.sibling1'),
     $(this).siblings('.sibling2')
   ]
  });
 });
```
