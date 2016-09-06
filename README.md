jslinq
======

Another LINQ provider for Javascript

## Install NPM

```javascript
npm install jslinq --save
```

## Install Bower

```javascript
bower install zenprogramming.jslinq --save
```

## Usage

#### Given the following source array:

```javascript
var data = [
	{ id: 1, name: "one", category: 'fruits', countries: ["Italy", "Austria"] },
	{ id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
	{ id: 3, name: "three", category: 'vegetables', countries: ["Germany"] },
	{ id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
	{ id: 5, name: "five", category: 'fruits', countries: ["Japan", "Italy"] }
];
```

#### Get *jslinq* queryable object
```javascript
var queryObj = jslinq(data);
```

#### Get *count* of elements
```javascript
var result = queryObj
	.count();

/*
result => 5
*/
```

#### Get all elements with *toList*
```javascript
var result = queryObj
	.toList();
	
/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 2, name: "two", ... },
	{ id: 3, name: "three", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/
```

#### Get single element (or null) on list with *singleOrDefault*
```javascript
var result = queryObj
	.singleOrDefault(function(el){
		return el.name == "one";
	});

/*
result => { id: 1, name: "one", ... };
*/
```

#### Projection on one or more properties with *select*
```javascript
var result = queryObj
	.select(function(el){
		return el.id;
	})
	.toList();

/*
result => [1, 2, 3, 4, 5];
*/
```

#### Filter elements with *where*
```javascript
var result = queryObj
	.where(function(el){
		return el.name == 'two';
	})
	.toList();

/*
result => [{ id: 2, name: "two", ... }];
*/
```

#### Make a *groupBy* and count on each group
```javascript
var result = queryObj
	.groupBy(function(el){
		return el.category;
	})
	.toList();

/*
result => [
	{ key: 'vegetables', count: 2, elements: [...] }, 
	{ key: 'fruits', count: 3, elements: [...] }, 
];
*/
```

#### Merge two arrays with *join*
```javascript
var otherData = [
	{ id: 7, name: "seven", category: 'vegetables' }, 
	{ id: 8, name: "eight", category: 'fruit' }
];

var result = queryObj
	.join(otherData)
	.toList();
/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 2, name: "two", ... },
	{ id: 3, name: "three", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }, 
	{ id: 7, name: "seven", ... }, 
	{ id: 8, name: "eight", ... }
];
*/
```

#### Get *distinct* elements without repetitions
```javascript
var extraData = ["A", "B", "C", "B", "A", "D"];

var result = jslinq(extraData)
	.distinct()
	.toList();
/*
result => ["A", "B", "C", "D"];
*/
```

#### Sort ascending using *orderBy*
```javascript
var result = queryObj
	.orderBy(function(el){
		return el.name;
	})
	.toList();
/*
result => [
	{ id: 5, name: "five", ... },
	{ id: 4, name: "four", ... },
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 2, name: "two", ... }
];
*/
```

#### Sort descending using *orderByDescending*
```javascript
var result = queryObj
	.orderByDescending(function(el){
		return el.name;
	})
	.toList();
/*
result => [
	{ id: 2, name: "two", ... },
	{ id: 3, name: "three", ... },
	{ id: 1, name: "one", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/
```

#### Select multiple elements with *selectMany*
```javascript
var result = queryObj
	.selectMany(function(el){
		return el.countries;
	})
	.toList();
/*
result => [
	"Italy", "Austria", "Italy", "Germany", 
	"Germany", "Japan", "Japan", "Italy"] }
];
```

#### Get the first matching element with *firstOrDefault*
```javascript
var result = queryObj
	.firstOrDefault(function(el){
		return el.category == "vegetables";
	});
/*
result => { id: 2, name: "two", ... };
*/
```

#### Get the last matching element with *lastOrDefault*
```javascript
var result = queryObj
	.lastOrDefault(function(el){
		return el.category == "vegetables";
	});
/*
result => { id: 3, name: "three", ... };
*/
```

#### Check if at least one elements matchs expression with *any*
```javascript
var result = queryObj
	.any(function(el){
		return el.name == "two";
	});
/*
result => true;
*/
```

#### Check if all elements match expression with *all*
```javascript
var result = queryObj
	.all(function(el){
		return el.countries.length > 0;
	});
/*
result => true;
*/
```

#### Skip the number of specified elements with *skip*
```javascript
var result = queryObj
	.skip(3)
	.toList();
/*
result => [
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/
```

#### Take the number of specified elements with *take*
```javascript
var result = queryObj
	.take(2)
	.toList();
/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 2, name: "two", ... }
];
*/
```

#### Get the maximum element using specific expression with *max*
```javascript
var result = queryObj
	.max(function(el){
		return el.id;
	});
/*
result => 5;
*/
```

#### Get the minimum element using specific expression with *min*
```javascript
var result = queryObj
	.min(function(el){
		return el.id;
	});
/*
result => 1;
*/
```

#### Get elements contained on two array with *intersect*
```javascript
var otherData = [
	{ id: 2, name: "two", category: 'vegetables' }, 
	{ id: 8, name: "eight", category: 'fruit' }
];

var result = queryObj
	.intersect(otherData, function(el){
		return el.id;
	})
	.toList();
/*
result => [
	{ id: 2, name: "two", ... }
];
*/
```

#### Remove one element using *remove*
```javascript

var elementToRemove = queryObj
	.singleOrDefault(function(el){
		return el.id == 2;
	});

var result = queryObj
	.remove(elementToRemove)
	.toList();
/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/
```

#### Remove, from source array, specified elements with *subtract*
```javascript

var elementsToSubtract = [
	{ id: 2, name: "two", ... },
	{ id: 4, name: "four", ... },
	{ id: 7, name: "seven", ... }
];
			
var result = queryObj
	.subtract(elementsToSubtract, function(el){
		return el.id;
	})
	.toList();
/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 5, name: "five", ... }
];
*/
```

#### Sum numeric values with *sum*
```javascript
			
var result = queryObj
	.sum(function(el){
		return el.id;
	});
/*
result => 15
];
*/
```

#### Calculate average on numeric values with *average*
```javascript

var sampleData = [
	{ value: 3 },
	{ value: 2 },
	{ value: 5 },
	{ value: 2 },
];

var result = jslinq(sampleData)
	.average(function(x) { 
		return x.value; 
	});
			
/*
result => 3
];
*/
```

#### You can also chain multiple methods
```javascript

var result = queryObj
	.where(function(el) { return el.category == 'fruits' })
	.select(function(el) { return el.id; })
	.toList();
/*
result => [1, 4, 5];
*/
```

#### ...and use jslinq nested inside functions
```javascript

var result = queryObj
	.where(function(el) { 
	
		//Check if element has at least one country equals to "Italy"
		var hasItaly = jslinq(el.countries)
			.any(function(c){
				returc c == "Italy";
			});
		return hasItaly; 
	})
	.toList();
/*
result => [
	{ id: 1, name: "one", ... , countries: ["Italy", "Austria"] },
	{ id: 2, name: "two", ... , countries: ["Italy", "Germany"] },
	{ id: 5, name: "five", ... , countries: ["Japan", "Italy"] }
];
*/
```