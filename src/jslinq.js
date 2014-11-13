﻿/*
 * jslinq
 * Copyright 2014 Mauro Bussini.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author 	: Mauro Bussini
 * Version	: v1.0.0
 * Project	: https://github.com/maurobussini/jslinq
 */

;(function() {
    
    //Constructor function
    function jslinq(array) {

        //Check arguments
        if (!array)
            throw new Error("Provided data is invalid");
        if (!(array instanceof Array))
            throw new Error("Provided data is not a valid array");

        //Set data on current variable
        this.items = array;

        //Set function of prototype
        this.select = select;
        this.where = where;
        this.groupBy = groupBy;
        this.join = join;
        this.distinct = distinct;
        this.singleOrDefault = singleOrDefault;
        this.toList = toList;
        this.count = count;

        //Return for chaining
        return this;
    }    
   
    //#region "where"

    //Select elements that match expression
    function where(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        //Define output array
        var outData = [];

        //For each element on data
        for (var i = 0; i < this.items.length; i++) {

            //Use function to obtain match
            var doesMatch = expression(this.items[i]);

            //If element match, append
            if (doesMatch)
                outData.push(items[i]);
        }

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion

    //#region "select"

    //Select clause
    function select(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        //Data for output
        var outData = [];

        //For each element on items
        for (var i = 0; i < this.items.length; i++) {

            //Invoke expression and obtain element
            var result = expression(this.items[i]);

            //Append to out list
            outData.push(result);
        }

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion

    //#region groupBy

    //Group items inside array for given function
    function groupBy(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        //Define output maps
        var maps = [];

        //For each element on array
        for (var i = 0; i < this.items.length; i++) {

            //Get group key of current element
            var groupKey = expression(this.items[i]);

            //Check if another element with the same key is on maps
            var existingMap = null;

            //For each existing element on maps
            for (var n = 0; n < maps.length; n++) {

                //If we have element with the same key
                if (maps[n].key == groupKey) {

                    //Set on external variable and break
                    existingMap = maps[n];
                    break;
                }
            }

            //If not existing elements were found, create
            if (!existingMap) {

                //Create with base values
                existingMap = {
                    key: groupKey,
                    count: 0
                };

                //Add element to map array
                maps.push(existingMap);
            }

            //Increment the counter
            existingMap.count++;
        }

        //Return for chaining
        return new jslinq(maps);
    }
    //#endregion

    //#region "join"

    //Joins current data with the one provided
    function join(otherData) {

        //If other data is invalid, return
        if (!otherData)
            return new jslinq(this.items);

        //Data for output
        var outData = [];

        //Set every element on current items on output
        for (var n = 0; n < this.items.length; n++) {
            outData.push(this.items[n]);
        }

        //For each element on other data, push
        for (var i = 0; i < otherData.length; i++) {
            outData.push(otherData[i]);
        }

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion

    //#region "distinct"

    //Distinct elements on list
    function distinct() {
        
        //Data for output
        var outData = [];

        //For each element on current instance
        for (var i = 0; i < this.items.length; i++) {

            //Flag for element found
            var wasFound = false;

            //Check if element is already on outData
            for (var n = 0; n < outData.length; n++) {

                //If current element on "i" matches the one on "n"
                if (outData[n] == this.items[i]) {
                    wasFound = true;
                    break;
                }
            }

            //If element was not found, append to output
            if (!wasFound)
                outData.push(this.items[i]);
        }

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion

    //#region "singleOrDefault"

    //Select elements that match expression
    function singleOrDefault(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        var outData = jslinq(this.items)
            .where(expression)
            .toList();

        //If output list does not contains element, return null
        if (outData.length == 0)
            return null;

        //If contains just one element, returns element
        if (outData.length == 1)
            return outData[0];

        //If contains more than one element, throws
        throw new Error("Sequence contains " + outData.length + " matching elements");
    }
    //#endregion

    //#region "toList"

    //Returns items on list
    function toList() {

        //Returns items on jslinq
        return this.items;
    }
    //#endregion

    //#region "count"

    //Returns count of elements
    function count() {

        //Returns items on jslinq
        return this.items.length;
    }
    //#endregion
   
    //Check if we are in Node.js
    if (typeof module !== 'undefined' && module.exports) {

        //Apply as export
        module.exports = jslinq;
    }
    else {

        //Otherwise expose on window object
        window['jslinq'] = jslinq;
    }
}());