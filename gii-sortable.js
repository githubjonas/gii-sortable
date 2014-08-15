/* ==========================================================
 * gii-sortable.js v1.0.0
 * http://www.getskarinnovation.se/gii-sortable
 * ==========================================================
 * Copyright 2014, Getskär IT Innovation AB, Sweden
 * http://www.getskarinnovation.se
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Changelog:
 * 1.0.0    Getskär, March 14th, 2014.
 *          * Initial commit.
 *
 *
 * ========================================================== */
(function( $ ){

    $.fn.sortable = function( options ) {

        // Create some defaults, extending them with any options that were provided
        var msettings = $.extend( {
          'clickables'      : 'th',
          'resortables'     : 'tr',
          'columns'         : 'td',
          'class-clickable' : 'clickable',
          'onclick'         : function (o) { },
        }, options);

        return this.each(function() {

            var self = $(this);

            var settings = jQuery.extend({}, msettings);
            
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

            // Override default settings by data-* attributes
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
            $(this).find(settings['clickables']).each(function() {
                if (!$(this).hasClass('gii-sortable-noclick')) $(this).addClass(settings['class-clickable']);
                if ('undefined' === typeof $(this).attr("data-sortable-column-number")) {
                    $(this).attr("data-sortable-column-number", column_number++);
                }
            });
                        
            $(this).find(settings['clickables']).on('click', function() {
                var data = [];
                var selcol = $(this).attr("data-sortable-column-number");
                var row_number = 0;
                
                if ($(this).hasClass('gii-sortable-noclick')) return;
                
                $(this).siblings(settings['clickables']).addBack().removeClass('gii-is-sorted-by').removeClass('gii-is-sorted-by-reverse');
                
                var order = $(this).attr("data-sortable-order");
                var reverse = false;
                if ('undefined' === order) {
                    order = 'undefined' === typeof $(this).attr("data-sortable-default-order") ? 'asc' : $(this).attr("data-sortable-default-order");
                }
                if (order === 'desc') {
                    reverse = true;
                    order = 'asc';
                    $(this).addClass('gii-is-sorted-by-reverse');
                } else {
                    order = 'desc';
                    $(this).addClass('gii-is-sorted-by');
                }
                $(this).attr("data-sortable-order", order);
                
                self.find(settings['resortables'] + ':not(:has(' + settings['clickables'] + '))').each(function() {
                    var column_number = 0;
                    var sortable = '';
                    $(this).find(settings['columns']).each(function() {
                        if (selcol == column_number++) {
                            var s = ('undefined' !== typeof $(this).attr("data-sortable-value")) ? $(this).attr("data-sortable-value") : $.trim($(this).text());
                            sortable = isNaN(s) ? s : Number(s);
                        }
                    });
                    var outerHTML = $("<div />").append($(this).clone()).html();
                    data.push({'row_number': row_number++, 'html': outerHTML, 'sortable': sortable});
                    $(this).detach();
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
                $(this).siblings(settings['clickables']).addBack().each(function () {
                    if ($(this).hasClass('gii-sortable-autonumber')) renum_column = column_number;
                    column_number++;
                });
                
                if (renum_column > -1) {
                    var row_number = 1;
                    self.find(settings['resortables'] + ':not(:has(' + settings['clickables'] + '))').each(function() {
                        var column_number = 0;
                        $(this).find(settings['columns']).each(function() {                    
                            if (column_number === renum_column) {
                                $(this).html(row_number);
                            }
                            column_number++;
                        });
                        row_number++;
                    });
                }
                
                settings.onclick(self);
            });
        });
    };
})( jQuery );