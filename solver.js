export class Operation {
    constructor(op1, op2, type) {
        this.op1 = op1;
        this.op2 = op2;
        this.type = type;
        this.result = this.#operate();
    }
    #operate = () => {
        switch (this.type) {
            case '+':
                return this.op1 + this.op2;
            case '-':
                return this.op1 - this.op2;
            case '*':
                return this.op1 * this.op2;
            case '/':
                return this.op1 / this.op2;
        }
    };

    isValid() {
        return Number.isSafeInteger(this.result) && this.result >= 0;
    }
}

export const getOperations = (solution, numbers, operators = ['+', '-', '*', '/']) => {
    const getPossibleOperations = (numbers, operators) => {
        const res = [];
        for (let i = 0; i < numbers.length - 1; i++)
            for (let j = i + 1; j < numbers.length; j++)
                for (let k = 0; k < operators.length; k++) {
                    let op = new Operation(numbers[i], numbers[j], operators[k]);
                    if (op.isValid()) res.push(op);
                    else {
                        op = new Operation(numbers[j], numbers[i], operators[k]);
                        if (op.isValid()) res.push(op);
                    }
                }
        return res;
    };

    const getOperationsRecursive = (numbers, acc, history) => {
        if (acc === solution) return history;
        const operations = getPossibleOperations(numbers, operators);
        if (history.length > 5 || !operations.length) return undefined;
        let sol;
        while (operations.length && !sol) {
            const item = operations.pop();
            let numersAux = [
                ...numbers.filter((n) => n !== item.op1 && n !== item.op2),
                item.result,
            ];
            sol = getOperationsRecursive(numersAux, item.result, [
                ...history,
                item,
            ]);
        }
        return sol;
    };

    const solutions = getOperationsRecursive(numbers, undefined, []);
    printSolution(solutions);
};

const printSolution = (solutions) => {
    let sol = '';
    solutions.forEach(s => {
        sol += `${s.op1} ${s.type} ${s.op2} = ${s.result}\n`;
    })
    console.log(sol);
}