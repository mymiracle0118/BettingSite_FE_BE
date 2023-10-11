export default {
    orderBy(data, key) {
        return _.orderBy(data, key);
    },
    isInt(n){
        return Number(n) === n && n % 1 === 0;
    },
    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
}