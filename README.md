gii-sortable
============
gii-sortable.js v1.0.0

Description
-----------

gii-sortable is a jQuery extension to easilly make `<table>` DOM
objects clickable and resortable, without having to render the page
again.

Simple Markup Example
---------------------

    <table class="sortable">
      <tr>
        <th>Points</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>10</td>
        <td data-sortable-value="Scott, Adam">Adam Scott</td>
        <td>39</td>
      </tr>
      <tr>
        <td>15</td>
        <td data-sortable-value="Waters, Louice">Louice Waters</td>
        <td>19</td>
      </tr>
      <tr>
        <td>20</td>
        <td data-sortable-value="Place, Mike">Mike Place</td>
        <td>23</td>
      </tr>
    </table>
    
Installation
------------
`gii-sortable.js` is a jQuery plugin. First of all, make sure that you have jQuery on your page. If not, put this in your <head> section. Secondly, you need to link to the gii-sortable.js plugin. Here is an example on how you can accomlish this (several other methods exist):
  
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="path/to/gii-sortable.js" type="text/javascript"></script>

Usage
-----
    let options = {
      // Add options here
    };
    $('.sortable').sortable(options);

Options
-------
Options can be passed via data attributes or JavaScript. For data attributes, prepend the option name to `data-`, example: `data-sortable-value=4000`.
<table class="table table-bordered table-striped" style="width: 1110px;">
                <thead>
                <tr>
                    <th style="width: 100px;">
                        Name</th>
                    <th style="width: 50px;">
                        type</th>
                    <th style="width: 50px;">
                        default</th>
                    <th>
                        description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        clickables</td>
                    <td>
                        string</td>
                    <td>
                        th</td>
                    <td>
                        Header column 'cell'</td>
                </tr>
                <tr>
                    <td>
                        resortables</td>
                    <td>
                        string</td>
                    <td>
                        tr</td>
                    <td>
                        'rows' of sortables</td>
                </tr>
                <tr>
                    <td>
                        columns</td>
                    <td>
                        string</td>
                    <td>
                        td</td>
                    <td>
                        'cells' of sortables</td>
                </tr>
                <tr>
                    <td>
                        class-clickable</td>
                    <td>
                        string</td>
                    <td>
                        clickable</td>
                    <td>
                        <p>
                            Class added to each header column cell.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        sortable-default-order</td>
                    <td>
                        string</td>
                    <td>
                        asc</td>
                    <td>
                        [apply to&nbsp;<code>clickables</code>] Sort order on first click on this column. Set to <code>asc</code>&nbsp;for ascending or <code>desc</code>&nbsp;for descending.</td>
                </tr>
                <tr>
                    <td>
                        sortable-value</td>
                    <td>
                        mixed</td>
                    <td>
                        &nbsp;</td>
                    <td>
                        <span style="background-color: rgb(249, 249, 249);">[apply to&nbsp;</span><code>columns</code><span style="background-color: rgb(249, 249, 249);">]</span>&nbsp;Value to sort by. If not set, sorting is done by cell text. See example above.</td>
                </tr>
                </tbody>
            </table>

License
-------

Created with joy by Jonas Persson @ Getskär IT Innovation 2014.
Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Changelog:
----------

 * 1.0.0    Getskär March 14th, 2014.
 * Initial commit.
