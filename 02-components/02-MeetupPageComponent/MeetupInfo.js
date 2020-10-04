export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ meetup.organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ meetup.place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="meetupInfo.ISODate">{{ meetupInfo.date }}</time>
      </li>
    </ul>`,

  // props
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  // computed
  computed: {
    meetupInfo() {
      let date = new Date(this.meetup.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      let ISODate = new Date(this.meetup.date).toISOString().substring(0, 10);
      return {
        date,
        ISODate
      }
    }
  },
};
