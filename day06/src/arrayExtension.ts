export { }
declare global {
    interface Array<T> {
        sum(exp?: (item: T, index: number) => number): number;
    }
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function <T>(exp?: (item: T, index: number) => number): number {
        var result: number = 0;
        if (exp) {
            result = this.map(exp).reduce((sum, it) => sum + it, 0)
        } else {
            result = this.reduce((sum, it) => sum + it, 0)
        }

        return result;
    };
}
