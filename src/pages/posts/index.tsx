import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { getPrismicClient } from 'services/prismic';
import styles from './styles.module.scss';
import { RichText } from 'prismic-dom';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
};

interface PostsProps {
  posts: Array<Post>;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}

          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>PWA: What is it? It is worth it? When to use?</strong>
            <p>
              A PWA is a hybrid application between web and mobile . Imagine
              that when you access a website that you like a lot on
              your smartphone , you receive a prompt to add the website to your
              applications homepage.
            </p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>PWA: What is it? It is worth it? When to use?</strong>
            <p>
              A PWA is a hybrid application between web and mobile . Imagine
              that when you access a website that you like a lot on
              your smartphone , you receive a prompt to add the website to your
              applications homepage.
            </p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>PWA: What is it? It is worth it? When to use?</strong>
            <p>
              A PWA is a hybrid application between web and mobile . Imagine
              that when you access a website that you like a lot on
              your smartphone , you receive a prompt to add the website to your
              applications homepage.
            </p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;

type Content = {
  type: string;
  text: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  });

  const posts = response.results.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find((content: Content) => content.type === 'paragraph')
        ?.text ?? '',
    updateAt: new Date(post.last_publication_date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return {
    props: { posts },
  };
};
