import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <!-- meetup cover -->
      <meetup-cover :link="cover" :title="meetup.title"></meetup-cover>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description"></meetup-description>
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :agenda="meetup.agenda"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="dateToDateFormat"></meetup-info>
          </div>
        </div>
      </div>
    </div>`,

  // components
  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo
  },

  // props
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  computed: {
    cover() {
      let cover = getMeetupCoverLink(this.meetup);
      return this.meetup.imageId ? cover : 'https://course-vue.javascript.ru/api/images/2';
    },
    dateToDateFormat() {
      return new Date(this.meetup.date);
    }
  },
};
