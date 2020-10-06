import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div>
    <meetup-view :meetup="meetup"></meetup-view>
  </div>`,

  // components
  components: {
    MeetupView
  },

  // data
  data() {
    return {
      meetup: {
        agenda: [],
        date: 0,
        description: null,
        id: null,
        imageId: null,
        organizer: '',
        place: '',
        title: null
      }
    }
  },

  // mounted
  mounted() {
    fetchMeetup(MEETUP_ID).then((res) => this.meetup = res);
  },

  // methods
  methods: {

  }
};
