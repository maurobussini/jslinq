(function (root, factory) {

    //UMD - Universal Module Definition
	if (typeof define === 'function' && define.amd) {
        //AMD: register as an anonymous module without dependencies
        define([], factory);
    } else if (typeof exports === 'object') {
        //Node: does not work with strict CommonJS, but only CommonJS-like 
		//environments that support module.exports, like Node.
        module.exports = factory();
    } else {
        //Browser: globals (root is window)
        root.jslinq = factory();
    }	
}(this, function () {

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
		this.intersect = intersect;
        this.distinct = distinct;
		this.orderBy = orderBy;
		this.orderByDescending = orderByDescending;
		this.selectMany = selectMany;
        this.singleOrDefault = singleOrDefault;
		this.firstOrDefault = firstOrDefault;
		this.lastOrDefault = lastOrDefault;
		this.any = any;
		this.all = all;
        this.toList = toList;
        this.count = count;
		this.skip = skip;
		this.take = take;
		this.max = max;
		this.min = min;
		this.remove = remove;
		this.subtract = subtract;
		this.sum = sum;
        this.average = average;

        //Return for chaining
        return this;
    }
	
	//Verify if first and second 
	//element are equals in values
	function equals(first, second){

		//If are the same instance, true
		if (first === second)
			return true;
			
		//If values are equals, return true
		if (first == second)
			return true;
			
		//If different type, false
		if (typeof first != typeof second)
			return false;
			
		//If are not objects, check value
		if (typeof first != "object")
			return first == second;
			
		//For each property on first
		for (var current in first){
		
			//Get property value from each element
			var firstValue = first[current];
			var secondValue = second[current];
			
			//If current is object, invoke "Equals" on each 
			//member of the object; otherwise just check values
			var isEqual = (typeof firstValue === 'object') ? equals(firstValue, secondValue) : firstValue == secondValue;
			
			//If not equals, exit
			if (!isEqual)
				return false;
		}
		
		//Confirm
		return true;	
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
                outData.push(this.items[i]);
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
				if (equals(maps[n].key, groupKey)){

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
                    count: 0, 
					elements: []
                };

                //Add element to map array
                maps.push(existingMap);
            }

            //Increment the counter
            existingMap.count++;
			
			//Push current element to "elements" property
			existingMap.elements.push(this.items[i]);
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
				if (equals(outData[n], this.items[i])){
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
	
	//#region "orderBy"

    //Order elements using provided expression
    function orderBy(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");
		
		//Define sort action estracting values from objects
		var sortAction = function(a, b){
		
			//Get value for "a" and "b" element
			var aValue = expression(a);
			var bValue = expression(b);
		
			//Check if one element is greater then the second one
			if(aValue < bValue) return -1;
			if(aValue > bValue) return 1;
			return 0;
		};
		
		//Copy array in order to avoid modifications on original
		var outData = [];
		for(var i = 0; i < this.items.length; i++){
			outData.push(this.items[i]);
		}

        //Define output array
        var sortedData = outData.sort(sortAction);
        
        //Return for chaining
        return new jslinq(sortedData);
    }
    //#endregion
	
	//#region "orderByDescending"

    //Order elements using provided expression
    function orderByDescending(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");
			
		//Use "orderBy" method
		var ordered = jslinq(this.items)
			.orderBy(expression)
			.toList();
		
		//Reverse order of array
		var outData = ordered.reverse();

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion
	
	//#region "selectMany"

    //Select clause
    function selectMany(expression) {

        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        //Data for output
        var outData = [];

        //For each element on items
        for (var i = 0; i < this.items.length; i++) {

            //Invoke expression and obtain element
            var result = expression(this.items[i]);
			
			//If element is undefined, just push
			if (!result){
			
				//Push and continue
				outData.push(result);
				break;
			}
			
			//Elements can be an array or a single element
			for (var n = 0; n < result.length; n++){
			
				//Push current element to output
				outData.push(result[n]);			
			}
        }

        //Return for chaining
        return new jslinq(outData);
    }
    //#endregion

    //#region "singleOrDefault"

    //Select elements that match expression
    function singleOrDefault(expression) {

		//Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply where condition
			outData = jslinq(this.items)
				.where(expression)
				.toList();
		}
	
        //If output list does not contains element, return null
        if (outData.length === 0)
            return null;

        //If contains just one element, returns element
        if (outData.length == 1)
            return outData[0];

        //If contains more than one element, throws
        throw new Error("Sequence contains " + outData.length + " matching elements");
    }
    //#endregion
	
	//#region "firstOrDefault"

    //Select first element that matchs expression
    function firstOrDefault(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply where condition
			outData = jslinq(this.items)
				.where(expression)
				.toList();
		}

        //If output list does not contains element, return null
        if (outData.length === 0)
            return null;
			
		//Return first element
		return outData[0];
    }
    //#endregion
	
	//#region "lastOrDefault"

    //Select last element that matchs expression
    function lastOrDefault(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply where condition
			outData = jslinq(this.items)
				.where(expression)
				.toList();
		}

        //If output list does not contains element, return null
        if (outData.length === 0)
            return null;
			
		//Return last element
		return outData[outData.length - 1];
    }
    //#endregion
	
	//#region "any"

    //Returns true if at least one element matchs the expression
    function any(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply where condition
			outData = jslinq(this.items)
				.where(expression)
				.toList();
		}
			
		//Returns true if at least one elements was found
		return outData.length > 0;
    }
    //#endregion
	
	//#region "all"

    //Returns true if all elements match the expression
    function all(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply where condition
			outData = jslinq(this.items)
				.where(expression)
				.toList();
		}
			
		//Returns true if outpul length is equals to input
		return outData.length == this.items.length;
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
	
	//#region "skip"

    //Skip the number of specified elements
    function skip(value) {

        //Check arguments
        if (value < 0)
            throw new Error("Value must be greater or equals zero");
			
		//Copy array in order to avoid modifications on original
		var outData = [];
		for(var i = 0; i < this.items.length; i++){
			outData.push(this.items[i]);
		}

		//Slice source array
		var slicedData = outData.slice(value);
			
		//Return for chaining
        return new jslinq(slicedData);
    }
    //#endregion
	
	//#region "take"

    //Take the number of specified elements
    function take(value) {

        //Check arguments
        if (value < 0)
            throw new Error("Value must be greater or equals zero");
			
		//Copy array in order to avoid modifications on original
		var outData = [];
		for(var i = 0; i < this.items.length; i++){
			outData.push(this.items[i]);
		}

		//Slice source array
		var slicedData = outData.slice(0, value);
			
		//Return for chaining
        return new jslinq(slicedData);
    }
    //#endregion
	
	//#region "max"

    //Get the max element matching criteria the number of specified elements
    function max(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply select condition
			outData = jslinq(this.items)
				.select(expression)
				.toList();
		}
		
		//If array has no elements, returns null
		if (outData.length === 0){
			return null;
		}
		else{
		
			//Apply orderby
			outData = jslinq(outData)
				.orderBy(function(x) { return x; })
				.toList();
				
			//Returns last element
			return outData[outData.length - 1];
		}
    }
    //#endregion
	
	//#region "min"

    //Get the min element matching criteria the number of specified elements
    function min(expression) {

        //Define output
		var outData;
		
		//If there's no expression
		if (!expression){
		
			//Just assign current items
			outData = this.items;
		}
		else{
		
			//Otherwise apply select condition
			outData = jslinq(this.items)
				.select(expression)
				.toList();
		}
		
		//If array has no elements, returns null
		if (outData.length === 0){
			return null;
		}
		else{
		
			//Apply orderby
			outData = jslinq(outData)
				.orderBy(function(x) { return x; })
				.toList();
				
			//Returns first element
			return outData[0];
		}
    }
    //#endregion
	
	//#region "intersect"

    //Get only elements where the same instance is included 
	//on data and in the provided array
    function intersect(otherData, compareExpression) {
	
		//If other data is invalid, return empty array
        if (!otherData)
            return new jslinq([]);

        //Data for output
        var outData = [];

        //Check every element of "items"
        for (var n = 0; n < this.items.length; n++) {
		
			//Current element on items
			var currentOnItems = this.items[n];
		
			//Check every element on "otherData"
			for (var i = 0; i < otherData.length; i++) {
			
				//Current element on "otherData"
				var currentOnOtherData = otherData[i];
				
				//Fails by default matching of elements
				var doesMatch = false;
			
				//If compare expression was not set
				if (!compareExpression){
				
					//Compare on same instance
					//doesMatch = currentOnItems == currentOnOtherData;
					doesMatch = equals(currentOnItems, currentOnOtherData);
				}
				else{
				
					//Calculate comparison value for each element
					var comparisonForItems = compareExpression(currentOnItems);
					var comparisonForOtherData = compareExpression(currentOnOtherData);
				
					//Compare result of compare expressions
					//doesMatch = comparisonForItems == comparisonForOtherData;
					doesMatch = equals(comparisonForItems, comparisonForOtherData);
				}
			
				//If there's a match, add element of "items" on output
				if (doesMatch){
					outData.push(currentOnItems);
				}
			}
        }

        //Return for chaining
        return new jslinq(outData);        
    }
    //#endregion
	
	//#region "remove"

    //Remove the provided elements from data
    function remove(elementToRemove) {
	
		//If element to remove is invalid, just return the same data
        if (!elementToRemove)
            return new jslinq(this.items);
			
		//Define output array
		var outData = [];
        
        //Check every element of "items"
        for (var n = 0; n < this.items.length; n++) {
		
			//If current element the one to remove, continue
			//if (this.items[n] == elementToRemove)
			if (equals(this.items[n], elementToRemove))
				continue;
				
			//If no match, push element to out
			outData.push(this.items[n]);
        }

        //Return for chaining
        return new jslinq(outData);        
    }
    //#endregion
	
	//#region "subtract"

    //Get only elements NOT contained on provided "otherData"
	//using same instance or compare expression
    function subtract(otherData, compareExpression) {
	
		//If other data is invalid, return empty array
        if (!otherData)
            return new jslinq([]);
			
        //Data for output
        var outData = [];

        //Check every element of "items"
        for (var n = 0; n < this.items.length; n++) {
		
			//Current element on items
			var currentOnItems = this.items[n];
			
			//Set flag of "found match" as false
			var aMatchWasFound = false;
		
			//Check every element on "otherData"
			for (var i = 0; i < otherData.length; i++) {
			
				//If a match was already found, skip
				if (aMatchWasFound)
					continue;
			
				//Current element on "otherData"
				var currentOnOtherData = otherData[i];
				
				//Fails by default matching of elements
				var doesMatch = false;
			
				//If compare expression was not set
				if (!compareExpression){
				
					//Compare on same instance
					//doesMatch = currentOnItems == currentOnOtherData;
					doesMatch = equals(currentOnItems, currentOnOtherData);					
				}
				else{
				
					//Calculate comparison value for each element
					var comparisonForItems = compareExpression(currentOnItems);
					var comparisonForOtherData = compareExpression(currentOnOtherData);
				
					//Compare result of compare expressions
					//doesMatch = comparisonForItems == comparisonForOtherData;
					doesMatch = equals(comparisonForItems, comparisonForOtherData);
				}
				
				//If there's a match, set the flag
				if (doesMatch){
					aMatchWasFound = true;
				}				
			}
			
			//If no match was found, append element to output
			if (!aMatchWasFound){
				outData.push(currentOnItems);
			}
        }

        //Return for chaining
        return new jslinq(outData);        
    }
    //#endregion
	
	//#region "sum"

    //Sum values specified with expression
    function sum(expression) {
	
        //Check arguments
        if (!expression)
            throw new Error("Expression is invalid");

        //Select only the field(s) matching expression
        var outData = jslinq(this.items)
			.select(expression)
			.toList();
			
		//Define value of sum
		var sumValue = 0;

        //For each element on outData
        for (var i = 0; i < outData.length; i++) {
			
			//Extract current value
			var currentValue = outData[i];

            //If element is not a number
			if (typeof currentValue != 'number')
				throw Error("Value '" + currentValue + "' is not a number");

            //Sum with total value
            sumValue = sumValue + currentValue;
        }

        //Return sum
        return sumValue;
    }
    //#endregion

    //#region "average"

    //Get the min element matching criteria the number of specified elements
    function average(expression) {

        //Define output
        var outData;

        //If there's no expression
        if (!expression){

            //Just assign current items
            outData = this.items;
        }
        else{

            //Otherwise apply select condition
            outData = jslinq(this.items)
                .select(expression)
                .toList();
        }

        //If array has no elements, returns null
        if (outData.length === 0){
            return null;
        }
        else{

            //Sum every value
            var valuesSum = 0;

            //Iterate all elements on list
            for (var i = 0; i < outData.length; i++){

                //If element is not number, throw
                if (isNaN(outData[i]))
                    throw new Error("Element '" + outData[i] +
                        "' (index:" + i + ") is not a number");

                //Increment sum
                valuesSum = outData[i] + valuesSum;
            }

            //Calculate average
            var outAverage = valuesSum / outData.length

            //Returns first element
            return outAverage;
        }
    }
    //#endregion
	
	//Constructor instance
	function constructor(arrayOfData){
		
		//Returns new instance of "jslinq"
		return new jslinq(arrayOfData);
	}
  
	//Exports functions
	return constructor;
}));