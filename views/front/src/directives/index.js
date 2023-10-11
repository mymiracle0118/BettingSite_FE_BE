import Vue from "vue";
// import moment from 'moment-timezone'
import moment from "moment";
import store from "@/store";

Vue.directive("kval", function(el, binding) {
  let value = binding.value.size;
  let kvalue = value;
  let number;
  if (value >= 1000) {
    number = parseFloat(value / 1000).toFixed(1);
    kvalue = parseFloat(number) + "K";
  } else {
    kvalue = parseFloat(kvalue);
  }
  el.innerHTML = kvalue;
});

Vue.directive("currency", function(el, binding) {
  let value = parseFloat(binding.value);
  value = value.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  el.innerHTML = value;
});

Vue.directive("odds", function(el, binding) {
  let odds = binding.value.odds;
  let value = "—";

  if (odds != 0) {
    value = odds;
  }
  el.innerHTML = value;
});

Vue.directive("livebook", function(el, binding) {
  let mid = binding.value.mid;
  let sid = binding.value.sid;
  let bet = store.state.bet;
  let sportBook = store.state.sportbetBook;
  let amount = "";

  if (_.get(bet, "amount") != "" && !isNaN(_.get(bet, "amount"))) {
    // Same Market
    if (_.get(bet, "marketId") == mid) {
      // Same Section
      if (_.get(bet, "sectionId") == sid) {
        // if has not old book
        // MATCH && BACK
        if (
          (_.get(bet, "gType") == "match" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "profit"));
        }
        // MATCH && LAY
        if (
          (_.get(bet, "gType") == "match" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(
            (_.get(bet, "uRate") - 1) * _.get(bet, "amount") * -1
          );
        }
        // MATCH1 && BACK
        if (
          _.get(bet, "gType") == "match1" &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "profit"));
        }
        // MATCH1 && LAY
        if (
          _.get(bet, "gType") == "match1" &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(
            _.get(bet, "uRate") * (_.get(bet, "amount") / 100) * -1
          );
        }
        // if has old book
        if (sportBook) {
          for (const market of sportBook) {
            // Same Market Book
            if (_.get(market, "mid") == mid) {
              for (const section of _.get(market, "sdata")) {
                // Same Section Book
                // MATCH && BACK
                if (_.get(section, "sid") == sid) {
                  if (
                    (_.get(bet, "gType") == "match" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "profit"))
                    );
                  }

                  // MATCH && LAY
                  if (
                    (_.get(bet, "gType") == "match" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    // console.log(_.get(section, 'amt'), _.get(bet, 'uRate'), _.get(bet, 'amount'), sid, _.get(section, 'sid'))
                    amount = parseFloat(
                      _.get(section, "amt") +
                        (_.get(bet, "uRate") - 1) * _.get(bet, "amount") * -1
                    );
                  }

                  // MATCH1 && BACK
                  if (
                    _.get(bet, "gType") == "match1" &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "profit"))
                    );
                  }

                  // MATCH1 && LAY
                  if (
                    _.get(bet, "gType") == "match1" &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    amount = parseFloat(
                      _.get(section, "amt") +
                        _.get(bet, "uRate") * (_.get(bet, "amount") / 100) * -1
                    );
                  }
                }
              }
            }
          }
        }
      } else {
        // Other Section
        // if has not old book
        // MATCH && BACK
        if (
          (_.get(bet, "gType") == "match" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "amount") * -1);
        }
        // MATCH && LAY
        if (
          (_.get(bet, "gType") == "match" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(_.get(bet, "amount"));
        }
        // MATCH1 && BACK
        if (
          _.get(bet, "gType") == "match1" &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "amount") * -1);
        }
        // MATCH1 && LAY
        if (
          _.get(bet, "gType") == "match1" &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(_.get(bet, "amount"));
        }
        // if has old book
        if (sportBook) {
          for (const market of sportBook) {
            // Same Market Book
            if (_.get(market, "mid") == mid) {
              for (const section of _.get(market, "sdata")) {
                // Same Section Book
                if (_.get(section, "sid") == sid) {
                  // MATCH && BACK
                  if (
                    (_.get(bet, "gType") == "match" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount") * -1)
                    );
                  }
                  // MATCH && LAY
                  if (
                    (_.get(bet, "gType") == "match" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount"))
                    );
                  }
                  // MATCH1 && BACK
                  if (
                    _.get(bet, "gType") == "match1" &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount") * -1)
                    );
                  }
                  // MATCH1 && LAY
                  if (
                    _.get(bet, "gType") == "match1" &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount"))
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
  }
  // if (amount)
  //     amount = eval(parseFloat(amount))

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("livebookv3", function(el, binding) {
  let mid = binding.value.mid;
  let sid = binding.value.sid;
  let bet = store.state.bet;
  let sportBook = store.state.sportbetBook;
  let amount = "";

  if (_.get(bet, "amount") != "" && !isNaN(_.get(bet, "amount"))) {
    // Same Market
    if (_.get(bet, "marketId") == mid) {
      // Same Section
      if (_.get(bet, "sectionId") == sid) {
        // if has not old book
        // MATCH1 && BACK
        if (
          (_.get(bet, "gType") == "match1" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "profit"));
        }
        // MATCH1 && LAY
        if (
          (_.get(bet, "gType") == "match1" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(
            (_.get(bet, "uRate") - 1) * _.get(bet, "amount") * -1
          );
        }

        // if has old book
        if (sportBook) {
          for (const market of sportBook) {
            // Same Market Book
            if (_.get(market, "mid") == mid) {
              for (const section of _.get(market, "sdata")) {
                // Same Section Book
                // MATCH1 && BACK
                if (_.get(section, "sid") == sid) {
                  if (
                    (_.get(bet, "gType") == "match1" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "profit"))
                    );
                  }

                  // MATCH1 && LAY
                  if (
                    (_.get(bet, "gType") == "match1" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    // console.log(_.get(section, 'amt'), _.get(bet, 'uRate'), _.get(bet, 'amount'), sid, _.get(section, 'sid'))
                    amount = parseFloat(
                      _.get(section, "amt") +
                        (_.get(bet, "uRate") - 1) * _.get(bet, "amount") * -1
                    );
                  }
                }
              }
            }
          }
        }
      } else {
        // Other Section
        // if has not old book
        // MATCH1 && BACK
        if (
          (_.get(bet, "gType") == "match1" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "back"
        ) {
          amount = parseFloat(_.get(bet, "amount") * -1);
        }
        // MATCH1 && LAY
        if (
          (_.get(bet, "gType") == "match1" ||
            _.get(bet, "gType") == "cricketcasino") &&
          _.get(bet, "betType").toLowerCase() == "lay"
        ) {
          amount = parseFloat(_.get(bet, "amount"));
        }

        // if has old book
        if (sportBook) {
          for (const market of sportBook) {
            // Same Market Book
            if (_.get(market, "mid") == mid) {
              for (const section of _.get(market, "sdata")) {
                // Same Section Book
                if (_.get(section, "sid") == sid) {
                  // MATCH1 && BACK
                  if (
                    (_.get(bet, "gType") == "match1" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "back"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount") * -1)
                    );
                  }
                  // MATCH1 && LAY
                  if (
                    (_.get(bet, "gType") == "match1" ||
                      _.get(bet, "gType") == "cricketcasino") &&
                    _.get(bet, "betType").toLowerCase() == "lay"
                  ) {
                    amount = parseFloat(
                      parseFloat(_.get(section, "amt")) +
                        parseFloat(_.get(bet, "amount"))
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
  }
  // if (amount)
  //     amount = eval(parseFloat(amount))

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("sportbook", function(el, binding) {
  let mid = binding.value.mid;
  let sid = binding.value.sid;
  // console.log(mid, sid)
  let amount = "";

  if (store.state.sportbetBook && store.state.sportbetBook.length) {
    for (let i = 0; i < store.state.sportbetBook.length; i++) {
      let market = store.state.sportbetBook[i];
      if (mid == market.mid) {
        if (market.sdata && market.sdata.length) {
          for (let j = 0; j < market.sdata.length; j++) {
            let section = market.sdata[j];
            if (sid == section.sid) {
              amount = section.amt;
            }
          }
        }
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("fancybook", function(el, binding) {
  let mid = binding.value.mid;
  let sid = binding.value.sid;
  // console.log(mid, sid)
  let amount = "";

  if (store.state.fancybetBook && store.state.fancybetBook.length) {
    for (let i = 0; i < store.state.fancybetBook.length; i++) {
      let market = store.state.fancybetBook[i];
      if (mid == market.mid) {
        if (market.sdata && market.sdata.length) {
          for (let j = 0; j < market.sdata.length; j++) {
            let section = market.sdata[j];
            if (sid == section.sid) {
              amount = section.amt;
            }
          }
        }
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("casinobookcalc", function(el, binding) {
  let sid = binding.value.sid;
  let subid = 0;
  let urate = binding.value.urate;

  // console.log(sid, subid)
  let amount = "0";

  if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
    for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
      var data = store.state.casinoFancybetBook[i];
      if (data.sid == sid && data.subid == subid) {
        // if(store.state.casinoBetSoda && store.state.casinoBetSoda.length){
        //     for (let j = 0; j < store.state.casinoBetSoda.length; j++) {
        //         var soda = store.state.casinoBetSoda[i]
        //         console.log(soda)
        //     }
        // }
        let book = data.amt * -1;
        amount = book * urate - book;
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
    el.classList.add("d-none");
    if (el.parentElement) el.parentElement.classList.remove("lock-top");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("casinofancybook", function(el, binding) {
  let sid = binding.value.sid;
  let subid = 0;
  if (binding.value.subid) {
    subid = binding.value.subid;
  }
  // console.log(sid, subid)
  let amount = "0";

  if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
    for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
      var data = store.state.casinoFancybetBook[i];
      if (data.sid == sid && data.subid == subid) {
        amount = data.amt;
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
    el.classList.add("d-none");
    if (el.parentElement) el.parentElement.classList.remove("lock-top");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("vcasinofancybook", function(el, binding) {
  let sid = binding.value.sid;
  let subid = 0;
  if (binding.value.subid) {
    subid = binding.value.subid;
  }
  // console.log(sid, subid)
  let amount = 0;

  if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
    for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
      var data = store.state.casinoFancybetBook[i];
      if (data.sid == sid && data.subid == subid) {
        amount = data.amt;
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("book-red");
    el.classList.add("book-green");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("book-green");
    el.classList.add("book-red");
    el.classList.remove("d-none");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "red";
  } else {
    el.classList.remove("book-red");
    el.classList.remove("book-green");
    // el.classList.add("d-none");
    if (el.parentElement) el.parentElement.classList.remove("lock-top");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("casinobook", function(el, binding) {
  let sid = binding.value.sid;
  // console.log(sid)
  let amount = "";

  if (store.state.casinobetBook && store.state.casinobetBook.length) {
    for (let i = 0; i < store.state.casinobetBook.length; i++) {
      var data = store.state.casinobetBook[i];
      if (data.sid == sid) {
        amount = data.amt;
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("d-none");
    el.classList.remove("book-red");
    el.classList.add("book-green");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("d-none");
    el.classList.remove("book-green");
    el.classList.add("book-red");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "red";
  } else {
    el.classList.add("d-none");
    el.classList.remove("book-red");
    el.classList.remove("book-green");
    if (el.parentElement) el.parentElement.classList.remove("lock-top");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("vcasinobook", function(el, binding) {
  let sid = binding.value.sid;
  // console.log(sid)
  let amount = 0;

  if (store.state.casinobetBook && store.state.casinobetBook.length) {
    for (let i = 0; i < store.state.casinobetBook.length; i++) {
      var data = store.state.casinobetBook[i];
      if (data.sid == sid) {
        amount = data.amt;
      }
    }
  }

  if (amount > 0) {
    el.classList.remove("d-none");
    el.classList.remove("book-red");
    el.classList.add("book-green");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "green";
  } else if (amount < 0) {
    el.classList.remove("d-none");
    el.classList.remove("book-green");
    el.classList.add("book-red");
    if (el.parentElement && el.parentElement.classList.contains("suspended"))
      el.parentElement.classList.add("lock-top");
    // el.style.color = "red";
  } else {
    // el.classList.add("d-none");
    el.classList.remove("book-red");
    el.classList.remove("book-green");
    if (el.parentElement) el.parentElement.classList.remove("lock-top");
  }

  amount = amount.toLocaleString("EN-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  el.innerHTML = amount;
});

Vue.directive("highlightDate", function(el, binding) {
  let dateTime = binding.value.dateTime;
  // dateTime = '8/20/2020 12:00:00 PM'
  var day = moment(dateTime, "MM-DD-YYYY hh:mm:ss A");

  // get from-now for this date
  var fromNow = moment(day).fromNow();

  // ensure the date is displayed with today and yesterday
  var date = moment(day).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: function() {
      return "[" + day.format("DD MMM") + "]";
    },
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: function() {
      var now = moment();
      if (now.isSame(day, "week")) {
        return "[" + day.format("dddd") + "]";
      } else {
        return "[" + day.format("DD MMM") + "]";
      }
    },
    // when the date is further away, use from-now functionality
    sameElse: function() {
      // return "[" + day.format("DD-MM-YYYY") + "]";
      return "[" + day.format("DD MMM") + "]";
    },
  });

  el.innerHTML = date;
});

Vue.directive("highlightTime", function(el, binding) {
  let dateTime = binding.value.time;
  var day = moment(dateTime, "MM-DD-YYYY hh:mm:ss A");

  var time = day.format("HH:mm");

  el.innerHTML = time;
});
