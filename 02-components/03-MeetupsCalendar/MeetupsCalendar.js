/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button  @click="prevMonth()" class="rangepicker__selector-control-left"></button>
          <div>{{ dateInfo.currentMonthYear }}</div>
          <button @click="nextMonth()" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template v-for="pastDay in this.fillInactiveDays()">
          <div class="rangepicker__cell rangepicker__cell_inactive">
            {{ pastDay }}
            <a v-for="title in getMeetupsAtDay(\`\${pastDay}\`, dateInfo.currentMonth, 'past')" class="rangepicker__event">{{ title }}</a>
          </div>
        </template>
        <template v-for="day in dateInfo.daysInCurrentMonth">
          <div class="rangepicker__cell">
          {{ day }}
          <a v-for="title in getMeetupsAtDay(\`\${day}\`, dateInfo.currentMonth)" class="rangepicker__event">{{ title }}</a>
          </div>
        </template>
        <template v-for="pastDay in this.fillFutureInactiveDays()">
          <div class="rangepicker__cell rangepicker__cell_inactive">
            {{ pastDay }}
            <a v-for="title in getMeetupsAtDay(\`\${pastDay}\`, dateInfo.currentMonth, 'past')" class="rangepicker__event">{{ title }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true
    }
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data() {
    return {
      today: new Date(),      
    }
  },

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    dateInfo() {
      let currentMonthYear = new Date(this.today).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long'
      });
      let currentMonth = new Date(this.today).getMonth();
      let currentYear = new Date(this.today).getFullYear();
      let firstDay = new Date(currentYear, currentMonth, 1).getDay();
      let daysInCurrentMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
      let lastDay = new Date(currentYear, currentMonth, daysInCurrentMonth).getDay();
      return {
        currentMonthYear,
        currentMonth,
        currentYear,
        firstDay,
        daysInCurrentMonth,
        daysInCurrentMonth,
        lastDay
      }
    }    
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    fillInactiveDays() {
      let pastMonthDaysArr = [];
      let pastMonthDaysNum;
      if (this.dateInfo.firstDay === 0) {
        pastMonthDaysNum = 6;
      } else {
        pastMonthDaysNum = this.dateInfo.firstDay - 1;
      }
      for(let i = pastMonthDaysNum - 1; i >= 0; i--) {
        let dayNum = (-1) * i;
        let monthNum = new Date(this.dateInfo.currentYear, this.dateInfo.currentMonth, dayNum).getDate();
        pastMonthDaysArr.push(monthNum);
      }
      return pastMonthDaysArr;
    },
    fillFutureInactiveDays() {
      let futureMonthDaysArr = [];
      let futureMonthDaysNum;
      if (this.dateInfo.lastDay === 0) {
        futureMonthDaysNum = 0;
      } else {
        futureMonthDaysNum = 7 - this.dateInfo.lastDay;
      }
      for(let i = 1; i <= futureMonthDaysNum; i++) {
        let dayNum = i;
        let monthNum = new Date(this.dateInfo.currentYear, this.dateInfo.currentMonth, dayNum).getDate();
        futureMonthDaysArr.push(monthNum);
      }
      return futureMonthDaysArr;
    },
    nextMonth(){
      if (this.dateInfo.currentMonth === 11){
          this.today = new Date(this.dateInfo.currentYear+1, 0);
        } else {
          this.today = new Date(this.dateInfo.currentYear, this.dateInfo.currentMonth + 1);
        }
    },
    prevMonth() {
      if (this.dateInfo.currentMonth === 0){
        this.today = new Date(this.dateInfo.currentYear-1, 11);
      } else {
        this.today = new Date(this.dateInfo.currentYear, this.dateInfo.currentMonth - 1);
      }
    },
    getMeetupsAtDay(dayNum, monthNum, flag = "") {
      let localMonth = this.dateInfo.currentMonth;
      let localYear = this.dateInfo.currentYear;
      if (flag === "past") {
        if (monthNum === 0) {
          localMonth = 11;
          localYear--; 
        } else {
          localMonth--;
        }
      } else if (flag === "future") {
        if (monthNum === 11) {
          localMonth = 0;
          localYear++; 
        } else {
          localMonth++;
        }
      }
      let localDate = new Date(localYear, localMonth, dayNum);
      return this.fillMeetupsInDay(localDate);        
    }, 
  
    fillMeetupsInDay(day) {
      let result = [];
      this.meetups.forEach(element => {
        let thisDay = day.getTime();
        let meetupDay = new Date(element.date);
        meetupDay = new Date(meetupDay.getFullYear(), meetupDay.getMonth(), meetupDay.getDate());
        meetupDay = meetupDay.getTime();
        if (thisDay === meetupDay) {
          result.push(element.title);
        }
      });
      return result;        
    },
  }
};
