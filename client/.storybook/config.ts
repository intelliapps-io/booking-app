import { configure } from '@storybook/react';

// // automatically import all files ending in *.stories.tsx
// configure(require.context('../', true, /\.stories\.tsx?$/), module)

// const req = require.context('../src', true, /\.stories\.tsx?$/);

function loadStories() {
  require('../src/stories/productCard.stories')
  require('../src/stories/scheduler.stories')
  // req.keys().forEach(req);
}

configure(loadStories, module);