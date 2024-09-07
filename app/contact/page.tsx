import Header from "@/components/Header";
import ContactForm from "@/components/Contact";
import Nav from "@/components/Nav";
import Feedback from "@/components/feedback";

export default function Contact() {
return (
    <main>
      <Header> 
        <Nav />
      </Header>
      <Feedback />
      <ContactForm />
    </main> 
)
}