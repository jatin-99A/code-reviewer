import { GitHubIcon } from "@/components/icons/github-icon";
import { Mail, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Documentation", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["GitHub", "Community", "Support", "Status"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t bg-indigo-950">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-bold tracking-tight text-white">
              CodeMortal<span className="text-sky-400 font-extrabold"> AI</span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              AI-powered code review assistant that helps teams ship
              faster and safer software directly inside GitHub.
            </p>

            <div className="mt-5 flex gap-3 text-muted-foreground">
              <GitHubIcon className="h-5 w-5 hover:text-white cursor-pointer transition" />
              {/* <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition" /> */}
              <Mail className="h-5 w-5 hover:text-white cursor-pointer transition" />
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white">
                {group.title}
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {group.links.map((link) => (
                  <li
                    key={link}
                    className="flex items-center gap-1 hover:text-white cursor-pointer transition"
                  >
                    {link}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 border-t" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodeMortalAI. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}