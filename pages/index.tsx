import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Frontend Task</title>
        <meta name="description" content="Frontend Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-red-800">Hello world!</h1>
      </main>

      <footer></footer>
    </React.Fragment>
  );
};

export default Home;
