import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${itemData.image}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ itemData.title }}</h5>
        <p v-if="agendaItem.type === 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,

  // props
  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  // Возможно, тут потребуется computed
  computed: {
    itemData() {
      let title = this.agendaItem.title ? this.agendaItem.title : agendaItemTitles[this.agendaItem.type];
      let image = agendaItemIcons[this.agendaItem.type];
      return {
        title,
        image
      }
    }
  }
};
