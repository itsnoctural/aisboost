import { TextContainer, TextContent, TextTitle } from "@/components/text";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="flex flex-col max-w-screen-lg mx-auto my-12 gap-y-8 px-4">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
          Terms of Service
        </h1>
        <p className="text-sm md:text-base text-muted-foreground ">
          Last Updated August 21, 2024
        </p>
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <TextContent>
          Welcome to aisboost.com! These Terms of Service (&ldquo;Terms&ldquo;)
          govern your use of our platform. By accessing or using our website,
          you agree to be bound by these Terms. Please read them carefully
          before using the site.
        </TextContent>

        <TextContainer>
          <TextTitle>Acceptance of Terms</TextTitle>
          <TextContent>
            By using our website, you acknowledge that you have read,
            understood, and agree to comply with these Terms. If you do not
            agree with any provision of these Terms, please do not use our
            website.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Privacy and Confidentiality</TextTitle>
          <TextContent>
            We are committed to protecting your privacy. Our Privacy Policy
            explains how we collect, use, and disclose information about you
            when you use our website. By using our website, you agree to the
            collection and use of your information as described in our&nbsp;
            <Link className="text-primary" href={"/privacy"}>
              Privacy Policy
            </Link>
            .
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Limitation of Liability</TextTitle>
          <TextContent>
            Disclaimer: Our website is provided on an &ldquo;as is&ldquo; and
            &ldquo;as available&ldquo; basis without any warranties, expressed
            or implied. We do not guarantee that the website will be error-free,
            secure, or uninterrupted, and we are not responsible for any harm or
            damages resulting from the use of our website.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Modifications to Terms</TextTitle>
          <TextContent>
            We reserve the right to modify these Terms at any time without prior
            notice. Any changes will be effective immediately upon posting the
            updated Terms on our website. Your continued use of the website
            after the posting of changes constitutes your acceptance of such
            changes.
          </TextContent>
        </TextContainer>

        <TextContent>
          By using our website, you acknowledge that you have read, understood,
          and agreed to be bound by these Terms of Service.
        </TextContent>
      </div>
    </main>
  );
}
