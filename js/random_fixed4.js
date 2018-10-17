var app = new Vue({
    el: '#random_fixed',
    data: {
      choices2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      changedIndex: -1,
      random_row: 0,
      earn4: 0,
      ansStr: ''
    },

    methods: {
        onSelectChange (pivot2) {
            let val = this.choices2;
            if (val[pivot2] === 1) {
                for (let j = 0; j <= pivot2; j++) {
                    this.choices2[j] = 1;
                }
            } else if (val[pivot2] === 2) {
                for (let j = pivot2; j < val.length; j++) {
                    this.choices2[j] = 2;
                }
            }
        },

        onSubmit () {
            // generate random choice from 1 ~ 10
            this.random_row = Math.floor(Math.random() * 10) + 1;

            if (this.choices2[this.random_row - 1] === 1) {
                this.earn4 = Math.random() < 0.5 ? 0 : 3;
                this.ansStr = 'Random Payment. ';
            } else {
                this.earn4 = 0.3 * (this.random_row-1);
                this.ansStr = 'Fixed Payment. ';
            }

            localStorage.setItem("earn4", this.earn4);
            alert('The computer has randomly chosen row ' + this.random_row +'. Based on your selection, you will earn a ' + this.ansStr + 'You will receive S$' + this.earn4 + ' in this stage. Please do NOT press any button and wait for instructions......');
            window.location = 'Adding_numbers5.html';
            return;
        }
    }

})
