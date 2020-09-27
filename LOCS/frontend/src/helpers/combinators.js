//Тождественность I-комбинатор
//Реализовано в Ramda.js через R.indentity

//Ответвление K-комбинатор
//Реализованно в Ramda.js через R.tap

//Перемена OR-комбинатор
export const alt = (func1, func2) => val => func1(val) || func2(val);

//Последовательность S-комбинатор
export const seq = (...args) => val => args.slice().forEach(func => func(val));

//Комбнатор разветвления
export const fork = (join, func1, func2) => val => join(func1(val), func2(val));

//Кастомный
export const forkOneFuncTwoArg = (join, func) => val1 => val2 => {
    const res1 = func(val1);
    const res2 = func(val2);
    const resJoin = join(res1, res2);
    return resJoin;
};

//Кастомный
export const forkTwoFuncTwoArg = (join, func1, func2) => val1 => val2 => {
    return join(func1(val1), func2(val2));
}; //Неканон
