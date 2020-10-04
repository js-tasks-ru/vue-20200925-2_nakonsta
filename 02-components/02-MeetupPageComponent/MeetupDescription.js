export const MeetupDescription = {
  template: `<p class="meetup-description">{{ description }}</p>`,

  // Пропсы
  props: {
    description: {
      type: String,
      required: false
    }
  }
};
