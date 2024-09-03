import { BiSupport } from "react-icons/bi";
import { BsArrowThroughHeart, BsLightning } from "react-icons/bs";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineMoneyOff } from "react-icons/md";

export interface IFeature {
  title: string;
  description: string;
  CustomIcon: React.ComponentType;
}

export const featuresConfig: IFeature[] = [
  {
    title: "Absolutely free",
    description:
      "Enjoy our comprehensive set of features at no cost, making it easy to get started and explore the full capabilities of our platform.",
    CustomIcon: MdOutlineMoneyOff,
  },
  {
    title: "Insightful Analytics",
    description:
      "Real-time dashboards and reports provide the visibility to optimize operations and measure the success of your applications.",
    CustomIcon: IoAnalytics,
  },
  {
    title: "Dedicated Support",
    description:
      "Rely on our dedicated support team, available to assist you with any questions or issues you may encounter, ensuring a seamless experience.",
    CustomIcon: BiSupport,
  },
  {
    title: "Easy to Use",
    description:
      "Our user-friendly interface makes it simple to navigate and get the most out of our platform.",
    CustomIcon: BsLightning,
  },
  {
    title: "Community",
    description:
      "Community engagement is at the heart of what we do. This is your chance to connect with us and guide our next steps.",
    CustomIcon: BsArrowThroughHeart,
  },
  {
    title: "Dashboard",
    description:
      "Enjoy a sleek and intuitive dashboard that puts all your important data at your fingertips.",
    CustomIcon: MdOutlineDashboard,
  },
];
