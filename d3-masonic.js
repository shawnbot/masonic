(function(exports) {

  var zero = d3.functor(0);

  d3.masonry = function() {
    var columnCount = 0,
        columnWidth = 200,
        outerWidth = 0,
        outerHeight = 0,
        columns = [],
        bricks = [],
        getWidth = function() { return this.offsetWidth; },
        getHeight = function() { return this.offsetHeight; };

    function masonry(d, i) {
      if (columns.length === 0) {
        columns = d3.range(columnCount).map(zero);
      }

      var w = getWidth.apply(this, arguments) || 0,
          h = getHeight.apply(this, arguments) || 0,
          span = Math.ceil(w / columnWidth),
          brick = {
            width: w,
            height: h,
            data: d
          };

      span = brick.span = Math.min(span, columnCount);

      if (span === 1) {
        place(brick, columns);
      } else {
        var groupCount = columnCount + 1 - span,
            groupY = [],
            groupColY,
            i;
        for (var i = 0; i < groupCount; i++) {
          groupColY = columns.slice(i, i + span);
          groupY[i] = Math.max.apply(Math, groupColY);
        }

        place(brick, groupY);
      }

      return brick;
    }

    function place(brick, cols) {
      var minY = Math.min.apply(Math, cols),
          len = cols.length,
          shortest = 0;
      for (var i = 0; i < len; i++) {
        if (cols[i] === minY) {
          shortest = i;
          break;
        }
      }

      brick.column = shortest;
      brick.x = columnWidth * shortest;
      brick.y = minY;

      var setHeight = minY + brick.height,
          setSpan = columnCount + 1 - len;
      for (i = 0; i < setSpan; i++) {
        columns[shortest + i] = setHeight;
      }

      outerHeight = Math.max.apply(Math, columns);
    }

    // get/set the item width value (function)
    masonry.width = function(_) {
      if (arguments.length) {
        getWidth = d3.functor(_);
        return masonry;
      } else {
        return getWidth;
      }
    };

    // get/set the item height value (function)
    masonry.height = function(_) {
      if (arguments.length) {
        getHeight = d3.functor(_);
        return masonry;
      } else {
        return getHeight;
      }
    };

    // get/set column width
    masonry.columnWidth = function(_) {
      if (arguments.length) {
        columnWidth = _;
        if (outerWidth === 0) {
          outerWidth = columnCount * columnWidth;
        }
        return masonry;
      } else {
        return columnWidth;
      }
    };

    // get/set column count
    masonry.columnCount = function(_) {
      if (arguments.length) {
        columnCount = _;
        return masonry;
      } else {
        return columnCount;
      }
    };

    // get/set outer width
    // Note: the setter also sets columnWidth if columnCount > 0
    masonry.outerWidth = function(_) {
      if (arguments.length) {
        outerWidth = _;
        if (columnWidth > 0) {
          columnCount = Math.floor(outerWidth / columnWidth);
        }
        return masonry;
      } else {
        return columnCount;
      }
    };

    // getter only
    masonry.outerHeight = function() {
      return outerHeight;
    };

    masonry.reset = function() {
      bricks = [];
      columns = [];
      outerHeight = 0;
      return masonry;
    };

    return masonry.reset();
  };

})(this);
