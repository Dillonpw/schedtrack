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
      className="fade-in-2 mb-[-10rem] flex h-screen flex-col items-center justify-center space-x-8 space-y-8 dark:text-gray-200"
    >
      <p>Connect with the developer at Dillonpwalsh10@gmail.com</p>
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
