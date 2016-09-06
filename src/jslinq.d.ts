declare function jslinq(data: any[]) : jslinq.JsLinq; 

declare namespace jslinq {

    interface JsLinq {
        
        //Where
        where?: (condition: (el: any) => boolean) => JsLinq;

        //Select
        select: (projection: (el) => any) => JsLinq;

        //GroupBy
        groupBy?: (group: (el) => any) => JsLinq;

        //Join
        join?: (otherData: any[]) => JsLinq;

        //ToList
        toList?: () => any[];

        //Intersect
        intersect?: (otherData: any[], comparisonField?: (el) => any) => JsLinq;

        //Distinct
        distinct?: () => JsLinq;

        //OrderBy
        orderBy?: (sortField: (el) => any) => JsLinq;

        //OrderByDescending
        orderByDescending?: (sortField: (el) => any) => JsLinq;

        //SelectMany
        selectMany?: (projection: (el) => any[]) => JsLinq;

        //SingleOrDefault
        singleOrDefault?: (condition?: (el: any) => boolean) => JsLinq;

        //FirstOrDefault
        firstOrDefault?: (condition?: (el: any) => boolean) => JsLinq;

        //LastOrDefault
        lastOrDefault?: (condition?: (el: any) => boolean) => JsLinq;

        //Any
        any?: (condition?: (el: any) => boolean) => boolean;

        //All
        all?: (condition?: (el: any) => boolean) => boolean;

        //Count
        count?: () => number;

        //Skip
        skip?: (quantity: number) => JsLinq;

        //Take
        take?: (quantity: number) => JsLinq;

        //Max
        max?: (projection?: (el) => any) => any;

        //Min
        min?: (projection?: (el) => any) => any;

        //Remove
        remove?: (element: any) => JsLinq;

        //Subtract
        subtract?: (otherData: any[], comparisonField?: (el) => any) => JsLinq;

        //Sum
        sum?: (projection?: (el) => number) => number;

        //Average
        average?: (projection?: (el) => number) => number;            
    }
}

//Export module
export = jslinq;