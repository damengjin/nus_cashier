var app = new Vue({
    el: '#countdown_trail',
    data: {
        userid: localStorage.getItem('id'),
        type_ind: [ 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],

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

        round: 10,
        current: 0,
        cor: 0,
        correct_num: 0,
        wrong_num:0,
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
        endTime: 0,
        usedTime: 0,

        countdown: 300,
        userNote: [5, 10, 50],

        currentCountdown: 12,

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
        //this.tick();
    },

    computed: {
        changetrue () {
            return parseFloat((Math.round((this.pay - this.price) * 100)/100).toFixed(2));
        },
        changebypay () {
            return parseFloat((Math.round((this.payment_input - this.price) * 100)/100).toFixed(2));
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
        // tick () {
        //     if (this.countdown < 0) {
        //         this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
        //         localStorage.setItem("earn1", this.earn_stage);
        //         alert('Time is up! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
        //         window.location = 'transaction2.html';
        //         return;
        //     }
        //     setTimeout(() => {
        //         this.countdown--;
        //         this.tick();
        //     }, 1000);
        // },

        currentRoundTick () {
            if (this.currentCountdown < 0) {
                this.next();
            }
            setTimeout(() => {
                this.currentCountdown--;
                this.currentRoundTick();
            }, 1000);
        },

        resetCurrentCountdown () {
            this.currentCountdown = 12;
        },

        // nextpage() {
        //     confirm("Press ONLY when you're told to DO SO!");
        //     window.location = 'transaction2.html';
        // },

        add (val) {
            console.log('++');
            this[val]++;
            if (val == 'ten'){value = 10;}
            else if (val == "five") {value = 5; }
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
                if (val == 'ten'){value = 10; }
                else if (val == "five") {value = 5;}
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
                // this.endTime = Date.now();
                // this.usedTime = (this.endTime - this.startTime ) / 1000;
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

        next () {
            // time start
            this.startTime = Date.now();

            if (this.currentCorrect) {
                this.correct_num++;
            }
            this.currentCorrect = false;

            if (this.currentWrong) {
                this.wrong_num++;
            }
            this.currentWrong = false;

            // //terminate with 3 wrong answers:
            // if ( this.wrong_num>= 4) {
            //     //(this.current - this.correct_num)
            //     this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
            //     localStorage.setItem("earn1", this.earn_stage);
            //     alert('You have made more than 3 mistakes! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
            //     window.location = 'transaction2.html';
            //     return;
            // }

            //finish all the 10 questions
            if (this.current === this.round) {
                // this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                // localStorage.setItem("earn1", this.earn_stage);
                //alert('You have finished all the trial questions. Please do NOT press any button and wait for instructions......');
                //this.nextpage();
                window.location = 'Wait_page_trial.html';
                return;
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
                    [49.95,	50],
                    [93.10,	100],
                    [71.30,	75],
                    [81.95,	82],
                    [14.45,	20.45],
                    [90.75,	95],
                    [66.40,	70.4],
                    [0.90,	2],
                    [48.10,	50.1],
                    [19.45,	20]
                ];

        },

        cardCheck (type) {
            this.cardSelect.push("+" + type);
            if (this.card_type != type) {
                alert('You Picked the Wrong Card Type!');
                return;
            }
        },

        // sendResult (fullURL) {
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function() {
        //       if (this.readyState == 4 && this.status == 200) {
        //         document.getElementById("demo").innerHTML =
        //         this.responseText;
        //       }
        //     };
        //     xhttp.open("GET", fullURL, true);
        //     xhttp.send();
        //   },

        onSubmit () {
            // calculate
            this.result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 +
                parseInt(this.fivec) * 0.05;
            this.prevExcess = 0;

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
            }
            // } else {
            //     excess = Math.round((this.result - this.changetrue)*100)/100;
            //     alert('You will have excess S$' + excess + ' deducted from your earning!!');
            //     this.currentWrong = true;
            //     this.prevExcess = excess;
            //     this.store.excess.push(excess);
            // }
            // this.endTime = Date.now();
            // this.usedTime = (this.endTime - this.startTime ) / 1000;
            // var URL = this.URLGenerator();
            // this.sendResult(URL);

            this.next();
        },

    }

  })







  