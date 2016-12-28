import $ from 'jquery';

class Sortable {
  
  constructor(element, options) {
    this.element = element;
    this.options = Object.assign({
      'clickables'      : 'th',
      'resortables'     : 'tr',
      'columns'         : 'td',
      'class-clickable' : 'clickable',
      'onclick'         : function (o) { }
    }, options);


    const self = this.element;
    var settings = this.options;

    function keysrt(key, desc) {
      return function (a, b) {

        var a = a[key];
        var b = b[key];

        if (!isNaN(a) && !isNaN(b)) {
          a = Number(a);
          b = Number(b);
        }

        if (a == b) return 0;

        if (desc) {
          return a < b ? 1 : -1;
        } else {
          return a > b ? 1 : -1;
        }
      }
    }

    $.each(settings, function(key, val) {
      if (self.attr("data-" + key)) {
        var newval = self.attr("data-" + key);
        if (newval.toLowerCase() === 'true') settings[key] = true;
        if (newval.toLowerCase() === 'false') settings[key] = false;
        else settings[key] = newval;
      }
    });

    // Initialize column numbers
    var column_number = 0;
    $(self).find(settings['clickables']).each(function() {
      if (!$(self).hasClass('gii-sortable-noclick')) $(self).addClass(settings['class-clickable']);
      if ('undefined' === typeof $(self).attr("data-sortable-column-number")) {
        $(self).attr("data-sortable-column-number", column_number++);
      }
    });

    $(self).find(settings['clickables']).on('click', function() {
      var data = [];
      var selcol = $(self).attr("data-sortable-column-number");
      var row_number = 0;

      if ($(self).hasClass('gii-sortable-noclick')) return;

      $(self).siblings(settings['clickables']).addBack().removeClass('gii-is-sorted-by').removeClass('gii-is-sorted-by-reverse');

      var order = $(self).attr("data-sortable-order");
      var reverse = false;
      if ('undefined' === order) {
        order = 'undefined' === typeof $(self).attr("data-sortable-default-order") ? 'asc' : $(self).attr("data-sortable-default-order");
      }
      if (order === 'desc') {
        reverse = true;
        order = 'asc';
        $(self).addClass('gii-is-sorted-by-reverse');
      } else {
        order = 'desc';
        $(self).addClass('gii-is-sorted-by');
      }
      $(self).attr("data-sortable-order", order);

      self.find(settings['resortables'] + ':not(:has(' + settings['clickables'] + '))').each(function() {
        var column_number = 0;
        var sortable = '';
        $(self).find(settings['columns']).each(function() {
          if (selcol == column_number++) {
            var s = ('undefined' !== typeof $(self).attr("data-sortable-value")) ? $(self).attr("data-sortable-value") : $.trim($(self).text());
            sortable = isNaN(s) ? s : Number(s);
          }
        });
        var outerHTML = $("<div />").append($(self).clone()).html();
        data.push({'row_number': row_number++, 'html': outerHTML, 'sortable': sortable});
        $(self).detach();
      });

      var allhtml = '';
      data.sort(keysrt('sortable'));
      if (reverse) data.reverse();

      $.each(data, function(k, row) {
        allhtml += row['html'];
      });

      self.append(allhtml);

      // If there is a line number column - redo it
      var renum_column = -1;
      var column_number = 0;
      $(self).siblings(settings['clickables']).addBack().each(function () {
        if ($(self).hasClass('gii-sortable-autonumber')) renum_column = column_number;
        column_number++;
      });

      if (renum_column > -1) {
        var row_number = 1;
        self.find(settings['resortables'] + ':not(:has(' + settings['clickables'] + '))').each(function() {
          var column_number = 0;
          $(self).find(settings['columns']).each(function() {
            if (column_number === renum_column) {
              $(self).html(row_number);
            }
            column_number++;
          });
          row_number++;
        });
      }

      settings.onclick(self);
    });
  }
}