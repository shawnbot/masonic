# Masonic
Masonic is a bare-bones [masonry](http://masonry.desandro.com/) layout for
d3.js, inspired by [David DeSandro's](http://desandro.com/)
[Isotope](http://isotope.metafizzy.co/) jQuery plugin.

Check out [the demo](http://shawnbot.github.io/masonic/).

## Usage
Just include `d3-masonic.js` along with [d3.js](http://d3js.org/) in your HTML,
then check out the API:

<a name="d3-masonic" href="#d3-masonic">#</a> d3.**masonic**()

Constructs a new masonry function with the default width and height accessors.

<a name="_masonic" href="#_masonic">#</a> **masonic**(*datum*[, *index*])

Evaluates the masonry function on a single *datum* object and returns a *brick*
object with the following properties:

* `x`, `y`, `width` and `height`: the brick's position and size, in pixels
* `column`: the brick's column index
* `data`: the *datum* value

The masonry layout is different from other d3 layouts in that it's *stateful*: every time you call **masonic()** it lays a single brick and remembers where it left off. This means that you can add bricks progressively without recalculating the whole layout every time. The recommended usage looks like this:

```js
var masonic = d3.masonic()
  .columnWidth(100)
  .columnCount(5); // e.g. 5 columns (see below)

d3.selectAll(".brick")
  .datum(masonic) // note the use of datum() here instead of data()
  .style("left", function(d) { return d.x + "px"; })
  .style("top", function(d) { return d.y + "px"; })
  .datum(function(d) { return d.data; }); // restore bound data
  
masonic.reset();
```

**Here's the catch:** You have to call some combination of the following methods so that the layout knows when to stop stacking bricks horizontally:

1. [masonic.outerWidth](#outerWidth) and [masonic.columnCount](#columnCount), calculating **column width** from these.
1. [masonic.outerWidth](#outerWidth) and [masonic.columnWidth](#columnWidth), calculating **column count** from these.
1. [masonic.columnWidth](#columnWidth) and [masonic.columnCount](#columnCount), setting **outer width** as bricks are laid.

### Methods

<a name="width" href="#width">#</a> masonic.**width**([*accessor*])

Get or set the function that determines a brick's `width`. This defaults to a
function that return's the DOM node's `offsetWidth` property.

<a name="height" href="#height">#</a> masonic.**height**([*accessor*])

Get or set the function that determines a brick's `height`. This defaults to a
function that return's the DOM node's `offsetHeight` property.

<a name="outerWidth" href="#outerWidth">#</a> masonic.**outerWidth**([*accessor*])

Get or set the outer width of the layout. If the **columnWidth** has been set,
this calculates **columnCount** automatically.

<a name="columnCount" href="#columnCount">#</a> masonic.**columnCount**([number])

Get or set the number of columns in the layout.

<a name="columnWidth" href="#columnWidth">#</a> masonic.**columnWidth**([number])

Get or set the width of each column. If **columnWidth** has already been set,
this calculates **outerWidth** automatically.

<a name="outerHeight" href="#outerHeight">#</a> masonic.**outerHeight**()

Get the height of the layout after one or more bricks have been laid. This is
useful for setting the height of the bricks' parent node so that other elements
flow below it.

<a name="reset" href="#reset">#</a> masonic.**reset**()

Reset the layout, removing previously laid bricks and setting **outerHeight**
to zero.
