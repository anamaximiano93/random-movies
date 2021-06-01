function getTimeFromMins(mins) {
  // do not include the first validation check if you want, for example,
  // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440."
    );
  }
  var h = (mins / 60) | 0,
    m = mins % 60 | 0;

  return `${h}h${m}m`; //moment.utc().hours(h).minutes(m).format("hmm");
}

const getGernesfromArrytostring = (genres) => {
  //prettier-ignore
  let comparetion = (genres.length - 1);
  const newValues = genres.map((item, index) => {
    let value = "";
    if (genres.length === 1) {
      return item.name;
    } else {
      if (index === 0) {
        //prettier-ignore
        value += index === (genres.length- 2) ? item.name : item.name + ", ";
      } else if (index !== comparetion) {
        //prettier-ignore
        value += index === (genres.length- 2) ? item.name : item.name + ", ";
      } else {
        value += " & " + item.name;
      }
    }
    return value;
  });
  return newValues;
};

const getCrewsfromArrytostring = (crews) => {
  //prettier-ignore
  let comparetion = (crews.length - 1);
  const newValues = crews.map((item, index) => {
    let value = "";
    if (crews.length === 1) {
      return item.name;
    } else {
      if (index === 0) {
        //prettier-ignore
        value += index === (crews.length- 2) ? item.name : item.name + ", ";
      } else if (index !== comparetion) {
        //prettier-ignore
        value += index === (crews.length- 2) ? item.name : item.name + ", ";
      } else {
        value += " & " + item.name;
      }
    }
    return value;
  });
  return newValues;
};

const getActorsfromArraytoString = (actors) => {
  //prettier-ignore
  const newArray = (actors.length >= 4 ? actors.slice(0,4) : actors.slice(0,(actors.length-1)));

  const newValueString = newArray.map((item, index) => {
    let value = "";
    if (newArray.length === 1) {
      return item.name;
    } else {
      if (index === 0) {
        //prettier-ignore
        value += index === (newArray.length- 2) ? item.name : item.name + ", ";
        //prettier-ignore
      } else if (index !== newArray.length - 1) {
        //prettier-ignore
        value += index === (newArray.length- 2) ? item.name : item.name + ", ";
      } else {
        value += " & " + item.name;
      }
    }
    return value;
  });
  return newValueString;
};

const getDateFull = (dateString) => {
  var p = String(dateString).split(/\D/g);
  var data = [p[1], p[2], p[0]].join("-");
  const newDate = new Date(data).toLocaleDateString("pt-BR");
  return newDate;
};

export {
  getTimeFromMins,
  getGernesfromArrytostring,
  getActorsfromArraytoString,
  getDateFull,
  getCrewsfromArrytostring,
};
