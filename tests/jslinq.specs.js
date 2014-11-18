describe("jslinq", function () {

	//Define test data
	var testData = [
		{ id: 1, name: "one", category: 'fruits' },
		{ id: 2, name: "two", category: 'vegetables' },
		{ id: 3, name: "three", category: 'vegetables' },
		{ id: 4, name: "four", category: 'fruits' },
		{ id: 5, name: "five", category: 'fruits' }
	];
		
	it("Should have array as test data", function () {	
		var isArray = testData && testData.length > 1;
		expect(isArray).toEqual(true);	
    });
	
	it("Should returns 5 on with 'count'", function () {	
		var result = jslinq(testData)
			.count();	
		expect(result).toEqual(5);
    });
	
	it("Should return 5 elements with 'toList'", function () {	
		var result = jslinq(testData)
			.toList();	
		expect(result).toBeDefined();
		expect(result.length).toEqual(5);
    });
	
	it("Should return one element with 'singleOrDefault'", function () {
		var result = jslinq(testData)
			.singleOrDefault(function(x) { return x.id == 1 });	
		expect(result).toBeDefined();
		expect(result.id).toEqual(1);
    });
	
	it("Should return 5 elements with 'select'", function () {
		var result = jslinq(testData)
			.select(function(x) { return x.id; })
			.toList();	
		expect(result).toBeDefined();
		expect(result[0]).toEqual(1);
    });
	
	it("Should return filter with 'where'", function () {
		var result = jslinq(testData)
			.where(function(x) { return x.id == 5; })
			.toList();	
		expect(result).toBeDefined();
		expect(result.length).toEqual(1);
    });
	
	it("Should return 2 groups with 'groupBy'", function () {
		var result = jslinq(testData)
			.groupBy(function(x) { return x.category; })
			.toList();	
		expect(result).toBeDefined();
		expect(result.length).toEqual(2);
    });
	
	it("Should have 7 elements with 'join'", function () {
		var someOtherData = [
			{ id: 7, name: "seven", category: 'vegetables' }, 
			{ id: 8, name: "eight", category: 'fruit' }
		];
		var result = jslinq(testData)
			.join(someOtherData)
			.toList();	
		expect(result).toBeDefined();
		expect(result.length).toEqual(7);
    });
	
	it("Should have 4 elements with 'distinct'", function () {
		var extraData = ["A", "B", "C", "B", "A", "D"];
		var result = jslinq(extraData)
			.distinct()
			.toList();
		expect(result).toBeDefined();
		expect(result.length).toEqual(4);
    });
});