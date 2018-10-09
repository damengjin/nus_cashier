var app = new Vue({
    el: '#transaction2',
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
                this.earn_stage = Math.round((0.5 * this.correct_num) * 100)/100;
                localStorage.setItem("earn2", this.earn_stage);
                alert('Time is up! You have made ' + this.correct_num + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'scheme_choice3.html';
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
                this.earn_stage = Math.round((0.5 * this.correct_num) * 100)/100;
                localStorage.setItem("earn2", this.earn_stage);
                alert('You have finished maximum number of 30 questions. You have made ' + this.correct_num + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'scheme_choice3.html';
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
                        [60.60,62],
                        [78.20,100],
                        [37.35,50],
                        [73.80,80],
                        [61.95,70],
                        [3.25,10],
                        [73.90,80],
                        [1.75,5],
                        [10.35,15],
                        [68.05,100],
                        [0.95,5],
                        [9.70,10],
                        [35.80,40],
                        [96.60,100],
                        [30.30,35],
                        [31.35,32],
                        [86.95,100],
                        [24.60,50],
                        [55.80,60],
                        [21.15,25],
                        [23.20,25],
                        [91.75,100],
                        [58.70,100],
                        [32.75,50],
                        [18.45,20],
                        [36.40,50],
                        [35.50,50],
                        [73.15,100],
                        [85.40,100],
                        [23.95,50]

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

            // compare
            if (Math.round(this.result * 100) < Math.round(this.change * 100)) {
                alert('You have short changed the customer');
                this.short++;
                return;
            } else if (Math.round(this.result * 100) == Math.round(this.change * 100)){
                this.correct_num ++;
                this.corr = 1;
            } else {
                excess = Math.round((this.result - this.change)*10)/10;
                this.store.excess.push(excess);
            }
            this.endTime = Date.now();
            this.usedTime = (this.endTime - this.startTime ) / 1000;
            var URL = this.URLGenerator();
            this.sendResult(URL);



            this.next();
        },

        URLGenerator () {
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSe0dkNfu3XOnJEJd_RNgLK6dYxI8ufEuqg7sYvM_fY5v4yyjg/formResponse?";
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
            var fullURL = url + idName + "=" + id + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
                "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
                "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
                "&" + shortName + "=" + short + submitRef;
            return fullURL;
        }
    }

  })
