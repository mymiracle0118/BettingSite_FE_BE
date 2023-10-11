import Vue from 'vue'
// import moment from 'moment-timezone'
import moment from 'moment'
import store from '@/store'
import helpers from '@/helpers'

Vue.directive('kval', function (el, binding) {
    let value = binding.value.size
    let kvalue = value
    let number
    if (value >= 1000) {
        number = parseFloat(value / 1000).toFixed(1);
        kvalue = parseFloat(number) + 'K'
    }
    else {
        kvalue = parseFloat(kvalue)
    }
    el.innerHTML = kvalue;
})

Vue.directive('currency', function (el, binding) {
    let value = binding.value
    if (value != undefined) {
        value = parseFloat(value)
        value = value.toLocaleString('EN-IN', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 });
    } else {
        value = ""
    }
    el.innerHTML = value;
})

Vue.directive('currencyint', function (el, binding) {
    let value = binding.value
    if (value != undefined) {
        value = parseInt(value)
        value = value.toLocaleString('EN-IN');
    } else {
        value = ""
    }
    el.innerHTML = value;
})

Vue.directive('odds', function (el, binding) {
    let odds = binding.value.odds;
    let value = '—'

    if (odds != 0) {
        value = odds
    }
    el.innerHTML = value;
})

Vue.directive('sportbook', function (el, binding) {
    let mid = binding.value.mid;
    let sid = binding.value.sid;
    let amount = 0 
    let avg = 0;
    if (store.state.sportbetBook && store.state.sportbetBook.length) {
        for (let i = 0; i < store.state.sportbetBook.length; i++) {
            let market = store.state.sportbetBook[i]
            if (mid == market.mid && sid == market.sid) {
                amount = market.book
                if(i == 0){
                    avg = (market.book/store.state.sportbetBook[1].book).toFixed(2);
                    avg = Math.abs((isNaN(avg))?'':avg);
                }else if(i == 1){
                    avg = (market.book/store.state.sportbetBook[0].book).toFixed(2);
                    avg = Math.abs((isNaN(avg))?'':avg);
                }
            }
        }
    }

    if (amount > 0) {
        el.style.color = "green";
    } else if (amount < 0) {
        el.style.color = "red";
    } else if (amount == 0) {
        el.style.color = "#999";
        el.classList.remove("d-none")
    } else {
        el.classList.add("d-none")
    }
    if (amount)
        amount = helpers.toCurrency(amount)
    if(store.state.sportbetBook && store.state.sportbetBook.length == 2){
        el.innerHTML = amount+' <span class="badge badge-dark book-per">'+avg+"%</span>";
    }else{
        el.innerHTML = amount;  
    }
})

Vue.directive('fancybook', function (el, binding) {
    let mid = binding.value.mid;
    let sid = binding.value.sid;
    // console.log(mid, sid)
    let amount = 0

    if (store.state.fancybetBook && store.state.fancybetBook.length) {
        for (let i = 0; i < store.state.fancybetBook.length; i++) {
            let market = store.state.fancybetBook[i]
            if (mid == market.mid && sid == market.sid) {
                amount = market.book
            }
        }
    }

    if (amount > 0) {
        el.style.color = "green";
    } else if (amount < 0) {
        el.style.color = "red";
    } else if (amount == 0) {
        el.style.color = "#999";
        el.classList.remove("d-none")
    } else {
        el.classList.add("d-none")
    }
    if (amount)
        amount = helpers.toCurrency(amount)
    el.innerHTML = amount;
})

Vue.directive('casinofancybook', function (el, binding) {
    let sid = binding.value.sid;
    let subid = 0;
    if (binding.value.subid) {
        subid = binding.value.subid;
    }
    let amount = 0

    if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
        for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
            var data = store.state.casinoFancybetBook[i]
            if (data.sid == sid && data.subid == subid) {
                amount = data.amt
            }
        }
    }
    if (amount > 0) {
        el.classList.remove("book-red")
        el.classList.add("book-green")
        el.classList.remove("book-black")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    } else if (amount < 0) {
        el.classList.remove("book-green")
        el.classList.remove("book-black")
        el.classList.add("book-red")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    }
    else {
        el.classList.remove("book-red")
        el.classList.remove("book-green")
        el.classList.add("book-black")
        el.classList.remove("d-none")
        if(el.parentElement)
            el.parentElement.classList.remove('lock-top')
    }
    if (amount)
        amount = helpers.toCurrency(amount)

    el.innerHTML = amount;
})

