var app = new Vue({
    el: '#transaction1',
    data: {
        userid: localStorage.getItem('id'),
        type_ind: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0],

        price: 0,
        pay: 0,
        pay_1: 0,
        pay_2: 0,
        pay_5: 0,
        pay_10: 0,
        pay_50: 0,
        payment_input: 0,
        change_input: 0,
        num_paynotes: 0, 
        card_type: '',
        Cardlist: ['visa', 'master', 'nets', 'cashcard'],
        cardpick: '',

        round: 100,
        current: 0,
        cor: 0,
        correct_num: 0,
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

        currentCountdown: 10,

        show_num_pad: false,
        num_pad_input: '',
        show_notes: false,
        show_card: true
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
        tick () {
            if (this.countdown < 0) {
                this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                localStorage.setItem("earn1", this.earn_stage);
                alert('Time is up! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'transaction2.html';
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
        },

        currentRoundTick () {
            if (this.currentCountdown < 0) {
                //this.resetCurrentCountdown();
                this.next();
            }
            setTimeout(() => {
                this.currentCountdown--;
                this.currentRoundTick();
            }, 1000);
        },

        resetCurrentCountdown () {
            this.currentCountdown = 10;
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
                this.show_num_pad = false;
                this.show_notes = true;
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);

            } else {
                this.payment_input = parseFloat(this.num_pad_input).toFixed(2);
                this.cardPay.push("-" + this.payment_input);
                // count the wrong key in numbers
                if (this.payment_input != this.price) {
                    alert('You key in the wrong number!');
                    this.correct_num --;
                    return;
                } else {
                    this.correct_num ++;
                    this.corr = 1;
                }
                this.endTime = Date.now();
                this.usedTime = (this.endTime - this.startTime ) / 1000;
                var URL = this.URLGenerator();
                this.sendResult(URL);

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
            //terminate with 3 wrong answers:
            if ((this.current - this.correct_num) >= 3) {
                this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                localStorage.setItem("earn1", this.earn_stage);
                alert('You have made 3 mistakes! You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                window.location = 'transaction2.html';
                return;
            }
            //finish all the 100 questions
            if (this.current === this.round) {
                this.earn_stage = Math.round(((0.1 * this.correct_num) - this.totalExcess) * 100) / 100;
                localStorage.setItem("earn1", this.earn_stage);
                alert('You have finished maximum number of 100 questions. You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please do NOT press any button and wait for instructions......');
                //this.nextpage();
                window.location = 'transaction2.html';
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
                    this.num_paynotes = this.pay_50 + this.pay_10 + this.pay_5 + this.pay_2 + this.pay_1;
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
                        [95.65,100],
                        [31.90,50],
                        [4.55,6],
                        [12.95,50],
                        [1.30,5],
                        [71.35,100],
                        [58.80,60],
                        [28.85,50],
                        [22.30,50],
                        [57.80,100],
                        [27.25,30],
                        [55.60,100],
                        [32.45,50],
                        [10.85,15],
                        [2.75,5],
                        [68.45,70],
                        [88.00,100],
                        [73.90,100],
                        [53.80,60],
                        [12.20,20],
                        [19.70,20],
                        [35.25,50],
                        [76.30,100],
                        [99.65,100],
                        [5.35,7],
                        [66.80,70],
                        [24.80,30],
                        [56.20,100],
                        [33.35,50],
                        [88.15,100]
                ];

        },

        cardCheck () {
            console.log(this.cardpick)
            this.cardSelect.push("+" + this.cardpick);
            if (this.card_type != this.cardpick) {
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
            this.prevExcess = 0;

            // short changed:
            if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) === Math.round(this.pay * 100))){
                alert('You have short changed the customer');
                this.short ++;
                return;
                // go back and correct the payment:
            } else if ((Math.round(this.result * 100) < Math.round(this.changetrue * 100)) & (Math.round(this.payment_input * 100) < Math.round(this.pay * 100))){
                alert('Customer has paid S$' + this.pay + '!! Check');
                this.short ++;
                this.show_card = false;
                this.show_num_pad = true;
                this.show_notes = false;
                this.payment_input = 0;
                this.num_pad_input = '';
                this.resetCurrentCountdown();
                return;
            } else if (Math.round(this.result * 100) == Math.round(this.changebypay * 100)){
                this.correct_num ++;
                this.corr = 1;
            } else {
                excess = Math.round((this.result - this.changetrue)*100)/100;
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
            var url = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSeVKeQUfIWjvCJMfb0M28l35efCjbkhVYP7nYDqrD6ZCTO9Zw/formResponse?";
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
            var payInputName = "entry.1880502092";
            var paytrueName = "entry.291513397";
            var CardTypeName = "entry.1752805968";
            var TypeidName = "entry.272432963";
            var id = encodeURIComponent(this.userid);
            var question = encodeURIComponent(this.current);
            var seq = encodeURIComponent(this.seqSelect);
            var correct = encodeURIComponent(this.corr);
            var timeStart = encodeURIComponent(this.startTime);
            var timeEnd = encodeURIComponent(this.endTime);
            var timeUsed = encodeURIComponent(this.usedTime);
            var change = encodeURIComponent(this.changetrue);
            var changeCollected = encodeURIComponent(this.result);
            var short = encodeURIComponent(this.short);
            var payInput = encodeURIComponent(this.cardPay);
            var paytrue = encodeURIComponent(this.pay);
            var CardType = encodeURIComponent(this.card_type);
            var Typeid = encodeURIComponent(this.type_ind[this.current-1]);
            var fullURL = url + idName + "=" + id + "&" + TypeidName + "=" + Typeid + "&" + questionName + "=" + question + "&" + seqName + "=" + seq +
                "&" + correctName + "=" + correct + "&" + timeStartName + "=" +timeStart + "&" + timeEndName + "=" + timeEnd +
                "&" + timeUsedName + "=" + timeUsed + "&" + changeName + "=" + change + "&" + changeCollectedName + "=" + changeCollected +
                "&" + shortName + "=" + short + "&" + payInputName + "=" + payInput + "&" + paytrueName + "=" + paytrue + "&" + CardTypeName + "=" + CardType + submitRef;
            return fullURL;
        }
    }

  })
