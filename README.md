jslinq
======

Another LINQ provider for Javascript

## Usage

#### Given the following source array:

```javascript
var data = [
	{ id: 1, name: "one", category: 'fruits' },
	{ id: 2, name: "two", category: 'vegetables' },
	{ id: 3, name: "three", category: 'vegetables' },
	{ id: 4, name: "four", category: 'fruits' },
	{ id: 5, name: "five", category: 'fruits' }
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
	{ id: 1, name: "one", category: 'fruits' },
	{ id: 2, name: "two", category: 'vegetables' },
	{ id: 3, name: "three", category: 'vegetables' },
	{ id: 4, name: "four", category: 'fruits' },
	{ id: 5, name: "five", category: 'fruits' }
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
result => { id: 1, name: "one", category: 'fruits' };
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
result => [{ id: 2, name: "two", category: 'vegetables' }];
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
	{ key: 'vegetables', count: 2 }, 
	{ key: 'fruits', count: 3 }, 
];
*/
```

#### Marge two arrays with *join*
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
	{ id: 1, name: "one", category: 'fruits' },
	{ id: 2, name: "two", category: 'vegetables' },
	{ id: 3, name: "three", category: 'vegetables' },
	{ id: 4, name: "four", category: 'fruits' },
	{ id: 5, name: "five", category: 'fruits' }, 
	{ id: 7, name: "seven", category: 'vegetables' }, 
	{ id: 8, name: "eight", category: 'fruit' }
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