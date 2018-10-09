var app = new Vue({
    el: '#transaction3_deduct',
    data: {
        userid: localStorage.getItem('id'),
        price: 0,
        pay: 0,
        round: 30,
        current: 0,
        cor: 0,
        correct_num: 0,
        earn_stage: 0,
        result: 0,
        short: 0,
        questions: [],
        multiplier: parseFloat(localStorage.getItem('multiplier')),
        prevExcess: 0,

        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyc: 0,
        twentyc: 0,
        tenc: 0,
        fivec: 0,

        store: {
        excess: []
        },

        seqSelect : [],

        startTime: 0,
        endTime: 0,
        usedTime: 0,

        countdown: 180,
        userNote: [5, 10, 50]
    },

    created () {
        this.questionBase();
        this.next(false);
        this.tick();

    },

    computed: {
        change () {
            return Math.round((this.pay - this.price) * 100)/100;
        },
        totalExcess () {
            return Math.round(this.store.excess.reduce((a, b) => a + b, 0)*100)/100;
        },
        formatTime () {
                if (this.countdown % 60  < 10){
                        second = "0" + this.countdown % 60;
                }
                else {second = this.countdown % 60; }
            return Math.floor(this.countdown / 60) + ":" + second;
        }
    },

    methods: {
        tick () {
            if (this.countdown < 0) {
                this.earn_stage = Math.round(((this.multiplier * this.correct_num) - this.totalExcess)*100) / 100;
                localStorage.setItem("earn3", this.earn_stage);
                alert('Time is up! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'random_fixed4.html';
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
        },

        add (val) {
            console.log('++');
            this[val]++;
            if (val == 'ten'){value = 10;}
            else if (val == "five") { value = 5; }
            else if (val == "two") {value = 2;}
            else if (val == "one") {value = 1;}
            else if (val == "fiftyc") {value = 0.5;}
            else if (val == "twentyc") {value = 0.2;}
            else if (val == "tenc") {value = 0.1;}
            else if (val == "fivec") {value = 0.05;}
            this.seqSelect.push("+" + value);
        },

        sub (val) {
            console.log('++')
            if (this[val] > 0){
                this[val]--;
                if (val == 'ten'){value = 10;}
                else if (val == "five") { value = 5; }
                else if (val == "two") {value = 2;}
                else if (val == "one") {value = 1;}
                else if (val == "fiftyc") {value = 0.5;}
                else if (val == "twentyc") {value = 0.2;}
                else if (val == "tenc") {value = 0.1;}
                else if (val == "fivec") {value = 0.05;}
                this.seqSelect.push("-" + value);
            }
        },

        clear() {
            this.ten = 0;
            this.five = 0;
            this.two = 0;
            this.one = 0;
            this.fiftyc = 0;
            this.twentyc = 0;
            this.tenc = 0;
            this.fivec = 0;
            this.seqSelect = [];
            this.corr = 0;
            this.usedTime = 0;
            this.short = 0;
        },

        next (submit=true) {
            // time start
            this.startTime = Date.now();

            if (this.current === this.round) {
                this.earn_stage = Math.round(((this.multiplier * this.correct_num) - this.totalExcess)*100) / 100;
                localStorage.setItem("earn3", this.earn_stage);
                alert('You have finished maximum number of 30 questions. You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'random_fixed4.html';
                return;
            }

            // clear
            this.clear();

            // increase round
            this.current++;

            // new change
            this.price = this.questions[this.current - 1][0];
            this.pay = this.questions[this.current - 1][1];



        },

        questionBase () {
                this.questions = [
                        [66.10,100],
                        [37.65,50],
                        [54.40,60],
                        [90.05,100],
                        [97.20,100],
                        [10.45,12],
                        [44.05,45],
                        [27.55,50],
                        [56.05,60],
                        [45,50],
                        [60.60,65],
                        [97.75,100],
                        [4.50,10],
                        [17.25,20],
                        [86.60,100],
                        [10.75,15],
                        [91.30,100],
                        [97.85,100],
                        [0.40,2],
                        [30.95,50],
                        [16.90,50],
                        [92.90,100],
                        [10.30,50],
                        [10.10,15],
                        [95.70,100],
                        [14.15,50],
                        [27.10,50],
                        [14.00,20],
                        [47.85,50],
                        [4.05,10]
                ];

        },

        sendResult (fullURL) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                document.getElementById("demo").innerHTML =
                this.responseText;
              }
            };
            xhttp.open("GET", fullURL, true);
            xhttp.send();
          },

        onSubmit () {
            // calculate
            this.result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 +
                parseInt(this.fivec) * 0.05;
            this.prevExcess = 0;

            // compare
            if (Math.round(this.result * 100) < Math.round(this.change * 100)) {
                alert('You have short changed the customer');
                this.short++;
                return;
            } else if (Math.round(this.result * 100) == Math.round(this.change * 100)){
                this.correct_num ++;
                this.corr = 1;
            } else {
                excess = Math.round((this.result - this.change)*100)/100;
                this.prevExcess = excess;
                this.store.excess.push(excess);
            }
            this.endTime = Date.now();
            this.usedTime = (this.endTime - this.startTime ) / 1000;
            var URL = this.URLGenerator();
            this.sendResult(URL);



            this.next();
        },

        URLGenerator () {
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLScYe-LmJF_7ufxGPignr9SYe9H31kQdGexWYcefmZPL_3z5Cw/formResponse?";
            var submitRef = "&submit=Submit";
            var idName = "entry.1582178970";
            var questionName = "entry.1959376514";
            var seqName = "entry.1889444857";
            var correctName = "entry.1308898835";
            var timeStartName = "entry.392681116";
            var timeEndName = "entry.454503067";
            var timeUsedName = "entry.1296130196";
            var changeName = "entry.1938361813";
            var changeCollectedName = "entry.2002870282";
            var shortName = "entry.879414864";
            var multiplierName = "entry.114101997";
            var id = encodeURIComponent(this.userid);
            var question = encodeURIComponent(this.current);
            var seq = encodeURIComponent(this.seqSelect);
            var correct = encodeURIComponent(this.corr);
            var timeStart = encodeURIComponent(this.startTime);
            var timeEnd = encodeURIComponent(this.endTime);
            var timeUsed = encodeURIComponent(this.usedTime);
            var change = encodeURIComponent(this.change);
            var changeCollected = encodeURIComponent(this.result);
            var short = encodeURIComponent(this.short);
            var multi = encodeURIComponent(this.multiplier);
            var fullURL = url + idName + "=" + id + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
                "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
                "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
                "&" + shortName + "=" + short + "&" + multiplierName + "=" + multi + submitRef;
            return fullURL;
        }
    }

  })
