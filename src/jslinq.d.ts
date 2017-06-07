declare function jslinq<T>(data: T[]) : jslinq.JsLinq<T>; 

declare namespace jslinq {

    interface JsLinq<T> {
        
        //Where
        where?: (condition: (el: T) => boolean) => JsLinq<T>;

        //Select
        select: (projection: (el: T) => any) => JsLinq<T>;

        //GroupBy
        groupBy?: (group: (el: T) => any) => JsLinqGroup<T>;

        //Join
        join?: (otherData: T[]) => JsLinq<T>;

        //ToList
        toList?: () => T[];

        //Intersect
        intersect?: (otherData: T[], comparisonField?: (el) => T) => JsLinq<T>;

        //Distinct
        distinct?: () => JsLinq<T>;

        //OrderBy
        orderBy?: (sortField: (el : T) => any) => JsLinq<T>;

        //OrderByDescending
        orderByDescending?: (sortField: (el: T) => any) => JsLinq<T>;

        //SelectMany
        selectMany?: <Q>(projection: (el: T) => Q[]) => JsLinq<Q>;

        //SingleOrDefault
        singleOrDefault?: (condition?: (el: T) => boolean) => T;

        //FirstOrDefault
        firstOrDefault?: (condition?: (el: T) => boolean) => T;

        //LastOrDefault
        lastOrDefault?: (condition?: (el: T) => boolean) => T;

        //Any
        any?: (condition?: (el: T) => boolean) => boolean;

        //All
        all?: (condition?: (el: T) => boolean) => boolean;

        //Count
        count?: () => number;

        //Skip
        skip?: (quantity: number) => JsLinq<T>;

        //Take
        take?: (quantity: number) => JsLinq<T>;

        //Max
        max?: (projection?: (el: T) => any) => T;

        //Min
        min?: (projection?: (el: T) => any) => T;

        //Remove
        remove?: (element: T) => JsLinq<T>;

        //Subtract
        subtract?: (otherData: T[], comparisonField?: (el : T) => T) => JsLinq<T>;

        //Sum
        sum?: (projection?: (el: T) => number) => number;

        //Average
        average?: (projection?: (el : T) => number) => number;            
    }

    interface JsLinqGroup<T> {

        key: any;
        count: number; 
        elements: T[];
    }
}

//Export module
export = jslinq;