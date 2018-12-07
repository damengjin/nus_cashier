var app = new Vue({
    el: '#control_exercise',
    data: {
        userid: localStorage.getItem('id'),
        type_ind: [ 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],

        price: 0,
        pay: 0,
        pay_1: 0,
        pay_2: 0,
        pay_5: 0,
        pay_10: 0,
        pay_50: 0,
        pay_fiftyc: 0,
        pay_twentyc: 0,
        pay_tenc: 0,
        pay_fivec: 0,
        payment_input: 0,
        change_input: 0,
        num_paynotes: 0, 
        card_type: '',
        Cardlist: ['visa', 'master', 'nets', 'cashcard'],
        cardpick: '',

        round: 50,
        current: 0,
        cor: 0,
        correct_num: 0,
        wrong_num: 0,
        earn_stage: 0,
        result: 0,
        short: 0,
        questions: [],
        prevExcess: 0,
        change_show: '',
        VisaCardList: ['visa1.png','visa2.jpg','visa3.png'],
        MasterCardList: ['mastercard1.png','mastercard2.jpg','mastercard3.jpg','mastercard4.png'],

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
        cardSelect: [],
        cardPay: [],

        startTime: 0,
        startTimeStr: '',
        endTime: 0,
        endTimeStr: '',
        usedTime: 0,

        countdown: 180,
        userNote: [5, 10, 50],

        currentCountdown_cash: 12,
        currentCountdown_card: 8,

        show_num_pad: false,
        num_pad_input: '',
        show_notes: false,
        show_card: true,

        currentCorrect: false,
        currentWrong: false
    },

    created () {
        this.questionBase();
        // reset round countdown
        this.resetCurrentCountdown();
        this.currentRoundTick();
        this.next(false);
        this.tick();

    },

    computed: {
        changetrue () {
            return parseFloat((Math.round((this.pay - this.price) * 100)/100).toFixed(2));
        },
        changebypay () {
            return parseFloat((Math.round((this.payment_input - this.price) * 100)/100).toFixed(2));
        },
        formatTime () {
            if (this.countdown % 60  < 10){
                second = "0" + this.countdown % 60;
            }
            else {second = this.countdown % 60; }
            return Math.floor(this.countdown / 60) + ":" + second;
        },
        currentFormatTime () {
            if (this.currentCountdown % 60  < 10){
                second = "0" + this.currentCountdown % 60;
            }
            else {second = this.currentCountdown % 60; }
            return Math.floor(this.currentCountdown / 60) + ":" + second;
        },

        card_type_img () {
            if (this.card_type === 'visa') {
                return this.VisaCardList[Math.floor(Math.random() * this.VisaCardList.length)];   
            } else if (this.card_type === 'master') {
                return this.MasterCardList[Math.floor(Math.random() * this.MasterCardList.length)];
            } else if (this.card_type === 'nets') {
                return 'nets1.jpg';
            } else if (this.card_type === 'cashcard') {
                return 'cashcard1.jpg';
            }
        }
    },

    methods: {
        tick () {
            if (this.countdown < 0) {
                this.earn_stage = Math.round((0.1 * this.correct_num) * 100)/100;
                localStorage.setItem("earn2", this.earn_stage);
                alert('Time is up! Stage 1 ends.');
                window.location = 'Wait_page_trial.html';
                // alert('Time is up! You have made ' + this.correct_num + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'scheme_choice3.html';
                // return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
        },

        currentRoundTick () {
            if (this.currentCountdown < 0) {
                this.next();
            }
            setTimeout(() => {
                this.currentCountdown--;
                console.log(this.currentCountdown)
                this.currentRoundTick();
            }, 1000);
        },

        resetCurrentCountdown () {
            // this.currentCountdown = 12;
            if (this.type_ind[this.current] === 0){
                this.currentCountdown = this.currentCountdown_cash;
            }
            else {
                this.currentCountdown = this.currentCountdown_card;
            }
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

        pad_input (val) {
            this.num_pad_input += val;
        },

        pad_backspace () {
            if (this.num_pad_input.length > 0) {
                this.num_pad_input = this.num_pad_input.slice(0, this.num_pad_input.length-1);
            }
        },

        pad_submit () {
            if (this.type_ind[this.current-1]===0){
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
                if (this.payment_input === 'NaN') {
                    alert('You did NOT key in any number!');
                    return;
                } else {
                    this.show_num_pad = false;
                    this.show_notes = true;                    
                }
            } else {
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
                this.cardPay.push("-" + this.payment_input);
                // count the wrong key in numbers
                if (this.payment_input != this.price) {
                    alert('You key in the wrong number!');
                    this.currentCorrect = false;
                    this.currentWrong = true;
                    this.num_pad_input = '';
                    return;
                } else {
                    this.currentCorrect = true;
                    this.corr = 1;
                }
                this.endTime = Date.now();
                this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
                this.usedTime = (this.endTime - this.startTime ) / 1000;
                // var URL = this.URLGenerator();
                // this.sendResult(URL);

                this.next();
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
            this.cardSelect = [];
            this.cardPay = [];
            this.corr = 0;
            this.usedTime = 0;
            this.short = 0;
            this.num_pad_input = '';
            this.card_type = '';
            this.payment_input = 0;
            this.cardpick = '';
            this.result = 0;
        },

        next (submit=true) {
            // time start
            this.startTime = Date.now();
            this.startTimeStr = (new Date(this.startTime)).toString('MM/dd/yy HH:mm:ss');

            if (this.currentCorrect) {
                this.correct_num++;
            }
            this.currentCorrect = false;

            if (this.currentWrong) {
                this.wrong_num++;
            }
            this.currentWrong = false;

            //terminate with 3 wrong answers:
            if (this.wrong_num >= 4) {
                this.earn_stage = Math.round((0.1 * this.correct_num) * 100) / 100;
                localStorage.setItem("earn2", this.earn_stage);
                alert('You have made more than 3 mistakes! Stage 1 ends.');
                window.location = 'Wait_page2.html';
                // alert('You have made more than 3 mistakes! You have made ' + this.correct_num + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'scheme_choice3.html';
                // return;
            }
            //finish all the 100 questions
            if (this.current === this.round) {
                this.earn_stage = Math.round((0.1 * this.correct_num) * 100)/100;
                localStorage.setItem("earn2", this.earn_stage);
                alert('You have finished all the 50 transactions! Stage 1 ends.');
                window.location = 'Wait_page2.html';
                // alert('You have finished maximum number of 30 questions. You have made ' + this.correct_num + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                // window.location = 'scheme_choice3.html';
                // return;
            }

            // clear
            this.clear();
            console.log(this.type_ind[this.current])
            if (this.type_ind[this.current]===1){
                this.card_type = this.Cardlist[Math.floor(Math.random() * this.Cardlist.length)];
            }
            this.show_current_round_page();

            // increase round
            this.current++;

            // new change
            this.price = this.questions[this.current - 1][0];
            if (this.type_ind[this.current-1] ===  0) {
                    this.pay = this.questions[this.current - 1][1];
                    this.pay_copy = this.pay;
                    this.pay_50 = Math.floor(this.pay_copy / 50);
                    this.pay_copy %= 50;
                    this.pay_10 = Math.floor(this.pay_copy / 10);
                    this.pay_copy %= 10;
                    this.pay_5 = Math.floor(this.pay_copy / 5);
                    this.pay_copy %= 5;
                    this.pay_2 = Math.floor(this.pay_copy / 2);
                    this.pay_copy %= 2;
                    this.pay_1 = Math.floor(this.pay_copy / 1);
                    this.pay_copy %= 1;
                    this.pay_fiftyc = Math.floor(this.pay_copy / 0.5);
                    this.pay_copy = parseFloat((this.pay_copy % 0.5).toFixed(2));
                    this.pay_twentyc = Math.floor(this.pay_copy / 0.2);
                    this.pay_copy = parseFloat((this.pay_copy % 0.2).toFixed(2));
                    this.pay_tenc = Math.floor(this.pay_copy / 0.1);
                    this.pay_copy = parseFloat((this.pay_copy % 0.1).toFixed(2));
                    console.log(this.pay_copy)
                    this.pay_fivec = (this.pay_copy / 0.05);
                    this.num_paynotes = this.pay_50 + this.pay_10 + this.pay_5 + this.pay_2 + this.pay_1 + this.pay_fiftyc + this.pay_twentyc + this.pay_tenc + this.pay_fivec;
            } else {
                this.pay = this.price;
            }
        },

        show_current_round_page () {
            this.resetCurrentCountdown();
            if (this.type_ind[this.current] ===  0) {
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
            } else {
                this.show_card = true;
                this.show_num_pad = false;
                this.show_notes = false;
            }
        },

        questionBase () {
                this.questions = [
                        [66.10,	100],
                        [37.65,	50],
                        [54.40,	60],
                        [90.05,	100],
                        [97.20,	100],
                        [10.45,	12],
                        [44.05,	45],
                        [27.55,	50],
                        [56.05,	60],
                        [45.00,	50],
                        [60.60,	65],
                        [97.75,	100],
                        [4.50,	10],
                        [17.25,	20],
                        [86.60,	100],
                        [10.75,	15],
                        [91.30,	100.3],
                        [97.85,	100],
                        [0.40,	2],
                        [30.95,	50],
                        [0.75,	0.8],
                        [92.45,	95],
                        [40.3,	50],
                        [73.8,	75],
                        [85.6,	90.6],
                        [51.1,	52.1],
                        [42.7,	45],
                        [14.7,	15.7],
                        [64.05,	100],
                        [61.35,	70],
                        [15.95,	17],
                        [92.7,	95],
                        [57.4,	60.4],
                        [57.9,	60],
                        [61.95,	70],
                        [70.2, 80],
                        [28.3,	30.3],
                        [31.95,	35],
                        [53.05,	55.05],
                        [29,	50],
                        [71.7,	80],
                        [27.8,	50],
                        [26.05,	30.05],
                        [29.2,	30],
                        [89.35,	90.35],
                        [48.6,	50],
                        [17.55,	20],
                        [42.35,	45],
                        [47.15,	50.15],
                        [63.8,	65]
                ];

        },

        cardCheck (type) {
            this.cardSelect.push("+" + type);
            if (this.card_type != type) {
                alert('You Picked the Wrong Card Type!');
                return;
            }
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

            // short changed:
            if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) === Math.round(this.pay * 100))){
                alert('You have short changed the customer');
                this.currentWrong = true;
                this.short ++;
                return;
                // go back and correct the payment:
            } else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) < Math.round(this.pay * 100))){
                alert('Customer has paid S$' + this.pay + '!! Check');
                this.short ++;
                this.currentWrong = true;
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
                this.payment_input = 0;
                this.num_pad_input = '';
                this.resetCurrentCountdown();
                return;
            } else if ((Math.round(this.result * 100) == Math.round(this.changebypay * 100)) & (Math.round(this.changetrue * 100) == Math.round(this.changebypay * 100))) {
                this.currentCorrect = true;
                this.corr = 1;
            } else {
                excess = Math.round((this.result - this.changetrue)*100)/100;
                this.prevExcess = excess;
                this.currentWrong = true;
            }
            // this.endTime = Date.now();
            // this.endTimeStr = (new Date(this.endTime)).toString('MM/dd/yy HH:mm:ss');
            // this.usedTime = (this.endTime - this.startTime ) / 1000;
            // var URL = this.URLGenerator();
            // this.sendResult(URL);

            this.next();
        },

        // URLGenerator () {
        //     var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSe0dkNfu3XOnJEJd_RNgLK6dYxI8ufEuqg7sYvM_fY5v4yyjg/formResponse?";
        //     var submitRef = "&submit=Submit";
        //     var idName = "entry.1582178970";
        //     var questionName = "entry.1959376514";
        //     var seqName = "entry.1889444857";
        //     var correctName = "entry.1308898835";
        //     var timeStartName = "entry.392681116";
        //     var timeEndName = "entry.454503067";
        //     var timeUsedName = "entry.1296130196";
        //     var changeName = "entry.1938361813";
        //     var changeCollectedName = "entry.2002870282";
        //     var shortName = "entry.879414864";
        //     var payInputName = "entry.1653212703";
        //     var paytrueName = "entry.844490896";
        //     var CardTypeName = "entry.1632364073";
        //     var TypeidName = "entry.1344063532";
        //     var CardpickName = "entry.1296160618";
        //     var id = encodeURIComponent(this.userid);
        //     var question = encodeURIComponent(this.current);
        //     var seq = encodeURIComponent(this.seqSelect);
        //     var correct = encodeURIComponent(this.corr);
        //     var timeStart = encodeURIComponent(this.startTimeStr);
        //     var timeEnd = encodeURIComponent(this.endTimeStr);
        //     var timeUsed = encodeURIComponent(this.usedTime);
        //     var change = encodeURIComponent(this.changetrue);
        //     var changeCollected = encodeURIComponent(this.result);
        //     var short = encodeURIComponent(this.short);
        //     var payInput = encodeURIComponent(this.cardPay);
        //     var paytrue = encodeURIComponent(this.pay);
        //     var CardType = encodeURIComponent(this.card_type);
        //     var Typeid = encodeURIComponent(this.type_ind[this.current-1]);
        //     var Cardpick = encodeURIComponent(this.cardSelect);
        //     var fullURL = url + idName + "=" + id + "&" + TypeidName + "=" + Typeid + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
        //         "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
        //         "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
        //         "&" + shortName + "=" + short + "&" + payInputName + "=" + payInput + "&" + paytrueName + "=" + paytrue + "&" + CardTypeName + "=" + CardType + "&" + CardpickName + "=" + Cardpick + submitRef;
        //     return fullURL;
        // }
    }

  })



  
