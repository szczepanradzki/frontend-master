export function multipleFieldFiltering(filtered, criteria) {
    Array.prototype.flexFilter = function(info) {
        let matchesFilter, matches = [], count;

        matchesFilter = function(item) {
            count = 0;
            for (let n = 0; n < info.length; n++) {
                item[info[n]["name"]] &&
                item[info[n]["name"]].toLowerCase().match(info[n]["value"] && info[n]["value"].toLowerCase()) ? count++ : false;
            }
            return count === info.length;
        };

        for (let i = 0; i < this.length; i++) {
            if(matchesFilter(this[i])) {
                matches.push(this[i]);
            }
        }
        return matches;
    };
    const setCriteriaArray = Object.keys(criteria).map(critery => {
        return {name: critery, value: criteria[critery]};
    });
    const array = setCriteriaArray.filter(critery => !!critery.value);
    return array.length > 0 ? filtered.flexFilter(array) : filtered;
}
