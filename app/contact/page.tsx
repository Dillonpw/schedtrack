import Header from "@/components/Header";
import ContactForm from "@/components/Contact";
import Nav from "@/components/Nav";
import Feedback from "@/components/feedback";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Reach out to the Sched Track development team for support or inquiries."
        />
      </Head>
      <main>
        <Header>
          <Nav />
        </Header>
        <Feedback />
        <ContactForm />
      </main>
    </>
  );
}
