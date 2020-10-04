import { getMeetupCoverLink } from './data.js';

export const MeetupCover = {
  template: `<div class="meetup-cover" :style="\`--bg-url: url('\${cover}')\`">
  <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
</div>`,

  // props
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  // Возможно, тут потребуется computed
  computed: {
    cover() {
      let cover = getMeetupCoverLink(this.meetup);
      return this.meetup.imageId ? cover : 'https://course-vue.javascript.ru/api/images/2';
    }
  },
};
