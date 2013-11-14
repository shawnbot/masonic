# Masonic
Masonic is a bare-bones [masonry](http://masonry.desandro.com/) layout for
d3.js, inspired by [David DeSandro's](http://desandro.com/)
[Isotope](http://isotope.metafizzy.co/) jQuery plugin.

## Usage
Just include `d3-masonic.js` along with [d3.js](http://d3js.org/) in your HTML,
then check out the API:

<a name="masonic" href="#masonic">#</a> d3.**masonic**()

Constructs a new masonry function with the default width and height accessors.

**masonic**(*datum*[, *index*])

Evaluates the masonry function on a single *datum* object and returns a *brick*
object with the following properties:

* `x`, `y`, `width` and `height`: the brick's position and size, in pixels
* `column`: the brick's column index
* `data`: the *datum* value

masonic.**width**([*accessor*])

Get or set the function that determines a brick's `width`. This defaults to a
function that return's the DOM node's `offsetWidth` property.

masonic.**height**([*accessor*])

Get or set the function that determines a brick's `height`. This defaults to a
function that return's the DOM node's `offsetHeight` property.

masonic.**outerWidth**([*accessor*])

Get or set the outer width of the layout. If the **columnWidth** has been set,
this calculates **columnCount** automatically.

masonic.**columnCount**([number])

Get or set the number of columns in the layout.

masonic.**columnWidth**([number])

Get or set the width of each column. If **columnWidth** has already been set,
this calculates **outerWidth** automatically.

masonic.**outerHeight**()

Get the height of the layout after one or more bricks have been laid. This is
useful for setting the height of the bricks' parent node so that other elements
flow below it.

masonic.**reset**()

Reset the layout, removing previously laid bricks and setting **outerHeight**
to zero.
