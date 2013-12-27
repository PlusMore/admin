Schema.createExperience = new SimpleSchema({
  title: {
    type: String,
    label: 'The title'
  },
  lead: {
    type: String,
    label: 'Lead Text'
  },
  price: {
    type: Number,
    label: 'Price per person'
  },
  'location.street': {
    type: String,
    label: 'Street'
  },
  'location.city': {
    type: String,
    label: 'City'
  },
  'location.state': {
    type: String,
    label: 'State'
  }
})