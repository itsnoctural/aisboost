import { TextContainer, TextContent, TextTitle } from "@/components/text";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default async function Privacy() {
  return (
    <main className="flex flex-col max-w-screen-lg mx-auto my-12 gap-y-8 px-4">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-muted-foreground ">
          Last Updated August 21, 2024
        </p>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <TextContainer>
          <TextContent>
            This privacy policy describes how we collect, use, and disclose
            information that you provide to us when visiting our website and
            using our services
            {/* , including AdMaven and Google Analytics */}. We strive to
            protect your privacy and ensure the security of your personal data.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Consent and Changes</TextTitle>
          <TextContent>
            By visiting our website and providing personal information, you
            consent to the terms of this privacy policy. We periodically update
            the policy to describe changes. You can check when this policy was
            last updated by looking at the "Last Update" date under the heading.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Collection and Use of Information</TextTitle>

          <TextContent>
            We may collect certain personal information, such email address that
            you voluntarily provide when registering on our website. We use this
            information to process your requests, provide you with the requested
            services, and communicate with you.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Cookies and Web Beacons</TextTitle>
          <TextContent>
            Unlike most websites, we only use cookies for authorization
            purposes. We do not store any cookies related to visitors'
            preferences. Our focus is solely on ensuring secure access without
            tracking or storing additional information.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Third Party Privacy Policies</TextTitle>
          <TextContent>
            We utilize the AdMaven advertising platform to display ads on our
            website. AdMaven may use cookies and other tracking technologies to
            gather information about your preferences and interaction with
            advertisements. This information helps deliver more relevant
            advertising and enhance your experience on our site.&nbsp;
            <Link
              className="text-foreground"
              href={"https://ad-maven.com/privacy-policy/"}
              target="_blank"
              prefetch={false}
            >
              AdMaven&apos;s privacy policy
            </Link>
            &nbsp;applies to the collection and use of such information.
          </TextContent>
        </TextContainer>
      </div>
    </main>
  );
}