Vue.directive('casinobook', function (el, binding) {
    let sid = binding.value.sid;
    // console.log(sid)
    let amount = 0

    if (store.state.casinobetBook && store.state.casinobetBook.length) {
        for (let i = 0; i < store.state.casinobetBook.length; i++) {
            var data = store.state.casinobetBook[i]
            if (data.sid == sid) {
                amount = data.amt
            }
        }
    }

    if (amount > 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-red")
        el.classList.add("book-green")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    } else if (amount < 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-green")
        el.classList.add("book-red")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    }
    else {
        el.classList.remove("book-red")
        el.classList.remove("book-green")
        el.classList.add("book-black")
        el.classList.remove("d-none")
        if(el.parentElement)
            el.parentElement.classList.remove('lock-top')
    }
    if (amount)
        amount = helpers.toCurrency(amount)
    el.innerHTML = amount;
})


Vue.directive('teenbook', function (el, binding) {
    let sid = binding.value.sid;
    let rate = binding.value.rate
    let subid = 0;
    if (binding.value.subid) {
        subid = binding.value.subid;
    }
    let amount = ''
    if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
        for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
            var data = store.state.casinoFancybetBook[i]
            if (data.sid == sid && data.subid == subid) {
                amount = -1 * parseFloat(parseFloat(data.amt * rate) - data.amt).toFixed(2);
            }
        }
    }

    if (amount > 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-red")
        el.classList.add("book-green")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    } else if (amount < 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-green")
        el.classList.add("book-red")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    }
    else {
        el.classList.remove("book-red")
        el.classList.remove("book-green")
        el.classList.remove("d-none")
        el.classList.add("book-black")
        if(el.parentElement)
            el.parentElement.classList.remove('lock-top')
    }
    if (amount)
        amount = helpers.toCurrency(amount)
    el.innerHTML = amount;
})

Vue.directive('highlightDate', function (el, binding) {
    let dateTime = binding.value.dateTime;
    // dateTime = '8/20/2020 12:00:00 PM'
    var day = moment(dateTime, "MM-DD-YYYY hh:mm:ss A");

    // get from-now for this date
    var fromNow = moment(day).fromNow();

    // ensure the date is displayed with today and yesterday
    var date = moment(day).calendar(null, {
        // when the date is closer, specify custom values
        lastWeek: function () {
            return "[" + day.format("DD MMM") + "]";
        },
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: function () {
            var now = moment();
            if (now.isSame(day, 'week')) {
                return "[" + day.format("dddd") + "]";
            }
            else {
                return "[" + day.format("DD MMM") + "]";
            }
        },
        // when the date is further away, use from-now functionality             
        sameElse: function () {
            // return "[" + day.format("DD-MM-YYYY") + "]";
            return "[" + day.format("DD MMM") + "]";
        }
    });

    el.innerHTML = date;

})

Vue.directive('highlightTime', function (el, binding) {
    let dateTime = binding.value.time;
    var day = moment(dateTime, "MM-DD-YYYY hh:mm:ss A");

    var time = day.format("HH:mm")

    el.innerHTML = time;

})

Vue.directive('formatDate', function (el, binding) {
    let dateTime = binding.value.date;
    if (dateTime) {
        var day = moment(dateTime, "MM/DD/YYYY hh:mm:ss A");
        var time = day.format("DD/MM/YYYY")
        el.innerHTML = time;
    } else {
        el.innerHTML = '';
    }
})

Vue.directive('formatDatetime', function (el, binding) {
    let dateTime = binding.value.date;

    if (dateTime) {
        var day = moment(dateTime, "MM-DD-YYYY hh:mm:ss A");
        var time = day.format("DD/MM/YYYY HH:mm:ss")
        el.innerHTML = time;
    } else {
        el.innerHTML = '';
    }
})

Vue.directive('casinobookcalc', function (el, binding) {
    let sid = binding.value.sid;
    let subid = 0;
    let urate = binding.value.urate;

    // console.log(sid, subid)
    let amount = '0'

    if (store.state.casinoFancybetBook && store.state.casinoFancybetBook.length) {
        for (let i = 0; i < store.state.casinoFancybetBook.length; i++) {
            var data = store.state.casinoFancybetBook[i]
            if (data.sid == sid && data.subid == subid) {
                // if(store.state.casinoBetSoda && store.state.casinoBetSoda.length){
                //     for (let j = 0; j < store.state.casinoBetSoda.length; j++) {
                //         var soda = store.state.casinoBetSoda[i]
                //         console.log(soda)
                //     }
                // }
                let book = data.amt * -1
                amount = (book * urate) - book
            }
        }
    }

    if (amount > 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-red")
        el.classList.add("book-green")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    } else if (amount < 0) {
        el.classList.remove("book-black")
        el.classList.remove("book-green")
        el.classList.add("book-red")
        el.classList.remove("d-none")
        if(el.parentElement && el.parentElement.classList.contains("suspended"))
            el.parentElement.classList.add('lock-top')
    }
    else {
        el.classList.remove("book-red")
        el.classList.remove("book-green")
        el.classList.remove("d-none")
        el.classList.add("book-black")
        if(el.parentElement)
            el.parentElement.classList.remove('lock-top')
    }
    if (amount)
        amount = helpers.toCurrency(amount)

    el.innerHTML = amount;
})