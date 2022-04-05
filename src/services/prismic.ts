import * as Prismic from '@prismicio/client';

export const getPrismicClient = (req?: unknown) => {
  const prismic = Prismic.createClient(process.env.ENDPOINT_PRISMIC ?? '', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
};
