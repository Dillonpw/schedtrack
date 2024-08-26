import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
export default function ContactForm() {
  return (
    <div
      id="links"
      className="fade-in-2 mb-[-3rem] mt-[-12rem] flex h-screen flex-col items-center justify-center space-y-4 dark:text-gray-200"
    >
      <p className="text-xl mx-auto md:text-2xl text-center">
        Connect with the developer at schedtrackhelp@gmail.com
      </p>
      <div className="flex space-x-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                id="xLink"
                href="https://x.com/dillonpw_"
                target="_blank"
                rel="noreferrer"
                aria-label="redirect to X"
              >
                <FontAwesomeIcon
                  className="h-8 w-8 hover:scale-110"
                  icon={faXTwitter}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>Twitter/X</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <a
                id="githubLink"
                href="https://github.com/Dillonpw/"
                target="_blank"
                rel="noreferrer"
                aria-label="redirect to Github"
              >
                <FontAwesomeIcon
                  className="h-8 w-8 hover:scale-110"
                  icon={faGithub}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>Github</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
