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
            if (val[pivot2] === 2) {
                for (let j = 0; j <= pivot2; j++) {
                    this.choices2[j] = 2;
                }
            } else if (val[pivot2] === 1) {
                for (let j = pivot2; j < val.length; j++) {
                    this.choices2[j] = 1;
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
                this.earn4 = parseFloat(3 - (0.3 * (this.random_row-1))).toFixed(2);
                this.ansStr = 'Fixed Payment. ';
            }

            localStorage.setItem("earn4", this.earn4);
            localStorage.setItem("random_row", this.random_row);
            localStorage.setItem("ansStr", this.ansStr);

            
            window.location = 'Wait_page4.html';
            return;
        }
    }

})
