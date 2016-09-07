declare function jslinq(data: any[]) : jslinq.JsLinq;
declare function jslinq<T>(data: T[]) : jslinq.JsLinq<T>; 

declare namespace jslinq {

    // interface JsLinq {
        
    //     //Where
    //     where?: (condition: (el: any) => boolean) => JsLinq;

    //     //Select
    //     select: (projection: (el) => any) => JsLinq;

    //     //GroupBy
    //     groupBy?: (group: (el) => any) => JsLinq;

    //     //Join
    //     join?: (otherData: any[]) => JsLinq;

    //     //ToList
    //     toList?: () => any[];

    //     //Intersect
    //     intersect?: (otherData: any[], comparisonField?: (el) => any) => JsLinq;

    //     //Distinct
    //     distinct?: () => JsLinq;

    //     //OrderBy
    //     orderBy?: (sortField: (el) => any) => JsLinq;

    //     //OrderByDescending
    //     orderByDescending?: (sortField: (el) => any) => JsLinq;

    //     //SelectMany
    //     selectMany?: (projection: (el) => any[]) => JsLinq;

    //     //SingleOrDefault
    //     singleOrDefault?: (condition?: (el: any) => boolean) => any;

    //     //FirstOrDefault
    //     firstOrDefault?: (condition?: (el: any) => boolean) => any;

    //     //LastOrDefault
    //     lastOrDefault?: (condition?: (el: any) => boolean) => any;

    //     //Any
    //     any?: (condition?: (el: any) => boolean) => boolean;

    //     //All
    //     all?: (condition?: (el: any) => boolean) => boolean;

    //     //Count
    //     count?: () => number;

    //     //Skip
    //     skip?: (quantity: number) => JsLinq;

    //     //Take
    //     take?: (quantity: number) => JsLinq;

    //     //Max
    //     max?: (projection?: (el) => any) => any;

    //     //Min
    //     min?: (projection?: (el) => any) => any;

    //     //Remove
    //     remove?: (element: any) => JsLinq;

    //     //Subtract
    //     subtract?: (otherData: any[], comparisonField?: (el) => any) => JsLinq;

    //     //Sum
    //     sum?: (projection?: (el) => number) => number;

    //     //Average
    //     average?: (projection?: (el) => number) => number;            
    // }

    interface JsLinq<T> {
        
        //Where
        where?: (condition: (el: T) => boolean) => JsLinq<T>;

        //Select
        select: (projection: (el) => T) => JsLinq<T>;

        //GroupBy
        groupBy?: (group: (el) => T) => JsLinqGroup<T>;

        //Join
        join?: (otherData: T[]) => JsLinq<T>;

        //ToList
        toList?: () => T[];

        //Intersect
        intersect?: (otherData: T[], comparisonField?: (el) => T) => JsLinq<T>;

        //Distinct
        distinct?: () => JsLinq<T>;

        //OrderBy
        orderBy?: (sortField: (el) => T) => JsLinq<T>;

        //OrderByDescending
        orderByDescending?: (sortField: (el) => T) => JsLinq<T>;

        //SelectMany
        selectMany?: (projection: (el) => T[]) => JsLinq<T>;

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
        max?: (projection?: (el) => T) => T;

        //Min
        min?: (projection?: (el) => T) => T;

        //Remove
        remove?: (element: T) => JsLinq<T>;

        //Subtract
        subtract?: (otherData: T[], comparisonField?: (el) => T) => JsLinq<T>;

        //Sum
        sum?: (projection?: (el) => number) => number;

        //Average
        average?: (projection?: (el) => number) => number;            
    }

    interface JsLinqGroup<T> {

        key: any;
        count: number; 
        elements: T[];
    }
}

//Export module
export = jslinq;