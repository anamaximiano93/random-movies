const certificationColors = [
  {
    state: "BR",
    name: [
      {
        age: "L",

        color: "#0c9447",
      },
      {
        age: "10",

        color: "#0f7dc2",
      },
      {
        age: "12",
        color: "#f8c411",
      },
      {
        age: "14",
        color: "#e67824",
      },
      {
        age: "16",
        color: "#da2524",
      },
      {
        age: "18",
        color: "#1a1512",
      },
    ],
  },
  {
    state: "US",
    name: [
      {
        age: "G",
        color: "#0c9447",
      },
      {
        age: "PG",
        color: "#0f7dc2",
      },
      {
        age: "PG-13",
        color: "#f8c411",
      },
      {
        age: "R",
        color: "#da2524",
      },
      {
        age: "NC-17",
        color: "#1a1512",
      },

      {
        age: "NR",
        color: "gray",
      },
    ],
  },
];

const getCertification = (certification, language) => {
  const getLaguage = language.slice(3, language.length);
  let newValues = [];
  certification.filter((faixa) => {
    if (faixa.state === getLaguage) {
      certificationColors.find((color) => {
        if (color.state === getLaguage && faixa.certification !== "") {
          //prettier-ignore
          const colorFind = color.name.find((i) => i.age === faixa.certification)
          return newValues.push({
            certification: faixa.certification,
            state: faixa.state,
            color: colorFind.color,
          });
        }
      });
    }
  });

  if (newValues.length === 0) {
    newValues.push({
      certification: "N/A",
      state: getLaguage,
      color: "gray",
    });
  }

  return newValues[0];
};

export { getCertification };
