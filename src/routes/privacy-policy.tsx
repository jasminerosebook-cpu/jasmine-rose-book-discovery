import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Jasmine Rose" },
      { name: "description", content: "How Jasmine Rose collects, uses and protects information shared by authors." },
      { property: "og:title", content: "Privacy Policy | Jasmine Rose" },
      { property: "og:description", content: "How Jasmine Rose handles author information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy Policy">
      <p>Your privacy matters. This page explains what information I collect when you contact me and how it is used.</p>
      <h2>Information I collect</h2>
      <p>When you email me, I receive your name, email address and any details you share about your book, such as its title, genre and Goodreads link.</p>
      <h2>How I use it</h2>
      <p>I use this information only to reply to you and to deliver the Listopia research and submission service you request. I do not sell or rent your information.</p>
      <h2>Your choices</h2>
      <p>You can ask me to delete your information at any time by emailing jasminerosebookresearch@gmail.com.</p>
    </LegalPage>
  ),
});
