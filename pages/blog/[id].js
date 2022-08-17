import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import { useRouter } from 'next/router'

export const BackButton = () => {
    const router = useRouter()
    return (
        <button alia-label="戻る" type="button" onClick={() => router.back()}>
            戻る
        </button>
    )
}

// SSG
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" })
    const paths = data.contents.map((content) => `/blog/${content.id}`);

    return {
        paths,
        fallback: false,
    };
};

export default function BlogId({ blog }) {
    return <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }} className={styles.post}></div>

        <BackButton />
    </main>
};