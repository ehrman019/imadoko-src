export const init = () => {
  const selectTimeList: string[] = [];
  for (let i = 9; i <= 20; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const h = `0${i}`.slice(-2);
      const m = `0${j}`.slice(-2);
      selectTimeList.push(`${h}:${m}`);
    }
  }

  const situationList = [
    { id: 1, name: "出社" },
    { id: 2, name: "外出" },
    { id: 3, name: "在宅" },
    { id: 4, name: "休み" },
  ];
  const openingTime = "09:00";
  const closingTime = "18:00";

  return { selectTimeList, situationList, openingTime, closingTime };
};

export const bp = {
  tablet: "640px",
  pc: "1000px",
  xl: "1200px",
};
