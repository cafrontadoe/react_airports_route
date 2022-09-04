
// reusable functions 
export class UtilFunctions {

    
    static getActualDay(): any {
        const date = new Date();
        return {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth() + 1
        };
    }


    
}
