import { BookOpenCheckIcon } from "lucide-react";
import { Metadata } from "next";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../layout";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageCookiePolicy.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function CookiePolicyPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
      <div className="bg-background text-foreground dark:bg-background dark:text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
              <BookOpenCheckIcon className="text-foreground" />
            </div>
          }
          translations={dictionary.pageCookiePolicy}
        />

        <div className="mt-6 space-y-6 text-foreground dark:text-foreground/80">
          <p className="text-muted-foreground dark:text-muted-foreground/80">
            Last updated: January 28, 2025
          </p>
          <p>
            This Cookies Policy explains what Cookies are and how We use them.
            You should read this policy so You can understand what type of
            cookies We use, or the information We collect using Cookies and how
            that information is used.
          </p>
          <p>
            Cookies do not typically contain any information that personally
            identifies a user, but personal information that we store about You
            may be linked to the information stored in and obtained from
            Cookies. For further information on how We use, store and keep your
            personal data secure, see our Privacy Policy.
          </p>
          <p>
            We do not store sensitive personal information, such as mailing
            addresses, account passwords, etc. in the Cookies We use.
          </p>
          <h2 className="text-xl font-bold mt-6 mb-4 text-foreground dark:text-foreground/90">
            Interpretation and Definitions
          </h2>
          <h4 className="font-semibold mb-2 text-foreground dark:text-foreground/90">
            Interpretation
          </h4>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h4 className="font-semibold mb-2 text-foreground dark:text-foreground/90">
            Definitions
          </h4>
          <p>For the purposes of this Cookies Policy:</p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 dark:text-foreground/70">
            <li>
              <strong className="text-foreground dark:text-foreground/90">
                Company
              </strong>{" "}
              (referred to as either &quot;the Company&quot;, &quot;We&quot;,
              &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers
              to Governance Space.
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground/90">
                Cookies
              </strong>{" "}
              means small files that are placed on Your computer, mobile device
              or any other device by a website, containing details of your
              browsing history on that website among its many uses.
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground/90">
                Website
              </strong>{" "}
              refers to Governance Space, accessible from{" "}
              <a
                href="https://governancespace.com/"
                rel="external nofollow noopener"
                target="_blank"
                className="text-primary hover:underline dark:text-primary/90"
              >
                https://governancespace.com/
              </a>
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground/90">
                You
              </strong>{" "}
              means the individual accessing or using the Website, or a company,
              or any legal entity on behalf of which such individual is
              accessing or using the Website, as applicable.
            </li>
          </ul>
          <h2 className="text-xl font-bold mt-6 mb-4 text-foreground dark:text-foreground/90">
            The use of the Cookies
          </h2>
          <h4 className="font-semibold mb-2 text-foreground dark:text-foreground/90">
            Type of Cookies We Use
          </h4>
          <p>
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
            Cookies. Persistent Cookies remain on your personal computer or
            mobile device when You go offline, while Session Cookies are deleted
            as soon as You close your web browser.
          </p>
          <p>
            We use both session and persistent Cookies for the purposes set out
            below:
          </p>
          <ul className="list-disc list-inside space-y-4 text-foreground/80 dark:text-foreground/70">
            <li>
              <p>
                <strong className="text-foreground dark:text-foreground/90">
                  Necessary / Essential Cookies
                </strong>
              </p>
              <p>Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts. Without these Cookies,
                the services that You have asked for cannot be provided, and We
                only use these Cookies to provide You with those services.
              </p>
            </li>
            <li>
              <p>
                <strong className="text-foreground dark:text-foreground/90">
                  Functionality Cookies
                </strong>
              </p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies allow us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference. The purpose of these Cookies is to
                provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the
                Website.
              </p>
            </li>
          </ul>
          <h4 className="font-semibold mb-2 text-foreground dark:text-foreground/90">
            Your Choices Regarding Cookies
          </h4>
          <p>
            If You prefer to avoid the use of Cookies on the Website, first You
            must disable the use of Cookies in your browser and then delete the
            Cookies saved in your browser associated with this website. You may
            use this option for preventing the use of Cookies at any time.
          </p>
          <p>
            If You do not accept Our Cookies, You may experience some
            inconvenience in your use of the Website and some features may not
            function properly.
          </p>
          <p>
            If You&apos;d like to delete Cookies or instruct your web browser to
            delete or refuse Cookies, please visit the help pages of your web
            browser.
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 dark:text-foreground/70">
            <li>
              <p>
                For the Chrome web browser, please visit this page from Google:{" "}
                <a
                  href="https://support.google.com/accounts/answer/32050"
                  rel="external nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline dark:text-primary/90"
                >
                  https://support.google.com/accounts/answer/32050
                </a>
              </p>
            </li>
            <li>
              <p>
                For the Internet Explorer web browser, please visit this page
                from Microsoft:{" "}
                <a
                  href="http://support.microsoft.com/kb/278835"
                  rel="external nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline dark:text-primary/90"
                >
                  http://support.microsoft.com/kb/278835
                </a>
              </p>
            </li>
            <li>
              <p>
                For the Firefox web browser, please visit this page from
                Mozilla:{" "}
                <a
                  href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                  rel="external nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline dark:text-primary/90"
                >
                  https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                </a>
              </p>
            </li>
            <li>
              <p>
                For the Safari web browser, please visit this page from Apple:{" "}
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  rel="external nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline dark:text-primary/90"
                >
                  https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                </a>
              </p>
            </li>
          </ul>
          <p>
            For any other web browser, please visit your web browser&apos;s
            official web pages.
          </p>
          <h4 className="font-semibold mb-2 text-foreground dark:text-foreground/90">
            Contact Us
          </h4>
          <p>
            If you have any questions about this Cookies Policy, You can contact
            us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 dark:text-foreground/70">
            <li>
              By email:{" "}
              <a
                href="mailto:hello@governancespace.com"
                target="_blank"
                className="text-primary hover:underline dark:text-primary/90"
              >
                hello@governancespace.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
