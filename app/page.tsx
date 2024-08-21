"use client";

import { useState, ChangeEvent } from "react";

interface Grades {
  av1: number;
  av2: number;
  av3: number;
  av4: number;
}

export default function Page() {
  const [grades, setGrades] = useState<Grades>({
    av1: NaN,
    av2: NaN,
    av3: NaN,
    av4: NaN,
  });

  const global = 7;
  const weight = { av1: 2, av2: 2, av3: 2, av4: 4 };

  const calculateCurrentMedia = (): number => {
    const { av1, av2, av3, av4 } = grades;
    const totalWeight = weight.av1 + weight.av2 + weight.av3 + weight.av4;

    const totalGrade =
      (isNaN(av1) ? 0 : av1) * weight.av1 +
      (isNaN(av2) ? 0 : av2) * weight.av2 +
      (isNaN(av3) ? 0 : av3) * weight.av3 +
      (isNaN(av4) ? 0 : av4) * weight.av4;

    return totalGrade / totalWeight;
  };

  const calculateMissingGrade = (): string => {
    const { av1, av2, av3, av4 } = grades;
    const currentTotal =
      (isNaN(av1) ? 0 : av1 * weight.av1) +
      (isNaN(av2) ? 0 : av2 * weight.av2) +
      (isNaN(av3) ? 0 : av3 * weight.av3) +
      (isNaN(av4) ? 0 : av4 * weight.av4);

    const currentWeight =
      (isNaN(av1) ? 0 : weight.av1) +
      (isNaN(av2) ? 0 : weight.av2) +
      (isNaN(av3) ? 0 : weight.av3) +
      (isNaN(av4) ? 0 : weight.av4);

    const missingWeight = 10 - currentWeight;

    if (missingWeight > 0) {
      const requiredGrade = (global * 10 - currentTotal) / missingWeight;

      return requiredGrade.toFixed(2);
    }

    return "N/A";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: parseFloat(value),
    }));
  };

  const currentMedia = calculateCurrentMedia();
  const missingGrade = calculateMissingGrade();

  const renderGradeStatus = (grade: number): JSX.Element => {
    if (isNaN(grade)) {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
          {missingGrade}
        </span>
      );
    }
    return grade >= 7 ? (
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        {grade.toFixed(2)}
      </span>
    ) : (
      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        {grade.toFixed(2)}
      </span>
    );
  };

  return (
    <main className="flex max-w-md mx-auto min-h-screen flex-col items-center justify-between p-24">
      <h1 className="flex mb-4 text-4xl h-auto font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        7MC&nbsp;
        {Number(missingGrade) > 10 ? (
          <span className="underline underline-offset-3 decoration-8 decoration-red-600">
            {currentMedia.toFixed(2)}
          </span>
        ) : (Number(missingGrade) <= 0 || currentMedia >= 7) ? (
          <span className="underline underline-offset-3 decoration-8 decoration-green-600">
            {currentMedia.toFixed(2)}
          </span>
        ) : (
          <span className="underline underline-offset-3 decoration-8 decoration-blue-600">
            {currentMedia.toFixed(2)}
          </span>
        )}
      </h1>
      {(["av1", "av2", "av3", "av4"] as const).map((av, index) => (
        <div key={av} className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            min={0}
            max={10}
            name={av}
            value={grades[av]}
            onChange={handleInputChange}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Avaliação {index + 1} {index === 3 ? "- Objetiva" : ""}
          </label>
          <div className="mt-2 text-sm text-gray-500">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              Peso {weight[av]}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {isNaN(grades[av]) ? (
                <>NOTA &ge; {missingGrade}</>
              ) : (
                <>ATRIBUIDA</>
              )}
            </span>
            {renderGradeStatus(grades[av])}
          </div>
        </div>
      ))}
    </main>
  );
}
