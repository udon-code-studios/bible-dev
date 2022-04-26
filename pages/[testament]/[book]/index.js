// file: pages/[testament]/[book]/index.js

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowSmUpIcon } from "@heroicons/react/outline";
import Markdown from "/components/Markdown";
import Footer from "/components/Footer";

// TODO('add description')
export default function Page({ prev, next, entry, contributors, timeline }) {
  // get book title from URL
  const router = useRouter();
  const { book } = router.query;

  // capitalizes first letter of each word in 'str'
  function capitalize(str) {
    return str.replace(new RegExp("\\b\\w", "g"), (c) => c.toUpperCase());
  }

  // set motion variants
  const variants = {
    opacity: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  return (
    <>
      <Head>
        <title>{book && capitalize(book)}</title>
      </Head>

      <main>
        <div className="relative flex flex-col justify-between min-h-screen bg-stone-900 text-stone-400 font-serif">
          {/* header and main content (motion: fade-in on load) */}
          <motion.div initial="hidden" animate="visible" variants={variants.opacity} transition={{ duration: 1 }} className="flex flex-col grow h-full">
            {/* header */}
            <div className="flex items-center justify-between mx-8 py-6">
              <Link href="/">
                <a>
                  <div className="flex items-center">
                    <ArrowSmUpIcon className="h-10" />
                    <p className="font-sans font-bold text-xl">Home</p>
                  </div>
                </a>
              </Link>

              <Link href="/">
                <a>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image src="/bible_stone-400.png" alt="bible" layout="fill" />
                    </div>
                    <p className="font-sans font-bold text-xl">BibleDev</p>
                  </div>
                </a>
              </Link>
            </div>

            {/* books TODO('is this the best way to do it's height?') */}
            <div className="flex grow my-4 max-h-[70vh] h-full">
              {/* previous book */}
              {prev ? (
                <div className="flex flex-col justify-center">
                  <Link href={`/${prev.testament}/${prev.title.toLowerCase()}`}>
                    <a className="block w-20 h-5/6">
                      <div className="flex justify-center items-center min-h-full rounded-r-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{prev.title}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="w-24 bg-stone-900"></div>
              )}

              {/* current book */}
              <div className="flex flex-grow justify-center mx-8 border-8 border-stone-400 rounded-3xl">
                <div className="flex flex-col m-12 max-w-3xl">
                  <div className="flex mb-10 justify-between items-end">
                    <h1 className="capitalize text-5xl">{book}</h1>
                    <h1 className="text-2xl">900 BC - 700 BC</h1>
                  </div>
                  <div className="space-y-4 overflow-y-auto scrollbar-dark">
                    {/* Render development history entry as markdown */}
                    <Markdown>{entry}</Markdown>
                  </div>
                </div>
              </div>

              {/* next book */}
              {next ? (
                <div className="flex flex-col justify-center">
                  <Link href={`/${next.testament}/${next.title.toLowerCase()}`}>
                    <a className="block w-20 h-5/6">
                      <div className="flex justify-center items-center min-h-full rounded-l-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{next.title}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="w-24 bg-stone-900"></div>
              )}
            </div>

            {/* timeline goes here */}
          </motion.div>

          {/* footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export async function getStaticPaths() {
  const books = require("/data/books.json");
  const paths = books.map((book) => {
    return {
      params: {
        testament: book.testament,
        book: book.title.toLowerCase(),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps({ params }) {
  // load list of book names and testaments
  const books = require("/data/books.json");

  // extract previous and next books from books if they exist
  const idx = books.findIndex((book) => book.title.toLowerCase() === params.book);
  const prev = idx > 0 ? books[idx - 1] : null;
  const next = idx < books.length - 1 ? books[idx + 1] : null;

  // read development history entry from /data/books/[book]/entry.md
  // read contributors from /data/books/[book]/contributors.json
  // read timeline data from /data/books/[book]/timeline.json

  const fs = require("fs");
  const path = require("path");

  const bookDirectory = path.join(process.cwd(), `data/books/${params.testament}/${params.book}`);
  const entryFilePath = path.join(bookDirectory, "entry.md");
  const contributorsFilePath = path.join(bookDirectory, "contributors.json");
  const timelineFilePath = path.join(bookDirectory, "timeline.json");

  const entryMarkdown = fs.readFileSync(entryFilePath, "utf8");
  const contributors = JSON.parse(fs.readFileSync(contributorsFilePath, "utf8"));
  const timeline = JSON.parse(fs.readFileSync(timelineFilePath, "utf8"));

  return {
    props: {
      prev: prev,
      next: next,
      entry: entryMarkdown,
      contributors: contributors,
      timeline: timeline,
    },
  };
}

//
// end of file: pages/[testament]/[book]/index.js
