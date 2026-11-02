import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Jasmine Rose" },
      { name: "description", content: "The terms that apply when authors work with Jasmine Rose on Goodreads Listopia promotion." },
      { property: "og:title", content: "Terms of Service | Jasmine Rose" },
      { property: "og:description", content: "Terms for Jasmine Rose's Goodreads Listopia promotion service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Terms of Service">
      <p>By working with Jasmine Rose, you agree to the following terms.</p>
      <h2>The service</h2>
      <p>I research relevant Goodreads Listopia lists and submit your book to them. Scope and timeline are agreed with you before work begins.</p>
      <h2>No guaranteed rankings</h2>
      <p>Listopia rankings depend on votes from real readers. I cannot guarantee any position, number of votes, reviews or sales.</p>
      <h2>Goodreads</h2>
      <p>This service is independent and not affiliated with or endorsed by Goodreads or Amazon.</p>
      <h2>Contact</h2>
      <p>Questions about these terms? Email jasminerosebookresearch@gmail.com.</p>
    </LegalPage>
  ),
});
