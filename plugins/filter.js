import Vue from "vue";

const currency = num => {
  const n = Number(num);
  return ` $${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency =
      i && c !== "." && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, "")
        : c;
    return currency;
  })}`;
};

const dataFormat = data => {
  let time = new Date(data);
  let year = time.getFullYear();
  let month = ("0" + (time.getMonth() + 1)).substr(-2);
  let date = ("0" + time.getDate()).substr(-2);
  return `${year}/${month}/${date}`;
};

const timeFormat = data => {
  let time = new Date(data);
  let year = time.getFullYear();
  let month = ("0" + (time.getMonth() + 1)).substr(-2);
  let date = ("0" + time.getDate()).substr(-2);
  let min = ("0" + time.getMinutes()).substr(-2);
  let sec = ("0" + time.getSeconds()).substr(-2);
  return `${year}/${month}/${date} ${min}:${sec}`;
};

Vue.filter("currency", currency);
Vue.filter("dateFormat", dataFormat);
Vue.filter("timeFormat", timeFormat);
