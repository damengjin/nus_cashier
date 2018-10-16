var app = new Vue({
    el: '#scheme_choice',
    data: {
      choices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      changedIndex: -1,
      scheme_num: 0,
      multiplier: 0,
      deduct: 0,
      Deductstr: ''
    },


    methods: {
        onSelectChange (pivot) {
            let val = this.choices;
            if (val[pivot] === 1) {
                for (let j = 0; j <= pivot; j++) {
                    this.choices[j] = 1;
                }
            } else if (val[pivot] === 2) {
                for (let j = pivot; j < val.length; j++) {
                    this.choices[j] = 2;
                }
            }
        },

        onSubmit () {

            // generate random choice from 1 ~ 10
            this.scheme_num = Math.floor(Math.random() * 10) + 1;

            // return the payoff
            if (this.choices[this.scheme_num] === 1) {
                this.multiplier = 0.1;
                this.deduct = 1;
                this.Deductstr = 'Excess change will be deducted from your earnings.';
            } else {
                this.multiplier = Math.round(0.01 * this.scheme_num*100)/100;
                this.deduct = 0;
                this.Deductstr = 'Excess change will NOT be deducted from your earnings.';
            }

            localStorage.setItem('multiplier', this.multiplier)
            localStorage.setItem('deduction', this.deduct)

            alert('The computer has randomly chosen row' + this.scheme_num +'. Based on your selection, you will earn S$' + this.multiplier + ' for every correct transaction in this stage. ' + this.Deductstr + ' Please do NOT press any button and wait for instructions......');
            if (this.deduct == 0) {window.location = 'transaction3_nodeduct.html';}
            else {window.location = 'transaction3_deduct.html'; }
            return;
        }

    }

  })
