import { ICourse, ICourses } from "./interfaces";

const currencyTransfer = (
  courses: ICourses | {},
  currency: number | string,
  valute1: string,
  valute2: string
) => {
  let result = "0";

  if (!Object.keys(courses).length) return result;

  if (valute1 !== "RUB" && valute2 !== "RUB") {
    const course1: ICourse = courses[valute1 as keyof typeof courses];
    const course2: ICourse = courses[valute2 as keyof typeof courses];

    result = ((course1.Value * Number(currency)) / course2.Value).toFixed(2);
  } else if (valute1 !== "RUB" && valute2 === "RUB") {
    const course1: ICourse = courses[valute1 as keyof typeof courses];

    result = (course1.Value * Number(currency)).toFixed(2);
  } else if (valute1 === "RUB" && valute2 !== "RUB") {
    const course2: ICourse = courses[valute2 as keyof typeof courses];

    result = (Number(currency) / course2.Value).toFixed(2);
  } else {
    result = Number(currency).toFixed(2);
  }

  return result;
};

export default currencyTransfer;
