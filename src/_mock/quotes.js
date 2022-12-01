import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const quotes = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  author: faker.name.fullName(),
  quotes: faker.lorem.paragraph()
}));

export default quotes;
