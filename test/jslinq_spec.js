describe("jslinq", function () {

	//Define test data
	var testData = [
		{ id: 1, name: "one", category: 'fruits', countries: ["Italy", "Austria"] },
		{ id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
		{ id: 3, name: "three", category: 'vegetables', countries: ["Germany"] },
		{ id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
		{ id: 5, name: "five", category: 'fruits', countries: ["Japan", "Italy"] }
	];
	
	//BeforeEach check if "testData" where changed during test
	beforeEach(function(){		
		if (testData[0].id != 1) throw new Error("Test data where changed");
		if (testData[1].id != 2) throw new Error("Test data where changed");
		if (testData[2].id != 3) throw new Error("Test data where changed");
		if (testData[3].id != 4) throw new Error("Test data where changed");
		if (testData[4].id != 5) throw new Error("Test data where changed");
	});
	
	//initializations
	describe("initializations", function () {
		
		it("Should have array as test data", function () {	
			var isArray = testData && testData.length > 1;
			expect(isArray).toEqual(true);	
		});
	});
	
	//outputs
	describe("outputs", function () {
	
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
				.singleOrDefault(function(x) { return x.id == 1; });
			expect(result).toBeDefined();
			expect(result.id).toEqual(1);
		});
		
		it("Should return one element with 'firstOrDefault'", function () {
			var result = jslinq(testData)
				.firstOrDefault(function(x) { return x.category == "vegetables"; });
			expect(result).toBeDefined();
			expect(result.id).toEqual(2);
		});
		
		it("Should return one element with 'lastOrDefault'", function () {
			var result = jslinq(testData)
				.lastOrDefault(function(x) { return x.category == "vegetables"; });
			expect(result).toBeDefined();
			expect(result.id).toEqual(3);
		});
		
		it("Should be true with 'any'", function () {
			var result = jslinq(testData)
				.any(function(x) { return x.name == "two"; });	
			expect(result).toEqual(true);
		});
		
		it("Should be true with 'all'", function () {
			var result = jslinq(testData)
				.any(function(x) { return x.countries.length > 0; });	
			expect(result).toEqual(true);
		});			
	});
	
	//projections
	describe("projections", function () {
	
		it("Should return 5 elements with 'select'", function () {
			var result = jslinq(testData)
				.select(function(x) { return x.id; })
				.toList();	
			expect(result).toBeDefined();
			expect(result[0]).toEqual(1);
		});
		
		it("Should select multiple list of elements with 'selectMany'", function () {
			var result = jslinq(testData)
				.selectMany(function(x){ return x.countries; })
				.toList();
			expect(result).toBeDefined();
			expect(result.length).toEqual(8);
		});	
	});
	
	//filters
	describe("filters", function () {
	
		it("Should returns one element with 'where'", function () {
			var result = jslinq(testData)
				.where(function(x) { return x.id == 5; })
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(1);
		});	
		
		it("Should returns four elements with 'skip'", function () {
			var result = jslinq(testData)
				.skip(1)
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
		});
		
		it("Should returns 3 elements with 'take'", function () {
			var result = jslinq(testData)
				.take(3)
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(3);
		});
	});
	
	//groupings
	describe("groupings", function () {
	
		it("Should return 2 groups with 'groupBy'", function () {
			var result = jslinq(testData)
				.groupBy(function(x) { return x.category; })
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
		});
		
		it("Should return 2 groups with 'groupBy' (with object as key)", function () {
			var result = jslinq(testData)
				.groupBy(function(x) { return { "someProperty": x.category }; })
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
		});
	
		it("Should have 4 elements with 'distinct'", function () {
			var extraData = ["A", "B", "C", "B", "A", "D"];
			var result = jslinq(extraData)
				.distinct()
				.toList();
			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
		});
		
		it("Should have 4 elements with 'distinct' (with object comparison)", function () {
			var extraData = [{ "key": "A" }, { "key": "B" }, { "key": "C" }, { "key": "B" }, { "key": "A" }, { "key": "D" }];
			var result = jslinq(extraData)
				.distinct()
				.toList();
			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
		});
	});
	
	//sortings
	describe("sortings", function () {
	
		it("Should sort elements with 'orderBy'", function () {
			var result = jslinq(testData)
				.orderBy(function(x){ return x.name; })
				.toList();
			expect(result).toBeDefined();
			expect(result.length).toEqual(5);
			expect(result[0].id).toEqual(5);
		});
		
		it("Should sort elements with 'orderByDescending'", function () {
			var result = jslinq(testData)
				.orderByDescending(function(x){ return x.name; })
				.toList();
			expect(result).toBeDefined();
			expect(result.length).toEqual(5);
			expect(result[0].id).toEqual(2);
		});		
	});
	
	//manipulations
	describe("manipulations", function () {
	
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
		
		//Added in v1.0.5
		it("Should obtain only 1 elements with 'intersect' (same instance)", function () {
			var someOtherData = jslinq(testData)
				.where(function(el){
					return el.id == 2;
				})
				.toList();
			var result = jslinq(testData)
				.intersect(someOtherData)
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(1);
		});

		//Added in v1.0.5
		it("Should obtain only 2 elements with 'intersect' (with compare expression)", function () {
			var someOtherData = [
				{ id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
				{ id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
				{ id: 7, name: "seven", category: 'fruit', countries: null }
			];
			var result = jslinq(testData)
				.intersect(someOtherData, function(el){
					return el.id;
				})
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
		});	

		//Added in v1.0.6
		it("Should obtain only 4 elements after 'remove'", function () {			
			var singleToRemove = jslinq(testData)
				.singleOrDefault(function(el){
					return el.id == 2;
				});
		
			var result = jslinq(testData)
				.remove(singleToRemove)
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
		});

		//Added in v1.0.8
		it("Should obtain only 4 elements after 'subtract' (same instance)", function () {			
			var someOtherData = jslinq(testData)
				.where(function(el){
					return el.id == 2;
				})
				.toList();
		
			var result = jslinq(testData)
				.subtract(someOtherData)
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
		});	

		//Added in v1.0.8
		it("Should obtain only 2 elements with 'subtract' (with compare expression)", function () {
			var someOtherData = [
				{ id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
				{ id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
				{ id: 7, name: "seven", category: 'fruit', countries: null }
			];
			var result = jslinq(testData)
				.subtract(someOtherData, function(el){
					return el.id;
				})
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(3);
		});	
		
		//Added in v1.0.12
		it("Should works also with nested 'jslinq' requests", function () {
			var someOtherData = [
				{ id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
				{ id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
				{ id: 7, name: "seven", category: 'fruit', countries: null }
			];
			var result = jslinq(testData)
				.where(function(el){
					
					//Check if "Italy" is present on "countries"
					var hasItaly = jslinq(el.countries)
						.any(function(c){
							return c == "Italy"
						});
					
					//Returns value
					return hasItaly;
				})
				.toList();	
			expect(result).toBeDefined();
			expect(result.length).toEqual(3);
		});					
	});
	
	//calculate
	describe("calculate", function () {
		
		it("Should have 5 with 'max'", function () {
			var result = jslinq(testData)
				.max(function(x) { return x.id; });
			expect(result).toBeDefined();
			expect(result).toEqual(5);
		});
		
		it("Should have 1 with 'min'", function () {
			var result = jslinq(testData)
				.min(function(x) { return x.id; });
			expect(result).toBeDefined();
			expect(result).toEqual(1);
		});
		
		//Added in v1.0.10
		it("Should obtain 15 using 'sum'", function () {			
			var result = jslinq(testData)
				.sum(function(el){
					return el.id;
				});
			expect(result).toBeDefined();
			expect(result).toEqual(15);
		});

		//Added in v1.0.14
		it("Should have 4 with 'average'", function () {

			var sampleData = [
				{ value: 3 },
				{ value: 2 },
				{ value: 5 },
				{ value: 2 },
			];

			var result = jslinq(sampleData)
				.average(function(x) { return x.value; });
			expect(result).toBeDefined();
			expect(result).toEqual(3);
		});
		
	})
	
});